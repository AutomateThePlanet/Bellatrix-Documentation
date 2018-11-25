---
layout: default
title:  "Extensibility- Add New Element Wait Methods"
excerpt: "Learn how to extend BELLATRIX adding new element wait methods."
date:   2018-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/extensibility-add-new-element-wait-methods/
anchors:
  introduction: Introduction
  example: Example
  usage: Usage
---
Introduction
------------
Imagine that you want to wait for an element to have a specific content. First, you need to create a new 'Until' class that inheriting the **BaseUntil** class.

Example
-------
```csharp
public class UntilHaveSpecificContent<TDriver, TDriverElement> : BaseUntil<TDriver, TDriverElement>
    where TDriver : IOSDriver<TDriverElement>
    where TDriverElement : AppiumWebElement
{
    private readonly string _elementContent;

    public UntilHaveSpecificContent(string elementContent, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval)
    {
        _elementContent = elementContent;
        TimeoutInterval = timeoutInterval ?? ConfigurationService.Instance.GetMobileSettings().ElementToHaveContentTimeout;
    }

    public override void WaitUntil<TBy>(TBy by) 
        => WaitUntil(ElementHasSpecificContent(WrappedWebDriver, by), TimeoutInterval, SleepInterval);

    private Func<TDriver, bool> ElementHasSpecificContent<TBy>(TDriver searchContext, TBy by)
        where TBy : By<TDriver, TDriverElement>
    {
        return driver =>
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
        };
    }
}
```
Find the element and check the current value in the Text attribute. The internal **WaitUntil** will wait until the value changes in the specified time.

The next and final step is to create an extension method for all UI elements.

```csharp
namespace Bellatrix.Mobile.IOS.GettingStarted.ExtensionMethodsWaitMethods
{
    public static class UntilElementsExtensions
    {
        public static TElementType ToHaveSpecificContent<TElementType>(
            this TElementType element, string content, int? timeoutInterval = null, int? sleepInterval = null)
         where TElementType : Element
        {
            var until = new UntilHaveSpecificContent<IOSDriver<IOSElement>, IOSElement>(content, timeoutInterval, sleepInterval);
            element.EnsureState(until);
            return element;
        }
    }
}
```
After **UntilHaveSpecificContent** is created, it is important to be passed on to the element’s EnsureState method.

Usage
------------
```csharp
using Bellatrix.Mobile.IOS.GettingStarted.ExtensionMethodsWaitMethods;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.IOS.GettingStarted
{
    [TestClass]
    [IOS(Constants.IOSNativeAppPath,
        Constants.IOSDefaultVersion,
        Constants.IOSDefaultDeviceName,
        AppBehavior.RestartEveryTime)]
    public class AddNewElementWaitMethodsTests : IOSTest
    {
        [TestMethod]
        [Ignore]
        public void MessageChanged_When_ButtonHovered_Wpf()
        {
            var button = 
				App.ElementCreateService.CreateByName<Button>("ComputeSumButton").ToHaveSpecificContent("button");

            button.Click();
        }
    }
}
```
You need to add a using statement to the namespace where the new wait extension methods are situated.

```csharp
using Bellatrix.Mobile.IOS.GettingStarted.ExtensionMethodsWaitMethods;
```
After that, you can use the new wait method as it was originally part of BELLATRIX.
```csharp
var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton").ToHaveSpecificContent("button");
```