<template>
  <div class="p-1">
    <el-form :model="building" :rules="rules" ref="form">
      <el-form-item label="Nombre" prop="name">
        <el-input v-model.trim="building.name"></el-input>
      </el-form-item>
      <el-form-item label="Límite de usuarios" prop="userLimit">
        <el-input type="number" v-model.number="building.userLimit"></el-input>
      </el-form-item>
      <el-form-item label="Habilitado" prop="isActive">
        <el-switch v-model="building.isActive"> </el-switch>
      </el-form-item>
      <el-form-item label="Descripción" prop="description">
        <el-input v-model="building.description"></el-input>
      </el-form-item>
      <div class="d-flex justify-content-start">
        <el-button size="small" type="primary" @click="onEditBuilding('form')">Edit</el-button>
        <el-button size="small" @click="onCancel">Cancel</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BuildingEdit',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
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
  created() {
    this.setBuilding(this.data);
  },
  methods: {
    setBuilding(data) {
      this.building.id = data.id;
      this.building.name = data.name;
      this.building.description = data.description;
      this.building.userLimit = data.user_limit;
      this.building.isActive = data.is_active;
    },
    onEditBuilding(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editBuilding({
            id: this.building.id,
            data: {
              name: this.building.name,
              description: this.building.description,
              user_limit: this.building.userLimit,
              is_active: this.building.isActive,
            },
            method: 'PUT',
          }).then((res) => {
            this.$emit('update', res.data);
            this.$emit('close');
            this.$message({
              message: 'Información del edificio actualizada.',
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
      editBuilding: 'building/FETCH_UPDATE',
    }),
  },
};
</script>

<style></style>
