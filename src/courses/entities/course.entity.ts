import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Review } from '../../reviews/entities/review.entity';
import { User } from '../../users/entities/user.entity';
import { CoursePurchase } from './course-purchase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  thumbnail: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  trailer?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  trailerDuration?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration?: string;

  @Field()
  @ManyToOne(() => User, (owner) => owner.createdCourses)
  @JoinColumn()
  owner: User;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.purchasedCourses)
  students: User[];

  @Field(() => [Lesson])
  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @Field(() => [CoursePurchase])
  @OneToMany(() => CoursePurchase, (coursePurchase) => coursePurchase.user)
  coursePurchases: CoursePurchase;
}
