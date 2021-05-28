---
layout: default
title:  "TouchActionsService"
excerpt: "Learn how to use BELLATRIX iOS TouchActionsService."
date:   2021-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/touch-actions-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
public class TouchActionsServiceTests : IOSTest
{
    [Test]
    public void ElementSwiped_When_CallSwipeByCoordinatesMethod()
    {
        var textField = App.Components.CreateById<TextField>("IntegerA");
        Point point = textField.Location;
        Size size = textField.Size;

        App.TouchActions.Swipe(
            point.X + 5,
            point.Y + 5,
            point.X + size.Width - 5,
            point.Y + size.Height - 5,
            200);

        App.TouchActions.Swipe(
            point.X + size.Width - 5,
            point.Y + 5,
            point.X + 5,
            point.Y + size.Height - 5,
            2000);
    }

    [Test]
    public void ElementTaped_When_CallTap()
    {
        var buttons = App.Components.CreateAllByClass<Button>("XCUIElementTypeButton");

        App.TouchActions.Tap(buttons[0], 10).Perform();
    }

    [Test]
    public void ElementSwiped_When_CallPressWaitMoveToAndReleaseByCoordinates()
    {
        var element = App.Components.CreateByName<Element>("AppElem");
        int end = component.Size.Width;
        int y = component.Location.Y;
        int moveTo = (9 / 100) * end;

        App.TouchActions.Press(moveTo, y, 0).Release().Perform();
    }

    [Test]
    public void ElementSwiped_When_CallPressWaitMoveToAndReleaseByCoordinatesMultiAction()
    {
        var element = App.Components.CreateByName<Element>("AppElem");
        int end = component.Size.Width;
        int y = component.Location.Y;
        int moveTo = (9 / 100) * end;

        var swipe = App.TouchActions.Press(moveTo, y, 0).Release();
        App.TouchActions.AddNewAction(swipe);
        App.TouchActions.PerformAllActions();
    }

    [Test]
    public void TwoTouchActionExecutedInOneMultiAction_When_CallPerformAllActions()
    {
        var buttons = App.Components.CreateAllByClass<Button>("XCUIElementTypeButton");

        var tapOne = App.TouchActions.Tap(buttons[0], 10);
        App.TouchActions.AddNewAction(tapOne);
        App.TouchActions.AddNewAction(tapOne);
        App.TouchActions.PerformAllActions();

        var tapTwo = App.TouchActions.Tap(buttons[0], 10);
        App.TouchActions.AddNewAction(tapTwo);
        App.TouchActions.AddNewAction(tapTwo);
        App.TouchActions.PerformAllActions();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with touch actions through TouchActionsService. Performing a series of touch actions can be one of the most complicated jobs in automating mobile apps. BELLATRIX touch APIs are simplified and made to be user-friendly as possible. Their usage can eliminate lots of code duplication and boilerplate code.
```csharp
App.TouchActions.Swipe(
    point.X + 5,
    point.Y + 5,
    point.X + size.Width - 5,
    point.Y + size.Height - 5,
    200);
```
Performs swipe by using coordinates.
```csharp
App.TouchActions.Tap(buttons[0], 10).Perform();
```
Tap 10 times using BELLATRIX UI element directly.
```csharp
App.TouchActions.Press(moveTo, y, 0).Release().Perform();
```
Performs a series of actions using elements coordinates.
```csharp
var swipe = App.TouchActions.Press(moveTo, y, 0).Release();
App.TouchActions.AddNewAction(swipe);
App.TouchActions.PerformAllActions();
```
Performs multiple actions.
```csharp
var tapOne = App.TouchActions.Tap(buttons[0], 10);
App.TouchActions.AddNewAction(tapOne);
App.TouchActions.AddNewAction(tapOne);
App.TouchActions.PerformAllActions();

var tapTwo = App.TouchActions.Tap(buttons[0], 10);
App.TouchActions.AddNewAction(tapTwo);
App.TouchActions.AddNewAction(tapTwo);
App.TouchActions.PerformAllActions();
```
Executes two multi actions.