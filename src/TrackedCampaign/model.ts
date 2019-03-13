import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import TrackedCampaignVideoAd from "../TrackedCampaignVideoAd/model";


@Entity()
export default class TrackedCampaign extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({nullable: false})
  facebookCampaignId: string

  @Column({nullable: false})
  googleCampaignId: string

  @OneToMany(type => TrackedCampaignVideoAd, videos => videos.trackedCampaignId)
  videoAds: TrackedCampaignVideoAd[]
}