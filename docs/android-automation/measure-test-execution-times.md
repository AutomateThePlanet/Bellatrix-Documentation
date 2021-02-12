---
layout: default
title:  "Measure Response Times"
excerpt: "Learn how to measure text execution times using BELLATRIX Android module."
date:   2018-10-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/measure-test-execution-times/
anchors:
  example: Example
  explanations: Explanations
---
Example
--------
```csharp
using Bellatrix.TestExecutionExtensions.Common.ExecutionTime;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.Android.GettingStarted
{
    [TestClass]
    [ExecutionTimeUnder(2000, TimeUnit.Milliseconds)]
    [Android(Constants.AndroidNativeAppPath,
        Constants.AndroidDefaultAndroidVersion,
        Constants.AndroidDefaultDeviceName,
        Constants.AndroidNativeAppAppExamplePackage,
        ".view.Controls1",
        Lifecycle.ReuseIfStarted)]
    public class MeasureTestExecutionTimesTests : AndroidTest
    {
        [TestMethod]
        public void ButtonClicked_When_CallClickMethod()
        {
            var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

            button.Click();
        }
    }
}
```

Explanations
------------
```csharp
[TestClass]
[ExecutionTimeUnder(2000, TimeUnit.Milliseconds)]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    Lifecycle.ReuseIfStarted)]
public class MeasureTestExecutionTimesTests : AndroidTest
```
Sometimes it is useful to use your functional tests to measure performance. Or to just make sure that your app is not slow. To do that BELLATRIX libraries offer the **ExecutionTimeUnder** attribute. You specify a timeout and if the test is executed over it the test will fail.
```csharp
using Bellatrix.TestExecutionExtensions.Common.ExecutionTime;
```
You need to add the NuGet package- **Bellatrix.TestExecutionExtensions.Common**. After that you need to add a using statement to **Bellatrix.TestExecutionExtensions.Common.ExecutionTime**