import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @Field(() => [Course])
  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable()
  purchasedCourses: Course[];

  @Field(() => [Lesson])
  @ManyToMany(() => Lesson, (lesson) => lesson.completedBy)
  @JoinTable()
  completedLessons: Lesson[];

  @Field(() => [Course])
  @OneToMany(() => Course, (course) => course.owner)
  createdCourses: Course[];
}
