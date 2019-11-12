module.exports = async ({ config }) => {
    config.resolve.extensions.push('.vue', '.css', '.less', '.scss', '.sass', '.html')
    config.module.rules.push({ test: /\.scss/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] });
    config.module.rules.push({ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' });

    return config;
};