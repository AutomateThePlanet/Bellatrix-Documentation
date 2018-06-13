---
layout: default
title:  "Getting Started"
excerpt: "Getting Started"
date:   2018-02-20 04:50:17 +0200
---
# Getting Started #

1. Go to [**meissarunner.com**](http://meissarunner.com/ "meissarunner.com")
2. Download the file for your operating system (Windows, Linux, MacOS)
3. Unzip It 

You need to choose which type of test execution you prefer:
- Parallel- single machine - multiple processes
- Distributed testing- multiple machines - single process
- Parallel distributed testing- multiple machines - multiple processes

For more information about the topic refer to the section- [**What is a Parallel Test Execution?**](what-is-parallel-test-execution.md)

Below you can find info about the different setup and examples how to start using Meissa. However, for complete reference about all available options and their meanings refer to the [**How Do We Use It?**](how-do-we-use-it.md) section.

## 1. Parallel- Single Machine - Multiple Processes ##

In this scenario, you will execute your test on a single machine.

- Start Meissa in **server mode** on your machine
```
[TestMethod]
public void PromotionsPageOpened_When_PromotionsButtonClicked()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    // 1. There are different ways to locate elements on the page. To do it you use the element create service.
    // You need to know that Bellatrix has a built-in complex mechanism for waiting for elements, so you do not need to worry about this anymore.
    // Keep in mind that when you use the Create methods, the element is not searched on the page. All elements use lazy loading.
    // Which means that they are searched once you perform an action or assertion on them. By default on each new action, the element is searched again and be refreshed.
    var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

    promotionsLink.Click();

    // 2. Because of the proxy element mechanism (we have a separate type of element instead of single WebDriver IWebElement interface) we have several benefits.
    // Each control (element type- ComboBox, TextField and so on) contains only the actions you can do with it, and the methods are named properly.
    // In vanilla WebDriver to type the text you call SendKeys method.
    // Also, we have some additional properties in the proxy web control such as- By. Now you can get the locator with which you element was found.
    Console.WriteLine(promotionsLink.By.Value);

    // 3. You can access the WebDriver wrapped element through WrappedElement and the current WebDriver instance through- WrappedDriver
    Console.WriteLine(promotionsLink.WrappedElement.TagName);
}
```
- Start Meissa in **test agent mode** on the same machine
```
[TestClass]
[Browser(BrowserType.Edge, BrowserBehavior.ReuseIfStarted)]
public class BellatrixBrowserBehaviourTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [TestMethod]
    [Browser(BrowserType.Chrome, BrowserBehavior.RestartOnFail)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

        blogLink.Click();
    }
}
```
- Run your tests with Meissa **test runner mode** on the same machine
```
[TestMethod]
public void CaptureTrafficTests()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
    Anchor protonMReadMoreButton = App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
    Anchor addToCartFalcon9 = App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
    Anchor viewCartButton = App.ElementCreateService.CreateByClass<Anchor>("added_to_cart wc-forward").ToBeClickable();

    sortDropDown.SelectByText("Sort by price: low to high");
    protonMReadMoreButton.Hover();
    addToCartFalcon9.Focus();
    addToCartFalcon9.Click();
    viewCartButton.Click();
            
    App.ProxyService.AssertNoErrorCodes();

    App.ProxyService.AssertNoLargeImagesRequested();

    App.ProxyService.AssertRequestMade("http://demos.bellatrix.solutions/favicon.ico");
}
```

After the test execution, the runner will be closed. Do not close the server and the test agent they will be reused for the new runs.

## 2. Distributed Testing- Multiple Machines - Single Process ##

In this scenario, you will execute your test on multiple machines.

- Start Meissa in **server mode** on a dedicated machine. Depending on what resources does it have, you may consider the option to have a dedicated computer for the server or at least not start it on the same device where there is a test agent or runner. Please refer to the **requirements** section.
```
meissa.exe initServer
```
- Start Meissa in **test agent mode** on all machines that you want to be agents. Depending on their resources and what will be executed, prefer scenarios where the test agent runs there in isolation. Make sure to set the correct test server URL. It is formed by the IP of the machine where you have started Meissa in server mode.
```
meissa.exe testAgent --testAgentTag="APIAgent" --testServerUrl="http://IPServerMachine:5000"
```
- Run your tests with Meissa **test runner mode** on some of the machines or even better prefer starting it on a dedicated computer. Refer to the requirements section.
```
Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
Anchor protonMReadMoreButton = App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
Anchor addToCartFalcon9 = App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
Anchor viewCartButton = App.ElementCreateService.CreateByClass<Anchor>("added_to_cart wc-forward").ToBeClickable();

sortDropDown.SelectByText("Sort by price: low to high");
protonMReadMoreButton.Hover();

// 1. Sometimes is useful to add information to the generated test log.
// To do it you can use the Bellatrix built-in logger through accessing it via App service.
App.Logger.LogInformation("Before adding Falcon 9 rocket to cart.");

addToCartFalcon9.Focus();
addToCartFalcon9.Click();
viewCartButton.Click();
```

After the test execution, the runner will be closed. Do not close the server and the test agent they will be reused for the new runs.

## 3. Parallel Distributed Testing- Multiple Machines - Multiple Processes ##
All configurations are almost the same as the previous section except the running tests processes. 
To execute the tests in parallel, you have two options. If you use the parallel capabilities of the used native runner, then you don't have to do anything more. The tests will be executed in parallel on each test agent machine.
If you want to use Meissa's parallel execution capabilities, you need to add an argument to the runner options.
```
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace Bellatrix.Web.GettingStarted
{
    [TestClass]
    [SauceLabs(BrowserType.Firefox,
        "50",
        "Windows",
        BrowserBehavior.ReuseIfStarted,
        recordScreenshots: true,
        recordVideo: true)]
    public class CustomWebDriverCapabilitiesTests : WebTest
    {
        // 1. Bellatrix hides the complexity of initialisation of WebDriver and all related services.
        // In some cases, you need to customise the set up of a browser with using WebDriver options, adding driver capabilities or using browser profile.
        // Using the App service methods you can add all of these with ease. Make sure to call them in the TestsArrange which is called before the
        // execution of the tests placed in the test class. These options are used only for the tests in this particular class.
        // Note: You can use all of these methods no matter which attributes you use- Browser, Remote, SauceLabs, BrowserStack or CrossBrowserTesting.
        public override void TestsArrange()
        {
            var firefoxOptions = new FirefoxOptions
            {
                AcceptInsecureCertificates = true,
                UnhandledPromptBehavior = UnhandledPromptBehavior.Accept,
                PageLoadStrategy = PageLoadStrategy.Eager,
            };

            // 2. Add custom WebDriver options.
            App.AddWebDriverOptions(firefoxOptions);

            // 3. Add custom WebDriver capability.
            App.AddWebDriverCapability("disable-popup-blocking", true);

            // 4. Add an existing Firefox profile. You may want to test your application in together with some specific browser extension.
            var profileManager = new FirefoxProfileManager();
            FirefoxProfile profile = profileManager.GetProfile("Bellatrix");

            App.AddWebDriverBrowserProfile(profile);
        }

        [TestMethod]
        [Ignore]
        public void PromotionsPageOpened_When_PromotionsButtonClicked()
        {
            App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

            var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

            promotionsLink.Click();
        }

        [TestMethod]
        [Ignore]
        public void BlogPageOpened_When_PromotionsButtonClicked()
        {
            App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

            var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

            blogLink.Click();
        }
    }
}
```
For more detailed information refer to the [**features**](features.md) and [**how it works internally**](how-does-it-work-internally.md) sections.