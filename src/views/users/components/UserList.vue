<template>
  <div>
    <div class="col-12 d-flex justify-content-end">
      <el-button @click="drawerCreateUser = true" size="small" type="primary">Add user</el-button>
    </div>
    <el-table :data="users" stripe style="width: 100%">
      <el-table-column prop="first_name" label="First name"> </el-table-column>
      <el-table-column prop="last_name" label="Last name"> </el-table-column>
      <el-table-column prop="username" label="Username"> </el-table-column>
      <el-table-column prop="role_name" label="Role"> </el-table-column>
      <el-table-column label="Created at">
        <template slot-scope="scope">
          {{ scope.row.created_at | date }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Actions">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick" type="text" size="small">Detail</el-button> -->
          <el-button @click="onEditUser({ ...scope.row })" type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer title="Edit user" :visible.sync="drawerEditUser" direction="rtl">
      <UserEdit :data="selectedUser" @close="drawerEditUser = false" @update="updateUser" />
    </el-drawer>
    <el-drawer title="Add new user" :visible.sync="drawerCreateUser" direction="rtl">
      <UserCreate @close="drawerCreateUser = false" @created="addUser" />
    </el-drawer>
  </div>
</template>

<script>
import _ from 'lodash';
import UserEdit from './UserEdit.vue';
import UserCreate from './UserCreate.vue';

export default {
  name: 'UserList',
  components: {
    UserEdit,
    UserCreate,
  },
  data() {
    return {
      users: [],
      drawerEditUser: false,
      drawerCreateUser: false,
      selectedUser: null,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    addUser(user) {
      this.users.unshift(user);
    },
    fetchUsers() {
      this.$http({ url: 'users', method: 'GET' })
        .then((res) => {
          this.users = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onEditUser(data) {
      this.selectedUser = data;
      this.drawerEditUser = true;
    },
    updateUser(data) {
      const index = _.findIndex(this.users, (o) => o.id === data.id);
      this.users[index].first_name = data.first_name;
      this.users[index].last_name = data.last_name;
      this.users[index].username = data.username;
      this.users[index].role_name = data.role_name;
    },
  },
};
</script>

<style></style>
