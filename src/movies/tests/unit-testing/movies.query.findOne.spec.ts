import { NotFoundException } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { MoviesModule } from '../../movies.module'
import { MoviesRepository } from '../../movies.repository'
import { MoviesService } from '../../services/movies.service'
import { MovieMock } from '../mocks/mock.entity'

describe('Movies Query - Find One', () => {
  let service: MoviesService
  let repository: MoviesRepository

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule]
    }).compile()

    repository = moduleFixture.get<MoviesRepository>(MoviesRepository)
    service = moduleFixture.get<MoviesService>(MoviesService)
  })

  it('Should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  it('Should fail - id not found', async () => {
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => null)

    await expect(service.findOne('123')).rejects.toThrowError(
      new NotFoundException('Movie with id: 123 not found')
    )
  })

  it('Should pass - id found', async () => {
    const movie = new MovieMock()
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => movie)

    expect(await service.findOne(movie.id)).toEqual(
      expect.objectContaining(movie)
    )
  })
})
