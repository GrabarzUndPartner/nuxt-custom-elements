<template>
  <component
    :is="tag"
    class="atom-headline"
    :class="styleClasses"
  >
    <slot>
      <span
        v-if="$slots.overline || overline"
        class="overline"
      >
        <slot name="overline">
          {{ overline }}
        </slot>
      </span>
      <span
        v-if="$slots.headline || headline"
        class="headline"
      >
        <slot name="headline">
          {{ headline }}
        </slot>
      </span>
      <span
        v-if="$slots.subline || subline"
        class="subline"
      >
        <slot name="subline">
          {{ subline }}
        </slot>
      </span>
    </slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default () {
        return 'h1'
      }
    },
    styleType: {
      type: String,
      default () {
        return null
      }
    },
    overline: {
      type: String,
      required: false,
      default () {
        return 'Lorem Overline'
      }
    },
    headline: {
      type: String,
      required: false,
      default () {
        return 'Lorem Headline'
      }
    },
    subline: {
      type: String,
      required: false,
      default () {
        return 'Lorem Subline'
      }
    }
  },
  computed: {
    styleClasses () {
      const classes = {}
      classes[`headline--${this.tag}`] = true
      classes[`headline--${this.styleType}`] = this.styleType
      return classes
    }
  }
}
</script>

<style lang="postcss" scoped>
.atom-headline {
  font-style: normal;
  font-weight: 400;

  & > * {
    display: block;
  }

  /* ########## */

  &.headline--h1 {
    /* empty */
  }

  &.headline--h2 {
    & .overline,
    & .subline {
      font-family: sans-serif;
      font-size: calc(12 / 375 * 100vw);
      font-weight: normal;

      @media (--xs) {
        font-size: 12px;
      }
    }

    & .subline {
      font-weight: 500;
    }

    & .headline {
      font-family: serif;
      font-size: calc(36 / 375 * 100vw);
      font-weight: 700;

      @media (--xs) {
        font-size: 36px;
      }
    }
  }

  &.headline--h3 {
    /* empty */
  }

  &.headline--h4 {
    /* empty */
  }

  &.headline--h5 {
    /* empty */
  }

  &.headline--h6 {
    /* empty */
  }

  &.headline--view-header {
    padding: 15px;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: normal;
  }

  &.headline--view {
    /* empty */
  }
}
</style>
