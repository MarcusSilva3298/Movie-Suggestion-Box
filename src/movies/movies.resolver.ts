import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Movie } from './entities/movie.entity'
import { CreateMovieInput } from './dto/create-movie.input'
import { UpdateMovieInput } from './dto/update-movie.input'
import { MoviesService } from './services/movies.service'

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => [Movie])
  addMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return this.moviesService.create(createMovieInput)
  }

  @Query(() => [Movie], { name: 'movies' })
  list() {
    return this.moviesService.list()
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.findOne(id)
  }

  @Mutation(() => Movie)
  updateMovies(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.moviesService.update(updateMovieInput)
  }

  @Mutation(() => Movie)
  removeMovie(@Args('title', { type: () => String }) title: string) {
    return this.moviesService.remove(title)
  }
}
