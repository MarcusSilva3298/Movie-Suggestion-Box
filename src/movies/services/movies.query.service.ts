import { Injectable } from '@nestjs/common'
import { Movie } from '../entities/movie.entity'
import { MoviesRepository } from '../movies.repository'

@Injectable()
export class MoviesQueryService {
  constructor(private moviesRepository: MoviesRepository) {}

  list(): Promise<Movie[]> {
    return this.moviesRepository.list()
  }
}
