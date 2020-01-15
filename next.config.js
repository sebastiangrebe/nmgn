const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
module.exports = withCSS(
  withSass(
    {
      cssModules: true,
      webpack (config, options) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 100000,
            }
          }
        });

        return config;
      },
    }
  )
);