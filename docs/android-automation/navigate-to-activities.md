---
layout: default
title:  "Navigate to Activities"
excerpt: "Learn how to navigate to Android activities with BELLATRIX mobile module."
date:   2018-10-20 06:50:17 +0200
parent: android-automation
permalink: /android-automation/navigate-to-activities/
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
    ".view.Controls1",
    AppBehavior.ReuseIfStarted)]
public class NavigateToActivitiesTests : AndroidTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".view.Controls1");

        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

        button.Click();
    }
}
```

Explanations
------------

```csharp
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.ReuseIfStarted)]
```
Depending on the types of tests you want to write there are a couple of ways to navigate to а specific activity.
If you use the Android attribute the first time the app is started it navigates to the specified activity.
```csharp
App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".view.Controls1");
```
You can always navigate in each separate tests, but if all of them open the same activity, you can use the above techniques for code reuse.