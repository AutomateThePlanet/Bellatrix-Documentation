---
layout: default
title:  "TouchActionsService"
excerpt: "Learn how to use BELLATRIX Android TouchActionsService."
date:   2021-06-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/touch-actions-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".graphics.TouchRotateActivity",
    Lifecycle.RestartEveryTime)]
public class TouchActionsServiceTests : AndroidTest
{
    [Test]
    public void ElementSwiped_When_CallSwipeByCoordinatesMethod()
    {
        App.AppService.StartActivity("io.appium.android.apis", ".graphics.FingerPaint");

        var textField = App.Components.CreateByIdContaining<TextField>("content");
        Point point = textField.Location;
        Size size = textField.Size;

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
        App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".ApiDemos");

        var elements = App.Components.CreateAllByClass<TextField>("android.widget.TextView");
        int initialCount = elements.Count();

        App.TouchActions.Tap(elements[4], 10).Perform();

        elements = App.Components.CreateAllByClass<TextField>("android.widget.TextView");

        Assert.AreNotEqual(initialCount, elements.Count());
        Assert.AreEqual(1, elements.Count());
    }

    [Test]
    public void ElementSwiped_When_CallPressWaitMoveToAndReleaseByCoordinates()
    {
        App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".ApiDemos");

        var elements = App.Components.CreateAllByClass<TextField>("android.widget.TextView");
        var locationOne = elements[7].Location;
        var locationTwo = elements[1].Location;

        App.TouchActions.Press(locationOne.X, locationOne.Y, 100).
            MoveTo(locationTwo.X, locationTwo.Y).
            Release().
            Perform();

        elements = App.Components.CreateAllByClass<TextField>("android.widget.TextView");

        Assert.AreNotEqual(elements[7].Location.Y, elements[1].Location.Y);
    }

    [Test]
    public void TwoTouchActionExecutedInOneMultiAction_When_CallPerformAllActions()
    {
        App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".ApiDemos");
        string originalActivity = App.AppService.CurrentActivity;

        var elements = App.Components.CreateAllByClass<TextField>("android.widget.TextView");

        // Executes two multi actions.
        var tapOne = App.TouchActions.Press(elements[5], 1500).Release();
        App.TouchActions.AddNewAction(tapOne);
        App.TouchActions.AddNewAction(tapOne);
        App.TouchActions.PerformAllActions();
        elements = App.Components.CreateAllByClass<TextField>("android.widget.TextView");

        var tapTwo = App.TouchActions.Press(elements[1], 1500).Release();
        App.TouchActions.AddNewAction(tapTwo);
        App.TouchActions.AddNewAction(tapTwo);
        App.TouchActions.PerformAllActions();

        Assert.AreNotEqual(originalActivity, App.AppService.CurrentActivity);
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
App.TouchActions.Tap(elements[4], 10).Perform();
```
Tap 10 times using BELLATRIX UI element directly.
```csharp
App.TouchActions.Press(locationOne.X, locationOne.Y, 100).
    MoveTo(locationTwo.X, locationTwo.Y).
    Release().
    Perform();
```
Performs a series of actions using elements coordinates.
```csharp
var swipe = App.TouchActions.Press(locationOne.X, locationOne.Y, 100).
    MoveTo(locationTwo.X, locationTwo.Y).
    Release();
App.TouchActions.AddNewAction(swipe);
App.TouchActions.PerformAllActions();
```
Performs multiple actions.
```csharp
var tapOne = App.TouchActions.Press(elements[5], 1500).Release();
App.TouchActions.AddNewAction(tapOne);
App.TouchActions.AddNewAction(tapOne);
App.TouchActions.PerformAllActions();
elements = App.Components.CreateAllByClass<TextField>("android.widget.TextView");

var tapTwo = App.TouchActions.Press(elements[1], 1500).Release();
App.TouchActions.AddNewAction(tapTwo);
App.TouchActions.AddNewAction(tapTwo);
App.TouchActions.PerformAllActions();
```
Executes two multi actions.