---
layout: default
title:  "Locate Elements"
feature-title: "Web Automation"
excerpt: "Learn how to locate web elements with Bellatrix web module."
date:   2018-06-22 06:50:17 +0200
permalink: /locate-elements/
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
```
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
```
var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
```
There are different ways to locate elements on the page. To do it you use the element create service.
You need to know that Bellatrix has a built-in complex mechanism for waiting for elements, so you do not need to worry about this anymore. Keep in mind that when you use the Create methods, the element is not searched on the page. All elements use lazy loading. Which means that they are searched once you perform an action or assertion on them. By default on each new action, the element is searched again and be refreshed.
```
Console.WriteLine(promotionsLink.By.Value);
```
Because of the proxy element mechanism (we have a separate type of element instead of single WebDriver IWebElement interface) we have several benefits. Each control (element type- **ComboBox**, **TextField** and so on) contains only the actions you can do with it, and the methods are named properly.
In vanilla WebDriver to type the text you call **SendKeys** method.
Also, we have some additional properties in the proxy web control such as- By. Now you can get the locator with which you element was found.
```
Console.WriteLine(promotionsLink.WrappedElement.TagName);
```
You can access the WebDriver wrapped element through WrappedElement and the current WebDriver instance through- WrappedDriver.

Available Create Methods
------------------------
Bellatrix extends the vanilla WebDriver selectors and give you additional ones.
### CreateByIdEndingWith ###
```
App.ElementCreateService.CreateByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the element by ID ending with the locator.
### CreateByTag ###
```
App.ElementCreateService.CreateByTag<Anchor>("a");
```
Searches the element by its tag.
### CreateById ###
```
App.ElementCreateService.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```
App.ElementCreateService.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified text.
### CreateByValueEndingWith ###
```
App.ElementCreateService.CreateByIdContaining<Button>("pay");
```
Searches the element by value attribute containing the specified text.
### CreateByXpath ###
```
App.ElementCreateService.CreateByXpath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
### CreateByLinkText ###
```
App.ElementCreateService.CreateByLinkText<Anchor>("blog");
```
Searches the element by its link (href).
### CreateByLinkTextContaining ###
```
App.ElementCreateService.CreateByLinkTextContaining<Anchor>("account");
```
Searches the element by its link (href) if it contains specified value.
### CreateByClass ###
```
App.ElementCreateService.CreateByClassContaining<Anchor>("ul.products");
```
Searches the element by its CSS classes.
### CreateByClassContaining ###
```
App.ElementCreateService.CreateByClassContaining<Anchor>(".products");
```
Searches the element by its CSS classes containing the specified values.
### CreateByInnerTextContaining ###
```
App.ElementCreateService.CreateByInnerTextContaining<Div>("Showing all");
```
Searches the element by its inner text content, including all child HTML elements.
### CreateByNameEndingWith ###
```
App.ElementCreateService.CreateByNameEndingWith<Search>("a");
```
Searches the element by its name containing the specified text.
### CreateByAttributesContaining ###
```
App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the element by some of its attribute containing the specified value.

Find Multiple Elements
----------------------
Sometimes we need to find more than one element. For example, in this test we want to locate all Add to Cart buttons.
To do it you can use the element create service CreateAll method.

```
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
```
App.ElementCreateService.CreateAllByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the elements by ID ending with the locator.
### CreateAllByTag ###
```
App.ElementCreateService.CreateAllByTag<Anchor>("a");
```
Searches the elements by its tag.
### CreateAllById ###
```
App.ElementCreateService.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```
App.ElementCreateService.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified text.
### CreateAllByValueEndingWith ###
```
App.ElementCreateService.CreateAllByValueEndingWith<Button>("pay");
```
Searches the elements by value attribute containing the specified text.
### CreateAllByXpath ###
```
App.ElementCreateService.CreateAllByXpath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.
### CreateAllByLinkText ###
```
App.ElementCreateService.CreateAllByLinkText<Anchor>("blog");
```
Searches the elements by its link (href).
### CreateAllByLinkTextContaining ###
```
App.ElementCreateService.CreateAllByLinkTextContaining<Anchor>("account");
```
Searches the elements by its link (href) if it contains specified value.
### CreateAllByClass ###
```
App.ElementCreateService.CreateAllByClass<Anchor>("ul.products");
```
Searches the elements by its CSS classes.
### CreateAllByClassContaining ###
```
App.ElementCreateService.CreateAllByClassContaining<Anchor>(".products");
```
Searches the elements by its CSS classes containing the specified values.
### CreateAllByInnerTextContaining ###
```
App.ElementCreateService.CreateAllByInnerTextContaining<Div>("Showing all");
```
Searches the elements by its inner text content, including all child HTML elements.
### CreateAllByNameEndingWith ###
```
App.ElementCreateService.CreateAllByNameEndingWith<Search>("a");
```
Searches the elements by its name containing the specified text.   
### CreateAllByAttributesContaining ###
```
App.ElementCreateService.CreateAllByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the elements by some of its attribute containing the specifed value. 

