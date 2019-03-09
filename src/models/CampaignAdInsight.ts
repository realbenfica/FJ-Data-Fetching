import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export default class CampaignAdInsight extends BaseEntity {
  @PrimaryColumn({unique: true})
  id:string

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
  unique_ctr:string

  @Column({nullable: true})
  unique_clicks:string

  @Column({nullable: true})
  total_video_views_unique:string

  @Column({nullable: true})
  total_video_avg_time_watched:string

  @Column({nullable: true})
  total_video_impressions:string

  @Column({nullable: true})
  total_video_impressions_unique:string
}

export interface IVideoDetail {
  id:string
  icon:string
  picture:string
  created_time:string
}

export interface IVideoInsight {
  total_video_views_unique:string
  total_video_avg_time_watched:string
  total_video_impressions:string
  total_video_impressions_unique:string
}

export interface IAdInsight {
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
  unique_ctr:string
  unique_clicks:string
  cost_per_10_sec_video_view:string
  video_avg_percent_watched_actions:string
}

export interface ICampaignAdInsight {
  // video_id
  id:string
  icon:string
  picture:string
  created_time:string

  // video_id/video_insights #period: lifetime
  total_video_views_unique:string
  total_video_avg_time_watched:string
  total_video_impressions:string
  total_video_impressions_unique:string

  // ad_id/insights
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
  unique_ctr:string
  unique_clicks:string
}