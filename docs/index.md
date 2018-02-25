---
layout: default
title:  "Getting Started"
excerpt: "Getting Started"
date:   2018-02-20 04:50:17 +0200
---
# Getting Started #

1. Go to [**meissarunner.com**](http://meissarunner.com/ "meissarunner.com")
2. Download the file for your operating system (Windows, Linux, MacOS)
3. Unzip It 

You need to choose which type of test execution you prefer:
- Parallel- single machine - multiple processes
- Distributed testing- multiple machines - single process
- Parallel distributed testing- multiple machines - multiple processes

For more information about the topic refer to the section- [**What is a Parallel Test Execution?**](what-is-parallel-test-execution.md)

Below you can find info about the different setup and examples how to start using Meissa. However, for complete reference about all available options and their meanings refer to the [**How Do We Use It?**](how-do-we-use-it.md) section.

## 1. Parallel- Single Machine - Multiple Processes ##

In this scenario, you will execute your test on a single machine.

- Start Meissa in **server mode** on your machine
```
meissa.exe initServer
```
- Start Meissa in **test agent mode** on the same machine
```
meissa.exe testAgent --testAgentTag="APIAgent" --testServerUrl="http://IPServerMachine:5000"
```
- Run your tests with Meissa **test runner mode** on the same machine
```
meissa.exe runner --resultsFilePath="pathToResults\result.trx" --outputFilesLocation="pathToBuildedFiles" 
--agentTag="APIAgent" --testTechnology="MSTestCore" 
--testLibraryPath="pathToBuildedFiles\SampleTestProj.dll"
```

After the test execution, the runner will be closed. Do not close the server and the test agent they will be reused for the new runs.

## 2. Distributed Testing- Multiple Machines - Single Process ##

In this scenario, you will execute your test on multiple machines.

- Start Meissa in **server mode** on a dedicated machine. Depending on what resources does it have, you may consider the option to have a dedicated computer for the server or at least not start it on the same device where there is a test agent or runner. Please refer to the **requirements** section.
```
meissa.exe initServer
```
- Start Meissa in **test agent mode** on all machines that you want to be agents. Depending on their resources and what will be executed, prefer scenarios where the test agent runs there in isolation. Make sure to set the correct test server URL. It is formed by the IP of the machine where you have started Meissa in server mode.
```
meissa.exe testAgent --testAgentTag="APIAgent" --testServerUrl="http://IPServerMachine:5000"
```
- Run your tests with Meissa **test runner mode** on some of the machines or even better prefer starting it on a dedicated computer. Refer to the requirements section.
```
meissa.exe runner --resultsFilePath="pathToResults\result.trx" --outputFilesLocation="pathToBuildedFiles" 
--agentTag="APIAgent" --testTechnology="MSTestCore" 
--testLibraryPath="pathToBuildedFiles\SampleTestProj.dll"
```

After the test execution, the runner will be closed. Do not close the server and the test agent they will be reused for the new runs.

## 3. Parallel Distributed Testing- Multiple Machines - Multiple Processes ##
All configurations are almost the same as the previous section except the running tests processes. 
To execute the tests in parallel, you have two options. If you use the parallel capabilities of the used native runner, then you don't have to do anything more. The tests will be executed in parallel on each test agent machine.
If you want to use Meissa's parallel execution capabilities, you need to add an argument to the runner options.
```
--runInParallel
```
For more detailed information refer to the [**features**](features.md) and [**how it works internally**](how-does-it-work-internally.md) sections.