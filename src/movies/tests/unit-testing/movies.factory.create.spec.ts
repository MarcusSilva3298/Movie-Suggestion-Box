import { MoviesRepository } from '../../movies.repository'
import { MoviesService } from '../../services/movies.service'
import { Test, TestingModule } from '@nestjs/testing'
import { MoviesModule } from '../../movies.module'
import { MovieMock } from '../mocks/mock.entity'
import { BadRequestException } from '@nestjs/common'

describe('Users Factory - Create Movie', () => {
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

  it('Should fail - title already in use', async () => {
    const movie = new MovieMock()
    jest
      .spyOn(repository, 'findByTitle')
      .mockImplementationOnce(async () => movie)

    await expect(service.create({ title: movie.title })).rejects.toThrowError(
      new BadRequestException(`The title ${movie.title} is already in use`)
    )
  })

  it('Should complete', async () => {
    const movie = new MovieMock()
    jest
      .spyOn(repository, 'findByTitle')
      .mockImplementationOnce(async () => null)
    jest.spyOn(repository, 'create').mockImplementationOnce(async () => movie)

    expect(await service.create({ title: movie.title })).toEqual(
      expect.objectContaining({
        title: movie.title,
        genre: movie.genre,
        rating: movie.rating,
        duration: movie.duration,
        synopsis: movie.synopsis,
        year_of_release: movie.year_of_release
      })
    )
  })
})
