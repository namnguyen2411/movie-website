export interface NavItemType {
  label: string
  path: string
}

export const NAV_ITEMS: NavItemType[] = [
  { label: 'Duyệt tìm', path: '/duyet-tim' },
  { label: 'Phim hot', path: '/phim-hot' },
  { label: 'Phim bộ', path: '/phim-bo' },
  { label: 'Phim lẻ', path: '/phim-le' }
]

export const COUNTRIES = [
  { name: 'Hàn Quốc', path: '/quoc-gia/han-quoc' },
  { name: 'Trung Quốc', path: '/quoc-gia/trung-quoc' },
  { name: 'Thái Lan', path: '/quoc-gia/thai-lan' },
  { name: 'Âu Mỹ', path: '/quoc-gia/au-my' }
]
