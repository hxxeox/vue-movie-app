

//import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// export
module.exports = {
    //파일을 읽어들이기 시작하는 진입점 설정
    resolve: {
        //js, vue 확장자를 입력하지 않아도 작동하도록 설정.
        extensions: ['.js', '.vue'],
        alias:{
            '~' :path.resolve(__dirname,'src'),        //경로 별칭
            'assets':path.resolve(__dirname,'src/assets')
        }
    },
    entry:'./src/main.js', // parcel main.js 쓰는거랑 똑같다

    //결과물(번들)을 반환하는 설정
    output:{
        //resolve는 첫번째 인수와 두번째 인수에 있는 경로를 합쳐주는 역할을 한다.
        //path:path.resolve(__dirname,'dist'), // 절대경로로 작성해야 한다.
        //filename:'main.js',
        clean: true
    },

    module: {
        rules:[
            {
                test: /\.vue$/,
                use: 'vue-loader'
                //필요한 loader가 한개만 존재 할 시 배열데이터[]로 작성하지 않아도 된다
            },
            {
                // 정규 표현식 이스케이프문자로 css로 끝나는 파일을 찾겠다는 뜻
                test:/\.s?css$/,
                use:[
                    //순서중요
                    'vue-style-loader',
                    //'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options:{
                            additionalData:'@import "~/scss/main";'
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use:'file-loader'
            }
        ]
    },

    //번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
        new HtmlPlugin({
            template:'./index.html'
        }),
        new CopyPlugin({
            patterns: [
                // static에서 부터 Copy가 된다.
                {from:'static'}
                // 아래에 다른 여러개의 경로도 설정이 가능하다.
            ]
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        host:'localhost'
    }
}