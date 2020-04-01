---
layout: default
title:  "Update"
excerpt: "Learn how to update BELLATRIX tools."
date:   2020-04-01 06:50:17 +0200
parent: general-information
permalink: /general-information/update/
anchors:
  overview: Overview
  simple-update-steps: Simple Update Steps
  using-new-features: Using New Features
---
Overview
--------
Every few months, we release new versions of our BELLATRIX libraries and tooling. With every major release, we bring many bug fixes, enhancements, and new features. Here you will find detailed steps how you can keep your BELLATRIX projects up to date.

Simple Update Steps
------------------
The simplest way to update BELLATRIX libraries is to open the NuGet update window in Visual Studio.

1. Open '**Manage NuGet Packages**' window

![Manage NuGet Packages](images/open-manage-nuget-packages.png)

2. Open the Update tab. Choose the BELLATRIX packages and click **Update**.

![Update NuGets](images/update-tab-manage-nugets.png)


Using New Features
--------------------------
Sometimes the simple update of all NuGet packages might not be enough. Some features require specific settings to be present in the **testFrameworkSettings.json** file. Read the documentation about the feature you want to start to use. Add the necessary configuration to your settings files. Also, you may need to add a "use" line in the **TestInitialize.cs** file, which will be again explained in the documentation. 
You can always reinstall all templates from the latest installers and find the correct configuration there.

In case you need additional help, you can use your priority support if you have a Business or Enterprise license. Otherwise, you can open a new forum thread.
