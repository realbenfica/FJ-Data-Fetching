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