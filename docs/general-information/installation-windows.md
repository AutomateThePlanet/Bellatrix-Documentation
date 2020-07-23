---
layout: default
title:  "Installation Windows"
excerpt: "Learn how to install BELLATRIX tools on Windows OS."
date:   2020-04-01 06:50:17 +0200
parent: general-information
permalink: /general-information/installation-windows/
anchors:
  overview: Overview
  simple-installation: Simple Installation
  installation-steps-visual-studio-integration: Installation Steps Visual Studio Integration
---
Overview
--------
BELLATRIX is not a single thing it contains multiple framework libraries, extensions and tools. The tool is built to be cross-platform, however some of the features can be used under Windows since they are written for Visual Studio.

> Before proceeding with the installation, please read the [**system requirements**](system-requirements.md) system requirements and **install all prerequisites**!

Simple Installation
------------------
1.1. Download the BELLATRIX projects zip file from the email you received after the downloading step.
1.2. Unzip it. The projects are grouped by technology: web, desktop, mobile, API, load testing

![Unzip Step](images/unzip-bellatrix-templates.png)

![Grouping By Technology](images/projects-grouping-by-technology.png)

1.3. Open the project based on the test framework you prefer: MSTest or NUnit.

![Grouping By Test Framework](images/projects-templates-grouping-by-test-framework.png)

1.4. Click on the csproj file.

![Open csproj](images/open-csproj.png)

1.5. Run the sample tests.
1.6. You can try to write a simple test yourself.
1.7. For an in-depth revision of all framework features you can open the getting started projects.

- [**Starter Kits**](how-to-use-starter-kits.md)

Installation Steps Visual Studio Integration
------------------
1. Download BELLATRIX UI Installer [**x86 version**](installers/Bellatrix.Installer.UI-1.9.7.0-x86.msi) or [**x64 version**](installers/Bellatrix.Installer.UI-1.9.7.0-x64.msi)
2. Run **Bellatrix.Installer.UI.msi**

![BELLATRIX UI Installer](images/bellatrix-ui-installer.png)

2.1. Click Next

2.2. Accept End-User License Agreement and click Next.

![BELLATRIX UI Installer](images/ui-intaller-step2.png)

2.3. Select BELLATRIX modules you would like to install and proceed with.

![BELLATRIX UI Installer](images/ui-intaller-step3.png)

2.4. Click **Install** and agree to run the installer with Administrative permissions.

![BELLATRIX UI Installer](images/ui-intaller-step4.png)

2.5. Wait for the installation to finish.

![BELLATRIX UI Installer](images/ui-intaller-step5.png)

After you install the product, you need to open one of the starter kit projects to see how to use all features. 

Read how to use all installed features:

- [**Starter Kits**](how-to-use-starter-kits.md)
- [**Project Templates**](https://docs.bellatrix.solutions/web-automation/templates)
- [**Element Code Snippets**](https://docs.bellatrix.solutions/web-automation/elements-snippets/)
- [**Page Object Item Templates**](https://docs.bellatrix.solutions/web-automation/page-objects/)
