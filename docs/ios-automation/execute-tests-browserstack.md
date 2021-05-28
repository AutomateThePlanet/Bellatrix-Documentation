---
layout: default
title:  "Execute Tests in BrowserStack"
excerpt: "Learn to use BELLATRIX to execute iOS tests in BrowserStack."
date:   2021-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/execute-tests-browserstack/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[IOSBrowserStack("pngG38y26LZ5muB1p46P",
    "11.3",
    "iPhone 6",
    Lifecycle.RestartEveryTime,
    captureVideo: true,
    captureNetworkLogs: true,
    consoleLogType: BrowserStackConsoleLogType.Disable,
    debug: false,
    build: "CI Execution")]
public class BrowserStackTests : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.Components.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }

    [TestMethod]
    [IOSBrowserStack("pngG38y26LZ5muB1p46P",
        "11.3",
        "iPhone 6",
        Lifecycle.RestartOnFail,
        captureVideo: true,
        captureNetworkLogs: true,
        consoleLogType: BrowserStackConsoleLogType.Disable,
        debug: false,
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
[IOSBrowserStack("pngG38y26LZ5muB1p46P",
    "11.3",
    "iPhone 6",
    Lifecycle.RestartEveryTime,
    captureVideo: true,
    captureNetworkLogs: true,
    consoleLogType: BrowserStackConsoleLogType.Disable,
    debug: false,
    build: "CI Execution")]
```
To execute BELLATRIX tests in BrowserStack cloud, you should use the BrowserStack attribute instead of IOS. BrowserStack has the same parameters as IOS but adds to additional ones- device name, captureVideo, captureNetworkLogs, consoleLogType, build and debug. The last five are optional and have default values. As with the IOS attribute you can override the class behaviour on Test level.
```csharp
[TestMethod]
[IOSBrowserStack("pngG38y26LZ5muB1p46P",
    "11.3",
    "iPhone 6",
    Lifecycle.RestartOnFail,
    captureVideo: true,
    captureNetworkLogs: true,
    consoleLogType: BrowserStackConsoleLogType.Disable,
    debug: false,
    build: "CI Execution")]
public void ButtonClicked_When_CallClickMethodSecond()
{
    var button = App.Components.CreateByName<Button>("ComputeSumButton");

    button.Click();
}
```
As mentioned if you use the **BrowserStack** attribute on method level it overrides the class settings.

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
       "os": "Windows",
       "os_version": "11.3",
       "browser": "",
       "browser_version": "",
       "browserstack.debug": "true",
       "browserstack.video": "true",
       "browserstack.networkLogs": "true",
       "browserstack.console": "true",
       "browserstack.user": "yourUserName",
       "browserstack.key": "accessKey"
    }
  ]
}
```
Check out the Azure Key Vault integration for information on safely storing secrets such as usernames and passwords. [**Learn more**](/product-integrations/azure-key-vault/)