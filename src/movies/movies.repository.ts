import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { v4 } from 'uuid'
import { PrismaService } from '../prisma/prisma.service'
import { CreateMovieInput } from './dto/create-movie.input'
import { UpdateMovieInput } from './dto/update-movie.input'
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    duration,
    genre,
    rating,
    synopsis,
    title,
    year_of_release
  }: CreateMovieInput): Promise<Movie> {
    return await this.prisma.movie.create({
      data: {
        id: v4(),
        title,
        genre,
        duration,
        rating,
        synopsis,
        year_of_release
      }
    })
  }

  async list(): Promise<Movie[]> {
    return await this.prisma.movie.findMany({
      orderBy: { title: 'asc' }
    })
  }

  async remove(title: string): Promise<Movie> {
    return await this.prisma.movie.delete({
      where: { title }
    })
  }

  async findByTitle(title: string): Promise<Movie> {
    return await this.prisma.movie.findUnique({
      where: { title }
    })
  }

  async update({ title, new_title, votes }: UpdateMovieInput): Promise<Movie> {
    return await this.prisma.movie.update({
      where: { title },
      data: { title: new_title, votes }
    })
  }
}
