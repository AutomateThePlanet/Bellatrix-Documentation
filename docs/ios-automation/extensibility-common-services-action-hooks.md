---
layout: default
title:  "Extensibility- Common Services Action Hooks"
excerpt: "Learn how to extend BELLATRIX common services using action hooks."
date:   2018-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/extensibility-common-services-action-hooks/
anchors:
  explanations: Explanations
---
Explanations
------------
Another way to extend BELLATRIX is to use the common services hooks. This is how the failed tests analysis works. The base class for all iOS elements- **Element** provides a few special events as well:
- **ScrollingToVisible** - called before scrolling
- **ScrolledToVisible** - called after scrolling
- **CreatingElement** - called before creating the element
- **CreatedElement** - called after the creation of the element
- **CreatingElements** - called before the creation of nested element
- **CreatedElements** - called after the creation of nested element
- **ReturningWrappedElement** - called before searching for native WebDriver element

To add custom logic to the element's methods you can create a class that derives from **ElementEventHandlers**. The override the methods you like.