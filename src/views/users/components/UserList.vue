<template>
  <div>
    <div class="col-12 d-flex justify-content-end">
      <el-button @click="dialogCreateUser = true" size="small" type="primary"
        >Agregar usuario</el-button
      >
    </div>
    <el-table :data="users" stripe style="width: 100%">
      <el-table-column label="Nombre">
        <template slot-scope="scope">
          <span class="text-capitalize">{{ scope.row.first_name }} {{ scope.row.last_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="Nombre de usuario"> </el-table-column>
      <el-table-column label="Cargo">
        <template slot-scope="scope">
          <span class="text-uppercase">{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Estado">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_active" type="success" size="mini">Activo</el-tag>
          <el-tag v-else type="danger" size="mini">Inactivo</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Creado en">
        <template slot-scope="scope">
          {{ scope.row.created_at | date }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Acciones">
        <template slot-scope="scope">
          <el-button
            @click="$router.push({ name: 'userView', params: { id: scope.row.id } })"
            type="text"
            size="small"
            >Detalles</el-button
          >
          <el-button @click="onEditUser({ ...scope.row })" type="text" size="small"
            >Editar</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-drawer title="Editar usuario" :visible.sync="drawerEditUser" direction="rtl">
      <UserEdit :data="selectedUser" @close="drawerEditUser = false" @update="updateUser" />
    </el-drawer>
    <el-dialog :visible.sync="dialogCreateUser" width="70%">
      <UserCreate @close="dialogCreateUser = false" @created="addUser" />
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import UserEdit from './UserEdit.vue';
import UserCreate from './UserCreate/Index.vue';

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
      dialogCreateUser: false,
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
      this.users[index].is_active = data.is_active;
    },
  },
};
</script>

<style></style>
