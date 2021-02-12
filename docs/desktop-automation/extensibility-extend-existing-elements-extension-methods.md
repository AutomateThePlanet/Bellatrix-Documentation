---
layout: default
title:  "Extensibility- Extend Existing Elements- Extension Methods"
excerpt: "Learn how to extend BELLATRIX desktop elements using extension methods."
date:   2018-06-23 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/extensibility-extend-existing-elements-extension-methods/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
using Bellatrix.Desktop.GettingStarted.Advanced.Elements.Extension.Methods;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Desktop.GettingStarted
{
    [TestClass]
    [App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
    public class ExtendExistingElementWithExtensionMethodsTests : DesktopTest
    {
        [TestMethod]
        [App(Constants.WpfAppPath, Lifecycle.RestartOnFail)]
        public void MessageChanged_When_ButtonClicked_Wpf()
        {
            var button = App.ElementCreateService.CreateByName<Button>("E Button");

            // 2. Use the custom added submit button behaviour through 'Enter' key.
            button.SubmitButtonWithEnter();

            var label = App.ElementCreateService.CreateByName<Button>("ebuttonClicked");
            Assert.AreEqual("ebuttonClicked", label.InnerText);
        }
    }
}
```

Explanations
------------
```csharp
namespace Bellatrix.Desktop.GettingStarted.Advanced.Elements.Extension.Methods
{
    public static class ButtonExtensions
    {
        public static void SubmitButtonWithEnter(this Button button)
        {
            var action = new Actions(button.WrappedDriver);
            action.MoveToElement(button.WrappedElement).SendKeys(Keys.Enter).Perform();
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
using Bellatrix.Desktop.GettingStarted.Advanced.Elements.Extension.Methods;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Desktop.GettingStarted
```
To use the additional method you created, add a using statement to the extension methods' namespace.
```csharp
button.SubmitButtonWithEnter();
```
Use the custom added submit button behaviour through 'Enter' key.