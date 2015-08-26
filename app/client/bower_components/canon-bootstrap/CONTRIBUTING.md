# Contributing

We welcome bug reports, feature requests, and pull requests to make canon-bootstrap
better than it is today. This page serves as a guide for how you can help and
contribute back.

- [Found an Issue?](#found-an-issue)
- [Want a Feature?](#want-a-feature)
- [Submit a Pull Request](#submit-a-pull-request)

If you have question about contributing to canon-bootstrap, feel free to come
chat with us in `#canon-dev` on `irc.freenode.net`.

## Found an Issue?

If you find a bug or issue with the documentation, please help us by submitting
an [issue](https://github.com/rackerlabs/canon-bootstrap/issues). Detailed bug reports
are the best way to help us troubleshoot and fix your issue, so please include
the following information in your issue:

- **Overview** - A short description of the issue you see.
- **Steps to Reproduce** - Provide steps for reproducing the issue.
- **Canon Bootstrap Version(s)** - Is this a problem with specific version(s) of canon-bootstrap?
- **OS and Browser Version(s)** - Is this a problem with a specific browser or operating system?
- **Reproduce the Error** - Screenshots or an isolated test case using [JS Bin](http://jsbin.com) are extremely helpful.

Don't feel like you need to stop by just reporting issues. We encourage pull
requests to resolve the issue, too! See [Submit a Pull Request](#submit-a-pull-request)
for more information on submitting a pull request.

## Want a Feature?

Please request features by submitting an [issue](https://github.com/rackerlabs/canon-bootstrap/issues).
When submitting a feature request, please provide as much context and detail as
possible. And don't forget: **pull requests are always welcome.** See
[Submit a Pull Request](#submit-a-pull-request) for more information on
how to submitting a pull request.

## Submit a Pull Request

We appreciate all the help we can get, and pull requests are the best way to
help. However, **please ask** before beginning work on any major pull request.
Otherwise, you risk spending a lot of time and effort working on something that
may not be merged. Additionally, your pull request should adhere to the
following coding standards used throughout the project:

- Code should adhere to Bootstrap's [Code Guidelines](https://github.com/twbs/bootstrap/blob/master/CONTRIBUTING.md#code-guidelines).
- Commit messages should follow Angular's [Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).
- Intermediate and work-in-progress commits should be rebased out.
- Keep pull requests tightly scoped to the bug or feature being addresses.
- All changes from every developer must go through code review before they will be merged.
- All changes must pass the CI build. Travis CI will automatically update your PR with the build status.
- Do not commit changes to the `build` folder. These files are automatically generated and will be committed as part of the release process.
