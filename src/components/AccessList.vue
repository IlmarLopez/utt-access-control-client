<template>
  <div>
    <el-table :data="accesses" stripe style="width: 100%">
      <el-table-column label="Edificio">
        <template slot-scope="scope">
          <span class="text-capitalize">{{ scope.row.building_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Nombre">
        <template slot-scope="scope">
          <span class="text-capitalize"
            >{{ scope.row.user.first_name }} {{ scope.row.user.last_name }}</span
          >
        </template>
      </el-table-column>

      <el-table-column label="Entrada">
        <template slot-scope="scope">
          <span class="text-capitalize">{{ scope.row.check_in | dateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Descripción">
        <template slot-scope="scope">
          <span class="text-capitalize">{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="isStudent" fixed="right" label="Estado">
        <template slot-scope="scope">
          <span>
            <el-tag v-if="scope.row.is_approved" type="success" effect="dark" size="mini">
              Aprobado
            </el-tag>
            <el-tag v-else type="info" effect="dark" size="mini">
              En proceso
            </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-else fixed="right" label="Acciones">
        <template slot-scope="scope">
          <el-checkbox
            :value="scope.row.is_approved"
            @change="onEditAccess(scope.row, scope.$index)"
            >Aprobar</el-checkbox
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AccessList',
  props: {
    isStudent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      accesses: [],
      drawerEditBuilding: false,
      selectedAccess: null,
    };
  },
  created() {
    this.onFetchAccesses();
  },
  methods: {
    onFetchAccesses() {
      this.fetchAccesses().then((res) => {
        this.accesses = res.data.items;
      });
    },
    capitalize(text) {
      return text.replace(/\b\w/g, (m) => m.toUpperCase());
    },
    onEditAccess(data, index) {
      const fullName = this.capitalize(`${data.user.first_name} ${data.user.last_name}`);
      this.$confirm(`Aprobar acceso a ${fullName}. Continuar?`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        const isApproved = !data.is_approved;
        this.editAccess({
          id: data.id,
          data: {
            is_approved: isApproved,
          },
        }).then(() => {
          this.accesses[index].is_approved = isApproved;
          this.$message({
            message: 'Acceso permitido.',
            type: 'success',
          });
        });
      });
    },
    ...mapActions({
      fetchAccesses: 'buildingAccess/FETCH_LIST',
      editAccess: 'buildingAccess/FETCH_UPDATE',
    }),
  },
};
</script>

<style></style>
