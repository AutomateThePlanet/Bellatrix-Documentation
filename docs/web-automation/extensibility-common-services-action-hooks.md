---
layout: default
title:  "Extensibility- Common Services Action Hooks"
excerpt: "Learn how to extend BELLATRIX common services using action hooks."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-common-services-action-hooks/
anchors:
  explanations: Explanations
---
Explanations
------------
Another way to extend BELLATRIX is to use the common services hooks. This is how the failed tests analysis works. Here is a list of all common services event you can subscribe to.
**NavigationService** - **UrlNotNavigatedEvent**, called if the **WaitForPartialUrl** throws exception
**ElementWaitService** - **OnElementNotFulfillingWaitConditionEvent**, called if the Wait method throws exception (it is used in all WaitToBe classes.

Also, the base class for all web elements- Element provides a few special events as well:
- **ScrollingToVisible** - called before scrolling
- **ScrolledToVisible** - called after scrolling
- **SettingAttribute** - called before setting a web attribute
- **AttributeSet** = called after setting a value to a web attribute
- **CreatingElement** - called before creating the element
- **CreatedElement** - called after the creation of the element
- **CreatingElements** - called before the creation of nested element
- **CreatedElements** - called after the creation of nedsted element
- **ReturningWrappedElement** - called before searching for native WebDriver element
To add custom logic to the element's methods you can create a class that derives from ElementEventHandlers. The override the methods you like.
