module.exports = {
    env: { 
        // 코드 검사를 브라우저 환경에서 동작하는 전역 개념들
        // 노드JS 환경에서 동작하는 전역 개념들을 코드 검사 할 것인지 설정하는 부분
        browser:true,
        node:true
    },
    extends: [ // 코드 검사를 할 규칙
        // vue
        //'plugin:vue/vue3-essential', // Lv1
        'plugin:vue/vue3-strongly-recommended', // Lv2
        //'plugin:vue/vue3-recommended', // Lv3
        // js
        'eslint:recommended'
    ],
    parserOptions:{
        parser : 'babel-eslint'
    },
    rules:{
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
            "html": {
            "void": "always",
            "normal": "never",
            "component": "always"
            },
            "svg": "always",
            "math": "always"
        }]
    }
}