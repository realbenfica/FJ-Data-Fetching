import {Entity, Column, PrimaryColumn, BaseEntity, OneToOne} from "typeorm";
import CampaignAd from "./CampaignAd";

@Entity()
export default class CampaignAdInsight extends BaseEntity {
  @PrimaryColumn({unique: true})
  ad_id:string

  @Column({nullable: true})
  icon:string

  @Column({nullable: true})
  picture:string

  @Column({nullable: true})
  created_time:string

  @Column({nullable: true})
  clicks:string

  @Column({nullable: true})
  cpc:string

  @Column({nullable: true})
  cpm:string

  @Column({nullable: true})
  cpp:string

  @Column({nullable: true})
  ctr:string

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
  total_video_views_unique:string

  @OneToOne(type => CampaignAd, ad => ad.id)
  ad:CampaignAd


}

export interface IVideoDetail {
  icon:string
  picture:string
  created_time:string
}

export interface IVideoInsight {
  total_video_views_unique:string
}

export interface IAdInsight {
  ad_id:string
  clicks:string
  cpc:string
  cpm:string
  cpp:string
  ctr:string
  frequency:string
  impressions:string
  objective:string
  reach:string
  spend:string
}

export interface ICampaignAdInsight {
  // video_id
  icon:string
  picture:string
  created_time:string

  // video_id/video_insights #period: lifetime
  total_video_views_unique:string

  // ad_id/insights
  ad_id:string
  clicks:string
  cpc:string
  cpm:string
  cpp:string
  ctr:string
  frequency:string
  impressions:string
  objective:string
  reach:string
  spend:string
}