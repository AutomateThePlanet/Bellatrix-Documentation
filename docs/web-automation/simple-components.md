---
layout: default
title:  "Common Components"
excerpt: "Learn how to use BELLATRIX simple web components."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/simple-components/
anchors:
  example: Example
  explanations: Explanations
  full-list-of-all-supported-web-components: List of All Web Components
---
Example
-------
```csharp
[Test]
public void PurchaseRocket()
{
    App.Navigation.Navigate("http://demos.bellatrix.solutions/");

    Select sortDropDown = App.Components.CreateByNameEndingWith<Select>("orderby");
    sortDropDown.SelectByText("Sort by price: low to high");

    Anchor protonMReadMoreButton = 
    App.Components.CreateByInnerTextContaining<Anchor>("Read more");

    protonMReadMoreButton.Hover();

    Anchor addToCartFalcon9 = 
    App.Components.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
    addToCartFalcon9.Focus();
    addToCartFalcon9.Click();

    Anchor viewCartButton = 
    App.Components.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();
    viewCartButton.Click();

    TextField couponCodeTextField = App.Components.CreateById<TextField>("coupon_code");

    couponCodeTextField.SetText("happybirthday");

    Button applyCouponButton = App.Components.CreateByValueContaining<Button>("Apply coupon");
    applyCouponButton.Click();

    Div messageAlert = App.Components.CreateByClassContaining<Div>("woocommerce-message");

    messageAlert.ToHasContent().ToBeVisible().WaitToBe();

    messageAlert.ValidateInnerTextIs("Coupon code applied successfully.");

    Number quantityBox = App.Components.CreateByClassContaining<Number>("input-text qty text");

    quantityBox.SetNumber(0);
    quantityBox.SetNumber(2);

    Button updateCart = App.Components.CreateByValueContaining<Button>("Update cart").ToBeClickable();
    updateCart.Click();

    Span totalSpan = App.Components.CreateByXpath<Span>("//*[@class='order-total']//span");

    totalSpan.ValidateInnerTextIs("95.00€", 15000);

    Anchor proceedToCheckout = 
    App.Components.CreateByClassContaining<Anchor>("checkout-button button alt wc-forward");
    proceedToCheckout.Click();

    Heading billingDetailsHeading = App.Components.CreateByInnerTextContaining<Heading>("Billing details");

    billingDetailsHeading.ToBeVisible().WaitToBe();

    Anchor showLogin = App.Components.CreateByInnerTextContaining<Anchor>("Click here to login");

    showLogin.ValidateHrefIs("http://demos.bellatrix.solutions/checkout/#");
    showLogin.ValidateCssClassIs("showlogin");

    TextArea orderCommentsTextArea = App.Components.CreateById<TextArea>("order_comments");

    orderCommentsTextArea.ScrollToVisible();
    orderCommentsTextArea.SetText("Please send the rocket to my door step!");

    TextField billingFirstName = App.Components.CreateById<TextField>("billing_first_name");
    billingFirstName.SetText("In");

    TextField billingLastName = App.Components.CreateById<TextField>("billing_last_name");
    billingLastName.SetText("Deepthought");

    TextField billingCompany = App.Components.CreateById<TextField>("billing_company");
    billingCompany.SetText("Automate The Planet Ltd.");

    Select billingCountry = App.Components.CreateById<Select>("billing_country");
    billingCountry.SelectByText("Bulgaria");

    TextField billingAddress1 = App.Components.CreateById<TextField>("billing_address_1");

    Assert.AreEqual("House number and street name", billingAddress1.Placeholder);
    billingAddress1.SetText("bul. Yerusalim 5");

    TextField billingAddress2 = App.Components.CreateById<TextField>("billing_address_2");
    billingAddress2.SetText("bul. Yerusalim 6");

    TextField billingCity = App.Components.CreateById<TextField>("billing_city");
    billingCity.SetText("Sofia");

    Select billingState = 
    App.Components.CreateById<Select>("billing_state").ToBeVisible().ToBeClickable();
    billingState.SelectByText("Sofia-Grad");

    TextField billingZip = App.Components.CreateById<TextField>("billing_postcode");
    billingZip.SetText("1000");

    Phone billingPhone = App.Components.CreateById<Phone>("billing_phone");

    billingPhone.SetPhone("+00359894646464");

    Email billingEmail = App.Components.CreateById<Email>("billing_email");

    billingEmail.SetEmail("info@bellatrix.solutions");

    CheckBox createAccountCheckBox = App.Components.CreateById<CheckBox>("createaccount");

    createAccountCheckBox.Check();

    RadioButton checkPaymentsRadioButton = 
    App.Components.CreateByAttributesContaining<RadioButton>("for", "payment_method_cheque");

    checkPaymentsRadioButton.Click();
}
```

Explanations
------------
As mentioned before BELLATRIX exposes 30+ web controls. All of them implement Proxy design pattern which means that they are not located immediately when they are created. Another benefit is that each of them includes only the actions that you should be able to do with the specific control and nothing more.
For example, you cannot type into a button. Moreover, this way all of the actions have meaningful names, for example; "Type" vs "SendKeys" as in vanilla WebDriver.
```csharp
Select sortDropDown = App.Components.CreateByNameEndingWith<Select>("orderby");
```
Create methods accept a generic parameter for the type of the web control. Only the methods for this specific control are accessible. Here we tell BELLATRIX to find your element by name attribute ending with 'orderby'.

