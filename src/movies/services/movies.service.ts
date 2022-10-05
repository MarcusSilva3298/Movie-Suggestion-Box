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
    return this.moviesFactoryService.addMovies(titles)
  }

  list() {
    return this.moviesQueryService.list()
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`
  }

  update(id: number, updateMovieInput: UpdateMovieInput) {
    return `This action updates a #${id} movie`
  }

  remove(id: number) {
    return `This action removes a #${id} movie`
  }
}
