---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

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

# Enterprise Test Automation Framework

## Enterprise Test Automation Framework: Plugin Architecture in MSTest

```csharp
[TestClass]
public class MSTestBaseTest
{
    public IServicesCollection Container;
    protected MSTestExecutionContext &#1045;xecutionContext;
    private static readonly List<string> TypeForAlreadyExecutedClassInits =
            new List<string>();
    private TestWorkflowPluginProvider _currentTestExecutionProvider;
    public TestContext TestContext { get; set; }

    [TestInitialize]
    public void CoreTestInit()
    {
        &#1045;xecutionContext = new MSTestExecutionContext(TestContext);
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(&(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(&#1045;xecutionContext);
        ExecuteActArrangePhases();
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(&#1045;xecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        try
        {
            Initialize();

            _currentTestExecutionProvider.PreTestInit(
            &#1045;xecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);

            TestInit();

            _currentTestExecutionProvider.PostTestInit(
            &#1045;xecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestInitFailed(ex,
            &#1045;xecutionContext.TestName,testMethodMemberInfo,
            testClassType, categories, authors, descriptions);
            throw;
        }
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        if(&#1045;xecutionContext == null)
        {
            &#1045;xecutionContext = new MSTestExecutionContext(TestContext);
        }

        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(&#1045;xecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(&#1045;xecutionContext);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(&#1045;xecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        try
        {
            _currentTestExecutionProvider.PreTestCleanup(
            (TestOutcome) &#1045;xecutionContext.TestOutcome,
            &#1045;xecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            &#1045;xecutionContext.ExceptionMessage,
            &#1045;xecutionContext.ExceptionStackTrace, &#1045;xecutionContext.Exception);

            TestCleanup();

            _currentTestExecutionProvider.PostTestCleanup(
            (TestOutcome) &#1045;xecutionContext.TestOutcome,
            &#1045;xecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            &#1045;xecutionContext.ExceptionMessage,
            &#1045;xecutionContext.ExceptionStackTrace, &#1045;xecutionContext.Exception);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestCleanupFailed(ex,
            &#1045;xecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            throw;
        }
    }

    public virtual void Initialize() {}
    public virtual void TestsArrange() {}
    public virtual void TestsAct() {}
    public virtual void TestInit() {}
    public virtual void TestCleanup() {}
    public virtual void TestsCleanup() {}
    protected static bool IsDebugRun()
    {
        #if DEBUG
        var isDebug = true;
        #else
        bool isDebug = false;
        #endif
        return isDebug;
    }

    private List<string> GetAllTestCategories(MemberInfo memberInfo)
    {
        var categories = new List<string>();
        var testCategoryAttributes = GetAllAttributes<TestCategoryAttribute>(memberInfo);
        foreach(var testCategoryAttribute in testCategoryAttributes)
        {
            categories.AddRange(testCategoryAttribute.TestCategories);
        }

        return categories;
    }

    private List<string> GetAllAuthors(MemberInfo memberInfo)
    {
        var authors = new List < string > ();
        var ownerAttributes = GetAllAttributes < OwnerAttribute > (memberInfo);
        foreach(var ownerAttribute in ownerAttributes)
        {
            authors.Add(ownerAttribute.Owner);
        }

        return authors;
    }

    private List<string> GetAllDescriptions(MemberInfo memberInfo)
    {
        var descriptions = new List<string>();
        var descriptionAttributes = GetAllAttributes < DescriptionAttribute > (memberInfo);
        foreach(var descriptionAttribute in descriptionAttributes)
        {
            descriptions.Add(descriptionAttribute.Description);
        }

        return descriptions;
    }

    private void InitializeTestExecutionBehaviorObservers( TestWorkflowPluginProvider testExecutionProvider)
    {
        var observers = ServicesCollection.Current.ResolveAll<TestWorkflowPlugin>();
        foreach(var observer in observers)
        {
            observer.Subscribe(testExecutionProvider);
        }
    }

    private void ExecuteActArrangePhases()
    {
        try
        {
            var testClassType = GetCurrentExecutionTestClassType(&#1045;xecutionContext);
            if (!TypeForAlreadyExecutedClassInits.Contains(&#1045;xecutionContext.TestClassName))
            {
                Container = ServicesCollection.Current
                            .CreateChildServicesCollection(testClassType.FullName);
                Container.RegisterInstance(Container);
                Container.RegisterInstance<ExecutionContext>(&#1045;xecutionContext);
                _currentTestExecutionProvider = new TestWorkflowPluginProvider();
                InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
                TypeForAlreadyExecutedClassInits.Add(&#1045;xecutionContext.TestClassName);
                _currentTestExecutionProvider.PreTestsArrange(testClassType);
                Initialize();
                TestsArrange();
                _currentTestExecutionProvider.PostTestsArrange(testClassType);
                _currentTestExecutionProvider.PreTestsAct(testClassType);
                TestsAct();
                _currentTestExecutionProvider.PostTestsAct(testClassType);
            }
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestsArrangeFailed(ex);
        }
    }

    private MethodInfo GetCurrentExecutionMethodInfo(MSTestExecutionContext executionContext)
    {
        var memberInfo = GetCurrentExecutionTestClassType(executionContext)
                            .GetMethod(executionContext.TestName);
        return memberInfo;
    }

    private Type GetCurrentExecutionTestClassType(MSTestExecutionContext executionContext)
    {
        var testClassType = GetType().Assembly.GetType(executionContext.TestClassName);
        return testClassType;
    }

    private List<TAttribute> GetAllAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute: Attribute
    {
        var allureClassAttributes = GetClassAttributes<TAttribute>(memberInfo.DeclaringType);
        var allureMethodAttributes = GetMethodAttributes<TAttribute>(memberInfo);
        var allAllureAttributes = allureClassAttributes.ToList();
        allAllureAttributes.AddRange(allureMethodAttributes);
        return allAllureAttributes;
    }

    private IEnumerable<TAttribute> GetClassAttributes<TAttribute>(Type currentType)
        where TAttribute: Attribute
    {
        var classAttributes = currentType.GetCustomAttributes<TAttribute>(true);
        return classAttributes;
    }

    private IEnumerable<TAttribute> GetMethodAttributes<TAttribute> (MemberInfo memberInfo)
        where TAttribute: Attribute
    {
        var methodAttributes = memberInfo.GetCustomAttributes<TAttribute>(true);
        return methodAttributes;
    }
}
```

