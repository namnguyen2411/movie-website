import { CategoryType } from './category.type'
import { EpisodeType } from './episode.type'

export interface MovieResponseType {
  status: boolean
  msg: string
  movie: MovieType
  episodes: EpisodeType[]
}

export interface MovieType {
  tmdb: TmdbInfo
  imdb: {
    id: string
  }
  created: {
    time: string
  }
  modified: {
    time: string
  }
  _id: string
  name: string
  slug: string
  origin_name: string
  content: string
  type: 'series' | 'single'
  status: 'ongoing' | 'completed'
  thumb_url: string
  poster_url: string
  chieurap: boolean
  trailer_url: string
  time: string
  episode_current: string
  episode_total: string
  quality: string
  lang: string
  showtimes: string
  year: number
  view: number
  actor: string[]
  director: string[]
  category: CategoryType[]
  country: CategoryType[]
}

interface TmdbInfo {
  type: 'tv' | 'movie'
  id: string
  season: number | null
  vote_average: number
  vote_count: number
}
