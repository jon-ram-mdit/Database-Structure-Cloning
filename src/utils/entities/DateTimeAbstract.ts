import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class DateTimeAbstract {
  @CreateDateColumn({ select: false })
  created_date: Date;

  @DeleteDateColumn({ select: false })
  deleted_date: Date;

  @UpdateDateColumn({ select: false })
  updated_date: Date;
}