```csharp
[TestClass]
public class MSTestBaseTest
{
    public IServicesCollection Container;
    protected MSTestExecutionContext &#1045;xecutionContext;
    private static readonly List<string> TypeForAlreadyExecutedClassInits =
            new List<string>();
    private TestWorkflowPluginProvider _currentTestExecutionProvider;
    public TestContext TestContext { get; set; }

    [TestInitialize]
    public void CoreTestInit()
    {
        &#1045;xecutionContext = new MSTestExecutionContext(TestContext);
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(&#1045;xecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(&#1045;xecutionContext);
        ExecuteActArrangePhases();
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(&#1045;xecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        try
        {
            Initialize();

            _currentTestExecutionProvider.PreTestInit(
            &#1045;xecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);

            TestInit();

            _currentTestExecutionProvider.PostTestInit(
            &#1045;xecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestInitFailed(ex,
            &#1045;xecutionContext.TestName,testMethodMemberInfo,
            testClassType, categories, authors, descriptions);
            throw;
        }
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        if(&#1045;xecutionContext == null)
        {
            &#1045;xecutionContext = new MSTestExecutionContext(TestContext);
        }

        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(&#1045;xecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(&#1045;xecutionContext);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(&#1045;xecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        try
        {
            _currentTestExecutionProvider.PreTestCleanup(
            (TestOutcome) &#1045;xecutionContext.TestOutcome,
            &#1045;xecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            &#1045;xecutionContext.ExceptionMessage,
            &#1045;xecutionContext.ExceptionStackTrace, &#1045;xecutionContext.Exception);

            TestCleanup();

            _currentTestExecutionProvider.PostTestCleanup(
            (TestOutcome) &#1045;xecutionContext.TestOutcome,
            &#1045;xecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            &#1045;xecutionContext.ExceptionMessage,
            &#1045;xecutionContext.ExceptionStackTrace, &#1045;xecutionContext.Exception);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestCleanupFailed(ex,
            &#1045;xecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            throw;
        }
    }

    public virtual void Initialize() {}
    public virtual void TestsArrange() {}
    public virtual void TestsAct() {}
    public virtual void TestInit() {}
    public virtual void TestCleanup() {}
    public virtual void TestsCleanup() {}
    protected static bool IsDebugRun()
    {
        #if DEBUG
        var isDebug = true;
        #else
        bool isDebug = false;
        #endif
        return isDebug;
    }

    private List<string> GetAllTestCategories(MemberInfo memberInfo)
    {
        var categories = new List<string>();
        var testCategoryAttributes = GetAllAttributes<TestCategoryAttribute>(memberInfo);
        foreach(var testCategoryAttribute in testCategoryAttributes)
        {
            categories.AddRange(testCategoryAttribute.TestCategories);
        }

        return categories;
    }

    private List<string> GetAllAuthors(MemberInfo memberInfo)
    {
        var authors = new List < string > ();
        var ownerAttributes = GetAllAttributes < OwnerAttribute > (memberInfo);
        foreach(var ownerAttribute in ownerAttributes)
        {
            authors.Add(ownerAttribute.Owner);
        }

        return authors;
    }

    private List<string> GetAllDescriptions(MemberInfo memberInfo)
    {
        var descriptions = new List<string>();
        var descriptionAttributes = GetAllAttributes < DescriptionAttribute > (memberInfo);
        foreach(var descriptionAttribute in descriptionAttributes)
        {
            descriptions.Add(descriptionAttribute.Description);
        }

        return descriptions;
    }

    private void InitializeTestExecutionBehaviorObservers( TestWorkflowPluginProvider testExecutionProvider)
    {
        var observers = ServicesCollection.Current.ResolveAll<TestWorkflowPlugin>();
        foreach(var observer in observers)
        {
            observer.Subscribe(testExecutionProvider);
        }
    }

    private void ExecuteActArrangePhases()
    {
        try
        {
            var testClassType = GetCurrentExecutionTestClassType(&#1045;xecutionContext);
            if (!TypeForAlreadyExecutedClassInits.Contains(&#1045;xecutionContext.TestClassName))
            {
                Container = ServicesCollection.Current
                            .CreateChildServicesCollection(testClassType.FullName);
                Container.RegisterInstance(Container);
                Container.RegisterInstance<ExecutionContext>(&#1045;xecutionContext);
                _currentTestExecutionProvider = new TestWorkflowPluginProvider();
                InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
                TypeForAlreadyExecutedClassInits.Add(&#1045;xecutionContext.TestClassName);
                _currentTestExecutionProvider.PreTestsArrange(testClassType);
                Initialize();
                TestsArrange();
                _currentTestExecutionProvider.PostTestsArrange(testClassType);
                _currentTestExecutionProvider.PreTestsAct(testClassType);
                TestsAct();
                _currentTestExecutionProvider.PostTestsAct(testClassType);
            }
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestsArrangeFailed(ex);
        }
    }

    private MethodInfo GetCurrentExecutionMethodInfo(MSTestExecutionContext executionContext)
    {
        var memberInfo = GetCurrentExecutionTestClassType(executionContext)
                            .GetMethod(executionContext.TestName);
        return memberInfo;
    }

    private Type GetCurrentExecutionTestClassType(MSTestExecutionContext executionContext)
    {
        var testClassType = GetType().Assembly.GetType(executionContext.TestClassName);
        return testClassType;
    }

    private List<TAttribute> GetAllAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute: Attribute
    {
        var allureClassAttributes = GetClassAttributes<TAttribute>(memberInfo.DeclaringType);
        var allureMethodAttributes = GetMethodAttributes<TAttribute>(memberInfo);
        var allAllureAttributes = allureClassAttributes.ToList();
        allAllureAttributes.AddRange(allureMethodAttributes);
        return allAllureAttributes;
    }

    private IEnumerable<TAttribute> GetClassAttributes<TAttribute>(Type currentType)
        where TAttribute: Attribute
    {
        var classAttributes = currentType.GetCustomAttributes<TAttribute>(true);
        return classAttributes;
    }

    private IEnumerable<TAttribute> GetMethodAttributes<TAttribute> (MemberInfo memberInfo)
        where TAttribute: Attribute
    {
        var methodAttributes = memberInfo.GetCustomAttributes<TAttribute>(true);
        return methodAttributes;
    }
}
```

