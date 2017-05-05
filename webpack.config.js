module.exports = {
    entry: "./app/index.ts",
    output: {
        filename: "./dist/bundle.js",
        path: __dirname,
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};