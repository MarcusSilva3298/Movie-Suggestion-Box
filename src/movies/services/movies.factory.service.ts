import { BadRequestException, Injectable } from '@nestjs/common'
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

  add(titles: string[]): Promise<Movie[]> {
    return this.moviesRepository.add(titles)
  }

  remove(title: string): Promise<Movie> {
    return this.moviesRepository.remove(title)
  }

  async update(updateMovieInput: UpdateMovieInput): Promise<Movie> {
    const { title, new_title } = updateMovieInput

    await this.moviesQueryService.findByTitle(title)

    if (new_title) {
      const titleInUse = await this.moviesRepository.findByTitle(new_title)

      if (titleInUse)
        throw new BadRequestException(`Title "${new_title}" already in use`)
    }

    return this.moviesRepository.update(updateMovieInput)
  }
}
