---
layout: default
title:  "Behaviour Driven Development BDD Logging"
excerpt: "Learn the BELLATRIX Behaviour Driven Development BDD Logging works and how to use it."
date:   2021-10-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/bdd-logging/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[Test]
public void CommonAssertionsAndroidControls()
{
    var button = App.Components.CreateByIdContaining<Button>("button");

    button.ValidateIsNotDisabled();

    var checkBox = App.Components.CreateByIdContaining<CheckBox>("check1");

    checkBox.Check();

    checkBox.ValidateIsChecked();

    var comboBox = App.Components.CreateByIdContaining<ComboBox>("spinner1");

    comboBox.SelectByText("Jupiter");

    comboBox.ValidateTextIs("Jupiter");

    var label = App.Components.CreateByText<Label>("textColorPrimary");

    label.ValidateIsVisible();

    var radioButton = App.Components.CreateByIdContaining<RadioButton>("radio2");

    radioButton.Click();

    radioButton.ValidateIsChecked(timeout: 30, sleepInterval: 2);
}
```

Explanations
------------
There cases when you need to show your colleagues or managers what tests do you have. Sometimes you may have manual test cases, but their maintenance and up-to-date state are questionable. Also, many times you need additional work to associate the tests with the test cases. Some frameworks give you a way to write human readable tests through the Gherkin language. The main idea is non-technical people to write these tests. However, we believe this approach is doomed. Or it is doable only for simple tests. This is why in BELLATRIX we built a feature that generates the test cases after the tests execution. After each action or assertion, a new entry is logged.

After the test is executed the following log is created:

```
Start Test
Class = BDDLoggingTests Name = CommonAssertionsAndroidControls
Ensure control(ID = button) is NOT disabled
Check control(ID = check1) on
Ensure control(ID = check1) is checked
Select 'Jupiter' from control (ID = spinner1) on
Click control(Text = Jupiter) on
Ensure control(ID = spinner1) text is 'Jupiter'
Ensure control(Text = textColorPrimary) is visible
Click control(ID = radio2) on
Ensure control(ID = radio2) is checked
```