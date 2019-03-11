import {Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, OneToOne} from "typeorm";
// import Campaign from "./Campaign";

@Entity()
export default class VideoAd extends BaseEntity {
  @PrimaryColumn({unique: true})
  id: string

  @Column({nullable: false})
  name:string //ad_name

  @Column({nullable: true})
  campaignId:string

  @Column({nullable: false})
  cpv:string // < cost per impression

  @Column({nullable: false})
  ctr:string

  @Column({nullable: true})
  startDate:Date //date_start

  @Column({nullable: true})
  stopDate: Date //date_stop

  @Column({nullable: false})
  uniqueView:string //reach

  @Column({nullable: false})
  spend:string

  @Column({nullable: false})
  retention:string //video_avg_percent_watched_actions

  @Column({nullable: false})
  videoId:string

  @Column({nullable: true})
  thumbnails:string

}

export interface IVideoAd {
  id: string //ad_id
  name:string //ad_name
  campaignId:string
  cpv:string // < cost per view
  ctr:string
  startDate:string //date_start
  stopDate: string //date_stop
  uniqueView:string //reach
  spend:string
  retention:string //video_avg_percent_watched_actions //retention
  videoId:string
  thumbnail:string
}