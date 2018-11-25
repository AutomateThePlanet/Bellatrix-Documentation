---
layout: default
title:  "Locate Elements"
excerpt: "Learn how to locate Android elements with BELLATRIX mobile module."
date:   2018-10-20 06:50:17 +0200
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
[TestMethod]
public void ElementFound_When_CreateByIdContaining_And_ElementIsOnScreen()
{
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

    button.EnsureIsVisible();

    Console.WriteLine(button.By.Value);

    Console.WriteLine(button.WrappedElement.TagName);

	var textField = App.ElementCreateService.CreateByIdContaining<TextField>("edit");

	textField.EnsureIsVisible();
}
```

Explanations
-------
```csharp
var button = App.ElementCreateService.CreateByIdContaining<Button>("button");
```
There are different ways to locate elements on the screen. To do it you use the element create service. You need to know that BELLATRIX has a built-in complex mechanism for waiting for elements, so you do not need to worry about this anymore. Keep in mind that when you use the Create methods, the element is not searched on the screen. All elements use lazy loading. Which means that they are searched once you perform an action or assertion on them. By default on each new action, the element is searched again and be refreshed.
```csharp
Console.WriteLine(button.By.Value);
```
Because of the proxy element mechanism (we have a separate type of element instead of single WebDriver IWebElement interface or Appium AndroidElement) we have several benefits. Each control (element type- ComboBox, TextField and so on) contains only the actions you can do with it, and the methods are named properly. In vanilla WebDriver to type the text you call **SendKeys** method. Also, we have some additional properties in the proxy web control such as- By. Now you can get the locator with which you element was found.
```csharp
Console.WriteLine(button.WrappedElement.TagName);
```
You can access the WebDriver wrapped element through **WrappedElement** and the current AppiumDriver instance through- **WrappedDriver**.
```csharp
var textField = App.ElementCreateService.CreateByIdContaining<TextField>("edit");
```
Sometimes, the elements you need to perform operations on are not in the visible part of the screen. In order Appium to be able to locate them, you need to scroll to them first. To do so for Android, you need to use complex **AndroidUIAutomator** expressions. To save you lots of trouble and complex code, most of BELLATRIX locators contains the scroll logic built-in. The below element is initially not visible on the screen. BELLATRIX automatically scrolls down till the element is visible and then searches for it.

Available Create Methods
------------------------
BELLATRIX extends the vanilla WebDriver selectors and give you additional ones.
### CreateById ###
```csharp
App.ElementCreateService.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```csharp
App.ElementCreateService.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified value.
### CreateByDescription ###
```csharp
App.ElementCreateService.CreateByDescription<Button>("myDescription");
```
Searches the element by ID ending with the locator.
### CreateByDescriptionContaining ###
```csharp
App.ElementCreateService.CreateByDescriptionContaining<Button>("description");
```
Searches the element by its description if it contains specified value.
### CreateByText ###
```csharp
App.ElementCreateService.CreateByText<Button>("text");
```
Searches the element by its text.
### CreateByTextContaining ###
```csharp
App.ElementCreateService.CreateByTextContaining<Button>("partOfText");
```
Searches the element by its text if it contains specified value.
### CreateByClass ###
```csharp
App.ElementCreateService.CreateByClass<Button>("myClass");
```
Searches the element by its class.
### CreateByAndroidUIAutomator ###
```csharp
App.ElementCreateService.CreateByAndroidUIAutomator<Button>("ui-automator-expression");
```
Searches the element by Android UIAutomator expression.
### CreateByXPath ###
```csharp
App.ElementCreateService.CreateByXPath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
 

Find Multiple Elements
----------------------
Sometimes we need to find more than one element. For example, in this test we want to locate all Add to Cart buttons.
To do it you can use the element create service CreateAll method.

```csharp
[TestMethod]
public void ElementFound_When_CreateAllByIdContaining_And_ElementIsOnScreen()
{
    var buttons = App.ElementCreateService.CreateAllByIdContaining<Button>("button");

	buttons[0].EnsureIsVisible();
}
```

