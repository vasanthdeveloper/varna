/*
 *  ESLint run control.
 *  Created On 01 April 2021
 */

module.exports = {
    parser: '@babel/eslint-parser',
    plugins: ['prettier', 'simple-import-sort'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    env: {
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/extensions': ['.js'],
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['off', 'single'],
        semi: ['error', 'never'],
        'prettier/prettier': 'error',
        'simple-import-sort/imports': 'error',
        'sort-imports': 'off',
        'import/order': 'off',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: ['plugin:@typescript-eslint/recommended'],
            plugins: [
                'prettier',
                'simple-import-sort',
                '@typescript-eslint',
                'import',
            ],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ],
}
