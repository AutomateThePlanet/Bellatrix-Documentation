---
layout: default
title:  "Extensibility- Add New Element Wait Methods"
excerpt: "Learn how to extend BELLATRIX adding new element wait methods."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-add-new-element-wait-methods/
anchors:
  introduction: Introduction
  example: Example
  usage: Usage
---
Introduction
------------
Imagine that you want to wait for an element to have a specific style. First, you need to create a new class that inherits the **WaitStrategy** class.

Example
-------
```csharp
public class WaitToHasStyleStrategy : WaitStrategy
{
    private readonly string _elementStyle;

    public WaitToHasStyleStrategy(string elementStyle, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval)
    {
        _elementStyle = elementStyle;
    }

    public override void WaitUntil<TBy>(TBy by)
    {
        WaitUntil(d => ElementHasStyle(WrappedWebDriver, by), TimeoutInterval, SleepInterval);
    }

    public override void WaitUntil<TBy>(TBy by, Element parent)
    {
        WaitUntil(d => ElementHasStyle(parent.WrappedElement, by), TimeoutInterval, SleepInterval);
    }

    private bool ElementHasStyle<TBy>(ISearchContext searchContext, TBy by)
        where TBy : FindStrategy
    {
        try
        {
            var element = searchContext.FindElement(by.Convert());
            return element != null && component.GetAttribute("style").Equals(_elementStyle);
        }
        catch (StaleElementReferenceException)
        {
            return false;
        }
    }
}
```
Find the element and check the current value in the style attribute. The **WaitUntil** method will wait until the value changes in the specified time.

The next and final step is to create an extension method for all UI elements.

```csharp
public static class UntilElementsExtensions
{
    public static TComponentType ToHasSpecificStyle<TComponentType>(this TComponentType element, string style, int? timeoutInterval = null, int? sleepInterval = null)
        where TComponentType : Component
    {
        var until = new WaitToHasStyleStrategy(style, timeoutInterval, sleepInterval);
        component.ValidateState(until);
        return element;
    }
}
```
After **UntilHasStyle** is created, it is important to be passed on to the element’s **EnsureState** method.

Usage
------------
```csharp
using Bellatrix.Web.GettingStarted.ExtensionMethodsWaits;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Web.GettingStarted
{
    [TestFixture]
    public class NewElementWaitTests : WebTest
    {
        [Test]
        public void PromotionsPageOpened_When_PromotionsButtonClicked()
        {
            App.Navigation.Navigate("http://demos.bellatrix.solutions/");

            var promotionsLink = App.Components.CreateByLinkText<Anchor>("promo").ToHasStyle("padding: 1.618em 1em");

            promotionsLink.Click();
        }
    }
}
```
You need to add a using statement to the namespace where the new wait extension methods are located.

```csharp
using Bellatrix.Web.GettingStarted.ExtensionMethodsWaits;
```
After that, you can use the new wait method as it was originally part of BELLATRIX.
```csharp
var promotionsLink = App.Components.CreateByLinkText<Anchor>("promo").ToHasStyle("padding: 1.618em 1em");
```