---
layout: default
title:  "Installation Windows"
excerpt: "Learn how to install BELLATRIX tools on Windows OS."
date:   2018-09-06 06:50:17 +0200
parent: general-information
permalink: /general-information/installation-windows/
anchors:
  overview: Overview
  installation-steps-visual-studio: Installation Steps Visual Studio
  installation-steps-visual-studio-code: Installation Steps Visual Studio Code
  testing-on-remote-machines: Testing on Remote Machines
---
Overview
--------
BELLATRIX is not a single thing it contains multiple framework libraries, extensions and tools. The tool is built to be cross-platform, however some of the features can be used under Windows since they are written for Visual Studio.

> Before proceeding with the installation, please read the [**system requirements**](system-requirements.md) system requirements and **install all prerequisites**!

Installation Steps Visual Studio
------------------
1. Download BELLATRIX UI Installer [**x86 version**](installers/Bellatrix.Installer.UI-1.5.3.0-x86.msi) or [**x64 version**](installers/Bellatrix.Installer.UI-1.5.3.0-x64.msi)
2. Run **Bellatrix.Installer.UI.msi**

![BELLATRIX UI Installer](images/bellatrix-ui-installer.png)

After you install the product, you need to create a starter kit project to see how to use all features or create an empty BELLATRIX tests project. 

Read how to use all installed features:

- [**Starter Kits**](how-to-use-starter-kits.md)
- [**Project Templates**](https://docs.bellatrix.solutions/web-automation/templates)
- [**Element Code Snippets**](https://docs.bellatrix.solutions/web-automation/elements-snippets/)
- [**Page Object Item Templates**](https://docs.bellatrix.solutions/web-automation/page-objects/)

Installation Steps Visual Studio Code
-------------------------------------

There are not snippets, item or project templates for Visual Studio Code. The way you create BELLATRIX project is through CLI.

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

Getting Started projects contain examples, demos and exercises. It is recommended to create such a project first and test the BELLATRIX tools and libraries. After that, you can use "Tests" templates which generate empty preconfigured BELLATRIX projects depending on the technology- Web, Desktop, API, MSTest, NUnit.

![Create Getting Started CLI](images/create-getting-started-console.png)

Testing on Remote Machines
--------------------------
To execute your tests on a remote machine or multiple machines you can use Automate the Planet open-source distributed test runner [**Meissa**](https://meissarunner.com).

You can download it from the site. To get started read [**Meissa Docs**](http://docs.meissarunner.com/).
