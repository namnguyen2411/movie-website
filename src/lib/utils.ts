import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertMinutesToHours(input: string): string {
  const minutes = parseInt(input.replace(' phút', ''), 10)

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes

  return `${hours}h ${formattedMinutes}m`
}

export const decodeHtml = (input: string): string => {
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent ?? ''
}
