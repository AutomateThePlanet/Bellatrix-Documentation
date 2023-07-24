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

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"

export ANDROID_SDK_ROOT="$HOME/Library/Android/sdk"
```

```bash
npm install -g appium
```

```bash
export PATH="$HOME/Library/Android/sdk/platform-tools:$PATH"

```

```bash
adb shell
```

```bash
adb install pathToYourApk/yourTestApp.apk
```

```bash
dumpsys window windows | grep -E 'mCurrentFocus|mFocusedApp'
```

```java
private static AndroidDriver < AndroidElement > driver;
@BeforeClass
public void classInit() throws URISyntaxException, MalformedURLException {
  URL testAppUrl = getClass().getClassLoader().getResource("ApiDemos.apk");
  File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
  String testAppPath = testAppFile.getAbsolutePath();
  var desiredCaps = new DesiredCapabilities();
  desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "android25-test");
  desiredCaps.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis");
  desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
  desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1");
  desiredCaps.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".view.Controls1");
  desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath);
  driver = new AndroidDriver < AndroidElement > (new URL("http://127.0.0.1:4723/wd/hub"), desiredCaps);
  driver.closeApp();
}
@BeforeMethod
public void testInit() {
  if (driver != null) {
    driver.launchApp();
    driver.startActivity(new Activity("com.example.android.apis", ".view.Controls1"));
  }
}
@AfterMethod
public void testCleanup() {
  if (driver != null) {
    driver.closeApp();
  }
}
```

```java
appiumLocalService = new AppiumServiceBuilder().usingAnyFreePort().build();
appiumLocalService.start();
```

```java
URL testAppUrl = getClass().getClassLoader().getResource("ApiDemos.apk");
File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
String testAppPath = testAppFile.getAbsolutePath();
```

```java
URL testAppUrl = getClass().getClassLoader().getResource("ApiDemos.apk");
File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
String testAppPath = testAppFile.getAbsolutePath();
var desiredCaps = new DesiredCapabilities();
desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "android25-test");
desiredCaps.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis");
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1");
desiredCaps.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".view.Controls1");
desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath);
```

```java
@Test
public void locatingElementsTest() {
  AndroidElement button = driver.findElementById("com.example.android.apis:id/button");
button.click();
  AndroidElement checkBox = driver.findElementByClassName("android.widget.CheckBox");
checkBox.click();
  AndroidElement secondButton = driver.findElementByXPath("//*[@resource-id='com.example.android.apis:id/button']");
secondButton.click();
  AndroidElement thirdButton = driver.findElementByAndroidUIAutomator("new UiSelector().textContains(\"BUTTO\");");
thirdButton.click();
}
```

```java
@Test
public void locatingElementsInsideAnotherElementTest() {
  var mainElement = driver.findElementById("android:id/content");
  var button = mainElement.findElementById("com.example.android.apis:id/button");
button.click();
  var checkBox = mainElement.findElementByClassName("android.widget.CheckBox");
checkBox.click();
  var secondButton = mainElement.findElementByXPath("//*[@resource-id='com.example.android.apis:id/button']");
secondButton.click();
  var thirdButton = mainElement.findElementByAndroidUIAutomator("new UiSelector().textContains(\"BUTTO\");");
thirdButton.click();
}
```

```java

