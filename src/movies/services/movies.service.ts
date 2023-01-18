import { Injectable } from '@nestjs/common'
import { CreateMovieInput } from '../dto/create-movie.input'
import { UpdateMovieInput } from '../dto/update-movie.input'
import { Movie } from '../entities/movie.entity'
import { MoviesFactoryService } from './movies.factory.service'
import { MoviesQueryService } from './movies.query.service'

@Injectable()
export class MoviesService {
  constructor(
    private moviesFactoryService: MoviesFactoryService,
    private moviesQueryService: MoviesQueryService
  ) {}

  create(createMovieInput: CreateMovieInput): Promise<Movie> {
    return this.moviesFactoryService.create(createMovieInput)
  }

  list() {
    return this.moviesQueryService.list()
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`
  }

  update(updateMovieInput: UpdateMovieInput) {
    return this.moviesFactoryService.update(updateMovieInput)
  }

  remove(id: string): Promise<Movie> {
    return this.moviesFactoryService.remove(id)
  }

  findByTitle(title: string): Promise<Movie> {
    return this.moviesQueryService.findByTitle(title)
  }
}