## Enterprise Test Automation Framework: Logging Module Design

```json
"logging": {
    "isEnabled": true,
    "isConsoleLoggingEnabled": true,
    "isDebugLoggingEnabled": true,
    "isFileLoggingEnabled": true,
    "outputTemplate": "[{Timestamp:HH:mm:ss}] {Message:lj}{NewLine}"
}
```

```xml
<PackageReference Include="Bellatrix.ServicesCollection" Version="2.0.1" />
<PackageReference Include="Microsoft.Extensions.Logging" Version="3.1.9" />
<PackageReference Include="Microsoft.Extensions.Logging.Abstractions" Version="3.1.9" />
<PackageReference Include="Microsoft.Extensions.Logging.Configuration" Version="3.1.9" />
<PackageReference Include="Microsoft.Extensions.Logging.Console" Version="3.1.9" />
<PackageReference Include="Microsoft.Extensions.Logging.Debug" Version="3.1.9" />
<PackageReference Include="Serilog.Extensions.Logging.File" Version="2.0.0" />
<PackageReference Include="Serilog.Settings.Configuration" Version="3.1.0" />
<PackageReference Include="Serilog.Sinks.Console" Version="3.1.1" />
<PackageReference Include="Serilog.Sinks.Debug" Version="1.0.1" />
<PackageReference Include="Serilog.Sinks.File" Version="4.1.0" />
```

```csharp
public interface IBellaLogger
{
    void LogInformation(string message, params object[] args);

    void LogWarning(string message, params object[] args);
}
```

```csharp
public class LoggingSettings
{
    public bool IsEnabled { get; set; }

    public bool IsConsoleLoggingEnabled { get; set; }

    public bool IsDebugLoggingEnabled { get; set; }

    public bool IsFileLoggingEnabled { get; set; }

    public string OutputTemplate { get; set; }
}
```

