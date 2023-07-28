import { Octokit as Core, RestEndpointMethodTypes } from '@octokit/action'

export type PullsListResponseData =
  RestEndpointMethodTypes['pulls']['list']['response']['data']

export type MyOctokit = InstanceType<typeof Core>

export type PullsListRes = PullsListResponseData[0]

export type WorkflowRunData = {
  event: string
  headBranch: string | null
  fullName: string
  login: string
  headSha: string
  url: string
}
