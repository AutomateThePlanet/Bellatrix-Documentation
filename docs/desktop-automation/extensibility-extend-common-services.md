---
layout: default
title:  "Extensability- Extend Common Services"
excerpt: "Learn how to extend BELLATRIX common services."
date:   2021-06-23 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/extensibility-extend-common-services/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
using Bellatrix.Desktop.GettingStarted.AppService.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Desktop.GettingStarted
{
    [TestFixture]
    public class ExtendExistingCommonServicesTests : DesktopTest
    {
        [Test]
        public void CommonActionsWithDesktopControls_Wpf()
        {
            // 2. Use newly added login method which is not part of the original implementation of the common service.
            App.AppService.LoginToApp("bellatrix", "topSecret");

            var calendar = App.Components.CreateByAutomationId<Calendar>("calendar");

            Assert.AreEqual(false, calendar.IsDisabled);

            var checkBox = App.Components.CreateByName<CheckBox>("BellaCheckBox");

            checkBox.Check();

            Assert.IsTrue(checkBox.IsChecked);

            var comboBox = App.Components.CreateByAutomationId<ComboBox>("select");

            comboBox.SelectByText("Item2");

            Assert.AreEqual("Item2", comboBox.InnerText);

            var label = App.Components.CreateByName<Label>("Result Label");

            Assert.IsTrue(label.IsPresent);

            var radioButton = App.Components.CreateByName<RadioButton>("RadioButton");

            radioButton.Click();

            Assert.IsTrue(radioButton.IsChecked);
        }
    }
}
```

Explanations
------------
```csharp
public static class NavigationServiceExtensions
{
    public static void LoginToApp(this AppService appService, string userName, string password)
    {
        var ComponentCreateService = new ComponentCreateService();
        var userNameField = ComponentCreateService.CreateByAutomationId<TextField>("textBox");
        var passwordField = ComponentCreateService.CreateByAutomationId<Password>("passwordBox");
        var loginButton = ComponentCreateService.CreateByName<Button>("E Button");

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
using Bellatrix.Desktop.GettingStarted.AppService.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Desktop.GettingStarted
```
To use the additional method you created, add a using statement to the extension methods' namespace.
```csharp
App.AppService.LoginToApp("bellatrix", "topSecret");
```
Use newly added login method which is not part of the original implementation of the common service.