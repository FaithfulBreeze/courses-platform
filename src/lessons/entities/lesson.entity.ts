import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Lesson {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  thumbnail: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

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
