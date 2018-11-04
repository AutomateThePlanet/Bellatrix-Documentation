---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


200+ Assertions
```csharp
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
public class LayoutTestingTests : DesktopTest
{
    [TestMethod]
    public void CommonActionsWithDesktopControls_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("purchaseButton");
        var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");
        var selectedRadioButton = App.ElementCreateService.CreateByName<RadioButton>("selectedRadioButton");

        button.AssertAboveOf(calendar);

        saturnVAnchor.AssertNearBottomRightOf(sortDropDown);
        sortDropDown.AssertNearTopLeftOf(saturnVAnchor);

        LayoutAssert.AssertAlignedHorizontallyAll(button, bcalendar);
        
        LayoutAssert.AssertAlignedVerticallyLeft(radioButton, selectedRadioButton);

        button.AssertHeightLessThan(100);
        button.AssertWidthBetween(70, 80);
    }
}
```

Depending on what you want to check, Bellatrix gives lots of options. You can test px perfect or just that some element is below another. Check that the purchase button is above the calendar.
```csharp
button.AssertAboveOf(calendar);
```

Assert with the exact distance between them.
```csharp
button.AssertAboveOf(calendar, 106);
```


For each available method, you have variations of it such as, >, >=, <, <=, between and approximate to some expected value by specified %.
```csharp
button.AssertAboveOfGreaterThan(calendar, 100);
button.AssertAboveOfGreaterThanOrEqual(calendar, 106);
button.AssertAboveOfLessThan(calendar, 110);
button.AssertAboveOfLessThanOrEqual(calendar, 106);
```

The expected distance is ~105px with 10% tolerance.
```csharp
button.AssertAboveOfApproximate(calendar, 105, percent: 10);
```

You can test whether different desktop elements are aligned correctly.
```csharp
LayoutAssert.AssertAlignedHorizontallyAll(button, button1);
LayoutAssert.AssertAlignedHorizontallyCentered(protonRocketAnchor, protonMAnchor, saturnVAnchor);
LayoutAssert.AssertAlignedHorizontallyBottom(protonRocketAnchor, protonMAnchor, saturnVAnchor);


LayoutAssert.AssertAlignedVerticallyAll(falcon9Anchor, falconHeavyAnchor);
```


Verify the height and width of elements.
```csharp
saturnVRating.AssertHeightLessThan(100);
saturnVRating.AssertWidthBetween(50, 70);
```

Verify the height and width of elements.
```csharp
saturnVRating.AssertHeightLessThan(100);
saturnVRating.AssertWidthBetween(50, 70);
```


15+ Predefined Resolutions888

```csharp
[App(Constants.WpfAppPath, DesktopWindowSize._1280_1024,  AppBehavior.RestartEveryTime)]
```

```csharp
[App(Constants.WpfAppPath, MobileWindowSize._360_640, AppBehavior.RestartEveryTime)]
```

```csharp
[App(Constants.WpfAppPath, TabletWindowSize._600_1024,  AppBehavior.RestartEveryTime)]
```

Custom Resolutions
```csharp
[App(Constants.WpfAppPath, width: 600, height: 900, behavior: AppBehavior.RestartEveryTime)]
```