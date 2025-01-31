export interface QueryParamsType {
  page?: number
  limit?: number
  keyword?: string
  sort_field?: 'modified.time' | '_id' | 'year'
  sort_type?: 'asc' | 'desc'
  sort_lang?: 'vietsub' | 'thuyet-minh' | 'long-tieng'
  category?: string
  country?: string
  year?: number
}
