---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

## Advanced Strategy Design Pattern in Automated Testing Java Code

```java
public interface OrderPurchaseStrategy {
  void assertOrderSummary(double itemPrice, PurchaseInfo purchaseInfo);
  void validatePurchaseInfo(PurchaseInfo purchaseInfo);
}
```

==========================================================================

```java
public class VatTaxOrderPurchaseStrategy implements OrderPurchaseStrategy {

  private final VatTaxCalculationService vatTaxCalculationService;

  public VatTaxOrderPurchaseStrategy() {
    vatTaxCalculationService = new VatTaxCalculationService();
  }

  @Override
  public void assertOrderSummary(double itemPrice, PurchaseInfo purchaseInfo) {
    var currentCountry = Arrays
      .stream(Country.values())
      .filter(country -> country.toString().equals(purchaseInfo.getCountry()))
      .toArray(Country[]::new)[0];
    var vatTax = vatTaxCalculationService.calculate(
      itemPrice,
      currentCountry,
      purchaseInfo
    );
    var checkoutPage = new CheckoutPage();
    Driver.waitForAjax();
    Driver.waitUntilPageLoadsCompletely();
    checkoutPage.assertions().assertOrderVatTaxPrice(vatTax);
  }

  @Override
  public void validatePurchaseInfo(PurchaseInfo purchaseInfo) {
    if (
      !Arrays.asList(VatCountry.values()).contains(purchaseInfo.getCountry())
    ) {
      throw new IllegalArgumentException(
        "If VatTaxOrderPurchaseStrategy is used, country should be set to one of the VAT countries because otherwise no VAT is going to be applied."
      );
    }
  }
}

```

==========================================================================

```java
public class PurchaseContext {

  private final OrderPurchaseStrategy orderPurchaseStrategy;
  private final ItemPage itemPage;
  private final ShoppingCartPage shoppingCartPage;
  private final CheckoutPage checkoutPage;

  public PurchaseContext(OrderPurchaseStrategy orderPurchaseStrategy) {
    this.orderPurchaseStrategy = orderPurchaseStrategy;
    itemPage = new ItemPage();
    shoppingCartPage = new ShoppingCartPage();
    checkoutPage = new CheckoutPage();
  }

  public void purchaseItem(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    itemPage.navigate(itemUrl);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    checkoutPage.fillBillingInfo(purchaseInfo);
    orderPurchaseStrategy.assertOrderSummary(itemPrice, purchaseInfo);
  }
}

```

==========================================================================

```java
public class PurchaseContext {

  private final OrderPurchaseStrategy[] orderPurchaseStrategies;
  private final ItemPage itemPage;
  private final ShoppingCartPage shoppingCartPage;
  private final CheckoutPage checkoutPage;

  public PurchaseContext(OrderPurchaseStrategy... orderPurchaseStrategies) {
    this.orderPurchaseStrategies = orderPurchaseStrategies;
    itemPage = new ItemPage();
    shoppingCartPage = new ShoppingCartPage();
    checkoutPage = new CheckoutPage();
  }

  public void purchaseItem(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    validatePurchaseInfo(purchaseInfo);
    itemPage.navigate(itemUrl);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    checkoutPage.fillBillingInfo(purchaseInfo);
    validateOrderSummary(itemPrice, purchaseInfo);
  }

  public void validatePurchaseInfo(PurchaseInfo purchaseInfo) {
    for (var currentStrategy : orderPurchaseStrategies) {
      currentStrategy.validatePurchaseInfo(purchaseInfo);
    }
  }

  public void validateOrderSummary(
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    for (var currentStrategy : orderPurchaseStrategies) {
      currentStrategy.assertOrderSummary(itemPrice, purchaseInfo);
    }
  }
}

```

==========================================================================

```java
public PurchaseContext(OrderPurchaseStrategy... orderPurchaseStrategies) {
    this.orderPurchaseStrategies = orderPurchaseStrategies;
    itemPage = new ItemPage();
    shoppingCartPage = new ShoppingCartPage();
    checkoutPage = new CheckoutPage();
}
```

==========================================================================

```java
public class StorePurchaseStrategyTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void totalPriceCalculatedCorrect_when_AtCheckoutAndStrategyPatternUsed() {
    var itemUrl = "falcon-9";
    var itemPrice = 50.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    new PurchaseContext(new VatTaxOrderPurchaseStrategy())
      .purchaseItem(itemUrl, itemPrice, purchaseInfo);
  }
}

```

==========================================================================

```java
public class StorePurchaseAdvancedStrategyTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void totalPriceCalculatedCorrect_when_AtCheckoutAndAdvancedStrategyPatternUsed() {
    var itemUrl = "falcon-9";
    var itemPrice = 50.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    purchaseInfo.setCouponCode("happybirthday");
    new PurchaseContext(
      new VatTaxOrderPurchaseStrategy(),
      new CouponCodeOrderPurchaseStrategy()
    )
      .purchaseItem(itemUrl, itemPrice, purchaseInfo);
  }
}

```

==========================================================================

## Decorator Design Pattern in Automated Testing Java Code

