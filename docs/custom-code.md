---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

```java
@Test
public void swipeTest() {
  driver.startActivity(new Activity("com.example.android.apis", ".graphics.FingerPaint"));
  TouchAction touchAction = new TouchAction(driver);
  AndroidElement element = driver.findElementById("android:id/content");
  Point point = element.getLocation();
  Dimension size = element.getSize();
  touchAction.press(PointOption.point(point.getX() + 5, point.getY() + 5))
    .waitAction(WaitOptions.waitOptions(Duration.ofMillis(200)))
    .moveTo(PointOption.point(point.getX() + size.getWidth() - 5, point.getY() + size.getHeight() - 5))
    .release()
    .perform();
}
```

## Most Complete WinAppDriver Java Cheat Sheet

```java
// Maven: io.appium.java_client
var desiredCapabilities = new DesiredCapabilities();
desiredCapabilities.setCapability("app", "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App"); // for Universal Windows Platform apps
desiredCapabilities.setCapability("app", "C:WindowsSystem32otepad.exe"); // for classic Windows apps
desiredCapabilities.setCapability("deviceName", "WindowsPC");
driver = new WindowsDriver<WindowsElement>(new URL("http://127.0.0.1:4723"), desiredCapabilities);
driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
```

```java
driver.findElementById("42.333896.3.1");
driver.findElementByAccessibilityId("AppNameTitle");
driver.findElementByClassName("TextBlock");
driver.findElementByAccessibilityId("Views");
driver.findElementByName("Calculator");
driver.findElementByTagName("Text");
// Find multiple elements
driver.findElementsByClassName("TextBlock");
// Search for an element inside another element
driver.findElementByName("System")
.findElementByName("Minimize");
```

```java
// Simple actions
element.click();
element.sendKeys("textToType");
element.clear();
// Chained actions
Actions actions = new Actions(_driver);
actions.moveToElement(element);
actions.moveByOffset(x, y);
actions.click();
actions.clickAndHold();
actions.release();
actions.contextClick();
actions.doubleClick();
actions.dragAndDrop(sourceElement, targetElement);
actions.dragAndDropBy(sourceElement, x, y);
actions.keyDown(Keys.SHIFT);
actions.keyUp(Keys.SHIFT);
actions.sendKeys("textToType");
actions.build().perform();
```

```java
// Making a touch stroke
PointerInput device = new PointerInput(PointerInput.Kind.PEN, "pen");
Sequence sequence = new Sequence(device, 0);
sequence.addAction(device.createPointerMove(Duration.ZERO, PointerInput.Origin.fromElement(element), 0, 0));
sequence.addAction(device.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
sequence.addAction(device.createPointerMove(Duration.ZERO, PointerInput.Origin.fromElement(element), 10, 10));
sequence.addAction(device.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
var actions = new ArrayList<Sequence>();
actions.add(sequence);
driver.perform(actions);
// Perform multitouch
PointerInput touch1 = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence touch1Sequence = new Sequence(touch1, 0);
touch1Sequence.addAction(touch1.createPointerMove(Duration.ZERO, PointerInput.Origin.fromElement(element), 50, -50));
touch1Sequence.addAction(touch1.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
touch1Sequence.addAction(touch1.createPointerMove(Duration.ofSeconds(1), PointerInput.Origin.fromElement(element), 80, -80));
touch1Sequence.addAction(touch1.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
PointerInput touch2 = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence touch2Sequence = new Sequence(touch2, 0);
touch2Sequence.addAction(touch2.createPointerMove(Duration.ZERO, PointerInput.Origin.fromElement(element), -50, 50));
touch2Sequence.addAction(touch2.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
touch2Sequence.addAction(touch2.createPointerMove(Duration.ofSeconds(1), PointerInput.Origin.fromElement(element), -80, 80));
touch2Sequence.addAction(touch2.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
var actions = new ArrayList<Sequence>();
actions.add(touch1Sequence);
actions.add(touch2Sequence);
driver.perform(actions);
```

## Document Exploratory Testing Using Mind Maps

```bash
1. *NEW* /LIVE/ “Browser: Login with Gmail Chrome” (23-Sep-2013 09:44:20)

newUser@gmail.com

Client id = 123

https://mail.google.com/mail/u/0/#inbox

Login page displayed => OK

Previous account name displayed => OK

Login => OK

Logout Button available => OK

</OK>
```

## THC-Hydra- Online Password Cracking By Examples

```bash
hydra  -l admin28 -x3:5:1 -o found.txt testasp.vulnweb.com http-post-form “/Login.asp?RetURL=%2FDefault%2Easp%3F:tfUName=^USER^&tfUPass=^PASS^:S=logout admin28”
```

```bash
hydra  -l admin29 -P pass.txt -o found.txt testasp.vulnweb.com http-post-form “/Login.asp?RetURL=%2FDefault%2Easp%3F:tfUName=^USER^&tfUPass=^PASS^:S=logout admin29”
```

## Be Better QA- Start Creating Test Logs

```bash
---------------------------------------------------------------------------------------------------------------------

20-Sep-2013 09:17:48

---------------------------------------------------------------------------------------------------------------------

1. *NEW* /LIVE/ "Browser: Login with Gmail Chrome" (23-Sep-2013 09:44:20)

newUser@gmail.com

Client id = 123

https://mail.google.com/mail/u/0/#inbox

Login page displayed => OK

Previous account name displayed => OK

Login => OK

Logout Button available => OK

</OK>

---------------------------------------------------------------------------------------------------------------------

2. *45623 * /TEST/ "Browser: Login with Gmail Firefox" (23-Sep-2013 09:50:20)

secondUser@gmail.com

Client id = 222

https://mail.google.com/mail/u/0/#inbox

Login page displayed => OK

Previous account name displayed => OK

Login => OK

Logout Button available => FAIL

</FAIL>

---------------------------------------------------------------------------------------------------------------------

3. *RETEST* /STAGING/ "Browser: Login with Gmail IE 10" (23-Sep-2013 09:55:20)

thirdUser@gmail.com

Client id = 111

https://mail.google.com/mail/u/0/#inbox

Login page displayed => OK

Previous account name displayed => OK

Login => OK

Logout Button available => OK

</OK>

```

## UI Performance Analysis via Selenium WebDriver

```java

```

```java

```

```java

```

```java

```

```java

```

## Design Grid Control Automated Tests with Java Part 3

```java
private void initializeInvoicesForPaging() {
  var totalOrders = 11;
  if (!StringUtils.isEmpty(uniqueShippingName)) {
    uniqueShippingName = UUID.randomUUID().toString();
  }
  testPagingItems = new LinkedList < Order > ();
  for (var i = 0; i < totalOrders; i++) {
    var newOrder = createNewItemInDb(uniqueShippingName);
    testPagingItems.add(newOrder);
  }
}
```

```java
private void navigateToGridInitialPage(int initialPageNumber) throws Exception {
  driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/filter-row");
  var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
  kendoGrid.filter(ShipNameColumnName, FilterOperator.EQUAL_TO, uniqueShippingName);
  kendoGrid.changePageSize(1);
  waitForGridToLoad(1, kendoGrid);
  kendoGrid.navigateToPage(initialPageNumber);
  waitForPageToLoad(initialPageNumber, kendoGrid);
  assertPagerInfoLabel(initialPageNumber, initialPageNumber, testPagingItems.stream().count());
}
```

```java
@Test
public void navigateToFirstPage_GoToFirstPageButton() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(11);
  var targetPage = 1;
  var goToFirstPageButton = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[1]"));
  goToFirstPageButton.click();
  waitForPageToLoad(targetPage, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(testPagingItems.get(targetPage - 1).getOrderId(), results.stream().findFirst().get().getOrderId());
  assertPagerInfoLabel(targetPage, targetPage, testPagingItems.stream().count());
}
```

````java
@Test
public void goToFirstPageButtonDisabled_WhenFirstPageIsLoaded() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 1;
  var goToFirstPageButton = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[1]"));
  goToFirstPageButton.click();
  waitForPageToLoad(targetPage, kendoGrid);
  Assert.assertFalse(goToFirstPageButton.isEnabled());
}
```java
@Test
public void navigateToLastPage_GoToLastPageButton() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 11;
  var goToLastPage = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[4]/span"));
  goToLastPage.click();
  waitForPageToLoad(targetPage, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(testPagingItems.stream().skip(testPagingItems.stream().count() - 1)
    .findFirst().get().getOrderId(), results.stream().findFirst().get().getOrderId());
  assertPagerInfoLabel(targetPage, targetPage, testPagingItems.stream().count());
}
```java
@Test
public void goToLastPageButtonDisabled_WhenLastPageIsLoaded() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 11;
  var goToLastPage = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[4]/span"));
  goToLastPage.click();
  waitForPageToLoad(targetPage, kendoGrid);
  Assert.assertFalse(goToLastPage.isEnabled());
}
````

````java
@Test
public void navigateToPageNine_GoToPreviousPageButton() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(11);
  var targetPage = 10;
  var goToPreviousPage = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[2]/span"));
  goToPreviousPage.click();
  waitForPageToLoad(targetPage, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(testPagingItems.get(targetPage - 1).getOrderId(), results.stream().findFirst().get().getOrderId());
  assertPagerInfoLabel(targetPage, targetPage, testPagingItems.stream().count());
}

```java
@Test
public void goToPreviousPageButtonDisabled_WhenFirstPageIsLoaded() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(11);
  var targetPage = 1;
  var goToFirstPageButton = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[1]"));
  goToFirstPageButton.click();
  waitForPageToLoad(targetPage, kendoGrid);
  var goToPreviousPage = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[2]/span"));
  Assert.assertFalse(goToPreviousPage.isEnabled());
}
````

```java
@Test
public void navigateToPageTwo_GoToNextPageButton() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 2;
  var goToNextPage = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[3]"));
  goToNextPage.click();
  waitForPageToLoad(targetPage, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(testPagingItems.get(targetPage - 1).getOrderId(), results.stream().findFirst().get().getOrderId());
  assertPagerInfoLabel(targetPage, targetPage, testPagingItems.stream().count());
}
```

```java
@Test
public void goToNextPageButtonDisabled_WhenLastPageIsLoaded() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 11;
  var goToLastPage = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[4]/span"));
  goToLastPage.click();
  waitForPageToLoad(targetPage, kendoGrid);
  var goToNextPage = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[3]"));
  Assert.assertFalse(goToNextPage.isEnabled());
}
```

````java
@Test
public void navigateToLastPage_MorePagesNextButton() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 11;
  var nextMorePages = driver.findElement(By.xpath("//*[@id='grid']/div[3]/ul/li[12]/a"));
  nextMorePages.click();
  waitForPageToLoad(targetPage, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(testPagingItems.get(targetPage - 1).getOrderId(), results.stream().findFirst().get().getOrderId());
  assertPagerInfoLabel(targetPage, targetPage, testPagingItems.stream().count());
}
```java
@Test
public void nextMorePageButtonDisabled_WhenLastPageIsLoaded() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 11;
  var goToLastPage = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[4]/span"));
  goToLastPage.click();
  waitForPageToLoad(targetPage, kendoGrid);
  var previousMorePages = driver.findElement(By.xpath("//*[@id='grid']/div[3]/ul/li[2]/a"));
  Assert.assertFalse(previousMorePages.isEnabled());
}
````

```java
@Test
public void navigateToPageOne_MorePagesPreviousButton() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 1;
  var previousMorePages = driver.findElement(By.xpath("//*[@id='grid']/div[3]/ul/li[2]/a"));
  previousMorePages.click();
  waitForPageToLoad(targetPage, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(testPagingItems.get(targetPage - 1).getOrderId(), results.stream().findFirst().get().getOrderId());
  assertPagerInfoLabel(targetPage, targetPage, testPagingItems.stream().count());
}
```

```java
@Test
public void previousMorePagesButtonDisabled_WhenFirstPageIsLoaded() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(11);
  var targetPage = 1;
  var goToFirstPageButton = driver.findElement(By.xpath("//*[@id='grid']/div[3]/a[1]"));
  goToFirstPageButton.click();
  waitForPageToLoad(targetPage, kendoGrid);
  var previousMorePages = driver.findElement(By.xpath("//*[@id='grid']/div[3]/ul/li[2]/a"));
  Assert.assertFalse(previousMorePages.isDisplayed());
}
```

```java
@Test
public void navigateToPageTwo_SecondPageButton() throws Exception {
  initializeInvoicesForPaging();
  navigateToGridInitialPage(1);
  var targetPage = 2;
  var pageOnSecondPositionButton = driver.findElement(By.xpath("//*[@id='grid']/div[3]/ul/li[3]/a"));
  pageOnSecondPositionButton.click();
  waitForPageToLoad(targetPage, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(testPagingItems.get(targetPage - 1).getOrderId(), results.stream().findFirst().get().getOrderId());
  assertPagerInfoLabel(targetPage, targetPage, testPagingItems.stream().count());
}
```

## Design Grid Control Automated Tests with Java Part 2

```java
private double getUniqueNumberValue() {
  var currentTime = LocalDateTime.now();
  var result = currentTime.getYear() +
    currentTime.getMonthValue() +
    currentTime.getHour() +
    currentTime.getMinute() +
    currentTime.getSecond() +
    currentTime.getNano();
  return result;
}
```

```java

@Test
public void freightEqualToFilter() throws Exception {
  driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/filter-row");
  var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
  var newItem = createNewItemInDb();
  newItem.setFreight(getUniqueNumberValue());
  updateItemInDb(newItem);
  kendoGrid.filter(FreightColumnName, FilterOperator.EQUAL_TO, Double.toString(newItem.getFreight()));
  waitForGridToLoadAtLeast(1, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertTrue(results.stream().count() == 1);
  Assert.assertEquals(Double.toString(newItem.getFreight()), results.get(0).getFreight());
}
```

```java

@Test
public void freightNotEqualToFilter() throws Exception {
  driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/filter-row");
  var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
  var newItem = createNewItemInDb();
  newItem.setFreight(getUniqueNumberValue());
  updateItemInDb(newItem);
  // After we apply the orderId filter, only 1 item is displayed in the grid.
  // When we apply the NotEqualTo filter this item will disappear.
  kendoGrid.filter(
    new GridFilter(FreightColumnName, FilterOperator.NOT_EQUAL_TO, Double.toString(newItem.getFreight())),
    new GridFilter(OrderIdColumnName, FilterOperator.EQUAL_TO, newItem.getOrderId().toString()));
  waitForGridToLoad(0, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertTrue(results.stream().count() == 0);
}
```

```java
@Test
public void freightGreaterThanOrEqualToFilter() throws Exception {
  driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/filter-row");
  var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
  var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getFreight)).collect(Collectors.toList());
  var biggestFreight = allItems.stream().skip(allItems.stream().count() - 1).findFirst().get().getFreight();
  var newItem = createNewItemInDb();
  newItem.setFreight(BigDecimal.valueOf(biggestFreight + getUniqueNumberValue()).setScale(3, RoundingMode.HALF_UP).doubleValue());
  updateItemInDb(newItem);
  var secondNewItem = createNewItemInDb(newItem.getShipName());
  secondNewItem.setFreight(BigDecimal.valueOf(newItem.getFreight() + 1).setScale(3, RoundingMode.HALF_UP).doubleValue());
  updateItemInDb(secondNewItem);
  kendoGrid.filter(FreightColumnName, FilterOperator.GREATER_THAN_OR_EQUAL_TO, Double.toString(newItem.getFreight()));
  waitForGridToLoadAtLeast(2, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertTrue(results.stream().count() == 2);
  // We assume that there isn't default sorting for this column so we cannot expect that the order will be the same every time.
  Assert.assertEquals(results.stream().filter(x -> x.getFreight() == secondNewItem.getFreight()).count(), 1);
  Assert.assertEquals(results.stream().filter(x -> x.getFreight() == newItem.getFreight()).count(), 1);
}
```

```java
@Test
public void freightGreaterThanFilter() throws Exception {
  driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/filter-row");
  var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
  var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getFreight)).collect(Collectors.toList());
  var biggestFreight = allItems.stream().skip(allItems.stream().count() - 1).findFirst().get().getFreight();
  var newItem = createNewItemInDb();
  newItem.setFreight(BigDecimal.valueOf(biggestFreight + getUniqueNumberValue()).setScale(3, RoundingMode.HALF_UP).doubleValue());
  updateItemInDb(newItem);
  var secondNewItem = createNewItemInDb(newItem.getShipName());
  secondNewItem.setFreight(BigDecimal.valueOf(newItem.getFreight() + 1).setScale(3, RoundingMode.HALF_UP).doubleValue());
  updateItemInDb(secondNewItem);
  kendoGrid.filter(FreightColumnName, FilterOperator.GREATER_THAN, Double.toString(newItem.getFreight()));
  waitForGridToLoadAtLeast(1, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertTrue(results.stream().count() == 1);
  // We assume that there isn't default sorting for this column so we cannot expect that the order will be the same every time.
  Assert.assertEquals(results.stream().filter(x -> x.getFreight() == secondNewItem.getFreight()).count(), 1);
}
```

```java
@Test
public void freightLessThanOrEqualToFilter() throws Exception {
  driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/filter-row");
  var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
  var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getFreight)).collect(Collectors.toList());
  var smallestFreight = allItems.stream().findFirst().get().getFreight();
  var newItem = createNewItemInDb();
  newItem.setFreight(BigDecimal.valueOf(smallestFreight - getUniqueNumberValue()).setScale(3, RoundingMode.HALF_UP).doubleValue());
  updateItemInDb(newItem);
  var secondNewItem = createNewItemInDb(newItem.getShipName());
  secondNewItem.setFreight(BigDecimal.valueOf(newItem.getFreight() - 0.01).setScale(3, RoundingMode.HALF_UP).doubleValue());
  updateItemInDb(secondNewItem);
  kendoGrid.filter(FreightColumnName, FilterOperator.LESS_THAN_OR_EQUAL_TO, Double.toString(newItem.getFreight()));
  waitForGridToLoadAtLeast(2, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertTrue(results.stream().count() == 2);
  // We assume that there isn't default sorting for this column so we cannot expect that the order will be the same every time.
  Assert.assertEquals(results.stream().filter(x -> x.getFreight() == secondNewItem.getFreight()).count(), 1);
  Assert.assertEquals(results.stream().filter(x -> x.getFreight() == newItem.getFreight()).count(), 1);
}
```

```java

@Test
public void freightLessThanFilter() throws Exception {
  driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/filter-row");
  var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
  var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getFreight)).collect(Collectors.toList());
  var smallestFreight = allItems.stream().findFirst().get().getFreight();
  var newItem = createNewItemInDb();
  newItem.setFreight(BigDecimal.valueOf(smallestFreight - getUniqueNumberValue()).setScale(3, RoundingMode.HALF_UP).doubleValue());
  updateItemInDb(newItem);
  var secondNewItem = createNewItemInDb(newItem.getShipName());
  secondNewItem.setFreight(BigDecimal.valueOf(newItem.getFreight() - 0.01).setScale(3, RoundingMode.HALF_UP).doubleValue());
  updateItemInDb(secondNewItem);
  kendoGrid.filter(FreightColumnName, FilterOperator.LESS_THAN, Double.toString(newItem.getFreight()));
  waitForGridToLoadAtLeast(1, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertTrue(results.stream().count() == 1);
  // We assume that there isn't default sorting for this column so we cannot expect that the order will be the same every time.
  Assert.assertEquals(results.stream().filter(x -> x.getFreight() == secondNewItem.getFreight()).count(), 1);
}
```

