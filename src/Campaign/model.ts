import {Entity, Column, PrimaryColumn, BaseEntity, OneToMany, OneToOne} from "typeorm";

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
  platform: Platform
}

export enum Platform {
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE'
}