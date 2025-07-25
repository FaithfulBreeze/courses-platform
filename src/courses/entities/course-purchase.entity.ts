import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@ObjectType()
@Entity()
export class CoursePurchase {
  constructor() {
    this.purchasedAt = new Date();
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.coursePurchases)
  user: User;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.coursePurchases)
  course: Course;

  @Field()
  @Column()
  purchasedAt: Date;
}
