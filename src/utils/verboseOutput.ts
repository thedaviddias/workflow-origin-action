import * as core from '@actions/core'

export function verboseOutput(name: string, value: string): void {
  core.info(`Setting output: ${name}: ${value}`)
  core.setOutput(name, value)
}
