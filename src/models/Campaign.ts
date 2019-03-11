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

  @Column()
  start_time: Date

  @Column({nullable: true})
  stop_time: Date

  @Column({nullable: false})
  platform: String

  // @OneToMany(type => CampaignAd, ad => ad.campaign, {eager: true})
  // ads: CampaignAd[]

  // @OneToOne(type => CampaignInsight, insight => insight.campaign_id, {eager: true})
  // insight:CampaignInsight
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