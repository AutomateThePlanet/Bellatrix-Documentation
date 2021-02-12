---
layout: default
title:  "Extensibility- Element Action Hooks"
excerpt: "Learn how to extend BELLATRIX iOS element controls using element action hooks."
date:   2018-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/extensibility-element-action-hooks/
anchors:
  introduction: Introduction
  example: Example
  explanations: Explanations
---
Introduction
------------
Another way to extend BELLATRIX is to use the controls hooks. This is how the BDD logging is implemented. For each method of the control, there are two hooks- one that is called before the action and one after. For example, the available hooks for the button are:
- **Clicking** - an event executed before button click
- **Clicked** - an event executed after the button is clicked

You need to implement the event handlers for these events and subscribe them. BELLATRIX gives you again a shortcut- you need to create a class and inherit the **{ControlName}EventHandlers** In the example, **DebugLogger** is called for each button event printing to Debug window the coordinates of the button. You can call external logging provider, making screenshots before or after each action, the possibilities are limitless.

Example
-------
```csharp
public class DebugLoggingButtonEventHandlers : ButtonEventHandlers
{
    protected override void ClickingEventHandler(object sender, ElementActionEventArgs<IOSElement> arg)
    {
        DebugLogger.LogInfo($"Before clicking button. Coordinates: 
				X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }

    protected override void ClickedEventHandler(object sender, ElementActionEventArgs<IOSElement> arg)
    {
        DebugLogger.LogInfo($"After button clicked. Coordinates: 
				X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }
}
```
```csharp
[TestClass]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
public class ElementActionHooksTests : IOSTest
{
    public override void TestsArrange()
    {
        App.AddElementEventHandler<DebugLoggingButtonEventHandlers>();

        App.RemoveElementEventHandler<DebugLoggingButtonEventHandlers>();
    }

    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Explanations
------------
```csharp
public override void TestsArrange()
{
     App.AddElementEventHandler<DebugLoggingButtonEventHandlers>();
}
```
Once you have created the **EventHandlers** class, you need to tell BELLATRIX to use it. To do so call the **App** service method.

**Note**: *Usually, we add element event handlers in the **AssemblyInitialize** method which is called once for a test run.*

```csharp
App.RemoveElementEventHandler<DebugLoggingButtonEventHandlers>();
```
If you need to remove it during the run you can use the method bellow.

Each BELLATRIX Ensure method gives you a hook too. To implement them you can derive the **EnsureExtensionsEventHandlers** base class and override the event handler methods you need. For example for the method **EnsureIsChecked**, **EnsuredIsCheckedEvent** event is called after the check is done.