import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DummyText{
    @PrimaryGeneratedColumn("uuid")
    pk: string;

    @Column()
    dummy_text: string;
}