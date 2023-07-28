import * as core from '@actions/core'
import { getInputs } from '../getInputs' // replace 'your-function-file' with actual file name

// Create a mock function for core.getInput
jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  info: jest.fn(),
}))

describe('getInputs function', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return sourceRunId when input is provided', () => {
    // Setup the mock function to return a specific value
    ;(
      core.getInput as jest.MockedFunction<typeof core.getInput>
    ).mockReturnValueOnce('1234')

    const result = getInputs()

    // Check that the result is as expected
    expect(result).toEqual({ sourceRunId: '1234' })

    // Check that getInput was called with the right arguments
    expect(core.getInput).toHaveBeenCalledWith('sourceRunId')
  })

  it('should return empty string when no sourceRunId input is provided', () => {
    // Setup the mock function to return undefined, as it would when no input is provided
    ;(
      core.getInput as jest.MockedFunction<typeof core.getInput>
    ).mockReturnValueOnce('')

    const result = getInputs()

    // Check that the result is as expected
    expect(result).toEqual({ sourceRunId: '' })

    // Check that getInput was called with the right arguments
    expect(core.getInput).toHaveBeenCalledWith('sourceRunId')
  })
})
