---
layout: default
title:  "Extensibility- Add New Find Locators"
excerpt: "Learn how to extend BELLATRIX adding new custom find locators."
date:   2018-10-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/extensibility-add-new-find-locators/
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
public class ByIdStartingWith : By<AndroidDriver<AndroidElement>, AndroidElement>
{
    private readonly string _locatorValue;

    public ByIdStartingWith(string name)
        : base(name) => _locatorValue = $"new UiSelector().resourceIdMatches(\"{Value}.*\");";

    public override AndroidElement FindElement(AndroidDriver<AndroidElement> searchContext) 
        => searchContext.FindElementByAndroidUIAutomator(_locatorValue);

    public override IEnumerable<AndroidElement> FindAllElements(AndroidDriver<AndroidElement> searchContext) 
        => searchContext.FindElementsByAndroidUIAutomator(_locatorValue);

    public override AppiumWebElement FindElement(AndroidElement element) 
        => element.FindElementByAndroidUIAutomator(_locatorValue);

    public override IEnumerable<AppiumWebElement> FindAllElements(AndroidElement element) 
        => element.FindElementsByAndroidUIAutomator(_locatorValue);

    public override string ToString() => $"ID starting with = {Value}";
}
```
We override all available methods and use UIAutomator regular expression for finding an element with ID starting with.

To ease the usage of the locator, we need to create an extension methods for ElementCreateService and Element classes.

```csharp
public static class ElementRepositoryExtensions
{
    public static TElement CreateByIdStartingWith<TElement>(this ElementCreateService repo, string id)
        where TElement : Element<AndroidDriver<AndroidElement>, AndroidElement> => repo.Create<TElement, ByIdStartingWith, AndroidDriver<AndroidElement>, AndroidElement>(new ByIdStartingWith(id));

    public static ElementsList<TElement, ByIdStartingWith, AndroidDriver<AndroidElement>, AndroidElement> CreateAllByIdStartingWith<TElement>(this ElementCreateService repo, string id)
        where TElement : Element<AndroidDriver<AndroidElement>, AndroidElement> => new ElementsList<TElement, ByIdStartingWith, AndroidDriver<AndroidElement>, AndroidElement>(new ByIdStartingWith(id), null);
}
```

```csharp
public static class ElementCreateExtensions
{
    public static TElement CreateByIdStartingWith<TElement>(this Element<AndroidDriver<AndroidElement>, AndroidElement> element, string id)
         where TElement : Element<AndroidDriver<AndroidElement>, AndroidElement> => element.Create<TElement, ByIdStartingWith>(new ByIdStartingWith(id));

    public static ElementsList<TElement, ByIdStartingWith, AndroidDriver<AndroidElement>, AndroidElement> CreateAllByIdStartingWith<TElement>(this Element<AndroidDriver<AndroidElement>, AndroidElement> element, string id)
        where TElement : Element<AndroidDriver<AndroidElement>, AndroidElement> => new ElementsList<TElement, ByIdStartingWith, AndroidDriver<AndroidElement>, AndroidElement>(new ByIdStartingWith(id), element.WrappedElement);
}
```

Usage
------------
```csharp
using Bellatrix.Mobile.Android.GettingStarted.ExtensionMethodsLocators;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.Android.GettingStarted
{
    [TestClass]
    [Android(Constants.AndroidNativeAppPath,
        Constants.AndroidDefaultAndroidVersion,
        Constants.AndroidDefaultDeviceName,
        Constants.AndroidNativeAppAppExamplePackage,
        ".view.Controls1",
        AppBehavior.ReuseIfStarted)]
    public class AddNewFindLocatorsTests : AndroidTest
    {
        [TestMethod]
        public void ButtonClicked_When_CallClickMethod()
        {
            var button = App.ElementCreateService.CreateByIdStaringWith<Button>("button");

            button.Click();
        }
    }
}
```
You need to add a using statement to the namespace where the extension methods for new locator are situated.

```csharp
using Bellatrix.Mobile.Android.GettingStarted.ExtensionMethodsLocators;
```
After that, you can use the new locator as it was originally part of BELLATRIX.
```csharp
var button = App.ElementCreateService.CreateByIdStaringWith<Button>("button");
```