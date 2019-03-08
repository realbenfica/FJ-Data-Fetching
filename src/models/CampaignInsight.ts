import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export default class CampaignInsight extends BaseEntity {
  @PrimaryColumn({unique: true})
  campaign_id: string

  @Column({nullable: true})
  clicks:string

  @Column({nullable: true})
  cost_per_unique_click:string

  @Column({nullable: true})
  cpc:string

  @Column({nullable: true})
  cpm:string

  @Column({nullable: true})
  cpp:string

  @Column({nullable: true})
  ctr:string

  @Column({nullable: true})
  date_start:string

  @Column({nullable: true})
  date_stop:string

  @Column({nullable: true})
  frequency:string

  @Column({nullable: true})
  impressions:string

  @Column({nullable: true})
  objective:string

  @Column({nullable: true})
  reach:string

  @Column({nullable: true})
  spend:string

  @Column({nullable: true})
  unique_clicks:string

  @Column({nullable: true})
  unique_ctr:string
}

export interface ICampaignInsight {
  campaign_id: string
  clicks:string
  cost_per_unique_click:string
  cpc:string
  cpm:string
  cpp:string
  ctr:string
  date_start:string
  date_stop:string
  frequency:string
  impressions:string
  objective:string
  reach:string
  spend:string
  unique_clicks:string
  unique_ctr:string
}