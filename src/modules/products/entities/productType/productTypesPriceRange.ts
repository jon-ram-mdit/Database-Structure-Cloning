import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { ProductTypes } from "./productTypes";
import { PricingUnits } from "../../../../constant/constant";

export enum IntervalTypes{
    B = "Below",
    I = "Interval",
    A = "Above",
};

@Entity()
export class ProductTypesPricingRanges extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  type_price_range_id: string;

  @Column({type: "int"})
  minIntervalPrice: number;

  @Column({type: "enum", enum: PricingUnits, default: PricingUnits.lakh})
  minIntervalPriceUnit: PricingUnits;

  @Column({type: "int"})
  maxIntervalPrice: number;

  @Column({type: "enum", enum: PricingUnits, default: PricingUnits.lakh})
  maxIntervalPriceUnit: PricingUnits;

  @Column({type: "enum", enum: IntervalTypes, default: IntervalTypes.I})
  intervalType: IntervalTypes;
  
  @Column({type: "int"})
  intervalRank: number;
  
  @ManyToOne(() => ProductTypes, (productType) => productType.pricingRanges)
  productType: ProductTypes;
}