@Test
public void moveToTest() {
    TouchAction touchAction = new TouchAction(driver);
    AndroidElement element = driver.findElementById("android:id/content");
    Point point = element.getLocation();
    touchAction.moveTo(PointOption.point(point)).perform();
}
```

```java
@Test
public void tapTest() {
  TouchAction touchAction = new TouchAction(driver);
  AndroidElement element = driver.findElementById("android:id/content");
  Point point = element.getLocation();
  touchAction.tap(TapOptions.tapOptions().withPosition(PointOption.point(point)).withTapsCount(2)).perform();
}
```

## Most Complete Appium Kotlin Cheat Sheet

```java
// Maven: io.appium:java-client
appiumLocalService = AppiumServiceBuilder().usingAnyFreePort().build() // Creates local Appium server instance
appiumLocalService.start() // Starts local Appium server instance
val desiredCapabilities = DesiredCapabilities()
// Android capabilities
desiredCapabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2")
desiredCapabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Android Virtual Device")
desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android")
desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1")
// iOS capabilities
desiredCapabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "XCUITest")
desiredCapabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 11")
desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS")
desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "13.2")
// Install and start an app on Android
desiredCapabilities.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis")
desiredCapabilities.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".ApiDemos")
desiredCapabilities.setCapability(MobileCapabilityType.APP, "path/to/TestApp.apk")
// Install and start an app on iOS
desiredCapabilities.setCapability(MobileCapabilityType.APP, "path/to/TestApp.app.zip")
// Start mobile browser on Android
desiredCapabilities.setCapability(MobileCapabilityType.BROWSER_NAME, "Chrome")
// Start mobile browser on iOS
desiredCapabilities.setCapability(MobileCapabilityType.BROWSER_NAME, "safari")
// Set WebView Context for Hybrid Apps
driver.context(driver.contextHandles.stream().filter {
  it.contains("WEBVIEW")
}.findFirst().orElse(null))
// Use local server instance
driver = AndroidDriver < AndroidElement > (appiumLocalService, desiredCapabilities) // initialize Android driver on local server instance
driver = IOSDriver < IOSElement > (appiumLocalService, desiredCapabilities) // initialize iOS driver on local server instance
// Use remote Appium driver
driver = AndroidDriver < AndroidElement > (URL("http://127.0.0.1:4723/wd/hub"), desiredCapabilities) // initialize Android remote driver
driver = IOSDriver < IOSElement > (URL("http://127.0.0.1:4723/wd/hub"), desiredCapabilities) // initialize iOS remote driver
```

```java
driver.findElementById("android:id/text1")
driver.findElementByClassName("android.widget.CheckBox")
driver.findElementByXPath("//*[@text='Views']")
driver.findElementByAccessibilityId("Views")
driver.findElementByImage(base64EncodedImageFile)
driver.findElementByAndroidUIAutomator("new UiSelector().text("Views");")
driver.findElementByIosNsPredicate("type == 'XCUIElementBottn' AND name == 'ComputeSumButton'")
// Find multiple elements
driver.findElementsByClassName("android.widget.CheckBox")
```

```java
// Alert handling
driver.switchTo().alert().accept()
driver.switchTo().alert().dismiss()
// Basic actions
element.click()
element.sendKeys("textToType")
element.clear()
// Change orientation
driver.rotate(ScreenOrientation.LANDSCAPE) // PORTRAIT
// Clipboard
driver.setClipboardText("1234", "plaintext")
val clipboard: String = driver.clipboardText
// Mobile gestures
val touchAction = TouchAction(driver)
touchAction.tap(TapOptions.tapOptions()
.withPosition(PointOption.point(x, y)).withTapsCount(count))
touchAction.press(PointOption.point(x, y))
touchAction.waitAction(WaitOptions
.waitOptions(Duration.ofMillis(200)))
touchAction.moveTo(PointOption.point(x, y))
touchAction.release()
touchAction.longPress(PointOption.point(x, y))
touchAction.perform()
// Simulate phone call (Emulator only)
driver.makeGsmCall("5551237890", GsmCallActions.ACCEPT)
driver.makeGsmCall("5551237890", GsmCallActions.CALL)
driver.makeGsmCall("5551237890", GsmCallActions.CALL)
driver.makeGsmCall("5551237890", GsmCallActions.HOLD)
// Set GSM voice state (Emulator only)
driver.setGsmVoice(GsmVoiceState.DENIED)
driver.setGsmVoice(GsmVoiceState.HOME)
driver.setGsmVoice(GsmVoiceState.OFF)
driver.setGsmVoice(GsmVoiceState.ON)
driver.setGsmVoice(GsmVoiceState.ROAMING)
driver.setGsmVoice(GsmVoiceState.SEARCHING)
driver.setGsmVoice(GsmVoiceState.UNREGISTERED)
// Set GSM signal strength (Emulator only)
driver.setGsmSignalStrength(GsmSignalStrength.GOOD)
driver.setGsmSignalStrength(GsmSignalStrength.GREAT)
driver.setGsmSignalStrength(GsmSignalStrength.MODERATE)
driver.setGsmSignalStrength(GsmSignalStrength.NONE_OR_UNKNOWN)
driver.setGsmSignalStrength(GsmSignalStrength.POOR)
// Set network speed (Emulator only)
driver.setNetworkSpeed(NetworkSpeed.LTE)
// Simulate receiving SMS message (Emulator only)
driver.sendSMS("555-555-5555", "Your code is 123456")
// Toggle services
driver.toggleAirplaneMode()
driver.toggleData()
driver.toggleLocationServices()
driver.toggleWifi()
// Soft keyboard actions
driver.isKeyboardShown() // returns boolean
driver.hideKeyboard()
// Lock device
driver.isDeviceLocked() // returns boolean
driver.lockDevice()
driver.unlockDevice()
// Notifications
driver.openNotifications()
// Geolocation actions
driver.location // returns Location {Latitude, Longitude, Altitude}
driver.setLocation(Location(94.23, 121.21, 11.56))
// Get system time
driver.deviceTime // returns String
// Get display density
driver.displayDensity // returns long
// File actions
driver.pushFile("/data/local/tmp/file", File("path/to/file"))
driver.pullFile("/path/to/device/file") // returns byte[]
driver.pullFolder("/path/to/device") // returns byte[]
```

```java
// Multitouch action
val actionOne = TouchAction(driver)
actionOne.press(PointOption.point(10, 10))
actionOne.moveTo(PointOption.point(10, 100))
actionOne.release()
val actionTwo = TouchAction(driver);
actionTwo.press(PointOption.point(20, 20))
actionTwo.moveTo(PointOption.point(20, 200))
actionTwo.release()
val action = MultiTouchAction(driver)
action.add(actionOne)
action.add(actionTwo)
action.perform()
// Swipe using touch action
val touchAction = new TouchAction(driver)
val element = driver.findElementById("android:id/text1")
Pointpoint = element.coordinates.onPage()
Dimensionsize = element.size
touchAction
.press(PointOption.point(point.x + 5, point.y + 5))
.waitAction(WaitOptions.waitOptions(Duration.ofMillis(200)))
.moveTo(PointOption.point(point.x + size.width - 5, point.y + size.height - 5))
.release().perform();
// Scroll using JavascriptExecutor
val js = driver as JavascriptExecutor
val swipe = HashMap<String, String>()
swipe["direction"] = "down"; // "up", "right", "left"
swipe["element"] = element.id
js.executeScript("mobile:swipe", swipe)
// Scroll element into view by Android UI automator
driver.findElementByAndroidUIAutomator("new UiScrollable(new UiSelector()).scrollIntoView(new UiSelector().text("Views"));");
// Update Device Settings
driver.setSetting(Setting.KEYBOARD_AUTOCORRECTION, false)
driver.settings // returns Map<String, Object>
// Take screenshot
(driver as TakesScreenshot).getScreenshotAs(OutputType.FILE) // BYTES, BASE64 – returns File, byte[] or String (base64 encoded PNG)
// Screen record
driver.startRecordingScreen()
driver.stopRecordingScreen()
```

```java
// Add photos
driver.pushFile("/mnt/sdcard/Pictures/img.jpg", File("path/to/img.jpg"))
// Simulate hardware key
driver.pressKey(KeyEvent().withKey(AndroidKey.HOME))
driver.longPressKey(KeyEvent().withKey(AndroidKey.POWER))
// Set battery percentage
driver.setPowerCapacity(100)
// Set the state of the battery charger to connected or not
driver.setPowerAC(PowerACState.ON)
driver.setPowerAC(PowerACState.OFF)
// Get performance data
driver.getPerformanceData("my.app.package", "cpuinfo", 5) // returns List<List<Object>>
```

```java
// Add photos
driver.pushFile("img.jpg", File("path/to/img.jpg"))
// Simulate hardware key
val args = HashMap<String, Any>()
args["name"] = "home" // volumeup; volumedown
driver.executeScript("mobile: pressButton", args)
// Sending voice commands to Siri
val args = HashMap<String, Any>()
args["text"] = "Hey Siri, what's happening?"
driver.executeScript("mobile: siriCommand", args)
// Perform Touch ID in iOS Simulator
driver.performTouchID(false) // Simulates a failed touch ID
driver.performTouchID(true) // Simulates a passing touch ID
// Shake device
driver.shake()
```

```java
// Install app
driver.installApp("path/to/app.apk")
// Remove app
driver.removeApp("com.example.AppName")
// Verify app is installed
driver.isAppInstalled("com.example.android.apis") // returns bool
// Launch app
driver.launchApp()
// Start activity
driver.startActivity(Activity("com.example.android.apis", ".ApiDemos"))
// Get current activity
driver.currentActivity() // returns String
// Get current package
driver.currentPackage // returns String
// Reset app
driver.resetApp()
// Close app
driver.closeApp()
// Run current app in background
driver.runAppInBackground(Duration.ofSeconds(10)) // 10 seconds
// Terminate app
driver.terminateApp("com.example.android.apis") // returns bool
// Check app's current state
driver.queryAppState("com.example.android.apis") // returns ApplicationState
// Get app strings
driver.getAppStringMap("en", "path/to/file") // returns Map<String, String>
```

```java
// Install app
val args = HashMap<String, Any>()
args["app"] = "path/to/app.ipa"
driver.executeScript("mobile: installApp", args)
// Remove app
val args = HashMap<String, Any>()
args["bundleId"] = "com.myapp"
driver.executeScript("mobile: removeApp", args)
// Verify app is installed
val args = HashMap<String, Any>()
args["bundleId"] = "com.myapp"
driver.executeScript("mobile: isAppInstalled", args)
// Launch app
val args = HashMap<String, Any>()
args["bundleId"] = "com.apple.calculator"
driver.executeScript("mobile: launchApp", args)
// Switch app to foreground
val args = HashMap<String, Any>()
args["bundleId"] = "com.myapp"
driver.executeScript("mobile: activateApp", args)
// Terminate app
val args = HashMap<String, Any>()
args["bundleId"] = "com.myapp"
// will return false if app is not running, otherwise true
driver.executeScript("mobile: terminateApp", args)
// Check app's current state
val args = HashMap<String, Any>()
args["bundleId"] = "com.myapp"
// will return false if app is not running, otherwise true
driver.executeScript("mobile: queryAppState", args)
```

## Getting Started with Appium for Android Java on Windows in 10 Minutes

```java
private static AndroidDriver < AndroidElement > driver;
@BeforeClass
public void classInit() throws URISyntaxException, MalformedURLException {
  URL testAppUrl = getClass().getClassLoader().getResource("ApiDemos.apk");
  File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
  String testAppPath = testAppFile.getAbsolutePath();
  var desiredCaps = new DesiredCapabilities();
  desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "android25-test");
  desiredCaps.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis");
  desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
  desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1");
  desiredCaps.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".view.Controls1");
  desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath);
  driver = new AndroidDriver < AndroidElement > (new URL("http://127.0.0.1:4723/wd/hub"), desiredCaps);
  driver.closeApp();
}
@BeforeMethod
public void testInit() {
  if (driver != null) {
    driver.launchApp();
    driver.startActivity(new Activity("com.example.android.apis", ".view.Controls1"));
  }
}
@AfterMethod
public void testCleanup() {
    if (driver != null) {
      driver.closeApp();
   }
}
```

```java
appiumLocalService = new AppiumServiceBuilder().usingAnyFreePort().build();
appiumLocalService.start();
```

```java
URL testAppUrl = getClass().getClassLoader().getResource("ApiDemos.apk");
File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
String testAppPath = testAppFile.getAbsolutePath();
```

```java
URL testAppUrl = getClass().getClassLoader().getResource("ApiDemos.apk");
File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
String testAppPath = testAppFile.getAbsolutePath();
var desiredCaps = new DesiredCapabilities();
desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "android25-test");
desiredCaps.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis");
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1");
desiredCaps.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".view.Controls1");
desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath);
```

```java
@Test
public void locatingElementsInsideAnotherElementTest() {
  var mainElement = driver.findElementById("android:id/content");
  var button = mainElement.findElementById("com.example.android.apis:id/button");
  button.click();
  var checkBox = mainElement.findElementByClassName("android.widget.CheckBox");
  checkBox.click();
  var secondButton = mainElement.findElementByXPath("//*[@resource-id='com.example.android.apis:id/button']");
  secondButton.click();
  var thirdButton = mainElement.findElementByAndroidUIAutomator("new UiSelector().textContains(\"BUTTO\");");
  thirdButton.click();
}
```

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

## Getting Started with Appium for Android Kotlin on Windows in 10 Minutes

```kotlin
private lateinit var driver: AndroidDriver<AndroidElement>

