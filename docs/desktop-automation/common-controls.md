---
layout: default
title:  "Common Controls"
excerpt: "Learn how to use Bellatrix common desktop control."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/common-controls/
anchors:
  example: Example
  explanations: Explanations
  full-list-of-all-supported-web-controls: List of All Web Controls
---
Example
-------
```csharp
[TestMethod]
public void CommonActionsWithDesktopControls_Wpf()
{
    var button = App.ElementCreateService.CreateByName<Button>("E Button");

    button.Click();

    var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");

    Assert.AreEqual(false, calendar.IsDisabled);

    var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");
    checkBox.Check();

    Assert.IsTrue(checkBox.IsChecked);

    checkBox.Uncheck();
    Assert.IsFalse(checkBox.IsChecked);

    var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("select");
    comboBox.SelectByText("Item2");

    Assert.AreEqual("Item2", comboBox.InnerText);

    var datePicker = App.ElementCreateService.CreateByAutomationId<Date>("DatePicker");
    datePicker.Hover();

    var element = App.ElementCreateService.CreateByName<Element>("DisappearAfterButton1");
    element.ToNotExists().WaitToBe();

    var label = App.ElementCreateService.CreateByName<Label>("Result Label");
    Assert.IsTrue(label.IsPresent);

    var password = App.ElementCreateService.CreateByAutomationId<Password>("passwordBox");
    password.SetPassword("topsecret");

    var textField = App.ElementCreateService.CreateByAutomationId<TextField>("textBox");
    textField.SetText("Meissa Is Beautiful!");

    Assert.AreEqual("Meissa Is Beautiful!", textField.InnerText);

    var radioButton = App.ElementCreateService.CreateByName<RadioButton>("RadioButton");
    radioButton.Click();

    Assert.IsTrue(radioButton.IsChecked);
}
```

Explanations
------------
As mentioned before Bellatrix exposes 18+ desktop controls. All of them implement Proxy design pattern which means that they are not located immediately when they are created. Another benefit is that each of them includes only the actions that you should be able to do with the specific control and nothing more. For example, you cannot type into a button. Moreover, this way all of the actions has meaningful names- Type not **SendKeys** as in vanilla WebDriver.
```csharp
var button = App.ElementCreateService.CreateByName<Button>("E Button");
```
Create methods accept a generic parameter the type of the web control. Then only the methods for this specific control are accessible. Here we tell Bellatrix to find your element by name attribute equals to 'E Button'.
```csharp
button.Click();
```
Clicking the button. At this moment Bellatrix locates the element.
```csharp
var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");
```
Locating the calendar control using automationId = calendar
```csharp
 Assert.AreEqual(false, calendar.IsDisabled);
```
Most desktop controls have properties such as checking whether the calendar is enabled or not.
```csharp
var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");
checkBox.Check();
```
Checking and unchecking the checkbox with name = 'BellaCheckBox'
```csharp
Assert.IsTrue(checkBox.IsChecked);
```
Asserting whether the check was successful.
```csharp
var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("select");
comboBox.SelectByText("Item2");
```
Select a value in combobox but text.
```csharp
Assert.AreEqual("Item2", comboBox.InnerText);
```
Get the current comboBox text through InnerText property.
```csharp
var datePicker = App.ElementCreateService.CreateByAutomationId<Date>("DatePicker");
datePicker.Hover();
```
You can hover on most desktop controls or search for elements inside them.
```csharp
var element = App.ElementCreateService.CreateByName<Element>("DisappearAfterButton1");
element.ToNotExists().WaitToBe();
```
Wait for the element to disappear.
```csharp
var label = App.ElementCreateService.CreateByName<Label>("Result Label");
Assert.IsTrue(label.IsPresent);
```
See if the element is present or not using the **IsPresent** property.
```csharp
var password = App.ElementCreateService.CreateByAutomationId<Password>("passwordBox");
password.SetPassword("topsecret");
```
Instead of using the non-meaningful method **SendKeys**, Bellatrix gives you more readable tests through proper methods and properties names. In this case, we set the text in the password field using the **SetPassword** method and **SetText** for regular text fields.
```csharp
var radioButton = App.ElementCreateService.CreateByName<RadioButton>("RadioButton");
radioButton.Click();
```
Select the radio button.

Full List of All Supported Web Controls
---------------------------------------
### Element ###
- By
- GetAttribute
- ScrollToVisible
- Create
- CreateAll
- WaitToBe
- IsPresent
- IsVisible
- ElementName
- PageName

**Note**: *All other controls have access to the above methods and properties*

Element | Available properties
------------ | -------------
Button | Click, Hover, InnerText, IsDisabled
Calendar | Hover, IsDisabled
Checkbox | Check, Uncheck, Hover, IsDisabled, IsChecked
ComboBox | Hover, SelectByText, InnerText, IsDisabled
Date | GetDate, SetDate, Hover, IsDisabled
Expander | Click, Hover, IsDisabled
Image | Hover
Label | Hover, InnerText
ListBox | Hover, IsDisabled
Menu | Hover
Password | GetPassword, SetPassword, Hover, IsDisabled
Progress | Hover
RadioButton | Hover, Click, IsDisabled, IsChecked
Tabs | Hover
TextArea | GetText, SetText, Hover, InnerText, IsDisabled
TextField | SetText, Hover, InnerText, IsDisabled
Time | GetTime, SetTime, Hover, IsDisabled