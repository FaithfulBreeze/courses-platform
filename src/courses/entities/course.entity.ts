import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
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
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  thumbnail: string;

  @Field()
  @ManyToOne(() => User, (owner) => owner.createdCourses)
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
}