```csharp
public class BellaLogger: IBellaLogger
{
    private readonly ILogger _logger;

    static BellaLogger()
    {
        var loggingSettings = ConfigurationService.Instance
                              .Root.GetSection("logging")?
                              .Get<LoggingSettings>();
        var loggerConfiguration = new LoggerConfiguration();

        if (loggingSettings != null
            && loggingSettings.IsEnabled)
        {
            if (loggingSettings.IsConsoleLoggingEnabled)
            {
                loggerConfiguration.WriteTo.Console(outputTemplate: loggingSettings.OutputTemplate);
            }

            if (loggingSettings.IsDebugLoggingEnabled)
            {
                loggerConfiguration.WriteTo.Debug(outputTemplate: loggingSettings.OutputTemplate);
            }

            if (loggingSettings.IsFileLoggingEnabled)
            {
                loggerConfiguration.WriteTo.File("bellatrix-log.txt",
                                    rollingInterval: RollingInterval.Day,
                                    outputTemplate: loggingSettings.OutputTemplate);
            }
        }

        Log.Logger = loggerConfiguration.CreateLogger();
    }

    public BellaLogger(ILogger logger)
            => _logger = logger;

    public void LogInformation(string message, params object[] args)
    {
        try
        {
            _logger.Information(message, args);
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex);
        }
    }

    public void LogWarning(string message, params object[] args)
    {
        try
        {
            _logger.Warning(message, args);
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex);
        }
    }
}
```

```csharp
public static class DebugLogger
{
    private static readonly IBellaLogger s_logger;

    static DebugLogger()
    {
        s_logger = new BellaLogger(Log.Logger);
    }

    public static void LogInformation(string message, params object[] args)
    {
        s_logger.LogInformation(message, args);
    }

    public static void LogWarning(string message, params object[] args)
    {
        s_logger.LogWarning(message, args);
    }
}
```

```csharp
protected override void PostTestCleanup(object sender, TestWorkflowPluginEventArgs e)
{
    if (!ConfigurationService.Instance.GetDynamicTestCasesSettings().IsEnabled)
    {
        return;
    }

    base.PostTestCleanup(sender, e);

    try
    {
        if (e.TestOutcome == TestOutcome.Passed
            && _dynamicTestCasesService?.Context != null)
        {
            _dynamicTestCasesService.Context.TestCase =
                _testCaseManagementService.InitTestCase(_dynamicTestCasesService.Context);
        }
    }
    catch (Exception ex)
    {
        DebugLogger.LogWarning($"Test case failed to update, {ex.Message}");
    }

    _dynamicTestCasesService?.ResetContext();
}
```

```csharp
public class QTestTestCaseManagementService : ITestCaseManagementService
{
    private QT.TestDesignService _testDesignService;
    private QT.ProjectService _projectService;
    private IBellaLogger _bellaLogger;

    public QTestTestCaseManagementService(IBellaLogger bellaLogger)
    {
        // we must login first to be able to make any request to the server
        // or we will get 401 error
        try
        {
            LoginToService(_testDesignService = new QT.TestDesignService(ConfigurationService.Instance.GetQTestDynamicTestCasesSettings().ServiceAddress));
            LoginToService(_projectService = new QT.ProjectService(ConfigurationService.Instance.GetQTestDynamicTestCasesSettings().ServiceAddress));
        }
        catch (Exception ex)
        {
            bellaLogger.LogWarning($"qTest Login was unsuccesful, {ex.Message}");
        }
    }
}
```

## Enterprise Test Automation Framework: Inversion of Control Containers

```csharp
public interface ILogger
{
    void CreateLogEntry(string errorMessage);
}
```

```csharp
public class FileLogger: ILogger
{
    public void CreateLogEntry(string errorMessage)
    {
        File.WriteAllText(@"C:exceptions.txt", errorMessage);
    }
}

public class EmailLogger: ILogger {
    public void CreateLogEntry(string errorMessage)
    {
        EmailFactory.SendEmail(errorMessage);
    }
}

public class SmsLogger: ILogger
{
    public void CreateLogEntry(string errorMessage)
    }
        SmsFactory.SendSms(errorMessage);
    }
}
```

```csharp
public class CustomerOrder
{
    public void Create(OrderType orderType)
    {
        try {

            // Database code goes here
        }
        catch (Exception ex)
        {
            switch (orderType)
            {
            case OrderType.Platinum:
                new SmsLogger().CreateLogEntry(ex.Message);
                break;
            case OrderType.Gold:
                new EmailLogger().CreateLogEntry(ex.Message);
                break;
            default:
                new FileLogger().CreateLogEntry(ex.Message);
                break;
            }
        }
    }
}
```

```csharp
public class CustomerOrder
{
    private ILogger _logger;
    public CustomerOrder(ILogger logger)
    {
        _logger = logger;
    }

    public void Create()
    {
        try
        {
            // Database code goes here
        }
        catch (Exception ex)
        {
            _logger.CreateLogEntry(ex.Message);
        }
    }
}

public class GoldCustomerOrder : CustomerOrder
{
    public GoldCustomerOrder() : base(new EmailLogger()) {}
}

public class PlatinumCustomerOrder : CustomerOrder
{
    public PlatinumCustomerOrder() : base(new SmsLogger()) {}
}
```

