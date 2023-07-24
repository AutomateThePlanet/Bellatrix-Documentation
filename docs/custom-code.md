---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

```java
public class FluentBingTests {
  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void searchImageInBing_when_NoFluentPageObjectPatternUsed() {
    var bingMainPage = new BingMainPage();
    bingMainPage.navigate();
    bingMainPage.search("Automate The Planet");
    bingMainPage.clickImages();
    bingMainPage.clickImagesFilter();
    bingMainPage.setSize(Size.LARGE);
    bingMainPage.setColor(Color.COLOR_ONLY);
    bingMainPage.setType(Type.CLIPART);
    bingMainPage.setPeople(People.ALL);
    bingMainPage.setDate(Date.PAST_YEAR);
    bingMainPage.setLicense(License.ALL);
  }
}
```

```java
public class BingMainPage
  extends BasePage<BingMainPageElements, BingMainPageAssertions> {

  @Override
  protected String getUrl() {
    return "http://www.bing.com/";
  }

  @Override
  public BingMainPage navigate() {
    super.navigate();
    return this;
  }

  @Override
  public BingMainPage navigate(String part) {
    super.navigate(part);
    return this;
  }

  public BingMainPage search(String textToType) {
    elements().searchBox().clear();
    elements().searchBox().sendKeys(textToType);
    elements().goButton().click();
    return this;
  }

  public BingMainPage clickImages() {
    elements().imagesLink().click();
    return this;
  }

  public BingMainPage clickImagesFilter() {
    elements().filterMenu().click();
    return this;
  }

  public BingMainPage setSize(Size size) {
    waitForAsyncRefresh(elements().sizes());
    elements().sizes().click();
    elements().sizesOption().get(size.ordinal()).click();
    return this;
  }

  public BingMainPage setColor(Color color) {
    waitForAsyncRefresh(elements().color());
    elements().color().click();
    elements().colorOption().get(color.ordinal()).click();
    return this;
  }

  public BingMainPage setType(Type type) {
    waitForAsyncRefresh(elements().type());
    elements().type().click();
    elements().typeOption().get(type.ordinal()).click();
    return this;
  }

  public BingMainPage setLayout(Layout layout) {
    waitForAsyncRefresh(elements().layout());
    elements().layout().click();
    elements().layoutOption().get(layout.ordinal()).click();
    return this;
  }

  public BingMainPage setPeople(People people) {
    waitForAsyncRefresh(elements().people());
    elements().people().click();
    elements().peopleOption().get(people.ordinal()).click();
    return this;
  }

  public BingMainPage setDate(Date date) {
    waitForAsyncRefresh(elements().date());
    elements().date().click();
    elements().dateOption().get(date.ordinal()).click();
    return this;
  }

  public BingMainPage setLicense(License license) {
    waitForAsyncRefresh(elements().license());
    elements().license().click();
    elements().licenseOption().get(license.ordinal()).click();
    return this;
  }

  private void waitForAsyncRefresh(WebElement element) {
    Driver
      .getBrowserWait()
      .until(ExpectedConditions.elementToBeClickable(element));
    Driver
      .getBrowserWait()
      .until(
        ExpectedConditions.invisibilityOfElementLocated(By.id("ajaxMaskLayer"))
      );
  }
}

```

```java
return this;

```

```java
public WebElement sizes() {
return browser.findElement(By.xpath("//div/ul/li/span/span[text() = 'Image size']"));
}
public List<WebElement> sizesOption() {
return browser.findElements(By.xpath("//div/ul/li/span/span[text() = 'Image size']/ancestor::li/div/div//a"));
}
public WebElement color() {
return browser.findElement(By.xpath("//div/ul/li/span/span[text() = 'Color']"));
}
public List<WebElement> colorOption() {
return browser.findElements(By.xpath("//div/ul/li/span/span[text() = 'Color']/ancestor::li/div/div//a"));
}
public WebElement type() {
return browser.findElement(By.xpath("//div/ul/li/span/span[text() = 'Type']"));
}
public List<WebElement> typeOption() {
return browser.findElements(By.xpath("//div/ul/li/span/span[text() = 'Type']/ancestor::li/div/div//a"));
}
public WebElement layout() {
return browser.findElement(By.xpath("//div/ul/li/span/span[text() = 'Layout']"));
}
public List<WebElement> layoutOption() {
return browser.findElements(By.xpath("//div/ul/li/span/span[text() = 'Layout']/ancestor::li/div/div//a"));
}
public WebElement people() {
return browser.findElement(By.xpath("//div/ul/li/span/span[text() = 'People']"));
}
public List<WebElement> peopleOption() {
return browser.findElements(By.xpath("//div/ul/li/span/span[text() = 'People']/ancestor::li/div/div//a"));
}
public WebElement date() {
return browser.findElement(By.xpath("//div/ul/li/span/span[text() = 'Date']"));
}
public List<WebElement> dateOption() {
return browser.findElements(By.xpath("//div/ul/li/span/span[text() = 'Date']/ancestor::li/div/div//a"));
}
public WebElement license() {
return browser.findElement(By.xpath("//div/ul/li/span/span[text() = 'License']"));
}
public List<WebElement> licenseOption() {
return browser.findElements(By.xpath("//div/ul/li/span/span[text() = 'License']/ancestor::li/div/div//a"));
}
```

```java
public enum Date {
  ALL,
  PAST_24_HOURS,
  PAST_WEEK,
  PAST_MONTH,
  PAST_YEAR,
}

```

```java
public BingMainPage setDate(Date date) {
    waitForAsyncRefresh(elements().date());
    elements().date().click();
    elements().dateOption().get(date.ordinal()).click();
    return this;
}
```

```java
public class BingMainPageAssertions
  extends BaseAssertions<BingMainPageElements> {

  public void resultsCount(String expectedCount) {
    Assert.assertTrue(
      elements().resultsCountDiv().getText().contains(expectedCount),
      "The results DIV doesn't contain the specified text."
    );
  }
}

```

```java
public class BingMainPageAssertions
  extends BaseAssertions<BingMainPageElements> {

  public BingMainPageAssertions resultsCountFluent(String expectedCount) {
    Assert.assertTrue(
      elements().resultsCountDiv().getText().contains(expectedCount),
      "The results DIV doesn't contain the specified text."
    );
    return this;
  }
}

```

```java
public class FluentBingTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void searchImageInBing_when_FluentPageObjectPatternUsed() {
    var bingMainPage = new BingMainPage();
    bingMainPage
      .navigate()
      .search("Automate The Planet")
      .clickImages()
      .clickImagesFilter()
      .setSize(Size.LARGE)
      .setColor(Color.COLOR_ONLY)
      .setType(Type.CLIPART)
      .setPeople(People.ALL)
      .setDate(Date.PAST_YEAR)
      .setLicense(License.ALL);
  }
}

```
