---
layout: default
title:  "Image Recognition"
excerpt: "Learn how to use the BELLATRIX Image Recognition library."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/image-recognition/
anchors:
  introduction: Introduction
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Introduction
-------
BELLATRIX Image Recognition library can be used to verify hard-to-assert functionalities such as PDFs, charts, and similar. But our computer vision library is much more than that. You can even interact with everything on your screen. Perform clicks,
set text, drag and drop, double click, and more. Our library uses a machine learning engine for comparing images of your screen. Basically, you add screenshots to your project and embed them to it. Afterward, you need to mention the name of the picture.

To use the library you need to install the **Bellatrix.ImageRecognition.SikuliX** NuGet package.
### Example ###

```csharp
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
public class ImageRecognitionTests : WebTest
{
    private static GridTestPage _gridTestPage;
    private static Grid TestGrid => _gridTestPage.SampleGrid;

    public override void TestInit()
    {
        _gridTestPage = App.Create<GridTestPage>();
        App.NavigationService.NavigateToLocalPage("TestPages\\Grid\\Grid.html");
    }

    [TestMethod]
    public void AssertPrintPreview()
    {
        var firstOrderCell = TestGrid.GetRow(0).GetCell(0).As<TextField>();
        firstOrderCell.SetText("BELLATRIX IS beautiful");

        Screen.Click("chrome-dots-button");
        Screen.Click("chrome-print-button");

        Screen.ValidateIsVisible("chrome-print-preview-grid", similarity: 0.7, timeoutInSeconds: 30);

        Screen.Click("print-preview-cancel-button");

        Screen.ValidateIsNotVisible("chrome-print-preview-grid");
    }
}
```
### Explanations ### 

```csharp
var firstOrderCell = TestGrid.GetRow(0).GetCell(0).As<TextField>();
firstOrderCell.SetText("BELLATRIX IS beautiful");
```
Here we combine the BELLATRIX web library with the image recognition library. First, we navigate and perform actions on our web page. After that, we open the print-preview window of Chrome browser by clicking the "dots" button and afterward the "Print..." menu item. Since Chrome is a native app, you cannot use WebDriver to interact with its menus. This is where we use our Image Recognition library.
```csharp
Screen.Click("chrome-dots-button");
Screen.Click("chrome-print-button");
```
To perform visual actions, use the class Screen and its methods.
```csharp
Screen.ValidateIsVisible("chrome-print-preview-grid", similarity: 0.7, timeoutInSeconds: 30);
```
Check whether the provided image is part of the current screen with similarity, and we set the timeout.
```csharp
Screen.ValidateIsNotVisible("chrome-print-preview-grid");
```
We can check that a particular image is not visible anymore.

### Configuration ### 

```json
"imageRecognitionSettings": {
    "timeoutInSeconds": "5",
    "defaultSimilarity": "0.7"
},
```
You can find a dedicated section about Image Recognition in **testFrameworkSettings.json** file under the **imageRecognitionSettings** section. There you can set the default timeout and similarity.