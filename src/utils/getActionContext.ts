import * as core from '@actions/core'
import { getRequiredEnv } from './getRequiredEnv'

export type ActionContextType = {
  githubRunId: string
  selfRunId: number
  repository: string
  eventName: string
}

export function getActionContext(): ActionContextType {
  core.info('Action context obtained.')

  const githubRunId = getRequiredEnv('GITHUB_RUN_ID')
  const selfRunId = parseInt(githubRunId)
  const repository = getRequiredEnv('GITHUB_REPOSITORY')
  const eventName = getRequiredEnv('GITHUB_EVENT_NAME')

  return {
    githubRunId,
    selfRunId,
    repository,
    eventName,
  }
}
