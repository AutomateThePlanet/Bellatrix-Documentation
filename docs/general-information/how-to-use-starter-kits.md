---
layout: default
title:  "How to Use Starter Kits?"
excerpt: "Learn what are the BELLATRIX starter kit and how to use them."
date:   2018-02-20 06:50:17 +0200
parent: general-information
permalink: /general-information/how-to-use-starter-kits/
anchors:
  create-starter-kit-from-visual-studio: Create Starter Kit from Visual Studio
  create-starter-kit-from-cli: Create Starter Kit from CLI
---
Overview
--------
The starter kits are one of the greatest features of BELLATRIX. For each module- web, API, desktop, mobile you have a project containing demos and explanations about each specific of the framework. Moreover, the starter kit contains exercises for you after each chapter. 

Create Starter Kit from Visual Studio
----------------------------------
You can use built-in Visual Studio templates to create BELLATRIX test projects.
From **File -> New -> Project** you can find all BELLATRIX projects too

![Create New Project Visual Studio](images/create-new-project-visual-studio.png)

![Create Getting Started Visual Studio](images/create-getting-started-solution-visual-studio.png)

Create Starter Kit from CLI
------------------------
Before you can create a new project, you need to install the template first.

**All available getting started templates:**

- Bellatrix.API.GettingStarted
- Bellatrix.Desktop.GettingStarted
- Bellatrix.Web.GettingStarted

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
![Create Getting Started CLI](images/create-getting-started-console.png)
