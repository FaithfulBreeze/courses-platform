import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';

@ObjectType()
@Entity()
export class Lesson {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnail: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.lesson)
  @JoinColumn()
  reviews: Review[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.completedLessons)
  completedBy: User[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration?: string;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @Column()
  courseId: number;
}
