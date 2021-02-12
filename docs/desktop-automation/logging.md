---
layout: default
title:  "Logging"
excerpt: "Learn how to use the BELLATRIX logging library."
date:   2018-06-23 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/logging/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class LoggingTests : DesktopTest
{
    [TestMethod]
    public void CommonActionsWithDesktopControls_Wpf()
    {
        var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");

        calendar.ValidateIsNotDisabled();

        var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");
        
        Logger.LogInformation("$$$ Before checking the transfer checkbox. $$$");

        checkBox.Check();

        checkBox.ValidateIsChecked();

        var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("select");

        comboBox.SelectByText("Item2");

        Assert.AreEqual("Item2", comboBox.InnerText);

        var label = App.ElementCreateService.CreateByName<Label>("Result Label");

        label.ValidateIsVisible();

        var radioButton = App.ElementCreateService.CreateByName<RadioButton>("RadioButton");

        radioButton.Click();

        radioButton.ValidateIsChecked(timeout: 30, sleepInterval: 2);
    }
}
```

Explanations
------------
By default, you can see the logs in the output window of each test. Also, a file called logs.txt is generated in the folder with the DLLs of your tests. If you execute your tests in CI with some CLI test runner the logs are printed there as well. **outputTemplate** - controls how the message is formatted. You can add additional info such as timestamp and much more. For more info visit- [https://github.com/serilog/serilog/wiki/Formatting-Output](https://github.com/serilog/serilog/wiki/Formatting-Output)
```csharp
Logger.LogInformation("$$$ Before checking the transfer checkbox. $$$");
```
Sometimes is useful to add information to the generated test log. To do it you can use the BELLATRIX built-in logger through accessing it via static **Logger** class.

Generated Log, as you can see the above custom message is added to the log.

```
Start Test
Class = EnsureAssertionsTests Name = CommonActionsWithDesktopControls_Wpf
Ensure control (AutomationId = calendar) is NOT disabled
$$$ Before checking the transfer checkbox. $$$
Check control (Name = BellaCheckBox) on WPF Sample App
Ensure control (Name = BellaCheckBox) is checked
Select 'Item2' from control (AutomationId = select) on WPF Sample App
Click control (Name = RadioButton) on WPF Sample App
Ensure control (Name = RadioButton) is checked
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