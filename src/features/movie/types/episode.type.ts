export interface EpisodeType {
  server_name: string
  server_data: EpisodeDataType[]
}

export interface EpisodeDataType {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}
