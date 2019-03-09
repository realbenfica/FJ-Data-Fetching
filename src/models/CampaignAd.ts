import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export default class CampaignAd extends BaseEntity {
  @PrimaryColumn({unique: true})
  id: string

  @Column({nullable: true})
  campaign_id:string

  @Column({nullable: true})
  created_time:string

  @Column({nullable: true})
  creative:string

  @Column({nullable: true})
  effective_status:string

  @Column({nullable: true})
  name:string

  @Column({nullable: true})
  status:string

  @Column({nullable: true})
  updated_time:string

  @Column({nullable: false})
  video_id:string
}

export interface IAd {
  id: string
  campaign_id:string
  created_time:string
  creative:string
  effective_status:string
  name:string
  status:string
  updated_time:string
  video_id:string
}