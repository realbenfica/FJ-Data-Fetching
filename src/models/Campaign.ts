import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export default class Campaign extends BaseEntity {
  @PrimaryColumn({unique: true})
  id: string

  @Column()
  account_id: string

  @Column()
  name: string

  @Column()
  effective_status: string

  @Column()
  objective: string

  @Column()
  start_time: Date

  @Column({nullable: true})
  stop_time: Date
}

export interface ICampaign {
  id: string
  account_id: string 
  name: string 
  effective_status: string
  objective: string
  start_time: Date
  stop_time: Date
}