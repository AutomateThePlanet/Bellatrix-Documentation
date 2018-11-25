---
layout: default
title:  "Common Controls"
excerpt: "Learn how to use BELLATRIX common Android controls."
date:   2018-10-22 06:50:17 +0200
parent: android-automation
permalink: /desktop-automation/common-controls/
anchors:
  example: Example
  explanations: Explanations
  full-list-of-all-supported-android-controls: List of All Android Controls
---
Example
-------
```csharp
[TestMethod]
public void CommonActionsWithAndroidControls()
{
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

    button.Click();

    var radioButton = App.ElementCreateService.CreateByIdContaining<RadioButton>("radio2");

    Assert.AreEqual(false, radioButton.IsDisabled);

    var checkBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check1");

    checkBox.Check();

    Assert.IsTrue(checkBox.IsChecked);

    checkBox.Uncheck();

    Assert.IsFalse(checkBox.IsChecked);

    var comboBox = App.ElementCreateService.CreateByIdContaining<ComboBox>("spinner1");

    comboBox.SelectByText("Jupiter");

    Assert.AreEqual("Jupiter", comboBox.GetText());

    var label = App.ElementCreateService.CreateByText<Label>("textColorPrimary");

    Assert.IsTrue(label.IsPresent);

    var password = App.ElementCreateService.CreateByDescription<Password>("passwordBox");

    password.SetPassword("topsecret");

    var textField = App.ElementCreateService.CreateByIdContaining<TextField>("edit");

    textField.SetText("BELLATRIX");

    Assert.AreEqual("BELLATRIX", textField.GetText());

    radioButton.Click();

    Assert.IsTrue(radioButton.IsChecked);

    App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".view.SeekBar1");
    var seekBar = App.ElementCreateService.CreateByClass<SeekBar>("android.widget.SeekBar");

    seekBar.Set(9);

    seekBar.ToExists().WaitToBe();
}
```

Explanations
------------
As mentioned before BELLATRIX exposes 18+ Android controls. All of them implement Proxy design pattern which means that they are not located immediately when they are created. Another benefit is that each of them includes only the actions that you should be able to do with the specific control and nothing more. For example, you cannot type into a button. Moreover, this way all of the actions has meaningful names- Type not **SendKeys** as in vanilla WebDriver.
```csharp
var button = App.ElementCreateService.CreateByName<Button>("E Button");
```
Create methods accept a generic parameter the type of the Android control. Then only the methods for this specific control are accessible. Here we tell BELLATRIX to find your element by ID containing the value 'button'.
```csharp
button.Click();
```
Clicks the button. At this moment BELLATRIX locates the element.
```csharp
var radioButton = App.ElementCreateService.CreateByIdContaining<RadioButton>("radio2");
```
Locating the radio button control using ID containing the value 'radio2'.
```csharp
Assert.AreEqual(false, radioButton.IsDisabled);
```
Most Android controls have properties such as checking whether the radio button is enabled or not.
```csharp
var checkBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check1");
checkBox.Check();
```
Checking and unchecking the CheckBox with id = 'check1'
```csharp
Assert.IsTrue(checkBox.IsChecked);
```
Asserting whether the check was successful.
```csharp
var comboBox = App.ElementCreateService.CreateByIdContaining<ComboBox>("spinner1");
comboBox.SelectByText("Jupiter");
```
Select a value in ComboBox but text.
```csharp
Assert.AreEqual("Jupiter", comboBox.GetText());
```
Get the current ComboBox text through **GetText** method.
```csharp
var seekBar = App.ElementCreateService.CreateByClass<SeekBar>("android.widget.SeekBar");
seekBar.Set(9);
```
Moves the SeekBar.
```csharp
seekBar.ToExists().WaitToBe();
```
Wait for the element to exists.
```csharp
var label = App.ElementCreateService.CreateByText<Label>("textColorPrimary");
Assert.IsTrue(label.IsPresent);
```
See if the element is present or not using the **IsPresent** property.
```csharp
var password = App.ElementCreateService.CreateByDescription<Password>("passwordBox");
password.SetPassword("topsecret");
var textField = App.ElementCreateService.CreateByIdContaining<TextField>("edit");
textField.SetText("Bellatrix");
```
Instead of using the non-meaningful method **SendKeys**, BELLATRIX gives you more readable tests through proper methods and properties names. In this case, we set the text in the password field using the **SetPassword** method and **SetText** for regular text fields.
```csharp
var radioButton = App.ElementCreateService.CreateByIdContaining<RadioButton>("radio2");
radioButton.Click();
 Assert.IsTrue(radioButton.IsChecked);
```
Select the radio button.


Full List of All Supported Android Controls
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
Image | *same as element*
ImageButton | Click, GetText, IsDisabled
Label | GetText
Number | SetNumber, GetNumber, IsDisabled
Password | GetPassword, SetPassword, IsDisabled
Progress | IsDisabled
RadioButton | Click, IsDisabled, IsChecked, GetText
RadioGroup | ClickByText, ClickByIndex, GetChecked, GetAll
SeekBar | Set, IsDisabled
Switch | TurnOn, TurnOff, GetText, IsDisabled, IsOn
Tabs<TElement> | GetAll
TextField | SetText, GetText, IsDisabled
ToggleButton | TurnOn, TurnOff, GetText, IsDisabled, IsOn