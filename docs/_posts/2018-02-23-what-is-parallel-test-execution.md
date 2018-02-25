---
layout: default
title:  "What is a Parallel Test Execution?"
excerpt: "We have many moving parts- server, test agents, runner and so on. All of them use single command-line-interface; there are no separate installers or executables."
date:   2018-02-23 14:50:17 +0200
---
# What is a Parallel Test Execution? #

I can define at least three types of parallel test execution:

## 1. Parallel- Single Machine - Multiple Processes ##
![Single Machine- Multiple Processes](https://i.imgur.com/FbAQYD7.png)
Some unit test frameworks have native parallel execution support like NUnit. You have, for example, 100 tests. If you run them on a single machine with 5 CPU Cores, on each core, 20 tests will be executed simultaneously. However, not all test frameworks support this option, and there are some major problems related to it, depending on the type of tests you want to run.
## 2. Distributed Testing- Multiple Machines - Single Process ##
![Multiple Machines- Single Process](https://i.imgur.com/HHGTQhV.png)
Your second option is to run your tests at the same time on multiple machines and merge the results at the end. Usually, you need an additional complex tooling, for example Microsoft Test Controller/Agents setup.
## 3. Parallel Distributed Testing- Multiple Machines - Multiple Processes ##
![Multiple Processes- Multiple Processes](https://i.imgur.com/YM4lEQ1.png)
You can mix both approaches. In this case, you will use the complex tooling and, at the same time, run the tests in parallel on each machine. 