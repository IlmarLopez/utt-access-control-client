<!-- =========================================================================================
    File Name: FeatherIcon.vue
    Description: Feather icon component. Creates feather icon based on 'icon' prop
    Component Name: FeatherIcon
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<script>
import * as icons from 'vue-feather-icons';

export default {
  name: 'FeatherIcon',
  functional: true,
  props: {
    icon: { type: String, required: true },
    svgClasses: { type: [String, Object, Array], default: '' },
    // TODO: revisar si es correcto el tipo del prop badge
    badge: Boolean,
  },
  render(h, { props, data }) {
    // Add feather classes
    // prettier-ignore
    // eslint-disable-next-line no-unused-expressions
    data.staticClass
      // eslint-disable-next-line no-param-reassign
      ? (data.staticClass += ' feather-icon select-none position-relative')
      // eslint-disable-next-line no-param-reassign
      : (data.staticClass = 'feather-icon select-none position-relative');
    const svg = h(icons[props.icon], { class: props.svgClasses });
    const badgeEl = h(
      'span',
      {
        class:
          'feather-icon-badge bg-primary text-white h-50 w-50 position-absolute rounded-full text-xs d-flex align-items-center justify-content-center',
        style: 'top: -7px; right: -5px',
      },
      [props.badge],
    );
    const children = [svg];
    if (props.badge) children.push(badgeEl);
    return h('span', data, children);
  },
};
</script>

<style lang="scss">
.feather-icon {
  display: inline-flex;
  align-items: center;
  max-width: 24px;
}
</style>
