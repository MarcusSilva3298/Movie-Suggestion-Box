import { Injectable } from '@nestjs/common'
import { Movie } from '../entities/movie.entity'
import { MoviesRepository } from '../movies.repository'

@Injectable()
export class MoviesFactoryService {
  constructor(private moviesRepository: MoviesRepository) {}

  addMovies(titles: string[]): Promise<Movie[]> {
    return this.moviesRepository.addMovies(titles)
  }
}
