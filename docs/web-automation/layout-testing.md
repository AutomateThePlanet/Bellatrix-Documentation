---
layout: default
title:  "Layout Testing"
excerpt: "Learn how to use the BELLATRIX layout testing library."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/layout-testing/
anchors:
  example: Example
  explanations: Explanations
  bdd-logging: BDD Logging
  all-available-layout-assertion-methods: All Available Methods
---
Example
-------
```csharp
[Browser(BrowserType.Chrome, DesktopWindowSize._1280_1024,  BrowserBehavior.RestartEveryTime)]
[TestClass]
public class LayoutTestingTests : WebTest
{
    [TestMethod]
    public void TestPageLayout()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonRocketAnchor = 
		App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/proton-rocket/");
        Anchor protonMAnchor = 
		App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/proton-m/");
        Anchor saturnVAnchor = 
		App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/saturn-v/");
        Anchor falconHeavyAnchor = 
		App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/falcon-heavy/");
        Anchor falcon9Anchor = 
		App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/falcon-9/");
        Div saturnVRating = saturnVAnchor.CreateByClassContaining<Div>("star-rating");

        sortDropDown.AssertAboveOf(protonRocketAnchor);

        sortDropDown.AssertAboveOf(protonRocketAnchor, 41);

        sortDropDown.AssertAboveOfGreaterThan(protonRocketAnchor, 40);
        sortDropDown.AssertAboveOfGreaterThanOrEqual(protonRocketAnchor, 41);
        sortDropDown.AssertAboveOfLessThan(protonRocketAnchor, 50);
        sortDropDown.AssertAboveOfLessThanOrEqual(protonRocketAnchor, 43);

        sortDropDown.AssertNearTopOfGreaterThan(protonRocketAnchor, 40);
        sortDropDown.AssertNearTopOfGreaterThanOrEqual(protonRocketAnchor, 41);
        sortDropDown.AssertNearTopOfLessThan(protonRocketAnchor, 50);
        sortDropDown.AssertNearTopOfLessThanOrEqual(protonRocketAnchor, 43);

        sortDropDown.AssertAboveOfApproximate(protonRocketAnchor, 40, percent: 10);

        sortDropDown.AssertAboveOfBetween(protonRocketAnchor, 30, 50);

        saturnVAnchor.AssertNearBottomRightOf(sortDropDown);
        sortDropDown.AssertNearTopLeftOf(saturnVAnchor);

        LayoutAssert.AssertAlignedHorizontallyAll(protonRocketAnchor, protonMAnchor);

        LayoutAssert.AssertAlignedHorizontallyTop(protonRocketAnchor, protonMAnchor, saturnVAnchor);
        LayoutAssert.AssertAlignedHorizontallyCentered(protonRocketAnchor, protonMAnchor, saturnVAnchor);
        LayoutAssert.AssertAlignedHorizontallyBottom(protonRocketAnchor, protonMAnchor, saturnVAnchor);

        LayoutAssert.AssertAlignedVerticallyAll(falcon9Anchor, falconHeavyAnchor);

        LayoutAssert.AssertAlignedVerticallyLeft(falcon9Anchor, falconHeavyAnchor);
        LayoutAssert.AssertAlignedVerticallyCentered(falcon9Anchor, falconHeavyAnchor);
        LayoutAssert.AssertAlignedVerticallyRight(falcon9Anchor, falconHeavyAnchor);

        saturnVRating.AssertInsideOf(saturnVAnchor);

        saturnVRating.AssertHeightLessThan(100);
        saturnVRating.AssertWidthBetween(50, 70);

        saturnVRating.AssertInsideOf(SpecialElements.Viewport);
        saturnVRating.AssertInsideOf(SpecialElements.Screen);
    }
}
```

Explanations
------------
Layout testing is a module from BELLATRIX that allows you to test the responsiveness of your website.
```csharp
using Bellatrix.Layout;
```
You need to add a using statement to Bellatrix.Layout
```csharp
[Browser(BrowserType.Chrome, DesktopWindowSize._1280_1024,  BrowserBehavior.RestartEveryTime)]
```
```csharp
[Browser(BrowserType.Firefox, MobileWindowSize._360_640,  BrowserBehavior.RestartEveryTime)]
```
```csharp
[Browser(BrowserType.Firefox, TabletWindowSize._600_1024,  BrowserBehavior.RestartEveryTime)]
```
```csharp
[Browser(BrowserType.Firefox, width: 600, height: 900, behavior: BrowserBehavior.RestartEveryTime)]
```
After that 100 assertion extensions methods are available to you to check the exact position of your web elements. Browser attribute gives you the option to resize your browser window so that you can test the rearrangement of the web elements on your pages. To make it, even more, easier for you, we included a couple of enums containing the most popular desktop, mobile and tablet resolutions. Of course, you always have the option to set a custom size.
```csharp
sortDropDown.AssertAboveOf(protonRocketAnchor);
```
Depending on what you want to check, BELLATRIX gives lots of options. You can test px perfect or just that some element is below another. Check that the popularity sort dropdown is above the proton rocket image.
```csharp
sortDropDown.AssertAboveOf(protonRocketAnchor, 41);
```
Assert with the exact distance between them.

All layout assertion methods throw LayoutAssertFailedException if the check is not successful with beatified troubleshooting message:
########################################

control (Name ending with orderby) should be 41 px above of control (href = /proton-rocket/) but was 42 px.

