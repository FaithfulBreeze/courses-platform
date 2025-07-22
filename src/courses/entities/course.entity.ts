import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
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
}
