import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export default class CampaignDetail extends BaseEntity {
  @PrimaryColumn({unique: true})
  id: string

  @Column({nullable: true})
  uniqueViews: number

  @Column('decimal',{nullable: true})
  ctr: number

  @Column('decimal', {nullable: true})
  cpv:number

  @Column('decimal', {nullable: true})
  retention: number
}

export interface ICampaignDetail {
  id: string
  uniqueViews: number
  ctr: number
  cpv:number
  retention: number
}