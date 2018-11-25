---
layout: default
title:  "Extensibility- Add New Element Wait Methods"
excerpt: "Learn how to extend BELLATRIX adding new element wait methods."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-add-new-element-wait-methods/
anchors:
  introduction: Introduction
  example: Example
  usage: Usage
---
Introduction
------------
Imagine that you want to wait for an element to have a specific style. First, you need to create a new 'Until' class that inheriting the **BaseUntil** class.

Example
-------
```csharp
public class UntilHasStyle : BaseUntil
{
    private readonly string _elementStyle;

    public UntilHasStyle(string elementStyle, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval) => _elementStyle = elementStyle;

    public override void WaitUntil<TBy>(TBy by) => WaitUntil(ElementHasStyle(WrappedWebDriver, by), TimeoutInterval, SleepInterval);

    private Func<IWebDriver, bool> ElementHasStyle<TBy>(ISearchContext searchContext, TBy by)
        where TBy : By => driver =>
    {
        try
        {
            var element = FindElement(searchContext, by);
            return element != null && element.GetAttribute("style").Equals(_elementStyle);
        }
        catch (StaleElementReferenceException)
        {
            return false;
        }
    };
}
```
Find the element and check the current value in the style attribute. The internal **WaitUntil** will wait until the value changes in the specified time.

The next and final step is to create an extension method for all UI elements.

```csharp
public static class UntilElementsExtensions
{
    public static TElementType ToHasStyle<TElementType>(this TElementType element, string style, int? timeoutInterval = null, int? sleepInterval = null)
        where TElementType : Element
    {
        var until = new UntilHasStyle(style, timeoutInterval, sleepInterval);
        element.EnsureState(until);
        return element;
    }
}
```
After UntilHasStyle is created, it is important to be passed on to the element’s EnsureState method.

Usage
------------
```csharp
using Bellatrix.Web.GettingStarted.ExtensionMethodsWaits;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Web.GettingStarted
{
    [TestClass]
    [Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
    public class NewElementWaitTests : WebTest
    {
        [TestMethod]
        public void PromotionsPageOpened_When_PromotionsButtonClicked()
        {
            App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

            var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("promo").ToHasStyle("padding: 1.618em 1em");

            promotionsLink.Click();
        }
    }
}
```
You need to add a using statement to the namespace where the new wait extension methods are situated.

```csharp
using Bellatrix.Web.GettingStarted.ExtensionMethodsWaits;
```
After that, you can use the new wait method as it was originally part of BELLATRIX.
```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("promo").ToHasStyle("padding: 1.618em 1em");
```