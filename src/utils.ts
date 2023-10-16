import { log } from 'node:console'
import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import pc from 'picocolors'

const { green, red } = pc

export function getPkgInfo() {
  const pkgContent = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  return JSON.parse(pkgContent)
}

export function splitAuthor(content: string) {
  const [author, email] = content.split(' ')
  return {
    author: author || '',
    email: email || '',
  }
}

export function isEffectivelibrary() {
  return fs.existsSync(path.join(process.cwd(), 'package.json'))
}

export function exit(error: boolean = false, message?: string) {
  if (message)
    log(message)
  process.exit(error ? 1 : 0)
}

export function paramsVerify(...args: string[]) {
  if (args.some(arg => typeof arg !== 'string' || arg.trim() === ''))
    return false

  return true
}

export function generationPkg(name: string, description: string, author: string, email: string) {
  const pkg = getPkgInfo()
  return {
    ...pkg,
    name,
    description,
    author: `${author} ${email}`,
    homepage: `https://github.com/${author}/${name}#readme`,
    repository: {
      type: pkg.repository.type,
      url: `git+https://github.com/${author}/${name}.git`,
    },
    bugs: `https://github.com/${author}/${name}/issues`,
  }
}

export function generationReadme(name: string, description: string, author: string) {
  return `# ${name}

${description}

## License

[MIT](./LICENSE) License © ${new Date().getFullYear()}-PRESENT [${author}](https://github.com/${author})
`
}

export function generationMITLicense(author: string) {
  return `MIT License
  
Copyright (c) ${new Date().getFullYear()} ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`
}

export function generation(name: string, description: string, author: string, email: string) {
  // 校验录入的项目名称、描述、作者参数完整
  if (!paramsVerify(name, description, author))
    exit(true, `${green('[adapt-pkg]: ')}${red('running failure, the parameters seem incomplete.')}`)

  const pkgInfo = generationPkg(name, description, author, email)
  fs.writeFileSync('package.json', JSON.stringify(pkgInfo, null, 2))

  const readme = generationReadme(name, description, author)
  fs.writeFileSync('README.md', readme)

  const license = generationMITLicense(author)
  fs.writeFileSync('LICENSE', license)

  log(`${green('[adapt-pkg]: running successful 🎉')}`)
}
