import type { QuestionCollection } from 'inquirer'
import { getPkgInfo, splitAuthor } from './utils'

const pkg = getPkgInfo()

export const USAGE = [
  'Usage: adapt-pkg [--help] [--boot] [-n <name>] [-d <description>] [-a <author>] [-e <email>]',
  '  -n <name>            create a name to the library and conform to the package naming specification.',
  '  -d <description>     describe what this library needs to do, if there is a space you need to use quotation marks.',
  '  -a <author>          add the author of this library, with the nickname of github.',
  '  -e <email>           add a email that can be linked to you.',
  '  --boot               enable boot mode.',
  '  --help               print help',
].join('\n')

export const QUESTIONS: Array<QuestionCollection> = [
  {
    type: 'input',
    name: 'name',
    message: 'project name:',
    default: pkg.name || '',
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the project name'
      return true
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'project description:',
    default: pkg.description || '',
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the project description'
      return true
    },
  },
  {
    type: 'input',
    name: 'author',
    message: 'developer name:',
    default: splitAuthor(pkg.author).author,
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the developer name'
      return true
    },
  },
  {
    type: 'input',
    name: 'email',
    message: 'developer email:',
    default: splitAuthor(pkg.author).email,
    validate(input: string): string | boolean {
      if (!input)
        return 'please enter the developer email'
      return true
    },
  },
]
