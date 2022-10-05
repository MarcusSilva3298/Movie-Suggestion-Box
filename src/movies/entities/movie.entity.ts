import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Movie {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  votes: number

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
