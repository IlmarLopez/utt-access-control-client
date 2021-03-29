<template>
  <div>
    Users
    <UserList />
  </div>
</template>

<script>
import UserList from './components/UserList.vue';

export default {
  name: 'Users',
  components: {
    UserList,
  },
  data() {
    return {};
  },
};
</script>

<style>

</style>
