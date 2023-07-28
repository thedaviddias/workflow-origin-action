import * as github from '@actions/github'
import * as core from '@actions/core'
import { PullsListRes } from '../types'

const ghApi = process.env['GITHUB_API_URL'] || 'https://api.github.com'

/**
 * Constructs a GitHub API URL for a pull request.
 *
 * @param owner - The owner of the repository.
 * @param repo - The repository name.
 * @param {number} prNumber - The pull request number.
 *
 * @returns The API URL for the pull request.
 */
function constructPrUrl(owner: string, repo: string, prNumber: number): string {
  return `${ghApi}/${owner}/${repo}/pulls/${prNumber}`
}

/**
 * Finds a pull request based on the head SHA.
 *
 * @param octokit - An authenticated Octokit REST client.
 * @param owner - The owner of the repository.
 * @param repo - The repository name.
 * @param headRepo - The head repository name.
 * @param headBranch - The name of the head branch.
 * @param headSha - The SHA of the commit at the head of the pull request.
 *
 * @returns {Promise<PullsListRes | null>} The pull request if found, otherwise null.
 */
export async function findPullRequest(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string,
  headSha: string
): Promise<PullsListRes | null> {
  core.info(`\nFinding PR request id for: owner: ${owner}, Repo:${repo}.\n`)

  const pullRequests = await octokit.paginate('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
  })

  const pullRequest = pullRequests.find((pr) => pr.head.sha === headSha)

  if (pullRequest) {
    core.info(
      `\nFound PR: ${pullRequest.number}. ` +
        `Url: ${constructPrUrl(owner, repo, pullRequest.number)}\n`
    )
    return pullRequest
  }

  core.info(`\nCould not find the PR for this build :(\n`)
  return null
}
