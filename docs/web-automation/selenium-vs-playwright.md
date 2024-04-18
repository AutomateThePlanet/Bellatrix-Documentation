---
layout: default
title:  "Selenium vs Playwright"
excerpt: "Learn the differences between BELLATRIX Selenium and BELLATRIX Playwright."
date:   2024-04-10 13:50:17 +0200
parent: web-automation
permalink: /web-automation/selenium-vs-playwright/
anchors:
  overview: Overview
  elements-and-components: Elements and Components
  http-traffic: HTTP Traffic
  speed-of-execution: Speed of Execution
  browsercontext-vs-clearing-cookies: BrowserContext vs Clearing Cookies
  iframes: IFrames
  maximizing-and-minimizing: Maximizing and Minimizing
  grid-compatibility: Grid Compatibility
---
Overview
--------
In BELLATRIX, Selenium and Playwright are made to work in a similar way. As you might easily get the difference between native Selenium and native Playwright on the internet, here these differences will be covered briefly.

Elements and Components
------------
Playwright has built-in logic for waiting for the elements, also the main objects you use to interact with the web-page are **Locator**, **BrowserContext**, and **Page**. Locators are find strategies. They are similar to the components in Bellatrix Selenium as they only hold the strategy to find the element and every time you call a method of the Locator class, internally the engine searches and finds again the element on the page.

Playwright's **ElementHandle** class is more similar to Selenium's **WebElement**. Both hold a direct reference to the element on the page and if you refresh the page, they will stop working. In Selenium, that results in **StaleElementReferenceException**.

So, in summary, native Playwright is more stable than native Selenium, unless you build a custom logic to handle all of the different variables, such as: waiting for the element to be visible, waiting for the element to be enabled, generally finding the element again every time you try to perform actions against it, etc. Bellatrix does that under-the-hood, for your convenience. When it comes to actions related to the elements, there is no significant difference between the two modules.

Even though they are quite similar in their inner logic, it is assumed that Bellatrix Playwright is more stable in this specific aspect and thus -- more reliable than Bellatrix Selenium.

HTTP Traffic
------------
In case your needs include http traffic handling, e.g. blocking HTTP requests or responses, modifying requests and responses, etc. Maybe Playwright would be more suitable for your project, as Selenium needs an external library for such operations, which increases the risk for unreliable tests.

Speed of Execution
------------
It is assumed that Playwright is a bit faster than Selenium in some of the common operations such as clicking, setting the text of a field, etc. The navigation to other pages is faster as well.

Another aspect of the execution speed is the running of multiple tests one after the other. When using the lifecycle mode **RestartEveryTime**, which is the recommended one, for each and every test a new driver is started. This may take some time, which in a larger scale may result in additional hours during the test execution.

When using Bellatrix Playwright, you can safely use the lifecycle **ReuseIfStarted** and the explanation is in the next section.

BrowserContext vs Clearing Cookies
------------
In Playwright, **BrowserContext** is responsible for the cookies, sessions, geolocation, and generally - the tests' independence. Once you reset the **BrowserContext**, the previous test won't influence in any way the currently executed one.

In Bellatrix Playwright, when you set the lifecycle to **ReuseIfStarted**, only the **BrowserContext** is reset for the new test, which takes less than a second. There is no need to reset the whole playwright browser, which would take much longer.

This contributes to faster test execution and higher test reliability.

In BELLATRIX Selenium, the lifecycle **ReuseIfStarted** clears the cookies, but this may not be as reliable and it is recommended to use **RestartEveryTime** or **RestartOnFailure**.

IFrames
------------
In Selenium, to interact with iframes you have to switch to them and when you are done, you have to switch to default.
```csharp
[Test]
public void TestingIFrames()
{
    App.Navigation.Navigate("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe");
    App.Components.CreateById<Button>("accept-choices").Click();

    var parentIFrame = App.Components.CreateByXpath<Frame>("//iframe[@id='iframeResult']");
    App.Browser.SwitchToFrame(parentIFrame);

    var iframe = App.Components.CreateByXpath<Frame>("//iframe[@src='https://www.w3schools.com']");
    App.Browser.SwitchToFrame(iframe);

    App.Components.CreateByXpath<Button>("//div[@id='accept-choices']").Click();

    App.Browser.SwitchToDefault();
    App.Browser.SwitchToFrame(parentIFrame);
    iframe.CreateByXpath<Heading>(".//preceding-sibling::h1").ValidateInnerTextContains("The iframe element");

    App.Browser.SwitchToDefault();
}
```
Here is the same test, but with the Playwright engine.
```csharp
[Test]
public void TestingIFrames()
{
    App.Navigation.Navigate("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe");
    App.Components.CreateById<Button>("accept-choices").Click();

    var parentIFrame = App.Components.CreateByXpath<Frame>("//iframe[@id='iframeResult']");

    var iframe = parentIFrame.CreateByXpath<Frame>("//iframe[@src='https://www.w3schools.com']");

    iframe.CreateByXpath<Button>("//div[@id='accept-choices']").Click();

    iframe.As<Div>().CreateByXpath<Heading>(".//preceding-sibling::h1").ValidateInnerTextContains("The iframe element");
}
```
To work with iframes, with native Playwright, you have to use FrameLocator instead of Locator. This may prove bothersome, because you don't always need to go inside the iframe element and search there, but maybe search an element that is a sibling to the iframe.
Thus, for the same exact element, you will have to create 2 separate objects.

In BELLATRIX, this logic is handled under-the-hood; You can easily reuse the component.
```csharp
iframe.As<Div>()
```
This method **As** converts the current component to a more convenient type of component. When switching from **Frame** to **Div** or any other component, behind the scenes BELLATRIX changes which locator type is used - FrameLocator or Locator. The conversion from any other component to **Frame** does the same thing and it will start working seamlessly.

Maximizing and Minimizing
------------
Maximizing and minimizing the browser in Playwright is impossible the way it's done in Selenium. You can change the viewport though.

Grid Compatibility
------------
Bellatrix Selenium supports out of the box executing tests in SauceLabs, LambdaTest, BrowserStack, Selenium Grid, and Selenoid.

Bellatrix Playwright supports fully only LambdaTest and BrowserStack; On Selenium Grid and Selenoid, only Chrome is supported.

Based on your needs, one or the other may be a better option.