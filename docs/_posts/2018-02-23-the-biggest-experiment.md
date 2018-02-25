---
layout: default
title:  "Go Even Further- The Biggest Experiment"
excerpt: "We have many moving parts- server, test agents, runner and so on. All of them use single command-line-interface; there are no separate installers or executables."
date:   2018-02-23 13:50:17 +0200
---
# Go Even Further- The Biggest Experiment #

I wanted to end the talk with some statistics, and I thought it might be fun to go even further. So, I created a test project with 100000 tests. I created a simple application for their generation.

![Load Test Generation](https://i.imgur.com/MHGAf9b.png)

![100000 Generated Tests](https://i.imgur.com/c3k3W1O.png)

Each of them executes for one second, which means that, if you run them sequentially on a single machine, they will run for 1666 minutes = ~27.8 hours. 
To use Meissa’s maximal capabilities, I decided to create 10 virtual machines in Azure; each of them had 8 CPU cores and 14 GB of RAM. Then I started Meissa in Agent mode on each of them. 
![Azure 10 Machines](https://i.imgur.com/ViZi2eT.png)

Of course, I created a separate VSTS build for the ultimate test.
![Meissa Go Event Further Build](https://i.imgur.com/X79nmu8.png)

The plan was to execute the tests on the 10 machines and on each of them to start 8 separate test processes, which means the tests had to be executed 80 times faster. Below, you can see the results.
![Improved Build Meissa less than 20 minutes](https://i.imgur.com/oTRcHpy.png)

The tests were executed for less than 20 minutes. I reconfigured the build to use 14 processes. I am happy with the results that show the tool can cope with the most extreme situations. 
