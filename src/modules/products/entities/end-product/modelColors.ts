import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BrandsModels } from "./models";

@Entity()
export class ModelColors {
  @PrimaryGeneratedColumn("uuid")
  model_color_id: string;

  @Column()
  color1: string;

  @Column({ nullable: true })
  color2: string;

  @Column()
  url: string;

  @Column()
  caption: string;

  @ManyToOne(() => BrandsModels, (model) => model.modelColors)
  model: BrandsModels;
}
