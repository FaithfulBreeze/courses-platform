import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput {
  @Field(() => Int)
  id: number;
}
