const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

const { ANALYZE, ASSET_HOST } = process.env;
const assetPrefix = ASSET_HOST || '';

module.exports = withImages(withCss(withSass({
    'cssModules': false,
    'sourceMap': true,
    'minimize': false,
    'url': true,
    assetPrefix,
    'target': 'serverless',
    'webpack': (config, { dev }) => {
        config.module.rules.push({
            'test': /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            'use': {
                'loader': 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            }
        });
        config.output.publicPath = `${assetPrefix}${config.output.publicPath}`;
        if (ANALYZE) {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
            config.plugins.push(new BundleAnalyzerPlugin({
                'analyzerMode': 'server',
                'analyzerPort': 8888,
                'openAnalyzer': true
            }));
        }

        return config;
    }
})));
