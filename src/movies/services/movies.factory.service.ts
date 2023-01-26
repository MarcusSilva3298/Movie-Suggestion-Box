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

  async create(createMovieInput: CreateMovieInput): Promise<Movie> {
    const { title } = createMovieInput

    if (await this.moviesRepository.findByTitle(title))
      throw new BadRequestException(`Title: ${title} is already in use`)

    return this.moviesRepository.create(createMovieInput)
  }

  async remove(id: string): Promise<Movie> {
    await this.moviesQueryService.findById(id)

    return this.moviesRepository.remove(id)
  }

  async update(updateMovieInput: UpdateMovieInput): Promise<Movie> {
    const { id, title } = updateMovieInput

    await this.moviesQueryService.findById(id)

    if (title) {
      const titleInUse = await this.moviesRepository.findByTitle(title)

      if (titleInUse)
        throw new BadRequestException(`Title: ${title} already in use`)
    }

    return this.moviesRepository.update(updateMovieInput)
  }
}
