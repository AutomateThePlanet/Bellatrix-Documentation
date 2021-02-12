---
layout: default
title:  "Extensibility- Element Action Hooks"
excerpt: "Learn how to extend BELLATRIX desktop element controls using element action hooks."
date:   2018-06-23 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/extensibility-element-action-hooks/
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
- **Hovering** - an event executed before button hover
- **Hovered** - an event executed after the button is hovered

You need to implement the event handlers for these events and subscribe them. BELLATRIX gives you again a shortcut- you need to create a class and inherit the **{ControlName}EventHandlers** In the example, **DebugLogger** is called for each button event printing to Debug window the coordinates of the button. You can call external logging provider, making screenshots before or after each action, the possibilities are limitless.

Example
-------
```csharp
public class DebugLoggingButtonEventHandlers : ButtonEventHandlers
{
    protected override void ClickingEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before clicking button. Coordinates: X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }

    protected override void ClickedEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"After button clicked. Coordinates: X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }

    protected override void HoveringEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before hovering button. Coordinates: X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }

    protected override void HoveredEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"After button hovered. Coordinates: X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }
}
```
```csharp
[TestClass]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class ElementActionHooksTests : DesktopTest
{
    public override void TestsArrange()
    {
        App.AddElementEventHandler<DebugLoggingButtonEventHandlers>();
    }

    [TestMethod]
    public void CommonActionsWithDesktopControls_Wpf()
    {
        var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");

        Assert.AreEqual(false, calendar.IsDisabled);

        var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");

        checkBox.Check();

        Assert.IsTrue(checkBox.IsChecked);

        var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("select");

        comboBox.SelectByText("Item2");

        Assert.AreEqual("Item2", comboBox.InnerText);

        var label = App.ElementCreateService.CreateByName<Label>("Result Label");

        Assert.IsTrue(label.IsPresent);

        var radioButton = App.ElementCreateService.CreateByName<RadioButton>("RadioButton");

        radioButton.Click();

        Assert.IsTrue(radioButton.IsChecked);
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