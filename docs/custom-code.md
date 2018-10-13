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
IWebDriver driver = new ChromeDriver(); 
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
```

Another option is to use the global timeout and occasionally add hard-coded pauses in your tests where needed.
```csharp
Thread.Sleep(2000);
```

To battle this problem, Bellatrix offers an automatic way of handling the browser lifecycle across multiple tests. You need to set this behavior in the Browser attribute placed over each test class.
```csharp
[Browser(BrowserType.Firefox, BrowserBehavior.ReuseIfStarted)]
public class BellatrixBrowserBehaviourTests : WebTest
```

You just need to set the ChromeHeadless or FirefoxHeadless for browser type in the Browser attribute. It controls the browser lifecycle when is started or closed. It is placed on each test class.
```csharp
[Browser(BrowserType.FirefoxHeadless, BrowserBehavior.ReuseIfStarted)]
```