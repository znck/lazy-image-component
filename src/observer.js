/**
 * @typedef {object} Observer
 *
 * @property {{(element: Element, fn: ((entry: IntersectionObserverEntry) => void) | (() => void)): void}} observe
 * @property {{(element: Element): void}} unobserve
 */

/**
 * @type {WeakMap<Element, Observer>}
 */
const observers = new WeakMap()

/**
 * @param {Element|null} element
 * @returns {Observer}
 */
export default function findObserver(element) {
  const key = element || document.body

  if (observers.has(key)) return observers.get(key)

  const observer = createObserver(element)

  observers.set(key, observer)

  return observer
}

/**
 * @param {Element|null} root
 * @returns {Observer}
 */
function createObserver(root) {
  /** @type {Element[]} */
  const elements = []
  /** @type {Array<(entry: IntersectionObserverEntry) => void>} */
  const callbacks = []
  const io = new IntersectionObserver(
    /**
     * @param {Array<IntersectionObserverEntry>} entries
     */
    entries => {
      entries.forEach(entry => {
        /*
       Use intersectionRatio as isIntersecting is missing on Edge 15.
       See: https://github.com/w3c/IntersectionObserver/issues/211
       */
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          const index = elements.indexOf(entry.target)

          if (index < 0) io.unobserve(entry.target)
          else callbacks[index](entry)
        }
      })
    }
  )

  return {
    observe(element, callback) {
      io.observe(element)
      elements.push(element)
      callbacks.push(callback)
    },

    unobserve(element) {
      const index = elements.indexOf(element)

      if (index < 0) return

      io.unobserve(element)

      elements.splice(index, 1)
      callbacks.splice(index, 1)

      if (elements.length === 0 && root) {
        io.disconnect()
        observers.delete(root)
      }
    },
  }
}