```java
public class PurchaseContext {

  private final OrderPurchaseStrategy orderPurchaseStrategy;
  private final ItemPage itemPage;
  private final ShoppingCartPage shoppingCartPage;
  private final CheckoutPage checkoutPage;

  public PurchaseContext(OrderPurchaseStrategy orderPurchaseStrategy) {
    this.orderPurchaseStrategy = orderPurchaseStrategy;
    itemPage = new ItemPage();
    shoppingCartPage = new ShoppingCartPage();
    checkoutPage = new CheckoutPage();
  }

  public void purchaseItem(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    itemPage.navigate(itemUrl);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    checkoutPage.fillBillingInfo(purchaseInfo);
    orderPurchaseStrategy.assertOrderSummary(itemPrice, purchaseInfo);
  }
}
```

```java
public class PurchaseContext {

  private final OrderPurchaseStrategy[] orderPurchaseStrategies;
  private final ItemPage itemPage;
  private final ShoppingCartPage shoppingCartPage;
  private final CheckoutPage checkoutPage;

  public PurchaseContext(OrderPurchaseStrategy... orderPurchaseStrategies) {
    this.orderPurchaseStrategies = orderPurchaseStrategies;
    itemPage = new ItemPage();
    shoppingCartPage = new ShoppingCartPage();
    checkoutPage = new CheckoutPage();
  }

  public void purchaseItem(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    validatePurchaseInfo(purchaseInfo);
    itemPage.navigate(itemUrl);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    checkoutPage.fillBillingInfo(purchaseInfo);
    validateOrderSummary(itemPrice, purchaseInfo);
  }

  public void validatePurchaseInfo(PurchaseInfo purchaseInfo) {
    for (var currentStrategy : orderPurchaseStrategies) {
      currentStrategy.validatePurchaseInfo(purchaseInfo);
    }
  }

  public void validateOrderSummary(
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    for (var currentStrategy : orderPurchaseStrategies) {
      currentStrategy.assertOrderSummary(itemPrice, purchaseInfo);
    }
  }
}

```

```java
new PurchaseContext(new VatTaxOrderPurchaseStrategy(), new CouponCodeOrderPurchaseStrategy())
.purchaseItem(itemUrl, itemPrice, purchaseInfo);
```

```java
public abstract class OrderPurchaseStrategy {

  public abstract double calculateTotalPrice();

  public abstract void assertOrderSummary(double totalPrice);
}

```

```java
public class TotalPriceOrderPurchaseStrategy extends OrderPurchaseStrategy {

  private final double itemsPrice;

  public TotalPriceOrderPurchaseStrategy(double itemsPrice) {
    this.itemsPrice = itemsPrice;
  }

  @Override
  public double calculateTotalPrice() {
    return itemsPrice;
  }

  @Override
  public void assertOrderSummary(double totalPrice) {
    var checkoutPage = new CheckoutPage();
    Driver.waitForAjax();
    Driver.waitUntilPageLoadsCompletely();
    checkoutPage.assertions().assertOrderTotalPrice(totalPrice);
  }
}
```

```java

public class OrderPurchaseStrategyDecorator extends OrderPurchaseStrategy {

  protected final OrderPurchaseStrategy orderPurchaseStrategy;
  protected final PurchaseInfo purchaseInfo;
  protected final double itemPrice;

  public OrderPurchaseStrategyDecorator(
    OrderPurchaseStrategy orderPurchaseStrategy,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    this.orderPurchaseStrategy = orderPurchaseStrategy;
    this.itemPrice = itemPrice;
    this.purchaseInfo = purchaseInfo;
  }

  @Override
  public double calculateTotalPrice() {
    validateOrderStrategy();
    return orderPurchaseStrategy.calculateTotalPrice();
  }

  @Override
  public void assertOrderSummary(double totalPrice) {
    validateOrderStrategy();
    orderPurchaseStrategy.assertOrderSummary(totalPrice);
  }

  private void validateOrderStrategy() {
    if (orderPurchaseStrategy == null) {
      throw new NullPointerException(
        "The OrderPurchaseStrategy should be first initialized."
      );
    }
  }
}
```

```java
public class VatTaxOrderPurchaseStrategy
  extends OrderPurchaseStrategyDecorator {

  private final VatTaxCalculationService vatTaxCalculationService;
  private final CouponCodeCalculationService couponCodeCalculationService;
  private double vatTax;

  public VatTaxOrderPurchaseStrategy(
    OrderPurchaseStrategy orderPurchaseStrategy,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    super(orderPurchaseStrategy, itemPrice, purchaseInfo);
    vatTaxCalculationService = new VatTaxCalculationService();
    couponCodeCalculationService = new CouponCodeCalculationService();
  }

  @Override
  public double calculateTotalPrice() {
    var currentCountry = Arrays
      .stream(Country.values())
      .filter(country -> country.toString().equals(purchaseInfo.getCountry()))
      .toArray(Country[]::new)[0];
    vatTax =
      vatTaxCalculationService.calculate(
        (
          itemPrice -
          couponCodeCalculationService.calculate(
            itemPrice,
            purchaseInfo.getCouponCode()
          )
        ),
        currentCountry
      );
    return orderPurchaseStrategy.calculateTotalPrice() + vatTax;
  }
}
```

```java
public class CouponCodeOrderPurchaseStrategy
  extends OrderPurchaseStrategyDecorator {

  private final CouponCodeCalculationService couponCodeCalculationService;
  private double discount;

  public CouponCodeOrderPurchaseStrategy(
    OrderPurchaseStrategy orderPurchaseStrategy,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    super(orderPurchaseStrategy, itemPrice, purchaseInfo);
    couponCodeCalculationService = new CouponCodeCalculationService();
  }

  @Override
  public double calculateTotalPrice() {
    discount =
      couponCodeCalculationService.calculate(
        itemPrice,
        purchaseInfo.getCouponCode()
      );
    return orderPurchaseStrategy.calculateTotalPrice() - discount;
  }
}

```

