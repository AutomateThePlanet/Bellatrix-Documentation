---
layout: default
title:  "Logging"
excerpt: "Learn how to use the BELLATRIX logging library."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/logging/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class LoggingTests : WebTest
{
    [TestMethod]
    public void AddCustomMessagesToLog()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = App.ElementCreateService.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();

        App.Logger.LogInformation("Before adding Falcon 9 rocket to cart.");

        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();
    }
}
```

Explanations
------------
By default, you can see the logs in the output window of each test. Also, a file called logs.txt is generated in the folder with the DLLs of your tests. If you execute your tests in CI with some CLI test runner the logs are printed there as well. **outputTemplate** - controls how the message is formatted. You can add additional info such as timestamp and much more. For more info visit- [**https://github.com/serilog/serilog/wiki/Formatting-Output**](https://github.com/serilog/serilog/wiki/Formatting-Output)
```csharp
App.Logger.LogInformation("Before adding Falcon 9 rocket to cart.");
```
Sometimes is useful to add information to the generated test log. To do it you can use the BELLATRIX built-in logger through accessing it via App service.

Generated Log, as you can see the above custom message is added to the log.

```
\#\#\#\# Start Chrome on PORT = 53153
Start Test
Class = LoggingTests Name = AddCustomMessagesToLog
Select 'Sort by price: low to high' from control (Name ending with orderby)
Hover control (InnerText containing Read more)
Before adding Falcon 9 rocket to cart.
Focus control (data-product_id = 28)
Click control (data-product_id = 28)
Click control (Class = added_to_cart wc-forward)
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