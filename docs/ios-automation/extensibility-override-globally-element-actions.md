---
layout: default
title:  "Extensibility- Override Globally Element Actions"
excerpt: "Learn how to override some iOS elements actions/properties for the whole tests execution."
date:   2018-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/extensibility-override-globally-element-actions/
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
public class OverrideGloballyElementActionsTests : IOSTest
{
    public override void TestsArrange()
    {
        Button.OverrideClickGlobally = (e) =>
        {
            e.ToExists().ToBeClickable().WaitToBe();
            e.ScrollToVisible(ScrollDirection.Down);
            e.Click();
        };

        RadioButton.OverrideClickGlobally = CustomClick;
    }

    private void CustomClick(RadioButton radioButton)
    {
        radioButton.ScrollToVisible(ScrollDirection.Down);
        Thread.Sleep(100);
        radioButton.Click();
    }

    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Explanations
------------
Extensibility and customization are one of the biggest advantages of BELLATRIX. So, each BELLATRIX desktop control gives you the possibility to override its behaviour for the whole test run. You need to initialise the static delegates- **Override{MethodName}Globally**.
```csharp
Button.OverrideClickGlobally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    e.ScrollToVisible(ScrollDirection.Down);
    e.Click();
};
```
We override the behaviour of the button control with an anonymous lambda function. Instead of using clicking the button directly first wait to be clickable and scroll to be visible.
```csharp
RadioButton.OverrideClickGlobally = CustomClick;

private void CustomClick(RadioButton radioButton)
{
    radioButton.ScrollToVisible(ScrollDirection.Down);
    Thread.Sleep(100);
    radioButton.Click();
}
```
Override the radio button Click method by assigning a local private function to the global delegate.

**Note:** *Keep in mind that once the control is overridden globally, all tests call your custom logic, the default behaviour is gone.*

**Note:** *Usually, we assign the control overrides in the AssemblyInitialize method which is called once for a test run.*

Here is a list of all global override **Button** delegates:
- OverrideClickGlobally
- OverrideGetTextGlobally
- OverrideIsDisabledGlobally