import {Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class TrackedCampaignVideoAd extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false}) 
  trackedCampaignId: string

  @Column({nullable: false})
  videoAdId: string

  @Column({nullable: false})
  position: number

}