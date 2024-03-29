---
layout: default
title:  "Measure Response Times"
excerpt: "Learn how to measure text execution times using BELLATRIX web module."
date:   2021-10-20 06:50:17 +0200
parent: web-automation
permalink: /web-automation/measure-test-execution-times/
anchors:
  example: Example
  explanations: Explanations
---
Example
--------
```csharp
using Bellatrix.TestExecutionExtensions.Common.ExecutionTime;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Web.GettingStarted
{
    [TestFixture]
    [ExecutionTimeUnder(2000, TimeUnit.Milliseconds)]
    public class MeasureTestExecutionTests : WebTest
    {
        [Test]
        public void PromotionsPageOpened_When_PromotionsButtonClicked()
        {
            App.Navigation.Navigate("http://demos.bellatrix.solutions/");

            var promotionsLink = App.Components.CreateByLinkText<Anchor>("promo");

            promotionsLink.Click();
        }
    }
}
```

Explanations
------------
```csharp
[TestFixture]
[ExecutionTimeUnder(2000, TimeUnit.Milliseconds)]
public class MeasureTestExecutionTests : WebTest
```
Sometimes it is useful to use your functional tests to measure performance or just to make sure that your app is not slow. To do that BELLATRIX libraries offer the **ExecutionTimeUnder** attribute. You specify a timeout and if the test is executed over it the test will fail.
```csharp
using Bellatrix.TestExecutionExtensions.Common.ExecutionTime;
```
You need to add the NuGet package- **Bellatrix.TestExecutionExtensions.Common**. After that you need to add a using statement to **Bellatrix.TestExecutionExtensions.Common.ExecutionTime**