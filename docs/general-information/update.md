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
Instead of downloading BELLATRIX as a zip file clone the repository and when there is an update you can merge it.

Using New Features
--------------------------
Sometimes the simple update of all NuGet packages might not be enough. Some features require specific settings to be present in the **testFrameworkSettings.json** file. Read the documentation about the feature you want to start to use. Add the necessary configuration to your settings files. Also, you may need to add a "use" line in the **TestInitialize.cs** file, which will be again explained in the documentation.

In case you need additional help, you can use our Standard Support, Professional Services add-ons. Otherwise, you can open a new forum thread.