@BeforeClass
fun classInit() {
    val testAppUrl = javaClass.classLoader.getResource("ApiDemos.apk")
    val testAppFile = Paths.get((testAppUrl!!).toURI()).toFile()
    val testAppPath = testAppFile.absolutePath
    val desiredCaps = DesiredCapabilities()
    desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "android25-test")
    desiredCaps.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis")
    desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android")
    desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1")
    desiredCaps.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".view.Controls1")
    desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath)
    driver = AndroidDriver<AndroidElement>(URL("http://127.0.0.1:4723/wd/hub"), desiredCaps)
    driver.closeApp()
}

@BeforeMethod
fun testInit() {
    driver.launchApp()
    driver.startActivity(Activity("com.example.android.apis", ".view.Controls1"))
}

@AfterMethod
fun testCleanup() {
    driver.closeApp()
}
```

```kotlin
appiumLocalService = AppiumServiceBuilder().usingAnyFreePort().build()
appiumLocalService.start()
```

```kotlin
val testAppUrl = javaClass.classLoader.getResource("ApiDemos.apk")
val testAppFile = Paths.get((testAppUrl!!).toURI()).toFile()
val testAppPath = testAppFile.absolutePath
```

```kotlin
val testAppUrl = javaClass.classLoader.getResource("ApiDemos.apk")
val testAppFile = Paths.get((testAppUrl!!).toURI()).toFile()
val testAppPath = testAppFile.absolutePath
val desiredCaps = DesiredCapabilities()
desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "android25-test")
desiredCaps.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis")
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android")
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1")
desiredCaps.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".view.Controls1")
desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath)
```

```kotlin
@Test
fun locatingElementsInsideAnotherElementTest() {
    val mainElement = driver.findElementById("android:id/content")
    val button = mainElement.findElementById("com.example.android.apis:id/button")
    button.click()
    val checkBox = mainElement.findElementByClassName("android.widget.CheckBox")
    checkBox.click()
    val secondButton =
        mainElement.findElementByXPath("//*[@resource-id='com.example.android.apis:id/button']")
    secondButton.click()
    val thirdButton =
        mainElement.findElementByAndroidUIAutomator("new UiSelector().textContains(\"BUTTO\");")
    thirdButton.click()
}

