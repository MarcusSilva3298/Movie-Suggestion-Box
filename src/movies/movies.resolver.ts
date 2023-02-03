import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Movie } from './entities/movie.entity'
import { CreateMovieInput } from './dto/create-movie.input'
import { UpdateMovieInput } from './dto/update-movie.input'
import { MoviesService } from './services/movies.service'

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => Movie)
  addMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return this.moviesService.create(createMovieInput)
  }

  @Query(() => [Movie], { name: 'movies' })
  list() {
    return this.moviesService.list()
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.moviesService.findOne(id)
  }

  @Mutation(() => Movie)
  updateMovies(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.moviesService.update(updateMovieInput)
  }

  @Mutation(() => Movie)
  removeMovie(@Args('id', { type: () => String }) id: string) {
    return this.moviesService.remove(id)
  }
}
