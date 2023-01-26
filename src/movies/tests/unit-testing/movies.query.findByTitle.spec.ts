import { NotFoundException } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { MoviesModule } from '../../movies.module'
import { MoviesRepository } from '../../movies.repository'
import { MoviesQueryService } from '../../services/movies.query.service'
import { MovieMock } from '../mocks/mock.entity'

describe('Movies Query - Find By Id', () => {
  let queryService: MoviesQueryService
  let repository: MoviesRepository

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule]
    }).compile()

    repository = moduleFixture.get<MoviesRepository>(MoviesRepository)
    queryService = moduleFixture.get<MoviesQueryService>(MoviesQueryService)
  })

  it('Should be defined', () => {
    expect(queryService).toBeDefined()
    expect(repository).toBeDefined()
  })

  it('Should fail - title not found', async () => {
    jest
      .spyOn(repository, 'findByTitle')
      .mockImplementationOnce(async () => null)

    await expect(queryService.findByTitle('123')).rejects.toThrowError(
      new NotFoundException('Movie with title: 123 not found')
    )
  })

  it('Should pass - title found', async () => {
    const movie = new MovieMock()
    jest
      .spyOn(repository, 'findByTitle')
      .mockImplementationOnce(async () => movie)

    expect(await queryService.findByTitle(movie.title)).toEqual(
      expect.objectContaining(movie)
    )
  })
})
