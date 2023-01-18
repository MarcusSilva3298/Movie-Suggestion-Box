import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateMovieInput } from '../dto/create-movie.input'
import { UpdateMovieInput } from '../dto/update-movie.input'
import { Movie } from '../entities/movie.entity'
import { MoviesRepository } from '../movies.repository'
import { MoviesQueryService } from './movies.query.service'

@Injectable()
export class MoviesFactoryService {
  constructor(
    private moviesRepository: MoviesRepository,
    private moviesQueryService: MoviesQueryService
  ) {}

  create(createMovieInput: CreateMovieInput): Promise<Movie> {
    return this.moviesRepository.create(createMovieInput)
  }

  remove(title: string): Promise<Movie> {
    return this.moviesRepository.remove(title)
  }

  async update(updateMovieInput: UpdateMovieInput): Promise<Movie> {
    const { id, title } = updateMovieInput

    await this.moviesQueryService.findById(id)

    if (title) {
      const titleInUse = await this.moviesRepository.findByTitle(title)

      if (titleInUse)
        throw new BadRequestException(`Title "${title}" already in use`)
    }

    return this.moviesRepository.update(updateMovieInput)
  }
}
