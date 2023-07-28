import * as github from '@actions/github'
import { PullsListRes, WorkflowRunData } from '../types'
import { findPullRequest } from './findPullRequest'

/**
 * Retrieves a pull request associated with a workflow if the event that triggered the workflow was a pull request or a pull request review.
 *
 * @param octokit - An authenticated Octokit REST client.
 * @param owner - The owner of the repository.
 * @param repo - The repository name.
 * @param workflowData - The data of the workflow run.
 *
 * @returns The pull request if found and the triggering event was a pull request or a pull request review, otherwise null.
 */
export async function getPullRequestFromWorkflow(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string,
  workflowData: WorkflowRunData
): Promise<PullsListRes | null> {
  if (
    workflowData.event !== 'pull_request' &&
    workflowData.event !== 'pull_request_review'
  ) {
    return null
  }

  return await findPullRequest(octokit, owner, repo, workflowData.headSha)
}