```java
public class PurchaseContext {

  private final OrderPurchaseStrategy orderPurchaseStrategy;
  private final ItemPage itemPage;
  private final ShoppingCartPage shoppingCartPage;
  private final CheckoutPage checkoutPage;

  public PurchaseContext(OrderPurchaseStrategy orderPurchaseStrategy) {
    this.orderPurchaseStrategy = orderPurchaseStrategy;
    itemPage = new ItemPage();
    shoppingCartPage = new ShoppingCartPage();
    checkoutPage = new CheckoutPage();
  }

  public void purchaseItem(String itemUrl, PurchaseInfo clientPurchaseInfo) {
    itemPage.navigate(itemUrl);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    checkoutPage.fillBillingInfo(clientPurchaseInfo);
    var expectedTotalPrice = orderPurchaseStrategy.calculateTotalPrice();
    orderPurchaseStrategy.assertOrderSummary(expectedTotalPrice);
  }
}

```

```java
public void validatePurchaseInfo(PurchaseInfo purchaseInfo) {
    for (var currentStrategy : orderPurchaseStrategies) {
        currentStrategy.validatePurchaseInfo(purchaseInfo);
    }
}
public void validateOrderSummary(double itemPrice, PurchaseInfo purchaseInfo) {
    for (var currentStrategy : orderPurchaseStrategies) {
        currentStrategy.assertOrderSummary(itemPrice, purchaseInfo);
    }
}
```

```java
public class StorePurchaseDecoratedStrategiesTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void totalPriceCalculatedCorrect_when_AtCheckoutAndDecoratedStrategyPatternUsed() {
    var itemUrl = "falcon-9";
    var itemPrice = 50.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    purchaseInfo.setCouponCode("happybirthday");
    OrderPurchaseStrategy orderPurchaseStrategy = new TotalPriceOrderPurchaseStrategy(
      itemPrice
    );
    orderPurchaseStrategy =
      new VatTaxOrderPurchaseStrategy(
        orderPurchaseStrategy,
        itemPrice,
        purchaseInfo
      );
    orderPurchaseStrategy =
      new CouponCodeOrderPurchaseStrategy(
        orderPurchaseStrategy,
        itemPrice,
        purchaseInfo
      );
    new PurchaseContext(orderPurchaseStrategy)
      .purchaseItem(itemUrl, purchaseInfo);
  }
}
```

```java
OrderPurchaseStrategy orderPurchaseStrategy = new TotalPriceOrderPurchaseStrategy(itemPrice);
orderPurchaseStrategy = new VatTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, purchaseInfo);
orderPurchaseStrategy = new CouponCodeOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, purchaseInfo);
new PurchaseContext(orderPurchaseStrategy).purchaseItem(itemUrl, purchaseInfo);
```

## Strategy Design Pattern in Automated Testing Java Code

```java
public class CheckoutPage
  extends BasePage<CheckoutElements, CheckoutAssertions> {

  @Override
  protected String getUrl() {
    return "http://demos.bellatrix.solutions/checkout/";
  }

  public void fillBillingInfo(PurchaseInfo purchaseInfo) {
    if (purchaseInfo.getCouponCode() != null) {
      elements().couponCodeShowInputButton().click();
      Driver
        .getBrowserWait()
        .until(
          ExpectedConditions.elementToBeClickable(elements().couponCodeInput())
        );
      elements().couponCodeInput().sendKeys(purchaseInfo.getCouponCode());
      elements().couponCodeApplyButton().click();
    }
    elements().billingFirstName().sendKeys(purchaseInfo.getFirstName());
    elements().billingLastName().sendKeys(purchaseInfo.getLastName());
    elements().billingCompany().sendKeys(purchaseInfo.getCompany());
    elements().billingCountryWrapper().click();
    elements().billingCountryFilter().sendKeys(purchaseInfo.getCountry());
    elements().getCountryOptionByName(purchaseInfo.getCountry()).click();
    elements().billingAddress1().sendKeys(purchaseInfo.getAddress1());
    elements().billingAddress2().sendKeys(purchaseInfo.getAddress2());
    elements().billingCity().sendKeys(purchaseInfo.getCity());
    elements().billingZip().sendKeys(purchaseInfo.getZip());
    elements().billingPhone().sendKeys(purchaseInfo.getPhone());
    elements().billingEmail().sendKeys(purchaseInfo.getEmail());
    if (purchaseInfo.getShouldCreateAccount()) {
      elements().createAccountCheckBox().click();
    }
    if (purchaseInfo.getShouldCheckPayment()) {
      elements().checkPaymentsRadioButton().click();
    }
    Driver.waitForAjax();
    Driver
      .getBrowserWait()
      .until(
        ExpectedConditions.elementToBeClickable(elements().placeOrderButton())
      );
    Driver
      .getBrowserWait()
      .until(
        ExpectedConditions.invisibilityOfElementLocated(
          By.xpath("//div[@class='blockUI blockOverlay']")
        )
      );
    elements().placeOrderButton().click();
  }
}

```

