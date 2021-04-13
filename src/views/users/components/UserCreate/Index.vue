<template>
  <div class="container-fluid">
    <transition name="fade">
      <div v-if="currentStep === 1">
        <div class="d-flex align-items-center mb-4">
          <h5 class="mr-1">Selccionar el tipo de usuario</h5>
          <small>{{ currentStep }}/2</small>
        </div>
        <div class="d-flex flex-wrap">
          <div class="row">
            <div class="col-3" v-for="role in roles" :key="role.id">
              <div
                @click="setSelectedRole(role)"
                class="role shadow rounded d-flex justify-content-start align-items-center p-2"
              >
                <el-avatar :size="40" src="https://empty" @error="errorHandler">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
                <div class="d-flex align-items-center">
                  <div class="ml-2">
                    <h6 class="text-capitalize mb-0">
                      {{ role.name }}
                    </h6>
                    <p class="text-muted mb-0">
                      {{ role.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentStep === 2">
        <div class="d-flex align-items-center mb-4">
          <h5 class="mr-1">Información del usuario</h5>
          <small>{{ currentStep }}/2</small>
        </div>
        <Form :roleId="selectedRole.id" :isStudent="isStudent" @close="currentStep = 1" />
      </div>
    </transition>
    <!-- <div class="row">
      <el-card v-for="role in roles" :key="role.id" shadow="always" class="col-3 mr-2 mb-2">
        <strong class="text-capitalize">
          {{ role.name }}
        </strong>
      </el-card>
    </div> -->

    <!-- <el-form-item label="Role" prop="roleId">
      <el-select v-model="user.roleId" placeholder="Select">
        <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id">
        </el-option>
      </el-select>
    </el-form-item> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Form from './components/Form.vue';

export default {
  name: 'UserCreate',
  components: {
    Form,
  },
  data() {
    return {
      currentStep: 1,
      selectedRole: null,
    };
  },
  computed: {
    isStudent() {
      if (this.selectedRole) {
        return this.selectedRole.name.includes('estudiante');
      }

      return false;
    },
    ...mapGetters({
      roles: 'role/list',
    }),
  },
  created() {
    this.onFetchRoles();
  },
  methods: {
    setSelectedRole(role) {
      this.selectedRole = role;
      this.currentStep = 2;
    },
    onFetchRoles() {
      this.fetchRoles();
    },
    ...mapActions({
      fetchRoles: 'role/FETCH_LIST',
    }),
  },
};
</script>

<style lang="sass" scoped>
.role
  min-width: 200px
  height: 75px
  margin: 1em
  cursor: pointer
  &:hover
    transform: scale(1.1)

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0
</style>
