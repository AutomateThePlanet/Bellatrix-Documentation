---
layout: default
title:  "Image Recognition"
excerpt: "Learn how to use the BELLATRIX Image Recognition library."
date:   2019-12-19 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/image-recognition/
anchors:
  introduction: Introduction
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Introduction
-------
BELLATRIX Image Recognition library can be used to verify hard-to-assert functionalities such as PDFs, charts, and similar. But our computer vision library is much more than that. You can even interact with everything on your screen. Perform clicks, set text, drag and drop, double click, and more. Our library uses a machine learning engine for comparing images of your screen. Basically, you add screenshots to your project and embed them to it. Afterward, you need to mention the name of the picture.

To use the library you need to install the **Bellatrix.ImageRecognition.SikuliX** NuGet package.
Example
-------
```csharp
[TestClass]
public class ImageRecognitionTests : DesktopTest
{
    [TestMethod]
    public void AssertNotepadFoundAndOpened()
    {
        Screen.Click("windows-search-icon");
        Screen.SetText("type-to-search-field", "notepad");
        Screen.Click("notepad-panel");

        Screen.ValidateIsVisible("new-notepad-opened", similarity: 0.7, timeoutInSeconds: 30);

        Screen.Click("notepad-close-button");
    }
}
```
Explanations
------------
You can combine BELLATRIX desktop library with Image Recognition one. You can navigate to particular screen of your app and perform actions. Afterward, you can use the IR lib whether everything is displayed properly.
```csharp
Screen.Click("windows-search-icon");
Screen.SetText("type-to-search-field", "notepad");
Screen.Click("notepad-panel");
```
To perform visual actions, use the class Screen and its methods.
```csharp
Screen.ValidateIsVisible("new-notepad-opened", similarity: 0.7, timeoutInSeconds: 30);
```
Configuration
-------------
```json
"imageRecognitionSettings": {
    "timeoutInSeconds": "5",
    "defaultSimilarity": "0.7"
},
```
You can find a dedicated section about Image Recognition in **testFrameworkSettings.json** file under the **imageRecognitionSettings** section. There you can set the default timeout and similarity.