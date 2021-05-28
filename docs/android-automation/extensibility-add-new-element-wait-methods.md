---
layout: default
title:  "Extensibility- Add New Element Wait Methods"
excerpt: "Learn how to extend BELLATRIX adding new element wait methods."
date:   2021-06-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/extensibility-add-new-element-wait-methods/
anchors:
  introduction: Introduction
  example: Example
  usage: Usage
---
Introduction
------------
Imagine that you want to wait for an element to have a specific content. First, you need to create a new 'WaitStrategy' class that inheriting the **WaitStrategy** class.

Example
-------
```csharp
public class WaitToHaveSpecificContentStrategy<TDriver, TDriverElement> : WaitStrategy<TDriver, TDriverElement>
    where TDriver : AppiumDriver<TDriverElement>
    where TDriverElement : AppiumWebElement
{
    private readonly string _elementContent;

    public WaitToHaveSpecificContentStrategy(string elementContent, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval)
    {
        _elementContent = elementContent;
        TimeoutInterval = timeoutInterval ?? ConfigurationService.GetSection<MobileSettings>().ElementToHaveContentTimeout;
    }

    public override void WaitUntil<TBy>(TBy by)
    {
        WaitUntil(d => ElementHasSpecificContent(WrappedWebDriver, by), TimeoutInterval, SleepInterval);
    }

    private bool ElementHasSpecificContent<TBy>(TDriver searchContext, TBy by)
        where TBy : FindStrategy<TDriver, TDriverElement>
    {
        try
        {
            var element = by.FindElement(searchContext);
            return element.Text == _elementContent;
        }
        catch (NoSuchElementException)
        {
            return false;
        }
        catch (InvalidOperationException)
        {
            return false;
        }
    }
}
```
After **UntilHaveSpecificContent** is created, it is important to be passed on to the element’s EnsureState method.

Usage
------------
```csharp
using Bellatrix.Mobile.Android.GettingStarted.ExtensionMethodsWaitMethods;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.Android.GettingStarted
{
    [TestClass]
    [Android(Constants.AndroidNativeAppPath,
        Constants.AndroidDefaultAndroidVersion,
        Constants.AndroidDefaultDeviceName,
        Constants.AndroidNativeAppAppExamplePackage,
        ".view.Controls1",
        Lifecycle.ReuseIfStarted)]
    public class AddNewElementWaitMethodsTests : AndroidTest
    {
        [TestMethod]
        [Ignore]
        public void MessageChanged_When_ButtonHovered_Wpf()
        {
            var button = App.Components.CreateByIdContaining<Button>("button").ToHaveSpecificContent("button");

            button.Click();
        }
    }
}
```
You need to add a using statement to the namespace where the new wait extension methods are situated.

```csharp
using Bellatrix.Mobile.Android.GettingStarted.ExtensionMethodsWaitMethods;
```
After that, you can use the new wait method as it was originally part of BELLATRIX.
```csharp
var button = App.Components.CreateByIdContaining<Button>("button").ToHaveSpecificContent("button");
```