<template>
  <el-form :model="user" :rules="rules" ref="form" label-width="100px">
    <el-form-item label="First name" prop="firstName">
      <el-input v-model="user.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Last name" prop="lastName">
      <el-input v-model="user.lastName"></el-input>
    </el-form-item>

    <template v-if="isStudent">
      <el-form-item label="Carrera" prop="careerId">
        <el-select v-model="user.careerId" placeholder="Select">
          <el-option
            v-for="career in careers"
            :key="career.id"
            :label="career.name"
            :value="career.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Matrícula" prop="registrationNumber">
        <el-input v-model.trim="user.registrationNumber"></el-input>
      </el-form-item>
    </template>

    <el-form-item label="Email" prop="email">
      <el-input type="email" v-model.trim="user.email"></el-input>
    </el-form-item>
    <el-form-item label="Username" prop="username">
      <el-input v-model.trim="user.username"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model.trim="user.password" show-password></el-input>
    </el-form-item>

    <div class="d-flex justify-content-start">
      <el-button size="small" type="primary" @click="onCreateUser('form')">Add</el-button>
      <el-button size="small" @click="onCancel">Cancel</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserCreateForm',
  props: {
    roleId: {
      type: String,
      required: true,
    },
    isStudent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        username: null,
        password: null,
        careerId: null,
        groupId: null,
        registrationNumber: null,
        email: null,
      },
      rules: {
        firstName: [
          {
            required: true,
            message: 'Por favor ingrese su nombre',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'La longitud debe ser de 3 a 50',
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Ingrese sus apellidos',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'La longitud debe ser de 3 a 50',
            trigger: 'blur',
          },
        ],
        username: [
          {
            required: true,
            message: 'Ingrese su nombre de usuario',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'La longitud debe ser de 3 a 50',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Por favor ingrese su contraseña',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'La longitud debe ser de 3 a 50',
            trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email',
            message: 'Formato de correo electrónico',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'La longitud debe ser de 3 a 50',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      careers: 'career/list',
    }),
  },
  mounted() {
    if (this.isStudent) {
      this.onFetchCareers();
    }
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
          role_id: this.roleId,
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
    onFetchCareers() {
      this.fetchCareers();
    },
    ...mapActions({
      fetchCareers: 'career/FETCH_LIST',
    }),
  },
};
</script>

<style></style>
