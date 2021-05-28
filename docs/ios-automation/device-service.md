---
layout: default
title:  "DeviceService"
excerpt: "Learn how to use BELLATRIX iOS DeviceService."
date:   2021-11-20 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/device-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
public class DeviceServiceTests : IOSTest
{
    [Test]
    public void OrientationSetToLandscape_When_CallRotateWithLandscape()
    {
        App.Device.Rotate(ScreenOrientation.Landscape);

        Assert.AreEqual(ScreenOrientation.Landscape, App.Device.Orientation);

        App.Device.Rotate(ScreenOrientation.Portrait);
    }

    [Test]
    public void CorrectTimeReturned_When_CallDeviceTime()
    {
        BA.DateTimeAssert.AreEqual(DateTime.Now, App.Device.DeviceTime, BA.DateTimeDeltaType.Minutes, 5);
    }

    [Test]
    public void DeviceIsLockedTrue_When_CallLock()
    {
        App.Device.Lock(1);
    }

    [Test]
    public void TestShakeDevice()
    {
        App.Device.ShakeDevice();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface to most common operations for controlling the device through the **DeviceService** class.
```csharp
App.Device.Rotate(ScreenOrientation.Landscape);
```
Rotates the device horizontally.
```csharp
Assert.AreEqual(ScreenOrientation.Landscape, App.Device.Orientation);
```
Gets the current device orientation.
```csharp
BA.DateTimeAssert.AreEqual(DateTime.Now, App.Device.DeviceTime, BA.DateTimeDeltaType.Minutes, 5);
```
Asserts current device time.
```csharp
App.Device.Lock(1);
```
```csharp
App.Device.ShakeDevice();
```
Shakes the device.