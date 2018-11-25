---
layout: default
title:  "DeviceService"
excerpt: "Learn how to use BELLATRIX iOS DeviceService."
date:   2018-11-20 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/device-service/
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
public class DeviceServiceTests : IOSTest
{
    [TestMethod]
    public void OrientationSetToLandscape_When_CallRotateWithLandscape()
    {
        App.DeviceService.Rotate(ScreenOrientation.Landscape);

        Assert.AreEqual(ScreenOrientation.Landscape, App.DeviceService.Orientation);

        App.DeviceService.Rotate(ScreenOrientation.Portrait);
    }

    [TestMethod]
    public void CorrectTimeReturned_When_CallDeviceTime()
    {
        BA.DateTimeAssert.AreEqual(DateTime.Now, App.DeviceService.DeviceTime, BA.DateTimeDeltaType.Minutes, 5);
    }

    [TestMethod]
    public void DeviceIsLockedTrue_When_CallLock()
    {
        App.DeviceService.Lock(1);
    }

    [TestMethod]
    public void TestShakeDevice()
    {
        App.DeviceService.ShakeDevice();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface to most common operations for controlling the device through the **DeviceService** class.
```csharp
App.DeviceService.Rotate(ScreenOrientation.Landscape);
```
Rotates the device horizontally.
```csharp
Assert.AreEqual(ScreenOrientation.Landscape, App.DeviceService.Orientation);
```
Gets the current device orientation.
```csharp
BA.DateTimeAssert.AreEqual(DateTime.Now, App.DeviceService.DeviceTime, BA.DateTimeDeltaType.Minutes, 5);
```
Asserts current device time.
```csharp
App.DeviceService.Lock(1);
```
```csharp
App.DeviceService.ShakeDevice();
```
Shakes the device.