import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Lesson {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  videoUrl: string;

  @Field()
  @Column()
  videoThumbnail: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @Column()
  courseId: number;
}
