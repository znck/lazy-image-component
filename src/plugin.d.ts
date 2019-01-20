import Vue from 'vue'
import LazyImage from './LazyImage.vue'

export { LazyImage }

export function install(
  vue: Vue,
  options?: Partial<{ thumbnail: string; registerComponent: boolean }>
): void
