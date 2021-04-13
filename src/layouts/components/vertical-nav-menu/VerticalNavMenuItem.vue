<template>
  <router-link
    :to="to"
    :class="[{ 'menu-item--is-minimized': isMinimizedMenuItem }, 'menu-item__link']"
    active-class="menu-item__link--active"
    exact
  >
    <span v-if="icon" class="menu-item__icon-holder text-white">
      <i :class="['fas', icon]"></i>
    </span>
    <span class="menu-item__title">{{ title }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'VerticalNavMenuItem',
  props: {
    icon: { type: String, default: null },
    title: { type: String, required: true },
    to: { type: [String, Object, null], default: null },
  },
  computed: {
    ...mapGetters({
      isMinimizedMenuItem: 'app/verticalNavMenuItemsMin',
    }),
  },
};
</script>
<style lang="sass" scoped>
.menu-item
  +element('link')
    color: #127CA6
    text-decoration: none
    font-weight: 500
    padding-left: 2em
    padding-right: 2em
    white-space: nowrap
    transition: all .3s ease
    display: flex
    font-size: 1em
    line-height: 50px
    // &:hover
    //   color: $text-dodger-blue
    +modifier('active')
      background: #edebeb
      border-left: 3px solid #BA9E66
      color: rgba(white,1)
      // &:hover
      //   color: rgba(white,1)
  +element('icon-holder')
    min-width: 40px
    font-size: 20px
    display: inline-block
  +element('title')
    display: flex
    align-items: center
    color: #ba9e66
  +modifier('is-minimized')
    .menu-item
      +element('title')
        display: none
      +element('icon-holder')
        min-width: unset
.menu-item--is-minimized.menu-item__link
  justify-content: center
</style>
