---
layout: default
title:  "Layout Testing"
excerpt: "Learn how to use the BELLATRIX layout testing library."
date:   2018-10-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/layout-testing/
anchors:
  example: Example
  explanations: Explanations
  bdd-logging: BDD Logging
  all-available-layout-assertion-methods: All Available Methods
---
Example
-------
```csharp
[TestMethod]
public void TestPageLayout()
{
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");
    var secondButton = App.ElementCreateService.CreateByIdContaining<Button>("button_disabled");
    var checkBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check1");
    var secondCheckBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check2");
    var mainElement = App.ElementCreateService.CreateById<Element>("android:id/content");

    button.AssertAboveOf(checkBox);

    button.AssertAboveOf(checkBox, 105);

    button.AssertAboveOfGreaterThan(checkBox, 100);
    button.AssertAboveOfGreaterThanOrEqual(checkBox, 105);
    button.AssertAboveOfLessThan(checkBox, 110);
    button.AssertAboveOfLessThanOrEqual(checkBox, 105);

    button.AssertNearTopOfGreaterThan(checkBox, 100);
    button.AssertNearTopOfGreaterThanOrEqual(checkBox, 105);
    button.AssertNearTopOfLessThan(checkBox, 106);
    button.AssertNearTopOfLessThanOrEqual(checkBox, 105);

    button.AssertAboveOfApproximate(checkBox, 104, percent: 10);

    button.AssertAboveOfBetween(checkBox, 100, 120);

    checkBox.AssertNearBottomRightOf(button);
    button.AssertNearTopLeftOf(checkBox);

    LayoutAssert.AssertAlignedHorizontallyAll(button, secondButton);

    LayoutAssert.AssertAlignedHorizontallyTop(button, secondButton);
    LayoutAssert.AssertAlignedHorizontallyCentered(button, secondButton, secondButton);
    LayoutAssert.AssertAlignedHorizontallyBottom(button, secondButton, secondButton);

    LayoutAssert.AssertAlignedVerticallyAll(secondCheckBox, checkBox);

    LayoutAssert.AssertAlignedVerticallyLeft(secondCheckBox, checkBox);
    LayoutAssert.AssertAlignedVerticallyCentered(secondCheckBox, checkBox);
    LayoutAssert.AssertAlignedVerticallyRight(secondCheckBox, checkBox);

    button.AssertInsideOf(mainElement);

    button.AssertHeightLessThan(100);
    button.AssertWidthBetween(50, 80);
}
```

Explanations
------------
Layout testing is a module from BELLATRIX that allows you to test the responsiveness of your app.
```csharp
using Bellatrix.Layout;
```
You need to add a using statement to **Bellatrix.Layout**. After that 100 assertion extensions methods are available to you to check the exact position of your Android elements.
```csharp
button.AssertAboveOf(checkBox);
```
Depending on what you want to check, BELLATRIX gives lots of options. You can test PX perfect or just that some element is below another. Check that the button is above the CheckBox.
```csharp
button.AssertAboveOf(checkBox, 105);
```
Assert with the exact distance between them.
All layout assertion methods throw **LayoutAssertFailedException** if the check is not successful with beautified troubleshooting message:
/########################################

             control (ID = button) should be 41 px above of control (ID = check1) but was 105 px.

/########################################
```csharp
button.AssertAboveOfGreaterThan(checkBox, 100);
button.AssertAboveOfGreaterThanOrEqual(checkBox, 105);
button.AssertAboveOfLessThan(checkBox, 110);
button.AssertAboveOfLessThanOrEqual(checkBox, 105);
```
For each available method you have variations of it such as, >, >=, <, <=, between and approximate to some expected value by specified %.
```csharp
button.AssertNearTopOfGreaterThan(checkBox, 100);
button.AssertNearTopOfGreaterThanOrEqual(checkBox, 105);
button.AssertNearTopOfLessThan(checkBox, 106);
button.AssertNearTopOfLessThanOrEqual(checkBox, 105);
```
All assertions have alternative names containing the word 'Near'. We added them to make your tests more readable depending on your preference.
```csharp
button.AssertAboveOfApproximate(checkBox, 104, percent: 10);
```
The expected distance is ~40px with 10% tolerance.
```csharp
button.AssertAboveOfBetween(checkBox, 100, 120);
```
The expected px distance is between 30 and 50 px.
```csharp
checkBox.AssertNearBottomRightOf(button);
button.AssertNearTopLeftOf(checkBox);
```
You can assert the position of elements again each other in all directions- above, below, right, left, top right, top left, below left, below right. Assert that the checkbox is positioned near the top right of the button.
```csharp
LayoutAssert.AssertAlignedHorizontallyAll(button, secondButton);
LayoutAssert.AssertAlignedHorizontallyTop(button, secondButton);
LayoutAssert.AssertAlignedHorizontallyCentered(button, secondButton, secondButton);
LayoutAssert.AssertAlignedHorizontallyBottom(button, secondButton, secondButton);
```
You can tests whether different Android elements are aligned correctly. You can pass as many elements as you like.
```csharp
LayoutAssert.AssertAlignedVerticallyAll(secondCheckBox, checkBox);
LayoutAssert.AssertAlignedVerticallyLeft(secondCheckBox, checkBox);
LayoutAssert.AssertAlignedVerticallyCentered(secondCheckBox, checkBox);
LayoutAssert.AssertAlignedVerticallyRight(secondCheckBox, checkBox);
```
Assert that the elements are aligned vertically only from the left side.
```csharp
button.AssertInsideOf(mainElement);
```
You can check that some element is inside in another. Assert that the button is present in the main view element.
```csharp
button.AssertHeightLessThan(100);
button.AssertWidthBetween(50, 80);
```
Verify the height and width of elements.

BDD Logging
-----------
All layout assertion methods have full BDD logging support. Below you can find the generated BDD log. Of course if you use BELLATRIX page objects the log looks even better as mentioned in previous chapters.

```
Start Test
Class = LayoutTestingTests Name = TestPageLayout
Assert control(ID = button) is above of control(ID = check1).
Assert control(ID = button) is 105 px above of control(ID = check1).
Assert control(ID = button) is > 100 px above of control(ID = check1).
Assert control(ID = button) is >= 105 px above of control(ID = check1).
Assert control(ID = button) is < 110 px above of control(ID = check1).
Assert control(ID = button) is <= 105 px above of control(ID = check1).
Assert control(ID = button) is > 100 px near top of control(ID = check1).
Assert control(ID = button) is >= 105 px near top of control(ID = check1).
Assert control(ID = button) is < 106 px near top of control(ID = check1).
Assert control(ID = button) is <= 105 px near top of control(ID = check1).
Assert control(ID = button) is 104 px above of control(ID = check1). (10 % tolerance)
Assert control(ID = button) is 100 - 120 px above of control(ID = check1).
Assert control(ID = button) is left inside of control(ID = android:id / content).
Assert control(ID = button) is right inside of control(ID = android:id / content).
Assert control(ID = button) is top inside of control(ID = android:id / content).
Assert control(ID = button) is bottom inside of control(ID = android:id / content).
Assert control(ID = button) height is < 100 px.
Assert control(ID = button) width is 50 - 80 px.
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