```java
public class PurchaseInfo {

  private String firstName;
  private String lastName;
  private String company;
  private String country;
  private String address1;
  private String address2;
  private String city;
  private String zip;
  private String phone;
  private String email;
  private Boolean shouldCreateAccount = false;
  private Boolean shouldCheckPayment = false;
  private String couponCode = null;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getAddress1() {
    return address1;
  }

  public void setAddress1(String address1) {
    this.address1 = address1;
  }

  public String getAddress2() {
    return address2;
  }

  public void setAddress2(String address2) {
    this.address2 = address2;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getZip() {
    return zip;
  }

  public void setZip(String zip) {
    this.zip = zip;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Boolean getShouldCreateAccount() {
    return shouldCreateAccount;
  }

  public void setShouldCreateAccount(Boolean shouldCreateAccount) {
    this.shouldCreateAccount = shouldCreateAccount;
  }

  public Boolean getShouldCheckPayment() {
    return shouldCheckPayment;
  }

  public void setShouldCheckPayment(Boolean shouldCheckPayment) {
    this.shouldCheckPayment = shouldCheckPayment;
  }

  public String getCouponCode() {
    return couponCode;
  }

  public void setCouponCode(String couponCode) {
    this.couponCode = couponCode;
  }
}

```

```java
public class PurchaseFacade {

  private final ItemPage itemPage;
  private final ShoppingCartPage shoppingCartPage;
  private final CheckoutPage checkoutPage;

  public PurchaseFacade(
    ItemPage itempage,
    ShoppingCartPage shoppingCartPage,
    CheckoutPage checkoutPage
  ) {
    this.itemPage = itempage;
    this.shoppingCartPage = shoppingCartPage;
    this.checkoutPage = checkoutPage;
  }

  public void purchaseItemNoTax(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    purchaseItemInternal(itemUrl, itemPrice, purchaseInfo);
    checkoutPage.assertVatTax(0);
  }

  public void purchaseItemVatTax(
    String itemUrl,
    double itemPrice,
    double vatTax,
    PurchaseInfo purchaseInfo
  ) {
    purchaseItemInternal(itemUrl, itemPrice, purchaseInfo);
    checkoutPage.assertVatTax(vatTax);
  }

  public void purchaseItemCouponCode(
    String itemUrl,
    double itemPrice,
    double discount,
    PurchaseInfo purchaseInfo
  ) {
    purchaseItemInternal(itemUrl, itemPrice, purchaseInfo);
    checkoutPage.assertDiscount(discount);
  }

  private void purchaseItemInternal(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    itemPage.navigate(itemUrl);
    itemPage.assertPrice(itemPrice);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    shoppingCartPage.assertSubtotalAmount(itemPrice);
    checkoutPage.fillBillingInfo(purchaseInfo);
    checkoutPage.assertSubtotal(itemPrice);
  }
}

```

```java
public interface OrderPurchaseStrategy {
void assertOrderSummary(double itemPrice, PurchaseInfo purchaseInfo);
}

```

```java
public class PurchaseContext {

  private final OrderPurchaseStrategy orderPurchaseStrategy;
  private final ItemPage itemPage;
  private final ShoppingCartPage shoppingCartPage;
  private final CheckoutPage checkoutPage;

  public PurchaseContext(OrderPurchaseStrategy orderPurchaseStrategy) {
    this.orderPurchaseStrategy = orderPurchaseStrategy;
    itemPage = new ItemPage();
    shoppingCartPage = new ShoppingCartPage();
    checkoutPage = new CheckoutPage();
  }

  public void purchaseItem(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    itemPage.navigate(itemUrl);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    checkoutPage.fillBillingInfo(purchaseInfo);
    orderPurchaseStrategy.assertOrderSummary(itemPrice, purchaseInfo);
  }
}

```

```java
public class VatTaxOrderPurchaseStrategy implements OrderPurchaseStrategy {

  private final VatTaxCalculationService vatTaxCalculationService;

  public VatTaxOrderPurchaseStrategy() {
    vatTaxCalculationService = new VatTaxCalculationService();
  }

  @Override
  public void assertOrderSummary(double itemPrice, PurchaseInfo purchaseInfo) {
    var currentCountry = Arrays
      .stream(Country.values())
      .filter(country -> country.toString().equals(purchaseInfo.getCountry()))
      .toArray(Country[]::new)[0];
    var vatTax = vatTaxCalculationService.calculate(
      itemPrice,
      currentCountry,
      purchaseInfo
    );
    var checkoutPage = new CheckoutPage();
    Driver.waitForAjax();
    Driver.waitUntilPageLoadsCompletely();
    checkoutPage.assertions().assertOrderVatTaxPrice(vatTax);
  }
}

```

```java
public class CouponCodeOrderPurchaseStrategy implements OrderPurchaseStrategy {

  private final CouponCodeCalculationService couponCodeCalculationService;

  public CouponCodeOrderPurchaseStrategy() {
    couponCodeCalculationService = new CouponCodeCalculationService();
  }

  @Override
  public void assertOrderSummary(double itemPrice, PurchaseInfo purchaseInfo) {
    var discount = couponCodeCalculationService.calculate(
      itemPrice,
      purchaseInfo.getCouponCode()
    );
    var checkoutPage = new CheckoutPage();
    Driver.waitForAjax();
    Driver.waitUntilPageLoadsCompletely();
    checkoutPage.assertions().assertOrderDiscountPrice(discount);
  }
}

```

