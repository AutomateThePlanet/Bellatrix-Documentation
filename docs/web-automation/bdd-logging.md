---
layout: default
title:  "Behaviour Driven Development BDD Logging"
excerpt: "Learn the BELLATRIX Behaviour Driven Development BDD Logging works and how to use it."
date:   2018-06-2s 06:50:17 +0200
parent: web-automation
permalink: /web-automation/bdd-logging/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestMethod]
public void PurchaseRocketWithLogs()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
    Anchor protonMReadMoreButton = App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
    Anchor addToCartFalcon9 = 
    App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
    Anchor viewCartButton = 
    App.ElementCreateService.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

    sortDropDown.SelectByText("Sort by price: low to high");
    protonMReadMoreButton.Hover();
    addToCartFalcon9.Focus();
    addToCartFalcon9.Click();
    viewCartButton.Click();

    TextField couponCodeTextField = App.ElementCreateService.CreateById<TextField>("coupon_code");
    Button applyCouponButton = App.ElementCreateService.CreateByValueContaining<Button>("Apply coupon");
    Div messageAlert = App.ElementCreateService.CreateByClassContaining<Div>("woocommerce-message");
    Number quantityBox = App.ElementCreateService.CreateByClassContaining<Number>("input-text qty text");
    Button updateCart = App.ElementCreateService.CreateByValueContaining<Button>("Update cart").ToBeClickable();
    Span totalSpan = App.ElementCreateService.CreateByXpath<Span>("//*[@class='order-total']//span");
    Anchor proceedToCheckout = 
    App.ElementCreateService.CreateByClassContaining<Anchor>("checkout-button button alt wc-forward");

    couponCodeTextField.SetText("happybirthday");
    applyCouponButton.Click();
    messageAlert.ToHasContent().ToBeVisible().WaitToBe();
    messageAlert.EnsureInnerTextIs("Coupon code applied successfully.");
    quantityBox.SetNumber(0);
    quantityBox.SetNumber(2);
    updateCart.Click();
    totalSpan.EnsureInnerTextIs("95.00€", 15000);
    proceedToCheckout.Click();

    Heading billingDetailsHeading = App.ElementCreateService.CreateByInnerTextContaining<Heading>("Billing details");
    Anchor showLogin = App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Click here to login");
    TextArea orderCommentsTextArea = App.ElementCreateService.CreateById<TextArea>("order_comments");
    TextField billingFirstName = App.ElementCreateService.CreateById<TextField>("billing_first_name");
    TextField billingLastName = App.ElementCreateService.CreateById<TextField>("billing_last_name");
    TextField billingCompany = App.ElementCreateService.CreateById<TextField>("billing_company");
    Select billingCountry = App.ElementCreateService.CreateById<Select>("billing_country");
    TextField billingAddress1 = App.ElementCreateService.CreateById<TextField>("billing_address_1");
    TextField billingAddress2 = App.ElementCreateService.CreateById<TextField>("billing_address_2");
    TextField billingCity = App.ElementCreateService.CreateById<TextField>("billing_city");
    Select billingState = App.ElementCreateService.CreateById<Select>("billing_state").ToBeVisible().ToBeClickable();
    TextField billingZip = App.ElementCreateService.CreateById<TextField>("billing_postcode");
    Phone billingPhone = App.ElementCreateService.CreateById<Phone>("billing_phone");
    Email billingEmail = App.ElementCreateService.CreateById<Email>("billing_email");
    CheckBox createAccountCheckBox = App.ElementCreateService.CreateById<CheckBox>("createaccount");
    RadioButton checkPaymentsRadioButton = 
	App.ElementCreateService.CreateByAttributesContaining<RadioButton>("for", "payment_method_cheque");

    billingDetailsHeading.ToBeVisible().WaitToBe();
    showLogin.EnsureHrefIs("http://demos.bellatrix.solutions/checkout/#");
    showLogin.EnsureCssClassIs("showlogin");
    orderCommentsTextArea.ScrollToVisible();
    orderCommentsTextArea.SetText("Please send the rocket to my door step!");
    billingFirstName.SetText("In");
    billingLastName.SetText("Deepthought");
    billingCompany.SetText("Automate The Planet Ltd.");
    billingCountry.SelectByText("Bulgaria");
    billingAddress1.EnsurePlaceholderIs("House number and street name");
    billingAddress1.SetText("bul. Yerusalim 5");
    billingAddress2.SetText("bul. Yerusalim 6");
    billingCity.SetText("Sofia");
    billingState.SelectByText("Sofia-Grad");
    billingZip.SetText("1000");
    billingPhone.SetPhone("+00359894646464");
    billingEmail.SetEmail("info@bellatrix.solutions");
    createAccountCheckBox.Check();
    checkPaymentsRadioButton.Click();
}
```

Explanations
------------
There cases when you need to show your colleagues or managers what tests do you have. Sometimes you may have manual test cases, but their maintenance and up-to-date state are questionable. Also, many times you need additional work to associate the tests with the test cases. Some frameworks give you a way to write human readable tests through the Gherkin language. The main idea is non-technical people to write these tests. However, we believe this approach is doomed. Or it is doable only for simple tests. This is why in BELLATRIX we built a feature that generates the test cases after the tests execution. After each action or assertion, a new entry is logged.

After the test is executed the following log is created:

```
>Start Chrome on PORT = 34079
Start Test
Class = BDDLoggingTests Name = PurchaseRocketWithLogs
Select 'Sort by price: low to high' from control (Name ending with orderby)
Hover control (InnerText containing Read more)
Focus control (data-product_id = 28)
Click control (data-product_id = 28)
Click control (Class = added_to_cart wc-forward)
Type 'happybirthday' into control (ID = coupon_code)
Click control (Value containing Apply coupon)
Ensure control (Class = woocommerce-message) inner text is 'Coupon code applied successfully.'
Set '0' into control (Class = input-text qty text)
Set '2' into control (Class = input-text qty text)
Click control (Value containing Update cart)
Ensure control (XPath = //*[@class='order-total']//span) inner text is '95.00€'
Click control (Class = checkout-button button alt wc-forward)
Ensure control (InnerText containing Click here) href is 'http://demos.bellatrix.solutions/checkout/#'
Ensure control (InnerText containing Click here) CSS class is 'showlogin'
Scroll to visible control (ID = order_comments)
Type 'Please send the rocket to my door step!' into control (ID = order_comments)
Type 'In' into control (ID = billing_first_name)
Type 'Deepthought' into control (ID = billing_last_name)
Type 'Automate The Planet Ltd.' into control (ID = billing_company)
Select 'Bulgaria' from control (ID = billing_country)
Ensure control (ID = billing_address_1) placeholder is 'House number and street name'
Type 'bul. Yerusalim 5' into control (ID = billing_address_1)
Type 'bul. Yerusalim 6' into control (ID = billing_address_2)
Type 'Sofia' into control (ID = billing_city)
Select 'Sofia-Grad' from control (ID = billing_state)
Type '1000' into control (ID = billing_postcode)
Type '+00359894646464' into control (ID = billing_phone)
Type 'info@bellatrix.solutions' into control (ID = billing_email)
Check control (ID = createaccount)
Click control (for = payment_method_cheque)
```

You can notice that since we use Ensure assertions not the regular one they also present in the log: *Ensure control (XPath = //*[@class='order-total']//span) inner text is '95.00€'*

There are two specifics about the generation of the logs. If page objects are used, which are discussed in next chapters. Two things change.
1. Instead of locators, the exact names of the element properties are printed.
2. Instead of page URL, the name of the page is displayed.

Configuration
-------------
```json
"logging": {
       "isEnabled": "true",
       "isConsoleLoggingEnabled": "true",
       "isDebugLoggingEnabled": "true",
       "isEventLoggingEnabled": "false",
       "isFileLoggingEnabled": "true",
       "outputTemplate":  "{Message:lj}{NewLine}",
       "addUrlToBddLogging": "false"
   }
```
In the **testFrameworkSettings.json** file find a section called logging, responsible for controlling the BDD logs generation. You can disable the logs entirely. There are different places where the logs are populated. By default, you can see the logs in the output window of each test. Also, a file called logs.txt is generated in the folder with the DLLs of your tests. If you execute your tests in CI with some CLI test runner the logs are printed there as well. **outputTemplate** - controls how the message is formatted. You can add additional info such as timestamp and much more.
For more info visit- [https://github.com/serilog/serilog/wiki/Formatting-Output](https://github.com/serilog/serilog/wiki/Formatting-Output)
If **addUrlToBddLogging** is true, after each action the current page's URL will be added.****