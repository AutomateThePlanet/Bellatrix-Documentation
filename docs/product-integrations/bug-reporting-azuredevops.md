---
layout: default
title:  "Bug Reporting Azure DevOps"
excerpt: "Learn to create automatically bugs in Azure DevOps on test failure."
date:   2020-04-30 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/bug-reporting-azuredevops/
anchors:
  what-is-automatic-bug-reporting: What Is Automatic Bug Reporting?
  configuration: Configuration
---
What Is Automatic Bug Reporting?
-------
The automatic bug reporting is a BELLATRIX feature that will create a bug automatically in various bug tracking software if some of your tests fail. The plugin will populate the description, attach a screenshot, video of the test. Moreover, it will generate human-readable steps to reproduce.

![Bellatrix](images/bug-reporting-azuredevops.png)

![Bellatrix](images/bug-reporting-azuredevops-screenshots.png)

Configuration
-------------
When you turn on the feature and will assign listeners to common actions in the framework that will populate the auto-generated test case's steps and expected results.
In the **testFrameworkSettings.json** file you need to enable the integration.
```
"bugReportingSettings": {
    "isEnabled": "false" 
},
"azureDevOpsBugReportingSettings": {
  "isEnabled": "true",
  "url": "https://dev.azure.com/yourCompanyName",
  "token": "autheticationToken",
  "organizationName": "yourOrganizationname",
  "projectName": "yourProjectName",
  "defaultPriority": "2",
  "defaultSeverity": "2 - High"
},
```
You can read the [the following article](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page "following article") how to generate an authentication token.

**NOTE**: Be sure to enable this feature only in Release and for test projects that contain stable tests because otherwise, it can create a lot of bugs based on your flaky tests.