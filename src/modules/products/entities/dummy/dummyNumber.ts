import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NestedDummy } from "./nestedDummy";

@Entity()
export class DummyNumber {
  @PrimaryGeneratedColumn("uuid")
  pk: string;

  @Column()
  dummy_number: number;

  @OneToMany(() => NestedDummy, (nd) => nd.dummyNumber)
  dummyBooleans: NestedDummy[];
}
