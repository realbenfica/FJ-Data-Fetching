import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export default class AdCreative extends BaseEntity {
  @PrimaryColumn({unique: true})
  id: string

  @Column({nullable: false})
  video_id:string

  @Column({nullable: true})
  name:string

  @Column({nullable: true})
  status:string

  @Column({nullable: true})
  title:string

  @Column({nullable: true})
  thumbnail_url:string
}

export interface IAdCreative {
  id: string
  video_id:string
  name:string
  status:string
  title:string
  thumbnail_url:string
}