```java
@Test
public void freightClearFilter() throws Exception {
driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/filter-row");
var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getFreight)).collect(Collectors.toList());
var biggestFreight = allItems.stream().skip(allItems.stream().count() - 1).findFirst().get().getFreight();
var newItem = createNewItemInDb();
newItem.setFreight(biggestFreight + getUniqueNumberValue());
updateItemInDb(newItem);
var secondNewItem = createNewItemInDb(newItem.getShipName());
secondNewItem.setFreight(newItem.getFreight() + 1);
updateItemInDb(secondNewItem);
kendoGrid.filter(FreightColumnName, FilterOperator.EQUAL_TO, Double.toString(newItem.getFreight()));
waitForGridToLoad(1, kendoGrid);
kendoGrid.removeFilters();
waitForGridToLoadAtLeast(2, kendoGrid);
}
```

```java
@Test
public void orderDateEqualToFilter() throws Exception {
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getOrderId)).collect(Collectors.toList());
var lastOrderDate = allItems.stream().skip(allItems.stream().count() - 1).findFirst().get().getOrderDate();
var newItem = createNewItemInDb();
newItem.setOrderDate(lastOrderDate.plusDays(1));
updateItemInDb(newItem);
kendoGrid.filter(OrderDateColumnName, FilterOperator.EQUAL_TO, newItem.getOrderDate().toString());
waitForGridToLoadAtLeast(1, kendoGrid);
List < Order > results = kendoGrid.getItems();
Assert.assertTrue(results.stream().count() == 1);
Assert.assertEquals(newItem.getOrderDate().toString(), results.get(0).getOrderDate());
}
```

```java
@Test
public void orderDateNotEqualToFilter() throws Exception {
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getOrderDate)).collect(Collectors.toList());
var lastOrderDate = allItems.stream().skip(allItems.stream().count() - 1).findFirst().get().getOrderDate();
var newItem = createNewItemInDb();
newItem.setOrderDate(lastOrderDate.plusDays(1));
updateItemInDb(newItem);
var secondNewItem = createNewItemInDb(newItem.getShipName());
secondNewItem.setOrderDate(lastOrderDate.plusDays(2));
updateItemInDb(secondNewItem);
// After we filter by the unique shipping name, two items will be displayed in the grid.
// After we apply the date after filter only the second item should be visible in the grid.
kendoGrid.filter(
new GridFilter(OrderDateColumnName, FilterOperator.NOT_EQUAL_TO, newItem.getOrderDate().toString()),
new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName()));
waitForGridToLoadAtLeast(1, kendoGrid);
List < Order > results = kendoGrid.getItems();
Assert.assertTrue(results.stream().count() == 1);
Assert.assertEquals(secondNewItem.toString(), results.get(0).getOrderDate());
}

```

```java
@Test
public void orderDateAfterFilter() throws Exception {
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getOrderDate)).collect(Collectors.toList());
var lastOrderDate = allItems.stream().skip(allItems.stream().count() - 1).findFirst().get().getOrderDate();
var newItem = createNewItemInDb();
newItem.setOrderDate(lastOrderDate.plusDays(1));
updateItemInDb(newItem);
var secondNewItem = createNewItemInDb(newItem.getShipName());
secondNewItem.setOrderDate(lastOrderDate.plusDays(2));
updateItemInDb(secondNewItem);
// After we filter by the unique shipping name, two items will be displayed in the grid.
// After we apply the date after filter only the second item should be visible in the grid.
kendoGrid.filter(
new GridFilter(OrderDateColumnName, FilterOperator.IS_AFTER, newItem.getOrderDate().toString()),
new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName()));
waitForGridToLoadAtLeast(1, kendoGrid);
List < Order > results = kendoGrid.getItems();
Assert.assertTrue(results.stream().count() == 1);
Assert.assertEquals(secondNewItem.toString(), results.get(0).getOrderDate());
}
```

```java
@Test
public void orderDateIsAfterOrEqualToFilter() throws Exception {
driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getOrderDate)).collect(Collectors.toList());
var lastOrderDate = allItems.stream().skip(allItems.stream().count() - 1).findFirst().get().getOrderDate();
var newItem = createNewItemInDb();
newItem.setOrderDate(lastOrderDate.plusDays(1));
updateItemInDb(newItem);
var secondNewItem = createNewItemInDb(newItem.getShipName());
secondNewItem.setOrderDate(lastOrderDate.plusDays(2));
updateItemInDb(secondNewItem);
// After we filter by the unique shipping name, two items will be displayed in the grid.
// After we apply the date after filter only the second item should be visible in the grid.
kendoGrid.filter(
new GridFilter(OrderDateColumnName, FilterOperator.IS_AFTER_OR_EQUAL_TO, newItem.getOrderDate().toString()),
new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName()));
waitForGridToLoadAtLeast(2, kendoGrid);
List < Order > results = kendoGrid.getItems();
Assert.assertTrue(results.stream().count() == 2);
Assert.assertEquals(secondNewItem.toString(), results.get(0).getOrderDate());
Assert.assertEquals(newItem.toString(), results.get(1).getOrderDate());
}
```

```java
@Test
public void orderDateBeforeFilter() throws Exception {
driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getOrderDate)).collect(Collectors.toList());
var lastOrderDate = allItems.stream().findFirst().get().getOrderDate();
var newItem = createNewItemInDb();
newItem.setOrderDate(lastOrderDate.plusDays(-1));
updateItemInDb(newItem);
var secondNewItem = createNewItemInDb(newItem.getShipName());
secondNewItem.setOrderDate(lastOrderDate.plusDays(-2));
updateItemInDb(secondNewItem);
// After we filter by the unique shipping name, two items will be displayed in the grid.
// After we apply the date after filter only the second item should be visible in the grid.
kendoGrid.filter(
new GridFilter(OrderDateColumnName, FilterOperator.IS_BEFORE, newItem.getOrderDate().toString()),
new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName()));
waitForGridToLoadAtLeast(1, kendoGrid);
List < Order > results = kendoGrid.getItems();
Assert.assertTrue(results.stream().count() == 1);
Assert.assertEquals(secondNewItem.toString(), results.get(0).getOrderDate());
}
```

```java
@Test
public void orderDateIsBeforeOrEqualToFilter() throws Exception {
driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getOrderDate)).collect(Collectors.toList());
var lastOrderDate = allItems.stream().findFirst().get().getOrderDate();
var newItem = createNewItemInDb();
newItem.setOrderDate(lastOrderDate.plusDays(-1));
updateItemInDb(newItem);
var secondNewItem = createNewItemInDb(newItem.getShipName());
secondNewItem.setOrderDate(lastOrderDate.plusDays(-2));
updateItemInDb(secondNewItem);
kendoGrid.filter(
new GridFilter(OrderDateColumnName, FilterOperator.IS_BEFORE_OR_EQUAL_TO, newItem.getOrderDate().toString()),
new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName()));
waitForGridToLoadAtLeast(2, kendoGrid);
List < Order > results = kendoGrid.getItems();
Assert.assertTrue(results.stream().count() == 2);
Assert.assertEquals(secondNewItem.toString(), results.get(0).getOrderDate());
Assert.assertEquals(newItem.toString(), results.get(1).getOrderDate());
}

```

```java
@Test
public void orderDateClearFilter() throws Exception {
driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
var newItem = createNewItemInDb();
kendoGrid.filter(OrderDateColumnName, FilterOperator.IS_AFTER, LocalDateTime.MAX.toString());
waitForGridToLoad(0, kendoGrid);
kendoGrid.removeFilters();
waitForGridToLoadAtLeast(1, kendoGrid);
}
```

```java
@Test
public void orderDateSortAsc() throws Exception {
driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getOrderDate)).collect(Collectors.toList());
var lastOrderDate = allItems.stream().findFirst().get().getOrderDate();
var newItem = createNewItemInDb();
newItem.setOrderDate(lastOrderDate.plusDays(-1));
updateItemInDb(newItem);
var secondNewItem = createNewItemInDb(newItem.getShipName());
secondNewItem.setOrderDate(lastOrderDate.plusDays(-2));
updateItemInDb(secondNewItem);
kendoGrid.filter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName());
waitForGridToLoadAtLeast(2, kendoGrid);
kendoGrid.sort(OrderDateColumnName, SortType.ASC);
Thread.sleep(1000);
List < Order > results = kendoGrid.getItems();
Assert.assertTrue(results.stream().count() == 2);
Assert.assertEquals(secondNewItem.toString(), results.get(0).getOrderDate());
Assert.assertEquals(newItem.toString(), results.get(1).getOrderDate());
}
```

```java
@Test
public void orderDateSortDesc() throws Exception {
driver.navigate().to("http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
var kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
var allItems = getAllItemsFromDb().stream().sorted(Comparator.comparing(Order::getOrderDate)).collect(Collectors.toList());
var lastOrderDate = allItems.stream().findFirst().get().getOrderDate();
var newItem = createNewItemInDb();
newItem.setOrderDate(lastOrderDate.plusDays(-1));
updateItemInDb(newItem);
var secondNewItem = createNewItemInDb(newItem.getShipName());
secondNewItem.setOrderDate(lastOrderDate.plusDays(-2));
updateItemInDb(secondNewItem);
kendoGrid.filter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName());
waitForGridToLoadAtLeast(2, kendoGrid);
kendoGrid.sort(OrderDateColumnName, SortType.DESC);
Thread.sleep(1000);
List < Order > results = kendoGrid.getItems();
Assert.assertTrue(results.stream().count() == 2);
Assert.assertEquals(newItem.toString(), results.get(0).getOrderDate());
Assert.assertEquals(secondNewItem.toString(), results.get(1).getOrderDate());
}
```

## Design Grid Control Automated Tests with Java Part 1

```java
private void waitForGridToLoad(int expectedCount, KendoGrid grid) {
  wait.until(x -> {
    List < GridItem > items = grid.getItems();
    return expectedCount == items.stream().count();
  });
}
private void waitForGridToLoadAtLeast(int expectedCount, KendoGrid grid) {
  wait.until(x -> {
    List < GridItem > items = grid.getItems();
    return items.stream().count() >= expectedCount;
  });
}
```

```java
@Test
public void orderIdEqualToFilter() throws Exception {
  var newItem = CreateNewItemInDb();
  kendoGrid.filter(OrderIdColumnName, FilterOperator.EQUAL_TO, newItem.getOrderId());
  waitForGridToLoad(1, kendoGrid);
  List < GridItem > items = kendoGrid.getItems();
  Assert.assertEquals(items.stream().count(), 1);
}
```

```java
@Test
public void orderIdNotEqualToFilter() throws Exception {
  // Create new item with unique ship name;
  var newItem = CreateNewItemInDb();
  // Create second new item with the same unique shipping name
  var secondNewItem = CreateNewItemInDb(newItem.getShipName());
  // Filter by the larger orderId but also by the second unique column in this case shipping name
  kendoGrid.filter(
    new GridFilter(OrderIdColumnName, FilterOperator.NOT_EQUAL_TO, secondNewItem.getOrderId()),
    new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, secondNewItem.getShipName()));
  waitForGridToLoadAtLeast(1, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(results.stream().filter(x -> x.getShipName() == newItem.getShipName()).findFirst().get().getOrderId(), newItem.getOrderId());
  Assert.assertTrue(results.stream().count() == 1);
}
```

```java
@Test
public void orderIdGreaterThanOrEqualToFilter() throws Exception {
  // Create new item with unique ship name;
  var newItem = CreateNewItemInDb();
  // Create second new item with the same unique shipping name
  var secondNewItem = CreateNewItemInDb(newItem.getShipName());
  // When we filter by the second unique column ShippingName, only one item will be displayed.
  // Once we apply the second not equal to filter the grid should be empty.
  kendoGrid.filter(
    new GridFilter(OrderIdColumnName, FilterOperator.GREATER_THAN_OR_EQUAL_TO, newItem.getOrderId()),
    new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName()));
  waitForGridToLoadAtLeast(2, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(results.stream().filter(
    x -> x.getShipName() == secondNewItem.getShipName()).findFirst().get().getOrderId(), secondNewItem.getOrderId());
  Assert.assertEquals(results.stream().filter(
    x -> x.getShipName() == newItem.getShipName()).findFirst().get().getOrderId(), newItem.getOrderId());
  Assert.assertTrue(results.stream().count() == 2);
}
```

```java
@Test
public void orderIdGreaterThanFilter() throws Exception {
  // Create new item with unique ship name;
  var newItem = CreateNewItemInDb();
  // Create second new item with the same unique shipping name
  var secondNewItem = CreateNewItemInDb(newItem.getShipName());
  // Filter by the smaller orderId but also by the second unique column in this case shipping name
  kendoGrid.filter(
    new GridFilter(OrderIdColumnName, FilterOperator.GREATER_THAN, newItem.getOrderId()),
    new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName()));
  waitForGridToLoadAtLeast(1, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(results.stream().filter(
    x -> x.getShipName() == secondNewItem.getShipName()).findFirst().get().getOrderId(), secondNewItem.getOrderId());
  Assert.assertTrue(results.stream().count() == 1);
}
```

```java
@Test
public void orderIdLessThanOrEqualToFilter() throws Exception {
  // Create new item with unique ship name;
  var newItem = CreateNewItemInDb();
  // Create second new item with the same unique shipping name
  var secondNewItem = CreateNewItemInDb(newItem.getShipName());
  // Filter by the larger orderId but also by the second unique column in this case shipping name
  kendoGrid.filter(
    new GridFilter(OrderIdColumnName, FilterOperator.LESS_THAN_OR_EQUAL_TO, secondNewItem.getOrderId()),
    new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, newItem.getShipName()));
  waitForGridToLoadAtLeast(2, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(results.stream().filter(
    x -> x.getShipName() == newItem.getShipName()).findFirst().get().getOrderId(), newItem.getOrderId());
  Assert.assertEquals(results.stream().filter(
      x -> x.getShipName() == secondNewItem.getShipName()).skip(results.stream().count() - 1)
    .findFirst().get().getOrderId(), secondNewItem.getOrderId());
  Assert.assertTrue(results.stream().count() == 2);
}
```

```java
@Test
public void orderIdLessThanFilter() throws Exception {
  // Create new item with unique ship name;
  var newItem = CreateNewItemInDb();
  // Create second new item with the same unique shipping name
  var secondNewItem = CreateNewItemInDb(newItem.getShipName());
  // Filter by the larger orderId but also by the second unique column in this case shipping name
  kendoGrid.filter(
    new GridFilter(OrderIdColumnName, FilterOperator.LESS_THAN, secondNewItem.getOrderId()),
    new GridFilter(ShipNameColumnName, FilterOperator.EQUAL_TO, secondNewItem.getShipName()));
  waitForGridToLoadAtLeast(1, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertEquals(results.stream().filter(
    x -> x.getShipName() == newItem.getShipName()).findFirst().get().getOrderId(), newItem.getOrderId());
  Assert.assertTrue(results.stream().count() == 1);
}
```

```java
@Test
public void orderIdClearFilter() throws Exception {
  // Create new item with unique ship name;
  var newItem = CreateNewItemInDb();
  // Make sure that we have at least 2 items if the grid is empty. The tests are designed to run against empty DB.
  var secondNewItem = CreateNewItemInDb(newItem.getShipName());
  kendoGrid.filter(OrderIdColumnName, FilterOperator.EQUAL_TO, newItem.getOrderId());
  waitForGridToLoad(1, kendoGrid);
  kendoGrid.removeFilters();
  waitForGridToLoadAtLeast(1, kendoGrid);
  List < Order > results = kendoGrid.getItems();
  Assert.assertTrue(results.stream().count() > 1);
}
```

```java
@Test
public void shipNameEqualToFilter() throws Exception {
  var newItem = createNewItemInDb();
  kendoGrid.filter(GridColumns.SHIP_NAME, FilterOperator.EQUAL_TO, newItem.getShipName());
  waitForGridToLoad(1, kendoGrid);
  List < GridItem > items = kendoGrid.getItems();
  Assert.assertEquals(items.stream().count(), 1);
}
```

```java
@Test
public void shipNameNotEqualToFilter() throws Exception {
  // Apply combined filter. First filter by ID and than by ship name (not equal filter).
  // After the first filter there is only one element when we apply the second we expect 0 elements.
  var newItem = createNewItemInDb();
  kendoGrid.filter(
    new GridFilter(GridColumns.SHIP_NAME, FilterOperator.NOT_EQUAL_TO, newItem.getShipName()),
    new GridFilter(GridColumns.ORDER_ID, FilterOperator.EQUAL_TO, newItem.getOrderId().toString()));
  waitForGridToLoad(0, kendoGrid);
  List < GridItem > items = kendoGrid.getItems();
  Assert.assertEquals(items.stream().count(), 0);
}
```

```java
@Test
public void shipNameContainsFilter() throws Exception {
  var shipName = UUID.randomUUID().toString();
  // Remove first and last letter
  shipName = removeLastChar(removeFirstChar(shipName));
  var newItem = createNewItemInDb(shipName);
  kendoGrid.filter(GridColumns.SHIP_NAME, FilterOperator.CONTAINS, newItem.getShipName());
  waitForGridToLoad(1, kendoGrid);
  List < GridItem > items = kendoGrid.getItems();
  Assert.assertEquals(items.stream().count(), 1);
}
```

```java
@Test
public void shipNameNotContainsFilter() throws Exception {
  // Remove first and last letter
  var shipName = UUID.randomUUID().toString();
  shipName = removeLastChar(removeFirstChar(shipName));
  var newItem = createNewItemInDb(shipName);
  // Apply combined filter. First filter by ID and than by ship name (not equal filter).
  // After the first filter there is only one element when we apply the second we expect 0 elements.
  kendoGrid.filter(
    new GridFilter(GridColumns.SHIP_NAME, FilterOperator.NOT_CONTAINS, newItem.getShipName()),
    new GridFilter(GridColumns.ORDER_ID, FilterOperator.EQUAL_TO, newItem.getOrderId().toString()));
  waitForGridToLoad(0, kendoGrid);
  List < GridItem > items = kendoGrid.getItems();
  Assert.assertEquals(items.stream().count(), 0);
}
```

```java
@Test
public void shipNameStartsWithFilter() throws Exception {
  // Remove last letter
  var shipName = UUID.randomUUID().toString();
  shipName = removeFirstChar(shipName);
  var newItem = createNewItemInDb(shipName);
  kendoGrid.filter(GridColumns.SHIP_NAME, FilterOperator.STARTS_WITH, newItem.getShipName());
  waitForGridToLoad(1, kendoGrid);
  List < GridItem > items = kendoGrid.getItems();
  Assert.assertEquals(items.stream().count(), 1);
}
```

```java
@Test
public void shipNameEndsWithFilter() throws Exception {
  // Remove first letter
  var shipName = UUID.randomUUID().toString();
  shipName = removeFirstChar(shipName);
  var newItem = createNewItemInDb(shipName);
  kendoGrid.filter(GridColumns.SHIP_NAME, FilterOperator.ENDS_WITH, newItem.getShipName());
  waitForGridToLoad(1, kendoGrid);
  List < GridItem > items = kendoGrid.getItems();
  Assert.assertEquals(items.stream().count(), 1);
}
```

```java
@Test
public void shipNameClearFilter() throws Exception {
  createNewItemInDb();
  // Filter by GUID and we know we wait the grid to be empty
  kendoGrid.filter(GridColumns.SHIP_NAME, FilterOperator.STARTS_WITH, UUID.randomUUID().toString());
  waitForGridToLoad(0, kendoGrid);
  // Remove all filters and we expect that the grid will contain at least 1 item.
  kendoGrid.removeFilters();
  waitForGridToLoadAtLeast(1, kendoGrid);
}
```

## Automate Telerik Kendo Grid with WebDriver with Java and JavaScript

```java
public class KendoGrid {
  private final String _gridId;
  private final JavascriptExecutor driver;
  private final WebDriverWait _wait;
  public KendoGrid(WebDriver driver, WebElement gridDiv) {
    _gridId = gridDiv.getAttribute("id");
    this.driver = (JavascriptExecutor) driver;
    _wait = new WebDriverWait(driver, 30);
  }
  public void navigateToPage(int pageNumber) {
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "grid.dataSource.page(" + pageNumber + ");";
    driver.executeScript(jsToBeExecuted);
  }
  private String getGridReference() {
    var initializeKendoGrid = String.format("var grid = $('#%s').data('kendoGrid');", _gridId);
    return initializeKendoGrid;
  }
}
```

