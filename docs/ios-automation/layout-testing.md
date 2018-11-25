---
layout: default
title:  "Layout Testing"
excerpt: "Learn how to use the BELLATRIX layout testing library."
date:   2018-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/layout-testing/
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
    var numberOneTextField = App.ElementCreateService.CreateById<TextField>("IntegerA");
    var computeButton = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");
    var answerLabel = App.ElementCreateService.CreateByName<Label>("Answer");
    var mainElement = App.ElementCreateService.CreateByIOSNsPredicate<Element>("type == \"XCUIElementTypeApplication\" AND name == \"TestApp\"");

    numberOneTextField.AssertAboveOf(computeButton);

    numberOneTextField.AssertAboveOf(computeButton, 61);

    numberOneTextField.AssertAboveOfGreaterThan(computeButton, 60);
    numberOneTextField.AssertAboveOfGreaterThanOrEqual(computeButton, 61);
    numberOneTextField.AssertAboveOfLessThan(computeButton, 70);
    numberOneTextField.AssertAboveOfLessThanOrEqual(computeButton, 61);

    numberOneTextField.AssertNearTopOfGreaterThan(computeButton, 60);
    numberOneTextField.AssertNearTopOfGreaterThanOrEqual(computeButton, 61);
    numberOneTextField.AssertNearTopOfLessThan(computeButton, 70);
    numberOneTextField.AssertNearTopOfLessThanOrEqual(computeButton, 61);

    numberOneTextField.AssertAboveOfApproximate(computeButton, 60, percent: 10);

    numberOneTextField.AssertAboveOfBetween(computeButton, 60, 70);

    numberOneTextField.AssertNearBottomRightOf(computeButton);
    computeButton.AssertNearTopLeftOf(numberOneTextField);

    LayoutAssert.AssertAlignedHorizontallyAll(numberOneTextField, numberTwoTextField);

    LayoutAssert.AssertAlignedHorizontallyTop(numberOneTextField, numberTwoTextField);
    LayoutAssert.AssertAlignedHorizontallyCentered(numberOneTextField, numberTwoTextField, numberTwoTextField);
    LayoutAssert.AssertAlignedHorizontallyBottom(numberOneTextField, numberTwoTextField, numberTwoTextField);

    LayoutAssert.AssertAlignedVerticallyAll(answerLabel, computeButton);

    LayoutAssert.AssertAlignedVerticallyLeft(answerLabel, computeButton);
    LayoutAssert.AssertAlignedVerticallyCentered(answerLabel, computeButton);
    LayoutAssert.AssertAlignedVerticallyRight(answerLabel, computeButton);

    numberOneTextField.AssertInsideOf(mainElement);

    numberOneTextField.AssertHeightLessThan(100);
    numberOneTextField.AssertWidthBetween(50, 80);
}
```

Explanations
------------
Layout testing is a module from BELLATRIX that allows you to test the responsiveness of your app.
```csharp
using Bellatrix.Layout;
```
You need to add a using statement to **Bellatrix.Layout**. After that 100 assertion extensions methods are available to you to check the exact position of your iOS elements.
```csharp
numberOneTextField.AssertAboveOf(computeButton);
```
Depending on what you want to check, BELLATRIX gives lots of options. You can test px perfect or just that some element is below another. Check that the text field is above the button.
```csharp
numberOneTextField.AssertAboveOf(computeButton, 61);
```
Assert with the exact distance between them.
All layout assertion methods throw **LayoutAssertFailedException** if the check is not successful with beautified troubleshooting message:
/########################################

            control (Id = IntegerA) should be 60 px above of control (Name = button) but was 61 px.

/########################################
```csharp
numberOneTextField.AssertAboveOfGreaterThan(computeButton, 60);
numberOneTextField.AssertAboveOfGreaterThanOrEqual(computeButton, 61);
numberOneTextField.AssertAboveOfLessThan(computeButton, 70);
numberOneTextField.AssertAboveOfLessThanOrEqual(computeButton, 61);
```
For each available method you have variations of it such as, >, >=, <, <=, between and approximate to some expected value by specified %.
```csharp
numberOneTextField.AssertNearTopOfGreaterThan(computeButton, 60);
numberOneTextField.AssertNearTopOfGreaterThanOrEqual(computeButton, 61);
numberOneTextField.AssertNearTopOfLessThan(computeButton, 70);
numberOneTextField.AssertNearTopOfLessThanOrEqual(computeButton, 61);
```
All assertions have alternative names containing the word 'Near'. We added them to make your tests more readable depending on your preference.
```csharp
numberOneTextField.AssertAboveOfApproximate(computeButton, 60, percent: 10);
```
The expected distance is ~60px with 10% tolerance.
```csharp
numberOneTextField.AssertAboveOfBetween(computeButton, 60, 70);
```
The expected px distance is between 60 and 70 px.
```csharp
numberOneTextField.AssertNearBottomRightOf(computeButton);
computeButton.AssertNearTopLeftOf(numberOneTextField);
```
You can assert the position of elements again each other in all directions- above, below, right, left, top right, top left, below left, below right. Assert that the text field is positioned near the top right of the button.
```csharp
LayoutAssert.AssertAlignedHorizontallyAll(numberOneTextField, numberTwoTextField);
LayoutAssert.AssertAlignedHorizontallyTop(numberOneTextField, numberTwoTextField);
LayoutAssert.AssertAlignedHorizontallyCentered(numberOneTextField, numberTwoTextField, secondButton);
LayoutAssert.AssertAlignedHorizontallyBottom(numberOneTextField, numberTwoTextField, secondButton);
```
You can tests whether different iOS elements are aligned correctly. You can pass as many elements as you like.
```csharp
LayoutAssert.AssertAlignedVerticallyAll(numberOneTextField, numberTwoTextField);
LayoutAssert.AssertAlignedVerticallyLeft(numberOneTextField, numberTwoTextField);
LayoutAssert.AssertAlignedVerticallyCentered(numberOneTextField, numberTwoTextField);
LayoutAssert.AssertAlignedVerticallyRight(numberOneTextField, numberTwoTextField);
```
Assert that the elements are aligned vertically only from the left side.
```csharp
numberOneTextField.AssertInsideOf(mainElement);
```
You can check that some element is inside in another. Assert that the text field is present in the main view element.
```csharp
numberOneTextField.AssertHeightLessThan(100);
numberOneTextField.AssertWidthBetween(50, 80);
```
Verify the height and width of elements.

BDD Logging
-----------
All layout assertion methods have full BDD logging support. Below you can find the generated BDD log. Of course if you use BELLATRIX page objects the log looks even better as mentioned in previous chapters.

```
Start Test
Class = LayoutTestingTests Name = TestPageLayout
Assert control(Id = IntegerA) is above of control(Name = button).
Assert control(Id = IntegerA) is 105 px above of control(Name = button).
Assert control(Id = IntegerA) is > 100 px above of control(Name = button).
Assert control(Id = IntegerA) is >= 105 px above of control(Name = button).
Assert control(Id = IntegerA) is < 110 px above of control(Name = button).
Assert control(Id = IntegerA) is <= 105 px above of control(Name = button).
Assert control(Id = IntegerA) is > 100 px near top of control(Name = button).
Assert control(Id = IntegerA) is >= 105 px near top of control(Name = button).
Assert control(Id = IntegerA) is < 106 px near top of control(Name = button).
Assert control(Id = IntegerA) is <= 105 px near top of control(Name = button).
Assert control(Id = IntegerA) is 104 px above of control(Name = button). (10 % tolerance)
Assert control(Id = IntegerA) is 100 - 120 px above of control(Name = button).
Assert control(Id = IntegerA) is left inside of control(IName = button).
Assert control(Id = IntegerA) is right inside of control(Name = button).
Assert control(Id = IntegerA) is top inside of control(Name = button).
Assert control(Id = IntegerA) is bottom inside of control(Name = button).
Assert control(Id = IntegerA) height is < 100 px.
Assert control(Id = IntegerA) width is 50 - 80 px.
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