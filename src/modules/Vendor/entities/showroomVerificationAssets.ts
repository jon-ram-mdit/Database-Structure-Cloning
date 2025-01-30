import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Showrooms } from "./showrooms";
import { ImageUrlPrefixTransformer } from "../../../utils/entities/ImageUrlTransformer";

export enum VerificationFileType {
  I = "Image",
  P = "Pdf",
}
@Entity()
export class ShowroomVerificationFiles extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  verifying_file_id: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  url: string;

  @Column({
    type: "enum",
    enum: VerificationFileType,
    default: VerificationFileType.I,
  })
  type: VerificationFileType;

  @ManyToOne(() => Showrooms, (showroom) => showroom.verificationFiles)
  showroom: Showrooms;
}