```java
var grid = $("#grid").data("kendoGrid");
```

```java
grid.dataSource.page("5");
```

```java
public void sort(String columnName, SortType sortType) {
  var jsToBeExecuted = getGridReference();
  jsToBeExecuted = jsToBeExecuted +
    "grid.dataSource.sort({field: '" + columnName + "', dir: '" + sortType.toString().toLowerCase() + "'});";
  driver.executeScript(jsToBeExecuted);
  waitForAjax();
}
```

```java
public void changePageSize(int newSize) {
  var jsToBeExecuted = getGridReference();
  jsToBeExecuted = jsToBeExecuted + "grid.dataSource.pageSize(" + newSize + ");";
  driver.executeScript(jsToBeExecuted);
  waitForAjax();
}
```

```java
public <T>List<T> getItems() {
  waitForAjax();
  var jsToBeExecuted = getGridReference();
  jsToBeExecuted = jsToBeExecuted + "return JSON.stringify(grid.dataItems());";
  var jsResults = driver.executeScript(jsToBeExecuted);
  Gson gson = new Gson();
  List <T> items = gson.fromJson(jsResults.toString(), ArrayList.class);
  return items;
}
```

```java
public void filter(String columnName, FilterOperator filterOperator, String filterValue) throws Exception {
  filter(new GridFilter(columnName, filterOperator, filterValue));
}
public void filter(GridFilter...gridFilters) throws Exception {
  var jsToBeExecuted = getGridReference();
  var sb = new StringBuilder();
  sb.append(jsToBeExecuted);
  sb.append("grid.dataSource.filter({ logic: "
    and ", filters: [");
  for (var currentFilter: gridFilters) {
    var filterValueToBeApplied = String.format("" % s "", currentFilter.getFilterValue());
    try {
      LocalDateTime filterDateTime = LocalDateTime.parse(currentFilter.getFilterValue());
      filterValueToBeApplied = String.format("new Date(%s, %s, %s})", filterDateTime.getYear(), filterDateTime.getMonthValue() - 1, filterDateTime.getDayOfYear());
    } catch (DateTimeParseException ex) {
      // ignore
    }
    var kendoFilterOperator = convertFilterOperatorToKendoOperator(currentFilter.getFilterOperator());
    sb.append("{ field: "
      " + currentFilter.getColumnName() + "
      ", operator: "
      " + kendoFilterOperator + "
      ", value: " + filterValueToBeApplied + " },");
  }
  sb.append("] });");
  jsToBeExecuted = sb.toString().replace(",]", "]");
  driver.executeScript(jsToBeExecuted);
  waitForAjax();
}
private String convertFilterOperatorToKendoOperator(FilterOperator filterOperator) throws Exception {
  var kendoFilterOperator = "";
  switch (filterOperator) {
  case EQUAL_TO:
    kendoFilterOperator = "eq";
    break;
  case NOT_EQUAL_TO:
    kendoFilterOperator = "neq";
    break;
  case LESS_THAN:
    kendoFilterOperator = "lt";
    break;
  case LESS_THAN_OR_EQUAL_TO:
    kendoFilterOperator = "lte";
    break;
  case GREATER_THAN:
    kendoFilterOperator = "gt";
    break;
  case GREATER_THAN_OR_EQUAL_TO:
    kendoFilterOperator = "gte";
    break;
  case STARTS_WITH:
    kendoFilterOperator = "startswith";
    break;
  case ENDS_WITH:
    kendoFilterOperator = "endswith";
    break;
  case CONTAINS:
    kendoFilterOperator = "contains";
    break;
  case NOT_CONTAINS:
    kendoFilterOperator = "doesnotcontain";
    break;
  case IS_AFTER:
    kendoFilterOperator = "gt";
    break;
  case IS_AFTER_OR_EQUAL_TO:
    kendoFilterOperator = "gte";
    break;
  case IS_BEFORE:
    kendoFilterOperator = "lt";
    break;
  case IS_BEFORE_OR_EQUAL_TO:
    kendoFilterOperator = "lte";
    break;
  default:
    throw new Exception("The specified filter operator is not supported.");
  }
  return kendoFilterOperator;
}
```

```java
public enum FilterOperator {
  EQUAL_TO,
  NOT_EQUAL_TO,
  LESS_THAN,
  LESS_THAN_OR_EQUAL_TO,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  STARTS_WITH,
  ENDS_WITH,
  CONTAINS,
  NOT_CONTAINS,
  IS_AFTER,
  IS_AFTER_OR_EQUAL_TO,
  IS_BEFORE,
  IS_BEFORE_OR_EQUAL_TO
}
```

```java
public class KendoGrid {
  private final String _gridId;
  private final JavascriptExecutor driver;
  private final WebDriverWait _wait;
  public KendoGrid(WebDriver driver, WebElement gridDiv) {
    _gridId = gridDiv.getAttribute("id");
    this.driver = (JavascriptExecutor) driver;
    _wait = new WebDriverWait(driver, 30);
  }

  public void removeFilters() {
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "grid.dataSource.filter([]);";
    driver.executeScript(jsToBeExecuted);
    waitForAjax();
  }

  public int totalNumberRows() {
    waitForAjax();
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "grid.dataSource.total();";
    var jsResult = driver.executeScript(jsToBeExecuted);
    return Integer.parseInt(jsResult.toString());
  }
  public void reload() {
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "grid.dataSource.read();";
    driver.executeScript(jsToBeExecuted);
    waitForAjax();
  }
  public int getPageSize() {
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "return grid.dataSource.pageSize();";
    var currentResponse = driver.executeScript(jsToBeExecuted);
    var pageSize = Integer.parseInt(currentResponse.toString());
    return pageSize;
  }
  public void changePageSize(int newSize) {
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "grid.dataSource.pageSize(" + newSize + ");";
    driver.executeScript(jsToBeExecuted);
    waitForAjax();
  }
  public void navigateToPage(int pageNumber) {
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "grid.dataSource.page(" + pageNumber + ");";
    driver.executeScript(jsToBeExecuted);
  }
  public void sort(String columnName, SortType sortType) {
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "grid.dataSource.sort({field: '" + columnName + "', dir: '" + sortType.toString().toLowerCase() + "'});";
    driver.executeScript(jsToBeExecuted);
    waitForAjax();
  }
  public < T > List < T > getItems() {
    waitForAjax();
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "return JSON.stringify(grid.dataItems());";
    var jsResults = driver.executeScript(jsToBeExecuted);
    Gson gson = new Gson();
    List < T > items = gson.fromJson(jsResults.toString(), ArrayList.class);
    return items;
  }

  public void filter(String columnName, FilterOperator filterOperator, String filterValue) throws Exception {
    filter(new GridFilter(columnName, filterOperator, filterValue));
  }

  public void filter(GridFilter...gridFilters) throws Exception {
    var jsToBeExecuted = getGridReference();
    var sb = new StringBuilder();
    sb.append(jsToBeExecuted);
    sb.append("grid.dataSource.filter({ logic: "
      and ", filters: [");
    for (var currentFilter: gridFilters) {
      var filterValueToBeApplied = String.format("" % s "", currentFilter.getFilterValue());
      try {
        LocalDateTime filterDateTime = LocalDateTime.parse(currentFilter.getFilterValue());
        filterValueToBeApplied = String.format("new Date(%s, %s, %s})", filterDateTime.getYear(), filterDateTime.getMonthValue() - 1, filterDateTime.getDayOfYear());
      } catch (DateTimeParseException ex) {
        // ignore
      }
      var kendoFilterOperator = convertFilterOperatorToKendoOperator(currentFilter.getFilterOperator());
      sb.append("{ field: "
        " + currentFilter.getColumnName() + "
        ", operator: "
        " + kendoFilterOperator + "
        ", value: " + filterValueToBeApplied + " },");
    }
    sb.append("] });");
    jsToBeExecuted = sb.toString().replace(",]", "]");
    driver.executeScript(jsToBeExecuted);
    waitForAjax();
  }
  public int getCurrentPageNumber() {
    var jsToBeExecuted = getGridReference();
    jsToBeExecuted = jsToBeExecuted + "return grid.dataSource.page();";
    var result = driver.executeScript(jsToBeExecuted);
    var pageNumber = Integer.parseInt(result.toString());
    return pageNumber;
  }
  private String getGridReference() {
    var initializeKendoGrid = String.format("var grid = $('#%s').data('kendoGrid');", _gridId);
    return initializeKendoGrid;
  }
  private String convertFilterOperatorToKendoOperator(FilterOperator filterOperator) throws Exception {
    var kendoFilterOperator = "";
    switch (filterOperator) {
    case EQUAL_TO:
      kendoFilterOperator = "eq";
      break;
    case NOT_EQUAL_TO:
      kendoFilterOperator = "neq";
      break;
    case LESS_THAN:
      kendoFilterOperator = "lt";
      break;
    case LESS_THAN_OR_EQUAL_TO:
      kendoFilterOperator = "lte";
      break;
    case GREATER_THAN:
      kendoFilterOperator = "gt";
      break;
    case GREATER_THAN_OR_EQUAL_TO:
      kendoFilterOperator = "gte";
      break;
    case STARTS_WITH:
      kendoFilterOperator = "startswith";
      break;
    case ENDS_WITH:
      kendoFilterOperator = "endswith";
      break;
    case CONTAINS:
      kendoFilterOperator = "contains";
      break;
    case NOT_CONTAINS:
      kendoFilterOperator = "doesnotcontain";
      break;
    case IS_AFTER:
      kendoFilterOperator = "gt";
      break;
    case IS_AFTER_OR_EQUAL_TO:
      kendoFilterOperator = "gte";
      break;
    case IS_BEFORE:
      kendoFilterOperator = "lt";
      break;
    case IS_BEFORE_OR_EQUAL_TO:
      kendoFilterOperator = "lte";
      break;
    default:
      throw new Exception("The specified filter operator is not supported.");
    }
    return kendoFilterOperator;
  }
  private void waitForAjax() {
    _wait.until(d -> (Boolean)((JavascriptExecutor) d).executeScript("return jQuery.active == 0"));
  }
}
```

```java
public class KendoGridTests {
  private WebDriver driver;
  private WebDriverWait wait;
  private KendoGrid kendoGrid;
  private final String OrderIdColumnName = "OrderID";
  private final String ShipNameColumnName = "ShipName";
  @BeforeClass
  public void classInit() {
    WebDriverManager.chromedriver().setup();
  }
  @BeforeTest
  public void testSetup() {
    driver = new ChromeDriver();
    driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    driver.manage().window().maximize();
    wait = new WebDriverWait(driver, 30);
    driver.navigate().to("https://demos.telerik.com/kendo-ui/grid/basic-usage");
    var consentButton = driver.findElement(By.id("onetrust-accept-btn-handler"));
    consentButton.click();
    kendoGrid = new KendoGrid(driver, driver.findElement(By.id("grid")));
  }
  @AfterTest
  public void afterClass() {
    driver.quit();
  }
  @Test
  public void filterContactName() throws Exception {
    kendoGrid.filter("ContactName", FilterOperator.CONTAINS, "Thomas");
    List < GridItem > items = kendoGrid.getItems();
    Assert.assertEquals(items.stream().count(), 1);
  }
  @Test
  public void sortContactTitleDesc() {
    kendoGrid.sort("ContactTitle", SortType.DESC);
    List < GridItem > items = kendoGrid.getItems();
    Assert.assertEquals(items.get(0).getContactTitle(), "Sales Representative");
    Assert.assertEquals(items.get(1).getContactTitle(), "Sales Representative");
  }
  @Test
  public void testCurrentPage() {
    var pageNumber = kendoGrid.getCurrentPageNumber();
    Assert.assertEquals(pageNumber, 1);
  }
  @Test
  public void getPageSize() {
    var pageNumber = kendoGrid.getPageSize();
    Assert.assertEquals(pageNumber, 20);
  }
  @Test
  public void getAllItems() {
    List < GridItem > items = kendoGrid.getItems();
    Assert.assertEquals(items.stream().count(), 20);
  }
}
```

## Most Complete Selenium WebDriver Kotlin Cheat Sheet

```kotlin
// Maven: selenium-chrome-driver
import org.openqa.selenium.chrome.ChromeDriver
val driver: WebDriver = ChromeDriver()
// Maven: selenium-firefox-driver
import org.openqa.selenium.firefox.FirefoxDriver
val driver: WebDriver = FirefoxDriver()
// Maven: selenium-edge-driver
import org.openqa.selenium.firefox.EdgeDriver
val driver: WebDriver = EdgeDriver()
// Maven: selenium-ie-driver
import org.openqa.selenium.ie.InternetExplorerDriver
val driver: WebDriver = InternetExplorerDriver()
// Maven: selenium-safari-driver
import org.openqa.selenium.safari.SafariDriver
val driver: WebDriver = SafariDriver()
```

```kotlin
driver.findElement(By.className("className"))
driver.findElement(By.cssSelector("css"))
driver.findElement(By.id("id"))
driver.findElement(By.linkText("text"))
driver.findElement(By.name("name"))
driver.findElement(By.partialLinkText("pText"))
driver.findElement(By.tagName("input"))
driver.findElement(By.xpath("//\*[@id='editor']"))
// Find multiple elements
val anchors = driver.findElements(By.tagName("a"))
// Search for an element inside another
val div = driver.findElement(By.tagName("div")).findElement(By.tagName("a"))
```

```kotlin
val element = driver.findElement(By.id("id"))
element.click()
element.sendKeys("someText")
element.clear()
element.submit()
val innerText = element.text
val isEnabled = element.isEnabled
val isDisplayed = element.isDisplayed
val isSelected = element.isSelected
val element = driver.findElement(By.id("id"))
val select = Select(element)
select.selectByIndex(1)
select.selectByVisibleText("Ford")
select.selectByValue("ford")
select.deselectAll()
select.deselectByIndex(1)
select.deselectByVisibleText("Ford")
select.deselectByValue("ford")
val allSelected: List < WebElement > = select.getAllSelectedOptions()
val isMultipleSelect: Boolean = select.isMultiple()
```

```kotlin
// Drag and Drop
val element: WebElement = driver.findElement(By.xpath("//_[@id='project']/p[1]/div/div[2]"))
Actions(driver).dragAndDropBy(element, 30, 0).build().perform()
// Check if an element is visible
Assert.assertTrue(driver.findElement(By.xpath("//_[@id='tve_editor']/div")).isDisplayed)
// Upload a file
val element = driver.findElement(By.id("RadUpload1file0"))
val filePath = "D://WebDriver.Series.Tests//WebDriver.xml"
element.sendKeys(filePath)
// Scroll focus to control
val link = driver.findElement(By.partialLinkText("Previous post"))
(driver as JavascriptExecutor).executeScript("window.scroll(0, ${link.location.getY()});")
// Taking an element screenshot
val element = driver.findElement(By.xpath("//*[@id='tve_editor']/div"))
val screenshotFile = (driver as TakesScreenshot).getScreenshotAs(OutputType.FILE)
val fullImg = ImageIO.read(screenshotFile)
val point = element.location
val elementWidth = element.size.getWidth()
val elementHeight = element.size.getHeight()
val eleScreenshot = fullImg.getSubimage(point.getX(), point.getY(), elementWidth, elementHeight)
ImageIO.write(eleScreenshot, "png", screenshotFile)
val tempDir: String = getProperty("java.io.tmpdir")
val destFile = File(Paths.get(tempDir, "$fileName.png").toString())
FileUtils.getFileUtils().copyFile(screenshotFile, destFile)
// Focus on a control
val link = driver.findElement(By.partialLinkText("Previous post"))
Actions(driver).moveToElement(link).build().perform()
// Wait for visibility of an element
WebDriverWait(driver, 30).until(ExpectedConditions.visibilityOfAllElementsLocatedBy(
By.xpath("//\*[@id='tve_editor']/div[2]/div[2]/div/div")))
```

```kotilin
// Navigate to a page
driver.navigate().to("http://google.com")
// Get the title of the page
val title = driver.title
// Get the current URL
val url = driver.currentUrl
// Get the current page HTML source
val html = driver.pageSource
```

```kotlin
// Handle JavaScript pop-ups
val alert = driver.switchTo().alert()
alert.accept()
alert.dismiss()
// Switch between browser windows or tabs
val windowHandles = driver.windowHandles
val firstTab = windowHandles.toTypedArray().first()
driver.switchTo().window(windowHandles.toTypedArray()[2])
// Navigation history
driver.navigate().back()
driver.navigate().refresh()
driver.navigate().forward()
// Maximize window
driver.manage().window().maximize()
// Add a new cookie
val newCookie = Cookie("customName", "customValue")
driver.manage().addCookie(newCookie)
// Get all cookies
val cookies = driver.manage().cookies
// Delete a cookie by name
driver.manage().deleteCookieNamed("CookieName")
// Delete all cookies
driver.manage().deleteAllCookies()
//Taking a full-screen screenshot
val screenshotFile = (driver as TakesScreenshot).getScreenshotAs(OutputType.FILE)
val tempDir = getProperty("java.io.tmpdir")
val destFile = File(Paths.get(tempDir, "$fileName.png").toString())
FileUtils.getFileUtils().copyFile(screenshotFile, destFile)
// Wait until a page is fully loaded via JavaScript
WebDriverWait(driver, 30).until < Any > {
(it as JavascriptExecutor).executeScript("return document.readyState") as String == "complete"
}
// Switch to frames
driver.switchTo().frame(1)
driver.switchTo().frame("frameName")
val element = driver.findElement(By.id("id"))
driver.switchTo().frame(element)
// Switch to the default document
driver.switchTo().defaultContent()
```

```kotlin
// Use a specific Firefox profile
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("ProfileName")
val firefoxOptions = FirefoxOptions()
firefoxOptions.setProfile(firefoxProfile)
driver = FirefoxDriver(firefoxOptions)
// Set a HTTP proxy Firefox
val profile = ProfilesIni()
val firefoxProfile = FirefoxProfile()
firefoxProfile.setPreference("network.proxy.type", 1)
firefoxProfile.setPreference("network.proxy.http", "myproxy.com")
firefoxProfile.setPreference("network.proxy.http_port", 3239)
val firefoxOptions = FirefoxOptions()
firefoxOptions.setProfile(firefoxProfile)
driver = FirefoxDriver(firefoxOptions)
// Set a HTTP proxy Chrome

proxy.setProxyType(Proxy.ProxyType.MANUAL)
proxy.setAutodetect(false)
proxy.setSslProxy("127.0.0.1:3239")
val chromeOptions = ChromeOptions()
chromeOptions.setProxy(proxy)
driver = ChromeDriver(chromeOptions)
// Accept all certificates Firefox
val firefoxProfile = FirefoxProfile()
firefoxProfile.setAcceptUntrustedCertificates(true)
firefoxProfile.setAssumeUntrustedCertificateIssuer(false)
val firefoxOptions = FirefoxOptions()
firefoxOptions.setProfile(firefoxProfile)
driver = FirefoxDriver(firefoxOptions)
// Accept all certificates Chrome
val chromeOptions = ChromeOptions()
chromeOptions.addArguments("--ignore-certificate-errors")
driver = ChromeDriver(chromeOptions)
// Set Chrome options
val chromeOptions = ChromeOptions()
chromeOptions.addArguments("user-data-dir=C:PathToUserData")
driver = ChromeDriver(chromeOptions)
// Turn off the JavaScript Firefox
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("ProfileName")
firefoxProfile.setPreference("javascript.enabled", false)
val firefoxOptions = FirefoxOptions()
firefoxOptions.setProfile(firefoxProfile)
driver = FirefoxDriver(firefoxOptions)
// Set the default page load timeout
driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS)
// Start Firefox with plugins
val profile = FirefoxProfile()
firefoxProfile.addExtension(File("C:extensionsLocationextension.xpi"))
val firefoxOptions = FirefoxOptions()
firefoxOptions.setProfile(firefoxProfile)
driver = FirefoxDriver(firefoxOptions)
// Start Chrome with an unpacked extension
val chromeOptions = ChromeOptions()
chromeOptions.addArguments("load-extension=/path/to/extension")
driver = ChromeDriver(chromeOptions)
// Start Chrome with a packed extension
val chromeOptions = ChromeOptions()
chromeOptions.addExtensions(File("local/path/to/extension.crx"))
driver = ChromeDriver(chromeOptions)
// Change the default files’ save location
val firefoxProfile = FirefoxProfile()
val downloadFilepath = "c:temp"
firefoxProfile.setPreference("browser.download.folderList", 2)
firefoxProfile.setPreference("browser.download.dir", downloadFilepath)
firefoxProfile.setPreference("browser.download.manager.alertOnEXEOpen", false)
firefoxProfile.setPreference("browser.helperApps.neverAsk.saveToDisk", "application/msword, application/binary, application/ris, text/csv, image/png, application/pdf, text/html, text/plain, application/zip, application/x-zip, application/x-zip-compressed, application/download, application/octet-stream")
val firefoxOptions = FirefoxOptions()
firefoxOptions.setProfile(firefoxProfile)
driver = FirefoxDriver(firefoxOptions)
```

