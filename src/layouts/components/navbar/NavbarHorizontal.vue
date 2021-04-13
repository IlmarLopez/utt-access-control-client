<template>
  <header class="navbar py-0">
    <div class="navbar__container">
      <ul class="navbar__nav navbar__nav--left">
        <li class="navbar__nav-item">
          <i class="text-white el-icon-menu" @click="onToggleSidebar"></i>
        </li>
      </ul>
      <ul class="navbar__nav navbar__nav--right">
        <li class="navbar__nav-item">
          <h5 class="capitalize"></h5>
        </li>
      </ul>
    </div>
    <ul class="navbar__nav mb-0">
      <ProfileDropDown />
    </ul>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
import ProfileDropDown from './components/ProfileDropDown.vue';

export default {
  components: {
    ProfileDropDown,
  },
  methods: {
    onToggleSidebar() {
      this.toggleSidebar();
    },
    ...mapActions({
      toggleSidebar: 'app/TOGGLE_SIDEBAR',
    }),
  },
};
</script>

<style lang="sass" scope>
.navbar
  height: 65px
  border-radius: 5px
  border-bottom: 1px solid rgba(0,0,0,.0625)
  width: 100%
  background-color: #661429
  +element('container')
    height: inherit
    display: flex
    align-items: center
    justify-content: space-between
  +element('nav')
    list-style-type: none
    padding: 0
    height: inherit
    +modifier('left')
      // margin-left: 1em
      margin-bottom: unset
    +modifier('right')
      // margin-right: 1em
      margin-bottom: unset
  +element('nav-item')
    height: inherit
    display: flex
    align-items: center
    text-align: center
.el-icon-menu
  font-size: 24px
  color: $text-dodger-blue
  cursor: pointer
</style>
