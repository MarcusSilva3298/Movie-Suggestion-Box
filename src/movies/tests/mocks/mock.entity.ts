import { v4 } from 'uuid'
import { Movie } from '../../entities/movie.entity'
import { faker } from '@faker-js/faker'

const setDuration = () => {
  let hours: number, minutes: number

  do {
    hours = faker.datatype.number({ max: 3, min: 0 })
    minutes = faker.datatype.number({ max: 59, min: 0 })
  } while (hours === 0 && minutes === 0)

  let durationString = ''
  if (hours !== 0) durationString += `${hours} hours`
  if (minutes !== 0) durationString += `${minutes} minutes`

  return durationString
}

export class MovieMock extends Movie {
  constructor() {
    super()
    this.id = v4()
    this.title = faker.music.songName()
    this.genre = faker.music.genre()
    this.rating = `${faker.datatype.float({ max: 10 })}`
    this.duration = setDuration()
    this.synopsis = faker.lorem.paragraph()
    this.year_of_release = `${faker.date.past().getFullYear()}`

    this.created_at = new Date()
    this.updated_at = new Date()
  }
}
