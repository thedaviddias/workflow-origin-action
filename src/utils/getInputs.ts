import * as core from '@actions/core'

export interface GetInputsType {
  sourceRunId: string
}

/**
 * Retrieves the inputs for the GitHub Action from the workflow file.
 *
 * @returns {GetInputsType} - An object containing all inputs for the GitHub Action.
 */
export function getInputs(): GetInputsType {
  core.info('Input options obtained.')

  const sourceRunId = core.getInput('sourceRunId') || ''

  return {
    sourceRunId,
  }
}
