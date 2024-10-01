import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
        "env": {
            "es2021": true
        },
        "extends": "standard-with-typescript",
        "parserOptions": {
            "ecmaVersion": "latest",
            "sourceType": "module"
        },
        "ignorePatterns": [
            "**/*.test.ts",
            "**/*.test.tsx",
            "dist/*"
        ],
        "rules": {
            "@typescript-eslint/strict-boolean-expressions": "off",
            "@typescript-eslint/explicit-function-return-type": "off"
        }
    }
)
