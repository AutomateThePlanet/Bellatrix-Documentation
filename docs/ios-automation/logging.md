---
layout: default
title:  "Logging"
excerpt: "Learn how to use the BELLATRIX logging library."
date:   2018-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/logging/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
public class LoggingTests : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        Logger.LogInformation("$$$ Before clicking the button $$$");
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Explanations
------------
By default, you can see the logs in the output window of each test. Also, a file called logs.txt is generated in the folder with the DLLs of your tests. If you execute your tests in CI with some CLI test runner the logs are printed there as well. **outputTemplate** - controls how the message is formatted. You can add additional info such as timestamp and much more. For more info visit- [https://github.com/serilog/serilog/wiki/Formatting-Output](https://github.com/serilog/serilog/wiki/Formatting-Output)
```csharp
Logger.LogInformation("$$$ Before clicking the button $$$");
```
Sometimes is useful to add information to the generated test log. To do it you can use the BELLATRIX built-in logger through accessing it via **Logger** static class.

Generated Log, as you can see the above custom message is added to the log.

```
Start Test
Class = LoggingTests Name = ButtonClicked_When_CallClickMethod
$$$ Before clicking the button $$$
Click control(Name = ComputeSumButton)
```

Configuration
-------------
```json
"logging": {
    "isEnabled": "true",
    "isConsoleLoggingEnabled": "true",
    "isDebugLoggingEnabled": "true",
    "isEventLoggingEnabled": "false",
    "isFileLoggingEnabled": "true",
    "outputTemplate":  "{Message:lj}{NewLine}",
    "addUrlToBddLogging": "false"
}
```
In the **testFrameworkSettings.json** file find a section called **logging**, responsible for controlling the logs generation. You can disable the logs entirely. There are different places where the logs are populated.