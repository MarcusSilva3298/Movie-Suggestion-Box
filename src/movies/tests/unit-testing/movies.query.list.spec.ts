import { NotFoundException } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { Movie } from '../../entities/movie.entity'
import { MoviesModule } from '../../movies.module'
import { MoviesRepository } from '../../movies.repository'
import { MoviesService } from '../../services/movies.service'
import { MovieMock } from '../mocks/mock.entity'

describe('Movies Query - Find By Id', () => {
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

  it('Should pass - found none movies', async () => {
    jest.spyOn(repository, 'list').mockImplementationOnce(async () => [])

    const movies = await service.list()

    expect(movies).toHaveLength(0)
  })

  it('Should pass - found one movie', async () => {
    jest
      .spyOn(repository, 'list')
      .mockImplementationOnce(async () => [new MovieMock()])

    const movies = await service.list()

    expect(movies).toHaveLength(1)
    expect(movies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          genre: expect.any(String),
          rating: expect.any(String),
          duration: expect.any(String),
          synopsis: expect.any(String),
          year_of_release: expect.any(String),
          created_at: expect.any(Date),
          updated_at: expect.any(Date)
        })
      ])
    )
  })

  it('Should pass - found more than one', async () => {
    jest.spyOn(repository, 'list').mockImplementationOnce(async () => {
      const movie_length = Math.floor(Math.random() * 10)
      const movies: Movie[] = []

      for (let i = 0; i < movie_length; i++) movies.push(new MovieMock())

      return movies
    })

    const movies = await service.list()

    expect(movies.length).toBeGreaterThan(1)
    expect(movies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          genre: expect.any(String),
          rating: expect.any(String),
          duration: expect.any(String),
          synopsis: expect.any(String),
          year_of_release: expect.any(String),
          created_at: expect.any(Date),
          updated_at: expect.any(Date)
        })
      ])
    )
  })
})
