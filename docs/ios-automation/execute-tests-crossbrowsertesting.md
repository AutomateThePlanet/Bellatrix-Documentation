---
layout: default
title:  "Execute Tests in CrossBrowserTesting"
excerpt: "Learn to use BELLATRIX to execute iOS tests in CrossBrowserTesting."
date:   2021-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/execute-tests-crossbrowsertesting/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestFixture]
[IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
    "11.3",
    "iPhone 6",
    Lifecycle.RestartEveryTime,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
public class CrossBrowserTesting : IOSTest
{
    [Test]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.Components.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }

    [Test]
    [IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
        "11.3",
        "iPhone 6",
        Lifecycle.ReuseIfStarted,
        recordVideo: true,
        recordNetwork: true,
        build: "CI Execution")]
    public void ButtonClicked_When_CallClickMethodSecond()
    {
        var button = App.Components.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Explanations
------------
```csharp
[IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
    "11.3",
    "iPhone 6",
    Lifecycle.RestartEveryTime,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
```
To execute BELLATRIX tests in CrossBrowserTesting cloud, you should use the CrossBrowserTesting attribute instead of IOS. CrossBrowserTesting has the same parameters as IOS but adds to additional ones- deviceName, recordVideo, recordNetwork and build. The last three are optional and have default values. As with the IOS attribute you can override the class behaviour on Test level.
```csharp
[Test]
[IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
    "11.3",
    "iPhone 6",
    Lifecycle.ReuseIfStarted,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
public void ButtonClicked_When_CallClickMethodSecond()
{
    var button = App.Components.CreateByName<Button>("ComputeSumButton");

    button.Click();
}
```
As mentioned if you use the BrowserStack attribute on method level it overrides the class settings.

Configuration
-------------
If you don't use the attribute, the default information from the configuration will be used placed under the executionSettings section. Also, you can add additional driver arguments under the arguments section array in the configuration file.
```json
"executionSettings": {
  "defaultLifeCycle": "restart every time",
  "shouldStartLocalService": "false",
  "url": "http://127.0.0.1:4722/wd/hub",
  "arguments": [
    {
       "deviceName": "iPhone 6",
       "app": "com.apple.mobilecal",
        "name": "{runName}",
        "platform": "iOS",
        "browserName": "",
        "version": "",
        "record_video": "true",
        "record_network": "true",
        "screen_resolution": "1920x1080x24",
        "username": "yourUserName",
        "password": "accessKey"
    }
  ]
}
```
Check out the Azure Key Vault integration for information on safely storing secrets such as usernames and passwords. [**Learn more**](/product-integrations/azure-key-vault/)