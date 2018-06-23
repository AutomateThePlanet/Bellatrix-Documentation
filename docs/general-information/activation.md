---
layout: default
title:  "Activation"
excerpt: "Learn how to activate Bellatrix products."
date:   2018-06-23 06:50:17 +0200
parent: /general-information
permalink: /activation/
anchors:
  overview: Overview
  how-to-activate-bellatrix: How to Activate Bellatrix?
  deactivate: Deactivate
  display-installed-license-information: Display Installed License Information
---
Overview
--------
**You can use full features of Bellatrix for free for unlimited period of time**. However, **you can execute up to 100 tests** on single machine without a commercial license. As long as your license is valid you can execute unlimited number of tests and for most versions get priority support.

How to Activate Bellatrix?
--------------------------
One you have completed your purchase you will receive a number of keys. You need a unique key for each machine where you will use Bellatrix frameworks and tools. Before you can activate the product you need to install or at least download Bellatrix installer from [https://bellatrix.solutions](https://bellatrix.solutions)
If you have installed the product on Windows you can directly access the installer from CMD with the keyword- **bellatrix**. For all other cases you need to first navigate from CMD to the folder of the installer.

```
bellatrix activateLicense --email=bellatrixTest@yahoo.com --licenseKey=2v99d5bb-f0bd-64a3-bg26-1b12517cc05c
```
This is how you activate the product if your OS is Windows 10 and have installed Bellatrix.
```
C:\Users\youUserName\Documents\bellatrix-installer-win-x64\bellatrix.exe activateLicense --email=bellatrixTest@yahoo.com --licenseKey=2v99d5bb-f0bd-64a3-bg26-1b12517cc05c
```
This is the command if Bellatrix is not installed. This is sometimes useful if you want to activate a license on a remote machine.

**Note**: All license keys are floating. This means you can activate and deactivate them on different machines as many times as you want till they are active.

Deactivate
---------- 
```
bellatrix deactivateLicense
```
This is how you deactivate the product if your OS is Windows 10 and have installed Bellatrix.
```
C:\Users\youUserName\Documents\bellatrix-installer-win-x64\bellatrix.exe deactivateLicense
```
This is the command if Bellatrix is not installed. This is sometimes useful if you want to deactivate a license on a remote machine.

Display Installed License Information
---------- 
```
bellatrix statusLicense
```
This is how you view information about your currently installed license if your OS is Windows 10 and have installed Bellatrix.
```
C:\Users\youUserName\Documents\bellatrix-installer-win-x64\bellatrix.exe statusLicense
```
This is the command if Bellatrix is not installed.