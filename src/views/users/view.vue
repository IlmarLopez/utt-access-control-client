<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <el-card>
          <div class="d-flex">
            <div class="d-flex mr-5">
              <div class="mr-2">
                <el-avatar shape="square" :size="100" :src="squareUrl"></el-avatar>
              </div>
              <div class="text-left">
                <h5 class="text-capitalize mb-0">{{ user.firstName }} {{ user.lastName }}</h5>
                <p>example@email.com</p>
                <div>
                  <el-button type="primary" size="small" :disabled="!canActions.edit"
                    >Edit</el-button
                  >
                  <el-button
                    @click="canActions.disable ? onDisableUser() : onEnableUser()"
                    type="danger"
                    size="small"
                    plain
                    >{{ canActions.disable ? 'Disable user' : 'Enable user' }}</el-button
                  >
                </div>
              </div>
            </div>
            <div class="ml-5">
              <table>
                <tr>
                  <th>
                    <i class="el-icon-user mr-2"></i>
                    <span class="mr-5">Username</span>
                  </th>
                  <td>{{ user.username }}</td>
                </tr>
                <tr class="text-left">
                  <th>
                    <i class="el-icon-check mr-2"></i>
                    <span class="mr-5">Status</span>
                  </th>
                  <td>
                    <el-tag v-if="user.isActive" type="success" size="mini">Active</el-tag>
                    <el-tag v-else type="danger" size="mini">Inactive</el-tag>
                  </td>
                </tr>
                <tr class="text-left">
                  <th>
                    <i class="el-icon-star-off mr-2"></i>
                    <span class="mr-5">Role</span>
                  </th>
                  <td class="text-capitalize">{{ user.roleName }}</td>
                </tr>
              </table>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  data() {
    return {
      canActions: {
        disable: false,
        edit: false,
      },
      user: {
        firstName: null,
        lastName: null,
        username: null,
        roleName: null,
        roleId: null,
        createdAt: null,
        isActive: null,
      },
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    };
  },
  created() {
    this.fetchUser(this.$route.params.id);
  },
  methods: {
    fetchUser(id) {
      this.$http({ url: `users/${id}`, method: 'GET' })
        .then((res) => {
          this.user.id = res.data.id;
          this.user.firstName = res.data.first_name;
          this.user.lastName = res.data.last_name;
          this.user.username = res.data.username;
          this.user.roleName = res.data.role_name;
          this.user.roleId = res.data.role_id;
          this.user.createdAt = res.data.created_at;
          this.user.isActive = res.data.is_active;
          this.canActions.disable = res.data.is_active;
        })
        .catch((err) => {
          this.$message.error(`Oops, ${err}.`);
          this.$router.push({ name: 'users' });
        });
    },
    onDisableUser() {
      this.$confirm('This disable  user.. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        this.disableUser(this.user.id);
      });
    },
    disableUser(id) {
      this.$http({ url: `users/${id}`, method: 'DELETE' })
        .then(() => {
          this.$message({
            type: 'success',
            message: 'Delete completed',
          });
          this.user.isActive = false;
          this.canActions.edit = false;
          this.canActions.disable = false;
        })
        .catch(() => {
          this.$message.error('Oops, something went wrong!');
        });
    },
    onEnableUser() {
      this.$confirm('This enable the user.. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        this.enableUser(this.user.id);
      });
    },
    enableUser(id) {
      this.$http({
        url: `users/${id}`,
        data: {
          is_active: true,
          first_name: this.user.firstName,
          last_name: this.user.lastName,
          role_id: this.user.roleId,
          username: this.user.username,
        },
        method: 'PUT',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: 'Delete completed',
          });
          this.user.isActive = true;
          this.canActions.edit = true;
          this.canActions.disable = true;
        })
        .catch(() => {
          this.$message.error('Oops, something went wrong!');
        });
    },
  },
};
</script>

<style></style>
