import { Module } from '@nestjs/common'
import { MoviesResolver } from './movies.resolver'
import { MoviesFactoryService } from './services/movies.factory.service'
import { MoviesRepository } from './movies.repository'
import { PrismaModule } from '../prisma/prisma.module'
import { MoviesService } from './services/movies.service'
import { MoviesQueryService } from './services/movies.query.service'

@Module({
  imports: [PrismaModule],
  providers: [
    MoviesResolver,
    MoviesService,
    MoviesFactoryService,
    MoviesQueryService,
    MoviesRepository
  ]
})
export class MoviesModule {}
