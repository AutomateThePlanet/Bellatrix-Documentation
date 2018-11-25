---
layout: default
title:  "DeviceService"
excerpt: "Learn how to use BELLATRIX Android DeviceService."
date:   2018-06-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/device-service/
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
    ".view.Controls1",
    AppBehavior.RestartEveryTime)]
public class DeviceServiceTests : AndroidTest
{
    [TestMethod]
    public void OrientationSetToLandscape_When_CallRotateWithLandscape()
    {
        App.DeviceService.Rotate(ScreenOrientation.Landscape);

        Assert.AreEqual(ScreenOrientation.Landscape, App.DeviceService.Orientation);
    }

    [TestMethod]
    public void CorrectTimeReturned_When_CallDeviceTime()
    {
        BA.DateTimeAssert.AreEqual(DateTime.Now, App.DeviceService.DeviceTime, BA.DateTimeDeltaType.Minutes, 5);
    }

    [TestMethod]
    public void DeviceIsLockedFalse_When_DeviceIsUnlocked()
    {
        App.DeviceService.Unlock();

        Assert.IsTrue(App.DeviceService.IsLocked);
    }

    [TestMethod]
    public void DeviceIsLockedTrue_When_CallLock()
    {
        App.DeviceService.Lock();

        Assert.IsTrue(App.DeviceService.IsLocked);
    }

    [TestMethod]
    public void ConnectionTypeAirplaneMode_When_SetConnectionTypeToAirplaneMode()
    {
        try
        {
            App.DeviceService.ConnectionType = ConnectionType.AirplaneMode;

            Assert.AreEqual(ConnectionType.AirplaneMode, App.DeviceService.ConnectionType);

            App.DeviceService.ConnectionType = ConnectionType.AllNetworkOn;
            Assert.AreEqual(ConnectionType.AllNetworkOn, App.DeviceService.ConnectionType);
        }
        finally
        {
            App.DeviceService.ConnectionType = ConnectionType.AllNetworkOn;
        }
    }

    [TestMethod]
    public void TestTurnOnLocationService()
    {
        App.DeviceService.TurnOnLocationService();
    }

    [TestMethod]
    public void TestOpenNotifications()
    {
        App.DeviceService.OpenNotifications();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface to most common operations for controlling the device through the DeviceService class.
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
App.DeviceService.Unlock();
```
Unlocks the device.
```csharp
Assert.IsTrue(App.DeviceService.IsLocked);
```
Checks if the device is locked or not.
```csharp
App.DeviceService.Lock();
```
Locks the device.
```csharp
App.DeviceService.ConnectionType = ConnectionType.AirplaneMode;
```
Changes the connection to Airplane mode.
```csharp
Assert.AreEqual(ConnectionType.AirplaneMode, App.DeviceService.ConnectionType);
```
Checks whether the current connection type is airplane mode.
```csharp
App.DeviceService.TurnOnLocationService();
```
Turns on the location service.
```csharp
App.DeviceService.OpenNotifications();
```
Opens notifications.