## 30 Advanced WebDriver Tips and Tricks Kotlin Code

```kotlin
fun takeFullScreenshot(fileName: String) {
    val srcFile = (driver as TakesScreenshot).getScreenshotAs(OutputType.FILE)
    val tempDir = System.getProperty("java.io.tmpdir")
    val destFile = File(Paths.get(tempDir, "$fileName.png").toString())
    FileUtils.getFileUtils().copyFile(srcFile, destFile)
}

```

```kotlin
fun takeScreenshotOfElement(element: WebElement, fileName: String) {
    val screenshotFile = (driver as TakesScreenshot).getScreenshotAs(OutputType.FILE)
    val fullImg = ImageIO.read(screenshotFile)
    val point = element.location
    val elementWidth = element.size.getWidth()
    val elementHeight = element.size.getHeight()
    val eleScreenshot = fullImg.getSubimage(point.getX(), point.getY(), elementWidth, elementHeight)
    ImageIO.write(eleScreenshot, "png", screenshotFile)
    val tempDir = System.getProperty("java.io.tmpdir")
    val destFile = File(Paths.get(tempDir, "$fileName.png").toString())
    FileUtils.getFileUtils().copyFile(screenshotFile, destFile)
}

```

```kotlin
@Test
fun takeFullScreenshot_test() {
    driver.navigate().to("http://automatetheplanet.com")
    takeFullScreenshot("testImage")
}

@Test
fun takeElementScreenshot_test() {
    driver.navigate().to("http://automatetheplanet.com")
    val element =
        wait.until(
            ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/header/div/div[2]/div/div[2]/nav")
            )
        )
    takeScreenshotOfElement(element, "testElementImage")
}

```

```kotlin
@Test
fun getHtmlSourceOfWebElement() {
    driver.navigate().to("http://automatetheplanet.com")
    val element =
        wait.until(
            ExpectedConditions.visibilityOfElementLocated(
                By.xpath("/html/body/div[1]/header/div/div[2]/div/div[2]/nav")
            )
        )
    val htmlSource = element.getAttribute("innerHTML")
    System.out.println(htmlSource)
}

```

```kotlin
@Test
fun executeJavaScript() {
    driver.navigate().to("http://automatetheplanet.com")
    val javascriptExecutor = driver as JavascriptExecutor
    val title = javascriptExecutor.executeScript("return document.title") as String
    println(title)
}

```

```kotlin
driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS)
```

```kotlin
private fun waitUntilLoaded() {
    wait.until { x: WebDriver ->
        val javascriptExecutor = driver as JavascriptExecutor
        val isReady = javascriptExecutor.executeScript("return document.readyState") as String
        isReady == "complete"
    }
}

```

```kotlin
wait.until(
    ExpectedConditions.visibilityOfAllElements(
        driver.findElements(By.xpath("//\*[@id='tve_editor']/div[2]/div[2]/div/div"))
    )
)

```

```kotlin
val chromeOptions = ChromeOptions()

chromeOptions.addArguments(
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors"
)

driver = ChromeDriver(chromeOptions)

```

```kotlin
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("xyzProfile")
val firefoxOptions = FirefoxOptions()

firefoxOptions.setProfile(firefoxProfile)

val firefoxDriver: WebDriver = FirefoxDriver(firefoxOptions)

```

```kotlin
val chromeOptions = ChromeOptions()

chromeOptions.addArguments("user-data-dri=C:UsersYour path to userRoamingGoogleChromeUser Data")

driver = ChromeDriver(chromeOptions)ß
```

```kotlin
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("xyzProfile")
val firefoxOptions = FirefoxOptions()

firefoxProfile.setPreference("javascript.enabled", false)

firefoxOptions.setProfile(firefoxProfile)

val firefoxDriver: WebDriver = FirefoxDriver(firefoxOptions)ß
```

```kotlin
@Test
fun manageCookies() {
    driver.navigate().to("http://automatetheplanet.com")
    // get all cookies
    val cookies = driver.manage().cookies
    for (cookie in cookies) {
        println(cookie.name)
    }
    // get a cookie by name
    val fbPixelCookie = driver.manage().getCookieNamed("\_fbp")
    // create a new cookie by name
    val newCookie = Cookie("customName", "customValue")
    driver.manage().addCookie(newCookie)
    // delete a cookie
    driver.manage().deleteCookie(fbPixelCookie)
    // delete a cookie by name
    driver.manage().deleteCookieNamed("customName")
    // delete all cookies
    driver.manage().deleteAllCookies()
}

```

```kotlin
driver.manage().window().maximize()
```

```kotlin
@Test
fun dragAndDrop() {
    driver.navigate().to("http://loopj.com/jquery-simple-slider/")
    val element = driver.findElement(By.xpath("//\*[@id='project']/p[1]/div/div[2]"))
    val action = Actions(driver)
    action.dragAndDropBy(element, 30, 0).build().perform()
}

```

```kotlin
@Test
fun fileUpload() {
    driver
        .navigate()
        .to(
            "https://demos.telerik.com/aspnet-ajax/ajaxpanel/application-scenarios/file-upload/defaultcs.aspx"
        )
    val element = driver.findElement(By.id("ctl00_ContentPlaceholder1_RadUpload1file0"))
    val filePath = Paths.get(System.getProperty("java.io.tmpdir"), "debugWebDriver.xml").toString()
    val destFile = File(filePath)
    destFile.createNewFile()
    element.sendKeys(filePath)
}

```

```kotlin
@Test
fun handleJavaScripPopUps() {
    driver.navigate().to("http://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm")
    driver.switchTo().frame("iframeResult")
    val button = driver.findElement(By.xpath("/html/body/button"))
    button.click()
    val alert = driver.switchTo().alert()
    if (alert.text == "Press a button!") {
        alert.accept()
    } else {
        alert.dismiss()
    }
}

```

```kotlin
@Test
fun movingBetweenTabs() {
    driver.navigate().to("https://www.automatetheplanet.com/")
    val firstLink = driver.findElement(By.xpath("//_[@id='menu-item-11362']/a"))
    val secondLink = driver.findElement(By.xpath("//_[@id='menu-item-6']/a"))
    val selectLinkOpenninNewTab = Keys.chord(Keys.CONTROL, Keys.RETURN)
    firstLink.sendKeys(selectLinkOpenninNewTab)
    secondLink.sendKeys(selectLinkOpenninNewTab)
    val windows = driver.windowHandles
    val firstTab = windows.toTypedArray()[1] as String
    val lastTab = windows.toTypedArray()[2] as String
    driver.switchTo().window(lastTab)
    Assert.assertEquals("Resources - Automate The Planet", driver.title)
    driver.switchTo().window(firstTab)
    Assert.assertEquals("Blog - Automate The Planet", driver.title)
}

```

```kotlin
@Test
fun navigationHistory() {
    driver
        .navigate()
        .to("https://www.codeproject.com/Articles/1078541/Advanced-WebDriver-Tips-and-Tricks-Part")
    driver
        .navigate()
        .to(
            "http://www.codeproject.com/Articles/1017816/Speed-up-Selenium-Tests-through-RAM-Facts-and-Myth"
        )
    driver.navigate().back()
    Assert.assertEquals(
        "10 Advanced WebDriver Tips and Tricks - Part 1 - CodeProject",
        driver.title
    )
    driver.navigate().refresh()
    Assert.assertEquals(
        "10 Advanced WebDriver Tips and Tricks - Part 1 - CodeProject",
        driver.title
    )
    driver.navigate().forward()
    Assert.assertEquals(
        "Speed up Selenium Tests through RAM Facts and Myths - CodeProject",
        driver.title
    )
}

```

```kotlin
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("xyzProfile")
val firefoxOptions = FirefoxOptions()

firefoxProfile.setPreference(
    "general.useragent.override",
    "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+"
)

firefoxOptions.setProfile(firefoxProfile)

val firefoxDriver: WebDriver = FirefoxDriver(firefoxOptions)

```

```kotlin
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("xyzProfile")

firefoxProfile.setPreference("network.proxy.type", 1)

firefoxProfile.setPreference("network.proxy.http", "myproxy.com")

firefoxProfile.setPreference("network.proxy.http_port", 3239)

val firefoxOptions = FirefoxOptions()

firefoxOptions.setProfile(firefoxProfile)

val firefoxDriver: WebDriver = FirefoxDriver(firefoxOptions)

```

```kotlin
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("xyzProfile")

firefoxProfile.setAcceptUntrustedCertificates(true)

firefoxProfile.setAssumeUntrustedCertificateIssuer(false)

val firefoxOptions = FirefoxOptions()

firefoxOptions.setProfile(firefoxProfile)
val firefoxDriver: WebDriver = FirefoxDriver(firefoxOptions);

```

```kotlin
val chromeOptions = ChromeOptions()

chromeOptions.addArguments("--ignore-certificate-errors")

driver = ChromeDriver(chromeOptions)ß
```

```kotlin
@Test
fun scrollFocusToControl() {
    driver.navigate().to("http://automatetheplanet.com/")
    val ourMissionLink = driver.findElement(By.xpath("//\*[@id='panel-6435-0-0-4']/div"))
    val jsToBeExecuted = "window.scroll(0, ${ourMissionLink.location.getY()});"
    val javascriptExecutor = driver as JavascriptExecutor
    javascriptExecutor.executeScript(jsToBeExecuted)
}

```

```kotlin
@Test
fun focusOnControl() {
    driver.navigate().to("http://automatetheplanet.com/")
    waitUntilLoaded()
    val ourMissionLink = driver.findElement(By.xpath("//\*[@id='panel-6435-0-0-4']/div"))
    val action = Actions(driver)
    action.moveToElement(ourMissionLink).build().perform()
}

```

```kotlin
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("xyzProfile")

firefoxProfile.addExtension(File("C:extensionsLocationextension.xpi"))

val firefoxOptions = FirefoxOptions()

firefoxOptions.setProfile(firefoxProfile)

val firefoxDriver: WebDriver = FirefoxDriver(firefoxOptions)
```

```kotlin
val chromeOptions = ChromeOptions()

val proxy = Proxy()

proxy.proxyType = Proxy.ProxyType.MANUAL

proxy.isAutodetect = false

proxy.sslProxy = "127.0.0.1:3239"

chromeOptions.setProxy(proxy)

driver = ChromeDriver(chromeOptions)
```

```kotlin

var proxy = new Proxy();
proxy.setProxyType(Proxy.ProxyType.MANUAL);
proxy.setAutodetect(false);
proxy.setSslProxy("127.0.0.1:3239");
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setProxy(proxy);
chromeOptions.addArguments("--proxy-server=http://user:password@127.0.0.1:3239");
driver = new ChromeDriver(chromeOptions);
```

```kotlin
val chromeOptions = ChromeOptions()

chromeOptions.addArguments("load-extension=/pathTo/extension")

driver = ChromeDriver(chromeOptions)
```

```kotlin
val chromeOptions = ChromeOptions()

chromeOptions.addArguments("load-extension=/pathTo/extension")

driver = ChromeDriver(chromeOptions)
```

```kotlin
@Test
fun assertButtonEnabledDisabled() {
    driver.navigate().to("http://www.w3schools.com/tags/tryit.asp?filename=tryhtml_button_disabled")
    driver.switchTo().frame("iframeResult")
    val button = driver.findElement(By.xpath("/html/body/button"))
    Assert.assertFalse(button.isEnabled)
}

```

```kotlin
@Test
fun setHiddenField() {
    // <input type="hidden" name="country" value="Bulgaria"/>
    val theHiddenElem = driver.findElement(By.name("country"))
    val javascriptExecutor = driver as JavascriptExecutor?
    javascriptExecutor!!.executeScript("arguments[0].value='Germany';", theHiddenElem)
    val hiddenFieldValue = theHiddenElem.getAttribute("value")
    Assert.assertEquals("Germany", hiddenFieldValue)
}

```

```kotlin
private fun waitForAjaxComplete() {
    wait.until { x: WebDriver ->
        val javascriptExecutor = driver as JavascriptExecutor
        val isAjaxCallComplete =
            javascriptExecutor.executeScript(
                "return window.jQuery != undefined && jQuery.active == 0"
            ) as Boolean
        isAjaxCallComplete
    }
}

```

```kotlin
val chromePrefs = HashMap<String, Any>()

chromePrefs["profile.default_content_settings.popups"] = 0

chromePrefs["download.default_directory"] = "downloadFilepath"

chromeOptions.setExperimentalOption("prefs", chromePrefs)

chromeOptions.addArguments("--test-type")

chromeOptions.addArguments("start-maximized", "disable-popup-blocking")

val chromeOptions = ChromeOptions()

driver = ChromeDriver(chromeOptions)

@Test
fun VerifyFileDownloadChrome() {
    val expectedFilePath = Paths.get("c:tempTesting_Framework_2015_3_1314_2_Free.exe")
    try {
        driver
            .navigate()
            .to("https://www.telerik.com/download-trial-file/v2/telerik-testing-framework")
        wait.until { x: WebDriver -> Files.exists(expectedFilePath) }
        val bytes = Files.size(expectedFilePath)
        Assert.assertEquals(4326192, bytes)
    } finally {
        if (Files.exists(expectedFilePath)) Files.delete(expectedFilePath)
    }
}

```

```kotlin
val downloadFilepath = "c:temp"
val profile = ProfilesIni()
val firefoxProfile = profile.getProfile("xyzProfile")

firefoxProfile.setPreference("browser.download.folderList", 2)

firefoxProfile.setPreference("browser.download.dir", downloadFilepath)

firefoxProfile.setPreference("browser.download.manager.alertOnEXEOpen", false)

firefoxProfile.setPreference(
    "browser.helperApps.neverAsk.saveToDisk",
    "application/msword, application/binary, application/ris, text/csv, image/png, application/pdf, text/html, text/plain, application/zip, application/x-zip, application/x-zip-compressed, application/download, application/octet-stream"
)

firefoxOptions.setProfile(firefoxProfile)

val firefoxOptions = FirefoxOptions()

firefoxOptions.setProfile(firefoxProfile)

val firefoxDriver: WebDriver = FirefoxDriver(firefoxOptions)

```

## Most Complete Selenium WebDriver Java Cheat Sheet

```java
// Maven: selenium-chrome-driver
import org.openqa.selenium.chrome.ChromeDriver;
WebDriver driver = new ChromeDriver();
// Maven: selenium-firefox-driver
import org.openqa.selenium.firefox.FirefoxDriver;
WebDriver driver = new FirefoxDriver();
// Maven: selenium-edge-driver
import org.openqa.selenium.firefox.EdgeDriver;
WebDriver driver = new EdgeDriver();
// Maven: selenium-ie-driver
import org.openqa.selenium.ie.InternetExplorerDriver;
WebDriver driver = new InternetExplorerDriver();
// Maven: selenium-safari-driver
import org.openqa.selenium.safari.SafariDriver;
WebDriver driver = new SafariDriver();
```

```java
driver.findElement(By.className("className"));
driver.findElement(By.cssSelector("css"));
driver.findElement(By.id("id"));
driver.findElement(By.linkText("text"));
driver.findElement(By.name("name"));
driver.findElement(By.partialLinkText("pText"));
driver.findElement(By.tagName("input"));
driver.findElement(By.xpath("//\*[@id='editor']"));
// Find multiple elements
List<WebElement> anchors = driver.findElements(By.tagName("a"));
// Search for an element inside another
WebElement div = driver.findElement(By.tagName("div"))
.findElement(By.tagName("a"));
```

```java
// Navigate to a page
driver.navigate().to("http://google.com");
// Get the title of the page
String title = driver.getTitle();
// Get the current URL
String url = driver.getCurrentUrl();
// Get the current page HTML source
String html = driver.getPageSource();
```

```java
WebElement element = driver.findElement(By.id("id"));
element.click();
element.sendKeys("someText");
element.clear();
element.submit();
String innerText = element.getText();
boolean isEnabled = element.isEnabled();
boolean isDisplayed = element.isDisplayed();
boolean isSelected = element.isSelected();
WebElement element = driver.findElement(By.id("id"));
Select select = new Select(element);
select.selectByIndex(1);
select.selectByVisibleText("Ford");
select.selectByValue("ford");
select.deselectAll();
select.deselectByIndex(1);
select.deselectByVisibleText("Ford");
select.deselectByValue("ford");
List<WebElement> allSelected = select.getAllSelectedOptions();
boolean isMultipleSelect = select.isMultiple();
```

```java
// Drag and Drop
WebElement element = driver.FindElement(
By.xpath("//_[@id='project']/p[1]/div/div[2]"));
Actions move = new Actions(driver);
move.dragAndDropBy(element, 30, 0).build().perform();
// How to check if an element is visible
Assert.assertTrue(driver.findElement(
By.xpath("//_[@id='tve_editor']/div")).isDisplayed());
// Upload a file
WebElement element = driver.findElement(By.id("RadUpload1file0"));
String filePath = "D:\\WebDriver.Series.Tests\\WebDriver.xml";
element.sendKeys(filePath);
// Scroll focus to control
WebElement link =
driver.findElement(By.partialLinkText("Previous post"));
String js = String.format("window.scroll(0, %d);",
link.getLocation().getY());
((JavascriptExecutor)driver).executeScript(js);
link.click();
// Taking an element screenshot
WebElement element =
driver.findElement(By.xpath("//_[@id='tve_editor']/div"));
File screenshotFile =
((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
BufferedImage fullImg = ImageIO.read(screenshotFile);
Point point = element.getLocation();
int elementWidth = element.getSize().getWidth();
int elementHeight = element.getSize().getHeight();
BufferedImage eleScreenshot = fullImg.getSubimage(point.getX(),
point.getY(), elementWidth, elementHeight);
ImageIO.write(eleScreenshot, "png", screenshotFile);
String tempDir = getProperty("java.io.tmpdir");
File destFile = new File(Paths.get(tempDir, fileName +
".png").toString());
FileUtils.getFileUtils().copyFile(screenshotFile, destFile);
// Focus on a control
WebElement link =
driver.findElement(By.partialLinkText("Previous post"));
Actions action = new Actions(driver);
action.moveToElement(link).build().perform();
// Wait for visibility of an element
WebDriverWait wait = new WebDriverWait(driver, 30);
wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(
By.xpath("//_[@id='tve_editor']/div[2]/div[2]/div/div")));
```

