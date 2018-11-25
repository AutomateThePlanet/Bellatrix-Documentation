---
layout: default
title:  "Extensibility- Override Locally Element Actions"
excerpt: "Learn how to override temporary some desktop elements actions/properties."
date:   2018-02-20 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/extensibility-override-locally-element-actions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
public class OverrideLocallyElementActionsTests : DesktopTest
{
    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        Button.OverrideClickLocally = (e) =>
        {
            e.ToExists().ToBeClickable().WaitToBe();
            e.ScrollToVisible();
            e.Click();
        };

        Expander.OverrideClickLocally = CustomFocus;

        var button = App.ElementCreateService.CreateByName<Button>("E Button");

        button.Hover();

        var label = App.ElementCreateService.CreateByName<Button>("ebuttonHovered");
        Assert.AreEqual("ebuttonHovered", label.InnerText);
    }

    private void CustomFocus(Expander expander)
    {
        expander.ScrollToVisible();
        Thread.Sleep(100);
        expander.Click();
    }
}
```

Explanations
------------
Extensibility and customisation are one of the biggest advantages of BELLATRIX. So, each BELLATRIX desktop control gives you the possibility to override its behaviour locally for current test only. You need to initialise the static delegates- **Override{MethodName}Locally**. This may be useful to make a temporary fix only for certain page where the default behaviour is not working as expected.
```csharp
Button.OverrideClickLocally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    e.ScrollToVisible();
    e.Click();
};
```
We override the behaviour of the button control with an anonymous lambda function. Instead of using clicking the button directly first wait to be clickable and scroll to be visible.
```csharp
Expander.OverrideClickLocally = CustomFocus;

private void CustomFocus(Expander expander)
{
    expander.ScrollToVisible();
    Thread.Sleep(100);
    expander.Click();
}
```
Instead of using clicking the button directly first wait to be clickable and scroll to be visible.

**Note**: *Keep in mind that once the control is overridden locally, after the test's execution the default behaviour is restored.*

**Note**: *In most cases, you can call the local override in some page object, directly in the test or in the TestInit method.*

**Note**: *The local override has precedence over the global override.*

Here is a list of all local override Button delegates:
- OverrideClickLocally
- OverrideHoverLocally
- OverrideInnerTextLocally
- OverrideIsDisabledLocally