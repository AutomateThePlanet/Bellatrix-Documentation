---
layout: default
title:  "Extensibility- Add New Find Locators"
excerpt: "Learn how to extend BELLATRIX adding new custom find locators."
date:   2021-06-23 06:50:17 +0200
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
        return component.FindElementByXPath(string.Format(XpathStartingWithExpression, Value));
    }

    public override IEnumerable<AppiumWebElement> FindAllElements(WindowsElement element)
    {
        return component.FindElementsByXPath(string.Format(XpathStartingWithExpression, Value));
    }

    public override string ToString()
    {
        return $"By Name starting with = {Value}";
    }
}
```
We override all available methods and use XPath expression for finding an element with ID starting with.

To ease the usage of the locator, we need to create an extension methods for ComponentCreateService and Element classes.

```csharp
public static class ComponentCreateExtensions
{
    public static ComponentsList<TComponent> CreateAllByNameStartingWith<TComponent>(this Element element, string tag)
        where TComponent : Component => new ComponentsList<TComponent>(new FindNameStartingWithStrategy(tag), component.WrappedElement);
}
```

```csharp
public static class ComponentRepositoryExtensions
{
    public static TComponent CreateByNameStartingWith<TComponent>(this ComponentCreateService repo, string tag)
        where TComponent : Component => repo.Create<TComponent, FindNameStartingWithStrategy>(new FindNameStartingWithStrategy(tag));

    public static ComponentsList<TComponent> CreateAllByNameStartingWith<TComponent>(this ComponentCreateService repo, string tag)
        where TComponent : Component => new ComponentsList<TComponent>(new FindNameStartingWithStrategy(tag), null);
}
```

Usage
------------
```csharp
using Bellatrix.Desktop.GettingStarted.ExtensionMethodsLocators;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Desktop.GettingStarted
{
    [TestFixture]
    [App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
    public class AddNewFindLocatorsTests : DesktopTest
    {
        [Test]
        public void MessageChanged_When_ButtonHovered_Wpf()
        {
            var button = App.Components.CreateByIdStartingWith<Button>("E Button");

            button.Hover();

            var label = App.Components.CreateByAutomationId<Label>("ResultLabelId");
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
var button = App.Components.CreateByIdStartingWith<Button>("E Button");
```