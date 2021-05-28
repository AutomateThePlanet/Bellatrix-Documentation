---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2021-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------

3.2
```csharp
using NUnit.Framework;

namespace Bellatrix.Web.NUnit.Tests
{
    [TestFixture]
    [Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
    [VideoRecording(VideoRecordingMode.DoNotRecord)]
    [ScreenshotOnFail(true)]
    public class LoginTests : WebTest
    {
        public override void TestInit() => App.Navigation.Navigate("http://demos.bellatrix.solutions/my-account/");

        [Test]
        public void CorrectTextDisplayed_When_ClickDownloadButton()
        {
            var downloadButton = App.Components.CreateByInnerTextContaining<Anchor>("Download");

            downloadButton.Click();

            var heading1 = App.Components.CreateById<Heading>("feature-title");

            heading1.EnsureInnerTextIs("Download");
        }
    }
}
```


3.8
```csharp
TextField userNameField = App.Components.CreateById<TextField>("username");
```

3.9
```csharp
[Test]
public void CorrectTextDisplayed_When_ClickDownloadButton()
{
    TextField userNameField = App.Components.CreateById<TextField>("username");
    Password passwordField = App.Components.CreateById<Password>("password");
}

```

3.10

```csharp
userNameField.SetText("info@berlinspaceflowers.com");
You have a similar method for the password field called SetPassword.
passwordField.SetPassword("@purISQzt%%DYBnLCIhaoG6$");
```

3.11

```csharp
Button loginButton = App.Components.CreateByXpath<Button>("//button[@name='login']");
```

3.12
```csharp
loginButton.Click();
```

3.14

```csharp
Div myAccountContentDiv = App.Components.CreateByClass<Div>("woocommerce-MyAccount-content");
```

3.15

```csharp
myAccountContentDiv.EnsureInnerTextContains("Hello info1");
```

3.16
```csharp
Anchor logoutLink = App.Components.CreateByInnerTextContaining<Anchor>("Log out");
```

3.17
```csharp
logoutLink.EnsureIsVisible();
```

```csharp
[TestFixture]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
[VideoRecording(VideoRecordingMode.DoNotRecord)]
[ScreenshotOnFail(true)]
public class BellatrixLoginTests : WebTest
{
    public override void TestInit() => App.Navigation.Navigate("http://demos.bellatrix.solutions/my-account/");

    [Test]
    public void CorrectTextDisplayed_When_ClickDownloadButton()
    {
        TextField userNameField = App.Components.CreateById<TextField>("username");
        Password passwordField = App.Components.CreateById<Password>("password");
        Button loginButton = App.Components.CreateByXpath<Button>("//button[@name='login']");

        userNameField.SetText("info@berlinspaceflowers.com");
        passwordField.SetPassword("@purISQzt%%DYBnLCIhaoG6$");
        loginButton.Click();

        Div myAccountContentDiv = App.Components.CreateByClass<Div>("woocommerce-MyAccount-content");
        myAccountContentDiv.EnsureInnerTextContains("Hello info1");

        Anchor logoutLink = App.Components.CreateByInnerTextContaining<Anchor>("Log out");

        logoutLink.EnsureIsVisible();
    }
}
```

```csharp
test
```