```java
public class StorePurchaseStrategyTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void totalPriceCalculatedCorrect_when_AtCheckoutAndStrategyPatternUsed() {
    var itemUrl = "falcon-9";
    var itemPrice = 50.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    new PurchaseContext(new VatTaxOrderPurchaseStrategy())
      .purchaseItem(itemUrl, itemPrice, purchaseInfo);
  }
}

```

## Facade Design Pattern in Automated Testing Java Code

```java
public class BellatrixDemoCheckoutPage
  extends BasePage<BellatrixDemoCheckoutElements, BellatrixDemoCheckoutAssertions> {

  @Override
  protected String getUrl() {
    return "http://demos.bellatrix.solutions/checkout/";
  }

  public void fillBillingInfo(PurchaseInfo purchaseInfo) {
    if (purchaseInfo.getCouponCode() != null) {
      elements().couponCodeShowInputButton().click();
      Driver
        .getBrowserWait()
        .until(
          ExpectedConditions.elementToBeClickable(elements().couponCodeInput())
        );
      elements().couponCodeInput().sendKeys(purchaseInfo.getCouponCode());
      elements().couponCodeApplyButton().click();
    }
    elements().billingFirstName().sendKeys(purchaseInfo.getFirstName());
    elements().billingLastName().sendKeys(purchaseInfo.getLastName());
    elements().billingCompany().sendKeys(purchaseInfo.getCompany());
    elements().billingCountryWrapper().click();
    elements().billingCountryFilter().sendKeys(purchaseInfo.getCountry());
    elements().getCountryOptionByName(purchaseInfo.getCountry()).click();
    elements().billingAddress1().sendKeys(purchaseInfo.getAddress1());
    elements().billingAddress2().sendKeys(purchaseInfo.getAddress2());
    elements().billingCity().sendKeys(purchaseInfo.getCity());
    elements().billingZip().sendKeys(purchaseInfo.getZip());
    elements().billingPhone().sendKeys(purchaseInfo.getPhone());
    elements().billingEmail().sendKeys(purchaseInfo.getEmail());
    if (purchaseInfo.getShouldCreateAccount()) {
      elements().createAccountCheckBox().click();
    }
    if (purchaseInfo.getShouldCheckPayment()) {
      elements().checkPaymentsRadioButton().click();
    }
    Driver.waitForAjax();
    Driver
      .getBrowserWait()
      .until(
        ExpectedConditions.elementToBeClickable(elements().placeOrderButton())
      );
    Driver
      .getBrowserWait()
      .until(
        ExpectedConditions.invisibilityOfElementLocated(
          By.xpath("//div[@class='blockUI blockOverlay']")
        )
      );
    elements().placeOrderButton().click();
  }
}

```

```java
public class PurchaseInfo {

  private String firstName;
  private String lastName;
  private String company;
  private String country;
  private String address1;
  private String address2;
  private String city;
  private String zip;
  private String phone;
  private String email;
  private Boolean shouldCreateAccount = false;
  private Boolean shouldCheckPayment = false;
  private String couponCode = null;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getAddress1() {
    return address1;
  }

  public void setAddress1(String address1) {
    this.address1 = address1;
  }

  public String getAddress2() {
    return address2;
  }

  public void setAddress2(String address2) {
    this.address2 = address2;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getZip() {
    return zip;
  }

  public void setZip(String zip) {
    this.zip = zip;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Boolean getShouldCreateAccount() {
    return shouldCreateAccount;
  }

  public void setShouldCreateAccount(Boolean shouldCreateAccount) {
    this.shouldCreateAccount = shouldCreateAccount;
  }

  public Boolean getShouldCheckPayment() {
    return shouldCheckPayment;
  }

  public void setShouldCheckPayment(Boolean shouldCheckPayment) {
    this.shouldCheckPayment = shouldCheckPayment;
  }

  public String getCouponCode() {
    return couponCode;
  }

  public void setCouponCode(String couponCode) {
    this.couponCode = couponCode;
  }
}

```

```java
public class BellatrixDemoCheckoutElements extends BaseElements {

  public WebElement billingFirstName() {
    return browser.findElement(By.id("billing_first_name"));
  }

  public WebElement billingLastName() {
    return browser.findElement(By.id("billing_last_name"));
  }

  public WebElement billingCompany() {
    return browser.findElement(By.id("billing_company"));
  }

  public WebElement billingCountryWrapper() {
    return browser.findElement(By.id("select2-billing_country-container"));
  }

  public WebElement billingCountryFilter() {
    return browser.findElement(By.className("select2-search__field"));
  }

  public WebElement billingAddress1() {
    return browser.findElement(By.id("billing_address_1"));
  }

  public WebElement billingAddress2() {
    return browser.findElement(By.id("billing_address_2"));
  }

  public WebElement billingCity() {
    return browser.findElement(By.id("billing_city"));
  }

  public WebElement billingZip() {
    return browser.findElement(By.id("billing_postcode"));
  }

  public WebElement billingPhone() {
    return browser.findElement(By.id("billing_phone"));
  }

  public WebElement billingEmail() {
    return browser.findElement(By.id("billing_email"));
  }

  public WebElement couponCodeShowInputButton() {
    return browser.findElement(By.className("showcoupon"));
  }

  public WebElement couponCodeInput() {
    return browser.findElement(By.id("coupon_code"));
  }

  public WebElement couponCodeApplyButton() {
    return browser.findElement(By.name("apply_coupon"));
  }

  public WebElement createAccountCheckBox() {
    return browser.findElement(By.id("createaccount"));
  }

  public WebElement checkPaymentsRadioButton() {
    return browser.findElement(
      By.cssSelector("[for*='payment_method_cheque']")
    );
  }

  public WebElement placeOrderButton() {
    return browser.findElement(By.id("place_order"));
  }

  public WebElement orderDetailsSubtotal() {
    String locator = "//th[text()='Subtotal:']/following-sibling::td/span";
    browserWait.until(
      ExpectedConditions.presenceOfElementLocated(By.xpath(locator))
    );
    return browser.findElement(By.xpath(locator));
  }
}

```

