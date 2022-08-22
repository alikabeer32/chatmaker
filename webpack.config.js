const { Script } = require("vm");
const path = require("path");

module.exports = {
    entry: './src/script.ts',
    devtool: 'source-map',
    mode: 'development',  
    entry: {
        builder: './src/script.ts',
        preview: './src/preview.ts'
    },
    module:{
        rules:[
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
            }
        ],
    },
    output: {
        filename: '[name].bundled.js',
        path: path.resolve(__dirname,'public'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      }
}