---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

## Page Object Pattern in Automated Testing Java Code

```java
public BingMainPage(WebDriver browser) {
  driver = browser;
  PageFactory.initElements(browser, this);
}
```

```java
public class BingMainPageElements {

  private final WebDriver browser;

  public BingMainPageElements(WebDriver browser) {
    this.browser = browser;
  }

  public WebElement searchBox() {
    return browser.findElement(By.id("sb_form_q"));
  }

  public WebElement goButton() {
    return browser.findElement(By.xpath("//label[@for='sb_form_go']"));
  }

  public WebElement resultsCountDiv() {
    return browser.findElement(By.id("b_tween"));
  }
}

```

## Getting Started with Appium for Android Java on macOS in 10 Minutes

```bash
export JAVA_HOME="/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home"
```
