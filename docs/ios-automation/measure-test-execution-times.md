---
layout: default
title:  "Measure Response Times"
excerpt: "Learn how to measure text execution times using BELLATRIX iOS module."
date:   2018-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/measure-test-execution-times/
anchors:
  example: Example
  explanations: Explanations
---
Example
--------
```csharp
[TestClass]
[ExecutionTimeUnder(5000, TimeUnit.Milliseconds)]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
public class MeasureTestExecutionTimesTests : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Explanations
------------
```csharp
[ExecutionTimeUnder(5000, TimeUnit.Milliseconds)]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
public class MeasureTestExecutionTimesTests : IOSTest
```
Sometimes it is useful to use your functional tests to measure performance. Or to just make sure that your app is not slow. To do that BELLATRIX libraries offer the **ExecutionTimeUnder** attribute. You specify a timeout and if the test is executed over it the test will fail.
```csharp
using Bellatrix.TestExecutionExtensions.Common.ExecutionTime;
```
You need to add the NuGet package- **Bellatrix.TestExecutionExtensions.Common**. After that you need to add a using statement to **Bellatrix.TestExecutionExtensions.Common.ExecutionTime**