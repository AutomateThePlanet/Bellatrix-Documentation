---
layout: default
title:  "How Does It Work Internally?"
excerpt: "We have many moving parts- server, test agents, runner and so on. All of them use single command-line-interface; there are no separate installers or executables."
date:   2018-02-21 23:50:17 +0200
---
# How Does It Work Internally? #

![High Overview](https://i.imgur.com/dqJlM0f.png)

We have many moving parts- server, test agents, runner and so on. All of them use single command-line-interface; there are no separate installers or executables.
First, we need to start the server. Its job is to synchronise the work between the runner and all agents. The first time we start it, a portable SQLite database is created. There are stored various kind of information, such as tests execution times, test output files, logs, exceptions, etc. The web service is self-hosted using the ASPNET.Core portable web server- Kestrel. All agents and runners communicate with the server via HTTP. 
## Meissa Test Agent Mode ##
![Test Agent Internal](https://i.imgur.com/6WtrVMN.png)
When you start a test agent, it registers itself as active. Then, it continuously asks the server whether there are scheduled test agent runs to be executed on the machine.
Then the so-called extensibility points plugins are loaded. They offer a way to plug in your logic at various points of the execution pipeline of Meissa runner and test agents. For example- run code before, after a test run or on abortion. At this point, the code from all plugins will be executed before proceeding. Then the specific test technology plugins are loaded. Based on the parallel options, the agent creates multiple tests batches. Then it starts and waits to finish all the processes.
## Meissa Test Runner Mode ##
![Test Runner Internal](https://i.imgur.com/O5h80ge.png)
The test runner doesn’t have a local database. Because of that, it requires the server to be up all the time; otherwise, it cannot function properly.
First, the so-called extensibility points plugins are loaded. At this point, the code from all plugins will be executed before proceeding. Then the test technology plugin is loaded.
Using it the runner gets all active test agents from the API. After that it uses some logic from the plugins to extract and filter the test cases from the tests files. Based on the available test agents, it distributes the tests on each of them. It zips the test output files and sends them to the server, so each agent can download them before tests execution.
The second part of the run is to wait for all test agents to finish. At the same time, a parallel process is started where the runner continually checks whether there are new messages to be printed sent by the agents. Also, one more thread is triggered that the runner verifies its health and one more for agents’ ones . If some of the agents don’t confirm its health on time, the test run is aborted. 
At the end of the process, it merges all test results into a single file and completes the run.
After all, processes finish the results files are merged. 
If Meissa retry option is turned-on and there are any failed tests the whole procedure is repeated for them. At the end of the retry cycle, the test results are updated if any of the tests succeeded. 
After this important step, the agent saves the merged results and completes the test agent run. After that, it waits for the test run to finish before starting to wait for new jobs.
