---
layout: default
title:  "Layout Testing"
excerpt: "Learn how to use the BELLATRIX layout testing library."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/layout-testing/
anchors:
  example: Example
  explanations: Explanations
  bdd-logging: BDD Logging
  all-available-layout-assertion-methods: All Available Methods
---
Example
-------
```csharp
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class LayoutTestingTests : DesktopTest
{
    [TestMethod]
    public void CommonActionsWithDesktopControls_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("E Button");
        var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");
        var radioButton = App.ElementCreateService.CreateByName<RadioButton>("RadioButton");
        var selectedRadioButton = App.ElementCreateService.CreateByName<RadioButton>("SelectedRadioButton");

        button.AssertAboveOf(calendar);

        button.AssertAboveOf(calendar, 106);
        button.AssertAboveOfGreaterThan(calendar, 100);
        button.AssertAboveOfGreaterThanOrEqual(calendar, 106);
        button.AssertAboveOfLessThan(calendar, 110);
        button.AssertAboveOfLessThanOrEqual(calendar, 106);

        button.AssertNearTopOfGreaterThan(calendar, 100);
        button.AssertNearTopOfGreaterThanOrEqual(calendar, 106);
        button.AssertNearTopOfLessThan(calendar, 107);
        button.AssertNearTopOfLessThanOrEqual(calendar, 106);

        button.AssertAboveOfApproximate(calendar, 105, percent: 10);

        button.AssertAboveOfBetween(calendar, 100, 115);

        saturnVAnchor.AssertNearBottomRightOf(sortDropDown);
        sortDropDown.AssertNearTopLeftOf(saturnVAnchor);

        LayoutAssert.AssertAlignedHorizontallyAll(button, button1);
        LayoutAssert.AssertAlignedHorizontallyCentered(protonRocketAnchor, protonMAnchor, saturnVAnchor);
        LayoutAssert.AssertAlignedHorizontallyBottom(protonRocketAnchor, protonMAnchor, saturnVAnchor);
        
        LayoutAssert.AssertAlignedVerticallyLeft(radioButton, selectedRadioButton);

        LayoutAssert.AssertAlignedVerticallyCentered(radioButton, selectedRadioButton);
        LayoutAssert.AssertAlignedVerticallyRight(radioButton, selectedRadioButton);

        firstNumber.AssertInsideOf(calendar);

        button.AssertHeightLessThan(100);
        button.AssertWidthBetween(70, 80);
    }
}
```

Explanations
------------
Layout testing is a module from BELLATRIX that allows you to test the responsiveness of your app.
```csharp
using Bellatrix.Layout;
```
You need to add a using statement to Bellatrix.Layout
```csharp
[App(Constants.WpfAppPath, MobileWindowSize._360_640,  Lifecycle.RestartEveryTime)]
```
```csharp
[App(Constants.WpfAppPath, TabletWindowSize._600_1024,  Lifecycle.RestartEveryTime)]
```
```csharp
[App(Constants.WpfAppPath, width: 600, height: 900, behavior: Lifecycle.RestartEveryTime)]
```
```csharp
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
```
After that 100 assertion extensions methods are available to you to check the exact position of your desktop elements. App attribute gives you the option to resize your browser window so that you can test the rearrangement of the elements on your screens. To make it, even more, easier for you, we included a couple of enums containing the most popular desktop, mobile and tablet resolutions. Of course, you always have the option to set a custom size.
```csharp
button.AssertAboveOf(calendar);
```
Depending on what you want to check, BELLATRIX gives lots of options. You can test px perfect or just that some element is below another. Check that the button is above the calendar.
```csharp
button.AssertAboveOf(calendar, 106);
```
Assert with the exact distance between them.
All layout assertion methods throw LayoutAssertFailedException if the check is not successful with beatified troubleshooting message:
/########################################

            control (Name = E Button) should be 41 px above of control (name = calendar) but was 42 px.

/########################################
```csharp
button.AssertAboveOfGreaterThan(calendar, 100);
button.AssertAboveOfGreaterThanOrEqual(calendar, 106);
button.AssertAboveOfLessThan(calendar, 110);
button.AssertAboveOfLessThanOrEqual(calendar, 106);
```
For each available method you have variations of it such as, >, >=, <, <=, between and approximate to some expected value by specified %.
```csharp
button.AssertNearTopOfGreaterThan(calendar, 100);
button.AssertNearTopOfGreaterThanOrEqual(calendar, 106);
button.AssertNearTopOfLessThan(calendar, 107);
button.AssertNearTopOfLessThanOrEqual(calendar, 106);
```
All assertions have alternative names containing the word 'Near'. We added them to make your tests more readable depending on your preference.
```csharp
button.AssertAboveOfApproximate(calendar, 105, percent: 10);
```
The expected distance is ~40px with 10% tolerance
```csharp
button.AssertAboveOfBetween(calendar, 100, 115);
```
The expected px distance is between 100 and 115 px.
```csharp
saturnVAnchor.AssertNearBottomRightOf(sortDropDown);
sortDropDown.AssertNearTopLeftOf(saturnVAnchor);
```
You can assert the position of elements again each other in all directions- above, below, right, left, top right, top left, below left, below right.
```csharp
LayoutAssert.AssertAlignedHorizontallyAll(button, button1);
LayoutAssert.AssertAlignedHorizontallyCentered(protonRocketAnchor, protonMAnchor, saturnVAnchor);
LayoutAssert.AssertAlignedHorizontallyBottom(protonRocketAnchor, protonMAnchor, saturnVAnchor);
```
You can tests whether different elements are aligned correctly.
```csharp
LayoutAssert.AssertAlignedVerticallyLeft(radioButton, selectedRadioButton);
LayoutAssert.AssertAlignedVerticallyCentered(radioButton, selectedRadioButton);
LayoutAssert.AssertAlignedVerticallyRight(radioButton, selectedRadioButton);
```
You can check vertical alignment as well.
```csharp
firstNumber.AssertInsideOf(calendar);
```
You can check that some element is inside in another.
```csharp
button.AssertHeightLessThan(100);
button.AssertWidthBetween(70, 80);
```
Verify the height and width of elements.

