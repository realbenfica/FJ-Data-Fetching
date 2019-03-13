import {Entity, Column,  BaseEntity,  PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class UniqueView extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  videoAdId:string 

  @Column('date')
  date:Date

  @Column('decimal')
  views: number
}

export interface IUniqueView {
  id: string
  videoAdId:string 
  date:Date
  views: number
}