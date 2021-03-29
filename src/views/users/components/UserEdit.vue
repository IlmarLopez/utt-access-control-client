<template>
  <div class="p-1">
    <el-form :model="user" :rules="rules" ref="form">
      <el-form-item label="First name" prop="firstName">
        <el-input v-model="user.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last name" prop="lastName">
        <el-input v-model="user.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Username" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <div class="d-flex justify-content-end mb-2">
        <label for="" class="mr-4">Change password</label>
        <el-switch v-model="isChangingPassword"> </el-switch>
      </div>
      <el-form-item v-if="isChangingPassword" label="Password" prop="password">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="Role" prop="roleId">
        <el-input v-model="user.roleId"></el-input>
      </el-form-item>

      <div class="d-flex justify-content-start">
        <el-button size="small" type="primary" @click="onEditUser('form')">Edit</el-button>
        <el-button size="small" @click="onCancel">Cancel</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isChangingPassword: false,
      user: {
        firstName: null,
        lastName: null,
        username: null,
        roleId: null,
      },
      rules: {
        firstName: [
          {
            required: true,
            message: 'Please input First name',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'Length should be 3 to 50',
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Please input Last name',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'Length should be 3 to 50',
            trigger: 'blur',
          },
        ],
        username: [
          {
            required: true,
            message: 'Please input User name',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'Length should be 3 to 50',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'Length should be 3 to 50',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  created() {
    this.setUser(this.data);
  },
  methods: {
    setUser(data) {
      this.user.id = data.id;
      this.user.firstName = data.first_name;
      this.user.lastName = data.last_name;
      this.user.username = data.username;
      this.user.roleId = data.role_id;
      this.user.password = '';
    },
    onEditUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editUser(this.user);
          return true;
        }
        return false;
      });
    },
    editUser(user) {
      this.$http({
        url: `users/${user.id}`,
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          role_id: user.roleId,
          password: user.password,
        },
        method: 'PUT',
      }).then((res) => {
        this.$emit('update', res.data);
        this.$emit('close');
        this.$message({
          message: 'Updated user information.',
          type: 'success',
        });
      });
    },
    onCancel() {
      this.$emit('close');
    },
  },
};
</script>

<style></style>
