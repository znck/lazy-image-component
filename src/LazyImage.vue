<script>
import PropTypes from "@znck/prop-types";
import Observer from "./observer";

export const defaults = {
  // TODO: Add url encoded fallback thumbnail.
};

const isBrowser = typeof window !== "undefined";

export default {
  inheritAttrs: false,

  props: {
    src: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.value(() =>
      typeof __LAZY_IMAGE_THUMBNAIL__ !== "undefined"
        ? __LAZY_IMAGE_THUMBNAIL__
        : defaults.thumbnail
    ),
    alt: PropTypes.string.isRequired,
    critical: PropTypes.bool,
    eager: PropTypes.bool,
    root: PropTypes.instanceOf(Element),
    height: PropTypes.oneOfType(Number, String),
    width: PropTypes.oneOfType(Number, String)
  },

  data: () => ({
    error: null,
    isLoaded: false,
    isVisible: false
  }),

  computed: {
    message() {
      return this.error ? this.error.message : false;
    }
  },

  beforeCreate() {
    PropTypes.validate(() => {
      if (this.height === null || this.width) {
        throw new Error(
          `LazyImg should be used with expected height and width. The height and width are used to render correct sized placeholder.`
        );
      }
    });
  },

  created() {
    if (
      this.src.startsWith("data:image/") || // Inline image.
      (!isBrowser && this.critical) // Loaded due to SSR generated HTML.
    ) {
      this.isVisible = this.isLoaded = true;
    }
  },

  mounted() {
    if (this.critical && this.src !== this.$el.getAttribute("src"))
      return this.load().then(() => (this.isVisible = true));

    this.observer = Observer(this.root || null);

    if (!this.isLoaded) {
      if (this.eager) this.load();

      this.observer.observe(this.$el, async () => {
        this.observer.unobserve(this.$el);

        if (!this.eager) {
          await this.load();
        }

        this.isVisible = true;
      });
    }
  },

  beforeDestroy() {
    this.observer.unobserve(this.$el); // Remove intersection handler.

    delete this.observer; // Remove observer reference so it can be garbage collected.
  },

  methods: {
    load() {
      return new Promise(resolve => {
        const image = new Image();

        image.onload = () => {
          this.isLoaded = true;

          return resolve();
        };
        image.onerror = error => {
          this.error = error;

          return resolve();
        };

        image.src = this.src; // Trigger image download.
      });
    }
  }
};
</script>

<template>
  <div :class="$style.container">
    <span v-if="message" hidden role="alert" aria-live="polite">
      {{
      message
      }}
    </span>
    
    <img
      v-if="isLoaded && isVisible"
      key="image"
      :class="[$style.image, $style.loaded]"
      :src="src"
      :alt="alt"
      v-bind="$attrs"
      v-on="$listeners"
    >
    <img
      v-else
      key="image"
      :class="$style.placeholder"
      :src="placeholder"
      :alt="alt"
      :style="{ width, height }"
      v-bind="$attrs"
      v-on="$listeners"
    >
  </div>
</template>

<style module>
.container {
  display: contents;
}

.image {
  opacity: 0;
  transition: opacity 1s linear;
}

.image.loaded {
  opacity: 1;
}

.placeholder {
  filter: blur(10px);
  transform: scale(1);
  object-fit: fill;
}
</style>
