const path = require("path");
const enableImportsFromExternalPaths = require("./src/helpers/craco/enableImportsFromExternalPaths");

// Paths to the code you want to use
const sharedLib = [
    path.resolve(__dirname, "../src/useCheatCodes"),
];

module.exports = {
    plugins: [
        {
            plugin: {
                overrideWebpackConfig: ({ webpackConfig }) => {
                    enableImportsFromExternalPaths(webpackConfig, sharedLib);
                    return webpackConfig;
                },
            },
        },
    ],
};