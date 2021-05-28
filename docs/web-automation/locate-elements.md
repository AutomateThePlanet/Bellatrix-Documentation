---
layout: default
title:  "Locate Elements"
excerpt: "Learn how to locate web elements with BELLATRIX web module."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/locate-elements/
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
public void PromotionsPageOpened_When_PromotionsButtonClicked()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var promotionsLink = App.Components.CreateByLinkText<Anchor>("Promotions");

    promotionsLink.Click();
    Console.WriteLine(promotionsLink.By.Value);

    Console.WriteLine(promotionsLink.WrappedComponent.TagName);
}
```

Explanations
-------
```csharp
var promotionsLink = App.Components.CreateByLinkText<Anchor>("Promotions");
```
There are different ways to locate elements on the page. To do it you use the element create service.
You need to know that BELLATRIX has a built-in complex mechanism for waiting for elements, so you do not need to worry about this anymore. Keep in mind that when you use the Create methods, the element is not searched on the page. All elements use lazy loading. Which means that they are searched once you perform an action or assertion on them. By default on each new action, the element is searched again and be refreshed.
```csharp
Console.WriteLine(promotionsLink.By.Value);
```
Because of the proxy element mechanism (we have a separate type of element instead of single WebDriver IWebElement interface) we have several benefits. Each control (element type- **ComboBox**, **TextField** and so on) contains only the actions you can do with it, and the methods are named properly.
In vanilla WebDriver to type the text you call **SendKeys** method.
Also, we have some additional properties in the proxy web control such as- By. Now you can get the locator with which you element was found.
```csharp
Console.WriteLine(promotionsLink.WrappedComponent.TagName);
```
You can access the WebDriver wrapped element through WrappedElement and the current WebDriver instance through- WrappedDriver.

Available Create Methods
------------------------
BELLATRIX extends the vanilla WebDriver selectors and give you additional ones.
### CreateByIdEndingWith ###
```csharp
App.Components.CreateByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the element by ID ending with the locator.
### CreateByTag ###
```csharp
App.Components.CreateByTag<Anchor>("a");
```
Searches the element by its tag.
### CreateById ###
```csharp
App.Components.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```csharp
App.Components.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified text.
### CreateByValueEndingWith ###
```csharp
App.Components.CreateByIdContaining<Button>("pay");
```
Searches the element by value attribute containing the specified text.
### CreateByXpath ###
```csharp
App.Components.CreateByXpath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
### CreateByLinkText ###
```csharp
App.Components.CreateByLinkText<Anchor>("blog");
```
Searches the element by its link (href).
### CreateByLinkTextContaining ###
```csharp
App.Components.CreateByLinkTextContaining<Anchor>("account");
```
Searches the element by its link (href) if it contains specified value.
### CreateByClass ###
```csharp
App.Components.CreateByClassContaining<Anchor>("ul.products");
```
Searches the element by its CSS classes.
### CreateByClassContaining ###
```csharp
App.Components.CreateByClassContaining<Anchor>(".products");
```
Searches the element by its CSS classes containing the specified values.
### CreateByInnerTextContaining ###
```csharp
App.Components.CreateByInnerTextContaining<Div>("Showing all");
```
Searches the element by its inner text content, including all child HTML elements.
### CreateByNameEndingWith ###
```csharp
App.Components.CreateByNameEndingWith<Search>("a");
```
Searches the element by its name containing the specified text.
### CreateByAttributesContaining ###
```csharp
App.Components.CreateByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the element by some of its attribute containing the specified value.

Find Multiple Elements
----------------------
Sometimes we need to find more than one component. For example, in this test we want to locate all Add to Cart buttons.
To do it you can use the element create service CreateAll method.

```csharp
[Test]
public void CheckAllAddToCartButtons()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.Components.CreateAllByXpath<Anchor>("//*[@title='Add to cart']");
}
```