```html
<select name="orderby" class="orderby">
   <option value="popularity" selected="selected">Sort by popularity</option>
   <option value="rating">Sort by average rating</option>
   <option value="date">Sort by newness</option>
   <option value="price">Sort by price: low to high</option>
   <option value="price-desc">Sort by price: high to low</option>
</select>
```
```csharp
sortDropDown.SelectByText("Sort by price: low to high");
```
You can select from select inputs by text (SelectByText) or index (SelectByIndex)). Also, you can get the selected option through GetSelected method.
```html
<a href='http://demos.bellatrix.solutions/product/proton-m/'>Read more</a>
```
```csharp
Anchor protonMReadMoreButton = App.Components.CreateByInnerTextContaining<Anchor>("Read more");
```
Here BELLATRIX finds the first anchor element which has inner text containing the 'Read more' text.
```csharp
protonMReadMoreButton.Hover();
```
You can Hover and Focus on most web elements. Also, can invoke Click on anchors.
```html
<a href="/?add-to-cart=28" data-product_id="28">Add to cart</a>
```
```csharp
Anchor addToCartFalcon9 = App.Components.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
addToCartFalcon9.Focus();
addToCartFalcon9.Click();
```
Locate elements by custom attribute. BELLATRIX waits till the anchor is clickable before doing any actions.
```html
<a href="http://demos.bellatrix.solutions/cart/" class="added_to_cart wc-forward" title="View cart">View cart</a>
```
```csharp
Anchor viewCartButton = 
App.Components.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();
viewCartButton.Click();
```
Find the anchor by class 'added_to_cart wc-forward' and wait for the element again to be clickable.
```csharp
TextField couponCodeTextField = App.Components.CreateById<TextField>("coupon_code");
```
Find a regular input text element by id = 'coupon_code'.
```csharp
couponCodeTextField.SetText("happybirthday");
```
Instead of using vanilla WebDriver SendKeys to set the text, use the SetText method.
```html
<input type="submit" class="button" name="apply_coupon" value="Apply coupon">
```
```csharp
Button applyCouponButton = App.Components.CreateByValueContaining<Button>("Apply coupon");
applyCouponButton.Click();
```
Create a button control by value attribute containing the text 'Apply coupon'. Button can be any of the following web elements- input button, input submit or button.
```html
<div class="woocommerce-message" role="alert">Coupon code applied successfully.</div>
```
```csharp
Div messageAlert = App.Components.CreateByClassContaining<Div>("woocommerce-message");
messageAlert.ToHasContent().ToBeVisible().WaitToBe();
```
Wait for the message DIV to show up and have some content.
```csharp
// Assert.AreEqual("Coupon code applied successfully.", messageAlert.InnerText);
```
Sometimes you need to verify the content of some component. However, since the asynchronous nature of websites, the text or event may not happen immediately. This renders the simple Assert methods plus vanilla WebDriver useless.
The commented code fails 1 from 5 times.
To handle these situations, BELLATRIX has hundreds of Ensure methods that wait for some condition to happen before asserting.
Bellow the statement waits for the specific text to appear and assert it.
```csharp
Div messageAlert = App.Components.CreateByClassContaining<Div>("woocommerce-message");
messageAlert.ValidateInnerTextIs("Coupon code applied successfully.");
```
**Note**: *There are much more details about these methods in the next chapters.*
```html
<input type="number" id="quantity_5ad35e76b34a2" step="1" min="0" max="" value="1" size="4" pattern="[0-9]*" inputmode="numeric">
```
```csharp
Number quantityBox = App.Components.CreateByClassContaining<Number>("input-text qty text");
```
Find the number element by class 'input-text qty text'.
```csharp
Number quantityBox = App.Components.CreateByClassContaining<Number>("input-text qty text");
quantityBox.SetNumber(0);
quantityBox.SetNumber(2);
```
For numbers elements, you can set the number and get most of the properties of these elements.
```csharp
Heading billingDetailsHeading = App.Components.CreateByInnerTextContaining<Heading>("Billing details");
```
As mentioned before, BELLATRIX has special synchronization mechanism for locating elements, so usually, there is no need to wait for specific elements to appear on the page. However, there may be some rare cases when you need to do it. The statement finds the heading by its inner text containing the text 'Billing details'.
```csharp
Heading billingDetailsHeading = App.Components.CreateByInnerTextContaining<Heading>("Billing details");
billingDetailsHeading.ToBeVisible().WaitToBe();
```
Wait for the heading with the above text to be visible. This means that the correct page is loaded.
```csharp
// Assert.AreEqual("http://demos.bellatrix.solutions/checkout/#", showLogin.Href);
showLogin.ValidateHrefIs("http://demos.bellatrix.solutions/checkout/#");
// Assert.AreEqual("showlogin", showLogin.CssClass);
showLogin.ValidateCssClassIs("showlogin");
```
All web controls have multiple properties for their most important attributes and ensure methods for their verification.
```csharp
TextArea orderCommentsTextArea = App.Components.CreateById<TextArea>("order_comments");
orderCommentsTextArea.ScrollToVisible();
```
Here we find the order comments text area and since it is below the visible area we scroll down so that it gets visible on the video recordings. Then the text is set.
```csharp
TextField billingAddress1 = App.Components.CreateById<TextField>("billing_address_1");
Assert.AreEqual("House number and street name", billingAddress1.Placeholder);
```
Through the Placeholder, you can get the default text of the control.
```csharp
Phone billingPhone = App.Components.CreateById<Phone>("billing_phone");
billingPhone.SetPhone("+00359894646464");
```
Create the special text field control Phone it contains some additional properties unique for this web component.
```csharp
Email billingEmail = App.Components.CreateById<Email>("billing_email");
billingEmail.SetEmail("info@bellatrix.solutions");
```
Here we create the special text field control Email it contains some additional properties unique for this web component.
```csharp
CheckBox createAccountCheckBox = App.Components.CreateById<CheckBox>("createaccount");
createAccountCheckBox.Check();
```
You can check and uncheck checkboxes.
```csharp
RadioButton checkPaymentsRadioButton = 
App.Components.CreateByAttributesContaining<RadioButton>("for", "payment_method_cheque");.
checkPaymentsRadioButton.Click();
```
BELLATRIX finds the first RadioButton with attribute 'for' containing the value 'payment_method_cheque'. The radio buttons compared to checkboxes cannot be unchecked/unselected.

