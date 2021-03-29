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
      <el-form-item label="Password" prop="password">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="Role" prop="roleId">
        <el-input v-model="user.roleId"></el-input>
      </el-form-item>

      <div class="d-flex justify-content-start">
        <el-button size="small" type="primary" @click="onCreateUser('form')">Add</el-button>
        <el-button size="small" @click="onCancel">Cancel</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserCreate',
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        username: null,
        roleId: null,
        password: null,
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
  methods: {
    onCreateUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createUser(this.user);
          return true;
        }
        return false;
      });
    },
    createUser(user) {
      this.$http({
        url: 'users',
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          role_id: user.roleId,
          password: user.password,
        },
        method: 'POST',
      }).then((res) => {
        this.$emit('created', res.data);
        this.$emit('close');
        this.$message({
          message: 'Created user.',
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
