/* eslint-disable */
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/sass/_variables.sass";@import "@/assets/sass/_mixins.sass";`,
      },
    },
  },
};