```

```kotlin
@Test
fun swipeTest() {
    class PlatformTouchAction(performsTouchActions: PerformsTouchActions) :
        TouchAction<PlatformTouchAction>(performsTouchActions)
    driver.startActivity(Activity("com.example.android.apis", ".graphics.FingerPaint"))
    val touchAction = PlatformTouchAction(driver)
    val element = driver.findElementById("android:id/content")
    val point = element.location
    val size = element.size
    touchAction
        .press(PointOption.point(point.x + 5, point.y + 5))
        .waitAction(WaitOptions.waitOptions(Duration.ofMillis(200)))
        .moveTo(PointOption.point(point.x + size.width - 5, point.y + size.height - 5))
        .release()
        .perform()
}

```

## Getting Started with Appium for iOS Java on macOS in 10 Minutes

```bash
Install Node.js
```

```bash
npm install -g appium

```

```java
private static IOSDriver < IOSElement > driver;
@BeforeClass
public void classInit() throws URISyntaxException, MalformedURLException {
  URL testAppUrl = getClass().getClassLoader().getResource("TestApp.app.zip");
  File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
  String testAppPath = testAppFile.getAbsolutePath();
  var desiredCaps = new DesiredCapabilities();
  desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 12 Pro Max");
  desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS");
  desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "14.4");
  desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath);
  driver = new IOSDriver < IOSElement > (new URL("http://127.0.0.1:4723/wd/hub"), desiredCaps);
  driver.closeApp();
}
@BeforeMethod
public void testInit() {
  if (driver != null) {
    driver.launchApp();
  }
}
@AfterMethod
public void testCleanup() {
  if (driver != null) {
    driver.closeApp();
  }
}
```

```java
appiumLocalService = new AppiumServiceBuilder().usingAnyFreePort().build();
appiumLocalService.start();
```

```java
URL testAppUrl = getClass().getClassLoader().getResource("TestApp.app.zip");
File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
String testAppPath = testAppFile.getAbsolutePath();
```

```java
URL testAppUrl = getClass().getClassLoader().getResource("TestApp.app.zip");
File testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile();
String testAppPath = testAppFile.getAbsolutePath();
var desiredCaps = new DesiredCapabilities();
desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 8");
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS");
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "14.4");
desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath);

