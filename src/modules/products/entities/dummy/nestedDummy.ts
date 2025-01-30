import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DummyNumber } from "./dummyNumber";

@Entity()
export class NestedDummy {
  @PrimaryGeneratedColumn("uuid")
  pk: string;

  @Column()
  dummy_booelan: boolean;

  @ManyToOne(()=>DummyNumber,(dn)=>dn.dummyBooleans)
  dummyNumber: DummyNumber;
}
