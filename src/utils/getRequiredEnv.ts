import * as core from '@actions/core'

/**
 * Retrieves the value of the specified environment variable and sets the action as failed if the variable is not defined.
 *
 * @param key - The name of the environment variable.
 *
 * @returns The value of the environment variable, or undefined if the variable is not defined.
 */
export function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (value === undefined) {
    const message = `Environment variable ${key} was not defined. Please ensure this variable is set in your environment configuration.`
    core.setFailed(message)
    throw new Error(message)
  }
  return value
}
