---
layout: default
title:  "Execute Tests in SauceLabs"
excerpt: "Learn to use BELLATRIX to execute iOS tests in SauceLabs."
date:   2021-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/execute-tests-saucelabs/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[IOSSauceLabs("sauce-storage:TestApp.app.zip",
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
public class SauceLabsTests : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.Components.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }

    [TestMethod]
    [IOSSauceLabs("sauce-storage:TestApp.app.zip",
        Constants.IOSDefaultVersion,
        Constants.IOSDefaultDeviceName,
        Lifecycle.ReuseIfStarted)]
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
[IOSSauceLabs("sauce-storage:TestApp.app.zip",
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
```
To execute BELLATRIX tests in SauceLabs cloud you should use the IOSSauceLabs attribute instead of IOS. SauceLabs has the same parameters as IOS but adds to additional ones- device name, recordVideo and recordScreenshots. As with the IOS attribute you can override the class behavior on Test level.
```csharp
[TestMethod]
[IOSSauceLabs("sauce-storage:TestApp.app.zip",
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.ReuseIfStarted)]
public void ButtonClicked_When_CallClickMethodSecond()
{
    var button = App.Components.CreateByName<Button>("ComputeSumButton");

    button.Click();
}
```
As mentioned if you use the SauceLabs attribute on method level it overrides the class settings.

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
       "version": "11.3",
       "recordVideo": "true",
       "recordScreenshots": "true",
       "screenResolution": "1920x1080x24",
       "username": "yourUserName",
       "accessKey": "accessKey"
    }
  ]
}
```
Check out the Azure Key Vault integration for information on safely storing secrets such as usernames and passwords. [**Learn more**](/product-integrations/azure-key-vault/)