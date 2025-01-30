import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../utils/entities/DateTimeAbstract";
import { Vendors } from "../../Vendor/entities/vendor";
import { LOG_OPERATIONS, LOG_SERVICE_ENUM } from "../schemas";

@Entity()
export class Logs extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  logs_id: string;

  @Column({ default: false })
  isVendor: boolean = false;

  @Column()
  service: LOG_SERVICE_ENUM;

  @Column()
  operation: LOG_OPERATIONS;

  @Column({ nullable: true })
  employee_login_id: string;

  @ManyToOne(() => Vendors, (vendor) => vendor.logs)
  vendor: Vendors;
}