driver = new IOSDriver<IOSElement>(new URL("http://127.0.0.1:4723/wd/hub"), desiredCaps);

```

```java
@Test
public void addTwoNumbersTest() {
  var numberOne = driver.findElementByName("IntegerA");
  var numberTwo = driver.findElementByName("IntegerB");
  var compute = driver.findElementByName("ComputeSumButton");
  var answer = driver.findElementByName("Answer");
  numberOne.clear();
  numberOne.setValue("5");
  numberTwo.clear();
  numberTwo.setValue("6");
  compute.click();
  Assert.assertEquals("11", answer.getAttribute("value"));
}
```

```java
@Test
public void locatingElementsInsideAnotherElementTest() {
  var mainElement = driver.findElementByIosNsPredicate("type == \"XCUIElementTypeApplication\" AND name == \"TestApp\"");
  var numberOne = mainElement.findElementById("IntegerA");
  var numberTwo = mainElement.findElementById("IntegerB");
  var compute = mainElement.findElementByName("ComputeSumButton");
  var answer = mainElement.findElementByName("Answer");
  numberOne.clear();
  numberOne.setValue("5");
  numberTwo.clear();
  numberTwo.setValue("6");
  compute.click();
  Assert.assertEquals("11", answer.getAttribute("value"));
}
```

```java
@Test
public void swipeTest() {
  TouchAction touchAction = new TouchAction(driver);
  var element = driver.findElementById("IntegerA");
  Point point = element.getLocation();
  Dimension size = element.getSize();
  touchAction.press(PointOption.point(point.getX() + 5, point.getY() + 5))
    .waitAction(WaitOptions.waitOptions(Duration.ofMillis(200)))
    .moveTo(PointOption.point(point.getX() + size.getWidth() - 5, point.getY() + size.getHeight() - 5))
    .release()
    .perform();
}
```

```java
@Test
public void moveToTest() {
  TouchAction touchAction = new TouchAction(driver);
  var element = driver.findElementById("IntegerA");
  Point point = element.getLocation();
  touchAction.moveTo(PointOption.point(point)).perform();
}
```

```java
@Test
public void tapTest() {
  TouchAction touchAction = new TouchAction(driver);
  var element = driver.findElementById("IntegerA");
  Point point = element.getLocation();
  touchAction.tap(TapOptions.tapOptions().withPosition(PointOption.point(point)).withTapsCount(2)).perform();
}
```

## Getting Started with Appium for Android Kotlin on macOS in 10 Minutes

```bash
export JAVA_HOME="/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home"
```

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
```

