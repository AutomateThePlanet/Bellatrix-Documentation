---
layout: default
title:  "Visual Regression Tracker Integration"
excerpt: "Learn how to use Visual Regression Tracker inside your BELLATRIX tests"
date:   2024-07-04 16:40:00 +0200
parent: product-integrations
permalink: /product-integrations/visual-regression-tracker/
anchors:
  what-is-visual-regression-tracker: What Is Visual Regression Tracker?
  usage: Usage
  config: Config
---
What Is Visual Regression Tracker?
------------------
**[Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker)** (VRT) is a tool used in software testing to detect visual changes in a web application's user interface. It captures screenshots of web pages and compares them with baseline images to identify any unintended visual differences. This is particularly useful for ensuring that updates or changes to code do not introduce visual bugs.

Usage
------------------
To use VRT inside your BELLATRIX tests simply add Bellatrix.VisualRegressionTracker as a dependency. After that, you can use VRT to track the UI in specific points in your tests like this:

```csharp
VisualRegressionTracker.TakeSnapshot(name);
```

It will automatically take a screenshot and send it to VRT server for analyzing.

Config
------------------
The settings section in the config file must look like this:
```JSON
"visualRegressionTrackerSettings ": {
  "apiUrl": "insert your api url",
  "project": "insert your project",
  "apiKey": "insert your api key",
  "branch": "insert your branch",
  "enableSoftAssert": "true",
  "ciBuildId": "insert your ci build id",
  "httpTimeout": "10"
}
```