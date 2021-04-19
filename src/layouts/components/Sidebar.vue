<template>
  <div class="sidebar" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="sidebar-inner">
      <div class="sidebar-logo">
        <router-link to="{ name: 'home' }" class="sidebar-logo__link">
          <img v-if="!sidebar.isCollapsed" src="@/assets/logo-utt.png" alt="" />
        </router-link>
        <div class="sidebar-logo__toggle text-white" @click="sidebarToggle">
          <span>
            <i class="el-icon-close text-white"></i>
          </span>
        </div>
      </div>
      <div class="sidebar-menu">
        <VerticalNavMenu :nav-menu-items="allowedRoutes" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import VerticalNavMenu from './vertical-nav-menu/VerticalNavMenu.vue';

export default {
  name: 'Sidebar',
  components: { VerticalNavMenu },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: 'auth/authenticatedUser',
      allowedRoutes: 'permission/allowedRoutes',
      sidebar: 'app/sidebar',
    }),
  },
  methods: {
    mouseEnter() {
      if (this.sidebar.isCollapsed) this.updateVerticalNavMemuItemsMin(false);
    },
    mouseLeave() {
      if (this.sidebar.isCollapsed) this.updateVerticalNavMemuItemsMin(true);
    },
    sidebarToggle() {
      this.$emit('sidebar-toggle');
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        }
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item;
        return true;
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
    },
    ...mapActions({
      updateVerticalNavMemuItemsMin: 'app/UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN',
    }),
  },
};
</script>
<style scoped lang="sass">
.sidebar
  background-color: #661429
  width: 250px
  overflow: auto
  position: fixed
  top: 0
  bottom: 0
  left: 0
  transition: all .2s ease
  z-index: 1000
  box-shadow: 13px -2px 27px -12px rgba(41, 50, 66, 0.075)
  +modifier('is-collapsed')
    +forTablet
      width: 80px
      &:hover
        width: 250px
        .nav-item
          +element('title')
            display: flex
.sidebar-inner
  position: relative
  height: 100%
.sidebar-logo
  border-bottom: 1px solid rgba(0,0,0,.0625)
  line-height: 0
  height: 100px
  // padding: 20px
  transition: all .2s ease
  display: flex
  justify-content: space-between
  align-items: center
  +element('link')
    text-decoration: none
    color: $text-white
    font-size: 1.2em
    transition: all .3s ease-in-out
    width: 100%
    display: flex
    justify-content: center
  +element('toggle')
    cursor: pointer
    +forTablet
      display: none
.sidebar-menu
  position: relative
  padding: 0
  margin-top: 2em
  overflow:  hidden auto
  height: calc(100vh - 65px)
</style>