########################################
```csharp
sortDropDown.AssertAboveOfGreaterThan(protonRocketAnchor, 40);
sortDropDown.AssertAboveOfGreaterThanOrEqual(protonRocketAnchor, 41);
sortDropDown.AssertAboveOfLessThan(protonRocketAnchor, 50);
sortDropDown.AssertAboveOfLessThanOrEqual(protonRocketAnchor, 43);
```
For each available method you have variations of it such as, >, >=, <, <=, between and approximate to some expected value by specified %.
```csharp
sortDropDown.AssertNearTopOfGreaterThan(protonRocketAnchor, 40);
sortDropDown.AssertNearTopOfGreaterThanOrEqual(protonRocketAnchor, 41);
sortDropDown.AssertNearTopOfLessThan(protonRocketAnchor, 50);
sortDropDown.AssertNearTopOfLessThanOrEqual(protonRocketAnchor, 43);
```
All assertions have alternative names containing the word 'Near'. We added them to make your tests more readable depending on your preference.
```csharp
sortDropDown.AssertAboveOfApproximate(protonRocketAnchor, 40, percent: 10);
```
The expected distance is ~40px with 10% tolerance
```csharp
sortDropDown.AssertAboveOfBetween(protonRocketAnchor, 30, 50);
```
The expected px distance is between 30 and 50 px
```csharp
saturnVAnchor.AssertNearBottomRightOf(sortDropDown);
sortDropDown.AssertNearTopLeftOf(saturnVAnchor);
```
You can assert the position of elements again each other in all directions- above, below, right, left, top right, top left, below left, below right. Assert that the sort dropdown is positioned near the top right of the Saturn B link.
```csharp
LayoutAssert.AssertAlignedHorizontallyAll(protonRocketAnchor, protonMAnchor);
```
You can tests whether different web elements are aligned correctly.
```csharp
LayoutAssert.AssertAlignedHorizontallyTop(protonRocketAnchor, protonMAnchor, saturnVAnchor);
LayoutAssert.AssertAlignedHorizontallyCentered(protonRocketAnchor, protonMAnchor, saturnVAnchor);
LayoutAssert.AssertAlignedHorizontallyBottom(protonRocketAnchor, protonMAnchor, saturnVAnchor);
```
You can pass as many elements as you like.
```csharp
LayoutAssert.AssertAlignedVerticallyAll(falcon9Anchor, falconHeavyAnchor);
```
You can check vertical alignment as well.
```csharp
LayoutAssert.AssertAlignedVerticallyLeft(falcon9Anchor, falconHeavyAnchor);
LayoutAssert.AssertAlignedVerticallyCentered(falcon9Anchor, falconHeavyAnchor);
LayoutAssert.AssertAlignedVerticallyRight(falcon9Anchor, falconHeavyAnchor);
```
Assert that the elements are aligned vertically only from the left side.
```csharp
saturnVRating.AssertInsideOf(saturnVAnchor);
```
You can check that some element is inside in another. Assert that the rating div is present in the Saturn V anchor.
```csharp
saturnVRating.AssertHeightLessThan(100);
saturnVRating.AssertWidthBetween(50, 70);
```
Verify the height and width of elements.
```csharp
saturnVRating.AssertInsideOf(SpecialElements.Viewport);
saturnVRating.AssertInsideOf(SpecialElements.Screen);
```
You can use for all layout assertions the special web elements- Viewport and Screen.
- **Screen** - represents the whole page area inside browser even that which is not visible.
- **Viewport** - it takes the browsers client window.
It is useful if you want to check some fixed element on the screen which sticks to viewport even when you scroll.

BDD Logging
-----------
All layout assertion methods have full BDD logging support. Below you can find the generated BDD log. Of course if you use BELLATRIX page objects the log looks even better as mentioned in previous chapters.

```
>Start Test
>Class = LayoutTestingTests Name = TestPageLayout
>Assert control (Name ending with orderby) is above of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is 42 px above of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is >40 px above of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is >=41 px above of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is <50 px above of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is <=43 px above of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is >40 px near top of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is >=41 px near top of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is <50 px near top of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is <=43 px near top of control (href = /proton-rocket/).
>Assert control (Name ending with orderby) is 40 px above of control (href = /proton-rocket/). (10% tolerance)
>Assert control (Name ending with orderby) is 30-50 px above of control (href = /proton-rocket/).
>Assert control (href = /saturn-v/) is near bottom of control (Name ending with orderby).
>Assert control (Name ending with orderby) is near right of control (href = /saturn-v/).
>Assert control (Name ending with orderby) is near top of control (href = /saturn-v/).
>Assert control (href = /saturn-v/) is near left of control (Name ending with orderby).
>Assert control (Class = star-rating) is left inside of control (href = /saturn-v/).
>Assert control (Class = star-rating) is right inside of control (href = /saturn-v/).
>Assert control (Class = star-rating) is top inside of control (href = /saturn-v/).
>Assert control (Class = star-rating) is bottom inside of control (href = /saturn-v/).
>Assert control (Class = star-rating) height is <100 px.
>Assert control (Class = star-rating) width is 50-70 px.
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

### AssertAlignedVerticallyAll###
- AssertAlignedVerticallyCentered
- AssertAlignedVerticallyRight
- AssertAlignedVerticallyLeft
- AssertAlignedHorizontallyAll
- AssertAlignedHorizontallyCentered
- AssertAlignedHorizontallyTop
- AssertAlignedHorizontallyBottom