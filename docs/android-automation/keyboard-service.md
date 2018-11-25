---
layout: default
title:  "KeyboardService"
excerpt: "Learn how to use BELLATRIX Android KeyboardService."
date:   2018-06-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/keyboard-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".app.CustomTitle",
    AppBehavior.RestartEveryTime)]
public class KeyboardServiceTests : AndroidTest
{
    [TestMethod]
    public void TestHideKeyBoard()
    {
        var textField = App.ElementCreateService.CreateByIdContaining<TextField>("left_text_edit");
        textField.SetText(string.Empty);

        App.KeyboardService.HideKeyboard();
    }

    [TestMethod]
    public void PressKeyCodeTest()
    {
        App.KeyboardService.PressKeyCode(AndroidKeyCode.Home);
    }

    [TestMethod]
    public void PressKeyCodeWithMetaStateTest()
    {
        App.KeyboardService.PressKeyCode(AndroidKeyCode.Space, AndroidKeyMetastate.Meta_Shift_On);
    }

    [TestMethod]
    public void LongPressKeyCodeTest()
    {
        App.KeyboardService.LongPressKeyCode(AndroidKeyCode.Home);
    }

    [TestMethod]
    public void LongPressKeyCodeWithMetaStateTest()
    {
        App.KeyboardService.LongPressKeyCode(AndroidKeyCode.Space, AndroidKeyMetastate.Meta_Shift_On);
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with device's keyboard through KeyboardService class.
```csharp
App.KeyboardService.HideKeyboard();
```
Hides the keyboard.
```csharp
App.KeyboardService.PressKeyCode(AndroidKeyCode.Home);
```
Press the Home button.
```csharp
App.KeyboardService.PressKeyCode(AndroidKeyCode.Space, AndroidKeyMetastate.Meta_Shift_On);
```
Press Space key simulating that the Shift key is ON.
```csharp
App.KeyboardService.LongPressKeyCode(AndroidKeyCode.Home);
```
Long press the Home button.
```csharp
App.KeyboardService.LongPressKeyCode(AndroidKeyCode.Space, AndroidKeyMetastate.Meta_Shift_On);
```
Long press Space key simulating that the Shift key is ON.