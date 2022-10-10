import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UpdateMovieInput {
  @Field(() => String)
  title: string

  @Field()
  new_title?: string

  @Field()
  votes?: number
}
