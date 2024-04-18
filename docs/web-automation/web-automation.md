---
layout: default
title:  "Web Automation"
excerpt: "Learn how to use BELLATRIX Web test framework."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/

---
Overview
--------
Control browsers with BELLATRIX web module. Ability to restart every time to make sure that new browser comes with new cookies and cache, restart on fail or reused if the previous test’s browser was the same.

In BELLATRIX, Selenium and Playwright are supported for web automation testing. They are as different modules inside the framework and if you want to switch from one to the other, you have to change the project dependencies of your test projects. After that, you can use mass-replace to change every using. It is recommended to move the usings in a Usings.cs file and make them global, as to make it easier to change them if needed.

The two projects, Bellatrix.Web and Bellatrix.Playwright, have a similar structure and most of the methods will be identical.

In this documentation, you will find information in every page for both, if there are any differences between the two. Otherwise you can assume the content is identical for both and there was no need to write anything more about Bellatrix.Playwright.

To get insight to with what the Bellatrix module contributes to the native Playwright, [**Learn more here**](playwright).

In case you are wondering which one to use, you can [**Learn more**](selenium-vs-playwright) about both engines.


### Wait Elements ###
Perform an action against an element only when a specific condition is true. Waits for the element to exist or not, to be visible, clickable, disabled. [**Learn more**](wait-for-elements).

### CookiesService ###
You need to make sure that you have navigated to the desired web page. Get all cookies, Get a specific cookie by name, Delete all cookies, Delete a specific cookie by name. Add a new cookie. [**Learn more**](cookies-service).

### 30+ web components ###
Includes only the actions that you should be able to do with the specific component and nothing more.
[**Learn more**](simple-components).

### Web Extendability ###
Execute your code on each component action, add additional logic to core framework methods and easily set anything to file configuration. Check all extensibility options:

- [**Plugin hooks**](extensibility-test-workflow-hooks)
- [**Plugins**](extensibility-custom-test-workflow-plugins)
- [**Element action hooks**](extensibility-element-action-hooks)
- [**Common services action hooks**](extensibility-common-services-action-hooks)
- [**Extend existing elements-extension methods**](extensibility-extend-existing-elements-extension-methods)
- [**Extend existing elements-child elements**](extensibility-extend-existing-elements-child-elements)
- [**Extend common services**](extensibility-extend-common-services)