Find Nested Elements
----------------------
Sometimes it is easier to locate one element and then find the next one that you need, inside it. For example in this test we want to locate the Sale! button inside the product's description. To do it you can use the element's Create methods.

```
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

**Note**: *It is entirely legal to create a Button instead of Span. Bellatrix library does not care about the real type of the HTML elements. The proxy types are convenience wrappers so to say. Meaning they give you a better interface of predefined properties and methods to make your tests more readable.*

Available Create Methods for Finding Nested Elements
----------------------------------------------------
### CreateByIdEndingWith ###
```
element.CreateByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the element by ID ending with the locator.
### CreateByTag ###
```
element.CreateByTag<Anchor>("a");
```
Searches the element by its tag.
### CreateById ###
```
element.CreateById<Button>("myId");
```
Searches the element by its ID.
### CreateByIdContaining ###
```
element.CreateByIdContaining<Button>("myIdMiddle");
```
Searches the element by ID containing the specified text.
### CreateByValueEndingWith ###
```
element.CreateByIdContaining<Button>("pay");
```
Searches the element by value attribute containing the specified text.
### CreateByXpath ###
```
element.CreateByXpath<Button>("//*[@title='Add to cart']");
```
Searches the element by XPath locator.
### CreateByLinkText ###
```
element.CreateByLinkText<Anchor>("blog");
```
Searches the element by its link (href).
### CreateByLinkTextContaining ###
```
element.CreateByLinkTextContaining<Anchor>("account");
```
Searches the element by its link (href) if it contains specified value.
### CreateByClass ###
```
element.CreateByClassContaining<Anchor>("ul.products");
```
Searches the element by its CSS classes.
### CreateByClassContaining ###
```
element.CreateByClassContaining<Anchor>(".products");
```
Searches the element by its CSS classes containing the specified values.
### CreateByInnerTextContaining ###
```
element.CreateByInnerTextContaining<Div>("Showing all");
```
Searches the element by its inner text content, including all child HTML elements.
### CreateByNameEndingWith ###
```
element.CreateByNameEndingWith<Search>("a");
```
Searches the element by its name containing the specified text.
### CreateByAttributesContaining ###
```
element.CreateByAttributesContaining<Anchor>("data-product_id", "31");
```
Available CreateAll Methods for Finding Nested Elements
----------------------------------------------------
### CreateAllByIdEndingWith ###
```
element.CreateAllByIdEndingWith<Anchor>("myIdSuffix");
```
Searches the elements by ID ending with the locator.
### CreateAllByTag ###
```
element.CreateAllByTag<Anchor>("a");
```
Searches the elements by its tag.
### CreateAllById ###
```
element.CreateAllById<Button>("myId");
```
Searches the elements by its ID.
### CreateAllByIdContaining ###
```
element.CreateAllByIdContaining<Button>("myIdMiddle");
```
Searches the elements by ID containing the specified text.
### CreateAllByValueEndingWith ###
```
element.CreateAllByValueEndingWith<Button>("pay");
```
Searches the elements by value attribute containing the specified text.
### CreateAllByXpath ###
```
element.CreateAllByXpath<Button>("//*[@title='Add to cart']");
```
Searches the elements by XPath locator.
### CreateAllByLinkText ###
```
element.CreateAllByLinkText<Anchor>("blog");
```
Searches the elements by its link (href).
### CreateAllByLinkTextContaining ###
```
element.CreateAllByLinkTextContaining<Anchor>("account");
```
Searches the elements by its link (href) if it contains specified value.
### CreateAllByClass ###
```
element.CreateAllByClass<Anchor>("ul.products");
```
Searches the elements by its CSS classes.
### CreateAllByClassContaining ###
```
element.CreateAllByClassContaining<Anchor>(".products");
```
Searches the elements by its CSS classes containing the specified values.
### CreateAllByInnerTextContaining ###
```
element.CreateAllByInnerTextContaining<Div>("Showing all");
```
Searches the elements by its inner text content, including all child HTML elements.
### CreateAllByNameEndingWith ###
```
element.CreateAllByNameEndingWith<Search>("a");
```
Searches the elements by its name containing the specified text.   
### CreateAllByAttributesContaining ###
```
element.CreateAllByAttributesContaining<Anchor>("data-product_id", "31");
```
Searches the elements by some of its attribute containing the specifed value. 