<template>
  <div class="p-1">
    <el-form :model="access" :rules="rules" ref="form">
      <el-form-item label="Edificio" prop="buildingId">
        <el-select
          v-model="access.buildingId"
          placeholder="Seleccionar carrera"
          popper-class="text-capitalize"
        >
          <el-option
            v-for="building in buildings"
            :key="building.id"
            :label="building.name"
            :value="building.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Registro" prop="dateTimeRange">
        <el-date-picker
          v-model="access.dateTimeRange"
          type="datetimerange"
          range-separator="a"
          start-placeholder="Entrada"
          end-placeholder="Salida"
        >
        </el-date-picker>
      </el-form-item>

      <!-- <el-form-item label="Entrada" prop="checkIn">
        <el-date-picker
          v-model="access.checkIn"
          type="datetime"
          placeholder="Seleccionar fecha y hora"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Salida" prop="checkOut">
        <el-date-picker
          v-model="access.checkOut"
          type="datetime"
          placeholder="Seleccionar fecha y hora"
        >
        </el-date-picker>
      </el-form-item> -->

      <el-form-item label="Descripción" prop="description">
        <el-input
          type="textarea"
          maxlength="150"
          show-word-limit
          v-model="access.description"
        ></el-input>
      </el-form-item>

      <div class="d-flex justify-content-start">
        <el-button size="small" type="primary" @click="onCreateAccess('form')">Solicitar</el-button>
        <el-button size="small" @click="onCancel">Cancelar</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccessCreate',
  data() {
    return {
      access: {
        buildingId: null,
        dateTimeRange: null,
        description: '',
      },
      rules: {
        buildingId: [
          {
            required: true,
            message: 'Por favor selecciones un edificio',
            trigger: 'blur',
          },
        ],
        dateTimeRange: [
          {
            required: true,
            message: 'Por favor selecione el registro de entrada y salida',
            trigger: 'blur',
          },
        ],
      },
      buildings: [],
    };
  },
  computed: {
    ...mapGetters({
      authenticatedUser: 'auth/authenticatedUser',
    }),
  },
  created() {
    this.onFetchBuildings();
  },
  methods: {
    onCreateAccess(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createAccess({
            data: {
              building_id: this.access.buildingId,
              check_in: this.access.dateTimeRange[0],
              check_out: this.access.dateTimeRange[1],
              description: this.access.description.trim(),
              user_id: this.authenticatedUser.id,
            },
          }).then((res) => {
            this.$emit('created', res.data);
            this.$emit('close');
          });
          return true;
        }
        return false;
      });
    },
    onFetchBuildings() {
      this.fetchBuildings().then((res) => {
        this.buildings = res.data.items;
      });
    },
    onCancel() {
      this.$emit('close');
    },
    ...mapActions({
      fetchBuildings: 'building/FETCH_LIST',
      createAccess: 'buildingAccess/FETCH_CREATE',
    }),
  },
};
</script>

<style></style>