```java
// Handle JavaScript pop-ups
Alert alert = driver.switchTo().alert();
alert.accept();
alert.dismiss();
// Switch between browser windows or tabs
Set<String> windowHandles = driver.getWindowHandles();
String firstTab = (String)windowHandles.toArray()[1];
String lastTab = (String)windowHandles.toArray()[2];
driver.switchTo().window(lastTab);
// Navigation history
driver.navigate().back();
driver.navigate().refresh();
driver.navigate().forward();
// Maximize window
driver.manage().window().maximize();
// Add a new cookie
Cookie newCookie = new Cookie("customName", "customValue");
driver.manage().addCookie(newCookie);
// Get all cookies
Set<Cookie> cookies = driver.manage().getCookies();
// Delete a cookie by name
driver.manage().deleteCookieNamed("CookieName");
// Delete all cookies
driver.manage().deleteAllCookies();
//Taking a full-screen screenshot
File srceenshotFile =
((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
String tempDir = getProperty("java.io.tmpdir");
File destFile = new File(Paths.get(tempDir, fileName +
".png").toString());
FileUtils.getFileUtils().copyFile(srceenshotFile, destFile);
// Wait until a page is fully loaded via JavaScript
WebDriverWait wait = new WebDriverWait(driver, 30);
wait.until(x -> {
((String)((JavascriptExecutor)driver).executeScript(
"return document.readyState")).equals("complete");
});
// Switch to frames
driver.switchTo().frame(1);
driver.switchTo().frame("frameName");
WebElement element = driver.findElement(By.id("id"));
driver.switchTo().frame(element);
// Switch to the default document
driver.switchTo().defaultContent();
```

```java
// Use a specific Firefox profile
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("ProfileName");
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
driver = new FirefoxDriver(firefoxOptions);
// Set a HTTP proxy Firefox
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = new FirefoxProfile();
firefoxProfile.setPreference("network.proxy.type", 1);
firefoxProfile.setPreference("network.proxy.http", "myproxy.com");
firefoxProfile.setPreference("network.proxy.http_port", 3239);
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
driver = new FirefoxDriver(firefoxOptions);
// Set a HTTP proxy Chrome
var proxy = new Proxy();
proxy.setProxyType(Proxy.ProxyType.MANUAL);
proxy.setAutodetect(false);
proxy.setSslProxy("127.0.0.1:3239");
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setProxy(proxy);
driver = new ChromeDriver(chromeOptions);
// Accept all certificates Firefox
FirefoxProfile firefoxProfile = new FirefoxProfile();
firefoxProfile.setAcceptUntrustedCertificates(true);
firefoxProfile.setAssumeUntrustedCertificateIssuer(false);
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
driver = new FirefoxDriver(firefoxOptions);
// Accept all certificates Chrome
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("--ignore-certificate-errors");
driver = new ChromeDriver(chromeOptions);
// Set Chrome options
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("user-data-dir=C:\\Path\\To\\User Data");
driver = new ChromeDriver(chromeOptions);
// Turn off the JavaScript Firefox
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("ProfileName");
firefoxProfile.setPreference("javascript.enabled", false);
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
driver = new FirefoxDriver(firefoxOptions);
// Set the default page load timeout
driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
// Start Firefox with plugins
FirefoxProfile profile = new FirefoxProfile();
firefoxProfile.addExtension(new
File("C:\\extensionsLocation\\extension.xpi"));
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
driver = new FirefoxDriver(firefoxOptions);
// Start Chrome with an unpacked extension
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("load-extension=/path/to/extension");
driver = new ChromeDriver(chromeOptions);
// Start Chrome with a packed extension
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addExtensions(new File("local/path/to/extension.crx"));
driver = new ChromeDriver(chromeOptions);
// Change the default files’ save location
FirefoxProfile firefoxProfile = new FirefoxProfile();
String downloadFilepath = "c:\\temp";
firefoxProfile.setPreference("browser.download.folderList", 2);
firefoxProfile.setPreference("browser.download.dir", downloadFilepath);
firefoxProfile.setPreference("browser.download.manager.alertOnEXEOpen",
false);
firefoxProfile.setPreference("browser.helperApps.neverAsk.saveToDisk",
"application/msword, application/binary, application/ris, text/csv,
image/png, application/pdf, text/html, text/plain, application/zip,
application/x-zip, application/x-zip-compressed, application/download,
application/octet-stream"));
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
driver = new FirefoxDriver(firefoxOptions);
```

## WebDriver – Capture and Modify HTTP Traffic – Java Code

```java
private WebDriver driver;
private BrowserMobProxyServer proxyServer;

@BeforeClass
private void classInit() {
  proxyServer = new BrowserMobProxyServer();
  proxyServer.start(18882);
  WebDriverManager.chromedriver().setup();
}

@AfterClass
public void classCleanup() {
  proxyServer.abort();
}

@BeforeMethod
public void testInit() {
  final
  var proxyConfig = new Proxy()
    .setHttpProxy("127.0.0.1:18882")
    .setSslProxy("127.0.0.1:18882")
    .setFtpProxy("127.0.0.1:18882");
  final
  var options = new ChromeOptions()
    .setProxy(proxyConfig)
    .setAcceptInsecureCerts(true);
  driver = new ChromeDriver(options);
}

@AfterMethod
public void testCleanup() {
  driver.quit();
}
```

```java
proxyServer.newHar();
```

```java
proxyServer.blacklistRequests("^._analytics._$", 403);
```

```java
proxyServer.rewriteUrl("^._logo.svg._$", "https://www.automatetheplanet.com/wp-content/uploads/2016/12/homepage-img-4.svg");
```

```java
proxyServer.addRequestFilter((request, contents, messageInfo) -> {
  var method = request.getMethod().toString().toUpperCase();
  if (method.equals("POST") || method.equals("PUT") || method.equals("PATCH") || method.equals("GET")) {
    // get/set request body bytes
    byte[] bodyBytes = contents.getBinaryContents();
    contents.setBinaryContents(bodyBytes);
    // get/set request body as String
    String bodyString = contents.getTextContents();
    contents.setTextContents(bodyString);
  }
  return null;
});
```

```java
proxyServer.addResponseFilter((response, contents, messageInfo) -> {
  if (response.getStatus().code() == 200) {
    if (contents.getContentType().trim().toLowerCase().contains("text/html")) {
      byte[] bodyBytes = contents.getBinaryContents();
      contents.setBinaryContents(bodyBytes);
      String bodyString = contents.getTextContents();
      contents.setTextContents(bodyString);
    }
  }
});
```

```java
@Test
public void fontRequestMade_when_NavigateToHomePage() {
  driver.navigate().to("https://www.automatetheplanet.com/");
  assertRequestMade("fontawesome-webfont.woff2?v=4.7.0");
}

private void assertRequestMade(String url) {
  var harEntries = proxyServer.getHar().getLog().getEntries();
  boolean areRequestsMade = harEntries.stream().anyMatch(r -> r.getRequest().getUrl().contains(url));
  Assert.assertTrue(areRequestsMade);
}
```

```java
@Test
public void testNoLargeImages_when_NavigateToHomePage() {
  driver.navigate().to("https://www.automatetheplanet.com/");
  assertNoLargeImagesRequested();
}

private void assertNoErrorCodes() {
  var harEntries = proxyServer.getHar().getLog().getEntries();
  boolean areThereErrorCodes = harEntries.stream().anyMatch(r -> r.getResponse().getStatus() > 400 &&
    r.getResponse().getStatus() < 599);
  Assert.assertFalse(areThereErrorCodes);
}
```

```java
@Test
public void testNoLargeImages_when_NavigateToHomePage() {
  driver.navigate().to("https://www.automatetheplanet.com/");
  assertNoLargeImagesRequested();
}

private void assertNoLargeImagesRequested() {
  var harEntries = proxyServer.getHar().getLog().getEntries();
  boolean areThereLargeImages = harEntries.stream().anyMatch(r -> r.getResponse().getContent().getMimeType().startsWith("image") &&
    r.getResponse().getContent().getSize() > 40000);
  Assert.assertFalse(areThereLargeImages);
}
```

## 30 Advanced WebDriver Tips and Tricks Java Code

```java
public void takeFullScreenshot(String fileName) throws Exception {
  File srcFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
  String tempDir = getProperty("java.io.tmpdir");
  File destFile = new File(Paths.get(tempDir, fileName + ".png").toString());
  FileUtils.getFileUtils().copyFile(srcFile, destFile);
}
```

```java
public void takeScreenshotOfElement(WebElement element, String fileName) throws Exception {
  File screenshotFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
  BufferedImage fullImg = ImageIO.read(screenshotFile);
  Point point = element.getLocation();
  int elementWidth = element.getSize().getWidth();
  int elementHeight = element.getSize().getHeight();
  BufferedImage eleScreenshot = fullImg.getSubimage(point.getX(), point.getY(), elementWidth, elementHeight);
  ImageIO.write(eleScreenshot, "png", screenshotFile);
  String tempDir = getProperty("java.io.tmpdir");
  File destFile = new File(Paths.get(tempDir, fileName + ".png").toString());
  FileUtils.getFileUtils().copyFile(screenshotFile, destFile);
}
```

```java
@Test
public void takeFullScreenshot_test() throws Exception {
  driver.navigate().to("http://automatetheplanet.com");
  takeFullScreenshot("testImage");
}

@Test
public void takeElementScreenshot_test() throws Exception {
  driver.navigate().to("http://automatetheplanet.com");
  var element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div[1]/header/div/div[2]/div/div[2]/nav")));
  takeScreenshotOfElement(element, "testElementImage");
}
```

```java
@Test
public void getHtmlSourceOfWebElement() {
  driver.navigate().to("http://automatetheplanet.com");
  var element = wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.xpath("/html/body/div[1]/header/div/div[2]/div/div[2]/nav")));
  String sourceHtml = element.getAttribute("innerHTML");
  System.out.println(sourceHtml);
}
```

```java
@Test
public void executeJavaScript() {
  driver.navigate().to("http://automatetheplanet.com");
  JavascriptExecutor javascriptExecutor = (JavascriptExecutor) driver;
  String title = (String) javascriptExecutor.executeScript("return document.title");
  System.out.println(title);
}
```

```java
driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
```

```java
private void waitUntilLoaded() {
  wait.until(x -> {
    JavascriptExecutor javascriptExecutor = (JavascriptExecutor) driver;
    String isReady = (String) javascriptExecutor.executeScript("return document.readyState");
    return isReady.equals("complete");
  });
}
```

```java
wait.until(ExpectedConditions.visibilityOfAllElements(
  driver.findElements(By.xpath("//\*[@id='tve_editor']/div[2]/div[2]/div/div"))));
```

```java
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("--headless", "--disable-gpu", "--window-size=1920,1200", "--ignore-certificate-errors");
driver = new ChromeDriver(chromeOptions);
```

```java
@Test
public void checkIfElementIsVisible() {
  driver.navigate().to("http://automatetheplanet.com");
  var element = driver.findElement(By.xpath("/html/body/div[1]/header/div/div[2]/div/div[2]/nav"); Assert.assertTrue(element).isDisplayed());
}
```

```java
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("xyzProfile");
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
WebDriver firefoxDriver = new FirefoxDriver(firefoxOptions);
```

```java
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("user-data-dri=C:UsersYour path to userRoamingGoogleChromeUser Data");
driver = new ChromeDriver(chromeOptions);
```

```java
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("xyzProfile");
firefoxProfile.setPreference("javascript.enabled", false);
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
WebDriver firefoxDriver = new FirefoxDriver(firefoxOptions);
```

```java
@Test
public void manageCookies() {
  driver.navigate().to("http://automatetheplanet.com");
  // get all cookies
  var cookies = driver.manage().getCookies();
  for (Cookie cookie: cookies) {
    System.out.println(cookie.getName());
  }
  // get a cookie by name
  var fbPixelCookie = driver.manage().getCookieNamed("\_fbp");
  // create a new cookie by name
  Cookie newCookie = new Cookie("customName", "customValue");
  driver.manage().addCookie(newCookie);
  // delete a cookie
  driver.manage().deleteCookie(fbPixelCookie);
  // delete a cookie by name
  driver.manage().deleteCookieNamed("customName");
  // delete all cookies
  driver.manage().deleteAllCookies();
}
```

```java
driver.manage().window().maximize

```

```java
@Test
public void dragAndDrop() {
  driver.navigate().to("http://loopj.com/jquery-simple-slider/");
  var element = driver.findElement(By.xpath("//\*[@id='project']/p[1]/div/div[2]"));
  Actions action = new Actions(driver);
  action.dragAndDropBy(element, 30, 0).build().perform();
}
```

```java
@Test
public void fileUpload() throws IOException {
  driver.navigate().to(
    "https://demos.telerik.com/aspnet-ajax/ajaxpanel/application-scenarios/file-upload/defaultcs.aspx");
  var element = driver.findElement(By.id("ctl00_ContentPlaceholder1_RadUpload1file0"));
  String filePath = Paths.get(getProperty("java.io.tmpdir"), "debugWebDriver.xml").toString();
  File destFile = new File(filePath);
  destFile.createNewFile();
  element.sendKeys(filePath);
}
```

```java
@Test
public void handleJavaScripPopUps() {
  driver.navigate().to("http://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");
  driver.switchTo().frame("iframeResult");
  var button = driver.findElement(By.xpath("/html/body/button"));
  button.click();
  Alert alert = driver.switchTo().alert();
  if (alert.getText().equals("Press a button!")) {
    alert.accept();
  } else {
    alert.dismiss();
  }
}
```

```java
@Test
public void movingBetweenTabs() {
  driver.navigate().to("https://www.automatetheplanet.com/");
  var firstLink = driver.findElement(By.xpath("//_[@id='menu-item-11362']/a"));
  var secondLink = driver.findElement(By.xpath("//_[@id='menu-item-6']/a"));
  String selectLinkOpenninNewTab = Keys.chord(Keys.CONTROL, Keys.RETURN);
  firstLink.sendKeys(selectLinkOpenninNewTab);
  secondLink.sendKeys(selectLinkOpenninNewTab);
  Set < String > windows = driver.getWindowHandles();
  String firstTab = (String) windows.toArray()[1];
  String lastTab = (String) windows.toArray()[2];
  driver.switchTo().window(lastTab);
  Assert.assertEquals("Resources - Automate The Planet", driver.getTitle());
  driver.switchTo().window(firstTab);
  Assert.assertEquals("Blog - Automate The Planet", driver.getTitle());
}
```

```java
@Test
public void navigationHistory() {
  driver.navigate().to("https://www.codeproject.com/Articles/1078541/Advanced-WebDriver-Tips-and-Tricks-Part");
  driver.navigate().to("http://www.codeproject.com/Articles/1017816/Speed-up-Selenium-Tests-through-RAM-Facts-and-Myth");
  driver.navigate().back();
  Assert.assertEquals("10 Advanced WebDriver Tips and Tricks - Part 1 - CodeProject", driver.getTitle());
  driver.navigate().refresh();
  Assert.assertEquals("10 Advanced WebDriver Tips and Tricks - Part 1 - CodeProject", driver.getTitle());
  driver.navigate().forward();
  Assert.assertEquals("Speed up Selenium Tests through RAM Facts and Myths - CodeProject", driver.getTitle());
}
```

```java
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("xyzProfile");
firefoxProfile.setPreference("general.useragent.override", "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+");
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
WebDriver firefoxDriver = new FirefoxDriver(firefoxOptions);
```

```java
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("xyzProfile");
firefoxProfile.setPreference("network.proxy.type", 1);
firefoxProfile.setPreference("network.proxy.http", "myproxy.com");
firefoxProfile.setPreference("network.proxy.http_port", 3239);
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
WebDriver firefoxDriver = new FirefoxDriver(firefoxOptions);
```

```java
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("xyzProfile");
firefoxProfile.setAcceptUntrustedCertificates(true);
firefoxProfile.setAssumeUntrustedCertificateIssuer(false);
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
WebDriver firefoxDriver = new FirefoxDriver(firefoxOptions);
```

```java
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("--ignore-certificate-errors");
driver = new ChromeDriver(chromeOptions);
```

```java
@Test
public void scrollFocusToControl() {
  driver.navigate().to("http://automatetheplanet.com/");
  var ourMissionLink = driver.findElement(By.xpath("//\*[@id="
    panel - 6435 - 0 - 0 - 4 "]/div"));
  String jsToBeExecuted = String.format("window.scroll(0, {0});", ourMissionLink.getLocation().getY());
  JavascriptExecutor javascriptExecutor = (JavascriptExecutor) driver;
  javascriptExecutor.executeScript(jsToBeExecuted);
}
```

```java
@Test
public void focusOnControl() {
  driver.navigate().to("http://automatetheplanet.com/");
  waitUntilLoaded();
  var ourMissionLink = driver.findElement(By.xpath("//\*[@id="
    panel - 6435 - 0 - 0 - 4 "]/div"));
  Actions action = new Actions(driver);
  action.moveToElement(ourMissionLink).build().perform();
}
```

```java
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("xyzProfile");
firefoxProfile.addExtension(new File("C:\\extensionsLocation\\extension.xpi"));
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
WebDriver firefoxDriver = new FirefoxDriver(firefoxOptions);
```

```java
var proxy = new Proxy();
proxy.setProxyType(Proxy.ProxyType.MANUAL);
proxy.setAutodetect(false);
proxy.setSslProxy("127.0.0.1:3239");
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setProxy(proxy);
driver = new ChromeDriver(chromeOptions);
```

```java
var proxy = new Proxy();
proxy.setProxyType(Proxy.ProxyType.MANUAL);
proxy.setAutodetect(false);
proxy.setSslProxy("127.0.0.1:3239");
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setProxy(proxy);
chromeOptions.addArguments("--proxy-server=http://user:password@127.0.0.1:3239");
driver = new ChromeDriver(chromeOptions);
```

```java
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("load-extension=/pathTo/extension");
driver = new ChromeDriver(chromeOptions);
```

```java
@Test
public void assertButtonEnabledDisabled() {
  driver.navigate().to("http://www.w3schools.com/tags/tryit.asp?filename=tryhtml_button_disabled");
  driver.switchTo().frame("iframeResult");
  var button = driver.findElement(By.xpath("/html/body/button"));
  Assert.assertFalse(button.isEnabled());
}
```

```java
@Test
public void setHiddenField() {
  //<input type="hidden" name="country" value="Bulgaria"/>
  var theHiddenElem = driver.findElement(By.name("country"));
  JavascriptExecutor javascriptExecutor = (JavascriptExecutor) driver;
  javascriptExecutor.executeScript("arguments[0].value='Germany';", theHiddenElem);
  String hiddenFieldValue = theHiddenElem.getAttribute("value");
  Assert.assertEquals("Germany", hiddenFieldValue);
}
```

```java
private void waitForAjaxComplete() {
  wait.until(x -> {
    JavascriptExecutor javascriptExecutor = (JavascriptExecutor) driver;
    Boolean isAjaxCallComplete =
    (Boolean) javascriptExecutor.executeScript("return window.jQuery != undefined && jQuery.active == 0");
    return isAjaxCallComplete;
  });
}
```

```java
String downloadFilepath = "c:temp";
HashMap < String, Object > chromePrefs = new HashMap < > ();
chromePrefs.put("profile.default_content_settings.popups", 0);
chromePrefs.put("download.default_directory", downloadFilepath);
chromeOptions.setExperimentalOption("prefs", chromePrefs);
chromeOptions.addArguments("--test-type");
chromeOptions.addArguments("start-maximized", "disable-popup-blocking");
@Test
public void VerifyFileDownloadChrome() throws IOException {
  var expectedFilePath = Paths.get("c:tempTesting_Framework_2015_3_1314_2_Free.exe");
  try {
    driver.navigate().to("https://www.telerik.com/download-trial-file/v2/telerik-testing-framework");
    wait.until(x -> Files.exists(expectedFilePath));
    long bytes = Files.size(expectedFilePath);
    Assert.assertEquals(4326192, bytes);
  } finally {
    if (Files.exists(expectedFilePath)) {
      Files.delete(expectedFilePath);
    }
  }
}
```

