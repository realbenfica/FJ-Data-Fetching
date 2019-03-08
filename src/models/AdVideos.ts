import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export default class AdVideos extends BaseEntity {
  @PrimaryColumn({unique: true})
  video_id: string


}