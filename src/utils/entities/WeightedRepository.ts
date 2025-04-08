import { Repository } from "typeorm";
import { WeightedEntity } from "./WeightedEntity";

export const WeightedRepositoryMethods = {
  async getOrderedEntities<T extends WeightedEntity>(
    this: Repository<T>,
    filter?: Partial<T>
  ): Promise<T[]> {
    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        // 1. Update current_weight for all filtered rows
        let updateQB = transactionalEntityManager
          .createQueryBuilder()
          .update(this.metadata.target)
          .set({ current_weight: () => `"current_weight" + "static_weight"` });
        if (filter) {
          updateQB = updateQB.where(filter);
        }
        await updateQB.execute();

        // 2. Compute total static weight for the filtered subset
        let sumQB = transactionalEntityManager
          .createQueryBuilder()
          .select("SUM(static_weight)", "sum")
          .from(this.metadata.target, "entity");
        if (filter) {
          sumQB = sumQB.where(filter);
        }
        const { sum } = await sumQB.getRawOne();
        const totalWeight = parseInt(sum, 10);

        // computing the ordered list
        let selectQB = transactionalEntityManager
          .createQueryBuilder<T>(this.metadata.target, "entity")
          .orderBy("entity.current_weight", "DESC");
        if (filter) {
          selectQB = selectQB.where(filter);
        }

        const ordered = await selectQB.getMany();

        if (ordered.length > 0) {
          // penalize the first row
          let penalizeQB = transactionalEntityManager
            .createQueryBuilder()
            .update(this.metadata.target)
            .set({ current_weight: () => `"current_weight" - ${totalWeight}` })
            .where("weighted_id = :id", { id: ordered[0].weighted_id });
          await penalizeQB.execute();
        }

        return ordered;
      }
    );
  },
};
