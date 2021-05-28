---
layout: default
title:  "Troubleshooting- Screenshots on Fail"
excerpt: "Learn how to generate screenshots on test's fail."
date:   2021-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/troubleshooting-screenshots-on-fail/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestFixture]
public class ScreenshotsOnFailTests : IOSTest
{
    [Test]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.Components.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Explanations
------------
If it is turned on the engine will capture a screenshot in case the test failed.

Configuration
-------------
If you open the **testFrameworkSettings.json** file, you find the screenshotsSettings section that controls this behaviour.
```json
"screenshotsSettings": {
    "isEnabled": "true",
    "filePath": "C:\\Troubleshooting\\Screenshots"
}
```
You can turn off the making of screenshots for all tests and specify where the screenshots to be saved.
In the extensibility chapters read more about how you can create different screenshots engine or change the saving strategy.