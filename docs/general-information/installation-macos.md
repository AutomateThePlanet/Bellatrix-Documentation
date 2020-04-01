---
layout: default
title:  "Installation MacOS"
excerpt: "Learn how to install BELLATRIX tools on MacOS."
date:   2018-09-06 06:50:17 +0200
parent: general-information
permalink: /general-information/installation-macos/
anchors:
  overview: Overview
  simple-installation: Simple Installation
  installation-steps-visual-command-line: Installation Steps Command Line
  testing-on-remote-machines: Testing on Remote Machines
---
Overview
--------
BELLATRIX is not a single thing it contains multiple framework libraries, extensions and tools.
The recommended code editor for MacOS is [**Visual Studio for Mac**](https://visualstudio.microsoft.com/vs/mac/) but you can also use [**Visual Studio Code**](https://code.visualstudio.com/).

> Before proceeding with the installation, please read the [**system requirements**](system-requirements.md) system requirements and **install all prerequisites**!

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

Installation Steps Command Line
-------------------------------------

There are not snippets, item or project templates for [**Visual Studio Code**](https://code.visualstudio.com/). The way you create BELLATRIX project is through CLI.

Before you can create a new project, you need to install the template first.

**All available templates:**

- Bellatrix.API.GettingStarted
- Bellatrix.API.MSTest.Tests
- Bellatrix.API.NUnit.Tests
- Bellatrix.Desktop.GettingStarted
- Bellatrix.Desktop.MSTest.Tests
- Bellatrix.Desktop.NUnit.Tests
- Bellatrix.Web.GettingStarted
- Bellatrix.Web.MSTest.Tests
- Bellatrix.Web.NUnit.Tests

**Install Template**

```
dotnet new -i Bellatrix.Web.GettingStarted
```

**Create Project from Template**
1. Open the folder where you want the files to be placed
2. Open CMD
3. Type the below command for the desired template

```
dotnet new Bellatrix.Web.GettingStarted
```
 [**Getting Started projects**](how-to-use-starter-kits.md) contain examples, demos and exercises. It is recommended to create such a project first and test the BELLATRIX tools and libraries. After that, you can use "Tests" templates which generate empty preconfigured BELLATRIX projects depending on the technology- Web, Desktop, API, MSTest, NUnit.

![Create Getting Started CLI](images/create-getting-started-console.png)

Testing on Remote Machines
--------------------------
To execute your tests on a remote machine or multiple machines you can use Automate the Planet open-source distributed test runner [**Meissa**](https://meissarunner.com).

You can download it from the site. To get started read [**Meissa Docs**](http://docs.meissarunner.com/).