```bash
export ANDROID_SDK_ROOT="$HOME/Library/Android/sdk"
```

```bash
npm install -g appium
```

```bash
export PATH="$HOME/Library/Android/sdk/platform-tools:$PATH"
```

```bash
adb install pathToYourApk/yourTestApp.apk
```

```bash
dumpsys window windows | grep -E 'mCurrentFocus|mFocusedApp'
```

```kotlin
private lateinit var driver: AndroidDriver<AndroidElement>

@BeforeClass
fun classInit() {
    val testAppUrl = javaClass.classLoader.getResource("ApiDemos.apk")
    val testAppFile = Paths.get((testAppUrl!!).toURI()).toFile()
    val testAppPath = testAppFile.absolutePath
    val desiredCaps = DesiredCapabilities()
    desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "android25-test")
    desiredCaps.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis")
    desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android")
    desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1")
    desiredCaps.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".view.Controls1")
    desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath)
    driver = AndroidDriver<AndroidElement>(URL("http://127.0.0.1:4723/wd/hub"), desiredCaps)
    driver.closeApp()
}

@BeforeMethod
fun testInit() {
    driver.launchApp()
    driver.startActivity(Activity("com.example.android.apis", ".view.Controls1"))
}

@AfterMethod
fun testCleanup() {
    driver.closeApp()
}

```

