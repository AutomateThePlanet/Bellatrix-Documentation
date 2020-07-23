---
layout: default
title:  "Software Machine Automation"
excerpt: "Learn how to create a software management automation library, allowing you to install/upgrade desired software such as browsers, extensions through code."
date:   2019-12-19 06:50:17 +0200
parent: general-information
permalink: /general-information/software-machine-automation/
anchors:
  overview: Overview
  usage-in-bellatrix: Usage in BELLATRIX
---
Overview
--------
Traditional tools are not built for modern automation and a DevOps approach, which can make achieving consistency and gaining insights across your environment difficult. There are a lot of different installer formats and multiple approaches to deploying software. Deploying software without package management can be complicated and time-consuming. Software management automation simplifies this through a simple, repeatable, and automated approach, by using a universal packaging format for managing all software. It doesn't matter if you are using native installers, zips, scripts, binaries, or in-house developed applications and tools.

One for the best software management automation package managers for Windows is [Chocolatey](https://chocolatey.org/). 

Chocolatey has the largest online registry of Windows packages. Chocolatey packages encapsulate everything required to manage a particular piece of software into one deployment artifact by wrapping installers, executables, zips, and/or scripts into a compiled package file. Chocolatey aims to automate the entire software lifecycle from install through upgrade and removal on Windows operating systems. 

Package submissions go through a rigorous moderation review process, including automatic virus scanning. The community repository has a strict policy on malicious and pirated software. [Read more](https://chocolatey.org/docs/moderation).

Usage in BELLATRIX
----------------------
You can configure it from BELLATRIX configuration file **testFrameworkSettings.json**
```json
"machineAutomationSettings": {
	"isEnabled": "true",
	"packagesToBeInstalled": [ "googlechrome", "firefox --version=65.0.2", "https-everywhere-firefox" ]
}
```
You need to specify the packages to be installed in the **packagesToBeInstalled** array. You can search for packages in the public **[community repository](https://chocolatey.org/)**.

In the example, Firefox version 65 will be installed together with the latest version of Chrome, and to the Firefox, the Https Everywhere extension will be added.

To use the machine automation setup- add a call to the BELLATRIX **SoftwareAutomationService** in the **TestInitialize.cs** at the end of the **AssemblyInitialize** method.

```csharp
[AssemblyInitialize]
public static void AssemblyInitialize(TestContext testContext)
{
    UnityInitializationService.Initialize();
    var app = new App(ServiceContainer.CurrentProvider);

    app.UseExceptionLogger();
    app.UseMsTestSettings();
    app.UseControlDataHandlers();
    app.UseBrowserBehavior();
    app.UseLogExecutionBehavior();
    app.UseControlLocalOverridesCleanBehavior();
    app.UseFFmpegVideoRecorder();
    app.UseFullPageScreenshotsOnFail();
    app.UseLogger();
    app.UseElementsBddLogging();
    app.UseHighlightElements();
    app.UseEnsureExtensionsBddLogging();
    app.UseLayoutAssertionExtensionsBddLogging();
    app.UseLoadTesting();
    app.Initialize();

    SoftwareAutomationService.InstallRequiredSoftware();
}
```

**To use the service, you need to start Visual Studio in Administrative Mode. The service supports currently only Windows!**

*In the future BELLATRIX releases we will support OSX and Linux as well.*