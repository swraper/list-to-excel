module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    globals: {
        __DEV__: true,
        __SERVER_ENV__: true,
        __LOCAL__: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: [
        'babel',
        'react'
    ],
    rules: {
        /**
         *  "off" 或 0 - 关闭规则
            "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
            "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
         */
        'indent': [2, 4, { "SwitchCase": 1 }],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'no-console': 0,
        'no-useless-escape': 0,
        // react
        'react/display-name': 0,

    }
};
