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
Imagine that you want to create a new locator for finding all elements with ID starting with specific value. First, you need to create a new 'FindStrategy' class.

Example
-------
```csharp
public class FindNameStartingWithStrategy : FindStrategy
{
    private const string XpathStartingWithExpression = "//*[starts-with(@Name, '{0}')]";

    public FindNameStartingWithStrategy(string value)
        : base(value)
    {
    }

    public override WindowsElement FindElement(WindowsDriver<WindowsElement> searchContext)
    {
        return searchContext.FindElementByXPath(string.Format(XpathStartingWithExpression, Value));
    }

    public override IEnumerable<WindowsElement> FindAllElements(WindowsDriver<WindowsElement> searchContext)
    {
        return searchContext.FindElementsByXPath(string.Format(XpathStartingWithExpression, Value));
    }

    public override AppiumWebElement FindElement(WindowsElement element)
    {
        return element.FindElementByXPath(string.Format(XpathStartingWithExpression, Value));
    }

    public override IEnumerable<AppiumWebElement> FindAllElements(WindowsElement element)
    {
        return element.FindElementsByXPath(string.Format(XpathStartingWithExpression, Value));
    }

    public override string ToString()
    {
        return $"By Name starting with = {Value}";
    }
}
```
We override all available methods and use XPath expression for finding an element with ID starting with.

To ease the usage of the locator, we need to create an extension methods for ElementCreateService and Element classes.

```csharp
public static class ElementCreateExtensions
{
    public static ElementsList<TElement> CreateAllByNameStartingWith<TElement>(this Element element, string tag)
        where TElement : Element => new ElementsList<TElement>(new FindNameStartingWithStrategy(tag), element.WrappedElement);
}
```

```csharp
public static class ElementRepositoryExtensions
{
    public static TElement CreateByNameStartingWith<TElement>(this ElementCreateService repo, string tag)
        where TElement : Element => repo.Create<TElement, FindNameStartingWithStrategy>(new FindNameStartingWithStrategy(tag));

    public static ElementsList<TElement> CreateAllByNameStartingWith<TElement>(this ElementCreateService repo, string tag)
        where TElement : Element => new ElementsList<TElement>(new FindNameStartingWithStrategy(tag), null);
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
    [App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
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