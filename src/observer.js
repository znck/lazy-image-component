export class Observer {
  /** @type {WeakMap<Element, Observer>} */
  static observers = new WeakMap()

  /**
   * @param {Element|null} element
   * @returns {Observer}
   */
  static from(element) {
    const key = element || document.body

    if (Observer.observers.has(key)) return Observer.observers.get(key)

    const observer = new Observer(element)

    Observer.observers.set(key, observer)

    return observer
  }

  /** @param {Element|null} root */
  constructor(root) {
    this.io = new IntersectionObserver(
      entries => this.onIntersection(entries),
      { root }
    )
    this.root = root
    /** @type {Element[]} */
    this.elements = []
    this.callbacks = []
  }

  /**
   * @private
   * @param {Array<IntersectionObserverEntry>} entries
   */
  onIntersection(entries) {
    entries.forEach(entry => {
      /*
      Use intersectionRatio as isIntersecting is missing on Edge 15.
      See: https://github.com/w3c/IntersectionObserver/issues/211
      */
      if (entry.intersectionRatio > 0) {
        const index = this.elements.indexOf(entry.target)

        if (index < 0) this.io.unobserve(entry.target)
        else this.callbacks[index](entry)
      }
    })
  }

  /**
   * @param {Element} element
   * @param {function(): void} callback
   */
  observe(element, callback) {
    this.io.observe(element)
    this.elements.push(element)
    this.callbacks.push(callback)
  }

  /** @param {Element} element */
  unobserve(element) {
    const index = this.elements.indexOf(element)

    if (index < 0) return

    this.io.unobserve(element)
    this.elements.splice(index, 1)
    this.callbacks.splice(index, 1)

    if (this.elements.length === 0 && this.root) {
      this.io.disconnect()

      Observer.observers.delete(this.root)
    }
  }
}
