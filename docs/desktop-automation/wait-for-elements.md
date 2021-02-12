---
layout: default
title:  "Wait for Elements"
excerpt: "Learn how to wait for desktop elements with BELLATRIX desktop module."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/wait-for-elements/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestMethod]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public void WaitForElementToExists_When_ElementIsNotVisibleInitially_Wpf()
{
    var button = App.ElementCreateService.CreateByName<Button>("ShowAfterButton").ToExists();

    button.Click();

    Assert.IsTrue(button.IsVisible);
}

[TestMethod]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public void WaitForElementToNotExists_When_ElementIsVisibleInitially_Wpf()
{
    var button = App.ElementCreateService.CreateByName<Button>("DisappearAfterButton1");

    button.ToNotExists().WaitToBe();

    Assert.IsFalse(button.IsPresent);
}
```

Explanations
------------
```csharp
var button = App.ElementCreateService.CreateByName<Button>("ShowAfterButton").ToExists();
button.Click();
```
Besides the **ToBe** methods that you can use on element creation, you have a couple of other options if you need to wait for elements. For example, if you want to reuse your element in multiple tests or if you use it through page objects (more about that in later chapters), you may not want to wait for all conditions to be executed every time. Sometimes the mentioned conditions during creation may not be correct for some specific test case. E.g. button wait to be disabled, but in most cases, you need to wait for it to be enabled. To give you more options BELLATRIX has a special method called **WaitToBe**. The big difference compared to ToBe methods is that it forces BELLATRIX to locate your element immediately and wait for the condition to be satisfied.
```csharp
var button = App.ElementCreateService.CreateByName<Button>("DisappearAfterButton1");
button.ToNotExists().WaitToBe();
```
Why we have two syntaxes for almost the same thing? Because sometimes you do not need to perform an action or assertion against the element. In the above example, statement waits for the button to be clickable and visible before the click. However, in some cases, you want some element to show up but not act on it. This means the above syntax does not help you since the element is not searched in the DOM at all because of the lazy loading.
Using the **WaitToBe** method forces BELLATRIX to locate your element and wait for the condition without the need to do an action or assertion.