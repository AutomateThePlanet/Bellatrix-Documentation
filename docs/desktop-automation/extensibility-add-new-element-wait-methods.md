---
layout: default
title:  "Extensibility- Add New Element Wait Methods"
excerpt: "Learn how to extend BELLATRIX adding new element wait methods."
date:   2018-06-23 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/extensibility-add-new-element-wait-methods/
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
public class WaitToHaveSpecificContentStrategy : WaitStrategy
{
    private readonly string _elementContent;

    public WaitToHaveSpecificContentStrategy(string elementContent, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval) => _elementContent = elementContent;

    public override void WaitUntil<TBy>(TBy by)
        => WaitUntil(ElementHasSpecificContent(WrappedWebDriver, by), TimeoutInterval, SleepInterval);

    private Func<IWebDriver, bool> ElementHasSpecificContent<TBy>(WindowsDriver<WindowsElement> searchContext, TBy by)
        where TBy : Locators.FindStrategy => driver =>
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
```
Find the element and check the current value in the Text attribute. The internal **WaitUntil** will wait until the value changes in the specified time.

The next and final step is to create an extension method for all UI elements.

```csharp
public static TElementType ToHaveSpecificContent<TElementType>(this TElementType element, string content, int? timeoutInterval = null, int? sleepInterval = null)
    where TElementType : Element
{
    var until = new WaitToHaveSpecificContentStrategy(content, timeoutInterval, sleepInterval);
    element.ValidateState(until);
    return element;
}
```
After **UntilHaveSpecificContent** is created, it is important to be passed on to the element’s EnsureState method.

Usage
------------
```csharp
using Bellatrix.Desktop.GettingStarted.ExtensionMethodsWaitMethods;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Desktop.GettingStarted
{
    [TestClass]
    [App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
    public class AddNewElementWaitMethodsTests : DesktopTest
    {
        [TestMethod]
        [Ignore]
        public void MessageChanged_When_ButtonHovered_Wpf()
        {
            var button = App.ElementCreateService.CreateByName<Button>("E Button").ToHaveSpecificContent("E Button");

            button.Hover();

            var label = App.ElementCreateService.CreateByAutomationId<Label>("ResultLabelId");
            Assert.AreEqual("ebuttonHovered", label.InnerText);
        }
    }
}
```
You need to add a using statement to the namespace where the new wait extension methods are situated.

```csharp
using Bellatrix.Desktop.GettingStarted.ExtensionMethodsWaitMethods;
```
After that, you can use the new wait method as it was originally part of BELLATRIX.
```csharp
var button = App.ElementCreateService.CreateByName<Button>("E Button").ToHaveSpecificContent("E Button");
```