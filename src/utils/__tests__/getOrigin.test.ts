import { logWorkflowInfo, getOrigin } from '../getOrigin'
import { getWorkflowRun } from '../getWorkflowRun'
import { getPullRequestFromWorkflow } from '../getPullRequestFromWorkflow'
import * as core from '@actions/core'
import * as github from '@actions/github'

jest.mock('@actions/core')
jest.mock('@actions/github')
jest.mock('../getWorkflowRun')
jest.mock('../getPullRequestFromWorkflow')

describe('logWorkflowInfo', () => {
  it('should log the workflow data correctly', () => {
    const workflowData = {
      fullName: 'test/test-repo',
      headBranch: 'test-branch',
      event: 'push',
      headSha: '123abc',
      url: 'https://github.com/test/test-repo/actions/runs/123456',
    }

    logWorkflowInfo(workflowData)

    expect(core.info).toHaveBeenCalledWith(
      'Source workflow: Head repo: test/test-repo, Head branch: test-branch Event: push, Head sha: 123abc, url: https://github.com/test/test-repo/actions/runs/123456'
    )
  })

  it('should handle null branch correctly', () => {
    const workflowData = {
      fullName: 'test/test-repo',
      headBranch: null,
      event: 'push',
      headSha: '123abc',
      url: 'https://github.com/test/test-repo/actions/runs/123456',
    }

    logWorkflowInfo(workflowData)

    expect(core.info).toHaveBeenCalledWith(
      'Source workflow: Head repo: test/test-repo, Head branch:  Event: push, Head sha: 123abc, url: https://github.com/test/test-repo/actions/runs/123456'
    )
  })
})

describe('getOrigin', () => {
  it('should return null when getWorkflowRun returns null', async () => {
    ;(getWorkflowRun as jest.Mock).mockResolvedValue(null)

    const octokit = github.getOctokit('fake-token')
    const result = await getOrigin(octokit, 123, 'test-owner', 'test-repo')

    expect(result).toEqual([null])
  })

  // it('should return pull request when getWorkflowRun returns valid workflow data', async () => {
  //   const workflowData = {
  //     fullName: 'test/test-repo',
  //     headBranch: 'test-branch',
  //     event: 'push',
  //     headSha: '123abc',
  //     url: 'https://github.com/test/test-repo/actions/runs/123456'
  //   }

  //   // Provide a mock object that matches the shape of your expected pull request data.
  //   const pullRequest = {
  //     number: 1,
  //     head: {
  //       sha: '123abc'
  //     },
  //     url: 'https://github.com/test/test-repo/pulls/1'
  //   }

  //   (getWorkflowRun as jest.Mock).mockResolvedValue(workflowData)
  //   (getPullRequestFromWorkflow as jest.Mock).mockResolvedValue(pullRequest)

  //   const octokit = github.getOctokit('fake-token')
  //   const result = await getOrigin(octokit, 123, 'test-owner', 'test-repo')

  //   expect(result).toEqual([pullRequest])
  // })
})
