---
layout: default
title:  "Navigate to Pages"
excerpt: "Learn how to navigate to web pages with BELLATRIX web module."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/navigate-to-pages/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class NavigateToPagesTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();

        App.BrowserService.WaitUntilReady();
    }
}
```

Explanations
------------

```csharp
App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
```
You can always navigate in each separate tests, but if all of them go to the same page, you can use the above techniques for code reuse.
```csharp
App.BrowserService.WaitUntilReady();
```
Sometimes, some AJAX async calls are not caught natively by WebDriver. So you can use the BELLATRIX browser service's method. **WaitUntilReady** which waits for these calls automatically to finish. Keep in mind that usually this is not necessary since BELLATRIX has a complex built-in mechanism for handling element waits.

Depending on the types of tests you want to write there are a couple of ways to navigate to specific pages.
In later chapters, there are more details about the different test workflow hooks. Find here two of them.
```csharp
public override void TestsAct() => App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
```
If you reuse your browser and want to navigate once to a specific page. You can use the **TestsAct** method.
It executes once for all tests in the class.
```csharp
public override void TestInit() => App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
```
If you need each test to navigate each time to the same page, you can use the TestInit method.
```csharp
App.NavigationService.WaitForPartialUrl("/blog/");
```
Sometimes before proceeding with searching and making actions on the next page, we need to wait for something.
It is useful in some cases to wait for a partial URL instead hard-coding the whole URL since it can change depending on the environment. Keep in mind that usually this is not necessary since BELLATRIX has a complex built-in mechanism for handling element waits.
```csharp
App.NavigationService.NavigateToLocalPage("testPage.html");
```
Sometimes you may need to navigate to a local HTML file. We make it easier for you since it is complicated depending on the different browsers. Make sure to copy the file to the folder with your tests files. To do it, include it in the project and mark it as Copy Always.