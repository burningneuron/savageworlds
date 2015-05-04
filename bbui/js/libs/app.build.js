({
  // to work on later:
  // http://renderedtext.com/blog/2013/01/23/compile-requirejs-project-to-single-file/
    appDir: "../../",
    baseUrl: "js/app",
    dir: "../../../bbui-build",
    modules: [
        {
            name: "main"
        }
    ],
    removeCombined: true,
    skipModuleInsertion: true
})
