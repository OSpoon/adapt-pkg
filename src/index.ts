import process from 'node:process'

import minimist from 'minimist'
import { green, red } from 'picocolors'
import inquirer from 'inquirer'
import { exit, generation, isEffectivelibrary } from './utils'
import { QUESTIONS, USAGE } from './constants'

async function startup() {
  const argv = minimist(process.argv.slice(2))

  // 打印帮助信息
  if (argv.help)
    exit(false, USAGE)

  // 校验是否是有效的模块
  if (!isEffectivelibrary())
    exit(true, `${green('[init-pkg]: ')}${red('this folder should be initialized with npm init -y.')}`)

  // 支持引导模式和命令模式
  if (argv.boot) {
    const { name, description, author, email } = await inquirer.prompt(QUESTIONS)
    generation(name, description, author, email)
  }
  else {
    generation(argv.n, argv.d, argv.a, argv.e)
  }
}

startup()
