import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateMovieInput {
  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  genre?: string

  @Field(() => String, { nullable: true })
  rating?: string

  @Field(() => String, { nullable: true })
  duration?: string

  @Field(() => String, { nullable: true })
  synopsis?: string

  @Field(() => String, { nullable: true })
  year_of_release?: string
}
