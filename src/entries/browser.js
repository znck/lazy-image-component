import { install } from '../plugin'

if (typeof window !== 'undefined' && 'Vue' in window) {
  const { Vue, LazyImageOptions } = window
  
  install(Vue, LazyImageOptions)
}
