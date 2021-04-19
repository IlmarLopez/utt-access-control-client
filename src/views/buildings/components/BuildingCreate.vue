<template>
  <el-form :model="building" :rules="rules" ref="form" label-width="150px">
    <el-form-item label="Nombre" prop="name">
      <el-input v-model.trim="building.name"></el-input>
    </el-form-item>
    <el-form-item label="Límite de usuarios" prop="userLimit">
      <el-input type="number" v-model.number="building.userLimit"></el-input>
    </el-form-item>
    <el-form-item label="Descripción" prop="description">
      <el-input
        show-word-limit
        maxlength="150"
        type="textarea"
        v-model="building.description"
      ></el-input>
    </el-form-item>

    <div class="d-flex justify-content-start">
      <el-button size="small" type="primary" @click="onCreateBuilding('form')">Add</el-button>
      <el-button size="small" @click="onCancel">Cancel</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BuildingCreate',
  data() {
    return {
      building: {
        name: null,
        description: null,
        userLimit: null,
        isActive: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Por favor ingrese un nombre',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'La longitud debe ser de 3 a 50',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'Por favor ingrese una descripción',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 50,
            message: 'La longitud debe ser de 3 a 150',
            trigger: 'blur',
          },
        ],
        userLimit: [
          {
            required: true,
            message: 'Por favor ingrese un limite de usuarios',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    onCreateBuilding(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createBuilding({
            data: {
              name: this.building.name,
              description: this.building.description,
              user_limit: this.building.userLimit,
            },
          }).then((res) => {
            this.$emit('created', res.data);
            this.$emit('close');
            this.$message({
              message: 'Edificio creado.',
              type: 'success',
            });
          });
          return true;
        }
        return false;
      });
    },
    onCancel() {
      this.$emit('close');
    },
    ...mapActions({
      createBuilding: 'building/FETCH_CREATE',
    }),
  },
};
</script>

<style></style>