BDD Logging
-----------
All layout assertion methods have full BDD logging support. Below you can find the generated BDD log. Of course if you use BELLATRIX page objects the log looks even better as mentioned in previous chapters.

```
>Start Test
>Class = LayoutTestingTests Name = TestPageLayout
>Assert control (Name = Transfer Button) is above of control (automationId = calendar).
>Assert control (Name = Transfer Button) is 42 px above of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is >40 px above of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is >=41 px above of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is <50 px above of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is <=43 px above of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is >40 px near top of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is >=41 px near top of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is <50 px near top of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is <=43 px near top of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is 40 px above of control (automationId = TransferCalendar). (10% tolerance)
>Assert control (Name = Transfer Button) is 30-50 px above of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is near bottom of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is near right of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is near top of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is near left of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is left inside of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is right inside of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is top inside of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) is bottom inside of control (automationId = TransferCalendar).
>Assert control (Name = Transfer Button) height is <100 px.
>Assert control (Name = Transfer Button) width is 50-70 px.
```

All Available Layout Assertion Methods
--------------------------------------

### AssertWidth ###
- AssertWidthBetween
- AssertWidthGreaterThan
- AssertWidthGreaterThanOrEqual
- AssertWidthLessThan
- AssertWidthLessThanOrEqual
- AssertWidthApproximate

### AssertHeight ###
- AssertHeightBetween
- AssertHeightGreaterThan
- AssertHeightGreaterThanOrEqual
- AssertHeightLessThan
- AssertHeightLessThanOrEqual
- AssertHeightApproximate

### AssertAboveOf ###
- AssertAboveOf
- AssertAboveOfBetween
- AssertAboveOfGreaterThan
- AssertAboveOfGreaterThanOrEqual
- AssertAboveOfLessThan
- AssertAboveOfLessThanOrEqual
- AssertAboveOfApproximate

### AssertBelowOf ###
- AssertBelowOf
- AssertBelowOfBetween
- AssertBelowOfGreaterThan
- AssertBelowOfGreaterThanOrEqual
- AssertBelowOfLessThan
- AssertBelowOfLessThanOrEqual
- AssertBelowOfApproximate

### AssertRightOf ###
- AssertRightOf
- AssertRightOfBetween
- AssertRightOfGreaterThan
- AssertRightOfGreaterThanOrEqual
- AssertRightOfLessThan
- AssertRightOfLessThanOrEqual
- AssertRightOfApproximate

### AssertLeftOf ### 
- AssertLeftOfBetween
- AssertLeftOfGreaterThan
- AssertLeftOfGreaterThanOrEqual
- AssertLeftOfLessThan
- AssertLeftOfLessThanOrEqual
- AssertLeftOfApproximate

### AssertNearTopOf ### 
- AssertNearTopOf
- AssertNearTopOfBetween
- AssertNearTopOfGreaterThan
- AssertNearTopOfGreaterThanOrEqual
- AssertNearTopOfLessThan
- AssertNearTopOfLessThanOrEqual
- AssertNearTopOfApproximate

### AssertNearLeftOf ### 
- AssertNearLeftOf
- AssertNearLeftOfBetween
- AssertNearLeftOfGreaterThan
- AssertNearLeftOfGreaterThanOrEqual
- AssertNearLeftOfLessThan
- AssertNearLeftOfLessThanOrEqual
- AssertNearLeftOfApproximate

### AssertNearRightOf ###
- AssertNearRightOf
- AssertNearRightOfBetween
- AssertNearRightOfGreaterThan
- AssertNearRightOfGreaterThanOrEqual
- AssertNearRightOfLessThan
- AssertNearRightOfLessThanOrEqual
- AssertNearRightOfApproximate

### AssertNearTopLeftOf ### 
- AssertNearTopLeftOf
- AssertNearTopLeftOfBetween
- AssertNearTopLeftOfGreaterThan
- AssertNearTopLeftOfGreaterThanOrEqual
- AssertNearTopLeftOfLessThan
- AssertNearTopLeftOfLessThanOrEqual
- AssertNearTopLeftOfApproximate

