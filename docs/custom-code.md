---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

## Testing for Developers- Unit Testing Fundamentals

```java
@TestMethodOrder(value = MethodOrderer.Random.class)
public class CalculatorTests {
    private final Calculator _calculator = new Calculator();

    @BeforeAll
    public static void setUpClass() {
        System.out.println("This is @BeforeAll annotation");
    }

    @BeforeEach
    public void setUp() {
        System.out.println("This is @BeforeEach annotation");
    }

    @NightlyRunTest
    @Order(2)
    public void test_Addition() {
        System.out.println("This is test 1");
        var actualResult = _calculator.add(1, 1);

        Assertions.assertEquals(2, actualResult);
    }

    @Test
    @Order(1)
    public void testAdditionDifferentNumbers() {
        System.out.println("This is test 2");
        var actualResult = _calculator.add(2, 1);

        Assertions.assertEquals(3, actualResult);
    }

    @AfterEach
    public void tearDown() {
        System.out.println("This is @After annotation");
    }

    @AfterAll
    public static void tearDownClass() {
        System.out.println("This is @AfterAll annotation");
    }
}
```

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int divide(int a, int b) {
        if (b == 0)
            throw new ArithmeticException("/ by zero");
        return a/b;
    }
}
```

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Tag("nightlyRun")
@Test
public @interface NightlyRunTest {
}
```

```java
public class FirstSeleniumTests {
    private WebDriver driver;

    @BeforeAll
    public static void setUpClass() {
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
    }

    @Test
    public void properCheckboxSelected() throws Exception {
        driver.navigate().to("https://lambdatest.github.io/sample-todo-app/");

        LocalDate birthDay = LocalDate.of(1990, 10, 20);
        // us 10/20/1990
        DateTimeFormatter usDateFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String dateToType = usDateFormat.format(birthDay);

        WebElement todoInput = driver.findElement(By.id("sampletodotext"));
        todoInput.sendKeys(dateToType);

        var addButton = driver.findElement(By.id("addbutton"));
        addButton.click();

        var todoCheckboxes = driver.findElements(By.xpath("//li[@ng-repeat]/input"));

        todoCheckboxes.get(2).click();

        var todoInfos = driver.findElements(By.xpath("//li[@ng-repeat]/span"));

        Assertions.assertEquals("20-10-1990", todoInfos.get(5).getText());

        String expectedUrl = "https://lambdatest.github.io/sample-todo-app/";
        Assertions.assertTrue(expectedUrl.equals(driver.getCurrentUrl()), "URL does not match");

        String notExpectedUrl = "https://www.lambdatest.com/";
        Assertions.assertFalse(notExpectedUrl.equals(driver.getCurrentUrl()), "URL match");

        var expectedItems = new String[] {
            "First Item",
            "Second Item",
            "Third Item",
            "Fourth Item",
            "Fifth Item",
            "20-10-1990"
        };
        var actualToDoInfos = todoInfos.stream().map(e - > e.getText()).toArray();
        Assertions.assertArrayEquals(expectedItems, actualToDoInfos);

        Exception exception = Assertions.assertThrows(ArithmeticException.class, () - > new Calculator().divide(1, 0));

        Assertions.assertEquals("/ by zero", exception.getMessage());

        Assertions.assertTimeout(ofMinutes(2), () - > {
            // perform your tasks
        });

        Assertions.assertAll(
            () - > Assertions.assertTrue(expectedUrl.equals(driver.getCurrentUrl()), "URL does not match"),
            () - > Assertions.assertFalse(notExpectedUrl.equals(driver.getCurrentUrl()), "URL match"),
            () - > Assertions.assertArrayEquals(expectedItems, actualToDoInfos)
        );

        double actualDoubleValue = 2.999;
        double expectedDoubleValue = 3.000;

        Assertions.assertEquals(expectedDoubleValue, actualDoubleValue, 0.001);

        var currentTime = LocalDateTime.now();
        var currentTimeInPast = LocalDateTime.now().minusMinutes(3);

        DateTimeAssert.assertEquals(currentTime, currentTimeInPast, DateTimeDeltaType.MINUTES, 4);
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

```java
Assertions.assertEquals("20-10-1990", todoInfos.get(5).getText());
```

```java
Assertions.assertTrue(expectedUrl.equals(driver.getCurrentUrl()), "URL does not match");
```

```java
Assertions.assertFalse(notExpectedUrl.equals(driver.getCurrentUrl()), "URL match");
```

```java
Assertions.assertArrayEquals(expectedItems, actualToDoInfos);
```

```java
Exception exception = Assertions.assertThrows(ArithmeticException.class, () - > new Calculator().divide(1, 0));
Assertions.assertEquals("/ by zero", exception.getMessage());
```

```java
public class DateTimeAssert {
    public static void assertEquals(LocalDateTime expectedDate, LocalDateTime actualDate, DateTimeDeltaType deltaType, int count) throws Exception {
        if (((expectedDate == null) && (actualDate == null))) {
            return;
        }
        else if ((expectedDate == null)) {
            throw new NullPointerException("The expected date was null");
        }
        else if ((actualDate == null)) {
            throw new NullPointerException("The actual date was null");
        }

        Duration expectedDelta = DateTimeAssert.getTimeSpanDeltaByType(deltaType, count);

        double totalSecondsDifference = Math.abs((actualDate.until(expectedDate, ChronoUnit.SECONDS)));

        if ((totalSecondsDifference > expectedDelta.getSeconds())) {
            var exceptionMessage =String.format("Expected Date: {0}, Actual Date: {1} \nExpected Delta: {2}, Actual Delta in seconds- {3} (Delta Type: " +
                    "{4})", expectedDate, actualDate, expectedDelta, totalSecondsDifference, deltaType);
            throw new Exception(exceptionMessage);
        }
    }

    private static Duration getTimeSpanDeltaByType(DateTimeDeltaType type, int count) {
        Duration result;
        switch (type) {
            case DAYS:
                result = Duration.ofDays(count);
                break;
            case MINUTES:
                result = Duration.ofMinutes(count);
                break;
            default:
                throw new NotImplementedException("The delta type is not implemented.");
        }
        return result;
    }
}
```
