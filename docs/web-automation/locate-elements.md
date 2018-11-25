---
layout: default
title:  "Locate Elements"
excerpt: "Learn how to locate web elements with BELLATRIX web module."
date:   2018-06-22 06:50:17 +0200
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
[TestMethod]
public void PromotionsPageOpened_When_PromotionsButtonClicked()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

    promotionsLink.Click();
    Console.WriteLine(promotionsLink.By.Value);

    Console.WriteLine(promotionsLink.WrappedElement.TagName);
}
```

Explanations
-------
```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
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
Console.WriteLine(promotionsLink.WrappedElement.TagName);
```
You can access the WebDriver wrapped element through WrappedElement and the current WebDriver instance through- WrappedDriver.

Available Create Methods
------------------------
BELLATRIX extends the vanilla WebDriver selectors and give you additional ones.
### CreateByIdEndingWith ###
```csharp
App.ElementCreateService.CreateByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the element by ID ending with the locator.
### CreateByTag ###
```csharp
App.ElementCreateService.CreateByTag<Anchor>("a");
```
Searches the element by its tag.
### CreateById ###
```csharp
App.ElementCreateService.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```csharp
App.ElementCreateService.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified text.
### CreateByValueEndingWith ###
```csharp
App.ElementCreateService.CreateByIdContaining<Button>("pay");
```
Searches the element by value attribute containing the specified text.
### CreateByXpath ###
```csharp
App.ElementCreateService.CreateByXpath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
### CreateByLinkText ###
```csharp
App.ElementCreateService.CreateByLinkText<Anchor>("blog");
```
Searches the element by its link (href).
### CreateByLinkTextContaining ###
```csharp
App.ElementCreateService.CreateByLinkTextContaining<Anchor>("account");
```
Searches the element by its link (href) if it contains specified value.
### CreateByClass ###
```csharp
App.ElementCreateService.CreateByClassContaining<Anchor>("ul.products");
```
Searches the element by its CSS classes.
### CreateByClassContaining ###
```csharp
App.ElementCreateService.CreateByClassContaining<Anchor>(".products");
```
Searches the element by its CSS classes containing the specified values.
### CreateByInnerTextContaining ###
```csharp
App.ElementCreateService.CreateByInnerTextContaining<Div>("Showing all");
```
Searches the element by its inner text content, including all child HTML elements.
### CreateByNameEndingWith ###
```csharp
App.ElementCreateService.CreateByNameEndingWith<Search>("a");
```
Searches the element by its name containing the specified text.
### CreateByAttributesContaining ###
```csharp
App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the element by some of its attribute containing the specified value.

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
### CreateAllByIdEndingWith ###
```csharp
App.ElementCreateService.CreateAllByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the elements by ID ending with the locator.
### CreateAllByTag ###
```csharp
App.ElementCreateService.CreateAllByTag<Anchor>("a");
```
Searches the elements by its tag.
### CreateAllById ###
```csharp
App.ElementCreateService.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```csharp
App.ElementCreateService.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified text.
### CreateAllByValueEndingWith ###
```csharp
App.ElementCreateService.CreateAllByValueEndingWith<Button>("pay");
```
Searches the elements by value attribute containing the specified text.
### CreateAllByXpath ###
```csharp
App.ElementCreateService.CreateAllByXpath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.
### CreateAllByLinkText ###
```csharp
App.ElementCreateService.CreateAllByLinkText<Anchor>("blog");
```
Searches the elements by its link (href).
### CreateAllByLinkTextContaining ###
```csharp
App.ElementCreateService.CreateAllByLinkTextContaining<Anchor>("account");
```
Searches the elements by its link (href) if it contains specified value.
### CreateAllByClass ###
```csharp
App.ElementCreateService.CreateAllByClass<Anchor>("ul.products");
```
Searches the elements by its CSS classes.
### CreateAllByClassContaining ###
```csharp
App.ElementCreateService.CreateAllByClassContaining<Anchor>(".products");
```
Searches the elements by its CSS classes containing the specified values.
### CreateAllByInnerTextContaining ###
```csharp
App.ElementCreateService.CreateAllByInnerTextContaining<Div>("Showing all");
```
Searches the elements by its inner text content, including all child HTML elements.
### CreateAllByNameEndingWith ###
```csharp
App.ElementCreateService.CreateAllByNameEndingWith<Search>("a");
```
Searches the elements by its name containing the specified text.   
### CreateAllByAttributesContaining ###
```csharp
App.ElementCreateService.CreateAllByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the elements by some of its attribute containing the specifed value. 

Find Nested Elements
----------------------
Sometimes it is easier to locate one element and then find the next one that you need, inside it. For example in this test we want to locate the Sale! button inside the product's description. To do it you can use the element's Create methods.

```csharp
[TestMethod]
public void OpenSalesPage_When_LocatedSaleButtonInsideProductImage()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var productsColumn = App.ElementCreateService.CreateByClass<Option>("products columns-4");

    var saleButton = productsColumn.CreateByClassContaining<Anchor>("woocommerce-LoopProduct-link woocommerce-loop-product__link").CreateByInnerTextContaining<Button>("Sale!");

    saleButton.Click();
}
```
The first products row is located. Then search inside it for the first product image, inside it search for the Sale! Span element.

**Note**: *It is entirely legal to create a Button instead of Span. BELLATRIX library does not care about the real type of the HTML elements. The proxy types are convenience wrappers so to say. Meaning they give you a better interface of predefined properties and methods to make your tests more readable.*

Available Create Methods for Finding Nested Elements
----------------------------------------------------
### CreateByIdEndingWith ###
```csharp
element.CreateByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the element by ID ending with the locator.
### CreateByTag ###
```csharp
element.CreateByTag<Anchor>("a");
```
Searches the element by its tag.
### CreateById ###
```csharp
element.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```csharp
element.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified text.
### CreateByValueEndingWith ###
```csharp
element.CreateByIdContaining<Button>("pay");
```
Searches the element by value attribute containing the specified text.
### CreateByXpath ###
```csharp
element.CreateByXpath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
### CreateByLinkText ###
```csharp
element.CreateByLinkText<Anchor>("blog");
```
Searches the element by its link (href).
### CreateByLinkTextContaining ###
```csharp
element.CreateByLinkTextContaining<Anchor>("account");
```
Searches the element by its link (href) if it contains specified value.
### CreateByClass ###
```csharp
element.CreateByClassContaining<Anchor>("ul.products");
```
Searches the element by its CSS classes.
### CreateByClassContaining ###
```csharp
element.CreateByClassContaining<Anchor>(".products");
```
Searches the element by its CSS classes containing the specified values.
### CreateByInnerTextContaining ###
```csharp
element.CreateByInnerTextContaining<Div>("Showing all");
```
Searches the element by its inner text content, including all child HTML elements.
### CreateByNameEndingWith ###
```csharp
element.CreateByNameEndingWith<Search>("a");
```
Searches the element by its name containing the specified text.
### CreateByAttributesContaining ###
```csharp
element.CreateByAttributesContaining<Anchor>("data-product_id", "31");
```

Available CreateAll Methods for Finding Nested Elements
----------------------------------------------------
### CreateAllByIdEndingWith ###
```csharp
element.CreateAllByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the elements by ID ending with the locator.
### CreateAllByTag ###
```csharp
element.CreateAllByTag<Anchor>("a");
```
Searches the elements by its tag.
### CreateAllById ###
```csharp
element.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```csharp
element.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified text.
### CreateAllByValueEndingWith ###
```csharp
element.CreateAllByValueEndingWith<Button>("pay");
```
Searches the elements by value attribute containing the specified text.
### CreateAllByXpath ###
```csharp
element.CreateAllByXpath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.
### CreateAllByLinkText ###
```csharp
element.CreateAllByLinkText<Anchor>("blog");
```
Searches the elements by its link (href).
### CreateAllByLinkTextContaining ###
```csharp
element.CreateAllByLinkTextContaining<Anchor>("account");
```
Searches the elements by its link (href) if it contains specified value.
### CreateAllByClass ###
```csharp
element.CreateAllByClass<Anchor>("ul.products");
```
Searches the elements by its CSS classes.
### CreateAllByClassContaining ###
```csharp
element.CreateAllByClassContaining<Anchor>(".products");
```
Searches the elements by its CSS classes containing the specified values.
### CreateAllByInnerTextContaining ###
```csharp
element.CreateAllByInnerTextContaining<Div>("Showing all");
```
Searches the elements by its inner text content, including all child HTML elements.
### CreateAllByNameEndingWith ###
```csharp
element.CreateAllByNameEndingWith<Search>("a");
```
Searches the elements by its name containing the specified text.   
### CreateAllByAttributesContaining ###
```csharp
element.CreateAllByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the elements by some of its attribute containing the specifed value. 