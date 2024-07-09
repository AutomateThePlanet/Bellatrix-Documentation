---
layout: default
title:  "Jira Zephyr"
excerpt: "Learn how to integrate BELLATRIX tests with Jira Zephyr Plugin."
date:   2024-07-04 16:40:00 +0200
parent: product-integrations
permalink: /product-integrations/jira-zephyr/
anchors:
  what-is-jira-zephyr: What Is Jira Zephyr?
  usage: Usage
  config: Config
---
What Is Jira Zephyr?
------------------
The **[Jira Zephyr](https://smartbear.com/test-management/zephyr-squad/)** plugin is an add-on for Jira that enhances its capabilities for test management. Zephyr, integrated within Jira, provides tools for creating, managing, and executing test cases directly within the Jira environment.

Usage
------------------
When we have BELLATRIX tests which correspond to zephyr test cases inside jira and we want to automatically create test cycles when the tests are executed, the jira-zephyr plugin of BELLATRIX proves handy.

To use this plugin, we first need to import it to our test project. After that, we must register it.

```csharp
public override void TestInit()
{
    App.AddPlugin<AssociatedTestCaseExtension>();
}
```

We can annotate the test class with the ```ZephyrProjectIdAttribute```.

```csharp
[ZephyrProjectId("BELLATRIX")]
public class JiraZephyrTests 
{
  // code
}
```

Then, we simply annotate our tests with their respective test case ids with ```ZephyrTestCaseAttribute```.

```csharp
[ZephyrTestCase("B-12")]
[TestMethod]
public void TestingJiraZephyrIntegration()
{
  // code
}
```

One can customize the plugin through the config.

Config
------------------
The settings section in the config file must look like this:
```JSON
"zephyrSettings": {
  "isEnabled": "true",
  "apiUrl": "insert/the/url/of/the/api",
  "token": "insert the token generated from jira zephyr",
  "defaultProjectKey": "insert the default project's key to be used, if not defined in the test class or test case",
  "isExistingCycle": "insert false to generate new test cycle, insert true and provide in the test class or test case the id of the existing test cycle",
  "testCycleName": "insert the name of the test cycle to be created",
  "cycleFinalStatus": "insert the final status of the cycle"
}
```

Mandatory settings are the ```isEnabled```, ```apiUrl```, and ```token```. If you define ```isExistingCycle``` as true, ```testCycleName``` may be omitted.