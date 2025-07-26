import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

@ObjectType()
@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  content: string;

  @Field(() => Int)
  @Column({ enum: [1, 2, 3, 4, 5], default: 1 })
  rate: number;

  @Field(() => User)
  @ManyToOne(() => User, (reviewer) => reviewer.reviews)
  reviewer: User;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.reviews)
  course: Course;

  @Field(() => Lesson)
  @ManyToOne(() => Lesson, (lesson) => lesson.reviews)
  lesson: Lesson;
}
