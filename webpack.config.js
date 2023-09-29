const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack'); 
const { ModuleFederationPlugin } = require('webpack').container; 
const deps = require("./package.json");
const port = 8082;

module.exports = {
    mode: "development",
    cache: false,
    devtool: "source-map",
    target: "web",
    optimization: {
      minimize: false
    },
    entry: path.resolve(__dirname, "./src/main.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: `http://localhost:${port}/`
      },
      resolve: {
        extensions: [".js", ".vue", ".json",".html"],
        alias: {
          vue: "vue/dist/vue.runtime.esm.js",
          "@": path.resolve(__dirname, "./src"),
          "@assets": path.resolve(__dirname, 'src/assets')
        }
      },
    
      module: {
        rules: [
            { test: /\.vue$/, loader: "vue-loader" },
            {
                test: /\.css|.sass|.scss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      esModule: false
                    }
                  },
                  "css-loader",
                  "sass-loader"
                ]
              },
              {
                test: /\.png$/,
                use: {
                  loader: "url-loader",
                  options: {
                    esModule: false,
                    name: "[name].[ext]",
                    limit: 8192
                  }
                }
              }
        ]
      },
      plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].css"
        }),
        new ModuleFederationPlugin({
            name: "web_common",
            remotes: {},
            filename: "remoteEntry.js",
            shared: {
                vue: {
                    eager: true,
                    singleton: false,
                    requiredVersion: deps.vue
                  },
                  "vue-router": {
                    eager: true,
                    singleton: false,
                    requiredVersion: deps["vue-router"]
                  },
                
            },
            exposes: {
                "./SideBarMenu": "./src/components/SideBarMenu",
                //"./HomeView": "./src/components/HomeView.vue",
                //"./AboutView": "./src/components/AboutView.vue",
                //"./SideBarMenu": "./src/App.vue"
                //"./HelloWorld": "./src/components/HelloWorld.vue",
              },
              
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
            chunks: ["main"],
          }),
        //  new webpack.ProvidePlugin({
        //     process: 'process/browser',
        //  }),
      ],
      devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        static: {
          directory: path.join(__dirname, "public")
        },
        compress: true,
        port,
        hot: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        },
      },

}