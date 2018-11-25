---
layout: default
title:  "Ensure Assertions"
excerpt: "Learn how to use BELLATRIX ensure assertion methods."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/ensure-assertions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestMethod]
public void CommonActionsWithDesktopControls_Wpf()
{
    var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");

    calendar.EnsureIsNotDisabled();

    var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");

    checkBox.Check();

    checkBox.EnsureIsChecked();

    var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("select");

    comboBox.SelectByText("Item2");

    Assert.AreEqual("Item2", comboBox.InnerText);

    var label = App.ElementCreateService.CreateByName<Label>("Result Label");

    label.EnsureIsVisible();

    var radioButton = App.ElementCreateService.CreateByName<RadioButton>("RadioButton");

    radioButton.Click();

    radioButton.EnsureIsChecked(timeout: 30, sleepInterval: 2);
}
```

Explanations
------------
```csharp
calendar.EnsureIsNotDisabled();
//Assert.AreEqual(false, calendar.IsDisabled);
```
We can assert weather the control is disabled. The different BELLATRIX desktop elements classes contain lots of these properties which are a representation of the most important app element attributes. The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. This is so because most unit testing frameworks are created for much simpler and shorter unit tests. In next chapter, there is information how BELLATRIX solves the problems with the introduction of Ensure methods. If the bellow assertion fails the following message is displayed: "*Message: Assert.AreEqual failed. Expected:<false>. Actual:<true>.*" You can guess what happened, but you do not have information which element failed and on which page. 
If we use the Ensure extension methods, BELLATRIX waits some time for the condition to pass. After this period if it is not successful, a beatified meaningful exception message is displayed: "*The control should be disabled but it was NOT.*"
```csharp
 var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");

checkBox.EnsureIsChecked();
```
Here we assert that the checkbox is checked. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*" Cannot learn much about what happened.
Now if we use the EnsureIsChecked method and the assertion does not succeed the following error message is displayed: "*The control should be checked but was NOT.*"
```csharp
var label = App.ElementCreateService.CreateByName<Label>("Result Label");
label.EnsureIsVisible();
```
See if the element is present or not using the IsPresent property.
```csharp
var radioButton = App.ElementCreateService.CreateByName<RadioButton>("RadioButton");
radioButton.EnsureIsChecked(timeout: 30, sleepInterval: 2);
```
By default, all Ensure methods have 5 seconds timeout. However, you can specify a custom timeout and sleep interval (period for checking again).

BELLATRIX provides you with a full BDD logging support for ensure assertions and gives you a way to hook your logic in multiple places.