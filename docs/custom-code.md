---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


ScreenshotOnFail 
```csharp
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
public class LayoutTestingTests : DesktopTest
{
[TestClass]
[ScreenshotOnFail(true)]
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
public class AppScreenshotsOnFailTests : DesktopTest
{
    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("button");

        button.Hover();
    }

}
```

Video Record  
```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
public class VideoRecordingTests : DesktopTest
{
    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("E Button");

        button.Hover();
    }
}
```

Measure Test Execution Times
```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
public class VideoRecordingTests : DesktopTest
[ExecutionTimeUnder(2)]
public class MeasuredResponseTimesTests : DesktopTest
```