```kotlin
appiumLocalService = AppiumServiceBuilder().usingAnyFreePort().build()
appiumLocalService.start()
```

```kotlin
val testAppUrl = javaClass.classLoader.getResource("ApiDemos.apk")
val testAppFile = Paths.get((testAppUrl!!).toURI()).toFile()
val testAppPath = testAppFile.absolutePath
```

```kotlin
val testAppUrl = javaClass.classLoader.getResource("ApiDemos.apk")
val testAppFile = Paths.get((testAppUrl!!).toURI()).toFile()
val testAppPath = testAppFile.absolutePath
val desiredCaps = DesiredCapabilities()
desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "android25-test")
desiredCaps.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis")
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android")
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1")
desiredCaps.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".view.Controls1")
desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath)
```

```kotlin

@Test
fun locatingElementsTest() {
    val button = driver.findElementById("com.example.android.apis:id/button")
    button.click()
    val checkBox = driver.findElementByClassName("android.widget.CheckBox")
    checkBox.click()
    val secondButton =
        driver.findElementByXPath("//*[@resource-id='com.example.android.apis:id/button']")
    secondButton.click()
    val thirdButton =
        driver.findElementByAndroidUIAutomator("new UiSelector().textContains(" BUTTO ");")
    thirdButton.click()
}
```

```kotlin
@Test
fun locatingElementsInsideAnotherElementTest() {
    val mainElement = driver.findElementById("android:id/content")
    val button = mainElement.findElementById("com.example.android.apis:id/button")
    button.click()
    val checkBox = mainElement.findElementByClassName("android.widget.CheckBox")
    checkBox.click()
    val secondButton =
        mainElement.findElementByXPath("//*[@resource-id='com.example.android.apis:id/button']")
    secondButton.click()
    val thirdButton =
        mainElement.findElementByAndroidUIAutomator("new UiSelector().textContains(\"BUTTO\");")
    thirdButton.click()
}

```

```kotlin
@Test
fun swipeTest() {
    class PlatformTouchAction(performsTouchActions: PerformsTouchActions) :
        TouchAction<PlatformTouchAction>(performsTouchActions)
    driver.startActivity(Activity("com.example.android.apis", ".graphics.FingerPaint"))
    val touchAction = PlatformTouchAction(driver)
    val element = driver.findElementById("android:id/content")
    val point = element.location
    val size = element.size
    touchAction
        .press(PointOption.point(point.x + 5, point.y + 5))
        .waitAction(WaitOptions.waitOptions(Duration.ofMillis(200)))
        .moveTo(PointOption.point(point.x + size.width - 5, point.y + size.height - 5))
        .release()
        .perform()
}

```

```kotlin
@Test
fun moveToTest() {
    class PlatformTouchAction(performsTouchActions: PerformsTouchActions) :
        TouchAction<PlatformTouchAction>(performsTouchActions)
    val touchAction = PlatformTouchAction(driver)
    val element = driver.findElementById("android:id/content")
    val point = element.location
    touchAction.moveTo(PointOption.point(point)).perform()
}

```

```kotlin
@Test
fun tapTest() {
    class PlatformTouchAction(performsTouchActions: PerformsTouchActions) :
        TouchAction<PlatformTouchAction>(performsTouchActions)
    val touchAction = PlatformTouchAction(driver)
    val element = driver.findElementById("android:id/content")
    val point = element.location
    touchAction
        .tap(TapOptions.tapOptions().withPosition(PointOption.point(point)).withTapsCount(2))
        .perform()
}

```

## Getting Started with Appium for iOS Kotlin on macOS in 10 Minutes

```bash
npm install -g appium
```

