import {Entity, Column, PrimaryColumn, BaseEntity, OneToMany, OneToOne} from "typeorm";
import CampaignAd from "./CampaignAd";
import CampaignInsight from "./CampaignInsight";

@Entity()
export default class Campaign extends BaseEntity {
  @PrimaryColumn({unique: true})
  id: string

  @Column()
  name: string

  @Column()
  status: string

  @Column({nullable: true})
  startDate: Date

  @Column({nullable: true})
  stopDate: Date

  @Column({nullable: false})
  platform: String
}

export interface ICampaign {
  id: string
  name: string 
  status: string
  startDate: Date
  stopDate: Date
}