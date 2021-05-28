---
layout: default
title:  "Logging"
excerpt: "Learn how to use the BELLATRIX logging library."
date:   2021-10-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/logging/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    Lifecycle.ReuseIfStarted)]
public class LoggingTests : AndroidTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        Logger.LogInformation("$$$ Before clicking the button $$$");
        var button = App.Components.CreateByIdContaining<Button>("button");

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
Click control(ID = button)
```