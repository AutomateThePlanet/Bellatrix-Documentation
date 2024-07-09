---
layout: default
title:  "Healenium Integration"
excerpt: "Learn how to use Healenium inside your BELLATRIX tests"
date:   2024-07-04 16:40:00 +0200
parent: product-integrations
permalink: /product-integrations/healenium/
anchors:
  what-is-healenium: What Is Healenium?
  usage: Usage
---
What Is Healenium?
------------------
**[Healenium](https://github.com/healenium/healenium)** is an open-source library designed to enhance automated testing frameworks by providing self-healing capabilities for Selenium-based tests. It helps maintain the robustness of test scripts by dynamically updating locators when they change, reducing the need for manual maintenance.

Usage
------------------
To use Healenium self-healing capabilities for your BELLATRIX Selenium tests, simply state in the config file, in webSettings, executionSettings, as **executionType** "healenium".