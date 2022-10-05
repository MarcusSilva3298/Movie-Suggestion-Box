import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { v4 } from 'uuid'
import { PrismaService } from '../prisma/prisma.service'
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesRepository {
  constructor(private prisma: PrismaService) {}

  async addMovies(titles: string[]): Promise<Movie[]> {
    const ops = titles.map((title) => {
      return this.prisma.movie.upsert({
        where: { title },
        create: { id: v4(), title, votes: 1 },
        update: { votes: { increment: 1 } }
      })
    })

    return await this.prisma.$transaction(ops).catch((err) => {
      throw new InternalServerErrorException(
        `Movies: prisma transaction error\n${err}`
      )
    })
  }

  async list(): Promise<Movie[]> {
    return await this.prisma.movie.findMany({
      orderBy: { votes: 'desc' }
    })
  }
}
