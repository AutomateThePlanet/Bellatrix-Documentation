---
layout: default
title:  "Locate Elements"
excerpt: "Learn how to locate Android elements with BELLATRIX mobile module."
date:   2021-10-20 06:50:17 +0200
parent: android-automation
permalink: /android-automation/locate-elements/
anchors:
  example: Example
  explanations: Explanations
  available-create-methods: Available Create Methods
  find-multiple-elements: Find Multiple Elements
  available-createall-methods: Available CreateAll Methods
  find-nested-elements: Find Nested Elements
  available-create-methods-for-finding-nested-elements: Available Nested Create Methods
  available-createall-methods-for-finding-nested-elements: Available Nested CreateAll Methods
---
Example
-------
```csharp
[Test]
public void ElementFound_When_CreateByIdContaining_And_ElementIsOnScreen()
{
    var button = App.Components.CreateByIdContaining<Button>("button");

    button.ValidateIsVisible();

    Console.WriteLine(button.By.Value);

    Console.WriteLine(button.WrappedComponent.TagName);

	var textField = App.Components.CreateByIdContaining<TextField>("edit");

	textField.ValidateIsVisible();
}
```

Explanations
-------
```csharp
var button = App.Components.CreateByIdContaining<Button>("button");
```
There are different ways to locate elements on the screen. To do it you use the element create service. You need to know that BELLATRIX has a built-in complex mechanism for waiting for elements, so you do not need to worry about this anymore. Keep in mind that when you use the Create methods, the element is not searched on the screen. All elements use lazy loading. Which means that they are searched once you perform an action or assertion on them. By default on each new action, the element is searched again and be refreshed.
```csharp
Console.WriteLine(button.By.Value);
```
Because of the proxy element mechanism (we have a separate type of element instead of single WebDriver IWebElement interface or Appium AndroidElement) we have several benefits. Each control (element type- ComboBox, TextField and so on) contains only the actions you can do with it, and the methods are named properly. In vanilla WebDriver to type the text you call **SendKeys** method. Also, we have some additional properties in the proxy web control such as- By. Now you can get the locator with which you element was found.
```csharp
Console.WriteLine(button.WrappedComponent.TagName);
```
You can access the WebDriver wrapped element through **WrappedElement** and the current AppiumDriver instance through- **WrappedDriver**.
```csharp
var textField = App.Components.CreateByIdContaining<TextField>("edit");
```
Sometimes, the elements you need to perform operations on are not in the visible part of the screen. In order Appium to be able to locate them, you need to scroll to them first. To do so for Android, you need to use complex **AndroidUIAutomator** expressions. To save you lots of trouble and complex code, most of BELLATRIX locators contains the scroll logic built-in. The below element is initially not visible on the screen. BELLATRIX automatically scrolls down till the element is visible and then searches for it.

Available Create Methods
------------------------
BELLATRIX extends the vanilla WebDriver selectors and give you additional ones.
### CreateById ###
```csharp
App.Components.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```csharp
App.Components.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified value.
### CreateByDescription ###
```csharp
App.Components.CreateByDescription<Button>("myDescription");
```
Searches the element by ID ending with the locator.
### CreateByDescriptionContaining ###
```csharp
App.Components.CreateByDescriptionContaining<Button>("description");
```
Searches the element by its description if it contains specified value.
### CreateByText ###
```csharp
App.Components.CreateByText<Button>("text");
```
Searches the element by its text.
### CreateByTextContaining ###
```csharp
App.Components.CreateByTextContaining<Button>("partOfText");
```
Searches the element by its text if it contains specified value.
### CreateByClass ###
```csharp
App.Components.CreateByClass<Button>("myClass");
```
Searches the element by its class.
### CreateByAndroidUIAutomator ###
```csharp
App.Components.CreateByAndroidUIAutomator<Button>("ui-automator-expression");
```
Searches the element by Android UIAutomator expression.
### CreateByXPath ###
```csharp
App.Components.CreateByXPath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
 

Find Multiple Elements
----------------------
Sometimes we need to find more than one component. For example, in this test we want to locate all Add to Cart buttons.
To do it you can use the element create service CreateAll method.

```csharp
[Test]
public void ElementFound_When_CreateAllByIdContaining_And_ElementIsOnScreen()
{
    var buttons = App.Components.CreateAllByIdContaining<Button>("button");

	buttons[0].ValidateIsVisible();
}
```

Available CreateAll Methods
------------------------
### CreateAllById ###
```csharp
App.Components.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```csharp
App.Components.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified value.
### CreateAllByDescription ###
```csharp
App.Components.CreateAllByDescription<Button>("myDescription");
```
Searches the elements by ID ending with the locator.
### CreateAllByDescriptionContaining ###
```csharp
App.Components.CreateAllByDescriptionContaining<Button>("description");
```
Searches the elements by its description if it contains specified value.
### CreateAllByText ###
```csharp
App.Components.CreateAllByText<Button>("text");
```
Searches the elements by its text.
### CreateAllByTextContaining ###
```csharp
App.Components.CreateAllByTextContaining<Button>("partOfText");
```
Searches the elements by its text if it contains specified value.
### CreateAllByClass ###
```csharp
App.Components.CreateAllByClass<Button>("myClass");
```
Searches the elements by its class.
### CreateAllByAndroidUIAutomator ###
```csharp
App.Components.CreateAllByAndroidUIAutomator<Button>("ui-automator-expression");
```
Searches the elements by Android UIAutomator expression.
### CreateAllByXPath ###
```csharp
App.Components.CreateAllByXPath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.

