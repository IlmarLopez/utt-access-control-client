<template>
  <div>
    <div class="col-12 d-flex justify-content-end">
      <el-button @click="dialogCreateBuilding = true" size="small" type="primary"
        >Agregar edificio</el-button
      >
    </div>
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
          <el-button @click="onEditBuilding({ ...scope.row })" type="text" size="small"
            >Editar</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-drawer title="Editar usuario" :visible.sync="drawerEditBuilding" direction="rtl">
      <BuildingEdit
        :data="selectedBuilding"
        @close="drawerEditBuilding = false"
        @update="updateBuilding"
      />
    </el-drawer>
    <el-dialog title="Agregar edificio" :visible.sync="dialogCreateBuilding" width="70%">
      <BuildingCreate @close="dialogCreateBuilding = false" @created="addBuilding" />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import _ from 'lodash';
import BuildingEdit from './BuildingEdit.vue';
import BuildingCreate from './BuildingCreate.vue';

export default {
  name: 'BuildingList',
  components: {
    BuildingEdit,
    BuildingCreate,
  },
  data() {
    return {
      buildings: [],
      drawerEditBuilding: false,
      dialogCreateBuilding: false,
      selectedBuilding: null,
    };
  },
  created() {
    this.onFetchBuildings();
  },
  methods: {
    addBuilding(building) {
      this.buildings.unshift(building);
    },
    onFetchBuildings() {
      this.fetchBuildings().then((res) => {
        this.buildings = res.data.items;
      });
    },
    onEditBuilding(data) {
      this.selectedBuilding = data;
      this.drawerEditBuilding = true;
    },
    updateBuilding(data) {
      const index = _.findIndex(this.buildings, (o) => o.id === data.id);
      this.buildings[index].name = data.name;
      this.buildings[index].description = data.description;
      this.buildings[index].user_limit = data.user_limit;
      this.buildings[index].active_users = data.active_users;
    },
    ...mapActions({
      fetchBuildings: 'building/FETCH_LIST',
    }),
  },
};
</script>

<style></style>
