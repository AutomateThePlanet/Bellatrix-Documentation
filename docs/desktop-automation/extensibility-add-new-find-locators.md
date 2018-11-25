---
layout: default
title:  "Extensibility- Add New Find Locators"
excerpt: "Learn how to extend BELLATRIX adding new custom find locators."
date:   2018-06-23 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/extensibility-add-new-find-locators/
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
    private const string XpathEndingWithExpression = "//*[starts-with(@id, '{0}')]";

    public ByIdStartingWith(string value)
        : base(value)
    {
    }

    public override WindowsElement FindElement(WindowsDriver<WindowsElement> searchContext)
        => searchContext.FindElementByXPath(string.Format(XpathEndingWithExpression, Value));

    public override IEnumerable<WindowsElement> FindAllElements(WindowsDriver<WindowsElement> searchContext)
        => searchContext.FindElementsByXPath(string.Format(XpathEndingWithExpression, Value));

    public override AppiumWebElement FindElement(WindowsElement element)
        => element.FindElementByXPath(string.Format(XpathEndingWithExpression, Value));

    public override IEnumerable<AppiumWebElement> FindAllElements(WindowsElement element)
        => element.FindElementsByXPath(string.Format(XpathEndingWithExpression, Value));

    public override string ToString() => $"By ID starting with = {Value}";
}
```
We override all available methods and use XPath expression for finding an element with ID starting with.

To ease the usage of the locator, we need to create an extension methods for ElementCreateService and Element classes.

```csharp
public static class ElementCreateExtensions
{
    public static TElement CreateByIdEndingWith<TElement>(this Element element, string idPart)
        where TElement : Element => element.Create<TElement, ByIdStartingWith>(new ByIdStartingWith(idPart));

    public static ElementsList<TElement> CreateAllByIdEndingWith<TElement>(this Element element, string tag)
        where TElement : Element => new ElementsList<TElement>(new ByIdStartingWith(tag), element.WrappedElement);
}
```

```csharp
public static class ElementRepositoryExtensions
{
    public static TElement CreateByIdStartingWith<TElement>(this ElementCreateService repo, string tag)
        where TElement : Element => repo.Create<TElement, ByIdStartingWith>(new ByIdStartingWith(tag));

    public static ElementsList<TElement> CreateAllByIdStartingWith<TElement>(this ElementCreateService repo, string tag)
        where TElement : Element => new ElementsList<TElement>(new ByIdStartingWith(tag), null);
}
```

Usage
------------
```csharp
using Bellatrix.Desktop.GettingStarted.ExtensionMethodsLocators;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Desktop.GettingStarted
{
    [TestClass]
    [App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
    public class AddNewFindLocatorsTests : DesktopTest
    {
        [TestMethod]
        public void MessageChanged_When_ButtonHovered_Wpf()
        {
            var button = App.ElementCreateService.CreateByIdStartingWith<Button>("E Button");

            button.Hover();

            var label = App.ElementCreateService.CreateByAutomationId<Label>("ResultLabelId");
            Assert.AreEqual("ebuttonHovered", label.InnerText);
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
var button = App.ElementCreateService.CreateByIdStartingWith<Button>("E Button");
```