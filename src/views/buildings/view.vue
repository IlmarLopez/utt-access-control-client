<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <el-card>
          <table>
            <tr class="text-left">
              <th>
                <i class="el-icon-user mr-2"></i>
                <span class="mr-5">Nombre</span>
              </th>
              <td class="text-capitalize">{{ building.name }}</td>
            </tr>
            <tr class="text-left">
              <th>
                <i class="el-icon-check mr-2"></i>
                <span class="mr-5">Descripción</span>
              </th>
              <td>
                {{ building.description }}
              </td>
            </tr>
            <tr class="text-left">
              <th>
                <i class="el-icon-star-off mr-2"></i>
                <span class="mr-5">Limite de usuarios</span>
              </th>
              <td class="text-capitalize">{{ building.userLimit }}</td>
            </tr>
            <tr class="text-left">
              <th>
                <i class="el-icon-star-off mr-2"></i>
                <span class="mr-5">Creado en</span>
              </th>
              <td class="text-capitalize">{{ building.createdAt | date }}</td>
            </tr>
          </table>
        </el-card>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <el-card>
          <el-table :data="building.accesses" stripe style="width: 100%">
            <el-table-column label="Nombre">
              <template slot-scope="scope">
                <span class="text-capitalize"
                  >{{ scope.row.user.first_name }} {{ scope.row.user.last_name }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="Cargo">
              <template slot-scope="scope">
                <span class="text-uppercase">{{ scope.row.user.role_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Registro">
              <template slot-scope="scope">
                {{ scope.row.check_in | dateTime }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BuildingView',
  data() {
    return {
      building: {
        id: null,
        name: null,
        description: null,
        userLimit: null,
        createdAt: null,
        accesses: [],
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.onfetchBuildind(id);
    this.onFetchBuildingAccesses(id);
  },
  methods: {
    onfetchBuildind(id) {
      this.fetchBuilding(id).then((res) => {
        this.building.id = res.data.id;
        this.building.name = res.data.name;
        this.building.description = res.data.description;
        this.building.userLimit = res.data.user_limit;
        this.building.createdAt = res.data.created_at;
      });
    },
    onFetchBuildingAccesses(id) {
      this.fetchBuildingAccesses({
        term: 'by-building-and-not-check-out',
        filters: {
          building_id: id,
        },
      }).then((res) => {
        this.building.accesses = res.data.items;
      });
    },
    ...mapActions({
      fetchBuilding: 'building/FETCH_SINGLE',
      fetchBuildingAccesses: 'buildingAccess/FETCH_LIST',
    }),
  },
};
</script>

<style></style>
