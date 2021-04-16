<template>
  <div class="layout-default">
    <Sidebar
      :class="{ 'sidebar--is-collapsed': sidebar.isCollapsed }"
      @sidebar-toggle="onToggleSidebar"
    />
    <div class="page-container" :class="{ 'page-container--margin-left-100': sidebar.isCollapsed }">
      <div class="container-fluid py-2">
        <NavbarHorizontal class="mb-4" />
        <div v-if="$route.meta.pageTitle" class="d-flex align-items-center mb-4">
          <div class="pr-3 border-right border-solid mr-3">
            <h4 class="mb-0">{{ $route.meta.pageTitle }}</h4>
          </div>

          <Breadcrumb v-if="$route.meta.breadcrumb" :route="$route" />
        </div>
        <main>
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Sidebar from './components/Sidebar.vue';
import NavbarHorizontal from './components/navbar/NavbarHorizontal.vue';
import Breadcrumb from './components/Breadcrumb.vue';

export default {
  name: 'Main',
  components: {
    Sidebar,
    NavbarHorizontal,
    Breadcrumb,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: 'auth/authenticatedUser',
      sidebar: 'app/sidebar',
    }),
  },
  methods: {
    onToggleSidebar() {
      this.toggleSidebar();
    },
    async onLogout() {
      this.logout().then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
    },
    ...mapActions({
      logout: 'auth/AUTH_LOGOUT',
      toggleSidebar: 'app/TOGGLE_SIDEBAR',
    }),
  },
};
</script>
<style lang="sass" scoped>
.layout-default
  min-height: 100vh
  overflow: hidden
.page-container
  transition: all .2s ease
  +forTablet
    padding-left: 250px
    +modifier('margin-left-100')
      padding-left: 100px
.sidebar-toggle
  color: $text-dodger-blue
  font-size: 20px
  display: block
  padding: 0 15px 0 0
  min-height: 65px
  line-height: 65px
  transition: all .2s ease-in-out
.sign-out
  font-size: 18px
  &:hover
    color: #22b9ff
    cursor: pointer
</style>
