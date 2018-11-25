---
layout: default
title:  "Extensibility- Override Globally Element Actions"
excerpt: "Learn how to override some desktop elements actions/properties for the whole tests execution."
date:   2018-06-23 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/extensibility-override-globally-element-actions/
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
public class OverrideGloballyElementActionsTests : DesktopTest
{
    public override void TestsArrange()
    {
        Button.OverrideClickGlobally = (e) =>
        {
            e.ToExists().ToBeClickable().WaitToBe();
            e.ScrollToVisible();
            e.Click();
        };

        Expander.OverrideClickGlobally = CustomFocus;
    }

    private void CustomFocus(Expander expander)
    {
        expander.ScrollToVisible();
        Thread.Sleep(100);
        expander.Click();
    }

    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("E Button");

        button.Hover();

        var label = App.ElementCreateService.CreateByName<Button>("ebuttonHovered");
        Assert.AreEqual("ebuttonHovered", label.InnerText);
    }
}
```

Explanations
------------
Extensibility and customisation are one of the biggest advantages of BELLATRIX. So, each BELLATRIX desktop control gives you the possibility to override its behaviour for the whole test run. You need to initialise the static delegates- **Override{MethodName}Globally**.
```csharp
Button.OverrideClickGlobally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    e.ScrollToVisible();
    e.Click();
};
```
We override the behaviour of the button control with an anonymous lambda function. Instead of using clicking the button directly first wait to be clickable and scroll to be visible.
```csharp
Expander.OverrideClickGlobally = CustomFocus;

private void CustomFocus(Expander expander)
{
    expander.ScrollToVisible();
    Thread.Sleep(100);
    expander.Click();
}
```
Override the expander Click method by assigning a local private function to the global delegate.

**Note:** *Keep in mind that once the control is overridden globally, all tests call your custom logic, the default behaviour is gone.*

**Note:** *Usually, we assign the control overrides in the AssemblyInitialize method which is called once for a test run.*

Here is a list of all global override **Button** delegates:
- OverrideClickGlobally
- OverrideHoverGlobally
- OverrideInnerTextGlobally
- OverrideIsDisabledGlobally