```csharp
public interface IServicesResolvingCollection {
    T Resolve<T>(bool shouldThrowResolveException = false);
    T Resolve<T>(string name, bool shouldThrowResolveException = false);
    object Resolve(Type type, bool shouldThrowResolveException = false);
    T Resolve<T>(bool shouldThrowResolveException = false,
        params OverrideParameter[] overrides);
    IEnumerable<T> ResolveAll<T>(bool shouldThrowResolveException = false);
    IEnumerable<T> ResolveAll<T> (bool shouldThrowResolveException = false,
        params OverrideParameter[] overrides);
}
```

```csharp
public interface IServicesRegisteringCollection
{
    bool IsRegistered<TInstance>();
    void RegisterType<TFrom>();
    void RegisterSingleInstance <TFrom,TTo>(InjectionConstructor injectionConstructor)
                                where TTo : TFrom;
    void RegisterSingleInstance<TFrom>(Type instanceType, InjectionConstructor injectionConstructor);
    void UnregisterSingleInstance<TFrom>();
    void UnregisterSingleInstance<TFrom>(string name);
    void RegisterType<TFrom,TTo>(string name, InjectionConstructor injectionConstructor)
                     where TTo : TFrom;
    void RegisterNull<TFrom>();
    void RegisterType<TFrom>(bool shouldUseSingleton);
    void RegisterType<TFrom,TTo>()
                    where TTo : TFrom;
    void RegisterType<TFrom,TTo>(string name)
                    where TTo : TFrom;
    void RegisterType<TFrom,TTo>(bool shouldUseSingleton)
                    where TTo : TFrom;
    void RegisterInstance<TFrom>(TFrom instance, bool shouldUseSingleton = false);
    void RegisterInstance<TFrom>(TFrom instance, string name);
    object CreateInjectionParameter<TInstance>();
    object CreateValueParameter(object value);
}
```

```csharp
public interface IServicesCollection : IServicesRegisteringCollection,
                 IServicesResolvingCollection, IDisposable
{
    List <IServicesCollection> GetChildServicesCollections();
    IServicesCollection CreateChildServicesCollection(string collectionName);
    IServicesCollection FindCollection(string collectionName);
    bool IsPresentServicesCollection(string collectionName);
}
```

```csharp
public class UnityServicesCollection : IServicesCollection
{
    private readonly IUnityContainer _container;
    private readonly Dictionary<string,IServicesCollection> _containers;
    private readonly object _lockObject = new object();
    private bool _isDisposed;

    public UnityServicesCollection()
    {
        _containers = new Dictionary<string,IServicesCollection>();
    }

    public UnityServicesCollection(IUnityContainer container)
    {
        _container = container;
        _containers = new Dictionary<string,IServicesCollection>();
    }

    public T Resolve<T>(bool shouldThrowResolveException = false)
    {
        T result = default;
        try
        {
            lock(_lockObject)
            {
                result = _container.Resolve<T>();
            }
        }
        catch (Exception ex)
        {
            if (shouldThrowResolveException)
            {
                throw;
            }
        }

        return result;
    }

    public IEnumerable<T> ResolveAll<T>(bool shouldThrowResolveException = false)
    {
        IEnumerable <T> result;
        try
        {
            lock(_lockObject)
            {
                result = _container.ResolveAll<T>();
            }
        }
        catch (Exception ex)
        {
            if (ex.InnerException != null && shouldThrowResolveException)
            {
                throw ex.InnerException;
            }

            throw;
        }

        return result;
    }

    public void RegisterType<TFrom,TTo>()
                            where TTo: TFrom
    {
        lock(_lockObject)
        {
            _container.RegisterType<TFrom,TTo>();
        }
    }

    public void RegisterType<TFrom,TTo>(bool useSingleInstance)
                             where TTo: TFrom
    {
        lock(_lockObject)
        {
            _container.RegisterType<TFrom,TTo>(
                new ContainerControlledLifetimeManager()
            );
        }
    }

    public void RegisterInstance<TFrom>(TFrom instance, bool useSingleInstance = false)
    {
        if (useSingleInstance)
        {
            lock(_lockObject)
            {
                _container.RegisterInstance(instance,
                new ContainerControlledLifetimeManager()
                );
            }
        }
        else
        {
            lock(_lockObject)
            {
                _container.RegisterInstance(instance);
            }
        }
    }

    public IServicesCollection CreateChildServicesCollection(string collectionName)
    {
        lock(_lockObject)
        {
            var childNativeContainer = _container.CreateChildContainer();
            var childServicesCollection =
                    new UnityServicesCollection(childNativeContainer);
            if (_containers.ContainsKey(collectionName))
            {
                _containers[collectionName] = childServicesCollection;
            }
            else
            {
                _containers.Add(collectionName, childServicesCollection);
            }

            return childServicesCollection;
        }
    }

    public void Dispose()
    {
        if (!_isDisposed)
        {
            _container.Dispose();
            GC.SuppressFinalize(this);
            _isDisposed = true;
        }
    }

    public IServicesCollection FindCollection(string collectionName)
    {
        lock(_lockObject)
        {
            if (_containers.ContainsKey(collectionName))
            {
                return _containers[collectionName];
            }

            return this;
        }
    }

    public bool IsPresentServicesCollection(string collectionName)
    {
        lock(_lockObject)
        {
            if (_containers.ContainsKey(collectionName))
            {
                return true;
            }

            return false;
        }
    }

    // the rest of the methods
}
```

