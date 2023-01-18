import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Movie {
  @Field()
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  genre?: string

  @Field({ nullable: true })
  rating?: string

  @Field({ nullable: true })
  duration?: string

  @Field(() => String, { nullable: true })
  synopsis?: string

  @Field(() => String, { nullable: true })
  year_of_release?: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
