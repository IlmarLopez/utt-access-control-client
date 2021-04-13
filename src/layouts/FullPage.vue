<template>
  <div class="layout--full-page">
    <main class="page-container">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'FullPage',
};
</script>

<style lang="sass" scoped>
.layout--full-page
  min-height: 100vh
  overflow: hidden
.page-container
  transition: all .2s ease
  overflow: hidden
  min-height: inherit
  // +forTablet
  //   padding-left: 250px
  //   +modifier('margin-left-100')
  //     padding-left: 100px
</style>