```java
ProfilesIni profile = new ProfilesIni();
FirefoxProfile firefoxProfile = profile.getProfile("xyzProfile");
String downloadFilepath = "c:temp";
firefoxProfile.setPreference("browser.download.folderList", 2);
firefoxProfile.setPreference("browser.download.dir", downloadFilepath);
firefoxProfile.setPreference("browser.download.manager.alertOnEXEOpen", false);
firefoxProfile.setPreference("browser.helperApps.neverAsk.saveToDisk",
"application/msword, application/binary, application/ris, text/csv, image/png, application/pdf, text/html, text/plain, application/zip, application/x-zip, application/x-zip-compressed, application/download, application/octet-stream"));
FirefoxOptions firefoxOptions = new FirefoxOptions();
firefoxOptions.setProfile(firefoxProfile);
WebDriver firefoxDriver = new FirefoxDriver(firefoxOptions);
```

## Selenium WebDriver Tor Network Integration Java Code

```java
private WebDriver driver;
private WebDriverWait wait;
private Process torProcess;
@BeforeClass
public void testSetup() throws IOException {
  System.setProperty("webdriver.gecko.driver", "resources\\geckodriver.exe");
  String torBinaryPath = "C:\\Users\\aangelov\\Desktop\\Tor Browser\\Browser\\firefox.exe";
  Runtime runTime = Runtime.getRuntime();
  torProcess = runTime.exec(torBinaryPath + " -n");
  FirefoxProfile profile = new FirefoxProfile();
  profile.setPreference("network.proxy.type", 1);
  profile.setPreference("network.proxy.socks", "127.0.0.1");
  profile.setPreference("network.proxy.socks_port", 9150);
  FirefoxOptions firefoxOptions = new FirefoxOptions();
  firefoxOptions.setProfile(profile);
  driver = new FirefoxDriver(firefoxOptions);
  driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
  driver.manage().window().maximize();
  wait = new WebDriverWait(driver, 30);
}
@AfterClass
public void afterClass() throws InterruptedException {
  driver.quit();
  torProcess.descendants().forEach(ph -> {
    ph.destroy();
  });
  torProcess.destroyForcibly();
}
```

```java
@Test
public void open_tor_browser() {
  driver.navigate().to("http://whatismyipaddress.com/");
  WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//\*[@id='section_left']/div[2]")));
  Assert.assertNotEquals("151.80.16.169", element.getText());
}
```

```java
public void refreshTorIdentity(String userName) {
  try (Socket socket = new Socket("127.0.0.1", 9151)) {
    OutputStream output = socket.getOutputStream();
    String authenticationCommand = String.format("AUTHENTICATE " % s "\r\n", userName);
    output.write(authenticationCommand.getBytes());
    output.write("SIGNAL NEWNYM\r\n".getBytes());
    InputStream input = socket.getInputStream();
    BufferedReader reader = new BufferedReader(new InputStreamReader(input));
    String line = reader.readLine();
    if (!line.contains("250")) {
      System.out.println("Unable to signal new user to server.");
    }
  } catch (UnknownHostException ex) {
    System.out.println("Server not found: " + ex.getMessage());
  } catch (IOException ex) {
    System.out.println("I/O error: " + ex.getMessage());
  }
}
```

# Free Tools

## UI Performance Analysis via Selenium WebDriver

```csharp
[TestMethod]
public void VerifyTodoListCreatedSuccessfully_When_jQuery()
{
    _driver.Navigate().GoToUrl("https://todomvc.com/");
    OpenTechnologyApp("jQuery");
    AddNewToDoItem("Clean the car");
    AddNewToDoItem("Clean the house");
    AddNewToDoItem("Buy Ketchup");
    GetItemCheckBox("Buy Ketchup").Click();
    AssertLeftItems(2);
}

private void AssertLeftItems(int expectedCount)
{
    var resultSpan = WaitAndFindElement(By.XPath("//footer/*/span | //footer/span"));
    if (expectedCount <= 0)
    {
        ValidateInnerTextIs(resultSpan, $"{expectedCount} item left");
    }
    else
    {
        ValidateInnerTextIs(resultSpan, $"{expectedCount} items left");
    }
}

private void ValidateInnerTextIs(IWebElement resultSpan, string expectedText)
{
    _webDriverWait.Until(ExpectedConditions.TextToBePresentInElement(resultSpan, expectedText));
}

private IWebElement GetItemCheckBox(string todoItem)
{
    return WaitAndFindElement(By.XPath($"//label[text()='{todoItem}']/preceding-sibling::input");
}

private void AddNewToDoItem(string todoItem)
{
    var todoInput = WaitAndFindElement(By.XPath("//input[@placeholder='What needs to be done?']"));
    todoInput.SendKeys(todoItem);
    _actions.Click(todoInput).SendKeys(Keys.Enter).Perform();
}

private void OpenTechnologyApp(string name)
{
    var technologyLink = WaitAndFindElement(By.LinkText(name));
    technologyLink.Click();
}

private IWebElement WaitAndFindElement(By locator)
{
    return _webDriverWait.Until(ExpectedConditions.ElementExists(locator));
}

```

```csharp
[SetUp]
public void Setup()
{
    new DriverManager().SetUpDriver(new ChromeConfig(), VersionResolveStrategy.MatchingBrowser);
    var chromeDriverService = ChromeDriverService.CreateDefaultService();
    ChromeOptions options = new ChromeOptions();
    options.AddAdditionalCapability(CapabilityType.EnableProfiling, true, true);
    options.SetLoggingPreference("performance", LogLevel.All);
    options.AddArgument("--disable-gpu");
    options.AddArgument("--no-sandbox");
    options.AddArguments("--disable-storage-reset");
    _driver = new ChromeDriver(chromeDriverService, options);
    _driver.Manage().Window.Maximize();
}
```

```csharp
Console.WriteLine("Chrome Performance Metrics");
var logs = _driver.Manage().Logs.GetLog("performance");
for (int i = 0; i < logs.Count; i++)
{
    Debug.WriteLine(logs[i].Message);
}

File.WriteAllLines("chromeMetrics.txt", logs.Select(m => m.Message));
```

```csharp
private static ChromeDriver _driver;
private static IDevToolsSession _devTools;
private static DevTools.DevToolsSessionDomains _devToolsSession;

[SetUp]
public void Setup()
{
    new DriverManager().SetUpDriver(new ChromeConfig(), VersionResolveStrategy.MatchingBrowser);
    var chromeDriverService = ChromeDriverService.CreateDefaultService();
    ChromeOptions options = new ChromeOptions();
    _driver = new ChromeDriver(chromeDriverService, options);
    _driver.Manage().Window.Maximize();
    _devTools = _driver.GetDevToolsSession();
    _devToolsSession = _devTools.GetVersionSpecificDomains<DevTools.DevToolsSessionDomains>();
    _devToolsSession.Performance.Enable(new DevTools.Performance.EnableCommandSettings());
    _devToolsSession.Network.Enable(new DevTools.Network.EnableCommandSettings());
}
```

```csharp
Console.WriteLine();
Console.WriteLine("DevTools Performance Metrics");
var metrics = _devToolsSession.Performance.GetMetrics();
foreach (var metric in metrics.Result.Metrics)
{
    Console.WriteLine($"{metric.Name} = {metric.Value}");
}

File.WriteAllLines("devToolsMetrics.txt",
_devToolsSession.Performance.GetMetrics().Result.Metrics.Select(m => $"{m.Name} = {m.Value}"));
```

```json
Timestamp = 18072.3841
AudioHandlers = 0
Documents = 7
Frames = 2
JSEventListeners = 197
LayoutObjects = 265
MediaKeySessions = 0
MediaKeys = 0
Nodes = 2829
Resources = 114
ContextLifecycleStateObservers = 21
V8PerContextDatas = 4
WorkerGlobalScopes = 0
UACSSResources = 0
RTCPeerConnections = 0
ResourceFetchers = 7
AdSubframes = 0
DetachedScriptStates = 2
ArrayBufferContents = 6
LayoutCount = 70
RecalcStyleCount = 39
LayoutDuration = 0.061348
RecalcStyleDuration = 0.056053
DevToolsCommandDuration = 0.126399
ScriptDuration = 0.350914
V8CompileDuration = 0.003751
TaskDuration = 0.864955
TaskOtherDuration = 0.26649
ThreadTime = 0.764974
ProcessTime = 1.109375
JSHeapUsedSize = 9161296
JSHeapTotalSize = 14876672
FirstMeaningfulPaint = 0
DomContentLoaded = 18072.116968
NavigationStart = 18069.00376
```

```bash
npm, install -g lighthouse
```

```bash
lighthouse https://demos.bellatrix.solutions/my-account/ --port=5333 --emulated-form-factor=desktop --output=html --output-path=./bellatrix-account.html
```

```csharp
private void ExecuteCommand(string command, bool shouldWaitToExit = false)
{
    var p = new Process();
    var startInfo = new ProcessStartInfo();
    startInfo.FileName = "cmd.exe";
    startInfo.Arguments = @"/c " ez_plus command;
    p.StartInfo = startInfo;
    p.Start();
    if (shouldWaitToExit)
    {
        p.WaitForExit();
    }
}

private static int GetFreeTcpPort()
{
    Thread.Sleep(100);
    var tcpListener = new TcpListener(IPAddress.Loopback, 0);
    tcpListener.Start();
    int port = ((IPEndPoint)tcpListener.LocalEndpoint).Port;
    tcpListener.Stop();
    return port;
}
```

```csharp
private static ChromeDriver _driver;
private static int freePort;
[SetUp]
public void Setup()
{
    new DriverManager().SetUpDriver(new ChromeConfig(), VersionResolveStrategy.MatchingBrowser);
    var chromeDriverService = ChromeDriverService.CreateDefaultService();
    ChromeOptions options = new ChromeOptions();
    freePort = GetFreeTcpPort();
    options.AddArgument("--remote-debugging-address=0.0.0.0");
    options.AddArgument($"--remote-debugging-port={freePort}");
    _driver = new ChromeDriver(chromeDriverService, options);
    _driver.Manage().fWindow.Maximize();
}
```

```csharp
ExecuteCommand($"lighthouse {_driver.Url} --output=json,html,csv --port={freePort}", true);
var performanceReport = ReadPerformanceReport();
```

```csharp
private Root ReadPerformanceReport()
{
    string assemblyFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
    var directoryInfo = new DirectoryInfo(assemblyFolder);
    string pattern = "*.report.json";
    var file = directoryInfo.GetFiles(pattern).OrderByDescending(f => f.LastWriteTime).First();
    string fileContent = File.ReadAllText(file.FullName);
    Root root = JsonConvert.DeserializeObject<Root>(fileContent);
    return root;
}
```

```csharp
ExecuteCommand($"lighthouse {_driver.Url} --output=json,html,csv --port={freePort}", true);
var performanceReport = ReadPerformanceReport();
Console.WriteLine("Display values");
Console.WriteLine($"{performanceReport.Audits.FirstMeaningfulPaint.Title} = {performanceReport.Audits.FirstMeaningfulPaint.DisplayValue}");
Console.WriteLine($"{performanceReport.Audits.FirstContentfulPaint.Title} = {performanceReport.Audits.FirstContentfulPaint.DisplayValue}");
Console.WriteLine($"{performanceReport.Audits.SpeedIndex.Title} = {performanceReport.Audits.SpeedIndex.DisplayValue}");
Console.WriteLine($"{performanceReport.Audits.LargestContentfulPaint.Title} = {performanceReport.Audits.LargestContentfulPaint.DisplayValue}");
Console.WriteLine($"{performanceReport.Audits.Interactive.Title} = {performanceReport.Audits.Interactive.DisplayValue}");
Console.WriteLine($"{performanceReport.Audits.TotalBlockingTime.Title} = {performanceReport.Audits.TotalBlockingTime.DisplayValue}");
Console.WriteLine($"{performanceReport.Audits.CumulativeLayoutShift.Title} = {performanceReport.Audits.CumulativeLayoutShift.DisplayValue}");
```

## Quick Guide Bitbucket Pipelines on Running Selenium C# Tests

```csharp
public partial class CheckoutPage
{
    private const string URL = "https://getbootstrap.com/docs/5.0/examples/checkout/";
    private IWebDriver _driver;

    public CheckoutPage(IWebDriver driver)
    {
        _driver = driver;
    }

    public void Navigate()
    {
        _driver.Navigate().GoToUrl(URL);
    }

    public void FillInfo(ClientInfo clientInfo)
    {
        FirstName.SendKeys(clientInfo.FirstName);
        LastName.SendKeys(clientInfo.LastName);
        Username.SendKeys(clientInfo.Username);
        Email.SendKeys(clientInfo.Email);
        Address1.SendKeys(clientInfo.Address1);
        Address2.SendKeys(clientInfo.Address2);
        Country.SelectByIndex(clientInfo.Country);
        State.SelectByIndex(clientInfo.State);
        Zip.SendKeys(clientInfo.Zip);
        CardName.SendKeys(clientInfo.CardName);
        CardNumber.SendKeys(clientInfo.CardNumber);
        CardExpiration.SendKeys(clientInfo.CardExpiration);
        CardCVV.SendKeys(clientInfo.CardCVV);
        ClickSubmitButton();
    }

    private void ClickSubmitButton()
    {
        ((IJavaScriptExecutor)_driver).ExecuteScript("arguments[0].click();", SubmitButton);
    }
}
```

```csharp
namespace BitbucketPipelines.Pages
{
    public record ClientInfo(
        string FirstName,
        string LastName,
        string Username,
        string Email,
        string Address1,
        string Address2,
        int Country,
        int State,
        string Zip,
        string CardName,
        string CardNumber,
        string CardExpiration,
        string CardCVV
    );
}
```

```csharp
public partial class CheckoutPage {
    public IWebElement FirstName => _driver.FindElement(By.Id("firstName"));
    public IWebElement FirstNameValidation =>
        _driver.FindElement(By.CssSelector("#firstName ~ .invalid-feedback"));
    public IWebElement LastName => _driver.FindElement(By.Id("lastName"));
    public IWebElement LastNameValidation =>
        _driver.FindElement(By.CssSelector("#lastName ~ .invalid-feedback"));
    public IWebElement Username => _driver.FindElement(By.Id("username"));
    public IWebElement UsernameValidation =>
        _driver.FindElement(By.CssSelector("#username ~ .invalid-feedback"));
    public IWebElement Email => _driver.FindElement(By.Id("email"));
    public IWebElement EmailValidation =>
        _driver.FindElement(By.CssSelector("#email ~ .invalid-feedback"));
    public IWebElement Address1 => _driver.FindElement(By.Id("address"));
    public IWebElement Address1Validation =>
        _driver.FindElement(By.CssSelector("#address ~ .invalid-feedback"));
    public IWebElement Address2 => _driver.FindElement(By.Id("address2"));
    public SelectElement Country => new SelectElement(_driver.FindElement(By.Id("country")));
    public IWebElement CountryValidation =>
        _driver.FindElement(By.CssSelector("#country ~ .invalid-feedback"));
    public SelectElement State => new SelectElement(_driver.FindElement(By.Id("state")));
    public IWebElement StateValidation =>
        _driver.FindElement(By.CssSelector("#state ~ .invalid-feedback"));
    public IWebElement Zip => _driver.FindElement(By.Id("zip"));
    public IWebElement ZipValidation =>
        _driver.FindElement(By.CssSelector("#zip ~ .invalid-feedback"));
    public IWebElement CardName => _driver.FindElement(By.Id("cc-name"));
    public IWebElement CardNameValidation =>
        _driver.FindElement(By.CssSelector("#cc-name ~ .invalid-feedback"));
    public IWebElement CardNumber => _driver.FindElement(By.Id("cc-number"));
    public IWebElement CardNumberValidation =>
        _driver.FindElement(By.CssSelector("#cc-number ~ .invalid-feedback"));
    public IWebElement CardExpiration => _driver.FindElement(By.Id("cc-expiration"));
    public IWebElement CardExpirationValidation =>
        _driver.FindElement(By.CssSelector("#cc-expiration ~ .invalid-feedback"));
    public IWebElement CardCVV => _driver.FindElement(By.Id("cc-cvv"));
    public IWebElement CardCVVValidation =>
        _driver.FindElement(By.CssSelector("#cc-cvv ~ .invalid-feedback"));
    public IWebElement SubmitButton =>
        _driver.FindElement(By.XPath("//button[text()='Continue to checkout']"));
}
```

```csharp
public partial class CheckoutPage
{
    public void AssertFormSent()
    {
        Assert.True(_driver.Url.Contains("paymentMethod=on"), "Form not sent");
    }

    public void AssertFirstNameValidationDisplayed()
    {
        Assert.True(FirstNameValidation.Displayed);
    }

    public void AssertLastNameValidationDisplayed()
    {
        Assert.True(LastNameValidation.Displayed);
    }

    public void AssertUsernameValidationDisplayed()
    {
        Assert.True(UsernameValidation.Displayed);
    }

    public void AssertEmailValidationDisplayed()
    {
        Assert.True(EmailValidation.Displayed);
    }

    public void AssertAddress1ValidationDisplayed()
    {
        Assert.True(Address1Validation.Displayed);
    }

    public void AssertCountryValidationDisplayed()
    {
        Assert.True(CountryValidation.Displayed);
    }

    public void AssertStateValidationDisplayed()
    {
        Assert.True(StateValidation.Displayed);
    }

    public void AssertZipValidationDisplayed()
    {
        Assert.True(ZipValidation.Displayed);
    }

    public void AssertCardNameValidationDisplayed()
    {
        Assert.True(CardNameValidation.Displayed);
    }

    public void AssertCardNumberValidationDisplayed()
    {
        Assert.True(CardNumberValidation.Displayed);
    }

    public void AssertCardExpirationValidationDisplayed()
    {
        Assert.True(CardExpirationValidation.Displayed);
    }

    public void AssertCardCVVValidationDisplayed()
    {
        Assert.True(CardCVVValidation.Displayed);
    }
}
```

```csharp
public class CheckoutTests
{
    private IWebDriver _driver;
    private CheckoutPage _checkoutPage;

    [SetUp]
    public void Setup()
    {
        new DriverManager().SetUpDriver(new ChromeConfig(), VersionResolveStrategy.MatchingBrowser);
        ChromeOptions options = new ChromeOptions();
        options.AddArguments("--headless");
        _driver = new ChromeDriver(options);
        _checkoutPage = new CheckoutPage(_driver);
        _checkoutPage.Navigate();
    }

    [TearDown]
    public void TearDown()
    {
        _driver.Quit();
    }

    [Test]
    public void FormSent_When_InfoValid()
    {
        var clientInfo = new ClientInfo(
            FirstName: "Anton",
            LastName: "Angelov",
            Username: "aangelov",
            Email: "info@berlinspaceflowers.com",
            Address1: "1 Willi Brandt Avenue Tiergarten",
            Address2: "Lützowplatz 17",
            Country: 1,
            State: 1,
            Zip: "10115",
            CardName: "Anton Angelov",
            CardNumber: "1234567890123456",
            CardExpiration: "12/23",
            CardCVV: "123"
        );
        _checkoutPage.FillInfo(clientInfo);
        _checkoutPage.AssertFormSent();
    }

    [Test]
    public void ValidatedFirstName_When_FirstNameNotSet()
    {
        var clientInfo = new ClientInfo(
            FirstName: "",
            LastName: "Angelov",
            Username: "aangelov",
            Email: "info@berlinspaceflowers.com",
            Address1: "1 Willi Brandt Avenue Tiergarten",
            Address2: "Lützowplatz 17",
            Country: 1,
            State: 1,
            Zip: "10115",
            CardName: "Anton Angelov",
            CardNumber: "1234567890123456",
            CardExpiration: "12/23",
            CardCVV: "123"
        );
        _checkoutPage.FillInfo(clientInfo);
        _checkoutPage.AssertFirstNameValidationDisplayed();
    }

    // rest of the tests
    [Test]
    public void ValidatedCardCVV_When_CardCVVNotSet()
    {
        var clientInfo = new ClientInfo(
            FirstName: "Anton",
            LastName: "Angelov",
            Username: "aangelov",
            Email: "info@berlinspaceflowers.com",
            Address1: "1 Willi Brandt Avenue Tiergarten",
            Address2: "Lützowplatz 17",
            Country: 1,
            State: 1,
            Zip: "10115",
            CardName: "Anton Angelov",
            CardNumber: "1234567890123456",
            CardExpiration: "12/23",
            CardCVV: ""
        );
        _checkoutPage.FillInfo(clientInfo);
        _checkoutPage.AssertCardCVVValidationDisplayed();
    }
}
```

