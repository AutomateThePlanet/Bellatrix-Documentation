---
layout: default
title:  "Control Browser"
excerpt: "Learn how to control browsers with BELLATRIX web module."
date:   2021-02-12 06:50:17 +0200
parent: web-automation
permalink: /web-automation/control-browser/
anchors:
  overview: Overview
  explanations: Explanations
  drivers-browsers-processes-cleanup: Drivers Browsers Processes Cleanup
  configuration: Configuration
---
Overview
--------

This is how one BELLATRIX test class looks like.
```csharp
[TestFixture]
[Browser(BrowserType.Firefox, Lifecycle.ReuseIfStarted)]
public class BellatrixBrowserLifecycleTests : WebTest
{
    [Test]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.Components.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [Test]
    [Browser(BrowserType.Chrome, Lifecycle.RestartOnFail)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var blogLink = App.Components.CreateByLinkText<Anchor>("Blog");

        blogLink.Click();
    }
}
```

Explanations
------------
```csharp
[TestFixture]
```
This is the main attribute that you need to mark each class that contains MSTest tests.
```csharp
[Browser(BrowserType.Firefox, Lifecycle.ReuseIfStarted)]
```
This is the attribute for automatic start/control of WebDriver browsers by BELLATRIX. If you have to do it manually properly, you will need thousands of lines of code. 
**BrowserType** controls which browser is used. Available options are:
- Chrome
- Firefox
- Edge
- Chrome in headless mode
- Firefox in headless mode.

**Note**: *Headless mode = executed in the browser but the browser's UI is not rendered, in theory, should be faster. In practice the time gain is little.*

**Lifecycle** enum controls when the browser is started and stopped. This can drastically increase or decrease the tests execution time, depending on your needs. However you need to be careful because in case of tests failures the browser may need to be restarted.
Available options:
- **RestartEveryTime**- for each test a separate WebDriver instance is created and the previous browser is closed. The new browser comes with new cookies and cache.
- **RestartOnFail**- the browser is only restarted if the previous test failed. Alternatively, if the previous test's browser was different.
- **ReuseIfStarted**- the browser is only restarted if the previous test's browser was different. In all other cases, the browser is reused if possible.

**Note**: *However, use this option with caution since in some rare cases if you have not properly setup your tests you may need to restart the browser if the test fails otherwise all other tests may fail too.*

```csharp
public class BellatrixBrowserLifecycleTests : WebTest
```
All web BELLATRIX test classes should inherit from the WebTest base class. This way you can use all built-in BELLATRIX tools and functionalities.
```csharp
[Browser(BrowserType.Firefox, Lifecycle.ReuseIfStarted)]
public class BellatrixBrowserLifecycleTests : WebTest
```
If you place attribute over the class all tests inherit the Lifecycle. It is possible to place it over each test and this way it overrides the class Lifecycle only for this particular test.
```csharp
[Test]
public void PromotionsPageOpened_When_PromotionsButtonClicked()
```
All MSTest tests should be marked with the **TestMethod** attribute.
```csharp
App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
```
There is more about the App class in the next sections.However, it is the primary point where you access the BELLATRIX services. It comes from the **WebTest** class as a property.Here we use the BELLATRIX navigation service to navigate to the demo page.
```csharp
var promotionsLink = App.Components.CreateByLinkText<Anchor>("Promotions");
```
Use the element creation service to create an instance of the anchor. There are much more details about this process in the next sections.
```csharp
[Test]
[Browser(BrowserType.Chrome, Lifecycle.RestartOnFail)]
public void BlogPageOpened_When_PromotionsButtonClicked()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.Components.CreateByLinkText<Anchor>("Blog");

    blogLink.Click();
}
```
As mentioned above you can override the browser Lifecycle for a particular test. The global Lifecycle for all tests in the class is to reuse an instance of Edge browser. Only for this particular test, BELLATRIX opens Chrome and restarts it only on fail.

Drivers Browsers Processes Cleanup
------------
By default BELLATRIX includes internal module for handling residual browsers and drivers that for some reason wasn't closed or killed. You can call the service to handle other processes too. Just call the static class **ProcessCleanupService**.
It is a bit tricky to handle such processes when the parallel execution is enabled. We use a different logic in this case. You need to let BELLATRIX know if you will execute the tests in parallel. You need to set the isParallelExecutionEnabled to true in the testFrameworkSettings.json configuration file.
```
"processCleanupSettings": {
  "isParallelExecutionEnabled": "false"
},
```

Configuration
------------
If you don't use the attribute, the default information from the configuration will be used placed under the executionSettings section. Also, you can add additional driver arguments under the arguments section array in the configuration file.
```json
"executionSettings": {
  "executionType": "regular",
  "defaultBrowser": "chrome",
  "defaultLifeCycle": "restart every time",
  "resolution": "1920x1080",
  "browserVersion": "91",
  "url": "http://127.0.0.1:4444/wd/hub",
  "arguments": [
    {
      "name": "{runName}"
    }
  ]
}
```
