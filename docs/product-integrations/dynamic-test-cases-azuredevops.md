---
layout: default
title:  "Dynamic Test Cases Azure DevOps"
excerpt: "Learn to create automatically test cases based on tests in Azure DevOps."
date:   2020-04-30 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/dynamic-test-cases-azuredevops/
anchors:
  what-is-a-dynamic-test-case: What Is a Dynamic Test Case?
  configuration: Configuration
---
What Is a Dynamic Test Case?
-------
Dynamic test cases are a unique feature in BELLATRIX, where the framework automatically generates test cases in a popular test case management system based on your automated tests. It will populate the title, description, and other necessary properties automatically. Moreover, it will generate human-readable steps and expected results. The most significant benefit is that it will keep up to date your auto-generated test cases over time, no matter what you change in your tests.
It is an excellent functionality to allow non-technical people of your company to see what your tests are doing.

![Bellatrix](images/dynamic-test-case-azure-devops.png)

The test case is associated automatically to your automated test.

![Bellatrix](images/dynamic-test-cases-azuredevops-associated-automation.png)

The requirements such as stories, epics, bugs are automatically linked.

![Bellatrix](images/dynamic-test-cases-azuredevops-link-requirements.png)

The description and preconditions are populated too.

![Bellatrix](images/dynamic-test-cases-azuredevops-description.png)

Configuration
-------------
First, you need to install the **Bellatrix.DynamicTestCases.AzureDevOps** NuGet package to your tests project.
Next, you need to enable the Azure DevOps dynamic test cases BELLATRIX extension in your **TestInitialize** file.
```csharp
[TestClass]
public class TestsInitialize : WebTest
{
    [AssemblyInitialize]
    public static void AssemblyInitialize(TestContext testContext)
    {
        AzureDevOpsBugReportingPluginConfiguration.Add();
    }

    [AssemblyCleanup]
    public static void AssemblyCleanup()
    {
        var app = ServicesCollection.Current.Resolve<App>();
        app?.Dispose();
    }
}
```
You need to add the following lines:
```csharp
AzureDevOpsBugReportingPluginConfiguration.Add();
```
They will turn on the feature and will assign listeners to common actions in the framework that will populate the auto-generated test case's steps and expected results.
Next, you need to add a new section in the **testFrameworkSettings.json** settings file.
```
"dynamicTestCasesSettings": {
    "isEnabled": "true",
    "url": "https://dev.azure.com/yourOrganization",
    "token": "authenticationToken",
    "organizationName": "yourOrganizationName",
    "projectName": "yourProjectName"
},
```
You can read the [the following article](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page "following article") how to generate an authentication token.
The last step is to configure the test classes and tests.
```csharp
[TestClass]
[Browser(BrowserType.Chrome, Lifecycle.RestartEveryTime)]
[AzureDevOpsDynamicTestCaseAttribute(AreaPath = "AutomateThePlanet", IterationPath = "AutomateThePlanet", RequirementId = "482")]
public class PageObjectsTests : WebTest
{
   [TestMethod]
   [AzureDevOpsDynamicTestCaseAttribute(
        Description = "Create a purchase of a rocket through the online rocket shop http://demos.bellatrix.solutions/")]
    public void PurchaseRocketWithPageObjects()
    {
		App.TestCases.AddPrecondition($"Navigate to http://demos.bellatrix.solutions/");
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
[DynamicTestCase(SuiteId = "8260474")]
```
On top of your class you need to place the **AzureDevOpsDynamicTestCaseAttribute** attribute and specify the area, iteration and maybe an ID of a story to be associated.
```csharp
[AzureDevOpsDynamicTestCaseAttribute(
        Description = "Create a purchase of a rocket through the online rocket shop http://demos.bellatrix.solutions/")]
```
On top of your class, you need to place the **DynamicTestCase** attribute and optionally you can specify custom test case name and description.
```csharp
App.TestCases.AddPrecondition($"Navigate to http://demos.bellatrix.solutions/");
```
Through **TestCases** property, you can add preconditions, custom steps, or expected results. You have access to it through the App service or directly in the BELLATRIX page objects.