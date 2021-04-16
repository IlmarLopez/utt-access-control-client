<template>
  <div class="d-flex align-items-center h-100">
    <div class="text-right text-white mr-2" style="line-height: 18px;">
      <p class="font-semibold mb-0 text-capitalize">{{ user.first_name }} {{ user.last_name }}</p>
      <small class="text-capitalize">{{ user.role_name }}</small>
    </div>
    <el-dropdown trigger="click" size="medium">
      <span class="el-dropdown-link">
        <el-avatar
          :size="40"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item divided @click.native="onLogout">
          <div class="d-flex">
            <feather-icon icon="LogOutIcon" svg-classes="w-75 h-75" />
            <span class="ml-2">Logout</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: 'auth/authenticatedUser',
    }),
  },
  methods: {
    async onLogout() {
      this.logout().then(() => {
        window.location.reload();
      });
    },
    ...mapActions({
      logout: 'auth/AUTH_LOGOUT',
    }),
  },
};
</script>
