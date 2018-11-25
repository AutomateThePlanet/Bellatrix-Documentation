---
layout: default
title:  "Common Controls"
excerpt: "Learn how to use BELLATRIX common iOS controls."
date:   2018-06-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/common-controls/
anchors:
  example: Example
  explanations: Explanations
  full-list-of-all-supported-ios-controls: List of All iOS Controls
---
Example
-------
```csharp
[TestMethod]
public void CommonActionsWithIOSControls()
{
    var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

    button.Click();

    var seekBar = App.ElementCreateService.CreateByName<SeekBar>("AppElem");

    seekBar.Set(9);

    seekBar.ToExists().WaitToBe();

    var answerLabel = App.ElementCreateService.CreateByName<Label>("Answer");

    Assert.IsTrue(answerLabel.IsPresent);

    var password = App.ElementCreateService.CreateById<Password>("IntegerB");

    password.SetPassword("9");

    var textField = App.ElementCreateService.CreateById<TextField>("IntegerA");

    textField.SetText("1");

    Assert.AreEqual("1", textField.GetText());

    var checkBox = App.ElementCreateService.CreateByIOSNsPredicate<CheckBox>("type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");

    checkBox.Check();

    Assert.IsTrue(checkBox.IsChecked);

    checkBox.Uncheck();

    Assert.IsFalse(checkBox.IsChecked);

    var radioButton = App.ElementCreateService.CreateByIOSNsPredicate<RadioButton>("type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");

    Assert.IsFalse(radioButton.IsChecked);

    radioButton.Click();

    Assert.IsTrue(radioButton.IsChecked);
}
```

Explanations
------------
As mentioned before BELLATRIX exposes 15+ iOS controls. All of them implement Proxy design pattern which means that they are not located immediately when they are created. Another benefit is that each of them includes only the actions that you should be able to do with the specific control and nothing more. For example, you cannot type into a button. Moreover, this way all of the actions has meaningful names- Type not **SendKeys** as in vanilla WebDriver.
```csharp
var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");
```
Create methods accept a generic parameter the type of the iOS control. Then only the methods for this specific control are accessible. Here we tell BELLATRIX to find your element by name equals the value 'button'.
```csharp
button.Click();
```
Clicking the button. At this moment BELLATRIX locates the element.
```csharp
var seekBar = App.ElementCreateService.CreateByName<SeekBar>("AppElem");
seekBar.Set(9);
```
Moves the seekbar.
```csharp
seekBar.ToExists().WaitToBe();
```
Wait for the element to exists.
```csharp
var answerLabel = App.ElementCreateService.CreateByName<Label>("Answer");
Assert.IsTrue(answerLabel.IsPresent);
```
See if the element is present or not using the IsPresent property.
```csharp
var password = App.ElementCreateService.CreateById<Password>("IntegerB");
password.SetPassword("9");
```
Instead of using the non-meaningful method **SendKeys**, BELLATRIX gives you more readable tests through proper methods and properties names. In this case, we set the text in the password field using the **SetPassword** method and SetText for regular text fields.
```csharp
var checkBox = App.ElementCreateService.CreateByIOSNsPredicate<CheckBox>("type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");
checkBox.Check();
checkBox.Uncheck();
```
Checking and unchecking the checkbox with **IOSNsPredicate** = **'type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"'**.
```csharp
Assert.IsTrue(checkBox.IsChecked);
```
Asserting whether the check was successful.
```csharp
var radioButton = App.ElementCreateService.CreateByIOSNsPredicate<RadioButton>("type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");
radioButton.Click();
```
Select the radio button.
```csharp
Assert.IsTrue(radioButton.IsChecked);
```
Most IOS controls have properties such as checking whether the radio button is enabled or not.

Full List of All Supported iOS Controls
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
- Location
- Size

**Note**: *All other controls have access to the above methods and properties*

Element | Available properties
------------ | -------------
Button | Click, GetText, IsDisabled
CheckBox | Check, Uncheck, GetText, IsDisabled, IsChecked
ComboBox | SelectByText, GetText, IsDisabled
Grid<TElement> | GetAll
Image | same as element
ImageButton | Click, GetText, IsDisabled
Label | GetText
Number | SetNumber, GetNumber, IsDisabled
Password | GetPassword, SetPassword, IsDisabled
Progress | IsDisabled
RadioButton | Click, IsDisabled, IsChecked, GetText
RadioGroup | ClickByText, ClickByIndex, GetChecked, GetAll
SeekBar | Set, IsDisabled
Tabs<TElement> | GetAll
TextField | SetText, GetText, IsDisabled
ToggleButton | TurnOn, TurnOff, GetText, IsDisabled, IsOn