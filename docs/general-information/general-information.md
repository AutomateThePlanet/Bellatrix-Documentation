---
layout: default
title:  "General Information"
excerpt: "Learn how to install and activate BELLATRIX. Read the system requirements."
date:   2020-04-30 06:50:17 +0200
parent: general-information
permalink: /general-information/
anchors:
  overview: Overview
  simple-installation: Simple Installation
  running-tests-through-cli: Running Tests through CLI
  testing-on-remote-machines: Testing on Remote Machines
---
Overview
--------
BELLATRIX is not a single thing it contains multiple framework libraries, extensions and tools. The tool is built to be cross-platform, however some of the features can be used under Windows since they are written for Visual Studio.

Simple Installation
------------------
1. Download the BELLATRIX projects zip file from the email you received after the downloading step.
2. Unzip it. The projects are grouped by technology: web, desktop, mobile, API, load testing

![Unzip Step](images/unzip-bellatrix-templates.png)

![Grouping By Technology](images/projects-grouping-by-technology.png)

3. Open the project based on the test framework you prefer: MSTest or NUnit.

![Grouping By Test Framework](images/projects-templates-grouping-by-test-framework.png)

4. Click on the csproj file.

![Open csproj](images/open-csproj.png)

5. Run the sample tests.
6. You can try to write a simple test yourself.
7. For an in-depth revision of all framework features you can open the getting started projects.

- [**Starter Kits**](how-to-use-starter-kits.md)

Running Tests through CLI
--------------------------
 To execute your tests via command line in Continues Integration (CI), you can use the native .NET Core test runner. After the BELLATRIX 2020 R1 release, you can run an unlimited number of BELLATRIX tests without owning a paid license. To be able to do so, you need to use the latest project templates from the 2020 R1 release or install manually **Bellatrix.TestLogger** NuGet package to your test project.
 Here is a simple CLI command to execute your tests via the .NET test runner. 
1. Navigate to the folder of your test project.
2. Open the CMD there.
3. Execute the following command:

```
dotnet test --logger:Bellatrix
```
For applying filters and other more advanced configuration check the official documentation [https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test "dotnet test") and [https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-vstest](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-vstest "dotnet vstest").

Both MSTest and NUnit are supported.

Testing on Remote Machines
--------------------------
To execute your tests on a remote machine or multiple machines you can use Automate the Planet open-source distributed test runner [**Meissa**](https://meissarunner.com).

You can download it from the site. To get started read [**Meissa Docs**](http://docs.meissarunner.com/).
