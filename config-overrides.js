const {
    override,
    fixBabelImports,
    addLessLoader
} = require('customize-cra');
const customTheme = require("./src/themes/index.js")
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars : customTheme
        /*modifyVars: {
            
             '@component-background' : '@text-color',
             '@primary-color' : '@text-color',
             '@gray-8': '@text-color',
             '@background-color-base': '#555',
             '@skeleton-color': 'rgba(0,0,0,0.8)'
             

        }, */
    }),
);