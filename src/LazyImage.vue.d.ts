import { Component } from 'vue'

interface Props {
  src: string
  thumbnail: string
  alt: string
  critical: boolean
  eager: boolean
  root: Element | null
  height: number | string
  width: number | string
}

export const defaults: Partial<Props>

const LazyImage: Component<
  { error: Error | null; isLoaded: boolean; isVisible: boolean },
  { load(): Promise<void> },
  { message: string },
  Props
> & {
  functional: false
}

export default LazyImage
