import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export default class CampaignDetail extends BaseEntity {
  @PrimaryColumn({unique: true})
  id: string

  @Column({nullable: true})
  uniqueViews: Number

  @Column('decimal',{nullable: true})
  ctr: Number

  @Column('decimal', {nullable: true})
  cpv:Number

  @Column('decimal', {nullable: true})
  retention: Number
}

export interface ICampaignDetail {
  id: string
  uniqueViews: Number
  ctr: Number
  cpv:Number
  retention: Number
}