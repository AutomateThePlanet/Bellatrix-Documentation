---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


If you use global timeouts such as WebDriver implicit wait.

```csharp
IWebDriver driver = new WindowsDriver<WindowsElement>(new Uri("http://127.0.0.1:4723"));
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
```

If you use global timeouts such as WebDriver implicit wait.

```csharp
Thread.Sleep(2000);
```

Optimized App Lifecycle Control
```csharp
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
public class ControlAppTests : DesktopTest
```