```csharp
public sealed class ServicesCollection
{
    private static IServicesCollection _serviceProvider;

    public static IServicesCollection Main
    {
        get
        {
            if (_serviceProvider == null)
            {
                var unityContainer = new UnityContainer();
                _serviceProvider = new
                    UnityServicesCollection(unityContainer);
                _serviceProvider.RegisterInstance(unityContainer);
            }

            return _serviceProvider;
        }
    }
}

```

```csharp
public static void Dispose(IServicesCollection childContainer)
{
    var webDriver = childContainer.
        Resolve<WindowsDriver<WindowsElement>>();
    webDriver?.Quit();
    webDriver?.Dispose();
    childContainer
        .UnregisterSingleInstance<WindowsDriver<WindowsElement>>();
    webDriver = ServicesCollection.Main
        .Resolve<WindowsDriver<WindowsElement>>();
    webDriver?.Quit();
    webDriver?.Dispose();
    ServicesCollection.Main
        .UnregisterSingleInstance<WindowsDriver<WindowsElement>>();
}
```

## Enterprise Test Automation Framework: Define Features Part 3

```csharp
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
[DynamicTestCase(SuiteId = "8260474")]
public class PageObjectsTests : WebTest
{
    [TestMethod]
    [DynamicTestCase(
        TestCaseId = "4d001440-bf6c-4a8b-b3e6-796cbad361e1",
        Description = "Create a purchase of a rocket through the online rocket shop http://demos.bellatrix.solutions/")]
    public void PurchaseRocketWithPageObjects()
    {
        App.TestCases
            .AddPrecondition($"Navigate to http://demos.bellatrix.solutions/");
        var homePage = App.GoTo<HomePage>();
        homePage.FilterProducts(ProductFilter.Popularity);
        homePage.AddProductById(28);
        homePage.ViewCartButton.Click();
        var cartPage = App.Create<CartPage>();
        cartPage.ApplyCoupon("happybirthday");
        cartPage.ProceedToCheckout.Click();
        var billingInfo = new BillingInfo
        {
            FirstName = "In",
            LastName = "Deepthought",
            Company = "Automate The Planet Ltd.",
            Country = "Bulgaria",
            Address1 = "bul. Yerusalim 5",
            Address2 = "bul. Yerusalim 6",
            City = "Sofia",
            State = "Sofia-Grad",
            Zip = "1000",
            Phone = "+00359894646464",
            Email = "info@bellatrix.solutions",
            ShouldCreateAccount = true,
            OrderCommentsTextArea = "cool product",
        };

        var checkoutPage = App.Create<CheckoutPage>();
        checkoutPage.FillBillingInfo(billingInfo);
        checkoutPage.CheckPaymentsRadioButton.Click();
    }
}
```

```csharp
[TestClass]
[SauceLabs(BrowserType.Chrome,
    "62",
    "Windows",
    BrowserBehavior.ReuseIfStarted,
    recordScreenshots: true,
    recordVideo: true)]
public class SauceLabsTests : WebTest
{
        [TestMethod]
        public void PromotionsPageOpened_When_PromotionsButtonClicked()
        {
            App.NavigationService
                .Navigate("http://demos.bellatrix.solutions/");
            var promotionsLink = App.ElementCreateService
                                    .CreateByLinkText<Anchor>("Promotions");
            promotionsLink.Click();
        }
}
```

```csharp
[TestClass]
[Selenoid(BrowserType.Chrome, "77",
          BrowserBehavior.RestartEveryTime,
          recordVideo: true,
          enableVnc: true,
          saveSessionLogs: true)]
public class SeleniumGridTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService
            .Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.ElementCreateService
                                .CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }
}
```

```csharp
Screen.EnsureIsVisible("chrome-print-preview-grid", similarity: 0.7, timeoutInSeconds: 30);
```

```csharp
[TestClass]
[Browser(BrowserType.Chrome,
        BrowserBehavior.ReuseIfStarted,
        true)]
public class DemandPlanningTests : WebTest
{
    [TestMethod]
    [LoadTest]
    public void NavigateToDemandPlanning()
    {
        App.NavigationService
            .Navigate("http://demos.bellatrix.solutions/");
        Select sortDropDown = App.ElementCreateService
                .CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = App.ElementCreateService
                .CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = App.ElementCreateService
                .CreateByAttributesContaining<Anchor>("data-product_id", "28")
                .ToBeClickable();
        Anchor viewCartButton = App.ElementCreateService
                .CreateByClassContaining<Anchor>("added_to_cart wc-forward")
                .ToBeClickable();
        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();
    }
}
```

