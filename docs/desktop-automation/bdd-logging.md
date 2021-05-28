---
layout: default
title:  "Behaviour Driven Development BDD Logging"
excerpt: "Learn the BELLATRIX Behaviour Driven Development BDD Logging works and how to use it."
date:   2021-06-2s 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/bdd-logging/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[Test]
public void CommonActionsWithDesktopControls_Wpf()
{
    var calendar = App.Components.CreateByAutomationId<Calendar>("calendar");

    calendar.ValidateIsNotDisabled();

    var checkBox = App.Components.CreateByName<CheckBox>("BellaCheckBox");

    checkBox.Check();

    checkBox.ValidateIsChecked();

    var comboBox = App.Components.CreateByAutomationId<ComboBox>("select");

    comboBox.SelectByText("Item2");

    Assert.AreEqual("Item2", comboBox.InnerText);

    var label = App.Components.CreateByName<Label>("Result Label");

    label.ValidateIsVisible();

    var radioButton = App.Components.CreateByName<RadioButton>("RadioButton");

    radioButton.Click();

    radioButton.ValidateIsChecked(timeout: 30, sleepInterval: 2);
}
```

Explanations
------------
There cases when you need to show your colleagues or managers what tests do you have. Sometimes you may have manual test cases, but their maintenance and up-to-date state are questionable. Also, many times you need additional work to associate the tests with the test cases. Some frameworks give you a way to write human readable tests through the Gherkin language. The main idea is non-technical people to write these tests. However, we believe this approach is doomed. Or it is doable only for simple tests. This is why in BELLATRIX we built a feature that generates the test cases after the tests execution. After each action or assertion, a new entry is logged.

After the test is executed the following log is created:

```
> Start Test
> Class = EnsureAssertionsTests Name = CommonActionsWithDesktopControls_Wpf
> Ensure control (AutomationId = calendar) is NOT disabled
> Check control (Name = BellaCheckBox) on WPF Sample App
> Ensure control (Name = BellaCheckBox) is checked
> Select 'Item2' from control (AutomationId = select) on WPF Sample App
> Click control (Name = RadioButton) on WPF Sample App
> Ensure control (Name = RadioButton) is checked
```