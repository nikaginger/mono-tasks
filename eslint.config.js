import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@app', './src/app'],
            ['@entities', './src/entitites'],
            ['@features', './src/features'],
            ['@pages', './src/pages'],
            ['@shared', './src/shared'],
            ['@widgets', './src/widgets']
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        }
      }
    }
  },
])
