import { describe, expect, it } from 'vitest'
import { generationMITLicense, generationPkg, generationReadme, getPkgInfo, isEffectivelibrary, paramsVerify, splitAuthor } from '../src/utils'

describe('utils.ts', () => {
  it('isEffectivelibrary', () => {
    const result = isEffectivelibrary()
    expect(result).toMatchInlineSnapshot('true')
  })

  it('generationReadme', () => {
    const readme = generationReadme('test-lib', '一个测试库', 'OSpoon')
    expect(readme).toMatchInlineSnapshot(`
      "# test-lib

      一个测试库

      ## License

      [MIT](./LICENSE) License © 2023-PRESENT [OSpoon](https://github.com/OSpoon)
      "
    `)
  })

  it('generationMITLicense', () => {
    const license = generationMITLicense('OSpoon')
    expect(license).toMatchInlineSnapshot(`
      "MIT License
        
      Copyright (c) 2023 OSpoon

      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the \\"Software\\"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED \\"AS IS\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
      "
    `)
  })

  it('paramsVerify', () => {
    let result = paramsVerify('test-lib', '一个测试库', 'OSpoon')
    expect(result).toMatchInlineSnapshot('true')

    result = paramsVerify('test-lib', '一个测试库', '')
    expect(result).toMatchInlineSnapshot('false')
  })

  it('generationPkg', () => {
    const pkgInfo = generationPkg('test-lib', '一个测试库', 'OSpoon', 'zxin088@gmail.com')

    expect(pkgInfo.name).toMatchInlineSnapshot('"test-lib"')

    expect(pkgInfo.author).toMatchInlineSnapshot('"OSpoon zxin088@gmail.com"')

    expect(pkgInfo.homepage).toMatchInlineSnapshot('"https://github.com/OSpoon/test-lib#readme"')

    expect(pkgInfo.repository).toMatchInlineSnapshot(`
      {
        "type": "git",
        "url": "git+https://github.com/OSpoon/test-lib.git",
      }
    `)

    expect(pkgInfo.bugs).toMatchInlineSnapshot('"https://github.com/OSpoon/test-lib/issues"')
  })

  it('splitAuthor', () => {
    let result = splitAuthor('OSpoon zxin088@gmail.com')
    expect(result).toMatchInlineSnapshot(`
      {
        "author": "OSpoon",
        "email": "zxin088@gmail.com",
      }
    `)
    result = splitAuthor('OSpoon')
    expect(result).toMatchInlineSnapshot(`
      {
        "author": "OSpoon",
        "email": "",
      }
    `)
    result = splitAuthor('')
    expect(result).toMatchInlineSnapshot(`
      {
        "author": "",
        "email": "",
      }
    `)
  })

  it('getPkgInfo', () => {
    const result = getPkgInfo()
    expect(result).toMatchInlineSnapshot(`
      {
        "author": "OSpoon zxin088@gmail.com",
        "bin": {
          "a-pkg": "./bin/cli.mjs",
          "adapt-pkg": "./bin/cli.mjs",
        },
        "bugs": "https://github.com/OSpoon/adapt-pkg/issues",
        "dependencies": {
          "inquirer": "^9.2.11",
          "minimist": "^1.2.8",
          "picocolors": "^1.0.0",
        },
        "description": "Initialize the library name, description, Github, Readme, and MIT License",
        "devDependencies": {
          "@antfu/eslint-config": "^1.0.0-beta.22",
          "@release-it/conventional-changelog": "^7.0.2",
          "@types/inquirer": "^9.0.4",
          "@types/minimist": "^1.2.3",
          "@types/node": "^20.8.3",
          "eslint": "^8.51.0",
          "esno": "^0.17.0",
          "lint-staged": "^14.0.1",
          "release-it": "^16.1.5",
          "rimraf": "^5.0.5",
          "simple-git-hooks": "^2.9.0",
          "typescript": "^5.2.2",
          "unbuild": "^2.0.0",
          "vitest": "^0.34.6",
        },
        "exports": {
          ".": {
            "import": "./dist/index.mjs",
            "require": "./dist/index.cjs",
            "types": "./dist/index.d.ts",
          },
        },
        "files": [
          "bin",
          "dist",
        ],
        "homepage": "https://github.com/OSpoon/adapt-pkg#readme",
        "keywords": [],
        "license": "MIT",
        "lint-staged": {
          "*": "eslint --fix",
        },
        "main": "./dist/index.mjs",
        "module": "./dist/index.mjs",
        "name": "adapt-pkg",
        "repository": {
          "type": "git",
          "url": "git+https://github.com/OSpoon/adapt-pkg.git",
        },
        "scripts": {
          "build": "unbuild",
          "dev": "unbuild --stub",
          "lint": "eslint .",
          "prepare": "simple-git-hooks",
          "release": "release-it",
          "start": "esno src/index.ts",
          "test": "vitest",
          "test:ci": "vitest run",
          "typecheck": "tsc --noEmit",
        },
        "sideEffects": false,
        "simple-git-hooks": {
          "pre-commit": "npx lint-staged",
        },
        "type": "module",
        "types": "./dist/index.d.ts",
        "typesVersions": {
          "*": {
            "*": [
              "./dist/*",
              "./dist/index.d.ts",
            ],
          },
        },
        "version": "0.0.0",
      }
    `)
  })
})
