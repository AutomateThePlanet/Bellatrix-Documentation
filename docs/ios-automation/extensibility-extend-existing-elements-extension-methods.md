---
layout: default
title:  "Extensibility- Extend Existing Elements- Extension Methods"
excerpt: "Learn how to extend BELLATRIX iOS elements using extension methods."
date:   2018-10-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/extensibility-extend-existing-elements-extension-methods/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
using Bellatrix.Mobile.IOS.GettingStarted.Custom;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.IOS.GettingStarted
{
    [TestClass]
    [IOS(Constants.IOSNativeAppPath,
        Constants.IOSDefaultVersion,
        Constants.IOSDefaultDeviceName,
        Lifecycle.RestartEveryTime)]
    public class ExtendExistingElementWithExtensionMethodsTests : IOSTest
    {
        [TestMethod]
        public void ButtonClicked_When_CallClickMethod()
        {
            var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

            button.SubmitButtonWithScroll();
        }
    }
}
```

Explanations
------------
```csharp
namespace Bellatrix.Mobile.IOS.GettingStarted.Custom
{
    public static class ButtonExtensions
    {
        public static void SubmitButtonWithScroll(this Button button)
        {
            button.ToExists().ToBeClickable().WaitToBe();
            button.ScrollToVisible(ScrollDirection.Down);
            button.Click();
        }
    }
}
```
One way to extend an existing element is to create an extension method for the additional action.
1. Place it in a static class like this one.
2. Create a static method for the action.
3. Pass the extended element as a parameter with the keyword 'this'.
4. Access the native element through the WrappedElement property and the driver via WrappedDriver.

Later to use the method in your tests, add a using statement containing this class's namespace.
```csharp
using Bellatrix.Mobile.IOS.GettingStarted.Custom;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.IOS.GettingStarted
```
To use the additional method you created, add a using statement to the extension methods' namespace.
```csharp
button.SubmitButtonWithScroll();
```
Use the custom added submit button  with scroll-to-visible behaviour.