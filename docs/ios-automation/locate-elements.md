---
layout: default
title:  "Locate Elements"
excerpt: "Learn how to locate iOS elements with BELLATRIX mobile module."
date:   2018-10-20 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/locate-elements/
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
public void ElementFound_When_CreateById_And_ElementIsOnScreen()
{
    var button = App.ElementCreateService.CreateById<Button>("ComputeSumButton");

    button.EnsureIsVisible();

    Console.WriteLine(button.By.Value);

    Console.WriteLine(button.WrappedElement.TagName);

    var answerLabel = App.ElementCreateService.CreateById<Button>("BELLATRIX");
    answerLabel.ScrollToVisible(ScrollDirection.Up);

    answerLabel.Click();
}
```

Explanations
-------
```csharp
var button = App.ElementCreateService.CreateById<Button>("ComputeSumButton");
```
There are different ways to locate elements on the screen. To do it you use the element create service. You need to know that BELLATRIX has a built-in complex mechanism for waiting for elements, so you do not need to worry about this anymore. Keep in mind that when you use the Create methods, the element is not searched on the screen. All elements use lazy loading. Which means that they are searched once you perform an action or assertion on them. By default on each new action, the element is searched again and be refreshed.
```csharp
Console.WriteLine(button.By.Value);
```
Because of the proxy element mechanism (we have a separate type of element instead of single WebDriver IWebElement interface or Appium IOSElement) we have several benefits. Each control (element type- ComboBox, TextField and so on) contains only the actions you can do with it, and the methods are named properly. In vanilla WebDriver to type the text you call **SendKeys** method. Also, we have some additional properties in the proxy web control such as- By. Now you can get the locator with which you element was found.
```csharp
Console.WriteLine(button.WrappedElement.TagName);
```
You can access the WebDriver wrapped element through **WrappedElement** and the current AppiumDriver instance through- **WrappedDriver**.
```csharp
var answerLabel = App.ElementCreateService.CreateById<Button>("BELLATRIX, from 11:00 PM to Monday, November 12, 12:00 AM");
answerLabel.ScrollToVisible(ScrollDirection.Up);
```
Sometimes, the elements you need to perform operations on are not in the visible part of the screen. In order Appium to be able to locate them, you need to scroll to them first. To do so for iOS, you need to use **ScrollToVisible** method.

Available Create Methods
------------------------
BELLATRIX extends the vanilla WebDriver selectors and give you additional ones.
### CreateById ###
```csharp
App.ElementCreateService.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByName ###
```csharp
App.ElementCreateService.CreateByName<Button>("ComputeSumButton");
```
Searches the element by its name.
### CreateByValueContaining ###
```csharp
App.ElementCreateService.CreateByValueContaining<Label>("SumLabel");
```
Searches the element by its value if it contains specified value.
### CreateByIOSUIAutomation ###
```csharp
App.ElementCreateService.CreateByIOSUIAutomation<TextField>(".textFields().withPredicate("value == 'Search eBay'")");
```
Searches the element by iOS UIAutomation expressions.
### CreateByIOSNsPredicate ###
```csharp
App.ElementCreateService.CreateByIOSNsPredicateCreateByIOSNsPredicate<RadioButton>("type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");
```
Searches the element by iOS NsPredicate expression.
### CreateByClass ###
```csharp
App.ElementCreateService.CreateByClass<TextField>("XCUIElementTypeTextField");
```
Searches the element by its class.
### CreateByXPath ###
```csharp
App.ElementCreateService.CreateByXPath<Button>("//XCUIElementTypeButton[@name=\"ComputeSumButton\"]");
```
Searches the element by XPath locator.
 

Find Multiple Elements
----------------------
Sometimes we need to find more than one element. For example, in this test we want to locate all Add to Cart buttons.
To do it you can use the element create service **CreateAll** method.

```csharp
[TestMethod]
public void ElementFound_When_CreateAllById_And_ElementIsOnScreen()
{
	var buttons = App.ElementCreateService.CreateAllById<Button>("ComputeSumButton");

	buttons[0].EnsureIsVisible();
}
```

