---
layout: default
title:  "Troubleshooting- Video Recording"
excerpt: "Learn how to use BELLATRIX cross-platform video recording."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/troubleshooting-video-recording/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
public class VideoRecordingTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }

    [TestMethod]
    [VideoRecording(VideoRecordingMode.DoNotRecord)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

        blogLink.Click();
    }
}
```

Explanations
------------
```csharp
[VideoRecording(VideoRecordingMode.OnlyFail)]
```
This is the attribute for cross-platform video recording by BELLATRIX. The engine checks after each test, its result, depending on the specified video saves the video.
All video recording modes:
- **Always** - records and save video for all tests.
- **DoNotRecord** - wont' record any videos.
- **Ignore** - ignores the tests.
- **OnlyPass** - saves the videos only for pass tests.
- **OnlyFail** - saves the videos only for failed tests.
If you apply attribute to the class all tests inherit the behaviour. It is possible to put it over each test and this way you override the class behaviour only for this particular test.
```csharp
[TestMethod]
[VideoRecording(VideoRecordingMode.DoNotRecord)]
```
As mentioned above we can override the video behaviour for a particular test. The global behaviour for all tests in the class is to save the videos only for failed tests. Only for this particular test, we tell BELLATRIX not to make a video.

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