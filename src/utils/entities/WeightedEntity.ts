import { BaseEntity, PrimaryGeneratedColumn, Column, getRepository } from "typeorm";
import { DateTimeAbstract } from "./DateTimeAbstract";

/**
 * Abstract base entity that implements global weighted round-robin ordering.
 * The static method `getOrderedEntities` now accepts an optional filter.
 */
export abstract class WeightedEntity extends DateTimeAbstract {
  @PrimaryGeneratedColumn()
  weighted_id: number;

  @Column({ type: "int", default: 10 })
  static_weight: number; // fixed weight (e.g. based on payment)

  @Column({ type: "int", default: 0 })
  current_weight: number; // dynamic value used for scheduling
}