```yaml
image: "mcr.microsoft.com/dotnet/sdk:5.0"
pipelines: null
default:
  - parallel: null
  - step: null
name: Build and Test
caches:
  - dotnetcore
script:
  - "REPORTS_PATH=./test-reports/build_${BITBUCKET_BUILD_NUMBER}"
  - dotnet build CheckoutTests --configuration Debug
  - >-
    dotnet test CheckoutTests --no-build --configuration Debug
    --logger:"junit;LogFilePath=$REPORTS_PATH/junit.xml"
  - step: null
name: Lint the code
caches:
  - dotnetcore
script:
  - export SOLUTION_NAME=CheckoutTests
  - export REPORTS_PATH=linter-reports
artifacts:
  - linter-reports/**
```

## Quick Guide Bitbucket Pipelines on Running Selenium Java Tests

```java
public class CheckoutTests {
  public WebDriver driver;
  public CheckoutPage page;
  @BeforeAll
  public static void classInit() {
    WebDriverManager.chromedriver().setup();
  }

  @BeforeEach
  public void testInit() {
    ChromeOptions options = new ChromeOptions();
    options.addArguments("--headless");
    driver = new ChromeDriver(options);
    page = new CheckoutPage(driver);
    page.navigate();
  }

  @AfterEach
  public void testCleanup() {
    driver.quit();
  }

  @Test
  public void formSent_When_InfoValid() {
    var clientInfo = new ClientInfo();
    clientInfo.setFirstName("Anton");
    clientInfo.setLastName("Angelov");
    clientInfo.setUsername("aangelov");
    clientInfo.setEmail("info@berlinspaceflowers.com");
    clientInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    clientInfo.setAddress2("Lützowplatz 17");
    clientInfo.setCountry(1);
    clientInfo.setState(1);
    clientInfo.setZip("10115");
    clientInfo.setCardName("Anton Angelov");
    clientInfo.setCardNumber("1234567890123456");
    clientInfo.setCardExpiration("12/23");
    clientInfo.setCardCVV("123");
    page.fillInfo(clientInfo);
    page.assertions().formSent();
  }

  @Test
  public void validatedCardCVV_When_CardCVVNotSet() {
    var clientInfo = new ClientInfo();
    clientInfo.setFirstName("Anton");
    clientInfo.setLastName("Angelov");
    clientInfo.setUsername("aangelov");
    clientInfo.setEmail("infoberlinspaceflowers.com");
    clientInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    clientInfo.setAddress2("Lützowplatz 17");
    clientInfo.setCountry(1);
    clientInfo.setState(1);
    clientInfo.setZip("10115");
    clientInfo.setCardName("Anton Angelov");
    clientInfo.setCardNumber("1234567890123456");
    clientInfo.setCardExpiration("12/23");
    clientInfo.setCardCVV("");
    page.fillInfo(clientInfo);
    page.assertions().validatedCardCVV();
  }
}
```

```yaml
image: "maven:3.6.3"
pipelines: null
default:
  - step: null
caches:
  - maven
script:
  - mvn -B -Dtest=TestAll verify
```

```yaml
image: "markhobson/maven-chrome:jdk-8"
pipelines: null
branches: null
"{ui-automation}":
  - step: null
name: Run UI Tests
script:
  - echo "Running the automated tests...."
  - mvn --version
  - mvn -q test
artifacts:
  - target/html-report/**
```

## Quick Guide GitHub Actions on Running Selenium Java Tests

```java

public class CheckoutTests {
  public WebDriver driver;
  public CheckoutPage page;

  @BeforeAll
  public static void classInit() {
    WebDriverManager.chromedriver().setup();
  }

  @BeforeEach
  public void testInit() {
    ChromeOptions options = new ChromeOptions();
    options.addArguments("--headless");
    driver = new ChromeDriver(options);
    page = new CheckoutPage(driver);
    page.navigate();
  }

  @AfterEach
  public void testCleanup() {
    driver.quit();
  }

  @Test
  public void formSent_When_InfoValid() {
      var clientInfo = new ClientInfo();
      clientInfo.setFirstName("Anton");
      clientInfo.setLastName("Angelov");
      clientInfo.setUsername("aangelov");
      clientInfo.setEmail("info@berlinspaceflowers.com");
      clientInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
      clientInfo.setAddress2("Lützowplatz 17");
      clientInfo.setCountry(1);
      clientInfo.setState(1);
      clientInfo.setZip("10115");
      clientInfo.setCardName("Anton Angelov");
      clientInfo.setCardNumber("1234567890123456");
      clientInfo.setCardExpiration("12/23");
      clientInfo.setCardCVV("123");
      page.fillInfo(clientInfo);
      page.assertions().formSent();
    }

  @Test
  public void validatedCardCVV_When_CardCVVNotSet() {
    var clientInfo = new ClientInfo();
    clientInfo.setFirstName("Anton");
    clientInfo.setLastName("Angelov");
    clientInfo.setUsername("aangelov");
    clientInfo.setEmail("infoberlinspaceflowers.com");
    clientInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    clientInfo.setAddress2("Lützowplatz 17");
    clientInfo.setCountry(1);
    clientInfo.setState(1);
    clientInfo.setZip("10115");
    clientInfo.setCardName("Anton Angelov");
    clientInfo.setCardNumber("1234567890123456");
    clientInfo.setCardExpiration("12/23");
    clientInfo.setCardCVV("");
    page.fillInfo(clientInfo);
    page.assertions().validatedCardCVV();
  }
}
```

```yaml
name: Java CI with Maven
"on": null
workflow_dispatch: null
push: null
branches:
  - master
pull_request: null
branches:
  - master
jobs: null
build: null
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v2
  - name: Set up JDK 15
uses: actions/setup-java@v2
with: null
java-version: '15'
distribution: adopt
  - name: Build with Maven
run: mvn clean test
```

```yaml
name: Test Reporter
uses: dorny/test-reporter@v1.4.3
with:
  name: Run Tests
path: "**/surefire-reports/TEST-*.xml"
reporter: java-junit
```

## Healenium: Self-Healing Library for Selenium-based Automated Tests

```maven
org.junit.jupiter:junit-jupiter-api:5.8.0-M1

org.junit.jupiter:junit-jupiter-engine:5.8.0-M1

org.seleniumhq.selenium:selenium-java:3.141.59

io.github.bonigarcia:webdrivermanager:4.2.2
```

```java
public class LocalPageElements {
  private final WebDriver driver;
  public LocalPageElements(WebDriver driver) {
    this.driver = driver;
  }
  public WebElement firstName() {
    return driver.findElement(By.id("firstName"));
  }
  public WebElement lastName() {
    return driver.findElement(By.id("lastName"));
  }
  public WebElement username() {
    return driver.findElement(By.id("username"));
  }
  public WebElement email() {
    return driver.findElement(By.id("email"));
  }
  public WebElement address1() {
    return driver.findElement(By.id("address"));
  }
  public WebElement address2() {
    return driver.findElement(By.id("address2"));
  }
  public Select country() {
    return new Select(driver.findElement(By.id("country")));
  }
  public Select state() {
    return new Select(driver.findElement(By.id("state")));
  }
  public WebElement zip() {
    return driver.findElement(By.id("zip"));
  }
  public WebElement cardName() {
    return driver.findElement(By.id("cc-name"));
  }
  public WebElement cardNumber() {
    return driver.findElement(By.id("cc-number"));
  }
  public WebElement cardExpiration() {
    return driver.findElement(By.id("cc-expiration"));
  }
  public WebElement cardCVV() {
    return driver.findElement(By.id("cc-cvv"));
  }
  public WebElement submitButton() {
    return driver.findElement(By.xpath("//button[text()='Continue to checkout']"));
  }
}
```

```java
public class LocalPageAssertions {
  private final WebDriver browser;
  public LocalPageAssertions(WebDriver browser) {
    this.browser = browser;
  }
  protected LocalPageElements elements() {
    return new LocalPageElements(browser);
  }
  public void formSent() {
    Assertions.assertTrue(browser.getCurrentUrl().contains("paymentMethod=on"), "Form not sent");
  }
}
```

```java
public class LocalPage {
  private final WebDriver driver;
  private final URL url = getClass().getClassLoader().getResource("checkout/index.html");
  public LocalPage(WebDriver driver) {
    this.driver = driver;
  }
  protected LocalPageElements elements() {
    return new LocalPageElements(driver);
  }
  public LocalPageAssertions assertions() {
    return new LocalPageAssertions(driver);
  }
  public void navigate() {
    driver.navigate().to(url);
  }
  public void fillInfo(ClientInfo clientInfo) {
    elements().firstName().sendKeys(clientInfo.getFirstName());
    elements().lastName().sendKeys(clientInfo.getLastName());
    elements().username().sendKeys(clientInfo.getUsername());
    elements().email().sendKeys(clientInfo.getEmail());
    elements().address1().sendKeys(clientInfo.getAddress1());
    elements().address2().sendKeys(clientInfo.getAddress2());
    elements().country().selectByIndex(clientInfo.getCountry());
    elements().state().selectByIndex(clientInfo.getState());
    elements().zip().sendKeys(clientInfo.getZip());
    elements().cardName().sendKeys(clientInfo.getCardName());
    elements().cardNumber().sendKeys(clientInfo.getCardNumber());
    elements().cardExpiration().sendKeys(clientInfo.getCardExpiration());
    elements().cardCVV().sendKeys(clientInfo.getCardCVV());
    elements().submitButton().click();
  }
}
```

```java
public class HealeniumTests {
  public WebDriver driver;
  @BeforeAll
  public static void classInit() {
    WebDriverManager.firefoxdriver().setup();
  }
  @BeforeEach
  public void testInit() {
    driver = new FirefoxDriver();
  }
  @AfterEach
  public void testCleanup() {
    driver.quit();
  }
  @Test
  public void assertFormSent_When_ValidInfoInput() {
    var localPage = new LocalPage(driver);
    localPage.navigate();
    var clientInfo = new ClientInfo();
    clientInfo.setFirstName("Anton");
    clientInfo.setLastName("Angelov");
    clientInfo.setUsername("aangelov");
    clientInfo.setEmail("info@berlinspaceflowers.com");
    clientInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    clientInfo.setAddress2("Lützowplatz 17");
    clientInfo.setCountry(1);
    clientInfo.setState(1);
    clientInfo.setZip("10115");
    clientInfo.setCardName("Anton Angelov");
    clientInfo.setCardNumber("1234567890123456");
    clientInfo.setCardExpiration("12/23");
    clientInfo.setCardCVV("123");
    localPage.fillInfo(clientInfo);
    localPage.assertions().formSent();
  }
}
```

```java
public void testInit() {
  WebDriver delegate = new FirefoxDriver(); // declare delegate
  driver = SelfHealingDriver.create(delegate); // create Self-healing driver
}
```

```json

recovery-tries = 1
score-cap = 0.5
heal-enabled = true
serverHost = localhost
serverPort = 7878
```

```xml
<pluginRepositories>
   <pluginRepository>
      <id>bintray-healenium</id>
      <url>http://dl.bintray.com/epam/healenium</url>
   </pluginRepository>
</pluginRepositories>
```

```xml
<build>
   <plugins>
      <plugin>
         <groupId>org.apache.maven.plugins</groupId>
         <artifactId>maven-surefire-plugin</artifactId>
         <version>2.22.0</version>
      </plugin>
      <plugin>
         <groupId>com.epam.healenium</groupId>
         <artifactId>hlm-report-mvn</artifactId>
         <version>1.1</version>
         <executions>
            <execution>
               <id>hlmReport</id>
               <phase>compile</phase>
               <goals>
                  <goal>initReport</goal>
               </goals>
            </execution>
            <execution>
               <id>hlmReportB</id>
               <phase>test</phase>
               <goals>
                  <goal>buildReport</goal>
               </goals>
            </execution>
         </executions>
      </plugin>
   </plugins>
</build>
```

## Execute Android Appium Tests in Docker Containers Using Selenoid

```bash
chmod +x cm
```

```bash
touch browsers.json
```

```bash
apt-get install nano
```

```bash
nano browsers.json
```

```json
{
  "chrome": {
    "default": "mobile-79.0",
    "versions": {
      "mobile-79.0": {
        "image": "selenoid/chrome-mobile:79.0",
        "port": "4444",
        "path": "/wd/hub"
      }
    }
  },
  "android": {
    "default": "7.0",
    "versions": {
      "7.0": {
        "image": "selenoid/android:7.0",
        "port": "4444",
        "path": "/wd/hub"
      }
    }
  }
}
```

```bash
cm selenoid update --args "-session-attempt-timeout 2m -service-startup-timeout 2m" --browsers-json browsers.json
```

```bash
cm selenoid-ui start
```

```json
{
  "total": 5,
  "used": 0,
  "queued": 0,
  "pending": 0,
  "browsers": {
    "android": { "6.0": {}, "7.0": {} },
    "chrome": { "mobile-79.0": {} }
  }
}
```

```xml
<ItemGroup>
   <PackageReference Include="Appium.WebDriver" Version="4.1.1" />
   <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.6.1" />
   <PackageReference Include="MSTest.TestAdapter" Version="2.1.2" />
   <PackageReference Include="MSTest.TestFramework" Version="2.1.2" />
</ItemGroup>
```

```csharp
private static AndroidDriver < AndroidElement > _driver;
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    var appiumOptions = new AppiumOptions();
    appiumOptions.AddAdditionalCapability("deviceName", "android");
    appiumOptions.AddAdditionalCapability("appPackage", "io.appium.android.apis");
    appiumOptions.AddAdditionalCapability("version", "6.0");
    appiumOptions.AddAdditionalCapability("appActivity", ".ApiDemos");
    appiumOptions.AddAdditionalCapability("app", "https://exampleFileshare.com/ApiDemos-debug.apk"); // upload ApiDemos-debug.apk fr  Resources folder to public file share.
    appiumOptions.AddAdditionalCapability("enableVNC", true);
    appiumOptions.AddAdditionalCapability("enableVideo", true);
    var timeout = TimeSpan.FromSeconds(120);
    // Change with your Selenoid hub instance URL.
    _driver = new AndroidDriver < AndroidElement > (new Uri("http://127.0.0.1:4444/wd/hub"), appiumOptions, timeout);
    _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(120);
    _driver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(120);
}

[TestCleanup]
public void TestCleanup()
{
  _driver?.CloseApp();
  _driver?.Quit();
  _driver?.Dispose();
}
```

```csharp
[TestMethod]
public void GoToWebSite()
{
    _driver.Navigate().GoToUrl("https://www.bing.com/");
    Console.WriteLine(_driver.PageSource);
    Assert.IsTrue(_driver.PageSource.Contains("Bing"));
}
```

## Execute Tests in Docker Containers Using Selenoid

```bash
./cm selenoid start --vnc
```

```bash
./cm selenoid-ui start
```

```csharp
[TestClass]
[Selenoid(BrowserType.Chrome, "77",
BrowserBehavior.RestartEveryTime, recordVideo: true)]
public class SeleniumGridTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }

    [TestMethod]
    [Selenoid(BrowserType.Chrome, "76", BrowserBehavior.RestartEveryTime, recordVideo: true)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");
        blogLink.Click();
    }
}
```

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version=16.4.0 />
    <PackageReference Include="NUnit" Version=3.12.0 />
    <PackageReference Include="NUnit3TestAdapter" Version=3.15.1 />
    <PackageReference Include="Selenium.Support" Version=3.141.0 />
    <PackageReference Include="Selenium.WebDriver" Version=3.141.0 />
    <PackageReference Include="Selenium.WebDriver.ChromeDriver" Version=79.0.3945.3600 />
</ItemGroup>
```

```csharp
private IWebDriver _driver;
[SetUp]
public void SetupTest()
{
    var driverOptions = new ChromeOptions();
    var runName = GetType().Assembly.GetName().Name;
    var timestamp = $"{DateTime.Now:yyyyMMdd.HHmm}";
    driverOptions.AddAdditionalCapability("name", runName, true);
    driverOptions.AddAdditionalCapability("videoName", $"{runName}.{timestamp}.mp4", true);
    driverOptions.AddAdditionalCapability("logName", $"{runName}.{timestamp}.log", true);
    driverOptions.AddAdditionalCapability("enableVNC", true, true);
    driverOptions.AddAdditionalCapability("enableVideo", true, true);
    driverOptions.AddAdditionalCapability("enableLog", true, true);
    driverOptions.AddAdditionalCapability("screenResolution", "1920x1080x24", true);
    _driver = new RemoteWebDriver(new Uri("http://127.0.0.1:4444/wd/hub"), driverOptions);
    _driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
}
[TearDown]
public void TeardownTest()
{
    _driver.Quit();
}
```

```csharp
[Test]
public void FillAllTextFields()
{
    string testPagePath = "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    _driver.Navigate().GoToUrl(testPagePath);
    var textBoxes = _driver.FindElements(By.Name("fname"));
    foreach (var textBox in textBoxes)
    {
        textBox.SendKeys(Guid.NewGuid().ToString());
    }
}

[Test]
public void FillAllSelects()
{
    string testPagePath = "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    _driver.Navigate().GoToUrl(testPagePath);
    var selects = _driver.FindElements(By.TagName("select"));
    foreach (var select in selects)
    {
        var selectElement = new SelectElement(select);
        selectElement.SelectByText("Mercedes");
    }
}

[Test]
public void FillAllColors()
{
    string testPagePath = "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    _driver.Navigate().GoToUrl(testPagePath);
    var colors = _driver.FindElements(By.XPath("//input[@type='color']"));
    foreach (var color in colors)
    {
        SetValueAttribute(_driver, color, "#000000");
    }
}

[Test]
public void SetAllDates()
{
    string testPagePath = "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    _driver.Navigate().GoToUrl(testPagePath);
    var dates = _driver.FindElements(By.XPath("//input[@type='date']"));
    foreach (var date in dates)
    {
        SetValueAttribute(_driver, date, "2020-06-01");
    }
}
[Test]
public void ClickAllRadioButtons()
{
    string testPagePath = "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    _driver.Navigate().GoToUrl(testPagePath);
    var radioButtons = _driver.FindElements(By.XPath("//input[@type='radio']"));
    foreach (var radio in radioButtons)
    {
        radio.Click();
    }
}

private void SetValueAttribute(IWebDriver driver, IWebElement element, string value)
{
    SetAttribute(driver, element, "value", value);
}

private void SetAttribute(IWebDriver driver, IWebElement element, string attributeName, string attributeValue)
{
    driver.ExecuteJavaScript
    (
    "arguments[0].setAttribute(arguments[1], arguments[2]);",
    element,
    attributeName,
    attributeValue);
}
```

```csharp
[TestFixture]
[Parallelizable(ParallelScope.Children)]
public class RunTestsInSelenoid
```

## Test Automation Reporting with ReportPortal in .NET Projects

```bash
curl https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml -o docker-compose.yml

