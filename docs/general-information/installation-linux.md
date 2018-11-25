---
layout: default
title:  "Installation Linux"
excerpt: "Learn how to install BELLATRIX tools on Linux OS."
date:   2018-09-06 06:50:17 +0200
parent: general-information
permalink: /general-information/installation-linux/
anchors:
  overview: Overview
  installation-steps: Installation Steps
  testing-on-remote-machines: Testing on Remote Machines
---
Overview
--------
BELLATRIX is not a single thing it contains multiple framework libraries, extensions and tools. 

> Before proceeding with the installation, please read the [**system requirements**](system-requirements.md) system requirements and **install all prerequisites**!

Installation Steps
------------------

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
