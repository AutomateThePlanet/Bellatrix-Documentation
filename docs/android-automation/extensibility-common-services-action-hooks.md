---
layout: default
title:  "Extensibility- Common Services Action Hooks"
excerpt: "Learn how to extend BELLATRIX common services using action hooks."
date:   2021-10-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/extensibility-common-services-action-hooks/
anchors:
  explanations: Explanations
---
Explanations
------------
Another way to extend BELLATRIX is to use the common services hooks. This is how the failed tests analysis works. The base class for all Android elements- **Element** provides a few special events as well:
- **ScrollingToVisible** - called before scrolling
- **ScrolledToVisible** - called after scrolling
- **CreatingComponent** - called before creating the component
- **CreatedComponent** - called after the creation of the component
- **CreatingComponents** - called before the creation of nested component
- **CreatedComponents** - called after the creation of nedsted component
- **ReturningWrappedElement** - called before searching for native WebDriver component

To add custom logic to the component's methods you can create a class that derives from **ComponentEventHandlers**. The override the methods you like.