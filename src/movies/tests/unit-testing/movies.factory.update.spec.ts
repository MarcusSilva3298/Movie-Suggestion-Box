import { NotFoundException } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { MoviesModule } from '../../movies.module'
import { MoviesRepository } from '../../movies.repository'
import { MoviesService } from '../../services/movies.service'
import { MovieMock } from '../mocks/mock.entity'

describe('Movies Factory - Update Movie', () => {
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

  it('Should fail - invaldi id', async () => {
    const movie = new MovieMock()
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => null)

    await expect(service.update(movie)).rejects.toThrowError(
      new NotFoundException(`Movie with id: ${movie.id} not found`)
    )
  })

  it('Should fail - title already in use', async () => {
    const movie = new MovieMock()
    jest.spyOn(repository, 'findById').mockImplementation(async () => movie)
    jest
      .spyOn(repository, 'findByTitle')
      .mockImplementationOnce(async () => movie)

    await expect(service.update(movie)).rejects.toThrowError(
      new NotFoundException(`Title: ${movie.title} already in use`)
    )
  })

  it('Should pass -  update movie', async () => {
    const movie = new MovieMock()
    jest.spyOn(repository, 'findById').mockImplementation(async () => movie)
    jest
      .spyOn(repository, 'findByTitle')
      .mockImplementationOnce(async () => null)
    jest.spyOn(repository, 'update').mockImplementationOnce(async () => movie)

    expect(await service.update(movie)).toEqual(expect.objectContaining(movie))
  })
})