### AssertNearTopRightOf ### 
- AssertNearTopRightOf
- AssertNearTopRightOfBetween
- AssertNearTopRightOfGreaterThan
- AssertNearTopRightOfGreaterThanOrEqual
- AssertNearTopRightOfLessThan
- AssertNearTopRightOfLessThanOrEqual
- AssertNearTopRightOfApproximate

### AssertNearBottomOf ### 
- AssertNearBottomOf
- AssertNearBottomOfBetween
- AssertNearBottomOfGreaterThan
- AssertNearBottomOfGreaterThanOrEqual
- AssertNearBottomOfLessThan
- AssertNearBottomOfLessThanOrEqual
- AssertNearBottomOfApproximate

### AssertNearBottomLeftOf ### 
- AssertNearBottomLeftOfBetween
- AssertNearBottomLeftOfGreaterThan
- AssertNearBottomLeftOfGreaterThanOrEqual
- AssertNearBottomLeftOfLessThan
- AssertNearBottomLeftOfLessThanOrEqual
- AssertNearBottomLeftOfApproximate

### AssertNearBottomRightOf ### 
- AssertNearBottomRightOf
- AssertNearBottomRightOfBetween
- AssertNearBottomRightOfGreaterThan
- AssertNearBottomRightOfGreaterThanOrEqual
- AssertNearBottomRightOfLessThan
- AssertNearBottomRightOfLessThanOrEqual
- AssertNearBottomRightOfApproximate

### AssertTopInsideOf ### 
- AssertTopInsideOf
- AssertTopInsideOfBetween
- AssertTopInsideOfGreaterThan
- AssertTopInsideOfGreaterThanOrEqual
- AssertTopInsideOfLessThan
- AssertTopInsideOfLessThanOrEqual
- AssertTopInsideOfApproximate

### AssertBottomInsideOf ### 
- AssertBottomInsideOf
- AssertBottomInsideOfBetween
- AssertBottomInsideOfGreaterThan
- AssertBottomInsideOfGreaterThanOrEqual
- AssertBottomInsideOfLessThan
- AssertBottomInsideOfLessThanOrEqual
- AssertBottomInsideOfApproximate

### AssertRightInsideOf ### 
- AssertRightInsideOf
- AssertRightInsideOfBetween
- AssertRightInsideOfGreaterThan
- AssertRightInsideOfGreaterThanOrEqual
- AssertRightInsideOfLessThan
- AssertRightInsideOfLessThanOrEqual
- AssertRightInsideOfApproximate

### AssertLeftInsideOf ### 
- AssertLeftInsideOf
- AssertLeftInsideOfBetween
- AssertLeftInsideOfGreaterThan
- AssertLeftInsideOfGreaterThanOrEqual
- AssertLeftInsideOfLessThan
- AssertLeftInsideOfLessThanOrEqual
- AssertLeftInsideOfApproximate

### AssertTopLeftInsideOf ### 
- AssertTopLeftInsideOf
- AssertTopLeftInsideOfBetween
- AssertTopLeftInsideOfGreaterThan
- AssertTopLeftInsideOfGreaterThanOrEqual
- AssertTopLeftInsideOfLessThan
- AssertTopLeftInsideOfLessThanOrEqual
- AssertTopLeftInsideOfApproximate

### AssertTopRightInsideOf ### 
- AssertTopRightInsideOf
- AssertTopRightInsideOfBetween
- AssertTopRightInsideOfGreaterThan
- AssertTopRightInsideOfGreaterThanOrEqual
- AssertTopRightInsideOfLessThan
- AssertTopRightInsideOfLessThanOrEqual
- AssertTopRightInsideOfApproximate

### AssertBottomLeftInsideOf ### 
- AssertBottomLeftInsideOfBetween
- AssertBottomLeftInsideOfGreaterThan
- AssertBottomLeftInsideOfGreaterThanOrEqual
- AssertBottomLeftInsideOfLessThan
- AssertBottomLeftInsideOfLessThanOrEqual
- AssertBottomLeftInsideOfApproximate

### AssertBottomRightInsideOf ### 
- AssertBottomRightInsideOfLessThan
- AssertBottomRightInsideOfLessThanOrEqual
- AssertBottomRightInsideOfApproximate
- AssertBottomRightInsideOfBetween
- AssertBottomRightInsideOfGreaterThan
- AssertBottomRightInsideOfGreaterThanOrEqual

### AssertCenteredInsideOf ### 
- AssertCenteredInsideOf
- AssertCenteredInsideOfBetween
- AssertCenteredInsideOfGreaterThan
- AssertCenteredInsideOfGreaterThanOrEqual
- AssertCenteredInsideOfLessThan
- AssertCenteredInsideOfLessThanOrEqual
- AssertCenteredInsideOfApproximate

### AssertAlignedVerticallyAll ### 
- AssertAlignedVerticallyCentered
- AssertAlignedVerticallyRight
- AssertAlignedVerticallyLeft
- AssertAlignedHorizontallyAll
- AssertAlignedHorizontallyCentered
- AssertAlignedHorizontallyTop
- AssertAlignedHorizontallyBottom