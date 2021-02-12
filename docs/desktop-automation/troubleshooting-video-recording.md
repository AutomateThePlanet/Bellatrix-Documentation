---
layout: default
title:  "Troubleshooting- Video Recording"
excerpt: "Learn how to use BELLATRIX cross-platform video recording."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/troubleshooting-video-recording/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class VideoRecordingTests : DesktopTest
{
  [TestMethod]
  public void MessageChanged_When_ButtonHovered_Wpf()
  {
      var button = App.ElementCreateService.CreateByName<Button>("E Button");

      button.Hover();

      var label = App.ElementCreateService.CreateByName<Button>("ebuttonHovered");
      Assert.AreEqual("ebuttonHovered", label.InnerText);
  }
}
```

Explanations
------------
If it is turned on the engine will capture video for every test and keep them in case the test failed.

Configuration
-------------
If you open the **testFrameworkSettings.json** file, you find the **videoRecordingSettings** section that controls this behaviour.
```json
"videoRecordingSettings": {
       "isEnabled": "true",
        "waitAfterFinishRecordingMilliseconds": "500",
        "filePath": "C:\\Troubleshooting\\Videos"
}
```
You can turn off the making of videos for all tests and specify where the videos to be saved. **waitAfterFinishRecordingMilliseconds** adds some time to the end of the test, making the video not going black immediately. In the extensibility chapters read more about how you can create custom video recorder or change the saving strategy.