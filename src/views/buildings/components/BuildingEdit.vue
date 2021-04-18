<template>
  <div class="p-1">
    <el-form :model="user" :rules="rules" ref="form">
      <el-form-item label="First name" prop="firstName">
        <el-input v-model="user.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last name" prop="lastName">
        <el-input v-model="user.lastName"></el-input>
      </el-form-item>
      <template v-if="isStudent">
        <el-form-item label="Matrícula" prop="registrationNumber">
          <el-input v-model.trim="user.registrationNumber"></el-input>
        </el-form-item>

        <el-form-item label="Carrera" prop="careerId">
          <el-select
            v-model="user.careerId"
            placeholder="Seleccionar carrera"
            popper-class="text-capitalize"
          >
            <el-option
              v-for="career in careers"
              :key="career.id"
              :label="career.name"
              :value="career.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Grupo" prop="groupId">
          <el-select
            v-model="user.groupId"
            :disabled="groups.length === 0"
            placeholder="Seleccionar grupo"
            popper-class="text-capitalize"
          >
            <el-option
              v-for="group in groups"
              :key="group.id"
              :label="group.name"
              :value="group.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="Email" prop="email">
        <el-input type="email" v-model.trim="user.email"></el-input>
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

      <div class="d-flex justify-content-start">
        <el-button size="small" type="primary" @click="onEditUser('form')">Edit</el-button>
        <el-button size="small" @click="onCancel">Cancel</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
        isActive: null,
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
        registrationNumber: [
          {
            max: 10,
            message: 'La longitud debe ser de 10',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    isStudent() {
      if (this.data.role_name) {
        return this.data.role_name.includes('estudiante');
      }
      return false;
    },
    ...mapGetters({
      careers: 'career/list',
    }),
  },
  created() {
    this.setUser(this.data);
  },
  mounted() {
    if (this.isStudent) {
      this.onFetchCareers();
    }
  },
  methods: {
    setUser(data) {
      this.user.id = data.id;
      this.user.firstName = data.first_name;
      this.user.lastName = data.last_name;
      this.user.username = data.username;
      this.user.roleId = data.role_id;
      this.user.password = '';
      this.user.isActive = data.is_active;
      this.user.careerId = data.career_id;
      this.user.groupId = data.group_id;
      this.user.registrationNumber = data.registration_number;
      this.user.email = data.email;
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
          // role_id: user.roleId,
          password: user.password,
          is_active: user.isActive,
          career_id: user.careerId,
          group_id: user.groupId,
          registration_number: user.registrationNumber,
          email: user.email,
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
