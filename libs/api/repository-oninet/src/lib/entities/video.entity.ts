import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity({name: 'video'})
export class Video {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: false })
  url: string;

  @ApiProperty()
  @Column({ nullable: true })
  s3Url: string;

  @ManyToMany(
    () => User,
    (user) => user.videos
  )
  @JoinTable({
    name: "users_videos",
    joinColumn: {
      name: "video",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user",
      referencedColumnName: "id"
    }
  })
  users: User[]
}
