import { Injectable, NotFoundException } from '@nestjs/common'
import { Movie } from '../entities/movie.entity'
import { MoviesRepository } from '../movies.repository'

@Injectable()
export class MoviesQueryService {
  constructor(private moviesRepository: MoviesRepository) {}

  list(): Promise<Movie[]> {
    return this.moviesRepository.list()
  }

  async findByTitle(title: string): Promise<Movie> {
    const movie = await this.moviesRepository.findByTitle(title)

    if (!movie)
      throw new NotFoundException(`Movie with title: ${title} not found`)

    return movie
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findById(id)

    if (!movie) throw new NotFoundException(`Movie with id: ${id} not found`)

    return movie
  }
}