```java
public class StorePurchaseWithoutFacadeTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void subtotalPriceOfFalcon9CalculatedCorrect_when_NoFacadePatternUsed() {
    var itemUrl = "falcon-9";
    var itemPrice = 50.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    var itemPage = new BellatrixDemoItemPage();
    var shoppingCartPage = new BellatrixDemoShoppingCartPage();
    var checkoutPage = new BellatrixDemoCheckoutPage();
    itemPage.navigate(itemUrl);
    itemPage.assertions().assertProductPrice(itemPrice);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    shoppingCartPage.assertions().assertShoppingCartSubtotalPrice(itemPrice);
    checkoutPage.fillBillingInfo(purchaseInfo);
    checkoutPage.assertions().assertOrderSubtotalPrice(itemPrice);
  }

  @Test
  public void subtotalPriceOfSaturnVCalculatedCorrect_when_NoFacadePatternUsed() {
    var itemUrl = "saturn-v";
    var itemPrice = 120.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    var itemPage = new BellatrixDemoItemPage();
    var shoppingCartPage = new BellatrixDemoShoppingCartPage();
    var checkoutPage = new BellatrixDemoCheckoutPage();
    itemPage.navigate(itemUrl);
    itemPage.assertions().assertProductPrice(itemPrice);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    shoppingCartPage.assertions().assertShoppingCartSubtotalPrice(itemPrice);
    checkoutPage.fillBillingInfo(purchaseInfo);
    checkoutPage.assertions().assertOrderSubtotalPrice(itemPrice);
  }
}

```

```java
public class PurchaseFacade {

  private final BellatrixDemoItemPage bellatrixDemoItemPage;
  private final BellatrixDemoShoppingCartPage bellatrixDemoShoppingCartPage;
  private final BellatrixDemoCheckoutPage bellatrixDemoCheckoutPage;

  public PurchaseFacade(
    ItemPage itempage,
    ShoppingCartPage shoppingCartPage,
    CheckoutPage checkoutPage
  ) {
    this.bellatrixDemoItemPage = new BellatrixDemoItemPage();
    this.bellatrixDemoShoppingCartPage = new BellatrixDemoShoppingCartPage();
    this.bellatrixDemoCheckoutPage = new BellatrixDemoCheckoutPage();
  }

  public void purchaseItem(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    bellatrixDemoItemPage.navigate(itemUrl);
    bellatrixDemoItemPage.assertions().assertProductPrice(itemPrice);
    bellatrixDemoItemPage.clickBuyNowButton();
    bellatrixDemoItemPage.clickViewShoppingCartButton();
    bellatrixDemoShoppingCartPage.clickProceedToCheckoutButton();
    bellatrixDemoShoppingCartPage
      .assertions()
      .assertShoppingCartSubtotalPrice(itemPrice);
    bellatrixDemoCheckoutPage.fillBillingInfo(purchaseInfo);
    bellatrixDemoCheckoutPage.assertions().assertOrderSubtotalPrice(itemPrice);
  }
}

```

```java
public class StorePurchaseWithFacadeTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void subtotalPriceOfFalcon9CalculatedCorrect_when_FacadePatternUsed() {
    var itemUrl = "falcon-9";
    var itemPrice = 50.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    new ShoppingCart().purchaseItem(itemUrl, itemPrice, purchaseInfo);
  }

  @Test
  public void subtotalPriceOfSaturnVCalculatedCorrect_when_FacadePatternUsed() {
    var itemUrl = "saturn-v";
    var itemPrice = 120.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    new ShoppingCart().purchaseItem(itemUrl, itemPrice, purchaseInfo);
  }
}

```

```java
public class PurchaseFacade {

  private final ItemPage itemPage;
  private final ShoppingCartPage shoppingCartPage;
  private final CheckoutPage checkoutPage;

  public ShoppingCart(
    ItemPage itempage,
    ShoppingCartPage shoppingCartPage,
    CheckoutPage checkoutPage
  ) {
    this.itemPage = itempage;
    this.shoppingCartPage = shoppingCartPage;
    this.checkoutPage = checkoutPage;
  }

  public void purchaseItem(
    String itemUrl,
    double itemPrice,
    PurchaseInfo purchaseInfo
  ) {
    itemPage.navigate(itemUrl);
    itemPage.assertPrice(itemPrice);
    itemPage.clickBuyNowButton();
    itemPage.clickViewShoppingCartButton();
    shoppingCartPage.clickProceedToCheckoutButton();
    shoppingCartPage.assertSubtotalAmount(itemPrice);
    checkoutPage.fillBillingInfo(purchaseInfo);
    checkoutPage.assertSubtotal(itemPrice);
  }
}

```