```kotlin
class AppiumTests {
    private lateinit var driver: IOSDriver<IOSElement>

    @BeforeClass
    fun classInit() {
        val testAppUrl = javaClass.classLoader.getResource("TestApp.app.zip")
        val testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile()
        val testAppPath = testAppFile.absolutePath
        val desiredCaps = DesiredCapabilities()
        desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 8")
        desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS")
        desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "14.4")
        desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath)
        driver = IOSDriver(URL("http://127.0.0.1:4723/wd/hub"), desiredCaps)
        driver.closeApp()
    }

    @BeforeMethod
    fun testInit() {
        driver.launchApp()
    }

    @AfterMethod
    fun testCleanup() {
        driver.closeApp()
    }
}

```

```kotlin
appiumLocalService = AppiumServiceBuilder().usingAnyFreePort().build()
appiumLocalService.start()
```

```kotlin
val testAppUrl = javaClass.classLoader.getResource("TestApp.app.zip")
val testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile()
val testAppPath = testAppFile.absolutePath
```

```kotlin
val testAppUrl = javaClass.classLoader.getResource("TestApp.app.zip")
val testAppFile = Paths.get(Objects.requireNonNull(testAppUrl).toURI()).toFile()
val testAppPath = testAppFile.absolutePath
val desiredCaps = DesiredCapabilities()
desiredCaps.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 8")
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS")
desiredCaps.setCapability(MobileCapabilityType.PLATFORM_VERSION, "14.4")
desiredCaps.setCapability(MobileCapabilityType.APP, testAppPath)
driver = IOSDriver(URL("http://127.0.0.1:4723/wd/hub"), desiredCaps)
```

```kotlin
@Test
fun addTwoNumbersTest() {
    val numberOne = driver.findElementByName("IntegerA")
    val numberTwo = driver.findElementByName("IntegerB")
    val compute = driver.findElementByName("ComputeSumButton")
    val answer = driver.findElementByName("Answer")
    numberOne.clear()
    numberOne.setValue("5")
    numberTwo.clear()
    numberTwo.setValue("6")
    compute.click()
    Assert.assertEquals("11", answer.getAttribute("value"))
}

```

```kotlin
@Test
fun locatingElementsInsideAnotherElementTest() {
    val mainElement =
        driver.findElementByIosNsPredicate(
            "type == \"XCUIElementTypeApplication\" AND name == \"TestApp\""
        )
    val numberOne = mainElement.findElementById("IntegerA")
    val numberTwo = mainElement.findElementById("IntegerB")
    val compute = mainElement.findElementByName("ComputeSumButton")
    val answer = mainElement.findElementByName("Answer")
    numberOne.clear()
    numberOne.setValue("5")
    numberTwo.clear()
    numberTwo.setValue("6")
    compute.click()
    Assert.assertEquals("11", answer.getAttribute("value"))
}
```

```kotlin
@Test
fun swipeTest() {
    class PlatformTouchAction(performsTouchActions: PerformsTouchActions) :
        TouchAction<PlatformTouchAction>(performsTouchActions)
    val touchAction = PlatformTouchAction(driver)
    val element = driver.findElementById("IntegerA")
    val point = element.location
    val size = element.size
    touchAction
        .press(PointOption.point(point.x + 5, point.y + 5))
        .waitAction(WaitOptions.waitOptions(Duration.ofMillis(200)))
        .moveTo(PointOption.point(point.x + size.width - 5, point.y + size.height - 5))
        .release()
        .perform()
}

```

```kotlin
@Test
fun moveToTest() {
    class PlatformTouchAction(performsTouchActions: PerformsTouchActions) :
        TouchAction<PlatformTouchAction>(performsTouchActions)
    val touchAction = PlatformTouchAction(driver)
    val element = driver.findElementById("IntegerA")
    val point = element.location
    touchAction.moveTo(PointOption.point(point)).perform()
}

```

```kotlin
@Test
fun tapTest() {
    class PlatformTouchAction(performsTouchActions: PerformsTouchActions) :
        TouchAction<PlatformTouchAction>(performsTouchActions)
    val touchAction = PlatformTouchAction(driver)
    val element = driver.findElementById("IntegerA")
    val point = element.location
    touchAction
        .tap(TapOptions.tapOptions().withPosition(PointOption.point(point)).withTapsCount(2))
        .perform()
}

```