```csharp
[TestClass]
public class DemandPlanningTests : LoadTest
{
    [TestMethod]
    public void NavigateToDemandPlanning()
    {
        LoadTestEngine.Settings.LoadTestType = LoadTestType.ExecuteForTime;
        LoadTestEngine.Settings.MixtureMode = MixtureMode.Equal;
        LoadTestEngine.Settings.NumberOfProcesses = 1;
        LoadTestEngine.Settings.PauseBetweenStartSeconds = 0;
        LoadTestEngine.Settings.SecondsToBeExecuted = 60;
        LoadTestEngine.Settings.ShouldExecuteRecordedRequestPauses = true;
        LoadTestEngine.Settings
                      .IgnoreUrlRequestsPatterns
                      .Add(".*theming.js.*");
        LoadTestEngine.Assertions.AssertAllRequestStatusesAreSuccessful();
        LoadTestEngine.Assertions.AssertAllRecordedEnsureAssertions();
        LoadTestEngine.Execute("loadTestResults.html");
    }
}
```

```csharp
[TestClass]
public class SoftwareManagementAutomationTests
{
    private static readonly string AssemblyFolder =
        Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
    private static IWebDriver _driver;

    [AssemblyInitialize]
    public static void AssemblyInitialize(TestContext testContext)
    {
        SoftwareAutomationService.InstallRequiredSoftware();
    }
}
```

```csharp
[Browser(BrowserType.Chrome,
         DesktopWindowSize._1280_1024,
         BrowserBehavior.RestartEveryTime)]
[TestClass]
public class LayoutTestingTests : WebTest
{
    [TestMethod]
    public void TestPageLayout()
    {
        App.NavigationService
            .Navigate("http://demos.bellatrix.solutions/");
        Select sortDropDown = App.ElementCreateService
            .CreateByNameEndingWith<Select>("orderby");
        Anchor protonRocketAnchor =App.ElementCreateService
            .CreateByAttributesContaining<Anchor>("href", "/proton-rocket/");
        Div saturnVRating = saturnVAnchor
            .CreateByClassContaining<Div>("star-rating");
        sortDropDown.AssertAboveOf(protonRocketAnchor, 41);
        LayoutAssert.AssertAlignedHorizontallyAll(sortDropDown, protonRocketAnchor);
        saturnVRating.AssertInsideOf(saturnVAnchor);
        saturnVRating.AssertHeightLessThan(100);
        saturnVRating.AssertWidthBetween(50, 70);
    }
}
```

```csharp
[TestMethod]
[TestCategory(Categories.CI)]
public void TestStyles()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
    Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
    Anchor protonRocketAnchor = App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/proton-rocket/");
    Anchor saturnVAnchor = App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/saturn-v/");
    sortDropDown.AssertFontSize("14px");
    sortDropDown.AssertFontWeight("400");
    sortDropDown.AssertFontFamily("Source Sans Pro");
    protonRocketAnchor.AssertColor("rgba(150, 88, 138, 1)");
    protonRocketAnchor.AssertBackgroundColor("rgba(0, 0, 0, 0)");
    protonRocketAnchor.AssertBorderColor("rgb(150, 88, 138)");
    protonRocketAnchor.AssertTextAlign("center");
    protonRocketAnchor.AssertVerticalAlign("baseline");
}
```

## Enterprise Test Automation Framework: Define Features Part 2

```csharp
public class ExecutionTimeUnderTestWorkflowPlugin : TestWorkflowPlugin
{
    protected override void PostTestInit(object sender,
        TestWorkflowPluginEventArgs e)
    {
        // get the start time
    }

    protected override void PostTestCleanup(object sender,
        TestWorkflowPluginEventArgs e)
    {
        // total time = start time - current time
        // IF total time > specified time ===> FAIL TEST
    }
}
```

```csharp
[AssemblyInitialize]
public static void AssemblyInitialize(TestContext testContext)
{
    Button.OverrideClickGlobally = (e) =>
    {
        e.ToExists().ToBeClickable().WaitToBe();
        App.JavaScriptService.Execute("arguments[0].click();", e);
    };
}
```

```csharp
Anchor.OverrideFocusLocally = (e) =>
{
    App.JavaScriptService.Execute("window.focus();");
    App.JavaScriptService.Execute("arguments[0].focus();", anchor);
};
```

```csharp
public void ClickingEventHandler(object sender, ElementActionEventArgs arg)
{
    Logger.LogInformation($"Click {arg.Element.ElementName}");
}

public void HoveringEventHandler(object sender, ElementActionEventArgs arg)
{
    Logger.LogInformation($"Hover {arg.Element.ElementName}");
}
```

```csharp
public static void OnElementNotFound(object sender, ExceptionEventArgs args)
{
    var exceptionAnalyser = new ExceptionAnalyser();
    exceptionAnalyser.Analyse(args.Exception);
    throw args.Exception;
}
```

