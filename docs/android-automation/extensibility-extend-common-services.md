---
layout: default
title:  "Extensability- Extend Common Services"
excerpt: "Learn how to extend BELLATRIX common services."
date:   2021-10-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/extensibility-extend-common-services/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
using Bellatrix.Mobile.Android.GettingStarted.CommonServicesExtensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.Android.GettingStarted
{
    [TestFixture]
    public class ExtendExistingCommonServicesTests : AndroidTest
    {
        [Test]
        public void ButtonClicked_When_CallClickMethod()
        {
            App.AppService.LoginToApp("bellatrix", "topSecret");

            var button = App.Components.CreateByIdContaining<Button>("button");

            button.Click();
        }
    }
}
```

Explanations
------------
```csharp
public static class AppServiceExtensions
{
    public static void LoginToApp(this AndroidAppService appService, string userName, string password)
    {
        var ComponentCreateService = new ComponentCreateService();
        var userNameField = ComponentCreateService.CreateByIdContaining<TextField>("textBox");
        var passwordField = ComponentCreateService.CreateByIdContaining<Password>("passwordBox");
        var loginButton = ComponentCreateService.CreateByIdContaining<Button>("loginButton");

        userNameField.SetText(userName);
        passwordField.SetPassword(password);
        loginButton.Click();
    }
}
```
One way to extend the BELLATRIX common services is to create an extension method for the additional action.
1. Place it in a static class like this one.
2. Create a static method for the action.
3. Pass the common service as a parameter with the keyword 'this'.
4. Access the native driver via WrappedDriver.

Later to use the method in your tests, add a using statement containing this class's namespace.
```csharp
using Bellatrix.Mobile.Android.GettingStarted.CommonServicesExtensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Mobile.Android.GettingStarted
```
To use the additional method you created, add a using statement to the extension methods' namespace.
```csharp
App.AppService.LoginToApp("bellatrix", "topSecret");
```
Use newly added login method which is not part of the original implementation of the common service.