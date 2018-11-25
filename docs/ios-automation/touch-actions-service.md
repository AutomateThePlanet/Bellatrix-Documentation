---
layout: default
title:  "TouchActionsService"
excerpt: "Learn how to use BELLATRIX iOS TouchActionsService."
date:   2018-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/touch-actions-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    AppBehavior.RestartEveryTime)]
public class TouchActionsServiceTests : IOSTest
{
    [TestMethod]
    public void ElementSwiped_When_CallSwipeByCoordinatesMethod()
    {
        var textField = App.ElementCreateService.CreateById<TextField>("IntegerA");
        Point point = textField.Location;
        Size size = textField.Size;

        App.TouchActionsService.Swipe(
            point.X + 5,
            point.Y + 5,
            point.X + size.Width - 5,
            point.Y + size.Height - 5,
            200);

        App.TouchActionsService.Swipe(
            point.X + size.Width - 5,
            point.Y + 5,
            point.X + 5,
            point.Y + size.Height - 5,
            2000);
    }

    [TestMethod]
    public void ElementTaped_When_CallTap()
    {
        var buttons = App.ElementCreateService.CreateAllByClass<Button>("XCUIElementTypeButton");

        App.TouchActionsService.Tap(buttons[0], 10).Perform();
    }

    [TestMethod]
    public void ElementSwiped_When_CallPressWaitMoveToAndReleaseByCoordinates()
    {
        var element = App.ElementCreateService.CreateByName<Element>("AppElem");
        int end = element.Size.Width;
        int y = element.Location.Y;
        int moveTo = (9 / 100) * end;

        App.TouchActionsService.Press(moveTo, y, 0).Release().Perform();
    }

    [TestMethod]
    public void ElementSwiped_When_CallPressWaitMoveToAndReleaseByCoordinatesMultiAction()
    {
        var element = App.ElementCreateService.CreateByName<Element>("AppElem");
        int end = element.Size.Width;
        int y = element.Location.Y;
        int moveTo = (9 / 100) * end;

        var swipe = App.TouchActionsService.Press(moveTo, y, 0).Release();
        App.TouchActionsService.AddNewAction(swipe);
        App.TouchActionsService.PerformAllActions();
    }

    [TestMethod]
    public void TwoTouchActionExecutedInOneMultiAction_When_CallPerformAllActions()
    {
        var buttons = App.ElementCreateService.CreateAllByClass<Button>("XCUIElementTypeButton");

        var tapOne = App.TouchActionsService.Tap(buttons[0], 10);
        App.TouchActionsService.AddNewAction(tapOne);
        App.TouchActionsService.AddNewAction(tapOne);
        App.TouchActionsService.PerformAllActions();

        var tapTwo = App.TouchActionsService.Tap(buttons[0], 10);
        App.TouchActionsService.AddNewAction(tapTwo);
        App.TouchActionsService.AddNewAction(tapTwo);
        App.TouchActionsService.PerformAllActions();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with touch actions through TouchActionsService. Performing a series of touch actions can be one of the most complicated jobs in automating mobile apps. BELLATRIX touch APIs are simplified and made to be user-friendly as possible. Their usage can eliminate lots of code duplication and boilerplate code.
```csharp
App.TouchActionsService.Swipe(
    point.X + 5,
    point.Y + 5,
    point.X + size.Width - 5,
    point.Y + size.Height - 5,
    200);
```
Performs swipe by using coordinates.
```csharp
App.TouchActionsService.Tap(buttons[0], 10).Perform();
```
Tap 10 times using BELLATRIX UI element directly.
```csharp
App.TouchActionsService.Press(moveTo, y, 0).Release().Perform();
```
Performs a series of actions using elements coordinates.
```csharp
var swipe = App.TouchActionsService.Press(moveTo, y, 0).Release();
App.TouchActionsService.AddNewAction(swipe);
App.TouchActionsService.PerformAllActions();
```
Performs multiple actions.
```csharp
var tapOne = App.TouchActionsService.Tap(buttons[0], 10);
App.TouchActionsService.AddNewAction(tapOne);
App.TouchActionsService.AddNewAction(tapOne);
App.TouchActionsService.PerformAllActions();

var tapTwo = App.TouchActionsService.Tap(buttons[0], 10);
App.TouchActionsService.AddNewAction(tapTwo);
App.TouchActionsService.AddNewAction(tapTwo);
App.TouchActionsService.PerformAllActions();
```
Executes two multi actions.