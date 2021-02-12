---
layout: default
title:  "Extensability- Extend Existing Elements- Child Elements"
excerpt: "Learn how to extend BELLATRIX web elements using child elements."
date:   2018-06-23 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/extensibility-extend-existing-elements-child-elements/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class ExtendExistingElementWithChildElementsTests : DesktopTest
{
    [TestMethod]
    [App(Constants.WpfAppPath, Lifecycle.RestartOnFail)]
    [ScreenshotOnFail(false)]
    public void MessageChanged_When_ButtonClicked_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<ExtendedButton>("E Button");

        button.SubmitButtonWithEnter();

        var label = App.ElementCreateService.CreateByName<Button>("ebuttonClicked");
        Assert.AreEqual("ebuttonClicked", label.InnerText);
    }
}
```

Explanations
------------
```csharp
public class ExtendedButton : Button
{
    public void SubmitButtonWithEnter()
    {
        var action = new Actions(WrappedDriver);
        action.MoveToElement(WrappedElement).SendKeys(Keys.Enter).Perform();
    }
}
```
The second way of extending an existing element is to create a child element. Inherit the element you want to extend. In this case, two methods are added to the standard Button element. Next in your tests, use the ** ** instead of regular Button to have access to these methods. The same strategy can be used to create a completely new element that BELLATRIX does not provide. You need to extend the '**Element**' as a base class.
```csharp
var button = App.ElementCreateService.CreateByName<ExtendedButton>("E Button");
```
Instead of the regular button, we create the **ExtendedButton**, this way we can use its new methods.
```csharp
button.SubmitButtonWithEnter();
```
Use the new custom method provided by the **ExtendedButton** class.