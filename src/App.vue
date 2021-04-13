<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>
<script>
export default {
  components: {
    FullPage: () => import('@/layouts/FullPage.vue'),
    Main: () => import('@/layouts/Main.vue'),
  },
  data() {
    return {};
  },
  computed: {
    layout() {
      if (this.$route.meta.layout) {
        return this.$route.meta.layout;
      }
      return 'FullPage';
    },
  },
};
</script>
<style lang="sass"></style>
