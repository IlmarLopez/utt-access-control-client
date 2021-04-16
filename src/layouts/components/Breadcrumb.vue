<template functional>
  <el-breadcrumb separator="/" class="mt-1">
    <el-breadcrumb-item :to="{ path: '/' }">
      <i class="el-icon-s-home home-icon"></i>
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
  // font-size: 1.5em
  transform: scale(1.5)
</style>
