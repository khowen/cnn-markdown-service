# CNN Markdown Service

[![dependency-status](https://gemnasium.com/cnnlabs/cnn-markdown-service.svg)](https://gemnasium.com/cnnlabs/cnn-markdown-service)
[![build-status-master](https://img.shields.io/travis/cnnlabs/cnn-markdown-service/master.svg?style=flat-square&label=master)](https://travis-ci.org/cnnlabs/cnn-markdown-service)
[![build-status-develop](https://img.shields.io/travis/cnnlabs/cnn-markdown-service/master.svg?style=flat-square&label=develop)](https://travis-ci.org/cnnlabs/cnn-markdown-service)



## Requirements

Read these "_requirements_" as "_only tested with_".

- [Node.js](https://nodejs.org/) LTS or higher



## Install

```shell
$ npm install --save --save-exact cnn-markdown-service
```



## Usage

This is intended to be used as a dependency in a larger application.  Refer to
the [example.js](./example/example.js) that you can run with
`$ node example/example.js`.



## ESDoc Documentation

You can generate and view the docs locally with the commands below.  The `open`
command will only work on macOS.

```shell
$ npm run generate-docs
$ open docs/index.html
```



## NPM scripts

- `generate-authors` - Generates [AUTHORS.md](./AUTHORS.md).
- `generate-changelog` - Generates output to put in [CHANGELOG.md](./CHANGELOG.md).
- `generate-coverage` - Generates a code coverage report in `/coverage`.
- `generate-docs` - Generates ESDoc documentation in `/docs`.
- `test` - Runs all tests.
- `update-apply` - Updates [package.json](./package.json) with dependency updates.
- `update-check` - Outputs if any dependency updates are needed.



## Developer notes

- Always develop on the node version specified in the [.nvmrc](./.nvmrc) file.
  If [nvm](https://github.com/creationix/nvm) is used typing `nvm install`
  in the terminal will insure the correct version is used.

- Contributors should be familiar with the [Contributors Guide](https://github.com/cnnlabs/organization-docs/blob/master/CONTRIBUTING.md)

- Collaborators should be familiar with the [Collaborator Guide](https://github.com/cnnlabs/organization-docs/blob/master/COLLABORATOR_GUIDE.md)

- The current Project Owner (PO) of this project is Jamie Young ([@jamsyoung](https://github.com/jamsyoung/)).



## Licensing

See [LICENSE.md](./LICENSE.md) for details.


---
♥︎ 'Cause I'm A Turn It In And I'm A Turn It Out But Now I've Got To Pass The Mic To Yauch - King Ad-Rock