Available CreateAll Methods
------------------------
### CreateAllById ###
```csharp
App.ElementCreateService.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```csharp
App.ElementCreateService.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified value.
### CreateAllByDescription ###
```csharp
App.ElementCreateService.CreateAllByDescription<Button>("myDescription");
```
Searches the elements by ID ending with the locator.
### CreateAllByDescriptionContaining ###
```csharp
App.ElementCreateService.CreateAllByDescriptionContaining<Button>("description");
```
Searches the elements by its description if it contains specified value.
### CreateAllByText ###
```csharp
App.ElementCreateService.CreateAllByText<Button>("text");
```
Searches the elements by its text.
### CreateAllByTextContaining ###
```csharp
App.ElementCreateService.CreateAllByTextContaining<Button>("partOfText");
```
Searches the elements by its text if it contains specified value.
### CreateAllByClass ###
```csharp
App.ElementCreateService.CreateAllByClass<Button>("myClass");
```
Searches the elements by its class.
### CreateAllByAndroidUIAutomator ###
```csharp
App.ElementCreateService.CreateAllByAndroidUIAutomator<Button>("ui-automator-expression");
```
Searches the elements by Android UIAutomator expression.
### CreateAllByXPath ###
```csharp
App.ElementCreateService.CreateAllByXPath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.

Find Nested Elements
----------------------
Sometimes it is easier to locate one element and then find the next one that you need, inside it. For example in this test we want to locate the button inside the main view element. To do it you can use the element's Create methods.

```csharp
public void ElementFound_When_CreateByIdContaining_And_ElementIsOnScreen_NestedElement()
{
    var mainElement = App.ElementCreateService.CreateByIdContaining<Element>("decor_content_parent");
	var button = mainElement.CreateByIdContaining<Button>("button");
    button.EnsureIsVisible();
}
```

**Note**: *it is entirely legal to create a **Button** instead of **ToggleButton**. BELLATRIX library does not care about the real type of the Android elements. The proxy types are convenience wrappers so to say. Meaning they give you a better interface of predefined properties and methods to make your tests more readable.*

Available Create Methods for Finding Nested Elements
----------------------------------------------------
### CreateById ###
```csharp
element.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```csharp
element.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified value.
### CreateByDescription ###
```csharp
element.CreateByDescription<Button>("myDescription");
```
Searches the element by ID ending with the locator.
### CreateByDescriptionContaining ###
```csharp
element.CreateByDescriptionContaining<Button>("description");
```
Searches the element by its description if it contains specified value.
### CreateByText ###
```csharp
element.CreateByText<Button>("text");
```
Searches the element by its text.
### CreateByTextContaining ###
```csharp
element.CreateByTextContaining<Button>("partOfText");
```
Searches the element by its text if it contains specified value.
### CreateByClass ###
```csharp
element.CreateByClass<Button>("myClass");
```
Searches the element by its class.
### CreateByAndroidUIAutomator ###
```csharp
element.CreateByAndroidUIAutomator<Button>("ui-automator-expression");
```
Searches the element by Android UIAutomator expression.
### CreateByXPath ###
```csharp
element.CreateByXPath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.

Available CreateAll Methods for Finding Nested Elements
----------------------------------------------------
### CreateAllById ###
```csharp
element.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```csharp
element.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified value.
### CreateAllByDescription ###
```csharp
element.CreateAllByDescription<Button>("myDescription");
```
Searches the elements by ID ending with the locator.
### CreateAllByDescriptionContaining ###
```csharp
element.CreateAllByDescriptionContaining<Button>("description");
```
Searches the elements by its description if it contains specified value.
### CreateAllByText ###
```csharp
element.CreateAllByText<Button>("text");
```
Searches the elements by its text.
### CreateAllByTextContaining ###
```csharp
element.CreateAllByTextContaining<Button>("partOfText");
```
Searches the elements by its text if it contains specified value.
### CreateAllByClass ###
```csharp
element.CreateAllByClass<Button>("myClass");
```
Searches the elements by its class.
### CreateAllByAndroidUIAutomator ###
```csharp
element.CreateAllByAndroidUIAutomator<Button>("ui-automator-expression");
```
Searches the elements by Android UIAutomator expression.
### CreateAllByXPath ###
```csharp
element.CreateAllByXPath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.