Available CreateAll Methods
------------------------
### CreateAllById ###
```csharp
App.ElementCreateService.CreateAllById<Button>("myId");
```
Searches the elements by their ID.
### CreateAllByName ###
```csharp
App.ElementCreateService.CreateAllByName<Button>("ComputeSumButton");
```
Searches the elements by their name.
### CreateAllByValueContaining ###
```csharp
App.ElementCreateService.CreateAllByValueContaining<Label>("SumLabel");
```
Searches the elements by their value if it contains specified value.
### CreateAllByIOSUIAutomation ###
```csharp
App.ElementCreateService.CreateAllByIOSUIAutomation<TextField>(".textFields().withPredicate("value == 'Search eBay'")");
```
Searches the elements by iOS UIAutomation expressions.
### CreateAllByIOSNsPredicate ###
```csharp
App.ElementCreateService.CreateByAllIOSNsPredicate<RadioButton>("type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");
```
Searches the elements by iOS NsPredicate expression.
### CreateAllByClass ###
```csharp
App.ElementCreateService.CreateAllByClass<TextField>("XCUIElementTypeTextField");
```
Searches the elements by their class.
### CreateAllByXPath ###
```csharp
App.ElementCreateService.CreateAllByXPath<Button>("//XCUIElementTypeButton[@name=\"ComputeSumButton\"]");
```
Searches the elements by XPath locator.

Find Nested Elements
----------------------
Sometimes it is easier to locate one element and then find the next one that you need, inside it. For example in this test we want to locate the button inside the main view element. To do it you can use the element's Create methods.

```csharp
public void ElementFound_When_CreateById_And_ElementIsOnScreen_NestedElement()
{
	var mainElement = App.ElementCreateService.CreateByIOSNsPredicate<Element>(
								"type == \"XCUIElementTypeApplication\" AND name == \"TestApp\"");
    var button = mainElement.CreateById<RadioButton>("ComputeSumButton");
    button.EnsureIsVisible();
}
```

**Note**: *it is entirely legal to create a **Button** instead of **ToggleButton**. BELLATRIX library does not care about the real type of the iOS elements. The proxy types are convenience wrappers so to say. Meaning they give you a better interface of predefined properties and methods to make your tests more readable.*

Available Create Methods for Finding Nested Elements
----------------------------------------------------
### CreateById ###
```csharp
element.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByName ###
```csharp
element.CreateByName<Button>("ComputeSumButton");
```
Searches the element by its name.
### CreateByValueContaining ###
```csharp
element.CreateByValueContaining<Label>("SumLabel");
```
Searches the element by its value if it contains specified value.
### CreateByIOSUIAutomation ###
```csharp
element.CreateByIOSUIAutomation<TextField>(".textFields().withPredicate("value == 'Search eBay'")");
```
Searches the element by iOS UIAutomation expressions.
### CreateByClass ###
```csharp
element.CreateByClass<TextField>("XCUIElementTypeTextField");
```
Searches the element by its class.
### CreateByXPath ###
```csharp
element.CreateByXPath<Button>("//XCUIElementTypeButton[@name=\"ComputeSumButton\"]");
```
Searches the element by XPath locator.
### CreateAllById ###
```csharp
element.CreateAllById<Button>("myId");
```
Searches the elements by their ID.
### CreateAllByName ###
```csharp
element.CreateAllByName<Button>("ComputeSumButton");
```
Searches the elements by their name.
### CreateAllByValueContaining ###
```csharp
element.CreateAllByValueContaining<Label>("SumLabel");
```
Searches the elements by their value if it contains specified value.
### CreateAllByIOSUIAutomation ###
```csharp
element.CreateAllByIOSUIAutomation<TextField>(".textFields().withPredicate("value == 'Search eBay'")");
```
Searches the elements by iOS UIAutomation expressions.
### CreateAllByClass ###
```csharp
element.CreateAllByClass<TextField>("XCUIElementTypeTextField");
```
Searches the elements by their class.
### CreateAllByXPath ###
```csharp
element.CreateAllByXPath<Button>("//XCUIElementTypeButton[@name=\"ComputeSumButton\"]");
```
Searches the elements by XPath locator.