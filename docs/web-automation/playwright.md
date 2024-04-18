---
layout: default
title:  "Playwright"
excerpt: "Learn about BELLATRIX Playwright."
date:   2024-04-15 15:00:00 +0200
parent: web-automation
permalink: /web-automation/playwright/
anchors:
  overview: Overview
  asynchronous-programming: Asynchronous Programming
  browser-management: Browser Management
  services: Services
  webtest: WebTest
  webpage: WebPage
  components: Components
  logging: Logging

---
Overview
--------
Playwright is a powerful open-source automation libary for browser testing. It supports Cross-browser testing, it is Cross-platform, you can use it on TypeScript, Python, .NET, and Java.

BELLATRIX supports Playwrigth engine for browser automation for TypeScript, .NET, and Java. 

As powerful of a tool Playwright is, BELLATRIX still has improvements to offer and in this page you will learn what you gain with BELLATRIX Playwright module.

Asynchronous Programming
------------
Playwright for C# is asynchronous. As this may have benefits, the drawback of constantly having to write asynchronous code is not to be ignored too. You may forget to await a single function and the whole test becomes flaky and unreliable; in test automation reliability is of utmost priority.

Even if some milliseconds per function are lost during a conversion from asynchronous to synchronous code, it guarantees the stability of the tests.

BELLATRIX offers synchronous API to the most commonly used Playwright classes and functions. You can forget about async/await keywords with BELLATRIX Playwright. 

Browser Management
------------
For your convenience, BELLATRIX Playwright covers entirely the logic for creating Browsers and also their disposal. You can simply focus on writing tests. You can easily configure what browsers to be used, in headless mode or not. You can configure everything from Playwright, as such options have been exposed.

Services
------------

In the same way as the components mentioned bellow, the different actions you can perform against the browser itself are 'categorized' in services: **BrowserService** for tab navigation, url, title, content, and navigation like back and forward; **CookiesService**; **DialogService**; **InteractionsService** for complex actions like moving the mouse, typing letter by letter on the keyboard, etc.; **JavaScriptService**; **NavigationService** for navigating to web pages or local pages.

All of the services are available through the **App** object, which is available in every test class extending **WebTest** and every POM class extending **WebPage**.

WebTest
------------
By extending this test class, for NUnit or MSTest, you gain full access to the features of BELLATRIX, including: control of the browser lifecycle, plugins, logging, screenshot on fail, video-recording, etc.

WebPage
------------
By extending this class in your Page Object Models, you gain full access to the services in **App**, and common assertions for the url.

Page Object Models are recommended because of code-reusability. To create components, you use the Create service of the App object.

Components
------------
As with BELLATRIX Selenium module, components offer more specific API for the most common HTML elements. For example, HTML element of type Span shouldn't be clickable, in most cases. Components narrow down the available actions you can perform agains the element, and expose convenient properties for the available attributes of the elements.

Logging
------------
BELLATRIX has built-in logic for logging every action performed against the elements. Once the test finishes, you can trace back every step of the test.

Another benefit is when a test fails, you can easily find out on exactly which step it failed, why, and what and where was the last successful step.