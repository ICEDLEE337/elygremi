import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity({name: 'role'})
export class Role {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ManyToMany(
    () => User,
    (user) => user.roles
  )
  @JoinTable({
    name: "users_roles",
    joinColumn: {
      name: "role",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user",
      referencedColumnName: "id"
    }
  })
  users: User[]
}
