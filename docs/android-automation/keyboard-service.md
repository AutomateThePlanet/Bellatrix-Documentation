---
layout: default
title:  "KeyboardService"
excerpt: "Learn how to use BELLATRIX Android KeyboardService."
date:   2021-06-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/keyboard-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
public class KeyboardServiceTests : AndroidTest
{
    [Test]
    public void TestHideKeyBoard()
    {
        var textField = App.Components.CreateByIdContaining<TextField>("left_text_edit");
        textField.SetText(string.Empty);

        App.Keyboard.HideKeyboard();
    }

    [Test]
    public void PressKeyCodeTest()
    {
        App.Keyboard.PressKeyCode(AndroidKeyCode.Home);
    }

    [Test]
    public void PressKeyCodeWithMetaStateTest()
    {
        App.Keyboard.PressKeyCode(AndroidKeyCode.Space, AndroidKeyMetastate.Meta_Shift_On);
    }

    [Test]
    public void LongPressKeyCodeTest()
    {
        App.Keyboard.LongPressKeyCode(AndroidKeyCode.Home);
    }

    [Test]
    public void LongPressKeyCodeWithMetaStateTest()
    {
        App.Keyboard.LongPressKeyCode(AndroidKeyCode.Space, AndroidKeyMetastate.Meta_Shift_On);
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with device's keyboard through KeyboardService class.
```csharp
App.Keyboard.HideKeyboard();
```
Hides the keyboard.
```csharp
App.Keyboard.PressKeyCode(AndroidKeyCode.Home);
```
Press the Home button.
```csharp
App.Keyboard.PressKeyCode(AndroidKeyCode.Space, AndroidKeyMetastate.Meta_Shift_On);
```
Press Space key simulating that the Shift key is ON.
```csharp
App.Keyboard.LongPressKeyCode(AndroidKeyCode.Home);
```
Long press the Home button.
```csharp
App.Keyboard.LongPressKeyCode(AndroidKeyCode.Space, AndroidKeyMetastate.Meta_Shift_On);
```
Long press Space key simulating that the Shift key is ON.