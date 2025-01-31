import { CategoryType } from './category.type'
import { EpisodeType } from './episode.type'

export interface MovieResponseType {
  status: boolean
  msg: string
  movie?: MovieType
  episodes?: EpisodeType[]
  data?: DataType
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
  type: 'series' | 'single' | 'tvshows'
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

export interface DataType {
  seoOnPage: {
    og_type: string
    titleHead: string
    descriptionHead: string
    og_image: string[]
    og_url: string
  }
  breadCrumb: BreadcrumbItemType[]
  titlePage: string
  items: Omit<
    MovieType[],
    'tmdb' | 'imdb' | 'created' | 'sub_docquyen' | 'trailer_url' | 'episode_total' | 'view' | 'actor' | 'director'
  >
  params: MovieParamsType
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}

interface BreadcrumbItemType {
  name: string
  slug?: string
  isCurrent: boolean
  position: number
}

export interface MovieParamsType {
  type_slug: string
  slug: string
  filterCategory: string[]
  filterCountry: string[]
  filterYear: string
  filterType: string
  sortField: string
  sortType: string
  pagination: {
    totalItems: number
    totalItemsPerPage: number
    currentPage: number
    totalPages: number
  }
}