Find Nested Elements
----------------------
Sometimes it is easier to locate one element and then find the next one that you need, inside it. For example in this test we want to locate the button inside the main view component. To do it you can use the element's Create methods.

```csharp
public void ElementFound_When_CreateByIdContaining_And_ElementIsOnScreen_NestedElement()
{
    var mainElement = App.Components.CreateByIdContaining<Element>("decor_content_parent");
	var button = maincomponent.CreateByIdContaining<Button>("button");
    button.ValidateIsVisible();
}
```

**Note**: *it is entirely legal to create a **Button** instead of **ToggleButton**. BELLATRIX library does not care about the real type of the Android elements. The proxy types are convenience wrappers so to say. Meaning they give you a better interface of predefined properties and methods to make your tests more readable.*

Available Create Methods for Finding Nested Elements
----------------------------------------------------
### CreateById ###
```csharp
component.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```csharp
component.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified value.
### CreateByDescription ###
```csharp
component.CreateByDescription<Button>("myDescription");
```
Searches the element by ID ending with the locator.
### CreateByDescriptionContaining ###
```csharp
component.CreateByDescriptionContaining<Button>("description");
```
Searches the element by its description if it contains specified value.
### CreateByText ###
```csharp
component.CreateByText<Button>("text");
```
Searches the element by its text.
### CreateByTextContaining ###
```csharp
component.CreateByTextContaining<Button>("partOfText");
```
Searches the element by its text if it contains specified value.
### CreateByClass ###
```csharp
component.CreateByClass<Button>("myClass");
```
Searches the element by its class.
### CreateByAndroidUIAutomator ###
```csharp
component.CreateByAndroidUIAutomator<Button>("ui-automator-expression");
```
Searches the element by Android UIAutomator expression.
### CreateByXPath ###
```csharp
component.CreateByXPath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.

Available CreateAll Methods for Finding Nested Elements
----------------------------------------------------
### CreateAllById ###
```csharp
component.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```csharp
component.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified value.
### CreateAllByDescription ###
```csharp
component.CreateAllByDescription<Button>("myDescription");
```
Searches the elements by ID ending with the locator.
### CreateAllByDescriptionContaining ###
```csharp
component.CreateAllByDescriptionContaining<Button>("description");
```
Searches the elements by its description if it contains specified value.
### CreateAllByText ###
```csharp
component.CreateAllByText<Button>("text");
```
Searches the elements by its text.
### CreateAllByTextContaining ###
```csharp
component.CreateAllByTextContaining<Button>("partOfText");
```
Searches the elements by its text if it contains specified value.
### CreateAllByClass ###
```csharp
component.CreateAllByClass<Button>("myClass");
```
Searches the elements by its class.
### CreateAllByAndroidUIAutomator ###
```csharp
component.CreateAllByAndroidUIAutomator<Button>("ui-automator-expression");
```
Searches the elements by Android UIAutomator expression.
### CreateAllByXPath ###
```csharp
component.CreateAllByXPath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.