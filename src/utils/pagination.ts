import { SelectQueryBuilder } from "typeorm";

interface PaginationOptions {
  page?: number;
  limit?: number;
}

interface PaginatedResult<T> {
  paginatedData: T[];
  total: number;
}

type OrderByCondition = {
  [columnName: string]:
    | ("ASC" | "DESC")
    | {
        order: "ASC" | "DESC";
        nulls?: "NULLS FIRST" | "NULLS LAST";
      };
};

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOptions = {},
  // order?: OrderByCondition
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10 } = options;
  const countQueryBuilder = queryBuilder.clone();
  const total = await countQueryBuilder.getCount();

  const paginatedData = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();

  return { paginatedData, total };
}