Full List of All Supported Web Components
---------------------------------------
### Component ###
- By
- GetAttribute
- SetAttribute 
- ScrollToVisible
- Create
- CreateAlL
- WaitToBe
- IsPresent
- IsVisible
- CssClass
- ComponentName
- PageName
- GetTitle
- GetTabIndex
- GetAccessKey
- GetStyle
- GetDir
- GetLang

**Note**: *All other components have access to the above methods and properties*

Component | Available properties
------------ | -------------
Anchor | Click, Hover, Focus, Href, InnetText, InnetHtml, Target, Rel
Button | Click, Hover, Focus, InnetText, Value, IsDisabled
CheckBox | Check, Uncheck, Hover, Focus, IsDisabled, Value, IsChecked
Div | Hover, InnerText, InnerHtml
Headline | Hover, InnerText
Image | Hover, Src, LongDesc, Alt, SrcSet, Sizes, Height, Width
InputFile | Upload, IsRequired, IsMultiple, Accept
Label | Hover, InnerText, InnerHtml, For
Option | Innertext, IsDisabled, Value, IsSelected
RadioButton | Click, Hover, Value, IsDisabled, IsChecked
Reset | Click, Hover, Focus, InnerText, Value, IsDisabled
Select | Hover, Focus, GetSelected, GetAllOptions, SelectByText, SelectByIndex, IsDisabled, IsRequired
Span | Hover, InnerText, InnerHtml
TextArea | GetText, SetText, Hover, Focus, InnerText, IsDisabled, IsAutoComplete, IsReadonly, IsRequired, Placeholder, MaxLength, MinLength, Rows, Cols, SpellCheck, Wrap
TextField | SetText, Hover, Focus, InnerText, InnerHtml, IsDisabled, Value, IsAutoComplete, IsReadonly, IsRequired, Placeholder, MaxLength, MinLength, Size


### HTML5 Components: ### 

Component | Available properties
------------ | -------------
Color | Hover, Focus, GetColor, SetColor, IsDisabled, IsAutoComplete, IsRequired, Value, List
Date |  GetDate, SetDate, Hover, Focus, IsDisabled, IsRequired, Value, IsAutoComplete, IsReadonly, Max, Min, Step
DateTimeLocal | GetTime, SetTime, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, Max, Min, Step
Email | GetEmail, SetEmail, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, IsRequired, Placeholder, MaxLength, MinLength, Size
Month | GetMonth, SetMonth, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, IsRequired, Max, Min, Step
Number | GetNumber, SetNumber, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, IsRequired, Placeholder, Max, Min, Step
Output | Hover, InnerText, InnerHtml, For
Password | GetPassword, SetPassword, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, IsRequired, Placeholder, MaxLenght, MinLenght, Size
Phone | GetPhone, SetPhone, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, IsRequired, Placeholder, MaxLenght, MinLenght, Size
Progress | Max, Value, InnerText
Range | GetRange, SetRange, Hover, Focus, IsDisabled, Value, IsAutoComplete, List, IsRequired, Max, Min, Step
Search | GetSearch, SetSearch, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, IsRequired, Placeholder, MaxLenght, MinLenght, Size
Time | GetTime, SetTime, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, Max, Min, Step
Url | GetUrl, SetUrl, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, IsRequired, Placeholder, MaxLenght, MinLenght, Size
Week | GetWeek, SetWeek, Hover, Focus, IsDisabled, Value, IsAutoComplete, IsReadonly, Max, Min, Step

