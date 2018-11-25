---
layout: default
title:  "Extensibility- Add New Find Locators"
excerpt: "Learn how to extend BELLATRIX adding new custom find locators."
date:   2018-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/extensibility-add-new-find-locators/
anchors:
  introduction: Introduction
  example: Example
  usage: Usage
---
Introduction
------------
Imagine that you want to create a new locator for finding all elements with name starting with specific value. First, you need to create a new 'By' class.

Example
-------
```csharp
public class ByNameStartingWith : By<IOSDriver<IOSElement>, IOSElement>
{
    private readonly string _locatorValue;

    public ByNameStartingWith(string name)
        : base(name) => _locatorValue = $"//*[starts-with(@name, '{Value}')]";

    public override IOSElement FindElement(IOSDriver<IOSElement> searchContext) => searchContext.FindElementByXPath(_locatorValue);

    public override IEnumerable<IOSElement> FindAllElements(IOSDriver<IOSElement> searchContext) => searchContext.FindElementsByXPath(_locatorValue);

    public override AppiumWebElement FindElement(IOSElement element) => element.FindElementByXPath(_locatorValue);

    public override IEnumerable<AppiumWebElement> FindAllElements(IOSElement element) => element.FindElementsByXPath(_locatorValue);

    public override string ToString() => $"Name starting with = {Value}";
}
```
We override all available methods and use XPath expression for finding an element with name starting with.

To ease the usage of the locator, we need to create an extension methods for ElementCreateService and Element classes.

```csharp
public static class ElementRepositoryExtensions
{
    public static TElement CreateByNameStartingWith<TElement>(this ElementCreateService repo, string id)
        where TElement : Element<IOSDriver<IOSElement>, IOSElement> => repo.Create<TElement, ByNameStartingWith, IOSDriver<IOSElement>, IOSElement>(new ByNameStartingWith(id));

    public static ElementsList<TElement, ByNameStartingWith, IOSDriver<IOSElement>, IOSElement> CreateAllByNameStartingWith<TElement>(this ElementCreateService repo, string id)
        where TElement : Element<IOSDriver<IOSElement>, IOSElement> => new ElementsList<TElement, ByNameStartingWith, IOSDriver<IOSElement>, IOSElement>(new ByNameStartingWith(id), null);
}
```

```csharp
public static class ElementCreateExtensions
{
    public static TElement CreateByNameStartingWith<TElement>(this Element<IOSDriver<IOSElement>, IOSElement> element, string id)
        where TElement : Element<IOSDriver<IOSElement>, IOSElement> => element.Create<TElement, ByNameStartingWith>(new ByNameStartingWith(id));

    public static ElementsList<TElement, ByNameStartingWith, IOSDriver<IOSElement>, IOSElement> CreateAllByNameStartingWith<TElement>(this Element<IOSDriver<IOSElement>, IOSElement> element, string id)
        where TElement : Element<IOSDriver<IOSElement>, IOSElement> => new ElementsList<TElement, ByNameStartingWith, IOSDriver<IOSElement>, IOSElement>(new ByNameStartingWith(id), element.WrappedElement);
}
```

Usage
------------
```csharp
using Bellatrix.Mobile.IOS.GettingStarted.ExtensionMethodsLocators;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.IOS.GettingStarted
{
    [TestClass]
    [IOS(Constants.IOSNativeAppPath,
        Constants.IOSDefaultVersion,
        Constants.IOSDefaultDeviceName,
        AppBehavior.RestartEveryTime)]
    public class AddNewFindLocatorsTests : IOSTest
    {
        [TestMethod]
        public void ButtonClicked_When_CallClickMethod()
        {
            var button = App.ElementCreateService.CreateByNameStartingWith<Button>("Compute");

            button.Click();
        }
    }
}
```
You need to add a using statement to the namespace where the extension methods for new locator are situated.

```csharp
using Bellatrix.Mobile.IOS.GettingStarted.ExtensionMethodsLocators;
```
After that, you can use the new locator as it was originally part of BELLATRIX.
```csharp
var button = App.ElementCreateService.CreateByNameStartingWith<Button>("Compute");
```