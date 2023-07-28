import * as core from '@actions/core'
import { getOctokit } from './utils/getOctokit'
import { getInputs } from './utils/getInputs'
import { verboseOutput } from './utils/verboseOutput'
import { getOwnerAndRepo } from './utils/getOwnerAndRepo'
import { getActionContext } from './utils/getActionContext'
import { getOrigin } from './utils/getOrigin'

// eslint-disable-next-line @typescript-eslint/require-await
export async function run(): Promise<void> {
  try {
    // Get script input options from the GitHub Action input
    const options = getInputs()

    // Get authenticated GitHub API client (Octokit)
    const octokit = getOctokit()
    core.info('GitHub API client obtained.')

    // Extract the owner and repo from the input options
    const { owner, repo } = getOwnerAndRepo()

    const githubContext = getActionContext()

    const sourceRunId = parseInt(options.sourceRunId) || githubContext.selfRunId

    const [pullRequest] = await getOrigin(octokit, sourceRunId, owner, repo)

    verboseOutput(
      'pullRequestNumber',
      pullRequest ? pullRequest.number.toString() : ''
    )
  } catch (error) {
    // If an error occurs during the script execution, fail the GitHub Action and output the error message
    if (error instanceof Error) {
      core.error(error)
      core.setFailed(error)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run()
