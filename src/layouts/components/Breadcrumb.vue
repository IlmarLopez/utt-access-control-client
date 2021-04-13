<template functional>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="d-flex align-items-center">
    <el-breadcrumb-item :to="{ path: '/' }">
      <feather-icon icon="HomeIcon" svg-classes="h-65 w-65" class="home-icon" />
    </el-breadcrumb-item>
    <template v-for="(link, index) in props.route.meta.breadcrumb.slice(1, -1)">
      <el-breadcrumb-item v-if="link.url" :key="index" :to="{ path: link.url }">
        {{ link.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else :key="index">
        {{ link.title }}
      </el-breadcrumb-item>
    </template>
    <el-breadcrumb-item v-if="props.route.meta.breadcrumb.slice(-1)[0].active">{{
      props.route.meta.breadcrumb.slice(-1)[0].title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
};
</script>

<style lang="sass" scoped>
.home-icon
  color: $text-dodger-blue
</style>
