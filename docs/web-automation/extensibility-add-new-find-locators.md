---
layout: default
title:  "Extensibility- Add New Find Locators"
excerpt: "Learn how to extend BELLATRIX adding new custom find locators."
date:   2018-10-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-add-new-find-locators/
anchors:
  introduction: Introduction
  example: Example
  usage: Usage
---
Introduction
------------
Imagine that you want to create a new locator for finding all elements with ID starting with specific value. First, you need to create a new 'By' class.

Example
-------
```csharp
public class ByIdStartingWith : By
{
    public ByIdStartingWith(string value)
        : base(value)
    {
    }

    public override OpenQA.Selenium.By Convert() => OpenQA.Selenium.By.CssSelector($"[id^='{Value}']");
}
```
In the Convert method, we use a standard WebDriver By locator, and in this case we implement our requirements through a little CSS.

To ease the usage of the locator, we need to create an extension methods for ElementCreateService and Element classes.

```csharp
public static class ElementCreateExtensions
{
    public static TElement CreateByIdStartingWith<TElement>(this Element element, string idPrefix)
      where TElement : Element => element.Create<TElement, ByIdStartingWith>(new ByIdStartingWith(idPrefix));

    public static ElementsList<TElement> CreateAllByIdStartingWith<TElement>(this Element element, string idEnding)
        where TElement : Element => new ElementsList<TElement>(new ByIdStartingWith(idEnding), element.WrappedElement);
}
```

```csharp
public static class ElementRepositoryExtensions
{
    public static TElement CreateByIdStartingWith<TElement>(this ElementCreateService repository, string idPrefix)
        where TElement : Element => repository.Create<TElement, ByIdStartingWith>(new ByIdStartingWith(idPrefix));

    public static ElementsList<TElement> CreateAllByIdStartingWith<TElement>(this ElementCreateService repository, string idPrefix)
        where TElement : Element => new ElementsList<TElement>(new ByIdStartingWith(idPrefix), null);
}
```

Usage
------------
```csharp
using Bellatrix.Web.GettingStarted.ExtensionMethodsLocators;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Web.GettingStarted
{
    [TestClass]
    [Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
    public class NewFindLocatorsTests : WebTest
    {
        [TestMethod]
        public void PromotionsPageOpened_When_PromotionsButtonClicked()
        {
            App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

            var promotionsLink = App.ElementCreateService.CreateByIdStartingWith<Anchor>("promo");

            promotionsLink.Click();
        }
    }
}
```
You need to add a using statement to the namespace where the extension methods for new locator are situated.

```csharp
using Bellatrix.Web.GettingStarted.ExtensionMethodsLocators;
```
After that, you can use the new locator as it was originally part of BELLATRIX.
```csharp
var promotionsLink = App.ElementCreateService.CreateByIdStartingWith<Anchor>("promo");
```