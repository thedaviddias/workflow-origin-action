import * as github from '@actions/github'
import * as core from '@actions/core'

/**
 * Extracts the owner and repository name from a given string or uses the values from the current GitHub context.
 *
 * @returns {{owner: string, repo: string}} - An object containing the owner and repository name.
 */
export function getOwnerAndRepo() {
  const { context } = github
  const owner = context.repo.owner
  const repo = context.repo.repo

  core.info(`Working on the repository: ${owner}/${repo}`)

  return { owner, repo }
}
