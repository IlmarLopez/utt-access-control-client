<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-end">
          <el-button @click="dialogVisible = true" type="primary" size="small" plain
            >Solicitar nuevo acceso</el-button
          >
        </div>
      </div>
      <div class="col-12">
        <AccessList :isStudent="true" />
      </div>
    </div>
    <el-dialog title="Solicitar acceso" :visible.sync="dialogVisible">
      <AccessCreate @close="onCloseDialog" />
    </el-dialog>
  </div>
</template>

<script>
import AccessCreate from '@/components/AccessCreate.vue';
import AccessList from '@/components/AccessList.vue';

export default {
  components: {
    AccessCreate,
    AccessList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    onCloseDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style></style>
