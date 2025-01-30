import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductIntSpecs } from "./intSpecs";
import { ProductDecimalSpecs } from "./decimalSpecs";

@Entity()
export class ProductUnits extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  product_unit_id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ProductIntSpecs, (productIntSpec) => productIntSpec.unit)
  intSpecs: ProductIntSpecs[];

  @OneToMany(() => ProductDecimalSpecs, (productDecSpec) => productDecSpec.unit)
  decSpecs: ProductDecimalSpecs[];
}
