---
layout: default
title:  "KeyboardService"
excerpt: "Learn how to use BELLATRIX iOS KeyboardService."
date:   2018-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/keyboard-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    AppBehavior.RestartEveryTime)]
public class KeyboardServiceTests : IOSTest
{
    [TestMethod]
    public void TestHideKeyBoard()
    {
        var textField = App.ElementCreateService.CreateById<TextField>("IntegerA");
        textField.SetText(string.Empty);

        App.KeyboardService.HideKeyboard();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with device's keyboard through **KeyboardService** class.
```csharp
App.KeyboardService.HideKeyboard();
```
Hides the keyboard.