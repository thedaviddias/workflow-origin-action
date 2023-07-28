import * as github from '@actions/github'
import * as core from '@actions/core'
import { PullsListRes, WorkflowRunData } from '../types'
import { getWorkflowRun } from './getWorkflowRun'
import { getPullRequestFromWorkflow } from './getPullRequestFromWorkflow'

/**
 * Logs information about the workflow run.
 *
 * @param workflowData - The data object containing the information about the workflow run. This includes:
 *   - fullName: The full name of the head repository
 *   - headBranch: The name of the branch where the workflow run is triggered
 *   - event: The event that triggered the workflow run
 *   - headSha: The commit SHA that triggered the workflow run
 *   - url: The URL of the workflow run
 */
export function logWorkflowInfo({
  fullName,
  headBranch,
  event,
  headSha,
  url,
}: Omit<WorkflowRunData, 'login'>): void {
  core.info(
    `Source workflow: Head repo: ${fullName}, ` +
      `Head branch: ${headBranch || ''} ` +
      `Event: ${event}, Head sha: ${headSha}, url: ${url}`
  )
}

/**
 * Retrieves the origin of a workflow run, including any associated pull request.
 *
 * @param octokit - An instance of Octokit.
 * @param runId - The ID of the workflow run.
 * @param owner - The owner of the repository where the workflow run occurred.
 * @param repo - The repository where the workflow run occurred.
 *
 * @returns - A promise that resolves with the pull request associated with the workflow run, or null if there is none.
 */
export async function getOrigin(
  octokit: ReturnType<typeof github.getOctokit>,
  runId: number,
  owner: string,
  repo: string
): Promise<[PullsListRes | null]> {
  const workflowData = await getWorkflowRun(octokit, runId, owner, repo)

  if (workflowData === null) {
    return [null]
  }

  logWorkflowInfo(workflowData)

  const pullRequest = await getPullRequestFromWorkflow(
    octokit,
    owner,
    repo,
    workflowData
  )

  return [pullRequest]
}
