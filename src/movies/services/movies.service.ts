import { Injectable } from '@nestjs/common'
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

  create(titles: string[]): Promise<Movie[]> {
    return this.moviesFactoryService.add(titles)
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

  remove(title: string): Promise<Movie> {
    return this.moviesFactoryService.remove(title)
  }

  findByTitle(title: string): Promise<Movie> {
    return this.moviesQueryService.findByTitle(title)
  }
}
