---
layout: default
title:  "Control Browser"
excerpt: "Learn how to control browsers with BELLATRIX web module."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/control-browser/
anchors:
  overview: Overview
  explanations: Explanations
---
Overview
--------

This is how one BELLATRIX test class looks like.
```csharp
[TestClass]
[Browser(BrowserType.Firefox, BrowserBehavior.ReuseIfStarted)]
public class BellatrixBrowserBehaviourTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [TestMethod]
    [Browser(BrowserType.Chrome, BrowserBehavior.RestartOnFail)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

        blogLink.Click();
    }
}
```

Explanations
------------
```csharp
[TestClass]
```
This is the main attribute that you need to mark each class that contains MSTest tests.
```csharp
[Browser(BrowserType.Firefox, BrowserBehavior.ReuseIfStarted)]
```
This is the attribute for automatic start/control of WebDriver browsers by BELLATRIX. If you have to do it manually properly, you will need thousands of lines of code. 
**BrowserType** controls which browser is used. Available options are:
- Chrome
- Firefox
- Edge
- InternetExplorer
- Opera
- Chrome in headless mode
- Firefox in headless mode.

**Note**: *Headless mode = executed in the browser but the browser's UI is not rendered, in theory, should be faster. In practice the time gain is little.*

**BrowserBehavior** enum controls when the browser is started and stopped. This can drastically increase or decrease the tests execution time, depending on your needs. However you need to be careful because in case of tests failures the browser may need to be restarted.
Available options:
- **RestartEveryTime**- for each test a separate WebDriver instance is created and the previous browser is closed. The new browser comes with new cookies and cache.
- **RestartOnFail**- the browser is only restarted if the previous test failed. Alternatively, if the previous test's browser was different.
- **ReuseIfStarted**- the browser is only restarted if the previous test's browser was different. In all other cases, the browser is reused if possible.

**Note**: *However, use this option with caution since in some rare cases if you have not properly setup your tests you may need to restart the browser if the test fails otherwise all other tests may fail too.*

```csharp
public class BellatrixBrowserBehaviourTests : WebTest
```
All web BELLATRIX test classes should inherit from the WebTest base class. This way you can use all built-in BELLATRIX tools and functionalities.
```csharp
[Browser(BrowserType.Firefox, BrowserBehavior.ReuseIfStarted)]
public class BellatrixBrowserBehaviourTests : WebTest
```
If you place attribute over the class all tests inherit the behaviour. It is possible to place it over each test and this way it overrides the class behaviour only for this particular test.
```csharp
[TestMethod]
public void PromotionsPageOpened_When_PromotionsButtonClicked()
```
All MSTest tests should be marked with the TestMethod attribute.
```csharp
App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
```
There is more about the App class in the next sections.However, it is the primary point where you access the BELLATRIX services. It comes from the WebTest class as a property.Here we use the BELLATRIX navigation service to navigate to the demo page.
```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
```
Use the element creation service to create an instance of the anchor. There are much more details about this process in the next sections.
```csharp
[TestMethod]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartOnFail)]
public void BlogPageOpened_When_PromotionsButtonClicked()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

    blogLink.Click();
}
```
As mentioned above you can override the browser behaviour for a particular test. The global behaviour for all tests in the class is to reuse an instance of Edge browser. Only for this particular test, BELLATRIX opens Chrome and restarts it only on fail.

