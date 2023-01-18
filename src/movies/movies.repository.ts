import { Injectable } from '@nestjs/common'
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

  async remove(id: string): Promise<Movie> {
    return await this.prisma.movie.delete({
      where: { id }
    })
  }

  async findByTitle(title: string): Promise<Movie> {
    return await this.prisma.movie.findUnique({
      where: { title }
    })
  }

  async findById(id: string): Promise<Movie> {
    return await this.prisma.movie.findUnique({
      where: { id }
    })
  }

  async update({
    title,
    duration,
    genre,
    id,
    rating,
    synopsis,
    year_of_release
  }: UpdateMovieInput): Promise<Movie> {
    return await this.prisma.movie.update({
      where: { id },
      data: { title, duration, genre, rating, synopsis, year_of_release }
    })
  }
}
