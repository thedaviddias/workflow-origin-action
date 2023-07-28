import * as github from '@actions/github'
import * as core from '@actions/core'
import { WorkflowRunData } from '../types'

export async function getWorkflowRun(
  octokit: ReturnType<typeof github.getOctokit>,
  runId: number,
  owner: string,
  repo: string
): Promise<WorkflowRunData | null> {
  const workflowRunData = await octokit.rest.actions.getWorkflowRun({
    owner,
    repo,
    run_id: runId,
  })

  const {
    event,
    head_branch: headBranch,
    head_repository: {
      full_name: fullName,
      owner: { login },
    },
    head_sha: headSha,
    url,
  } = workflowRunData.data

  if (headBranch === null) {
    core.info(`Head branch is null for workflow: ${url}`)
    return null
  }

  return { event, headBranch, fullName, login, headSha, url }
}
