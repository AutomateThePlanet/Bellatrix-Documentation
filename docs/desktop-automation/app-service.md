---
layout: default
title:  "AppService"
excerpt: "Learn how to use BELLATRIX AppService."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/app-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[App(@"C:\demo-apps\WPFSampleApp.exe", Lifecycle.RestartEveryTime)]
public class AppServiceTests : DesktopTest
{
    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("E Button");

        button.Click();
        
        Debug.WriteLine(App.AppService.Title);

        App.AppService.Maximize();
        App.AppService.Forward();
        App.AppService.Back();
        App.AppService.Refresh();
    }
}
```

Explanations
------------
With the BELLATRIX desktop library, you can test various Windows applications written in different technologies such as- WPF, WinForms or UWP (Universal Windows Platform).
```csharp
[App(@"C:\demo-apps\WPFSampleApp.exe", Lifecycle.RestartEveryTime)]
```
For the first two, you need to pass the path to your application's executable.
```csharp
[App(@"C:\demo-apps\WindowsFormsSampleApp.exe", Lifecycle.RestartEveryTime)] 
```
Starts WinForms app.
```csharp
[App("369ede42-bebe-41ea-a02a-0da04991478e_q6s448gyj2xsw!App", Lifecycle.RestartEveryTime)]
```
For UWP applications you need to set the application's installation GUID.
```csharp
Debug.WriteLine(App.AppService.Title);

App.AppService.Maximize();
App.AppService.Forward();
App.AppService.Back();
App.AppService.Refresh();
```
Through AppService you can control the certain aspects of your application such as getting its title, maximise it or going backwards or forward.