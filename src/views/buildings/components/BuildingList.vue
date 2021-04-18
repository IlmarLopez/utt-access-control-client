<template>
  <el-table :data="buildings" stripe style="width: 100%">
    <el-table-column label="Edificio">
      <template slot-scope="scope">
        <span class="text-capitalize">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Activos">
      <template slot-scope="scope">
        <span class="text-capitalize">{{ scope.row.active_users }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="user_limit" label="Límite"> </el-table-column>
    <el-table-column label="Estado">
      <template slot-scope="scope">
        <el-tag
          v-if="scope.row.active_users == scope.row.user_limit"
          type="danger"
          effect="dark"
          size="mini"
        >
          Peligro
        </el-tag>
        <el-tag
          v-else-if="scope.row.active_users >= (scope.row.user_limit / 3) * 2"
          type="warning"
          effect="dark"
          size="mini"
        >
          Cuidado
        </el-tag>
        <el-tag
          v-else-if="scope.row.active_users <= scope.row.user_limit / 3"
          type="success"
          effect="dark"
          size="mini"
        >
          Estable
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Acciones">
      <template slot-scope="scope">
        <el-button
          @click="$router.push({ name: 'buildingView', params: { id: scope.row.id } })"
          type="text"
          size="small"
          >Detalles</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BuildingList',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      buildings: 'building/list',
    }),
  },
  created() {
    this.onFetchBuildings();
  },
  methods: {
    onFetchBuildings() {
      this.fetchBuildings();
    },
    ...mapActions({
      fetchBuildings: 'building/FETCH_LIST',
    }),
  },
};
</script>

<style></style>
