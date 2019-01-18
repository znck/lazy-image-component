import LazyImage from './LazyImage.vue'

export { LazyImage }

export default function install(Vue, options = {}) {
  if (options.global !== false) Vue.component('LazyImage', LazyImage)

  LazyImage.props.thumbnail.default = options.thumbnail || ''
}

if (typeof window !== 'undefined' && 'Vue' in window) {
  install(window.Vue)
}
