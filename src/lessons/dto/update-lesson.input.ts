import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLessonInput {
  @Field(() => Int)
  id: number;
}
