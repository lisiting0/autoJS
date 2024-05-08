module.exports = {
    mode: "production",
    entry: "./out/main.js",
    output: {
        filename: "./main.node.js",
    },
    target: "node",
    optimization: {
        minimize: false,
    },
    externals: {
        engines: "commonjs engines",
        shell: "commonjs shell",
        ui: "commonjs ui",
        rhino: "commonjs rhino",
        lang: "commonjs lang",
        device: "commonjs device",
        accessibility: "commonjs accessibility",
        settings: "commonjs settings",
        toast: "commonjs toast",
        app: "commonjs app",
        image: "commonjs image",
    },
};
