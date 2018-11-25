---
layout: default
title:  "TouchActionsService"
excerpt: "Learn how to use BELLATRIX Android TouchActionsService."
date:   2018-06-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/touch-actions-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".graphics.TouchRotateActivity",
    AppBehavior.RestartEveryTime)]
public class TouchActionsServiceTests : AndroidTest
{
    [TestMethod]
    public void ElementSwiped_When_CallSwipeByCoordinatesMethod()
    {
        App.AppService.StartActivity("io.appium.android.apis", ".graphics.FingerPaint");

        var textField = App.ElementCreateService.CreateByIdContaining<TextField>("content");
        Point point = textField.Location;
        Size size = textField.Size;

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
        App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".ApiDemos");

        var elements = App.ElementCreateService.CreateAllByClass<TextField>("android.widget.TextView");
        int initialCount = elements.Count();

        App.TouchActionsService.Tap(elements[4], 10).Perform();

        elements = App.ElementCreateService.CreateAllByClass<TextField>("android.widget.TextView");

        Assert.AreNotEqual(initialCount, elements.Count());
        Assert.AreEqual(1, elements.Count());
    }

    [TestMethod]
    public void ElementSwiped_When_CallPressWaitMoveToAndReleaseByCoordinates()
    {
        App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".ApiDemos");

        var elements = App.ElementCreateService.CreateAllByClass<TextField>("android.widget.TextView");
        var locationOne = elements[7].Location;
        var locationTwo = elements[1].Location;

        App.TouchActionsService.Press(locationOne.X, locationOne.Y, 100).
            MoveTo(locationTwo.X, locationTwo.Y).
            Release().
            Perform();

        elements = App.ElementCreateService.CreateAllByClass<TextField>("android.widget.TextView");

        Assert.AreNotEqual(elements[7].Location.Y, elements[1].Location.Y);
    }

    [TestMethod]
    [Ignore]
    public void TwoTouchActionExecutedInOneMultiAction_When_CallPerformAllActions()
    {
        App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".ApiDemos");
        string originalActivity = App.AppService.CurrentActivity;

        var elements = App.ElementCreateService.CreateAllByClass<TextField>("android.widget.TextView");

        // Executes two multi actions.
        var tapOne = App.TouchActionsService.Press(elements[5], 1500).Release();
        App.TouchActionsService.AddNewAction(tapOne);
        App.TouchActionsService.AddNewAction(tapOne);
        App.TouchActionsService.PerformAllActions();
        elements = App.ElementCreateService.CreateAllByClass<TextField>("android.widget.TextView");

        var tapTwo = App.TouchActionsService.Press(elements[1], 1500).Release();
        App.TouchActionsService.AddNewAction(tapTwo);
        App.TouchActionsService.AddNewAction(tapTwo);
        App.TouchActionsService.PerformAllActions();

        Assert.AreNotEqual(originalActivity, App.AppService.CurrentActivity);
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
App.TouchActionsService.Tap(elements[4], 10).Perform();
```
Tap 10 times using BELLATRIX UI element directly.
```csharp
App.TouchActionsService.Press(locationOne.X, locationOne.Y, 100).
    MoveTo(locationTwo.X, locationTwo.Y).
    Release().
    Perform();
```
Performs a series of actions using elements coordinates.
```csharp
var swipe = App.TouchActionsService.Press(locationOne.X, locationOne.Y, 100).
    MoveTo(locationTwo.X, locationTwo.Y).
    Release();
App.TouchActionsService.AddNewAction(swipe);
App.TouchActionsService.PerformAllActions();
```
Performs multiple actions.
```csharp
var tapOne = App.TouchActionsService.Press(elements[5], 1500).Release();
App.TouchActionsService.AddNewAction(tapOne);
App.TouchActionsService.AddNewAction(tapOne);
App.TouchActionsService.PerformAllActions();
elements = App.ElementCreateService.CreateAllByClass<TextField>("android.widget.TextView");

var tapTwo = App.TouchActionsService.Press(elements[1], 1500).Release();
App.TouchActionsService.AddNewAction(tapTwo);
App.TouchActionsService.AddNewAction(tapTwo);
App.TouchActionsService.PerformAllActions();
```
Executes two multi actions.