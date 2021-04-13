<template>
  <div>
    <!-- Group Label -->
    <div
      :class="[
        'group-header',
        { 'group-header--is-collapse': openItems },
        { 'submenu--is-minimized': isMinimizedMenuItem },
      ]"
      @click="clickGroup"
    >
      <div>
        <!-- Group Icon -->
        <span v-if="icon" class="submenu__icon-holder text-white">
          <i :class="['fas', icon]"></i>
        </span>

        <!-- Group Name -->
        <span class="submenu__title text-white">{{ title }}</span>
      </div>

      <span class="submenu__action text-white">
        <i :class="['fas', 'fa-caret-down', { 'fa-caret--up': openItems }]"></i>
      </span>
    </div>
    <!-- /Group Label -->

    <!-- Group Items -->
    <div ref="items" :class="{ 'd-none': !openItems || isMinimizedMenuItem }">
      <template v-for="(child, index) in group.children">
        <!-- Else: Item -->
        <template v-if="!child.hidden">
          <VNavMenuItem
            :key="index"
            :icon="child.meta.icon"
            :to="`${basePath}/${group.path}/${child.path}`"
            :title="child.meta.title"
            class="pl-5"
          />
        </template>
      </template>
    </div>
    <!-- /Group Items -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VNavMenuItem from './VerticalNavMenuItem.vue';

export default {
  name: 'VerticalNavMenuGroup',
  components: {
    VNavMenuItem,
  },
  props: {
    group: { type: Object, default: null },
    icon: { type: String, default: '' },
    basePath: { type: String, default: '' },
    title: { type: String, default: '' },
  },
  data: () => ({
    openItems: false,
    hasSubgroup: false,
  }),
  computed: {
    ...mapGetters({
      isMinimizedMenuItem: 'app/verticalNavMenuItemsMin',
    }),
  },
  watch: {
    $route: {
      handler(newRouter) {
        if (
          this.group.children.filter(
            (child) => `${this.group.path}/${child.path}` === newRouter.path,
          ).length
        ) {
          this.openItems = true;
          if (this.$parent.hasSubgroup) {
            this.$parent.openItems = true;
          }
        } else {
          this.openItems = false;
        }
      },
      immediate: true,
    },
    group: {
      handler(value) {
        if (value.children.length) {
          this.hasSubgroup = true;
        }
      },
      immediate: true,
    },
  },
  methods: {
    clickGroup() {
      this.openItems = !this.openItems;
    },
    hasOneShowingChild(children = []) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        }
        return true;
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="sass" scoped>
.group-header
  display: flex
  justify-content: space-between
  align-items: center
  // height: 50px
  line-height: 50px
  cursor: pointer
  color: #127CA6
  font-weight: 500
  padding-left: 2em
  padding-right: 2em
  white-space: nowrap
  transition: all .3s ease
  font-size: 1em
  +modifier('is-collapse')
    background: #127CA6
    color: #fff
  &:hover
    color: $text-dodger-blue
.submenu
  +element('icon-holder')
    min-width: 40px
    line-height: 35px
    font-size: 20px
    display: inline-block
  +modifier('is-minimized')
    justify-content: center
    .submenu
      +element('icon-holder')
        text-align: center
      +element('title')
        display: none
      +element('action')
        display: none
.fa-caret
  +modifier('up')
    transform: rotate(180deg)
  +modifier('down')
    transform: unset
</style>
