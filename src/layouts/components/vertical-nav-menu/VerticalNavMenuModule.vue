<template>
  <div>
    <span
      v-if="!authenticatedUser.roles.includes('salesperson')"
      :class="['navigation-header', { 'header-center ': isMinimizedMenuItem }]"
      :key="'navigation-header' + moduleName"
    >
      {{ moduleName }}
    </span>
    <template v-for="(item, index) in items">
      <VNavMenuItem
        v-if="hasOneShowingChild(item.children, item)"
        :key="`module-item-${index}`"
        :icon="item.meta.icon"
        :to="basePath + '/' + item.path"
        :title="item.meta.title"
        :hidden="item.hidden"
      />
      <VNavMenuGroup
        v-else
        :key="`module-group-${index}`"
        :group="item"
        :icon="item.meta.icon"
        :base-path="basePath"
        :title="item.meta.title"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VNavMenuGroup from './VerticalNavMenuGroup.vue';
import VNavMenuItem from './VerticalNavMenuItem.vue';

export default {
  name: 'VerticalNavMenu',
  components: {
    VNavMenuGroup,
    VNavMenuItem,
  },
  props: {
    items: { type: Array, required: true },
    basePath: { type: String, required: true },
    moduleName: { type: String, required: true },
  },
  computed: {
    ...mapGetters({
      authenticatedUser: 'auth/authenticatedUser',
      isMinimizedMenuItem: 'app/verticalNavMenuItemsMin',
    }),
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        }
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item;
        return true;
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="sass">
.navigation-header
  padding-left: 2em
  padding-right: 2em
  font-size: 1em
  margin-top: 1.5em
  margin-bottom: .5em
  display: block
  text-transform: uppercase
  font-size: 12px
  color: #66A626
.navigation-header.header-center
  padding: 0;
  margin: 0 auto;
  text-align: center;
  word-break: break-all;
</style>
