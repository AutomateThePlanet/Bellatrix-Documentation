---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


200+ Assertions Based on Coordinates 
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
        Div saturnVRating = saturnVAnchor.CreateByClassContaining<Div>("star-rating");

        sortDropDown.AssertAboveOf(protonRocketAnchor, 41);

        LayoutAssert.AssertAlignedHorizontallyAll(sortDropDown, protonRocketAnchor);

        saturnVRating.AssertInsideOf(saturnVAnchor);

        saturnVRating.AssertHeightLessThan(100);
        saturnVRating.AssertWidthBetween(50, 70);
    }
}
 ```

Depending on what you want to check, Bellatrix gives lots of options. You can test px perfect or just that some element is below another. Check that the popularity sort dropdown is above the Proton rocket image.
```csharp
sortDropDown.AssertAboveOf(protonRocketAnchor); 
```

Assert with the exact distance between them.
```csharp
sortDropDown.AssertAboveOf(protonRocketAnchor, 41);
 ```



For each available method, you have variations of it such as, >, >=, <, <=, between and approximate to some expected value by specified %.
```csharp
sortDropDown.AssertAboveOfGreaterThan(protonRocketAnchor, 40);
sortDropDown.AssertAboveOfGreaterThanOrEqual(protonRocketAnchor, 41);
sortDropDown.AssertAboveOfLessThan(protonRocketAnchor, 50);
sortDropDown.AssertAboveOfLessThanOrEqual(protonRocketAnchor, 43); 
```

The expected distance is ~40px with 10% tolerance.
```csharp
sortDropDown.AssertAboveOfApproximate(protonRocketAnchor, 40, percent: 10);
```


You can test whether different web elements are aligned correctly.
```csharp
LayoutAssert.AssertAlignedHorizontallyTop(protonRocketAnchor, protonMAnchor, saturnVAnchor);
LayoutAssert.AssertAlignedHorizontallyCentered(protonRocketAnchor, protonMAnchor, saturnVAnchor);
LayoutAssert.AssertAlignedHorizontallyBottom(protonRocketAnchor, protonMAnchor, saturnVAnchor);

LayoutAssert.AssertAlignedVerticallyAll(falcon9Anchor, falconHeavyAnchor);
 
```
Verify the height and width of elements.
```csharp
saturnVRating.AssertHeightLessThan(100);
saturnVRating.AssertWidthBetween(50, 70);
 ```


You can use for all layout assertions the special web elements- Viewport and Screen.
```csharp
saturnVRating.AssertInsideOf(SpecialElements.Viewport);
saturnVRating.AssertInsideOf(SpecialElements.Screen);
 ```


15+ Predefined Resolutions
```csharp
[Browser(BrowserType.Firefox, MobileWindowSize._360_640,  BrowserBehavior.RestartEveryTime)]
 ```

```csharp
[Browser(BrowserType.Firefox, TabletWindowSize._600_1024,  BrowserBehavior.RestartEveryTime)]
```

Custom Resolution
```csharp
[Browser(BrowserType.Firefox, width: 600, height: 900, behavior: BrowserBehavior.RestartEveryTime)]
```

Cloud Integration
```csharp
[SauceLabs(BrowserType.Chrome, "62", "Windows", BrowserBehavior.ReuseIfStarted, recordScreenshots: true, recordVideo: true)]

[BrowserStack(BrowserType.Chrome,
    "62",
    "Windows",
    "10",
    BrowserBehavior.ReuseIfStarted,
    captureNetworkLogs: true,
    captureVideo: true,
    consoleLogType: BrowserStackConsoleLogType.Verbose,
    debug: true,
    build: "myUniqueBuildName")]

[CrossBrowserTesting(BrowserType.Chrome,
    "62",
    "Windows 10",
    BrowserBehavior.ReuseIfStarted,
    recordVideo: true,
    recordNetwork: true,
    build: "myUniqueBuildName")]
```