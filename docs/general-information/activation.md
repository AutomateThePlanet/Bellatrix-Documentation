---
layout: default
title:  "Activation"
excerpt: "Learn how to activate BELLATRIX products."
date:   2018-06-23 06:50:17 +0200
parent: general-information
permalink: /general-information/activation/
anchors:
  overview: Overview
  how-to-activate-bellatrix: How to Activate BELLATRIX?
  deactivate: Deactivate
  display-installed-license-information: Display Installed License Information
---
Overview
--------
**You can use full features of BELLATRIX for free for unlimited period of time**. However, **you can execute up to 100 tests** on single machine without a commercial license. As long as your license is valid you can execute unlimited number of tests and for most versions get priority support.

How to Activate BELLATRIX?
--------------------------
One you have completed your purchase you will receive a number of keys. You need a unique key for each machine where you will use BELLATRIX frameworks and tools. 
Before you can activate the product you need to install the latest version of BELLATRIX Tools.

1. Create a new empty folder
2. Open CMD
3. Install BELLATRIX Tools with the bellow two commands depending on the OS

**Windows**
```
dotnet new -i Bellatrix.Tools.Windows
dotnet new Bellatrix.Tools.Windows
```
**MacOS**
```
dotnet new -i Bellatrix.Tools.Mac64
dotnet new Bellatrix.Tools.Mac64
```
**Linux**
```
dotnet new -i Bellatrix.Tools.Linux64
dotnet new Bellatrix.Tools.Linux64
```

This is how you activate the product.
```
bellatrix activateLicense --email=bellatrixTest@yahoo.com --licenseKey=2v99d5bb-f0bd-64a3-bg26-1b12517cc05c
```

**Note**: All license keys are floating. This means you can activate and deactivate them on different machines as many times as you want till they are active.

Deactivate
---------- 
This is how you deactivate the product.
```
bellatrix deactivateLicense
```
This is sometimes useful if you want to deactivate a license on a remote machine.

Display Installed License Information
---------- 
View information about currently installed license.
```
bellatrix statusLicense
```