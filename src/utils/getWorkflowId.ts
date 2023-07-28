import * as github from '@actions/github'
import * as core from '@actions/core'

export async function getWorkflowId(
  octokit: ReturnType<typeof github.getOctokit>,
  runId: number,
  owner: string,
  repo: string
): Promise<number> {
  const reply = await octokit.rest.actions.getWorkflowRun({
    owner,
    repo,
    run_id: runId,
  })

  core.info(`The source run ${runId} is in ${reply.data.workflow_url} workflow`)

  const workflowIdString = reply.data.workflow_url.split('/').pop() || ''

  if (!(workflowIdString.length > 0)) {
    throw new Error('Could not resolve workflow')
  }

  return parseInt(workflowIdString)
}
