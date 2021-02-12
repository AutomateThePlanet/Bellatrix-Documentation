---
layout: default
title:  "Measure Response Times"
excerpt: "Learn how to measure text execution times using BELLATRIX desktop module."
date:   2018-10-20 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/measure-test-execution-times/
anchors:
  example: Example
  explanations: Explanations
---
Example
--------
```csharp
using Bellatrix.TestExecutionExtensions.Common.ExecutionTime;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Desktop.GettingStarted
{
    [TestClass]
    [ExecutionTimeUnder(2000, TimeUnit.Milliseconds)]
    [App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
    public class MeasureTestExecutionTimesTests : DesktopTest
    {
        [TestMethod]
        public void MessageChanged_When_ButtonHovered_Wpf()
        {
            var button = App.ElementCreateService.CreateByName<Button>("E Button");

            button.Hover();

            var label = App.ElementCreateService.CreateByAutomationId<Label>("ResultLabelId");
            Assert.AreEqual("ebuttonHovered", label.InnerText);
        }
    }
}
```

Explanations
------------
```csharp
[TestClass]
[ExecutionTimeUnder(2000, TimeUnit.Milliseconds)]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class MeasureTestExecutionTimesTests : DesktopTest
```
Sometimes it is useful to use your functional tests to measure performance. Or to just make sure that your app is not slow. To do that BELLATRIX libraries offer the **ExecutionTimeUnder** attribute. You specify a timeout and if the test is executed over it the test will fail.
```csharp
using Bellatrix.TestExecutionExtensions.Common.ExecutionTime;
```
You need to add the NuGet package- **Bellatrix.TestExecutionExtensions.Common**. After that you need to add a using statement to **Bellatrix.TestExecutionExtensions.Common.ExecutionTime**