Available CreateAll Methods
------------------------
### CreateAllByIdEndingWith ###
```csharp
App.Components.CreateAllByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the elements by ID ending with the locator.
### CreateAllByTag ###
```csharp
App.Components.CreateAllByTag<Anchor>("a");
```
Searches the elements by its tag.
### CreateAllById ###
```csharp
App.Components.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```csharp
App.Components.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified text.
### CreateAllByValueEndingWith ###
```csharp
App.Components.CreateAllByValueEndingWith<Button>("pay");
```
Searches the elements by value attribute containing the specified text.
### CreateAllByXpath ###
```csharp
App.Components.CreateAllByXpath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.
### CreateAllByLinkText ###
```csharp
App.Components.CreateAllByLinkText<Anchor>("blog");
```
Searches the elements by its link (href).
### CreateAllByLinkTextContaining ###
```csharp
App.Components.CreateAllByLinkTextContaining<Anchor>("account");
```
Searches the elements by its link (href) if it contains specified value.
### CreateAllByClass ###
```csharp
App.Components.CreateAllByClass<Anchor>("ul.products");
```
Searches the elements by its CSS classes.
### CreateAllByClassContaining ###
```csharp
App.Components.CreateAllByClassContaining<Anchor>(".products");
```
Searches the elements by its CSS classes containing the specified values.
### CreateAllByInnerTextContaining ###
```csharp
App.Components.CreateAllByInnerTextContaining<Div>("Showing all");
```
Searches the elements by its inner text content, including all child HTML elements.
### CreateAllByNameEndingWith ###
```csharp
App.Components.CreateAllByNameEndingWith<Search>("a");
```
Searches the elements by its name containing the specified text.   
### CreateAllByAttributesContaining ###
```csharp
App.Components.CreateAllByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the elements by some of its attribute containing the specifed value. 

Find Nested Elements
----------------------
Sometimes it is easier to locate one element and then find the next one that you need, inside it. For example in this test we want to locate the Sale! button inside the product's description. To do it you can use the element's Create methods.

```csharp
[Test]
public void OpenSalesPage_When_LocatedSaleButtonInsideProductImage()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var productsColumn = App.Components.CreateByClass<Option>("products columns-4");

    var saleButton = productsColumn.CreateByClassContaining<Anchor>("woocommerce-LoopProduct-link woocommerce-loop-product__link").CreateByInnerTextContaining<Button>("Sale!");

    saleButton.Click();
}
```
The first products row is located. Then search inside it for the first product image, inside it search for the Sale! Span component.

**Note**: *It is entirely legal to create a Button instead of Span. BELLATRIX library does not care about the real type of the HTML elements. The proxy types are convenience wrappers so to say. Meaning they give you a better interface of predefined properties and methods to make your tests more readable.*

Available Create Methods for Finding Nested Elements
----------------------------------------------------
### CreateByIdEndingWith ###
```csharp
component.CreateByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the element by ID ending with the locator.
### CreateByTag ###
```csharp
component.CreateByTag<Anchor>("a");
```
Searches the element by its tag.
### CreateById ###
```csharp
component.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```csharp
component.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified text.
### CreateByValueEndingWith ###
```csharp
component.CreateByIdContaining<Button>("pay");
```
Searches the element by value attribute containing the specified text.
### CreateByXpath ###
```csharp
component.CreateByXpath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
### CreateByLinkText ###
```csharp
component.CreateByLinkText<Anchor>("blog");
```
Searches the element by its link (href).
### CreateByLinkTextContaining ###
```csharp
component.CreateByLinkTextContaining<Anchor>("account");
```
Searches the element by its link (href) if it contains specified value.
### CreateByClass ###
```csharp
component.CreateByClassContaining<Anchor>("ul.products");
```
Searches the element by its CSS classes.
### CreateByClassContaining ###
```csharp
component.CreateByClassContaining<Anchor>(".products");
```
Searches the element by its CSS classes containing the specified values.
### CreateByInnerTextContaining ###
```csharp
component.CreateByInnerTextContaining<Div>("Showing all");
```
Searches the element by its inner text content, including all child HTML elements.
### CreateByNameEndingWith ###
```csharp
component.CreateByNameEndingWith<Search>("a");
```
Searches the element by its name containing the specified text.
### CreateByAttributesContaining ###
```csharp
component.CreateByAttributesContaining<Anchor>("data-product_id", "31");
```

Available CreateAll Methods for Finding Nested Elements
----------------------------------------------------
### CreateAllByIdEndingWith ###
```csharp
component.CreateAllByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the elements by ID ending with the locator.
### CreateAllByTag ###
```csharp
component.CreateAllByTag<Anchor>("a");
```
Searches the elements by its tag.
### CreateAllById ###
```csharp
component.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```csharp
component.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified text.
### CreateAllByValueEndingWith ###
```csharp
component.CreateAllByValueEndingWith<Button>("pay");
```
Searches the elements by value attribute containing the specified text.
### CreateAllByXpath ###
```csharp
component.CreateAllByXpath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.
### CreateAllByLinkText ###
```csharp
component.CreateAllByLinkText<Anchor>("blog");
```
Searches the elements by its link (href).
### CreateAllByLinkTextContaining ###
```csharp
component.CreateAllByLinkTextContaining<Anchor>("account");
```
Searches the elements by its link (href) if it contains specified value.
### CreateAllByClass ###
```csharp
component.CreateAllByClass<Anchor>("ul.products");
```
Searches the elements by its CSS classes.
### CreateAllByClassContaining ###
```csharp
component.CreateAllByClassContaining<Anchor>(".products");
```
Searches the elements by its CSS classes containing the specified values.
### CreateAllByInnerTextContaining ###
```csharp
component.CreateAllByInnerTextContaining<Div>("Showing all");
```
Searches the elements by its inner text content, including all child HTML elements.
### CreateAllByNameEndingWith ###
```csharp
component.CreateAllByNameEndingWith<Search>("a");
```
Searches the elements by its name containing the specified text.   
### CreateAllByAttributesContaining ###
```csharp
component.CreateAllByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the elements by some of its attribute containing the specifed value. 