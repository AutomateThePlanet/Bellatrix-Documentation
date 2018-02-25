---
layout: default
title:  "How to Develop Plugins?"
excerpt: "We have many moving parts- server, test agents, runner and so on. All of them use single command-line-interface; there are no separate installers or executables."
date:   2018-02-22 23:50:17 +0200
---
# How to Develop Plugins? #
Meissa exposes two types of plugins.

- Test Runner Plugins
- Extensibility Points Plugins

## Test Runner Plugins ##
Test runner plugins are used for various tasks inside Meissa. For example- locating tests for a specific technology, reading the result file, merging files, getting passed/failed tests, etc. 
For each test technology that Meissa offers there is a separate test runner plugin.
If Meissa doesn't offer your test technology, you can build a new plugin quickly for it. The code of the plugins is in C#, but you can execute executables written in any language. If you don't know who to do it just contact us on Gitter, refer to the [**Get Involved**](get-involved.md) section.

### Steps to Write New Plugin ###
1. Create a new C# .NET Core/.NET Standard library project
2. Install **Meissa.Plugins.Contracts** NuGet Package
3. Implement the two test runner plugin interfaces- **INativeTestsRunnerTestCasesPluginService** and **INativeTestsRunnerPluginService**

You can find two already built plugins in the [GitHub repository](https://github.com/angelovstanton/Meissa)- **Meissa.Plugins.MSTest** and **Meissa.Plugins.NUnit**

## Extensibility  ability Points Plugins ##
The extensibility points plugins offer way to plug in your own logic in various points of the execution pipeline of Meissa runner and test agents.
**Test Agent Points:**
- before test run
- after test run
- on test run abortion

**Test Runner Points:**
- before test run
- after test run

### Steps to Write New Plugin ###
1. Create a new C# .NET Core/.NET Standard library project
2. Install **Meissa.Plugins.Contracts** NuGet Package
3. Implement the two test runner plugin interfaces- **ITestAgentPluginService** and **ITestRunnerPluginService**
## How to Use Already Created Plugins? ##

Build your plugin project then copy the output files to the Meissa Plugins folder.