```java
public class StorePurchaseWithFacadeTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void subtotalPriceOfFalcon9CalculatedCorrect_when_FacadePatternUsed() {
    var itemUrl = "falcon-9";
    var itemPrice = 50.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    var itemPage = new BellatrixDemoItemPage();
    var shoppingCartPage = new BellatrixDemoShoppingCartPage();
    var checkoutPage = new BellatrixDemoCheckoutPage();
    new PurchaseFacade(itemPage, shoppingCartPage, checkoutPage)
      .purchaseItem(itemUrl, itemPrice, purchaseInfo);
  }

  @Test
  public void subtotalPriceOfSaturnVCalculatedCorrect_when_FacadePatternUsed() {
    var itemUrl = "saturn-v";
    var itemPrice = 120.00;
    var purchaseInfo = new PurchaseInfo();
    purchaseInfo.setEmail("info@berlinspaceflowers.com");
    purchaseInfo.setFirstName("Anton");
    purchaseInfo.setLastName("Angelov");
    purchaseInfo.setCompany("Space Flowers");
    purchaseInfo.setCountry("Germany");
    purchaseInfo.setAddress1("1 Willi Brandt Avenue Tiergarten");
    purchaseInfo.setAddress2("Lützowplatz 17");
    purchaseInfo.setCity("Berlin");
    purchaseInfo.setZip("10115");
    purchaseInfo.setPhone("+491888999281");
    var itemPage = new BellatrixDemoItemPage();
    var shoppingCartPage = new BellatrixDemoShoppingCartPage();
    var checkoutPage = new BellatrixDemoCheckoutPage();
    new PurchaseFacade(itemPage, shoppingCartPage, checkoutPage)
      .purchaseItem(itemUrl, itemPrice, purchaseInfo);
  }
}

```

## Advanced Page Object Pattern in Automated Testing Java Code

```java
public class Driver {

  private static WebDriverWait browserWait;
  private static WebDriver browser;

  public static WebDriver getBrowser() {
    if (browser == null) {
      throw new NullPointerException(
        "The WebDriver browser instance was not initialized. You should first call the start() method."
      );
    }
    return browser;
  }

  public static void setBrowser(WebDriver browser) {
    Driver.browser = browser;
  }

  public static WebDriverWait getBrowserWait() {
    if (browserWait == null || browser == null) {
      throw new NullPointerException(
        "The WebDriver browser wait instance was not initialized. You should first call the start() method."
      );
    }
    return browserWait;
  }

  public static void setBrowserWait(WebDriverWait browserWait) {
    Driver.browserWait = browserWait;
  }

  public static void startBrowser(BrowserType browserType, int defaultTimeout) {
    switch (browserType) {
      case FIREFOX:
        WebDriverManager.firefoxdriver().setup();
        setBrowser(new FirefoxDriver());
        break;
      case CHROME:
        WebDriverManager.chromedriver().setup();
        setBrowser(new ChromeDriver());
        break;
      case EDGE:
        WebDriverManager.edgedriver().setup();
        setBrowser(new EdgeDriver());
        break;
      default:
        break;
    }
    setBrowserWait(new WebDriverWait(getBrowser(), defaultTimeout));
  }

  public static void startBrowser(BrowserType browserType) {
    startBrowser(browserType, 30);
  }

  public static void startBrowser() {
    startBrowser(BrowserType.FIREFOX);
  }

  public static void stopBrowser() {
    getBrowser().quit();
    setBrowser(null);
    setBrowserWait(null);
  }
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
}
```

```java
public abstract class BaseElements {

  protected WebDriver browser;

  public BaseElements() {
    browser = Driver.getBrowser();
  }
}

```

```java
public class BingMainPageElements extends BaseElements {

  public WebElement searchBox() {
    return browser.findElement(By.id("sb_form_q"));
  }
}
```

```java
public class BingMainPageAssertions {

  private final WebDriver browser;

  public BingMainPageAssertions(WebDriver browser) {
    this.browser = browser;
  }

  protected BingMainPageElements elements() {
    return new BingMainPageElements(browser);
  }

  public void resultsCount(String expectedCount) {
    Assert.assertTrue(
      elements().resultsCountDiv().getText().contains(expectedCount),
      "The results DIV doesn't contain the specified text."
    );
  }
}

```

```java
public abstract class BaseAssertions<ElementsT extends BaseElements> {

  protected ElementsT elements() {
    return NewInstanceFactory.createByTypeParameter(getClass(), 0);
  }
}

```

```java
public class NewInstanceFactory {

  public static <T> T createByTypeParameter(Class parameterClass, int index) {
    try {
      var elementsClass = (Class) (
        (ParameterizedType) parameterClass.getGenericSuperclass()
      ).getActualTypeArguments()[index];
      return (T) elementsClass.getDeclaredConstructor().newInstance();
    } catch (Exception e) {
      return null;
    }
  }
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
public class BingMainPage {

  private final WebDriver browser;
  private final String url = "http://www.bing.com/";

  public BingMainPage(WebDriver browser) {
    this.browser = browser;
  }

  protected BingMainPageElements elements() {
    return new BingMainPageElements(browser);
  }

  public BingMainPageAssertions assertions() {
    return new BingMainPageAssertions(browser);
  }

  public void navigate() {
    browser.navigate().to(url);
  }

  public void search(String textToType) {
    elements().searchBox().clear();
    elements().searchBox().sendKeys(textToType);
    elements().goButton().click();
  }
}
```

