import { describe, expect, it } from 'vitest'
import { generationMITLicense, generationPkg, generationReadme, isEffectivelibrary, paramsVerify } from '../src/utils'

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

    expect(pkgInfo.author).toMatchInlineSnapshot('"OSpoon <zxin088@gmail.com>"')

    expect(pkgInfo.homepage).toMatchInlineSnapshot('"https://github.com/OSpoon/test-lib#readme"')

    expect(pkgInfo.repository).toMatchInlineSnapshot(`
      {
        "type": "git",
        "url": "git+https://github.com/OSpoon/test-lib.git",
      }
    `)

    expect(pkgInfo.bugs).toMatchInlineSnapshot('"https://github.com/OSpoon/test-lib/issues"')
  })
})
