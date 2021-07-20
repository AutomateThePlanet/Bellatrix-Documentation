---
layout: default
title:  "System Requirements"
excerpt: "What do you need to install and run all BELLATRIX libraries and tools?"
date:   2021-02-20 06:50:17 +0200
parent: general-information
permalink: /general-information/system-requirements/
anchors:
  overview: Overview
  space-requirements: Space Requirements
  supported-code-editors: Supported Code Editors
  sdks-and-frameworks-prerequisites: SDKs and Frameworks Prerequisites
---
Overview
--------
BELLATRIX is not a single thing it contains multiple framework libraries, extensions and tools. The tool is built to be cross-platform, however some of the features can be used under Windows since they are written for Visual Studio.

Space Requirements
------------------
You need **~240 MB of free space** (full installation on Windows)

**Note**: The space can vary based on which OS you install BELLATRIX. Also, the installer installs templates for each installed version of Visual Studio which can increase the space requirements.

Supported Code Editors
----------------------
The recommended code editor for writing BELLATRIX tests is Visual Studio 2019 or higher (preferably installed on Windows).

NOTE: After the support for .NET Framework 5.0 and higher, Microsoft officially not support .NET Core development in older versions of Visual Studio 2015, 2017 and so on.

### Other Supported Editors: ###
- Visual Studio Code
- Visual Studio for Mac
- Rider: Cross-platform .NET IDE

SDKs and Frameworks Prerequisites
-------------------------------- 
[**.NET Core SDK 5**](https://www.microsoft.com/net/download/windows) or higher (usually comes with Visual Studio installation or updates)

For BELLATRIX desktop modules you need to download [**WinAppDriver**](https://github.com/Microsoft/WinAppDriver/releases). You need to make sure it is started before running any BELLATRIX desktop tests.

For BELLATRIX mobile modules you need to download and install [**Appium**](http://appium.io/). You need to make sure it is started before running any BELLATRIX mobile tests.