```java
public abstract class BasePage<
  ElementsT extends BaseElements, AssertionsT extends BaseAssertions<ElementsT>
> {

  protected abstract String getUrl();

  protected ElementsT elements() {
    return NewInstanceFactory.createByTypeParameter(getClass(), 0);
  }

  public AssertionsT assertions() {
    return NewInstanceFactory.createByTypeParameter(getClass(), 1);
  }

  public void navigate(String part) {
    Driver.getBrowser().navigate().to(getUrl().concat(part));
  }

  public void navigate() {
    Driver.getBrowser().navigate().to(getUrl());
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

  public void search(String textToType) {
    elements().searchBox().clear();
    elements().searchBox().sendKeys(textToType);
    elements().goButton().click();
  }
}
```

```java

public class AdvancedBingTests {

  @BeforeMethod
  public void testInit() {
    Driver.startBrowser();
  }

  @AfterMethod
  public void testCleanup() {
    Driver.stopBrowser();
  }

  @Test
  public void searchTextInBing_when_AdvancedPageObjectPatternUsed() {
    var bingMainPage = new BingMainPage();
    bingMainPage.navigate();
    bingMainPage.search("Automate The Planet");
    bingMainPage.assertions().resultsCount(",000 Results");
  }
}
```

## Page Object Pattern in Automated Testing Java Code

```java
public class BingMainPage {

  private final WebDriver driver;
  private final String url = "http://www.bing.com/";

  @FindBy(id = "sb_form_q")
  private WebElement searchBox;

  @FindBy(xpath = "//label[@for='sb_form_go']")
  private WebElement goButton;

  @FindBy(id = "b_tween")
  private WebElement resultsCountDiv;

  public BingMainPage(WebDriver browser) {
    driver = browser;
    PageFactory.initElements(browser, this);
  }

  public void navigate() {
    driver.navigate().to(url);
  }

  public void search(String textToType) {
    searchBox.clear();
    searchBox.sendKeys(textToType);
    goButton.click();
  }

  public void assertResultsCount(String expectedCount) {
    Assert.assertTrue(
      resultsCountDiv.getText().contains(expectedCount),
      "The results DIV doesn't contain the specified text."
    );
  }
}

```

```java

@FindBy(id = "sb_form_q")
public WebElement searchBox;

```

```java
public class BingTests {

  private WebDriver driver;
  private WebDriverWait wait;

  @BeforeClass
  public static void classInit() {
    WebDriverManager.firefoxdriver().setup();
  }

  @BeforeMethod
  public void testInit() {
    driver = new FirefoxDriver();
    wait = new WebDriverWait(driver, 30);
  }

  @AfterMethod
  public void testCleanup() {
    driver.quit();
  }

  @Test
  public void searchTextInBing_UsingSeleniumPageFactory() {
    var bingMainPage = new BingMainPage(driver);
    bingMainPage.navigate();
    bingMainPage.search("Automate The Planet");
    bingMainPage.assertResultsCount(",000 Results");
  }
}
```

```java
public class BingTests {

  private WebDriver driver;
  private WebDriverWait wait;

  @BeforeClass
  public static void classInit() {
    WebDriverManager.firefoxdriver().setup();
  }

  @BeforeMethod
  public void testInit() {
    driver = new FirefoxDriver();
    wait = new WebDriverWait(driver, 30);
  }

  @AfterMethod
  public void testCleanup() {
    driver.quit();
  }

  @Test
  public void searchTextInBing_UsingSeleniumPageFactory() {
    var bingMainPage = new BingMainPage(driver);
    bingMainPage.navigate();
    bingMainPage.search("Automate The Planet");
    bingMainPage.assertResultsCount(",000 Results");
  }
}
```

```java
public class BingMainPageAssertions {

  private final WebDriver browser;

  public BingMainPageAssertions(WebDriver browser) {
    this.browser = browser;
  }

  protected BingMainPageElements elements() {
    return new BingMainPageElements(browser);
  }

  public void resultsCount(String expectedCount) {
    Assert.assertTrue(
      elements().resultsCountDiv().getText().contains(expectedCount),
      "The results DIV doesn't contain the specified text."
    );
  }
}

```

```java
public class BingMainPage {

  private final WebDriver browser;
  private final String url = "http://www.bing.com/";

  public BingMainPage(WebDriver browser) {
    this.browser = browser;
  }

  protected BingMainPageElements elements() {
    return new BingMainPageElements(browser);
  }

  public BingMainPageAssertions assertions() {
    return new BingMainPageAssertions(browser);
  }

  public void navigate() {
    browser.navigate().to(url);
  }

  public void search(String textToType) {
    elements().searchBox().clear();
    elements().searchBox().sendKeys(textToType);
    elements().goButton().click();
  }
}
```

```java
public class BingTests {

  private WebDriver driver;
  public WebDriverWait wait;

  @BeforeClass
  public static void classInit() {
    WebDriverManager.firefoxdriver().setup();
  }

  @BeforeMethod
  public void testInit() {
    driver = new FirefoxDriver();
    wait = new WebDriverWait(driver, 30);
  }

  @AfterMethod
  public void testCleanup() {
    driver.quit();
  }

  @Test
  public void searchTextInBing_WithoutSeleniumPageFactory() {
    var bingMainPage = new BingMainPage(driver);
    bingMainPage.navigate();
    bingMainPage.search("Automate The Planet");
    bingMainPage.assertions().resultsCount(",000 Results");
  }
}
```
