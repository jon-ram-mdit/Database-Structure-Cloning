import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductTypes } from "./productTypes";

@Entity()
export class ProductTypeBudgetRanges extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  budget_range_id: string;

  @Column({ type: "int" })
  startPrice: number;

  @Column({ type: "int" })
  endPrice: number;

  @Column({ type: "int" })
  rank: number;

  @ManyToOne(() => ProductTypes, (productType) => productType.budgetRanges)
  productType: ProductTypes;
}
