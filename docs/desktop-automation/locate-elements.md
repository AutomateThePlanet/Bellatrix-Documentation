---
layout: default
title:  "Locate Elements"
excerpt: "Learn how to locate desktop elements with BELLATRIX desktop module."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/locate-elements/
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
public void MessageChanged_When_ButtonHovered_Wpf()
{
    var button = App.ElementCreateService.CreateByName<Button>("E Button");

    button.Hover();

    Console.WriteLine(button.By.Value);

    Console.WriteLine(button.WrappedElement.Coordinates);
}
```

Explanations
-------
```csharp
var button = App.ElementCreateService.CreateByName<Button>("E Button");
```
There are different ways to locate elements in the app. To do it you use the element create service. You need to know that BELLATRIX has a built-in complex mechanism for waiting for elements, so you do not need to worry about this anymore. Keep in mind that when you use the Create methods, the element is not searched. All elements use lazy loading.Which means that they are searched once you perform an action or assertion on them. By default on each new action, the element is searched again and be refreshed.
```csharp
Console.WriteLine(button.By.Value);
```
Because of the proxy element mechanism (we have a separate type of element instead of single WebDriver IWebElement interface) we have several benefits. Each control (element type- ComboBox, TextField and so on) contains only the actions you can do with it, and the methods are named properly. In vanilla WebDriver to type the text you call **SendKeys** method. Also, we have some additional properties in the proxy web control such as- By. Now you can get the locator with which you element was found.
```csharp
Console.WriteLine(button.WrappedElement.Coordinates);
```
You can access the WebDriver wrapped element through WrappedElement and the current WebDriver instance through- WrappedDriver

Available Create Methods
------------------------
BELLATRIX extends the vanilla WebDriver selectors and give you additional ones.
### CreateByTag ###
```csharp
App.ElementCreateService.CreateByTag<Button>("button");
```
Searches the element by its tag.
### CreateById ###
```csharp
App.ElementCreateService.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByXpath ###
```csharp
App.ElementCreateService.CreateByXpath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
### CreateByClass ###
```csharp
App.ElementCreateService.CreateByClassContaining<Button>("ul.products");
```
Searches the element by its CSS classes.
### CreateByName ###
```csharp
App.ElementCreateService.CreateByName<Button>("products");
```
Searches the element by its name.
### CreateByAccessibilityId ###
```csharp
App.ElementCreateService.CreateByAccessibilityId<Button>("myCustomButton");
```
Searches the element by its accessibility ID.
### CreateByAutomationId ###
```csharp
App.ElementCreateService.CreateByAutomationId<Search>("search");
```
Searches the element by its automation ID.  

Find Multiple Elements
----------------------
Sometimes we need to find more than one element. For example, in this test we want to locate all Add to Cart buttons.
To do it you can use the element create service CreateAll method.

```csharp
[TestMethod]
public void CheckAllAddToCartButtons()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.ElementCreateService.CreateAllByXpath<Anchor>("//*[@title='Add to cart']");
}
```

Available CreateAll Methods
------------------------
### CreateAllByTag ###
```csharp
App.ElementCreateService.CreateAllByTag<Button>("button");
```
Searches the elements by its tag.
### CreateAllById ###
```csharp
App.ElementCreateService.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByXpath ###
```csharp
App.ElementCreateService.CreateAllByXpath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.
### CreateAllByClass ###
```csharp
App.ElementCreateService.CreateAllByClassContaining<Button>("ul.products");
```
Searches the elements by its CSS classes.
### CreateAllByName ###
```csharp
App.ElementCreateService.CreateAllByName<Button>("products");
```
Searches the elements by its name.
### CreateAllByAccessibilityId ###
```csharp
App.ElementCreateService.CreateAllByAccessibilityId<Button>("myCustomButton");
```
Searches the elements by its accessibility ID.
### CreateAllByAutomationId ###
```csharp
App.ElementCreateService.CreateAllByAutomationId<Search>("search");
```
Searches the elements by its automation ID.

Find Nested Elements
----------------------
Sometimes it is easier to locate one element and then find the next one that you need, inside it.
For example in this test the list box is located and then the button inside it.

```csharp
public void ReturnNestedElement_When_ElementContainsOneChildElement_Wpf()
{
    var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("listBoxEnabled");
    var comboBoxItem = comboBox.CreateByAutomationId<Button>("lb2");

    comboBoxItem.Hover();
}
```

**Note**: *It is entirely legal to create a Button instead of **TextField**. BELLATRIX library does not care about the real type of the elements. The proxy types are convenience wrappers so to say. Meaning they give you a better interface of predefined properties and methods to make your tests more readable.*

Available Create Methods for Finding Nested Elements
----------------------------------------------------
### CreateByTag ###
```csharp
element.CreateByTag<Button>("button");
```
Searches the element by its tag.
### CreateById ###
```csharp
element.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByXpath ###
```csharp
element.CreateByXpath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
### CreateByClass ###
```csharp
element.CreateByClassContaining<Button>("ul.products");
```
Searches the element by its CSS classes.
### CreateByName ###
```csharp
element.CreateByName<Button>("products");
```
Searches the element by its name.
### CreateByAccessibilityId ###
```csharp
element.CreateByAccessibilityId<Button>("myCustomButton");
```
Searches the element by its accessibility ID.
### CreateByAutomationId ###
```csharp
element.CreateByAutomationId<Search>("search");
```
Searches the element by its automation ID.
### CreateAllByTag ###
```csharp
element.CreateAllByTag<Button>("button");
```
Searches the elements by its tag.
### CreateAllById ###
```csharp
element.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByXpath ###
```csharp
element.CreateAllByXpath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.
### CreateAllByClass ###
```csharp
element.CreateAllByClassContaining<Button>("ul.products");
```
Searches the elements by their classes.
### CreateAllByName ###
```csharp
element.CreateAllByName<Button>("products");
```
Searches the elements by its name.
### CreateAllByAccessibilityId ###
```csharp
element.CreateAllByAccessibilityId<Button>("myCustomButton");
```
Searches the elements by its accessibility ID.
### CreateAllByAutomationId ###
```csharp
element.CreateAllByAutomationId<Search>("search");
```
Searches the elements by its automation ID.