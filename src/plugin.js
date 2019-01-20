import LazyImage, { defaults } from './LazyImage.vue'

export { LazyImage }

export function install(Vue, options = {}) {
  if (options.registerComponent !== false) Vue.component('LazyImage', LazyImage)

  if (options.thumbnail) defaults.thumbnail = options.thumbnail
}
