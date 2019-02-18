---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------
iOS
ACCELERATE TEST CREATION


Load Testing Library

```csharp
[TestClass]
public class DemandPlanningTests : LoadTest
{
    [TestMethod]
    public void NavigateToDemandPlanning()
    {
        LoadTestEngine.Settings.LoadTestType = LoadTestType.ExecuteForTime;
        LoadTestEngine.Settings.MixtureMode = MixtureMode.Equal;
        LoadTestEngine.Settings.NumberOfProcesses = 1;
        LoadTestEngine.Settings.PauseBetweenStartSeconds = 0;
        LoadTestEngine.Settings.SecondsToBeExecuted = 60;
        LoadTestEngine.Settings.ShouldExecuteRecordedRequestPauses = true;
        LoadTestEngine.Settings.IgnoreUrlRequestsPatterns.Add(".*theming.js.*");
        LoadTestEngine.Assertions.AssertAllRequestStatusesAreSuccessful();
        LoadTestEngine.Assertions.AssertAllRecordedEnsureAssertions();

        LoadTestEngine.Execute("loadTestResults.html");
    }
}
```

Reuse Existing BELLATRIX Web Tests
```csharp
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted, true)]
public class DemandPlanningTests : WebTest
{
    [TestMethod]
    [LoadTest]
    public void NavigateToDemandPlanning()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = App.ElementCreateService.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();
    }
}
```


Advanced Load Test Assertions


```csharp
LoadTestEngine.Assertions.AssertAllRecordedEnsureAssertions();
```

```csharp
LoadTestEngine.Assertions.AssertAllRequestStatusesAreSuccessful();
```
