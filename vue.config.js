 module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? '/oc-directory/': '/',
    configureWebpack: {
        module: {
            rules: [ {
                test: /\.md$/,
                loader: 'raw-loader', // npm install -D raw-loader
            }]
        }
    }
}
