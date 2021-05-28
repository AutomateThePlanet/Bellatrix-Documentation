---
layout: default
title:  "DeviceService"
excerpt: "Learn how to use BELLATRIX Android DeviceService."
date:   2021-06-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/device-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
public class DeviceServiceTests : AndroidTest
{
    [Test]
    public void OrientationSetToLandscape_When_CallRotateWithLandscape()
    {
        App.Device.Rotate(ScreenOrientation.Landscape);

        Assert.AreEqual(ScreenOrientation.Landscape, App.Device.Orientation);
    }

    [Test]
    public void CorrectTimeReturned_When_CallDeviceTime()
    {
        BA.DateTimeAssert.AreEqual(DateTime.Now, App.Device.DeviceTime, BA.DateTimeDeltaType.Minutes, 5);
    }

    [Test]
    public void DeviceIsLockedFalse_When_DeviceIsUnlocked()
    {
        App.Device.Unlock();

        Assert.IsTrue(App.Device.IsLocked);
    }

    [Test]
    public void DeviceIsLockedTrue_When_CallLock()
    {
        App.Device.Lock();

        Assert.IsTrue(App.Device.IsLocked);
    }

    [Test]
    public void ConnectionTypeAirplaneMode_When_SetConnectionTypeToAirplaneMode()
    {
        try
        {
            App.Device.ConnectionType = ConnectionType.AirplaneMode;

            Assert.AreEqual(ConnectionType.AirplaneMode, App.Device.ConnectionType);

            App.Device.ConnectionType = ConnectionType.AllNetworkOn;
            Assert.AreEqual(ConnectionType.AllNetworkOn, App.Device.ConnectionType);
        }
        finally
        {
            App.Device.ConnectionType = ConnectionType.AllNetworkOn;
        }
    }

    [Test]
    public void TestTurnOnLocationService()
    {
        App.Device.TurnOnLocationService();
    }

    [Test]
    public void TestOpenNotifications()
    {
        App.Device.OpenNotifications();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface to most common operations for controlling the device through the DeviceService class.
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
App.Device.Unlock();
```
Unlocks the device.
```csharp
Assert.IsTrue(App.Device.IsLocked);
```
Checks if the device is locked or not.
```csharp
App.Device.Lock();
```
Locks the device.
```csharp
App.Device.ConnectionType = ConnectionType.AirplaneMode;
```
Changes the connection to Airplane mode.
```csharp
Assert.AreEqual(ConnectionType.AirplaneMode, App.Device.ConnectionType);
```
Checks whether the current connection type is airplane mode.
```csharp
App.Device.TurnOnLocationService();
```
Turns on the location service.
```csharp
App.Device.OpenNotifications();
```
Opens notifications.