```csharp
public static class ButtonExtensions
{
    public static void SubmitButtonWithEnter(this Button button)
    {
        var action = new Actions(button.WrappedDriver);
        action.MoveToElement(button.WrappedElement)
            .SendKeys(Keys.Enter)
            .Perform();
    }
}
```

```csharp
public class ExtendedButton : Button
{
    public void SubmitButtonWithEnter()
    {
        var action = new Actions(WrappedDriver);
        action.MoveToElement(WrappedElement)
            .SendKeys(Keys.Enter)
            .Perform();
    }
}
```

```csharp
public static class NavigationServiceExtensions
{
    public static void NavigateViaJavaScript(
        this NavigationService navigationService,
        string url)
    {
        var javaScriptService = new JavaScriptService();
        javaScriptService.Execute($"window.location.href = '{url}';");
    }
}
```

```csharp
public class ByIdEndingWith : By
{
    public ByIdEndingWith(string value): base(value) {}
    public override OpenQA.Selenium.By Convert()
            => OpenQA.Selenium.By.CssSelector($"[id^='{Value}']");
}
```

```csharp
[TestClass]
[ScreenshotOnFail(true)]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
public class FullPageScreenshotsOnFailTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink =
            App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }
}
```

```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
public class VideoRecordingTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink =
            App.ElementCreateService.CreateByLinkText <Anchor>("Promotions");
        promotionsLink.Click();
    }
}
```

```csharp
[ExecutionTimeUnder(2)]
public class MeasuredResponseTimesTests : WebTest
```

## Enterprise Test Automation Framework: Define Features Part 1

```csharp
updateCart.EnsureIsDisabled();

```

```csharp
messageAlert.EnsureIsNotVisible();

```

```csharp
totalSpan.EnsureInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);

```

```csharp
IWebElement agreeCheckBox = driver.FindElement(By.Id("agreeChB"));
agreeCheckBox.Click();
```

```csharp
CheckBox agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
agreeCheckBox.Check();
```

```csharp
IWebDriver driver = new ChromeDriver();
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
```

```csharp
Thread.Sleep(2000);

```

```csharp
[Browser(BrowserType.Firefox, BrowserBehavior.ReuseIfStarted)]
public class BellatrixBrowserBehaviourTests : WebTest
```

```csharp
[Browser(BrowserType.FirefoxHeadless, BrowserBehavior.ReuseIfStarted)]

```

```csharp
IWebElement agreeCheckBox = driver.FindElement(By.Id("agreeChB"));
agreeCheckBox.Click();
IWebElement firstNameTextField = driver.FindElement(By.Id("firstName"));
firstNameTextField.SendKeys("John");
IWebElement avatarUpload = driver.FindElement(By.Id("uploadAvatar"));
avatarUpload.SendKeys("pathTomyAvatar.jpg");
IWebElement saveBtn = driver.FindElement(By.Id("saveBtn"));
agreeCheckBox.SendKeys(Keys.Enter);
```

```csharp
CheckBox agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
agreeCheckBox.Check();
TextField firstNameTextField = App.ElementCreateService.CreateById<TextField>("firstName");
firstNameTextField.SetText("John");
InputFile avatarUpload = App.ElementCreateService.CreateById<InputFile>("uploadAvatar");
avatarUpload.Upload("pathTomyAvatar.jpg");
Button saveBtn = App.ElementCreateService.CreateById<Button>("saveBtn");
saveBtn.ClickByEnter();
```

```csharp
var homePage = App.GoTo<HomePage>();
homePage.FilterProducts(ProductFilter.Popularity);
homePage.AddProductById(28);
homePage.ViewCartButton.Click();
var cartPage = App.Create<CartPage>();
cartPage.ApplyCoupon("happybirthday");
cartPage.UpdateProductQuantity(1, 2);
cartPage.AssertTotalPrice("95.00");
cartPage.ProceedToCheckout.Click();
```

```csharp
Start Test
Class = BDDLoggingTests Name = PurchaseRocketWithLogs
Select 'Sort by price: low to high' on CartPage
Click ApplyCupon on CartPage
Ensure SuccessDiv on CartPage inner text is 'Coupon code applied successfully.'
Set '0' into QuantityNumber on CartPage
Click UpdateCartButton on CartPage
Ensure OrderTotalSpan on CartPage inner text is '95.00€'


```

```csharp
Feature: CommonServices
In order to use the browser
As a automation engineer
I want BELLATRIX to provide me handy method to do my job
Background:
Given I use Firefox browser on Windows
And I reuse the browser if started
And I capture HTTP traffic
And I take a screenshot for failed tests
And I record a video for failed tests
And I open browser
Scenario: Browser Service Common Steps
When I navigate to URL http://demos.bellatrix.solutions/product/falcon-9/
And I refresh the browser
When I wait until the browser is ready
And I wait for all AJAX requests to finish
And I maximize the browser
And I navigate to URL http://demos.bellatrix.solutions/
And I click browser's back button
And I click browser's forward button
And I click browser's back button
And I wait for partial URL falcon-9
```
