const path = require("path");

module.exports = {

    resolve : {
        extensions : ['.js', '.jsx']
    },
    entry:{ 
        app : [path.join(__dirname, 'src/index.jsx')], 
    },
    output:{
        // path: path.join(__dirname, './dist'),
        path: path.join(__dirname, './public/js'), //dev-mode
        filename : '[name].bundle.js'  
    },
    module : { 
        rules : [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
    },
};