```

```bash
docker-compose -p reportportal up -d --force-recreate
```

```bash
http://127.0.0.1:8080
```

```bash
default\1q2w3e or superadmin\erebus
```

```csharp
public class Calculator
{
    public int Square(int num) => num * num;
    public int Add(int num1, int num2) => num1 + num2;
    public int Multiply(int num1, int num2) => num1 * num2;
    public int Subtract(int num1, int num2) {
        if (num1 > num2) {
            return num1 - num2;
        }
        return num2 - num1;
    }
    public float Division(float num1, float num2) => num1 / num2;
}
```

```csharp
[TestClass]
public class CalculatorDivisionTests
{
    [TestMethod]
    public void Return4_WhenMultiply2And2()
    {
            var calculator = new Calculator();
            int actualResult = calculator.Multiply(2, 2);
            Assert.AreEqual(4, actualResult);
    }

    [TestMethod]
    public void Return0_WhenMultiply0And0()
    {
            var calculator = new Calculator();
            int actualResult = calculator.Multiply(0, 0);
            Assert.AreEqual(0, actualResult);
    }

    [TestMethod]
    public void ReturnMinus5_WhenMultiply5AndMinus1()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Multiply(5, -1);
        Assert.AreEqual(0, actualResult);
    }
}
```

```json
{
  "$schema": "https://raw.githubusercontent.com/reportportal/agent-net-vstest/master/ReportPortal.VSTest.TestLogger/ReportPortal.config.schema",
  "enabled": true,
  "server": {
    "url": "http://127.0.0.1:8080/api/v1/",
    "project": "superadmin_personal",
    "authentication": {
      "uuid": "d8685bb4-2f2a-4335-9c8b-1f2a5d176d02"
    }
  },
  "launch": {
    "name": "Automate The Planet Test Portal Demo",
    "description": "This is a demo run of the ATP demo examples for a demonstration of Test Portal integration with MSTest tests.",
    "debugMode": false,
    "tags": ["Automate The Planet", "Test Reporting", "MSTEST"]
  }
}
```

```bash
dotnet vstest Bellatrix.Web.Tests.dll --testcasefilter:TestCategory=CI --logger:ReportPortal

```

## Test Automation Reporting with Allure in .NET Projects

```csharp
public class Calculator
{
    public int Square(int num) => num * num;
    public int Add(int num1, int num2) => num1 ez_plus num2;
    public int Multiply(int num1, int num2) => num1 * num2;
    public int Subtract(int num1, int num2)
    {
        if (num1 > num2)
        {
            return num1 - num2;
        }
        return num2 - num1;
    }
    public float Division(float num1, float num2) => num1 / num2;
}
```

```csharp
[TestFixture]
[AllureNUnit]
[AllureSuite("CalculatorTests")]
[AllureDisplayIgnored]
class CalculatorAddTests
{
    [Test(Description = "Add two integers and returns the sum")]
    [AllureTag("CI")]
    [AllureSeverity(SeverityLevel.critical)]
    [AllureIssue("8911")]
    [AllureTms("532")]
    [AllureOwner("Anton")]
    [AllureSubSuite("Add")]
    public void Return4_WhenAdd2And2()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Add(2, 2);
        Assert.AreEqual(4, actualResult);
    }

    [Test(Description = "Add two integers and returns the sum")]
    [AllureTag("CI")]
    [AllureSeverity(SeverityLevel.critical)]
    [AllureSubSuite("Add")]
    public void Return0_WhenAdd0And0()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Add(0, 0);
        Assert.AreEqual(0, actualResult);
    }

    [Test(Description = "Add two integers and returns the sum")]
    [AllureTag("CI")]
    [AllureSeverity(SeverityLevel.critical)]
    [AllureSubSuite("Add")]
    public void ReturnMinus5_WhenAddMinus3AndMinus2()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Add(0, 0);
        Assert.AreEqual(1, actualResult);
    }
}
```

```json
{
  "allure": {
    "directory": "allure-results",
    "links": [
      "https://github.com/AutomateThePlanet/Meissa/issues/{issue}",
      "https://github.com/AutomateThePlanet/Meissa/projects/2#card-{tms}",
      "{link}"
    ]
  }
}
```

```json
[
  {
    "name": "Ignored tests",
    "matchedStatuses": ["skipped"]
  },
  {
    "name": "Product Bug",
    "matchedStatuses": ["broken", "failed"],
    "messageRegex": ".*AssertionException.*"
  },
  {
    "name": "Calculator Problem",
    "matchedStatuses": ["failed"],
    "traceRegex": ".*DivideByZeroException.*"
  }
]
```

```xml
<ItemGroup>
  <Categories Include="categories.json" />
</ItemGroup>
<Target Name="CopyCategoriesToAllureFolder">
  <Copy SourceFiles="@(Categories)" DestinationFolder="$(OutputPath)allure-results" />
</Target>
<Target Name="PostBuild" AfterTargets="PostBuildEvent">
  <CallTarget Targets="CopyCategoriesToAllureFolder" />
</Target>
```

```bash
allure generate "allure-results-directory" --clean
```

```bash
allure open "allure-report-directory"
```

# Commercial Tools

## Execute Appium Tests in the Cloud – pCloudy

```xml
<ItemGroup>
   <PackageReference Include="Appium.WebDriver" Version="4.1.1" />
   <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.6.1" />
   <PackageReference Include="MSTest.TestAdapter" Version="2.1.2" />
   <PackageReference Include="MSTest.TestFramework" Version="2.1.2" />
</ItemGroup>
```

```csharp
[TestClass]
public class AppiumTests
{
    private static AndroidDriver<AndroidElement> _driver;
    [ClassInitialize]
    public static void ClassInitialize(TestContext context)
    {
        var appiumOptions = new AppiumOptions();
        appiumOptions.AddAdditionalCapability("pCloudy_Username", "yourUserName");
        appiumOptions.AddAdditionalCapability("pCloudy_ApiKey", "yourKey");
        appiumOptions.AddAdditionalCapability("pCloudy_DurationInMinutes", 10);
        appiumOptions.AddAdditionalCapability("newCommandTimeout", 600);
        appiumOptions.AddAdditionalCapability("launchTimeout", 90000);
        appiumOptions.AddAdditionalCapability("pCloudy_DeviceFullName", "SAMSUNG_GalaxyJ52016_Android_7.1.1_09c99");
        appiumOptions.AddAdditionalCapability("platformVersion", "09c99");
        appiumOptions.AddAdditionalCapability("platformName", "Android");
        appiumOptions.AddAdditionalCapability("pCloudy_ApplicationName", "ApiDemos-debug.apk");
        appiumOptions.AddAdditionalCapability("appPackage", "io.appium.android.apis");
        appiumOptions.AddAdditionalCapability("appActivity", ".ApiDemos");
        appiumOptions.AddAdditionalCapability("pCloudy_WildNet", "true");
        var timeout = TimeSpan.FromSeconds(120);
        _driver = new AndroidDriver<AndroidElement>(new Uri("https://device.pcloudy.com/appiumcloud/wd/hub"), appiumOptions, timeout);
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(120);
        _driver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(120);
    }

    [TestCleanup]
    public void TestCleanup()
    {
        _driver?.CloseApp();
        _driver?.Quit();
        _driver?.Dispose();
    }

    [TestMethod]
    public void PerformActionsButtons()
    {
        By byScrollLocator = new ByAndroidUIAutomator("new UiSelector().text("
            Views ");");
        var viewsButton = _driver.FindElement(byScrollLocator);
        viewsButton.Click();
        var controlsViewButton = _driver.FindElementByXPath("//*[@text='Controls']");
        controlsViewButton.Click();
        var lightThemeButton = _driver.FindElementByXPath("//*[@text='1. Light Theme']");
        lightThemeButton.Click();
        var saveButton = _driver.FindElementByXPath("//*[@text='Save']");
        Assert.IsTrue(saveButton.Enabled);
    }
}
```

## Execute UI Tests in the Cloud- LambdaTest

```xml
<ItemGroup>
  <PackageReference Include="DotNetSeleniumExtras.WaitHelpers" Version="3.11.0" />
  <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.2.0" />
  <PackageReference Include="coverlet.collector" Version="1.0.1" />
  <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.0.1" />
  <PackageReference Include="NUnit" Version="3.12.0" />
  <PackageReference Include="NUnit3TestAdapter" Version="3.15.1" />
  <PackageReference Include="Selenium.WebDriver" Version="3.141.0" />
  <PackageReference Include="Selenium.WebDriver.ChromeDriver" Version="76.0.3809.12600" />
</ItemGroup>
```

```csharp
[SetUp]
public void SetupTest()
{
    var desiredCapabilities = new DesiredCapabilities();
    desiredCapabilities.SetCapability("build", "1.0");
    desiredCapabilities.SetCapability("browserName", "Chrome");
    desiredCapabilities.SetCapability("platform", "win8");
    desiredCapabilities.SetCapability("version", "76.0");
    desiredCapabilities.SetCapability("screenResolution", "1280x800");
    desiredCapabilities.SetCapability("visual", "true");
    desiredCapabilities.SetCapability("video", "true");
    desiredCapabilities.SetCapability("console", "true");
    desiredCapabilities.SetCapability("network", "true");
    desiredCapabilities.SetCapability("name", TestContext.CurrentContext.Test.Name);
    desiredCapabilities.SetCapability("user", UserName);
    desiredCapabilities.SetCapability("accessKey", AccessKey);
    _driver = new RemoteWebDriver(new Uri("https://hub.lambdatest.com/wd/hub"), desiredCapabilities);
    _driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
}


[TearDown]
public void TeardownTest()
{
    var passed = TestContext.CurrentContext.Result.Outcome == ResultState.Success;
    try
    {
        // Logs the result to LambdaTest
        ((IJavaScriptExecutor)_driver).ExecuteScript("lambda-status=" + (passed ? "passed" : "failed"));
    }
    finally
    {
        _driver.Quit();
    }
}
```

```csharp

[Test]
public void ScrollFocusToControl_InCloud_ShouldFail()
{
    _driver.Navigate().GoToUrl(@"https://automatetheplanet.com/compelling-sunday-14022016/");
    var link = _driver.FindElement(By.PartialLinkText("Previous post"));
    var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
    ((IJavaScriptExecutor)_driver).ExecuteScript(jsToBeExecuted);
    link.Click();
    Assert.AreEqual("10 Advanced WebDriver Tips and Tricks - Part 1", _driver.Title);
}
[Test]
public void ScrollFocusToControl_InCloud_ShouldPass()
{
    _driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
    var link = _driver.FindElement(By.PartialLinkText("TFS Test API"));
    var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
    ((IJavaScriptExecutor)_driver).ExecuteScript(jsToBeExecuted);
    var wait = new WebDriverWait(_driver, TimeSpan.FromMinutes(1));
    var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
    clickableElement.Click();
    Assert.AreEqual("TFS Test API Archives - Automate The Planet", _driver.Title);
}
```

## Execute UI Tests in the Cloud- SauceLabs

```xml
<packages>
    <package id="DotNetSeleniumExtras.WaitHelpers" version="3.11.0" targetFramework="net452" />
    <package id="NUnit" version="3.11.0" targetFramework="net452" />
    <package id="NUnit3TestAdapter" version="3.13.0" targetFramework="net452" />
    <package id="Selenium.Support" version="3.141.0" targetFramework="net452" />
    <package id="Selenium.WebDriver" version="3.141.0" targetFramework="net452" />
    <package id="Selenium.WebDriver.ChromeDriver" version="74.0.3729.6" targetFramework="net452" />
</packages>
```

```csharp
private string _username = "autoCloudTester";
private string _authkey = "70dccdcf-a9fd-4f55-aa07-12b051f6c83e";
private IWebDriver _driver;
[SetUp]
public void SetupTest()
{
    var options = new ChromeOptions();
    options.AddAdditionalCapability("browserstack.debug", "true");
    options.AddAdditionalCapability("build", "1.0");
    options.AddAdditionalCapability("browserName", "Chrome");
    options.AddAdditionalCapability("platform", "Windows 8.1");
    options.AddAdditionalCapability("version", "49.0");
    options.AddAdditionalCapability("screenResolution", "1280x800");
    options.AddAdditionalCapability("username", _username);
    options.AddAdditionalCapability("accessKey", _authkey);
    options.AddAdditionalCapability("name", TestContext.CurrentContext.Test.Name);
    _driver = new RemoteWebDriver(new Uri("http://ondemand.saucelabs.com:80/wd/hub"), options);
    _driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
}

[TearDown]
public void TeardownTest()
{
    var passed = TestContext.CurrentContext.Result.Outcome == ResultState.Success;
    try
    {
        // Logs the result to Sauce Labs
        ((IJavaScriptExecutor)_driver).ExecuteScript("sauce:job-result=" + (passed ? "passed" : "failed"));
    }
    finally
    {
        _driver.Quit();
    }
}
```

```csharp
[Test]
public void ScrollFocusToControl_InCloud_ShouldFail()
{
    _driver.Navigate().GoToUrl(@"https://automatetheplanet.com/compelling-sunday-14022016/");
    var link = _driver.FindElement(By.PartialLinkText("Previous post"));
    var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
    ((IJavaScriptExecutor)_driver).ExecuteScript(jsToBeExecuted);
    link.Click();
    Assert.AreEqual("10 Advanced WebDriver Tips and Tricks - Part 1", _driver.Title);
}
[Test]
public void ScrollFocusToControl_InCloud_ShouldPass()
{
    _driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
    var link = _driver.FindElement(By.PartialLinkText("TFS Test API"));
    var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
    ((IJavaScriptExecutor)_driver).ExecuteScript(jsToBeExecuted);
    var wait = new WebDriverWait(_driver, TimeSpan.FromMinutes(1));
    var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
    clickableElement.Click();
    Assert.AreEqual("TFS Test API Archives - Automate The Planet", _driver.Title);
}
```

## Execute UI Tests in the Cloud- BrowserStack

```xml
<packages>
    <package id="DotNetSeleniumExtras.WaitHelpers" version="3.11.0" targetFramework="net452" />
    <package id="NUnit" version="3.11.0" targetFramework="net452" />
    <package id="NUnit3TestAdapter" version="3.13.0" targetFramework="net452" />
    <package id="Selenium.Support" version="3.141.0" targetFramework="net452" />
    <package id="Selenium.WebDriver" version="3.141.0" targetFramework="net452" />
    <package id="Selenium.WebDriver.ChromeDriver" version="74.0.3729.6" targetFramework="net452" />
</packages>

```

```csharp
private string _username = "soioa1";
private string _authkey = "pnFG3Ky2yLZ5muB1p46P";
private IWebDriver _driver;

[OneTimeSetUp]
public void SetupTest()
{
    var options = new ChromeOptions();
    options.AddAdditionalCapability("browserstack.debug", "true");
    options.AddAdditionalCapability("build", "1.0");
    options.AddAdditionalCapability("os", "Windows");
    options.AddAdditionalCapability("os_version", "10");
    options.AddAdditionalCapability("browser", "Chrome");
    options.AddAdditionalCapability("browser_version", "65.0");
    options.AddAdditionalCapability("resolution", "1366x768");
    options.AddAdditionalCapability("browserstack.video", "false");
    options.AddAdditionalCapability("build", "version1");
    options.AddAdditionalCapability("project", "AutomateThePlanet");
    options.AddAdditionalCapability("browserstack.user", _username);
    options.AddAdditionalCapability("browserstack.key", _authkey);
    _driver = new RemoteWebDriver(new Uri("http://hub-cloud.browserstack.com/wd/hub/"), options);
    //_driver = new ChromeDriver();
    ////_driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
}

[OneTimeTearDown]
public void TeardownTest()
{
    _driver.Quit();
}
```

```csharp
[Test]
public void ScrollFocusToControl_InCloud_ShouldFail()
{
    _driver.Navigate().GoToUrl(@"https://automatetheplanet.com/compelling-sunday-14022016/");
    var link = _driver.FindElement(By.PartialLinkText("Previous post"));
    var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
    ((IJavaScriptExecutor)_driver).ExecuteScript(jsToBeExecuted);
    link.Click();
    Assert.AreEqual("10 Advanced WebDriver Tips and Tricks - Part 1", _driver.Title);
}

[Test]
public void ScrollFocusToControl_InCloud_ShouldPass()
{
    _driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
    var link = _driver.FindElement(By.PartialLinkText("TFS Test API"));
    var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
    ((IJavaScriptExecutor)_driver).ExecuteScript(jsToBeExecuted);
    var wait = new WebDriverWait(_driver, TimeSpan.FromMinutes(1));
    var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
    clickableElement.Click();
    Assert.AreEqual("TFS Test API Archives - Automate The Planet", _driver.Title);
}
```

## Execute UI Tests in the Cloud- Cross Browser Testing

```xml
<packages>
    <package id="DotNetSeleniumExtras.WaitHelpers" version="3.11.0" targetFramework="net452" />
    <package id="NUnit" version="3.11.0" targetFramework="net452" />
    <package id="NUnit3TestAdapter" version="3.13.0" targetFramework="net452" />
    <package id="Selenium.Support" version="3.141.0" targetFramework="net452" />
    <package id="Selenium.WebDriver" version="3.141.0" targetFramework="net452" />
    <package id="Selenium.WebDriver.ChromeDriver" version="74.0.3729.6" targetFramework="net452" />
</packages>
```

```csharp
private string _username = "autoCloudTester@yahoo.com";
private string _authkey = "u4f3bb3b861ee342";
private IWebDriver _driver;
[SetUp]
public void SetupTest()
{
    var options = new ChromeOptions();
    options.AddAdditionalCapability("name", "Basic Example");
    options.AddAdditionalCapability("build", "1.0");
    options.AddAdditionalCapability("browser_api_name", "Chrome58");
    options.AddAdditionalCapability("os_api_name", "Win10-E15");
    options.AddAdditionalCapability("screen_resolution", "1366x768");
    options.AddAdditionalCapability("record_video", "true");
    options.AddAdditionalCapability("record_network", "true");
    options.AddAdditionalCapability("username", _username);
    options.AddAdditionalCapability("password", _authkey);
    _driver = new RemoteWebDriver(new Uri("http://hub.crossbrowsertesting.com:80/wd/hub"), options);
}

[TearDown]
public void TeardownTest()
{
    _driver.Quit();
}
```

```csharp
private string _username = "autoCloudTester@yahoo.com";
private string _authkey = "u4f3bb3b861ee342";
private IWebDriver _driver;
[SetUp]
public void SetupTest()
{
    var caps = new DesiredCapabilities();
    caps.SetCapability("name", "Basic Example");
    caps.SetCapability("build", "1.0");
    caps.SetCapability("browser_api_name", "FF46");
    caps.SetCapability("os_api_name", "Mac10.11");
    caps.SetCapability("screen_resolution", "1400x900");
    caps.SetCapability("record_video", "true");
    caps.SetCapability("record_network", "true");
    caps.SetCapability("username", _username);
    caps.SetCapability("password", _authkey);
    _driver = new RemoteWebDriver(new Uri("http://hub.crossbrowsertesting.com:80/wd/hub"), caps, TimeSpan.FromSeconds(180));
}
```

```csharp
[Test]
public void ScrollFocusToControl_InCloud_ShouldFail()
{
    _driver.Navigate().GoToUrl(@"http://automatetheplanet.com/compelling-sunday-14022016/");
    var link = _driver.FindElement(By.PartialLinkText("Previous post"));
    var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
    ((IJavaScriptExecutor)_driver).ExecuteScript(jsToBeExecuted);
    link.Click();
    Assert.AreEqual("10 Advanced WebDriver Tips and Tricks - Part 1", _driver.Title);
}

[Test]
public void ScrollFocusToControl_InCloud_ShouldPass()
{
    _driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
    var link = _driver.FindElement(By.PartialLinkText("TFS Test API"));
    var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
    ((IJavaScriptExecutor)_driver).ExecuteScript(jsToBeExecuted);
    var wait = new WebDriverWait(_driver, TimeSpan.FromMinutes(1));
    var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
    clickableElement.Click();
    Assert.AreEqual("TFS Test API Archives - Automate The Planet", _driver.Title);
}
```
