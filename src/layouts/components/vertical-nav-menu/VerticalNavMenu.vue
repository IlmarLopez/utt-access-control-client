<template>
  <div>
    <template v-for="(item, itemIndex) in navMenuItems">
      <template v-if="!item.hidden">
        <VNavMenuModule
          v-if="item.meta.moduleName"
          :items="item.children"
          :base-path="item.path"
          :moduleName="item.meta.moduleName"
          :itemph="item"
          :key="`module-${itemIndex}`"
        />
        <template v-else>
          <VNavMenuItem
            v-if="hasOneShowingChild(item.children, item)"
            :key="`item-${itemIndex}`"
            :icon="item.meta.icon"
            :to="item.path"
            :title="item.meta.title"
            :hidden="item.hidden"
          />
          <VNavMenuGroup
            v-else
            :key="`group-${itemIndex}`"
            :group="item"
            :icon="item.meta.icon"
            :title="item.meta.title"
          />
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VNavMenuGroup from './VerticalNavMenuGroup.vue';
import VNavMenuItem from './VerticalNavMenuItem.vue';
import VNavMenuModule from './VerticalNavMenuModule.vue';

export default {
  name: 'VerticalNavMenu',
  components: {
    VNavMenuGroup,
    VNavMenuItem,
    VNavMenuModule,
  },
  props: {
    navMenuItems: { type: Array, required: true },
  },
  computed: {
    ...mapGetters({
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
</style>
