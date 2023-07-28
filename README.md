# Workflow origin action (Action)

[![Check dist/](https://github.com/thedaviddias/workflow-origin-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/thedaviddias/workflow-origin-action/actions/workflows/check-dist.yml)
[![Build tests](https://github.com/thedaviddias/workflow-origin-action/actions/workflows/build-test.yml/badge.svg)](https://github.com/thedaviddias/workflow-origin-action/actions/workflows/build-test.yml)

A GitHub Action that provides detailed information about the triggering pull requests for workflow events, enhancing what's available from the standard GitHub context.

## Usage

To use this GitHub Action, you need to create a workflow file (e.g., ``.github/workflows/get-information.yml``) in your repository. Here's an example workflow:

```yaml
name: Get information

on:
  pull_request:
    branches: ['main']

jobs:
  info:
    permissions:
      contents: read
      pull-requests: write

    runs-on: ubuntu-latest

    steps:

      - name: Get origin information
        uses: thedaviddias/workflow-origin-action@vX.X.X
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Description

`Workflow Origin' action gives you details about the pull requests that kick-started the workflow for the pull_request, pull_request_review, and workflow_run events. These events usually need more source run information than what GitHub context directly gives you.

Think of it like this - if your workflow starts because of a pull request, you might want to know about the merge commit produced by that pull request or any labels tied to the Pull Request. This action provides outputs for this kind of data. It's best to place this action first in your workflow sequence. Then, you can access its outputs using the 'needs' dependency.

For the pull_request event, don't specify the sourceRunId input. However, for the workflow_run event, you should set sourceRunId to ${{ github.event.workflow_run.id }}.

#### Inputs

| Input name     | Required | Default | Description                                                                               |
| -------------- | -------- | ------- | ----------------------------------------------------------------------------------------- |
| `github_token` | yes      |         | Token to use to authorize label changes. Typically the GITHUB_TOKEN secret                |
| `sourceRunId`  | no       |         | In case of `workflow_run` event it should be set to `${{ github.event.workflow_run.id }}` |


### Outputs

| Output name         | No `sourceRunId` specified                              | The `sourceRunId` set to `${{ github.event.workflow_run.id }}` |
| ------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| `pullRequestNumber` | Number of the associated Pull Request (if PR triggered) | Number of the associated Pull Request (if PR triggered)        |



## Examples

### Example Workflow (Minimum Configuration)

```yaml
name: Get information

on:
  pull_request:
    branches: ['main']

jobs:
  info:
    permissions:
      contents: read
      pull-requests: write

    runs-on: ubuntu-latest

    steps:
      - name: Release Notification
        uses: thedaviddias/workflow-origin-action@vX.X.X
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

```

## Inspiration

The current action is inspired by [Get Workflow Origin](https://github.com/potiuk/get-workflow-origin) which unfortunately didn't seem active enough.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Licence

This GitHub Action is licensed under the [MIT License](./LICENSE).
