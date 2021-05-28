---
layout: default
title:  "Behaviour Driven Development BDD Logging"
excerpt: "Learn the BELLATRIX Behaviour Driven Development BDD Logging works and how to use it."
date:   2021-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/bdd-logging/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestMethod]
public void CommonAssertionsIOSControls()
{
    var button = App.Components.CreateByName<Button>("ComputeSumButton");

    button.Click();

    button.ValidateIsNotDisabled();

    var answerLabel = App.Components.CreateByValueContaining<Label>("Label");

    answerLabel.ValidateIsVisible();

    var password = App.Components.CreateById<Password>("IntegerB");

    password.SetPassword("9");

    var textField = App.Components.CreateById<TextField>("IntegerA");

    textField.SetText("1");

    textField.ValidateTextIs("1");
}
```

Explanations
------------
There cases when you need to show your colleagues or managers what tests do you have. Sometimes you may have manual test cases, but their maintenance and up-to-date state are questionable. Also, many times you need additional work to associate the tests with the test cases. Some frameworks give you a way to write human readable tests through the Gherkin language. The main idea is non-technical people to write these tests. However, we believe this approach is doomed. Or it is doable only for simple tests. This is why in BELLATRIX we built a feature that generates the test cases after the tests execution. After each action or assertion, a new entry is logged.

After the test is executed the following log is created:

```
Start Test
Start Test
Class = BDDLoggingTests Name = CommonAssertionsIOSControls
Ensure control(Name = ComputeSumButton) is NOT disabled
Ensure control(Value containing Label) is visible
Set password '9' in control(Id = IntegerB)
Set text '1' in control(Id = IntegerA)
Ensure control(Id = IntegerA) text is '1'
```