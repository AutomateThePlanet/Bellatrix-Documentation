---
layout: default
title:  "Extensibility- Add New Find Locators"
excerpt: "Learn how to extend BELLATRIX adding new custom find locators."
date:   2021-10-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/extensibility-add-new-find-locators/
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
public class FindIdStartingWithStrategy : FindStrategy<AndroidDriver<AndroidElement>, AndroidElement>
{
    private readonly string _locatorValue;

    public FindIdStartingWithStrategy(string name)
        : base(name)
    {
        _locatorValue = $"new UiSelector().resourceIdMatches(\"{Value}.*\");";
    }

    public override AndroidElement FindElement(AndroidDriver<AndroidElement> searchContext)
    {
        return searchContext.FindElementByAndroidUIAutomator(_locatorValue);
    }

    public override IEnumerable<AndroidElement> FindAllElements(AndroidDriver<AndroidElement> searchContext)
    {
        return searchContext.FindElementsByAndroidUIAutomator(_locatorValue);
    }

    public override AppiumWebElement FindElement(AndroidElement element)
    {
        return component.FindElementByAndroidUIAutomator(_locatorValue);
    }

    public override IEnumerable<AppiumWebElement> FindAllElements(AndroidElement element)
    {
        return component.FindElementsByAndroidUIAutomator(_locatorValue);
    }

    public override string ToString()
    {
        return $"ID starting with = {Value}";
    }
}
```
We override all available methods and use UIAutomator regular expression for finding an element with ID starting with.

To ease the usage of the locator, we need to create an extension methods for ComponentCreateService and Element classes.

```csharp
public static class ComponentRepositoryExtensions
{
    public static TComponent CreateByIdStartingWith<TComponent>(this ComponentCreateService repo, string id)
        where TComponent : Component<AndroidDriver<AndroidElement>, AndroidElement> => repo.Create<TComponent, FindIdStartingWithStrategy, AndroidDriver<AndroidElement>, AndroidElement>(new FindIdStartingWithStrategy(id));

    public static ComponentsList<TComponent, FindIdStartingWithStrategy, AndroidDriver<AndroidElement>, AndroidElement> CreateAllByIdStartingWith<TComponent>(this ComponentCreateService repo, string id)
        where TComponent : Component<AndroidDriver<AndroidElement>, AndroidElement> => new ComponentsList<TComponent, FindIdStartingWithStrategy, AndroidDriver<AndroidElement>, AndroidElement>(new FindIdStartingWithStrategy(id), null);
}
```

```csharp
public static class ComponentCreateExtensions
{
    public static TComponent CreateByIdStartingWith<TComponent>(this Element<AndroidDriver<AndroidElement>, AndroidElement> element, string id)
        where TComponent : Component<AndroidDriver<AndroidElement>, AndroidElement> => App.Components.Create<TComponent, FindIdStartingWithStrategy>(new FindIdStartingWithStrategy(id));

    public static ComponentsList<TComponent, FindIdStartingWithStrategy, AndroidDriver<AndroidElement>, AndroidElement> CreateAllByIdStartingWith<TComponent>(this Element<AndroidDriver<AndroidElement>, AndroidElement> element, string id)
        where TComponent : Component<AndroidDriver<AndroidElement>, AndroidElement> => new ComponentsList<TComponent, FindIdStartingWithStrategy, AndroidDriver<AndroidElement>, AndroidElement>(new FindIdStartingWithStrategy(id), component.WrappedElement);
}
```

Usage
------------
```csharp
using Bellatrix.Mobile.Android.GettingStarted.ExtensionMethodsLocators;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.Android.GettingStarted
{
    [TestFixture]
    [Android(Constants.AndroidNativeAppPath,
        Constants.AndroidDefaultAndroidVersion,
        Constants.AndroidDefaultDeviceName,
        Constants.AndroidNativeAppAppExamplePackage,
        ".view.Controls1",
        Lifecycle.ReuseIfStarted)]
    public class AddNewFindLocatorsTests : AndroidTest
    {
        [Test]
        public void ButtonClicked_When_CallClickMethod()
        {
            var button = App.Components.CreateByIdStaringWith<Button>("button");

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
var button = App.Components.CreateByIdStaringWith<Button>("button");
```