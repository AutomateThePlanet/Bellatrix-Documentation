---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

# Design and Architecture

## How to Test the Test Automation Framework- Types of Tests

```csharp
[TestMethod]
[TestCategory(Categories.Chrome)]
public void DateSet_When_UseSetDateMethodWithDayBiggerThan9_Chrome()
{
    var dateElement = App.ElementCreateService.CreateById<Date>("myDate");
    dateElement.SetDate(2017, 11, 15);
    Assert.AreEqual("2017-11-15", dateElement.GetDate());
}
```

```csharp
[TestMethod]
public void DateSetThrowsArgumentException_When_Month0_Edge()
{
    var dateElement = App.ElementCreateService.CreateById<Date>("myDate");
    Assert.ThrowsException<ArgumentException>(() => dateElement.SetDate(2017, 0, 1));
}
```

```csharp
[TestMethod]
public void SettingDateCalled_BeforeActuallySetDate()
{
    Date.SettingDate += AssertValueAttributeEmpty;
    var dateElement = App.ElementCreateService.CreateById<Date>("myDate");
    dateElement.SetDate(2017, 7, 6);
    Assert.AreEqual("2017-07-06", dateElement.GetDate());
    Date.SettingDate -= AssertValueAttributeEmpty;
    void AssertValueAttributeEmpty(object sender, ElementActionEventArgs args)
    {
        Assert.AreEqual(string.Empty, args.Element.WrappedElement.GetAttribute("value"));
    }
}
```

```csharp
[TestMethod]
public void LocallyOverriddenActionCalled_When_OverrideGetDateGloballyNotNull()
{
    Date.OverrideGetDateGlobally = (u) => "2017-06-01";
    var dateElement = App.ElementCreateService.CreateById<Date>("myDate");
    Date.OverrideGetDateLocally = (u) => "2017-07-01";
    Assert.AreEqual("2017-07-01", dateElement.GetDate());
    Date.OverrideGetDateGlobally = null;
}
```

```csharp

private Mock<IBellaLogger> _mockedLogger;
public override void TestInit()
{
    _mockedLogger = new Mock<IBellaLogger>();
    App.RegisterInstance(_mockedLogger.Object);
}
[TestMethod]
public void CreatesBDDLog_When_ClickButton()
{
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");
    button.Click();
    _mockedLogger.Verify(x => x.LogInformation(
    It.Is<string>(t => t.Contains("Click control (ID = button)"))), Times.Once());
}
```

```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
Constants.AndroidDefaultAndroidVersion,
Constants.AndroidRealDeviceName,
Constants.AndroidNativeAppAppExamplePackage,
".view.ControlsMaterialDark",
AppBehavior.RestartEveryTime)]
public class ElementCreateSingleElementTests : AndroidTest
{
    [TestMethod]
    public void ElementFound_When_CreateByText_And_ElementIsNotOnScreen()
    {
        var textField = _mainElement.CreateByText<TextField>("Text appearances");
        textField.EnsureIsVisible();
    }
}

```

```csharp
[VideoRecording(VideoRecordingMode.OnlyFail)]
[Android(Constants.AndroidNativeAppPath,
Constants.AndroidDefaultAndroidVersion,
Constants.AndroidDefaultDeviceName,
Constants.AndroidNativeAppAppExamplePackage,
".view.Controls1",
AppBehavior.ReuseIfStarted)]
public class VideoRecordingTests : AndroidTest
```

```csharp

public interface ITimeouts
{
    TimeSpan ImplicitWait { get; set; }
    [Obsolete("This method will be removed in a future version. Please set the ImplicitWait property instead.")]
    ITimeouts ImplicitlyWait(TimeSpan timeToWait);
}

```

```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
Constants.AndroidDefaultAndroidVersion,
Constants.AndroidGalaxyDeviceName,
Constants.AndroidNativeAppAppExamplePackage,
".view.Controls1",
AppBehavior.ReuseIfStarted)]
public class ButtonControlTests : AndroidTest
[TestClass]
[Android(Constants.AndroidNativeAppPath,
Constants.AndroidDefaultAndroidVersion,
Constants.AndroidNokiaDeviceName,
Constants.AndroidNativeAppAppExamplePackage,
".view.Controls1",
AppBehavior.ReuseIfStarted)]
public class ButtonControlTests : AndroidTest
```

```csharp
[TestClass]
[IOS(Constants.IOSNativeAppPath,
Constants.IOSDefaultVersion,
Constants.IOSDefaultDeviceName,
AppBehavior.RestartEveryTime)]
public class ButtonControlTests : IOSTest
{
    [TestMethod]
    [Timeout(30000)]
    public void ZeroReturnForButtonText_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");
        button.Click();
        var answerLabel = App.ElementCreateService.CreateByName<Label>("Answer");
        answerLabel.EnsureTextIs("0");
    }
}
```

## Advanced Behaviours Design Pattern in Automated Testing Part 1

```csharp
public interface IBehaviour
{
    void Execute();
}
```

```csharp
public abstract class ActionBehaviour : IBehaviour
{
    public void Execute()
    {
        this.PerformAct();
    }
    protected abstract void PerformAct();
}
```

```csharp
public abstract class AssertBehaviour : IBehaviour
{
    public void Execute()
    {
        this.Assert();
    }
    protected abstract void Assert();
}
```

```csharp
public abstract class WaitableActionBehaviour : IBehaviour
{
    public void Execute()
    {
        this.PerformAct();
        this.PerformPostActWait();
    }
    protected abstract void PerformAct();
    protected abstract void PerformPostActWait();
}
```

```csharp
public class WaitableAssertableActionBehaviour : IBehaviour
{
    public void Execute()
    {
        this.PerformPreActWait();
        this.PerformPreActAssert();
        this.PerformAct();
        this.PerformPostActAssert();
        this.PerformPostActWait();
        this.PerformPostActWaitAssert();
    }
    protected virtual void PerformPreActWait()
    {
    }
    protected virtual void PerformPreActAssert()
    {
    }
    protected virtual void PerformAct()
    {
    }
    protected virtual void PerformPostActAssert()
    {
    }
    protected virtual void PerformPostActWait()
    {
    }
    protected virtual void PerformPostActWaitAssert()
    {
    }
}
```

```csharp
public class ItemPageNavigationBehaviour : ActionBehaviour
{
    private readonly ItemPage itemPage;
    private readonly string itemUrl;
    public ItemPageNavigationBehaviour(string itemUrl)
    {
        this.itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
        this.itemUrl = itemUrl;
    }
    protected override void PerformAct()
    {
        this.itemPage.Navigate(this.itemUrl);
    }
}
```

```csharp
public static class UnityContainerFactory
{
    private static IUnityContainer unityContainer;
    static UnityContainerFactory()
    {
        unityContainer = new UnityContainer();
    }
    public static IUnityContainer GetContainer()
    {
        return unityContainer;
    }
}
```

```csharp
public class SignInPageLoginBehaviour : WaitableActionBehaviour
{
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ClientLoginInfo clientLoginInfo;
    public SignInPageLoginBehaviour(ClientLoginInfo clientLoginInfo)
    {
        this.signInPage =
        UnityContainerFactory.GetContainer().Resolve<SignInPage>();
        this.shippingAddressPage =
        UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        this.clientLoginInfo = clientLoginInfo;
    }
    protected override void PerformPostActWait()
    {
        this.shippingAddressPage.WaitForPageToLoad();
    }
    protected override void PerformAct()
    {
        this.signInPage.Login(this.clientLoginInfo.Email, this.clientLoginInfo.Password);
    }
}
```

```csharp
public static class BehaviourExecutor
{
    public static void Execute(params IBehaviour[] behaviours)
    {
        foreach (var behaviour in behaviours)
        {
            behaviour.Execute();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_SimpleBehaviourEngine()
{
    var itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    var itemPrice = "40.49";
    var clientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    var clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    BehaviourExecutor.Execute(
    new ItemPageNavigationBehaviour(itemUrl),
    new ItemPageBuyBehaviour(),
    new PreviewShoppingCartPageProceedBehaviour(),
    new SignInPageLoginBehaviour(clientLoginInfo),
    new ShippingAddressPageFillShippingBehaviour(clientPurchaseInfo),
    new ShippingAddressPageFillDifferentBillingBehaviour(clientPurchaseInfo),
    new ShippingAddressPageContinueBehaviour(),
    new ShippingPaymentPageContinueBehaviour(),
    new PlaceOrderPageAssertFinalAmountsBehaviour(itemPrice));
}
```

## Behaviours Design Pattern in Automated Testing

```csharp
public interface IBehaviour
{
    void PerformAct();
    void PerformPostAct();
    void PerformPostActAsserts();
    void PerformPreActAsserts();
}
```

```csharp
public class Behaviour : IBehaviour
{
    public virtual void PerformAct()
    {
    }
    public virtual void PerformPostAct()
    {
    }
    public virtual void PerformPostActAsserts()
    {
    }
    public virtual void PerformPreActAsserts()
    {
    }
}
```

```csharp
public class ItemPageBuyBehaviour : Behaviour
{
    private readonly ItemPage itemPage;
    public ItemPageBuyBehaviour(ItemPage itemPage)
    {
        this.itemPage = itemPage;
    }
    public override void PerformAct()
    {
        this.itemPage.ClickBuyNowButton();
    }
}
```

```csharp
public class SignInPageLoginBehaviour : Behaviour
{
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    public SignInPageLoginBehaviour(
    SignInPage signInPage,
    ShippingAddressPage shippingAddressPage)
    {
        this.signInPage = signInPage;
        this.shippingAddressPage = shippingAddressPage;
    }
    public override void PerformAct()
    {
        this.signInPage.Login(
        PurchaseTestContext.ClientLoginInfo.Email,
        PurchaseTestContext.ClientLoginInfo.Password);
    }
    public override void PerformPostAct()
    {
        this.shippingAddressPage.WaitForPageToLoad();
    }
}
```

```csharp
public static class SimpleBehaviourEngine
{
    public static void Execute(params Type[] pageBehaviours)
    {
        foreach (Type pageBehaviour in pageBehaviours)
        {
            var currentbehaviour = Activator.CreateInstance(pageBehaviour) as Behaviour;
            currentbehaviour.PerformPreActAsserts();
            currentbehaviour.PerformAct();
            currentbehaviour.PerformPostActAsserts();
            currentbehaviour.PerformPostAct();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_SimpleBehaviourEngine()
{
    PurchaseTestContext.ItemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    PurchaseTestContext.ItemPrice = "40.49";
    PurchaseTestContext.ClientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    PurchaseTestContext.ClientPurchaseInfo.CouponCode = "99PERDIS";
    PurchaseTestContext.ClientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    SimpleBehaviourEngine.Execute(
    typeof(ItemPageNavigationBehaviour),
    typeof(ItemPageBuyBehaviour),
    typeof(PreviewShoppingCartPageProceedBehaviour),
    typeof(SignInPageLoginBehaviour),
    typeof(ShippingAddressPageFillShippingBehaviour),
    typeof(ShippingAddressPageFillDifferentBillingBehaviour),
    typeof(ShippingAddressPageContinueBehaviour),
    typeof(ShippingPaymentPageContinueBehaviour),
    typeof(PlaceOrderPageAssertFinalAmountsBehaviour));
}
```

```csharp
public static class GenericBehaviourEngine
{
    public static void Execute(params Type[] pageBehaviours)
    {
        foreach (Type pageBehaviour in pageBehaviours)
        {
            var currentbehaviour = Activator.CreateInstance(pageBehaviour) as Behaviour;
            currentbehaviour.PerformPreActAsserts();
            currentbehaviour.PerformAct();
            currentbehaviour.PerformPostActAsserts();
            currentbehaviour.PerformPostAct();
        }
    }
    public static void Execute<T1>()
    where T1 : Behaviour
    {
        Execute(typeof(T1));
    }
    public static void Execute<T1, T2>()
    where T1 : Behaviour
    where T2 : Behaviour
    {
        Execute(typeof(T1), typeof(T2));
    }
    public static void Execute<T1, T2, T3>()
    where T1 : Behaviour
    where T2 : Behaviour
    where T3 : Behaviour
    {
        Execute(typeof(T1), typeof(T2), typeof(T3));
    }
    public static void Execute<T1, T2, T3, T4>()
    where T1 : Behaviour
    where T2 : Behaviour
    where T3 : Behaviour
    where T4 : Behaviour
    {
        Execute(typeof(T1), typeof(T2), typeof(T3), typeof(T4));
    }
    // contains 15 more overloads...
    public static void Execute<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20>()
    where T1 : Behaviour
    where T2 : Behaviour
    where T3 : Behaviour
    where T4 : Behaviour
    where T5 : Behaviour
    where T6 : Behaviour
    where T7 : Behaviour
    where T8 : Behaviour
    where T9 : Behaviour
    where T10 : Behaviour
    where T11 : Behaviour
    where T12 : Behaviour
    where T13 : Behaviour
    where T14 : Behaviour
    where T15 : Behaviour
    where T16 : Behaviour
    where T17 : Behaviour
    where T18 : Behaviour
    where T19 : Behaviour
    where T20 : Behaviour
    {
        Execute(
        typeof(T1),
        typeof(T2),
        typeof(T3),
        typeof(T4),
        typeof(T5),
        typeof(T6),
        typeof(T7),
        typeof(T8),
        typeof(T9),
        typeof(T10),
        typeof(T12),
        typeof(T13),
        typeof(T14),
        typeof(T15),
        typeof(T16),
        typeof(T17),
        typeof(T18),
        typeof(T19),
        typeof(T20),
        typeof(T11));
    }
}
```

```csharp
[TestMethod]
public void Purchase_GenericBehaviourEngine()
{
    PurchaseTestContext.ItemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    PurchaseTestContext.ItemPrice = "40.49";
    PurchaseTestContext.ClientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    PurchaseTestContext.ClientPurchaseInfo.CouponCode = "99PERDIS";
    PurchaseTestContext.ClientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    GenericBehaviourEngine.Execute<
    ItemPageNavigationBehaviour,
    ItemPageBuyBehaviour,
    PreviewShoppingCartPageProceedBehaviour,
    SignInPageLoginBehaviour,
    ShippingAddressPageFillShippingBehaviour,
    ShippingAddressPageFillDifferentBillingBehaviour,
    ShippingAddressPageContinueBehaviour,
    ShippingPaymentPageContinueBehaviour,
    PlaceOrderPageAssertFinalAmountsBehaviour>();
}
```

```csharp
public class OverridenActionsBehaviourEngine
{
    private readonly Dictionary<Type, Dictionary<BehaviourActions, Action>>
    overridenBehavioursActions;
    public OverridenActionsBehaviourEngine()
    {
        this.overridenBehavioursActions =
        new Dictionary<Type, Dictionary<BehaviourActions, Action>>();
    }
    public void Execute(params Type[] pageBehaviours)
    {
        foreach (Type pageBehaviour in pageBehaviours)
        {
            var currentbehaviour = Activator.CreateInstance(pageBehaviour) as Behaviour;
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PreActAsserts,
            () => currentbehaviour.PerformPreActAsserts());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.Act,
            () => currentbehaviour.PerformAct());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PostActAsserts,
            () => currentbehaviour.PerformPostActAsserts());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PostAct,
            () => currentbehaviour.PerformPostAct());
        }
    }
    public void ConfugureCustomBehaviour<ТBehavior>(
    BehaviourActions behaviourAction,
    Action action)
    where ТBehavior : IBehaviour
    {
        if (!this.overridenBehavioursActions.ContainsKey(typeof(ТBehavior)))
        {
            this.overridenBehavioursActions.Add(
            typeof(ТBehavior),
            new Dictionary<BehaviourActions, Action>());
        }
        if (!this.overridenBehavioursActions[typeof(ТBehavior)].ContainsKey(
        behaviourAction))
        {
            this.overridenBehavioursActions[typeof(ТBehavior)].Add(behaviourAction, action);
        }
        else
        {
            this.overridenBehavioursActions[typeof(ТBehavior)][behaviourAction] = action;
        }
    }
    private void ExecuteBehaviourOperation(
    Type pageBehaviour,
    BehaviourActions behaviourAction,
    Action defaultBehaviourOperation)
    {
        if (this.overridenBehavioursActions.ContainsKey(pageBehaviour.GetType()) &&
        this.overridenBehavioursActions[pageBehaviour.GetType()].ContainsKey(
        behaviourAction))
        {
            this.overridenBehavioursActions[pageBehaviour.GetType()][behaviourAction].Invoke();
        }
        else
        {
            defaultBehaviourOperation.Invoke();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_OverridenActionsBehaviourEngine()
{
    PurchaseTestContext.ItemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    PurchaseTestContext.ItemPrice = "40.49";
    PurchaseTestContext.ClientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    PurchaseTestContext.ClientPurchaseInfo.CouponCode = "99PERDIS";
    PurchaseTestContext.ClientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var behaviourEngine = new OverriddenActionsBehaviourEngine();
    behaviourEngine.ConfugureCustomBehaviour<SignInPageLoginBehaviour>(
    BehaviourActions.PostAct,
    () =>
    {
        // wait for different URL for this case.
    });
    behaviourEngine.Execute(
    typeof(ItemPageNavigationBehaviour),
    typeof(ItemPageBuyBehaviour),
    typeof(PreviewShoppingCartPageProceedBehaviour),
    typeof(SignInPageLoginBehaviour),
    typeof(ShippingAddressPageFillShippingBehaviour),
    typeof(ShippingAddressPageFillDifferentBillingBehaviour),
    typeof(ShippingAddressPageContinueBehaviour),
    typeof(ShippingPaymentPageContinueBehaviour),
    typeof(PlaceOrderPageAssertFinalAmountsBehaviour));
}
```

```csharp
public class UnityBehaviourEngine
{
    private readonly IUnityContainer unityContainer;
    private readonly Dictionary<Type, Dictionary<BehaviourActions, Action>>
    overridenBehavioursActions;
    public UnityBehaviourEngine(IUnityContainer unityContainer)
    {
        this.unityContainer = unityContainer;
        this.overridenBehavioursActions =
        new Dictionary<Type, Dictionary<BehaviourActions, Action>>();
    }
    public void Execute(params Type[] pageBehaviours)
    {
        foreach (Type pageBehaviour in pageBehaviours)
        {
            var currentbehaviour = this.unityContainer.Resolve(pageBehaviour) as Behaviour;
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PreActAsserts,
            () => currentbehaviour.PerformPreActAsserts());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.Act,
            () => currentbehaviour.PerformAct());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PostActAsserts,
            () => currentbehaviour.PerformPostActAsserts());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PostAct,
            () => currentbehaviour.PerformPostAct());
        }
    }
    public void ConfugureCustomBehaviour<ТBehavior>(
    BehaviourActions behaviourAction,
    Action action)
    where ТBehavior : IBehaviour
    {
        if (!this.overridenBehavioursActions.ContainsKey(typeof(ТBehavior)))
        {
            this.overridenBehavioursActions.Add(typeof(ТBehavior),
            new Dictionary<BehaviourActions, Action>());
        }
        if (!this.overridenBehavioursActions[typeof(ТBehavior)].ContainsKey(behaviourAction))
        {
            this.overridenBehavioursActions[typeof(ТBehavior)].Add(behaviourAction, action);
        }
        else
        {
            this.overridenBehavioursActions[typeof(ТBehavior)][behaviourAction] = action;
        }
    }
    private void ExecuteBehaviourOperation(
    Type pageBehaviour,
    BehaviourActions behaviourAction,
    Action defaultBehaviourOperation)
    {
        if (this.overridenBehavioursActions.ContainsKey(pageBehaviour.GetType()) &&
        this.overridenBehavioursActions[pageBehaviour.GetType()].ContainsKey(
        behaviourAction))
        {
            this.overridenBehavioursActions[pageBehaviour.GetType()][behaviourAction].Invoke();
        }
        else
        {
            defaultBehaviourOperation.Invoke();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_UnityBehaviourEngine()
{
    PurchaseTestContext.ItemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    PurchaseTestContext.ItemPrice = "40.49";
    PurchaseTestContext.ClientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    PurchaseTestContext.ClientPurchaseInfo.CouponCode = "99PERDIS";
    PurchaseTestContext.ClientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var behaviourEngine = new UnityBehaviourEngine(container);
    behaviourEngine.ConfugureCustomBehaviour<SignInPageLoginBehaviour>(
    BehaviourActions.PostAct,
    () =>
    {
        // wait for different URL for this case.
    });
    behaviourEngine.Execute(
    typeof(ItemPageNavigationBehaviour),
    typeof(ItemPageBuyBehaviour),
    typeof(PreviewShoppingCartPageProceedBehaviour),
    typeof(SignInPageLoginBehaviour),
    typeof(ShippingAddressPageFillShippingBehaviour),
    typeof(ShippingAddressPageFillDifferentBillingBehaviour),
    typeof(ShippingAddressPageContinueBehaviour),
    typeof(ShippingPaymentPageContinueBehaviour),
    typeof(PlaceOrderPageAssertFinalAmountsBehaviour));
}
```

## Advanced Null Object Design Pattern in Automated Testing

```csharp
public abstract class BasePromotionalCodeStrategy : IPurchasePromotionalCodeStrategy
{
    public abstract void AssertPromotionalCodeDiscount();
    public abstract double GetPromotionalCodeDiscountAmount();
    public abstract void ApplyPromotionalCode(string couponCode);
    #region NULL
    static readonly NullPurchasePromotionalCodeStrategy nullPurchasePromotionalCodeStrategy =
    new NullPurchasePromotionalCodeStrategy();
    public static NullPurchasePromotionalCodeStrategy NULL
    {
        get
        {
            return nullPurchasePromotionalCodeStrategy;
        }
    }
    public class NullPurchasePromotionalCodeStrategy : BasePromotionalCodeStrategy
    {
        public override void AssertPromotionalCodeDiscount()
        {
        }
        public override double GetPromotionalCodeDiscountAmount()
        {
            return 0;
        }
        public override void ApplyPromotionalCode(string couponCode)
        {
        }
    }
    #endregion
}
```

```csharp
public class UiPurchasePromotionalCodeStrategy : BasePromotionalCodeStrategy
{
    private readonly PlaceOrderPage placeOrderPage;
    private readonly double couponDiscountAmount;
    public UiPurchasePromotionalCodeStrategy(
    PlaceOrderPage placeOrderPage,
    double couponDiscountAmount)
    {
        this.placeOrderPage = placeOrderPage;
        this.couponDiscountAmount = couponDiscountAmount;
    }
    public override void AssertPromotionalCodeDiscount()
    {
        Assert.AreEqual(
        this.couponDiscountAmount.ToString(),
        this.placeOrderPage.PromotionalDiscountPrice.Text);
    }
    public override double GetPromotionalCodeDiscountAmount()
    {
        return this.couponDiscountAmount;
    }
    public override void ApplyPromotionalCode(string couponCode)
    {
        this.placeOrderPage.PromotionalCode.SendKeys(couponCode);
    }
}
```

```csharp
[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    string itemPrice = "40.49";
    ClientPurchaseInfo clientPurchaseInfo =
    new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var purchaseContext = new PurchaseContext(
    UiPurchasePromotionalCodeStrategy.NULL,
    new ItemPage(Driver.Browser),
    new PreviewShoppingCartPage(Driver.Browser),
    new SignInPage(Driver.Browser),
    new ShippingAddressPage(Driver.Browser),
    new ShippingPaymentPage(Driver.Browser),
    new PlaceOrderPage(Driver.Browser));
    purchaseContext.PurchaseItem(
    itemUrl,
    itemPrice,
    clientLoginInfo,
    clientPurchaseInfo);
}
```

```csharp
public class NullPurchasePromotionalCodeStrategy : IPurchasePromotionalCodeStrategy
{
    private static NullPurchasePromotionalCodeStrategy instance;
    public static NullPurchasePromotionalCodeStrategy NULL
    {
        get
        {
            if (instance == null)
            {
                instance = new NullPurchasePromotionalCodeStrategy();
            }
            return instance;
        }
    }
    public void AssertPromotionalCodeDiscount()
    {
    }
    public double GetPromotionalCodeDiscountAmount()
    {
        return 0;
    }
    public void ApplyPromotionalCode(string couponCode)
    {
    }
}
```

```csharp
[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    string itemPrice = "40.49";
    ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var purchaseContext = new PurchaseContext(NullPurchasePromotionalCodeStrategy.NULL,
    new ItemPage(Driver.Browser),
    new PreviewShoppingCartPage(Driver.Browser),
    new SignInPage(Driver.Browser),
    new ShippingAddressPage(Driver.Browser),
    new ShippingPaymentPage(Driver.Browser),
    new PlaceOrderPage(Driver.Browser));
    purchaseContext.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
}
```

```csharp
private static IUnityContainer container = new UnityContainer();
[TestInitialize]
public void SetupTest()
{
    Driver.StartBrowser();
    container.RegisterType<ItemPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<PreviewShoppingCartPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<SignInPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<ShippingAddressPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<ShippingPaymentPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<PlaceOrderPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<PurchaseContext>(new ContainerControlledLifetimeManager());
    container.RegisterType<
    IPurchasePromotionalCodeStrategy,
    NullPurchasePromotionalCodeStrategy>(new ContainerControlledLifetimeManager());
    container.RegisterInstance<IWebDriver>(Driver.Browser);
}
```

```csharp
[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    string itemPrice = "40.49";
    ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var purchaseContext = container.Resolve<PurchaseContext>();
    purchaseContext.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
}
```

```csharp
[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    string itemPrice = "40.49";
    ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    container.RegisterInstance<IPurchasePromotionalCodeStrategy>(
    new UiPurchasePromotionalCodeStrategy(container.Resolve<PlaceOrderPage>(), 40.49));
    var purchaseContext = container.Resolve<PurchaseContext>();
    purchaseContext.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
}
```

## Null Object Design Pattern in Automated Testing

```csharp
public interface IPurchasePromotionalCodeStrategy
{
    void AssertPromotionalCodeDiscount();
    double GetPromotionalCodeDiscountAmount();
    void ApplyPromotionalCode(string couponCode);
}
```

```csharp
public class PurchaseContextNoNullObjects
{
    private readonly IPurchasePromotionalCodeStrategy purchasePromotionalCodeStrategy;
    private readonly ItemPage itemPage;
    private readonly PreviewShoppingCartPage previewShoppingCartPage;
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ShippingPaymentPage shippingPaymentPage;
    private readonly PlaceOrderPage placeOrderPage;
    public PurchaseContextNoNullObjects(
    IPurchasePromotionalCodeStrategy purchasePromotionalCodeStrategy,
    ItemPage itemPage,
    PreviewShoppingCartPage previewShoppingCartPage,
    SignInPage signInPage,
    ShippingAddressPage shippingAddressPage,
    ShippingPaymentPage shippingPaymentPage,
    PlaceOrderPage placeOrderPage)
    {
        this.purchasePromotionalCodeStrategy = purchasePromotionalCodeStrategy;
        this.itemPage = itemPage;
        this.previewShoppingCartPage = previewShoppingCartPage;
        this.signInPage = signInPage;
        this.shippingAddressPage = shippingAddressPage;
        this.shippingPaymentPage = shippingPaymentPage;
        this.placeOrderPage = placeOrderPage;
    }
    public void PurchaseItem(
    string itemUrl,
    string itemPrice,
    ClientLoginInfo clientLoginInfo,
    ClientPurchaseInfo clientPurchaseInfo)
    {
        this.itemPage.Navigate(itemUrl);
        this.itemPage.ClickBuyNowButton();
        this.previewShoppingCartPage.ClickProceedToCheckoutButton();
        this.signInPage.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        this.shippingAddressPage.FillShippingInfo(clientPurchaseInfo);
        this.shippingAddressPage.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickBottomContinueButton();
        this.shippingAddressPage.FillBillingInfo(clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickTopContinueButton();
        double couponDiscount = 0;
        if (purchasePromotionalCodeStrategy != null)
        {
            this.purchasePromotionalCodeStrategy.AssertPromotionalCodeDiscount();
            couponDiscount =
            this.purchasePromotionalCodeStrategy.GetPromotionalCodeDiscountAmount();
        }
        double totalPrice = double.Parse(itemPrice);
        this.placeOrderPage.AssertOrderTotalPrice(totalPrice, couponDiscount);
        // Some other actions...
        if (purchasePromotionalCodeStrategy != null)
        {
            this.purchasePromotionalCodeStrategy.AssertPromotionalCodeDiscount();
        }
    }
}
```

```csharp
public class UiPurchasePromotionalCodeStrategy : IPurchasePromotionalCodeStrategy
{
    private readonly PlaceOrderPage placeOrderPage;
    private readonly double couponDiscountAmount;
    public UiPurchasePromotionalCodeStrategy(
    PlaceOrderPage placeOrderPage,
    double couponDiscountAmount)
    {
        this.placeOrderPage = placeOrderPage;
        this.couponDiscountAmount = couponDiscountAmount;
    }
    public void AssertPromotionalCodeDiscount()
    {
        Assert.AreEqual(
        this.couponDiscountAmount.ToString(),
        this.placeOrderPage.PromotionalDiscountPrice.Text);
    }
    public double GetPromotionalCodeDiscountAmount()
    {
        return this.couponDiscountAmount;
    }
    public void ApplyPromotionalCode(string couponCode)
    {
        this.placeOrderPage.PromotionalCode.SendKeys(couponCode);
    }
}
```

```csharp
public class NullPurchasePromotionalCodeStrategy : IPurchasePromotionalCodeStrategy
{
    public void AssertPromotionalCodeDiscount()
    {
    }
    public double GetPromotionalCodeDiscountAmount()
    {
        return 0;
    }
    public void ApplyPromotionalCode(string couponCode)
    {
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly IPurchasePromotionalCodeStrategy purchasePromotionalCodeStrategy;
    private readonly ItemPage itemPage;
    private readonly PreviewShoppingCartPage previewShoppingCartPage;
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ShippingPaymentPage shippingPaymentPage;
    private readonly PlaceOrderPage placeOrderPage;
    public PurchaseContext(
    IPurchasePromotionalCodeStrategy purchasePromotionalCodeStrategy,
    ItemPage itemPage,
    PreviewShoppingCartPage previewShoppingCartPage,
    SignInPage signInPage,
    ShippingAddressPage shippingAddressPage,
    ShippingPaymentPage shippingPaymentPage,
    PlaceOrderPage placeOrderPage)
    {
        this.purchasePromotionalCodeStrategy = purchasePromotionalCodeStrategy;
        this.itemPage = itemPage;
        this.previewShoppingCartPage = previewShoppingCartPage;
        this.signInPage = signInPage;
        this.shippingAddressPage = shippingAddressPage;
        this.shippingPaymentPage = shippingPaymentPage;
        this.placeOrderPage = placeOrderPage;
    }
    public void PurchaseItem(
    string itemUrl,
    string itemPrice,
    ClientLoginInfo clientLoginInfo,
    ClientPurchaseInfo clientPurchaseInfo)
    {
        this.itemPage.Navigate(itemUrl);
        this.itemPage.ClickBuyNowButton();
        this.previewShoppingCartPage.ClickProceedToCheckoutButton();
        this.signInPage.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        this.shippingAddressPage.FillShippingInfo(clientPurchaseInfo);
        this.shippingAddressPage.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickBottomContinueButton();
        this.shippingAddressPage.FillBillingInfo(clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickTopContinueButton();
        this.purchasePromotionalCodeStrategy.AssertPromotionalCodeDiscount();
        var couponDiscount =
        this.purchasePromotionalCodeStrategy.GetPromotionalCodeDiscountAmount();
        double totalPrice = double.Parse(itemPrice);
        this.placeOrderPage.AssertOrderTotalPrice(totalPrice, couponDiscount);
        this.purchasePromotionalCodeStrategy.AssertPromotionalCodeDiscount();
    }
}
```

```csharp
[TestClass]
public class Online StorePurchaseNullObjectTests
{
[TestInitialize]
public void SetupTest()
{
    Driver.StartBrowser();
}
[TestCleanup]
public void TeardownTest()
{
    Driver.StopBrowser();
}
[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    string itemPrice = "40.49";
    ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var purchaseContext = new PurchaseContext(
    new NullPurchasePromotionalCodeStrategy(),
    new ItemPage(Driver.Browser),
    new PreviewShoppingCartPage(Driver.Browser),
    new SignInPage(Driver.Browser),
    new ShippingAddressPage(Driver.Browser),
    new ShippingPaymentPage(Driver.Browser),
    new PlaceOrderPage(Driver.Browser));
    ////var purchaseContext = new PurchaseContext(
    ////new UiPurchasePromotionalCodeStrategy(
    ////new PlaceOrderPage(Driver.Browser), 20),
    //// new ItemPage(Driver.Browser),
    //// new PreviewShoppingCartPage(Driver.Browser),
    //// new SignInPage(Driver.Browser),
    //// new ShippingAddressPage(Driver.Browser),
    //// new ShippingPaymentPage(Driver.Browser),
    //// new PlaceOrderPage(Driver.Browser));
    purchaseContext.PurchaseItem(
    itemUrl,
    itemPrice,
    clientLoginInfo,
    clientPurchaseInfo);
}
}
```

## Advanced Specification Design Pattern in Automated Testing

```csharp
public static class SpecificationsExtensionMethods
{
    public static ISpecification<TEntity> And<TEntity>(this ISpecification<TEntity> leftSpecification, ISpecification<TEntity> rightSpecification)
    {
        return new AndSpecification<TEntity>(leftSpecification, rightSpecification);
    }

    public static ISpecification<TEntity> Or<TEntity>(this ISpecification<TEntity> leftSpecification, ISpecification<TEntity> rightSpecification)
    {
        return new OrSpecification<TEntity>(leftSpecification, rightSpecification);
    }

    public static ISpecification<TEntity> Not<TEntity>(this ISpecification<TEntity> specification)
    {
        return new NotSpecification<TEntity>(specification);
    }
}
```

```csharp
public class ExpressionSpecification<TEntity> : Specification<TEntity>
{
    private readonly Func<TEntity, bool> expression;

    public ExpressionSpecification(Func<TEntity, bool> expression)
    {
        if (expression == null)
        {
            throw new ArgumentNullException();
        }
        this.expression = expression;
    }

    public override bool IsSatisfiedBy(TEntity entity)
    {
        return this.expression(entity);
    }
}
```

```csharp
public partial class PlaceOrderPage : BasePage
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly ISpecification<PurchaseTestInput> promotionalPurchaseSpecification;
    private readonly ISpecification<PurchaseTestInput> creditCardSpecification;
    private readonly ISpecification<PurchaseTestInput> wiretransferSpecification;
    private readonly ISpecification<PurchaseTestInput> freePurchaseSpecification;

    public PlaceOrderPage(IWebDriver driver, PurchaseTestInput purchaseTestInput)
        : base(driver)
    {
        this.purchaseTestInput = purchaseTestInput;
        this.creditCardSpecification = new ExpressionSpecification<PurchaseTestInput>(x => !string.IsNullOrEmpty(x.CreditCardNumber));
        this.freePurchaseSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.TotalPrice == 0);
        this.wiretransferSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.IsWiretransfer);
        this.promotionalPurchaseSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.IsPromotionalPurchase && x.TotalPrice < 5);
    }

    public override string Url
    {
        get
        {
            return @"http://www.bing.com/";
        }
    }

    public void ChoosePaymentMethod()
    {
        if (this.creditCardSpecification.
        And(this.wiretransferSpecification.Not()).
        And(this.freePurchaseSpecification.Not()).
        And(this.promotionalPurchaseSpecification.Not()).
        IsSatisfiedBy(this.purchaseTestInput))
        {
            this.CreditCard.SendKeys("371449635398431");
            this.SecurityNumber.SendKeys("1234");
        }
        else
        {
            this.Wiretransfer.SendKeys("pathToFile");
        }
    }
}
```

```csharp
public class OrderTestContextConfigurator
{
    public OrderTestContextConfigurator()
    {
        this.CreditCardSpecification = new ExpressionSpecification<PurchaseTestInput>(x => !string.IsNullOrEmpty(x.CreditCardNumber));
        this.FreePurchaseSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.TotalPrice == 0);
        this.WiretransferSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.IsWiretransfer);
        this.PromotionalPurchaseSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.IsPromotionalPurchase && x.TotalPrice < 5);
    }

    public ISpecification<PurchaseTestInput> PromotionalPurchaseSpecification { get; private set; }

    public ISpecification<PurchaseTestInput> CreditCardSpecification { get; private set; }

    public ISpecification<PurchaseTestInput> WiretransferSpecification { get; private set; }

    public ISpecification<PurchaseTestInput> FreePurchaseSpecification { get; private set; }
}
```

```csharp
public class OrderTestContext
{
    public OrderTestContext(PurchaseTestInput purchaseTestInput, OrderTestContextConfigurator orderTestContextConfigurator)
    {
        this.PurchaseTestInput = purchaseTestInput;
        this.IsPromoCodePurchase = orderTestContextConfigurator.FreePurchaseSpecification.
            Or(orderTestContextConfigurator.PromotionalPurchaseSpecification).
            IsSatisfiedBy(purchaseTestInput);
        this.IsCreditCardPurchase =
            orderTestContextConfigurator.CreditCardSpecification.
            And(orderTestContextConfigurator.WiretransferSpecification.Not()).
            And(orderTestContextConfigurator.FreePurchaseSpecification.Not()).
            And(orderTestContextConfigurator.PromotionalPurchaseSpecification.Not()).
            IsSatisfiedBy(purchaseTestInput);
    }

    public PurchaseTestInput PurchaseTestInput { get; private set; }

    public bool IsPromoCodePurchase { get; private set; }

    public bool IsCreditCardPurchase { get; private set; }
}
```

## Specification Design Pattern in Automated Testing

```csharp
public class PurchaseTestInput
{
    public bool IsWiretransfer { get; set; }

    public bool IsPromotionalPurchase { get; set; }

    public string CreditCardNumber { get; set; }

    public decimal TotalPrice { get; set; }
}
```

```csharp
public partial class PlaceOrderPage : BasePage
{
    private readonly PurchaseTestInput purchaseTestInput;

    public PlaceOrderPage(IWebDriver driver, PurchaseTestInput purchaseTestInput) : base(driver)
    {
        this.purchaseTestInput = purchaseTestInput;
    }

    public override string Url
    {
        get
        {
            return @"http://www.bing.com/";
        }
    }

    public void ChoosePaymentMethod()
    {
        if (!string.IsNullOrEmpty(this.purchaseTestInput.CreditCardNumber)
            && !this.purchaseTestInput.IsWiretransfer
            && !(this.purchaseTestInput.IsPromotionalPurchase && this.purchaseTestInput.TotalPrice < 5)
            && !(this.purchaseTestInput.TotalPrice == 0))
        {
            this.CreditCard.SendKeys("371449635398431");
            this.SecurityNumber.SendKeys("1234");
        }
        else
        {
            this.Wiretransfer.SendKeys("pathToFile");
        }
    }
}
```

```csharp
public interface ISpecification<TEntity>
{
    bool IsSatisfiedBy(TEntity entity);

    ISpecification<TEntity> And(ISpecification<TEntity> other);

    ISpecification<TEntity> Or(ISpecification<TEntity> other);

    ISpecification<TEntity> Not();
}
```

```csharp
public abstract class Specification<TEntity> : ISpecification<TEntity>
{
    public abstract bool IsSatisfiedBy(TEntity entity);

    public ISpecification<TEntity> And(ISpecification<TEntity> other)
    {
        return new AndSpecification<TEntity>(this, other);
    }

    public ISpecification<TEntity> Or(ISpecification<TEntity> other)
    {
        return new OrSpecification<TEntity>(this, other);
    }

    public ISpecification<TEntity> Not()
    {
        return new NotSpecification<TEntity>(this);
    }
}
```

```csharp
public class AndSpecification<TEntity> : Specification<TEntity>
{
    private readonly ISpecification<TEntity> leftSpecification;
    private readonly ISpecification<TEntity> rightSpecification;

    public AndSpecification(ISpecification<TEntity> leftSpecification, ISpecification<TEntity> rightSpecification)
    {
        this.leftSpecification = leftSpecification;
        this.rightSpecification = rightSpecification;
    }

    public override bool IsSatisfiedBy(TEntity entity)
    {
        return this.leftSpecification.IsSatisfiedBy(entity) && this.rightSpecification.IsSatisfiedBy(entity);
    }
}
```

```csharp
public class OrSpecification<TEntity> : Specification<TEntity>
{
    private readonly ISpecification<TEntity> leftSpecification;
    private readonly ISpecification<TEntity> rightSpecification;

    public OrSpecification(ISpecification<TEntity> leftSpecification, ISpecification<TEntity> rightSpecification)
    {
        this.leftSpecification = leftSpecification;
        this.rightSpecification = rightSpecification;
    }

    public override bool IsSatisfiedBy(TEntity entity)
    {
        return this.leftSpecification.IsSatisfiedBy(entity) || this.rightSpecification.IsSatisfiedBy(entity);
    }
}
```

```csharp
public class NotSpecification<TEntity> : Specification<TEntity>
{
    private readonly ISpecification<TEntity> specification;

    public NotSpecification(ISpecification<TEntity> specification)
    {
        this.specification = specification;
    }

    public override bool IsSatisfiedBy(TEntity entity)
    {
        return !this.specification.IsSatisfiedBy(entity);
    }
}
```

```csharp
public class CreditCardSpecification : Specification<PurchaseTestInput>
{
    private readonly PurchaseTestInput purchaseTestInput;

    public CreditCardSpecification(PurchaseTestInput purchaseTestInput)
    {
        this.purchaseTestInput = purchaseTestInput;
    }

    public override bool IsSatisfiedBy(PurchaseTestInput entity)
    {
        return !string.IsNullOrEmpty(this.purchaseTestInput.CreditCardNumber);
    }
}
```

```csharp
public class PromotionalPurchaseSpecification : Specification<PurchaseTestInput>
{
    private readonly PurchaseTestInput purchaseTestInput;

    public PromotionalPurchaseSpecification(PurchaseTestInput purchaseTestInput)
    {
        this.purchaseTestInput = purchaseTestInput;
    }

    public override bool IsSatisfiedBy(PurchaseTestInput entity)
    {
        return this.purchaseTestInput.IsPromotionalPurchase && this.purchaseTestInput.TotalPrice < 5;
    }
}
```

```csharp
public partial class PlaceOrderPage : BasePage
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly PromotionalPurchaseSpecification promotionalPurchaseSpecification;
    private readonly CreditCardSpecification creditCardSpecification;
    private readonly WiretransferSpecification wiretransferSpecification;
    private readonly FreePurchaseSpecification freePurchaseSpecification;

    public PlaceOrderPage(IWebDriver driver, PurchaseTestInput purchaseTestInput) : base(driver)
    {
        this.purchaseTestInput = purchaseTestInput;
        this.promotionalPurchaseSpecification = new PromotionalPurchaseSpecification(purchaseTestInput);
        this.wiretransferSpecification = new WiretransferSpecification(purchaseTestInput);
        this.creditCardSpecification = new CreditCardSpecification(purchaseTestInput);
        this.freePurchaseSpecification = new FreePurchaseSpecification();
    }

    public override string Url
    {
        get
        {
            return @"yourSiteUrl";
        }
    }

    public void ChoosePaymentMethod()
    {
        if (this.creditCardSpecification.
        And(this.wiretransferSpecification.Not()).
        And(this.freePurchaseSpecification.Not()).
        And(this.promotionalPurchaseSpecification.Not()).
        IsSatisfiedBy(this.purchaseTestInput))
        {
            this.CreditCard.SendKeys("371449635398431");
            this.SecurityNumber.SendKeys("1234");
        }
        else
        {
            this.Wiretransfer.SendKeys("pathToFile");
        }
    }
}
```

```csharp
public partial class PlaceOrderPage : BasePage
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly PromotionalPurchaseSpecification promotionalPurchaseSpecification;
    private readonly CreditCardSpecification creditCardSpecification;
    private readonly WiretransferSpecification wiretransferSpecification;
    private readonly FreePurchaseSpecification freePurchaseSpecification;

    public PlaceOrderPage(IWebDriver driver, PurchaseTestInput purchaseTestInput) : base(driver)
    {
        this.purchaseTestInput = purchaseTestInput;
        this.promotionalPurchaseSpecification = new PromotionalPurchaseSpecification(purchaseTestInput);
        this.wiretransferSpecification = new WiretransferSpecification(purchaseTestInput);
        this.creditCardSpecification = new CreditCardSpecification(purchaseTestInput);
        this.freePurchaseSpecification = new FreePurchaseSpecification();
        this.IsPromoCodePurchase = this.freePurchaseSpecification.Or(this.promotionalPurchaseSpecification).IsSatisfiedBy(this.purchaseTestInput);
        this.IsCreditCardPurchase = this.creditCardSpecification.
        And(this.wiretransferSpecification.Not()).
        And(this.freePurchaseSpecification.Not()).
        And(this.promotionalPurchaseSpecification.Not()).
        IsSatisfiedBy(this.purchaseTestInput);
    }

    public bool IsPromoCodePurchase { get; private set; }

    public bool IsCreditCardPurchase { get; private set; }

    public override string Url
    {
        get
        {
            return @"pathToYourSite";
        }
    }

    public void ChoosePaymentMethod()
    {
        if (this.IsCreditCardPurchase)
        {
            this.CreditCard.SendKeys("371449635398431");
            this.SecurityNumber.SendKeys("1234");
        }
        else
        {
            this.Wiretransfer.SendKeys("pathToFile");
        }
    }

    public void TypePromotionalCode(string promoCode)
    {
        if (this.IsPromoCodePurchase)
        {
            this.PromotionalCode.SendKeys(promoCode);
        }
    }
}
```

```csharp
public static class PlaceOrderPageAsserter
{
    public static void AssertPromoCodeLabel(this PlaceOrderPage page, string promoCode)
    {
        if (!string.IsNullOrEmpty(promoCode) && page.IsPromoCodePurchase)
        {
            Assert.AreEqual<string>(page.PromotionalCode.Text, promoCode);
        }
    }
}
```

## Rules Design Pattern in Automated Testing

```csharp
public class PurchaseTestInput
{
    public bool IsWiretransfer { get; set; }

    public bool IsPromotionalPurchase { get; set; }

    public string CreditCardNumber { get; set; }

    public decimal TotalPrice { get; set; }
}
```

```csharp
PurchaseTestInput purchaseTestInput = new PurchaseTestInput()
{
    IsWiretransfer = false,
    IsPromotionalPurchase = false,
    TotalPrice = 100,
    CreditCardNumber = "378734493671000"
};
if (string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
    !purchaseTestInput.IsWiretransfer &&
    purchaseTestInput.IsPromotionalPurchase &&
    purchaseTestInput.TotalPrice == 0)
{
    this.PerformUIAssert("Assert volume discount promotion amount. + additional UI actions");
}
if (!string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
    !purchaseTestInput.IsWiretransfer &&
    !purchaseTestInput.IsPromotionalPurchase &&
    purchaseTestInput.TotalPrice > 20)
{
    this.PerformUIAssert("Assert that total amount label is over 20$ + additional UI actions");
}
else if (!string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
            !purchaseTestInput.IsWiretransfer &&
            !purchaseTestInput.IsPromotionalPurchase &&
            purchaseTestInput.TotalPrice > 30)
{
    Console.WriteLine("Assert that total amount label is over 30$ + additional UI actions");
}
else if (!string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
            !purchaseTestInput.IsWiretransfer &&
            !purchaseTestInput.IsPromotionalPurchase &&
            purchaseTestInput.TotalPrice > 40)
{
    Console.WriteLine("Assert that total amount label is over 40$ + additional UI actions");
}
else if (!string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
    !purchaseTestInput.IsWiretransfer &&
    !purchaseTestInput.IsPromotionalPurchase &&
    purchaseTestInput.TotalPrice > 50)
{
    this.PerformUIAssert("Assert that total amount label is over 50$ + additional UI actions");
}
else
{
    Debug.WriteLine("Perform other UI actions");
}
```

```csharp
PurchaseTestInput purchaseTestInput = new PurchaseTestInput()
{
    IsWiretransfer = false,
    IsPromotionalPurchase = false,
    TotalPrice = 100,
    CreditCardNumber = "378734493671000"
};

RulesEvaluator rulesEvaluator = new RulesEvaluator();

rulesEvaluator.Eval(new PromotionalPurchaseRule(purchaseTestInput, this.PerformUIAssert));
rulesEvaluator.Eval(new CreditCardChargeRule(purchaseTestInput, 20, this.PerformUIAssert));
rulesEvaluator.OtherwiseEval(new PromotionalPurchaseRule(purchaseTestInput, this.PerformUIAssert));
rulesEvaluator.OtherwiseEval(new CreditCardChargeRule<CreditCardChargeRuleRuleResult>(purchaseTestInput, 30));
rulesEvaluator.OtherwiseEval(new CreditCardChargeRule<CreditCardChargeRuleAssertResult>(purchaseTestInput, 40));
rulesEvaluator.OtherwiseEval(new CreditCardChargeRule(purchaseTestInput, 50, this.PerformUIAssert));
rulesEvaluator.OtherwiseDo(() => Debug.WriteLine("Perform other UI actions"));

rulesEvaluator.EvaluateRulesChains();
```

```csharp
public abstract class BaseRule : IRule
{
    private readonly Action actionToBeExecuted;
    protected readonly RuleResult ruleResult;

    public BaseRule(Action actionToBeExecuted)
    {
        this.actionToBeExecuted = actionToBeExecuted;
        if (actionToBeExecuted != null)
        {
            this.ruleResult = new RuleResult(this.actionToBeExecuted);
        }
        else
        {
            this.ruleResult = new RuleResult();
        }
    }

    public BaseRule()
    {
        ruleResult = new RuleResult();
    }

    public abstract IRuleResult Eval();
}
```

```csharp
public class CreditCardChargeRule : BaseRule
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly decimal totalPriceLowerBoundary;

    public CreditCardChargeRule(PurchaseTestInput purchaseTestInput, decimal totalPriceLowerBoundary, Action actionToBeExecuted)
        : base(actionToBeExecuted)
    {
        this.purchaseTestInput = purchaseTestInput;
        this.totalPriceLowerBoundary = totalPriceLowerBoundary;
    }

    public override IRuleResult Eval()
    {
        if (!string.IsNullOrEmpty(this.purchaseTestInput.CreditCardNumber) &&
            !this.purchaseTestInput.IsWiretransfer &&
            !this.purchaseTestInput.IsPromotionalPurchase &&
            this.purchaseTestInput.TotalPrice > this.totalPriceLowerBoundary)
        {
            this.ruleResult.IsSuccess = true;
            return this.ruleResult;
        }
        return new RuleResult();
    }
}
```

```csharp
public class RulesEvaluator
{
    private readonly List<RulesChain> rules;

    public RulesEvaluator()
    {
        this.rules = new List<RulesChain>();
    }

    public RulesChain Eval(IRule rule)
    {
        var rulesChain = new RulesChain(rule);
        this.rules.Add(rulesChain);
        return rulesChain;
    }

    public void OtherwiseEval(IRule alternativeRule)
    {
        if (this.rules.Count == 0)
        {
            throw new ArgumentException("You cannot add ElseIf clause without If!");
        }
        this.rules.Last().ElseRules.Add(new RulesChain(alternativeRule));
    }

    public void OtherwiseDo(Action otherwiseAction)
    {
        if (this.rules.Count == 0)
        {
            throw new ArgumentException("You cannot add Else clause without If!");
        }
        this.rules.Last().ElseRules.Add(new RulesChain(new NullRule(otherwiseAction), true));
    }

    public void EvaluateRulesChains()
    {
        this.Evaluate(this.rules, false);
    }

    private void Evaluate(List<RulesChain> rulesToBeEvaluated, bool isAlternativeChain = false)
    {
        foreach (var currentRuleChain in rulesToBeEvaluated)
        {
            var currentRulesChainResult = currentRuleChain.Rule.Eval();
            if (currentRulesChainResult.IsSuccess)
            {
                currentRulesChainResult.Execute();
                if (isAlternativeChain)
                {
                    break;
                }
            }
            else
            {
                this.Evaluate(currentRuleChain.ElseRules, true);
            }
        }
    }
}
```

```csharp
public class RulesChain
{
    public IRule Rule { get; set; }

    public List<RulesChain> ElseRules { get; set; }

    public bool IsLastInChain { get; set; }

    public RulesChain(IRule mainRule, bool isLastInChain = false)
    {
        this.IsLastInChain = isLastInChain;
        this.ElseRules = new List<RulesChain>();
        this.Rule = mainRule;
    }
}
```

## Improved Facade Design Pattern in Automated Testing v.2.0`

```csharp
public class PurchaseFacade
{
    private ItemPage itemPage;
    private CheckoutPage checkoutPage;
    private ShippingAddressPage shippingAddressPage;
    private SignInPage signInPage;

    public ItemPage ItemPage
    {
        get
        {
            if (itemPage == null)
            {
                itemPage = new ItemPage();
            }
            return itemPage;
        }
    }

    public SignInPage SignInPage
    {
        get
        {
            if (signInPage == null)
            {
                signInPage = new SignInPage();
            }
            return signInPage;
        }
    }

    public CheckoutPage CheckoutPage
    {
        get
        {
            if (checkoutPage == null)
            {
                checkoutPage = new CheckoutPage();
            }
            return checkoutPage;
        }
    }

    public ShippingAddressPage ShippingAddressPage
    {
        get
        {
            if (shippingAddressPage == null)
            {
                shippingAddressPage = new ShippingAddressPage();
            }
            return shippingAddressPage;
        }
    }

    public void PurchaseItem(string item, string itemPrice, ClientInfo clientInfo)
    {
        this.ItemPage.Navigate(item);
        this.ItemPage.Validate().Price(itemPrice);
        this.ItemPage.ClickBuyNowButton();
        this.SignInPage.ClickContinueAsGuestButton();
        this.ShippingAddressPage.FillShippingInfo(clientInfo);
        this.ShippingAddressPage.Validate().Subtotal(itemPrice);
        this.ShippingAddressPage.ClickContinueButton();
        this.CheckoutPage.Validate().Subtotal(itemPrice);
    }
}
```

```csharp
public class ShoppingCart
{
    private readonly IItemPage itemPage;

    private readonly ISignInPage signInPage;

    private readonly ICheckoutPage checkoutPage;

    private readonly IShippingAddressPage shippingAddressPage;

    public ShoppingCart(IItemPage itemPage, ISignInPage signInPage, ICheckoutPage checkoutPage, IShippingAddressPage shippingAddressPage)
    {
        this.itemPage = itemPage;
        this.signInPage = signInPage;
        this.checkoutPage = checkoutPage;
        this.shippingAddressPage = shippingAddressPage;
    }

    public void PurchaseItem(string item, double itemPrice, ClientInfo clientInfo)
    {
        this.itemPage.Open(item);
        this.itemPage.AssertPrice(itemPrice);
        this.itemPage.ClickBuyNowButton();
        this.signInPage.ClickContinueAsGuestButton();
        this.shippingAddressPage.FillShippingInfo(clientInfo);
        this.shippingAddressPage.AssertSubtotalAmount(itemPrice);
        this.shippingAddressPage.ClickContinueButton();
        this.checkoutPage.AssertSubtotal(itemPrice);
    }
}
```

## Page Objects That Make Code More Maintainable

```csharp
public class BasePage<M>
    where M : BasePageElementMap, new()
{
    protected readonly string url;

    public BasePage(string url)
    {
        this.url = url;
    }

    public BasePage()
    {
        this.url = null;
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string part = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url, part));
    }
}

public class BasePage<M, V> : BasePage<M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    public BasePage(string url) : base(url)
    {
    }

    public BasePage()
    {
    }

    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class SearchEngineMainPage : BasePage<SearchEngineMainPageMap>, ISearchEngineMainPage
{
    public SearchEngineMainPage(IWebDriver driver)
        : base(driver, new SearchEngineMainPageMap(driver))
    {
    }

    public override string Url
    {
        get
        {
            return @"searchEngineUrl";
        }
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }
}
```

```csharp
public interface ISearchEngineMainPage : IPage
{
    void Search(string textToType);
}
```

```csharp
public static class SearchEngineMainPageAsserter
{
    public static void AssertResultsCountIsAsExpected(this ISearchEngineMainPage page, int expectedCount)
    {
        Assert.AreEqual(page.GetResultsCount(), expectedCount, "The results count is not as expected.");
    }
}
```

```csharp
public abstract class BasePage<TMap>
    where TMap : BaseElementMap
{
    private readonly TMap map;
    protected IWebDriver driver;

    public BasePage(IWebDriver driver, TMap map)
    {
        this.driver = driver;
        this.map = map;
    }

    internal TMap Map
    {
        get
        {
            return this.map;
        }
    }

    public abstract string Url { get; }

    public virtual void Open(string part = "")
    {
        this.driver.Navigate().GoToUrl(string.Concat(this.Url, part));
    }
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private ISearchEngineMainPage searchEngineMainPage;
    private IWebDriver driver;

    [TestInitialize]
    public void SetupTest()
    {
        driver = new FirefoxDriver();
        searchEngineMainPage = new SearchEngineMainPage(driver);
    }

    [TestCleanup]
    public void TeardownTest()
    {
        driver.Quit();
    }

    [TestMethod]
    public void SearchForAutomateThePlanet()
    {
        this.searchEngineMainPage.Open();
        this.searchEngineMainPage.Search("Automate The Planet");
        this.searchEngineMainPage.AssertResultsCountIsAsExpected(264);
    }
}
```

```csharp
public abstract class BasePage<TMap>
    where TMap : BaseElementMap
{
    private readonly TMap map;
    protected IWebDriver driver;

    public BasePage(IWebDriver driver, TMap map)
    {
        this.driver = driver;
        this.map = map;
    }

    public TMap Map
    {
        get
        {
            return this.map;
        }
    }

    public abstract string Url { get; }

    public virtual void Open(string part = "")
    {
        this.driver.Navigate().GoToUrl(string.Concat(this.Url, part));
    }
}
```

```csharp
public static class SearchEngineMainPageAsserter
{
    public static void AssertResultsCountIsAsExpected(this SearchEngineMainPage page, int expectedCount)
    {
        Assert.AreEqual(page.Map.ResultsCountDiv.Text, expectedCount, "The results count is not as expected.");
    }
}
```

```csharp
[TestMethod]
public void SearchForAutomateThePlanet()
{
    this.searchEngineMainPage.Open();
    this.searchEngineMainPage.Map.FeelingLuckyButton.Click();
    this.driver.Navigate().Back();
    this.searchEngineMainPage.Search("Automate The Planet");
    this.searchEngineMainPage.AssertResultsCountIsAsExpected(264);
}
```

```csharp
public partial class SearchEngineMainPage : BasePage
{
    public IWebElement SearchBox
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_q"));
        }
    }

    public IWebElement GoButton
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_go"));
        }
    }

    public IWebElement ResultsCountDiv
    {
        get
        {
            return this.driver.FindElement(By.Id("b_tween"));
        }
    }
}
```

```csharp
public partial class SearchEngineMainPage : BasePage
{
    public SearchEngineMainPage(IWebDriver driver) : base(driver)
    {
    }

    public override string Url
    {
        get
        {
            return @"http://searchEngineUrl/";
        }
    }

    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }
}
```

```csharp
[TestMethod]
public void SearchForAutomateThePlanet_Second()
{
    this.searchEngineMainPage.Open();
    this.searchEngineMainPage.SearchBox.Clear();
    this.searchEngineMainPage.SearchBox.SendKeys("Automate The Planet");
    this.searchEngineMainPage.GoButton.Click();
    this.searchEngineMainPage.AssertResultsCountIsAsExpected(264);
}
```

## Decorator Design Pattern in Automated Testing

```csharp
public class PurchaseContext
{
    private readonly IOrderValidationStrategy orderValidationStrategy;

    public PurchaseContext(IOrderValidationStrategy orderValidationStrategy)
    {
        this.orderValidationStrategy = orderValidationStrategy;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
        this.orderValidationStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly IOrderPurchaseStrategy[] orderpurchaseStrategies;

    public PurchaseContext(params IOrderPurchaseStrategy[] orderpurchaseStrategies)
    {
        this.orderpurchaseStrategies = orderpurchaseStrategies;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        this.ValidateClientPurchaseInfo(clientPurchaseInfo);

        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingAddressPage.Instance.FillBillingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();

        this.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }

    public void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo)
    {
        foreach (var currentStrategy in orderpurchaseStrategies)
        {
            currentStrategy.ValidateClientPurchaseInfo(clientPurchaseInfo);
        }
    }

    public void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        foreach (var currentStrategy in orderpurchaseStrategies)
        {
            currentStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
        }
    }
}
```

```csharp
new PurchaseContext(new SalesTaxOrderPurchaseStrategy(), new VatTaxOrderPurchaseStrategy(), new GiftOrderPurchaseStrategy())
        .PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
```

```csharp
public abstract class OrderPurchaseStrategy
{
    public abstract decimal CalculateTotalPrice();

    public abstract void ValidateOrderSummary(decimal totalPrice);
}
```

```csharp
public class TotalPriceOrderPurchaseStrategy : OrderPurchaseStrategy
{
    private readonly decimal itemsPrice;

    public TotalPriceOrderPurchaseStrategy(decimal itemsPrice)
    {
        this.itemsPrice = itemsPrice;
    }

    public override decimal CalculateTotalPrice()
    {
        return itemsPrice;
    }

    public override void ValidateOrderSummary(decimal totalPrice)
    {
        PlaceOrderPage.Instance.Validate().OrderTotalPrice(totalPrice.ToString());
    }
}
```

```csharp
public abstract class OrderPurchaseStrategyDecorator : OrderPurchaseStrategy
{
    protected readonly OrderPurchaseStrategy orderPurchaseStrategy;
    protected readonly ClientPurchaseInfo clientPurchaseInfo;
    protected readonly decimal itemsPrice;

    public OrderPurchaseStrategyDecorator(OrderPurchaseStrategy orderPurchaseStrategy, decimal itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        this.orderPurchaseStrategy = orderPurchaseStrategy;
        this.itemsPrice = itemsPrice;
        this.clientPurchaseInfo = clientPurchaseInfo;
    }

    public override decimal CalculateTotalPrice()
    {
        this.ValidateOrderStrategy();

        return this.orderPurchaseStrategy.CalculateTotalPrice();
    }

    public override void ValidateOrderSummary(decimal totalPrice)
    {
        this.ValidateOrderStrategy();
        this.orderPurchaseStrategy.ValidateOrderSummary(totalPrice);
    }

    private void ValidateOrderStrategy()
    {
        if (this.orderPurchaseStrategy == null)
        {
            throw new Exception("The OrderPurchaseStrategy should be first initialized.");
        }
    }
}
```

```csharp
public class VatTaxOrderPurchaseStrategy : OrderPurchaseStrategyDecorator
{
    private readonly VatTaxCalculationService vatTaxCalculationService;
    private decimal vatTax;

    public VatTaxOrderPurchaseStrategy(OrderPurchaseStrategy orderPurchaseStrategy, decimal itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
        : base(orderPurchaseStrategy, itemsPrice, clientPurchaseInfo)
    {
        this.vatTaxCalculationService = new VatTaxCalculationService();
    }

    public override decimal CalculateTotalPrice()
    {
        Countries currentCountry = (Countries)Enum.Parse(typeof(Countries), clientPurchaseInfo.BillingInfo.Country);
        this.vatTax = this.vatTaxCalculationService.Calculate(this.itemsPrice, currentCountry);
        return this.orderPurchaseStrategy.CalculateTotalPrice() + this.vatTax;
    }

    public override void ValidateOrderSummary(decimal totalPrice)
    {
        base.orderPurchaseStrategy.ValidateOrderSummary(totalPrice);
        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(vatTax.ToString());
    }
}
```

```csharp
public class SalesTaxOrderPurchaseStrategy : OrderPurchaseStrategyDecorator
{
    private readonly SalesTaxCalculationService salesTaxCalculationService;
    private decimal salesTax;

    public SalesTaxOrderPurchaseStrategy(OrderPurchaseStrategy orderPurchaseStrategy, decimal itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
        : base(orderPurchaseStrategy, itemsPrice, clientPurchaseInfo)
    {
        this.salesTaxCalculationService = new SalesTaxCalculationService();
    }

    public SalesTaxCalculationService SalesTaxCalculationService { get; set; }

    public override decimal CalculateTotalPrice()
    {
        States currentState = (States)Enum.Parse(typeof(States), clientPurchaseInfo.ShippingInfo.State);
        this.salesTax = this.salesTaxCalculationService.Calculate(this.itemsPrice, currentState, clientPurchaseInfo.ShippingInfo.Zip);
        return this.orderPurchaseStrategy.CalculateTotalPrice() + this.salesTax;
    }

    public override void ValidateOrderSummary(decimal totalPrice)
    {
        base.orderPurchaseStrategy.ValidateOrderSummary(totalPrice);
        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(salesTax.ToString());
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly OrderPurchaseStrategy orderPurchaseStrategy;

    public PurchaseContext(OrderPurchaseStrategy orderPurchaseStrategy)
    {
        this.orderPurchaseStrategy = orderPurchaseStrategy;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingAddressPage.Instance.FillBillingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
        decimal expectedTotalPrice = this.orderPurchaseStrategy.CalculateTotalPrice();
        this.orderPurchaseStrategy.ValidateOrderSummary(expectedTotalPrice);
    }
}
```

```csharp
public void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo)
{
    foreach (var currentStrategy in orderpurchaseStrategies)
    {
        currentStrategy.ValidateClientPurchaseInfo(clientPurchaseInfo);
    }
}

public void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo)
{
    foreach (var currentStrategy in orderpurchaseStrategies)
    {
        currentStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }
}
```

```csharp
[TestClass]
public class Online StorePurchase_DecoratedStrategies_Tests
{
    [TestInitialize]
public void SetupTest()
{
    Driver.StartBrowser();
}

[TestCleanup]
public void TeardownTest()
{
    Driver.StopBrowser();
}

[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook_DecoratedStrategies()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    decimal itemPrice = 40.49m;
    var shippingInfo = new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "Texas",
        City = "Houston",
        Zip = "77001",
        Phone = "00164644885569"
    };
    var billingInfo = new ClientAddressInfo()
    {
        FullName = "Anton Angelov",
        Country = "Bulgaria",
        Address1 = "950 Avenue of the Americas",
        City = "Sofia",
        Zip = "1672",
        Phone = "0894464647"
    };
    ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(billingInfo, shippingInfo)
    {
        GiftWrapping = GiftWrappingStyles.Fancy
    };
    ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    OrderPurchaseStrategy orderPurchaseStrategy = new TotalPriceOrderPurchaseStrategy(itemPrice);
    orderPurchaseStrategy = new SalesTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, clientPurchaseInfo);
    orderPurchaseStrategy = new VatTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, clientPurchaseInfo);

    new PurchaseContext(orderPurchaseStrategy).PurchaseItem(itemUrl, itemPrice.ToString(), clientLoginInfo, clientPurchaseInfo);
}
}
```

```csharp
OrderPurchaseStrategy orderPurchaseStrategy = new TotalPriceOrderPurchaseStrategy(itemPrice);
orderPurchaseStrategy = new SalesTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, clientPurchaseInfo);
orderPurchaseStrategy = new VatTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, clientPurchaseInfo);
new PurchaseContext(orderPurchaseStrategy).PurchaseItem(itemUrl, itemPrice.ToString(), clientLoginInfo, clientPurchaseInfo);
```

## Advanced Observer Design Pattern via IObservable and IObserver in Automated Testing

```csharp

public class MSTestExecutionProvider : IObservable<ExecutionStatus>, IDisposable, ITestExecutionProvider
{
    private readonly List<IObserver<ExecutionStatus>> testBehaviorObservers;

    public MSTestExecutionProvider()
    {
        this.testBehaviorObservers = new List<IObserver<ExecutionStatus>>();
    }

    public void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PreTestInit);
    }

    public void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PostTestInit);
    }

    public void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PreTestCleanup);
    }

    public void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PostTestCleanup);
    }

    public void TestInstantiated(MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(null, memberInfo, ExecutionPhases.TestInstantiated);
    }

    public IDisposable Subscribe(IObserver<ExecutionStatus> observer)
    {
        if (!testBehaviorObservers.Contains(observer))
        {
            testBehaviorObservers.Add(observer);
        }
        return new Unsubscriber<ExecutionStatus>(testBehaviorObservers, observer);
    }

    private void NotifyObserversExecutionPhase(TestContext context, MemberInfo memberInfo, ExecutionPhases executionPhase)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.OnNext(new ExecutionStatus(context, memberInfo, executionPhase));
        }
    }

    public void Dispose()
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.OnCompleted();
        }

        this.testBehaviorObservers.Clear();
    }
}
```

```csharp
internal class Unsubscriber<T> : IDisposable
{
    private List<IObserver<T>> observers;
    private IObserver<T> observer;

    internal Unsubscriber(List<IObserver<T>> observers, IObserver<T> observer)
    {
        this.observers = observers;
        this.observer = observer;
    }

    public void Dispose()
    {
        if (observers.Contains(observer))
            observers.Remove(observer);
    }
}
```

```csharp
public class ExecutionStatus
{
    public TestContext TestContext { get; set; }

    public MemberInfo MemberInfo { get; set; }

    public ExecutionPhases ExecutionPhase { get; set; }

    public ExecutionStatus(TestContext testContext, ExecutionPhases executionPhase) : this(testContext, null, executionPhase)
    {
    }

    public ExecutionStatus(TestContext testContext, MemberInfo memberInfo, ExecutionPhases executionPhase)
    {
        this.TestContext = testContext;
        this.MemberInfo = memberInfo;
        this.ExecutionPhase = executionPhase;
    }
}
```

```csharp
public enum ExecutionPhases
{
    TestInstantiated,
    PreTestInit,
    PostTestInit,
    PreTestCleanup,
    PostTestCleanup
}
```

```csharp
private void NotifyObserversExecutionPhase(TestContext context, MemberInfo memberInfo, ExecutionPhases executionPhase)
{
    foreach (var currentObserver in this.testBehaviorObservers)
    {
        currentObserver.OnNext(new ExecutionStatus(context, memberInfo, executionPhase));
    }
}
```

```csharp
public class BaseTestBehaviorObserver : IObserver<ExecutionStatus>
{
    private IDisposable cancellation;

    public virtual void Subscribe(IObservable<ExecutionStatus> provider)
    {
        cancellation = provider.Subscribe(this);
    }

    public virtual void Unsubscribe()
    {
        cancellation.Dispose();
    }

    public void OnNext(ExecutionStatus currentExecutionStatus)
    {
        switch (currentExecutionStatus.ExecutionPhase)
        {
            case ExecutionPhases.TestInstantiated:
                this.TestInstantiated(currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PreTestInit:
                this.PreTestInit(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PostTestInit:
                this.PostTestInit(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PreTestCleanup:
                this.PreTestCleanup(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PostTestCleanup:
                this.PostTestCleanup(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            default:
                break;
        }
    }

    public virtual void OnError(Exception e)
    {
        Console.WriteLine("The following exception occurred: {0}", e.Message);
    }

    public virtual void OnCompleted()
    {
    }

    protected virtual void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void TestInstantiated(MemberInfo memberInfo)
    {
    }
}
```

```csharp
public class OwnerTestBehaviorObserver : BaseTestBehaviorObserver
{
    protected override void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.ThrowExceptionIfOwnerAttributeNotSet(memberInfo);
    }

    private void ThrowExceptionIfOwnerAttributeNotSet(MemberInfo memberInfo)
    {
        try
        {
            memberInfo.GetCustomAttribute<OwnerAttribute>(true);
        }
        catch
        {
            throw new Exception("You have to set Owner of your test before you run it");
        }
    }
}
```

```csharp
[TestClass]
public class BaseTest
{
    private readonly MSTestExecutionProvider currentTestExecutionProvider;
    private TestContext testContextInstance;

    public BaseTest()
    {
        this.currentTestExecutionProvider = new MSTestExecutionProvider();
        this.InitializeTestExecutionBehaviorObservers(this.currentTestExecutionProvider);
        var memberInfo = MethodInfo.GetCurrentMethod();
        this.currentTestExecutionProvider.TestInstantiated(memberInfo);
    }

    public string BaseUrl { get; set; }

    public IWebDriver Browser { get; set; }

    public TestContext TestContext
    {
        get
        {
            return testContextInstance;
        }
        set
        {
            testContextInstance = value;
        }
    }

    public string TestName
    {
        get
        {
            return this.TestContext.TestName;
        }
    }

    [ClassInitialize]
    public static void OnClassInitialize(TestContext context)
    {
    }

    [ClassCleanup]
    public static void OnClassCleanup()
    {
    }

    [TestInitialize]
    public void CoreTestInit()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestInit(this.TestContext, memberInfo);
        this.TestInit();
        this.currentTestExecutionProvider.PostTestInit(this.TestContext, memberInfo);
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestCleanup(this.TestContext, memberInfo);
        this.TestCleanup();
        this.currentTestExecutionProvider.PostTestCleanup(this.TestContext, memberInfo);
    }

    public virtual void TestInit()
    {
    }

    public virtual void TestCleanup()
    {
    }

    private MethodInfo GetCurrentExecutionMethodInfo()
    {
        var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);
        return memberInfo;
    }

    private void InitializeTestExecutionBehaviorObservers(MSTestExecutionProvider currentTestExecutionProvider)
    {
        new AssociatedBugTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new BrowserLaunchTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new OwnerTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
    }
}
```

## Advanced Observer Design Pattern via IObservable and IObserver in Automated Testing

```csharp
public class MSTestExecutionProvider : IObservable<ExecutionStatus>, IDisposable, ITestExecutionProvider
{
    private readonly List<IObserver<ExecutionStatus>> testBehaviorObservers;

    public MSTestExecutionProvider()
    {
        this.testBehaviorObservers = new List<IObserver<ExecutionStatus>>();
    }

    public void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PreTestInit);
    }

    public void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PostTestInit);
    }

    public void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PreTestCleanup);
    }

    public void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PostTestCleanup);
    }

    public void TestInstantiated(MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(null, memberInfo, ExecutionPhases.TestInstantiated);
    }

    public IDisposable Subscribe(IObserver<ExecutionStatus> observer)
    {
        if (!testBehaviorObservers.Contains(observer))
        {
            testBehaviorObservers.Add(observer);
        }
        return new Unsubscriber<ExecutionStatus>(testBehaviorObservers, observer);
    }

    private void NotifyObserversExecutionPhase(TestContext context, MemberInfo memberInfo, ExecutionPhases executionPhase)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.OnNext(new ExecutionStatus(context, memberInfo, executionPhase));
        }
    }

    public void Dispose()
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.OnCompleted();
        }

        this.testBehaviorObservers.Clear();
    }
}
```

```csharp
internal class Unsubscriber<T> : IDisposable
{
    private List<IObserver<T>> observers;
    private IObserver<T> observer;

    internal Unsubscriber(List<IObserver<T>> observers, IObserver<T> observer)
    {
        this.observers = observers;
        this.observer = observer;
    }

    public void Dispose()
    {
        if (observers.Contains(observer))
            observers.Remove(observer);
    }
}
```

```csharp
public class ExecutionStatus
{
    public TestContext TestContext { get; set; }

    public MemberInfo MemberInfo { get; set; }

    public ExecutionPhases ExecutionPhase { get; set; }

    public ExecutionStatus(TestContext testContext, ExecutionPhases executionPhase) : this(testContext, null, executionPhase)
    {
    }

    public ExecutionStatus(TestContext testContext, MemberInfo memberInfo, ExecutionPhases executionPhase)
    {
        this.TestContext = testContext;
        this.MemberInfo = memberInfo;
        this.ExecutionPhase = executionPhase;
    }
}
```

```csharp
public enum ExecutionPhases
{
    TestInstantiated,
    PreTestInit,
    PostTestInit,
    PreTestCleanup,
    PostTestCleanup
}
```

```csharp
private void NotifyObserversExecutionPhase(TestContext context, MemberInfo memberInfo, ExecutionPhases executionPhase)
{
    foreach (var currentObserver in this.testBehaviorObservers)
    {
        currentObserver.OnNext(new ExecutionStatus(context, memberInfo, executionPhase));
    }
}
```

```csharp
public class BaseTestBehaviorObserver : IObserver<ExecutionStatus>
{
    private IDisposable cancellation;

    public virtual void Subscribe(IObservable<ExecutionStatus> provider)
    {
        cancellation = provider.Subscribe(this);
    }

    public virtual void Unsubscribe()
    {
        cancellation.Dispose();
    }

    public void OnNext(ExecutionStatus currentExecutionStatus)
    {
        switch (currentExecutionStatus.ExecutionPhase)
        {
            case ExecutionPhases.TestInstantiated:
                this.TestInstantiated(currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PreTestInit:
                this.PreTestInit(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PostTestInit:
                this.PostTestInit(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PreTestCleanup:
                this.PreTestCleanup(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PostTestCleanup:
                this.PostTestCleanup(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            default:
                break;
        }
    }

    public virtual void OnError(Exception e)
    {
        Console.WriteLine("The following exception occurred: {0}", e.Message);
    }

    public virtual void OnCompleted()
    {
    }

    protected virtual void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void TestInstantiated(MemberInfo memberInfo)
    {
    }
}
```

```csharp
public class OwnerTestBehaviorObserver : BaseTestBehaviorObserver
{
    protected override void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.ThrowExceptionIfOwnerAttributeNotSet(memberInfo);
    }

    private void ThrowExceptionIfOwnerAttributeNotSet(MemberInfo memberInfo)
    {
        try
        {
            memberInfo.GetCustomAttribute<OwnerAttribute>(true);
        }
        catch
        {
            throw new Exception("You have to set Owner of your test before you run it");
        }
    }
}
```

```csharp
[TestClass]
public class BaseTest
{
    private readonly MSTestExecutionProvider currentTestExecutionProvider;
    private TestContext testContextInstance;

    public BaseTest()
    {
        this.currentTestExecutionProvider = new MSTestExecutionProvider();
        this.InitializeTestExecutionBehaviorObservers(this.currentTestExecutionProvider);
        var memberInfo = MethodInfo.GetCurrentMethod();
        this.currentTestExecutionProvider.TestInstantiated(memberInfo);
    }

    public string BaseUrl { get; set; }

    public IWebDriver Browser { get; set; }

    public TestContext TestContext
    {
        get
        {
            return testContextInstance;
        }
        set
        {
            testContextInstance = value;
        }
    }

    public string TestName
    {
        get
        {
            return this.TestContext.TestName;
        }
    }

    [ClassInitialize]
    public static void OnClassInitialize(TestContext context)
    {
    }

    [ClassCleanup]
    public static void OnClassCleanup()
    {
    }

    [TestInitialize]
    public void CoreTestInit()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestInit(this.TestContext, memberInfo);
        this.TestInit();
        this.currentTestExecutionProvider.PostTestInit(this.TestContext, memberInfo);
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestCleanup(this.TestContext, memberInfo);
        this.TestCleanup();
        this.currentTestExecutionProvider.PostTestCleanup(this.TestContext, memberInfo);
    }

    public virtual void TestInit()
    {
    }

    public virtual void TestCleanup()
    {
    }

    private MethodInfo GetCurrentExecutionMethodInfo()
    {
        var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);
        return memberInfo;
    }

    private void InitializeTestExecutionBehaviorObservers(MSTestExecutionProvider currentTestExecutionProvider)
    {
        new AssociatedBugTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new BrowserLaunchTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new OwnerTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
    }
}
```

## Observer Design Pattern Classic Implementation in Automated Testing

```csharp
public interface IExecutionProvider
{
    event EventHandler<TestExecutionEventArgs> TestInstantiatedEvent;

    event EventHandler<TestExecutionEventArgs> PreTestInitEvent;

    event EventHandler<TestExecutionEventArgs> PostTestInitEvent;

    event EventHandler<TestExecutionEventArgs> PreTestCleanupEvent;

    event EventHandler<TestExecutionEventArgs> PostTestCleanupEvent;
}
```

```csharp
public class MSTestExecutionProvider : IExecutionProvider
{
    public event EventHandler<TestExecutionEventArgs> TestInstantiatedEvent;

    public event EventHandler<TestExecutionEventArgs> PreTestInitEvent;

    public event EventHandler<TestExecutionEventArgs> PostTestInitEvent;

    public event EventHandler<TestExecutionEventArgs> PreTestCleanupEvent;

    public event EventHandler<TestExecutionEventArgs> PostTestCleanupEvent;

    public void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.PreTestInitEvent, context, memberInfo);
    }

    public void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.PostTestInitEvent, context, memberInfo);
    }

    public void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.PreTestCleanupEvent, context, memberInfo);
    }

    public void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.PostTestCleanupEvent, context, memberInfo);
    }

    public void TestInstantiated(MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.TestInstantiatedEvent, null, memberInfo);
    }

    private void RaiseTestEvent(EventHandler<TestExecutionEventArgs> eventHandler, TestContext testContext, MemberInfo memberInfo)
    {
        if (eventHandler != null)
        {
            eventHandler(this, new TestExecutionEventArgs(testContext, memberInfo));
        }
    }
}
```

```csharp
public class TestExecutionEventArgs : EventArgs
{
    private readonly TestContext testContext;
    private readonly MemberInfo memberInfo;

    public TestExecutionEventArgs(TestContext context, MemberInfo memberInfo)
    {
        this.testContext = context;
        this.memberInfo = memberInfo;
    }

    public MemberInfo MemberInfo
    {
        get
        {
            return this.memberInfo;
        }
    }

    public TestContext TestContext
    {
        get
        {
            return this.testContext;
        }
    }
}
```

```csharp
[TestClass]
[ExecutionBrowser(BrowserTypes.Chrome)]
public class SearchEngineTestsDotNetEvents : BaseTest
{
    [TestMethod]
    [ExecutionBrowser(BrowserTypes.Firefox)]
    public void SearchTextInSearchEngine_First_Observer()
    {
        B.SearchEngineMainPage searchEngineMainPage = new B.SearchEngineMainPage(Driver.Browser);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.ValidateResultsCount("RESULTS");
    }
}
```

```csharp
public class BrowserLaunchTestBehaviorObserver : BaseTestBehaviorObserver
{
    protected override void PreTestInit(object sender, TestExecutionEventArgs e)
    {
        var browserType = this.GetExecutionBrowser(e.MemberInfo);
        Driver.StartBrowser(browserType);
    }

    protected override void PostTestCleanup(object sender, TestExecutionEventArgs e)
    {
        Driver.StopBrowser();
    }

    private BrowserTypes GetExecutionBrowser(MemberInfo memberInfo)
    {
        BrowserTypes result = BrowserTypes.Firefox;
        BrowserTypes classBrowserType = this.GetExecutionBrowserClassLevel(memberInfo.DeclaringType);
        BrowserTypes methodBrowserType = this.GetExecutionBrowserMethodLevel(memberInfo);
        if (methodBrowserType != BrowserTypes.NotSet)
        {
            result = methodBrowserType;
        }
        else if (classBrowserType != BrowserTypes.NotSet)
        {
            result = classBrowserType;
        }
        return result;
    }

    private BrowserTypes GetExecutionBrowserMethodLevel(MemberInfo memberInfo)
    {
        var executionBrowserAttribute = memberInfo.GetCustomAttribute<ExecutionBrowserAttribute>(true);
        if (executionBrowserAttribute != null)
        {
            return executionBrowserAttribute.BrowserType;
        }
        return BrowserTypes.NotSet;
    }

    private BrowserTypes GetExecutionBrowserClassLevel(Type type)
    {
        var executionBrowserAttribute = type.GetCustomAttribute<ExecutionBrowserAttribute>(true);
        if (executionBrowserAttribute != null)
        {
            return executionBrowserAttribute.BrowserType;
        }
        return BrowserTypes.NotSet;
    }
}
```

```csharp
public class BaseTest
{
    private readonly MSTestExecutionProvider currentTestExecutionProvider;
    private TestContext testContextInstance;

    public BaseTest()
    {
        this.currentTestExecutionProvider = new MSTestExecutionProvider();
        this.InitializeTestExecutionBehaviorObservers(this.currentTestExecutionProvider);
        var memberInfo = MethodInfo.GetCurrentMethod();
        this.currentTestExecutionProvider.TestInstantiated(memberInfo);
    }

    public string BaseUrl { get; set; }

    public IWebDriver Browser { get; set; }

    public TestContext TestContext
    {
        get
        {
            return testContextInstance;
        }
        set
        {
            testContextInstance = value;
        }
    }

    public string TestName
    {
        get
        {
            return this.TestContext.TestName;
        }
    }

    [TestInitialize]
    public void CoreTestInit()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestInit(this.TestContext, memberInfo);
        this.TestInit();
        this.currentTestExecutionProvider.PostTestInit(this.TestContext, memberInfo);
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestCleanup(this.TestContext, memberInfo);
        this.TestCleanup();
        this.currentTestExecutionProvider.PostTestCleanup(this.TestContext, memberInfo);
    }

    public virtual void TestInit()
    {
    }

    public virtual void TestCleanup()
    {
    }

    private MethodInfo GetCurrentExecutionMethodInfo()
    {
        var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);
        return memberInfo;
    }

    private void InitializeTestExecutionBehaviorObservers(MSTestExecutionProvider currentTestExecutionProvider)
    {
        new AssociatedBugTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new BrowserLaunchTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new OwnerTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
    }
}
```

## Observer Design Pattern Classic Implementation in Automated Testing

```csharp
public interface ITestBehaviorObserver
{
    void PreTestInit(TestContext context, MemberInfo memberInfo);

    void PostTestInit(TestContext context, MemberInfo memberInfo);

    void PreTestCleanup(TestContext context, MemberInfo memberInfo);

    void PostTestCleanup(TestContext context, MemberInfo memberInfo);

    void TestInstantiated(MemberInfo memberInfo);
}
```

```csharp
public class MSTestExecutionSubject : ITestExecutionSubject
{
    private readonly List<ITestBehaviorObserver> testBehaviorObservers;

    public MSTestExecutionSubject()
    {
        this.testBehaviorObservers = new List<ITestBehaviorObserver>();
    }

    public void Attach(ITestBehaviorObserver observer)
    {
        testBehaviorObservers.Add(observer);
    }

    public void Detach(ITestBehaviorObserver observer)
    {
        testBehaviorObservers.Remove(observer);
    }

    public void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.PreTestInit(context, memberInfo);
        }
    }
    public void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.PostTestInit(context, memberInfo);
        }
    }

    public void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.PreTestCleanup(context, memberInfo);
        }
    }

    public void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.PostTestCleanup(context, memberInfo);
        }
    }

    public void TestInstantiated(MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.TestInstantiated(memberInfo);
        }
    }
}
```

```csharp
public class BaseTestBehaviorObserver : ITestBehaviorObserver
{
    private readonly ITestExecutionSubject testExecutionSubject;

    public BaseTestBehaviorObserver(ITestExecutionSubject testExecutionSubject)
    {
        this.testExecutionSubject = testExecutionSubject;
        testExecutionSubject.Attach(this);
    }

    public virtual void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    public virtual void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    public virtual void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    public virtual void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    public virtual void TestInstantiated(MemberInfo memberInfo)
    {
    }
}
```

```csharp
[TestClass]
[ExecutionBrowser(BrowserType = BrowserTypes.Firefox)]
public class SearchEngineTestsClassicObserver : BaseTest
{
    [TestMethod]
    [ExecutionBrowser(BrowserType = BrowserTypes.Chrome)]
    public void SearchTextInSearchEngine_First_Observer()
    {
        B.SearchEngineMainPage searchEngineMainPage = new B.SearchEngineMainPage(Driver.Browser);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.ValidateResultsCount("RESULTS");
    }
}
```

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
public class ExecutionBrowserAttribute : Attribute
{
    public ExecutionBrowserAttribute(BrowserTypes browser)
    {
        this.BrowserType = browser;
    }

    public BrowserTypes BrowserType { get; set; }
}
```

```csharp
public class BrowserLaunchTestBehaviorObserver : BaseTestBehaviorObserver
{
    public BrowserLaunchTestBehaviorObserver(ITestExecutionSubject testExecutionSubject)
        : base(testExecutionSubject)
    {
    }

    public override void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        var browserType = this.GetExecutionBrowser(memberInfo);
        Driver.StartBrowser(browserType);
    }

    public override void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        Driver.StopBrowser();
    }

    private BrowserTypes GetExecutionBrowser(MemberInfo memberInfo)
    {
        BrowserTypes result = BrowserTypes.Firefox;
        BrowserTypes classBrowserType = this.GetExecutionBrowserClassLevel(memberInfo.DeclaringType);
        BrowserTypes methodBrowserType = this.GetExecutionBrowserMethodLevel(memberInfo);
        if (methodBrowserType != BrowserTypes.NotSet)
        {
            result = methodBrowserType;
        }
        else if (classBrowserType != BrowserTypes.NotSet)
        {
            result = classBrowserType;
        }
        return result;
    }

    private BrowserTypes GetExecutionBrowserMethodLevel(MemberInfo memberInfo)
    {
        var executionBrowserAttribute = memberInfo.GetCustomAttribute<ExecutionBrowserAttribute>(true);
        if (executionBrowserAttribute != null)
        {
            return executionBrowserAttribute.BrowserType;
        }
        return BrowserTypes.NotSet;
    }

    private BrowserTypes GetExecutionBrowserClassLevel(Type type)
    {
        var executionBrowserAttribute = type.GetCustomAttribute<ExecutionBrowserAttribute>(true);
        if (executionBrowserAttribute != null)
        {
            return executionBrowserAttribute.BrowserType;
        }
        return BrowserTypes.NotSet;
    }
}
```

```csharp
var executionBrowserAttribute = memberInfo.GetCustomAttribute<ExecutionBrowserAttribute>(true);

```

```csharp
public class OwnerTestBehaviorObserver : BaseTestBehaviorObserver
{
    public OwnerTestBehaviorObserver(ITestExecutionSubject testExecutionSubject)
        : base(testExecutionSubject)
    {
    }

    public override void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.ThrowExceptionIfOwnerAttributeNotSet(memberInfo);
    }

    private void ThrowExceptionIfOwnerAttributeNotSet(MemberInfo memberInfo)
    {
        try
        {
            var ownerAttribute = memberInfo.GetCustomAttribute<OwnerAttribute>(true);
        }
        catch
        {
            throw new Exception("You have to set Owner of your test before you run it");
        }
    }
}
```

```csharp
[TestClass]
public class BaseTest
{
    private readonly ITestExecutionSubject currentTestExecutionSubject;
    private TestContext testContextInstance;

    public BaseTest()
    {
        this.currentTestExecutionSubject = new MSTestExecutionSubject();
        this.InitializeTestExecutionBehaviorObservers(this.currentTestExecutionSubject);
        var memberInfo = MethodInfo.GetCurrentMethod();
        this.currentTestExecutionSubject.TestInstantiated(memberInfo);
    }

    public string BaseUrl { get; set; }

    public IWebDriver Browser { get; set; }

    public TestContext TestContext
    {
        get
        {
            return testContextInstance;
        }
        set
        {
            testContextInstance = value;
        }
    }

    public string TestName
    {
        get
        {
            return this.TestContext.TestName;
        }
    }

    [ClassInitialize]
    public static void OnClassInitialize(TestContext context)
    {
    }

    [ClassCleanup]
    public static void OnClassCleanup()
    {
    }

    [TestInitialize]
    public void CoreTestInit()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionSubject.PreTestInit(this.TestContext, memberInfo);
        this.TestInit();
        this.currentTestExecutionSubject.PostTestInit(this.TestContext, memberInfo);
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionSubject.PreTestCleanup(this.TestContext, memberInfo);
        this.TestCleanup();
        this.currentTestExecutionSubject.PostTestCleanup(this.TestContext, memberInfo);

    }

    public virtual void TestInit()
    {
    }

    public virtual void TestCleanup()
    {
    }

    private MethodInfo GetCurrentExecutionMethodInfo()
    {
        var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);
        return memberInfo;
    }

    private void InitializeTestExecutionBehaviorObservers(ITestExecutionSubject currentTestExecutionSubject)
    {
        new AssociatedBugTestBehaviorObserver(currentTestExecutionSubject);
        new BrowserLaunchTestBehaviorObserver(currentTestExecutionSubject);
        new OwnerTestBehaviorObserver(currentTestExecutionSubject);
    }
}
```

```csharp
var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);

```

## Advanced Strategy Design Pattern in Automated Testing

```csharp
public interface IOrderPurchaseStrategy
{
    void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo);

    void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo);
}
```

```csharp
public class SalesTaxOrderPurchaseStrategy : IOrderPurchaseStrategy
{
    public SalesTaxOrderPurchaseStrategy()
    {
        this.SalesTaxCalculationService = new SalesTaxCalculationService();
    }

    public SalesTaxCalculationService SalesTaxCalculationService { get; set; }

    public void ValidateOrderSummary(string itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        States currentState = (States)Enum.Parse(typeof(States), clientPurchaseInfo.ShippingInfo.State);
        decimal currentItemPrice = decimal.Parse(itemsPrice);
        decimal salesTax = this.SalesTaxCalculationService.Calculate(currentItemPrice, currentState, clientPurchaseInfo.ShippingInfo.Zip);

        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(salesTax.ToString());
    }

    public void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo)
    {
        if (!clientPurchaseInfo.ShippingInfo.Country.Equals("United States"))
        {
            throw new ArgumentException("If the NoTaxesOrderPurchaseStrategy is used, the country should be set to United States because otherwise no sales tax is going to be applied.");
        }
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly IOrderValidationStrategy orderValidationStrategy;

    public PurchaseContext(IOrderValidationStrategy orderValidationStrategy)
    {
        this.orderValidationStrategy = orderValidationStrategy;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
        this.orderValidationStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly IOrderPurchaseStrategy[] orderpurchaseStrategies;

    public PurchaseContext(params IOrderPurchaseStrategy[] orderpurchaseStrategies)
    {
        this.orderpurchaseStrategies = orderpurchaseStrategies;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        this.ValidateClientPurchaseInfo(clientPurchaseInfo);

        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingAddressPage.Instance.FillBillingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();

        this.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }

    public void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo)
    {
        foreach (var currentStrategy in orderpurchaseStrategies)
        {
            currentStrategy.ValidateClientPurchaseInfo(clientPurchaseInfo);
        }
    }

    public void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        foreach (var currentStrategy in orderpurchaseStrategies)
        {
            currentStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
        }
    }
}
```

```csharp
public PurchaseContext(params IOrderPurchaseStrategy[] orderpurchaseStrategies)
{
    this.orderpurchaseStrategies = orderpurchaseStrategies;
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_PurchaseStrategy_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_SeleniumTestingToolsCookbook()
    {
        string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
        string itemPrice = "40.49";
        ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = "John Smith",
            Country = "United States",
            Address1 = "950 Avenue of the Americas",
            State = "New York",
            City = "New York City",
            Zip = "10001-2121",
            Phone = "00164644885569"
        })
        {
            GiftWrapping = Enums.GiftWrappingStyles.None
        };
        ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
        {
            Email = "g3984159@trbvm.com",
            Password = "ASDFG_12345"
        };

        new PurchaseContext(new SalesTaxOrderValidationStrategy()).PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
    }
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_AdvancedPurchaseStrategy_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_SeleniumTestingToolsCookbook()
    {
        string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
        string itemPrice = "40.49";
        var shippingInfo = new ClientAddressInfo()
        {
            FullName = "John Smith",
            Country = "United States",
            Address1 = "950 Avenue of the Americas",
            State = "New York",
            City = "New York City",
            Zip = "10001-2121",
            Phone = "00164644885569"
        };
        var billingInfo = new ClientAddressInfo()
        {
            FullName = "Anton Angelov",
            Country = "Bulgaria",
            Address1 = "950 Avenue of the Americas",
            City = "Sofia",
            Zip = "1672",
            Phone = "0894464647"
        };
        ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(billingInfo, shippingInfo)
        {
            GiftWrapping = Enums.GiftWrappingStyles.Fancy
        };
        ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
        {
            Email = "g3984159@trbvm.com",
            Password = "ASDFG_12345"
        };

        new PurchaseContext(new SalesTaxOrderPurchaseStrategy(), new VatTaxOrderPurchaseStrategy(), new GiftOrderPurchaseStrategy())
        .PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
    }
}
```

## Strategy Design Pattern in Automated Testing

```csharp
public class ShippingAddressPage : BasePageSingleton<ShippingAddressPage, ShippingAddressPageMap>
{
    public void ClickContinueButton()
    {
        this.Map.ContinueButton.Click();
    }

    public void FillShippingInfo(ClientPurchaseInfo clientInfo)
    {
        this.Map.CountryDropDown.SelectByText(clientInfo.Country);
        this.Map.FullNameInput.SendKeys(clientInfo.FullName);
        this.Map.Address1Input.SendKeys(clientInfo.Address1);
        this.Map.CityInput.SendKeys(clientInfo.City);
        this.Map.ZipInput.SendKeys(clientInfo.Zip);
        this.Map.PhoneInput.SendKeys(clientInfo.Phone);
        this.Map.ShipToThisAddress.Click();
    }
}
```

```csharp
public class ClientPurchaseInfo
{
    public string FullName { get; set; }

    public string Country { get; set; }

    public string Address1 { get; set; }

    public string City { get; set; }

    public string Phone { get; set; }

    public string Zip { get; set; }

    public string Email { get; set; }

    public string State { get; set; }

    public string DeliveryType { get; set; }

    public GiftWrappingStyles GiftWrapping { get; set; }
}
```

```csharp
public class PurchaseFacade
{
    public void PurchaseItemSalesTax(string itemUrl, string itemPrice, string taxAmount, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        PurchaseItemInternal(itemUrl, clientLoginInfo, clientPurchaseInfo);
        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(taxAmount);
    }

    public void PurchaseItemGiftWrapping(string itemUrl, string itemPrice, string giftWrapTax, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        PurchaseItemInternal(itemUrl, clientLoginInfo, clientPurchaseInfo);
        PlaceOrderPage.Instance.Validate().GiftWrapPrice(giftWrapTax);
    }

    public void PurchaseItemShippingTax(string itemUrl, string itemPrice, string shippingTax, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        PurchaseItemInternal(itemUrl, clientLoginInfo, clientPurchaseInfo);
        PlaceOrderPage.Instance.Validate().ShippingTaxPrice(shippingTax);
    }

    private void PurchaseItemInternal(string itemUrl, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
    }
}
```

```csharp
public interface IOrderValidationStrategy
{
    void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo);
}
```

```csharp
public class PurchaseContext
{
    private readonly IOrderValidationStrategy orderValidationStrategy;

    public PurchaseContext(IOrderValidationStrategy orderValidationStrategy)
    {
        this.orderValidationStrategy = orderValidationStrategy;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
        this.orderValidationStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }
}
```

```csharp
public class SalesTaxOrderValidationStrategy : IOrderValidationStrategy
{
    public SalesTaxOrderValidationStrategy()
    {
        this.SalesTaxCalculationService = new SalesTaxCalculationService();
    }

    public SalesTaxCalculationService SalesTaxCalculationService { get; set; }

    public void ValidateOrderSummary(string itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        States currentState = (States)Enum.Parse(typeof(States), clientPurchaseInfo.State);
        decimal currentItemPrice = decimal.Parse(itemsPrice);
        decimal salesTax = this.SalesTaxCalculationService.Calculate(currentItemPrice, currentState, clientPurchaseInfo.Zip);

        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(salesTax.ToString());
    }
}
```

```csharp
public class VatTaxOrderValidationStrategy : IOrderValidationStrategy
{
    public VatTaxOrderValidationStrategy()
    {
        this.VatTaxCalculationService = new VatTaxCalculationService();
    }

    public VatTaxCalculationService VatTaxCalculationService { get; set; }

    public void ValidateOrderSummary(string itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        Countries currentCountry = (Countries)Enum.Parse(typeof(Countries), clientPurchaseInfo.Country);
        decimal currentItemPrice = decimal.Parse(itemsPrice);
        decimal vatTax = this.VatTaxCalculationService.Calculate(currentItemPrice, currentCountry);

        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(vatTax.ToString());
    }
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_PurchaseStrategy_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_SeleniumTestingToolsCookbook()
    {
        string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
        string itemPrice = "40.49";
        ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo()
        {
            FullName = "John Smith",
            Country = "United States",
            Address1 = "950 Avenue of the Americas",
            State = "New York",
            City = "New York City",
            Zip = "10001-2121",
            Phone = "00164644885569",
            GiftWrapping = Enums.GiftWrappingStyles.None
        };
        ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
        {
            Email = "g3984159@trbvm.com",
            Password = "ASDFG_12345"
        };

        new PurchaseContext(new SalesTaxOrderValidationStrategy()).PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
    }
}
```

## Use IoC Container to Create Page Object Pattern on Steroids

```csharp
[TestClass]
public class UnityWikipediaTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void TestWikiContentsToggle()
    {
        WikipediaMainPage wikiPage = new WikipediaMainPage();
        wikiPage.Navigate();
        wikiPage.Search("Quality assurance");
        wikiPage.Validate().ToogleLinkTextHide();
        wikiPage.Validate().ContentsListVisible();
        wikiPage.ToggleContents();
        wikiPage.Validate().ToogleLinkTextShow();
        wikiPage.Validate().ContentsListHidden();
    }
}
```

```csharp
public abstract class BasePageSingletonDerived<S, M> : ThreadSafeNestedContructorsBaseSingleton<S>
    where M : BasePageElementMap, new()
    where S : BasePageSingletonDerived<S, M>
{
    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string url = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url));
    }
}

public abstract class BasePageSingletonDerived<S, M, V> : BasePageSingletonDerived<S, M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
    where S : BasePageSingletonDerived<S, M, V>
{
    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class BasePage<M>
    where M : BasePageElementMap, new()
{
    protected readonly string url;

    public BasePage(string url)
    {
        this.url = url;
    }

    public BasePage()
    {
        this.url = null;
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string part = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url, part));
    }
}

public class BasePage<M, V> : BasePage<M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    public BasePage(string url) : base(url)
    {
    }

    public BasePage()
    {
    }

    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class WikipediaMainPage : BasePage<WikipediaMainPageMap, WikipediaMainPageValidator>, IWikipediaMainPage
{
    public WikipediaMainPage()
        : base(@"mySiteUrl")
    {
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.SearchBox.Click();
    }

    public void ToggleContents()
    {
        this.Map.ContentsToggleLink.Click();
    }
}
```

```csharp
public interface IWikipediaMainPage
{
    void Navigate(string part = "");

    WikipediaMainPageValidator Validate();

    void Search(string textToType);

    void ToggleContents();
}
```

```csharp
[TestClass]
public class UnityWikipediaTests
{
    private static IUnityContainer pageFactory = new UnityContainer();

    [AssemblyInitialize()]
    public static void MyTestInitialize(TestContext testContext)
    {
        pageFactory.RegisterType<IWikipediaMainPage, WikipediaMainPage>(new ContainerControlledLifetimeManager());
    }

    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void TestWikiContentsToggle_Unity()
    {
        var wikiPage = pageFactory.Resolve<IWikipediaMainPage>();
        wikiPage.Navigate();
        wikiPage.Search("Quality assurance");
        wikiPage.Validate().ToogleLinkTextHide();
        wikiPage.Validate().ContentsListVisible();
        wikiPage.ToggleContents();
        wikiPage.Validate().ToogleLinkTextShow();
        wikiPage.Validate().ContentsListHidden();
    }
}
```

```csharp
pageFactory.RegisterType<IWikipediaMainPage, WikipediaMainPage>(new ContainerControlledLifetimeManager());

```

```xml
<configuration>
  <configSections>
    <section name="unity" type="Microsoft.Practices.Unity.Configuration.UnityConfigurationSection, Microsoft.Practices.Unity.Configuration"/>
  </configSections>
  <unity xmlns="http://schemas.microsoft.com/practices/2010/unity">
    <container>
      <register type="PatternsInAutomation.Tests.Advanced.Unity.WikipediaMainPage.IWikipediaMainPage, PatternsInAutomation.Tests"
                mapTo="PatternsInAutomation.Tests.Advanced.Unity.WikipediaMainPage.WikipediaMainPage, PatternsInAutomation.Tests">
        <lifetime type="singleton"/>
      </register>
    </container>
  </unity>
</configuration>
```

```xml
<lifetime type="singleton"/>

```

```csharp
private static IUnityContainer pageFactory = new UnityContainer();

[AssemblyInitialize()]
public static void MyTestInitialize(TestContext testContext)
{
    var fileMap = new ExeConfigurationFileMap { ExeConfigFilename = "unity.config" };
    Configuration configuration = ConfigurationManager.OpenMappedExeConfiguration(fileMap, ConfigurationUserLevel.None);
    var unitySection = (UnityConfigurationSection)configuration.GetSection("unity");
    pageFactory.LoadConfiguration(unitySection);
}
```

```csharp
pageFactory.RegisterType<IWikipediaMainPage, WikipediaMainPage>(new ContainerControlledLifetimeManager());

```

```csharp
public static class PageFactory
{
    private static IUnityContainer container;

    static PageFactory()
    {
        var fileMap = new ExeConfigurationFileMap { ExeConfigFilename = "unity.config" };
        Configuration configuration = ConfigurationManager.OpenMappedExeConfiguration(fileMap, ConfigurationUserLevel.None);
        var unitySection = (UnityConfigurationSection)configuration.GetSection("unity");
        container = new UnityContainer();
        container.LoadConfiguration(unitySection);
    }

    public static T Get<T>()
    {
        return container.Resolve<T>();
    }
}
```

```csharp
[TestClass]
public class UnityWikipediaTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void TestWikiContentsToggle_Unity()
    {
        var wikiPage = PageFactory.Get<IWikipediaMainPage>();
        ////var wikiPage = pageFactory.Resolve<IWikipediaMainPage>();
        wikiPage.Navigate();
        wikiPage.Search("Quality assurance");
        wikiPage.Validate().ToogleLinkTextHide();
        wikiPage.Validate().ContentsListVisible();
        wikiPage.ToggleContents();
        wikiPage.Validate().ToogleLinkTextShow();
        wikiPage.Validate().ContentsListHidden();
    }
}
```

```csharp
public interface IPage<M, V>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    V Validate();

    void Navigate(string part = "");
}
```

```csharp
public interface IWikipediaMainPage<M, V> : IPage<M, V>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    void Search(string textToType);

    void ToggleContents();
}
```

## Fluent Page Object Pattern in Automated Testing

```csharp
[TestClass]
public class FluentSearchEngineTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void SearchForImageNotFuent()
    {
        P.SearchEngineMainPage searchEngineMainPage = new P.SearchEngineMainPage();
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("facebook");
        searchEngineMainPage.ClickImages();
        searchEngineMainPage.SetSize(Sizes.Large);
        searchEngineMainPage.SetColor(Colors.BlackWhite);
        searchEngineMainPage.SetTypes(Types.Clipart);
        searchEngineMainPage.SetPeople(People.All);
        searchEngineMainPage.SetDate(Dates.PastYear);
        searchEngineMainPage.SetLicense(Licenses.All);
    }
}
```

```csharp
public class SearchEngineMainPage :
BaseFluentPageSingleton<
    SearchEngineMainPage,
    SearchEngineMainPageElementMap,
    SearchEngineMainPageValidator>
{
    public SearchEngineMainPage Navigate(string url = "searchEngineUrl")
    {
        base.Navigate(url);
        return this;
    }

    public SearchEngineMainPage Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
        return this;
    }

    public SearchEngineMainPage ClickImages()
    {
        this.Map.ImagesLink.Click();
        return this;
    }

    public SearchEngineMainPage SetSize(Sizes size)
    {
        this.Map.Sizes.SelectByIndex((int)size);
        return this;
    }

    public SearchEngineMainPage SetColor(Colors color)
    {
        this.Map.Color.SelectByIndex((int)color);
        return this;
    }

    public SearchEngineMainPage SetTypes(Types type)
    {
        this.Map.Type.SelectByIndex((int)type);
        return this;
    }

    public SearchEngineMainPage SetLayout(Layouts layout)
    {
        this.Map.Layout.SelectByIndex((int)layout);
        return this;
    }

    public SearchEngineMainPage SetPeople(People people)
    {
        this.Map.People.SelectByIndex((int)people);
        return this;
    }

    public SearchEngineMainPage SetDate(Dates date)
    {
        this.Map.Date.SelectByIndex((int)date);
        return this;
    }

    public SearchEngineMainPage SetLicense(Licenses license)
    {
        this.Map.License.SelectByIndex((int)license);
        return this;
    }
}
```

```csharp
return this;

```

```csharp
public SelectElement Sizes
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Size']")));
    }
}

public SelectElement Color
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Color']")));
    }
}

public SelectElement Type
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Type']")));
    }
}

public SelectElement Layout
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Layout']")));
    }
}

public SelectElement People
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'People']")));
    }
}

public SelectElement Date
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Date']")));
    }
}

public SelectElement License
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'License']")));
    }
}
```

```csharp
public enum Dates
{
    All,
    Past24Hours,
    PastWeek,
    PastMonth,
    PastYear
}
```

```csharp
public SearchEngineMainPage SetDate(Dates date)
{
    this.Map.Date.SelectByIndex((int)date);
    return this;
}
```

```csharp
public class BasePageValidator<M>
    where M : BasePageElementMap, new()
{
    protected M Map
    {
        get
        {
            return new M();
        }
    }
}
```

```csharp
public class BasePageValidator<S, M, V>
    where S : BaseFluentPageSingleton<S, M, V>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<S, M, V>, new()
{
    protected S pageInstance;

    public BasePageValidator(S currentInstance)
    {
        this.pageInstance = currentInstance;
    }

    public BasePageValidator()
    {
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }
}
```

```csharp
public class BingMainPageValidator : BasePageValidator<BingMainPageElementMap>
{
    public void ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
public class SearchEngineMainPageValidator :
BasePageValidator<
    SearchEngineMainPage,
    SearchEngineMainPageElementMap,
    SearchEngineMainPageValidator>
{
    public SearchEngineMainPage ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount),
        "The results DIV doesn't contains the specified text.");
        return this.pageInstance;
    }
}
```

```csharp
public abstract class BaseFluentPageSingleton<S, M> : ThreadSafeNestedContructorsBaseSingleton<S>
    where M : BasePageElementMap, new()
    where S : BaseFluentPageSingleton<S, M>
{
    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string url = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url));
    }
}

public abstract class BaseFluentPageSingleton<S, M, V> : BaseFluentPageSingleton<S, M>
    where M : BasePageElementMap, new()
    where S : BaseFluentPageSingleton<S, M, V>
    where V : BasePageValidator<S, M, V>, new()
{
    public V Validate()
    {
        return new V();
    }
}
```

```csharp
[TestClass]
public class FluentSearchEngineTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void SearchForImageFuent()
    {
        P.SearchEngineMainPage.Instance
                            .Navigate()
                            .Search("automate")
                            .ClickImages()
                            .SetSize(Sizes.Large)
                            .SetColor(Colors.BlackWhite)
                            .SetTypes(Types.Clipart)
                            .SetPeople(People.All)
                            .SetDate(Dates.PastYear)
                            .SetLicense(Licenses.All);
    }
}
```

## Singleton Design Pattern in Automated Testing

```csharp
public class BasePage<M>
    where M : BasePageElementMap, new()
{
    private static BasePage<M> instance;

    protected readonly string url;

    public BasePage(string url)
    {
        this.url = url;
    }

    public BasePage()
    {
        this.url = null;
    }

    public static BasePage<M> Instance
    {
        get
        {
            if (instance == null)
            {
                instance = new BasePage<M>();
            }

            return instance;
        }
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string part = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url, part));
    }
}
```

```csharp
public abstract class Nonthread-safeBaseSingleton < T >
    where T: new()
    {
    private static T instance;

public static T Instance
{
    get
    {
        if (instance == null)
        {
            instance = new T();
        }

        return instance;
    }
}
}
```

```csharp
public abstract class Thread-safeBaseSingleton < T >
    where T : new()
    {
    private static T instance;
private static readonly object lockObject = new object();

private thread -safeBaseSingleton()
    {
}

public static T Instance
{
    get
    {
        if (instance == null)
        {
            lock (lockObject)
            {
                if (instance == null)
                {
                    instance = new T();
                }
            }
        }
        return instance;
    }
}
}
```

```csharp
public abstract class ThreadSafeLazyBaseSingleton<T>
    where T : new()
{
    private static readonly Lazy<T> lazy = new Lazy<T>(() => new T());

    public static T Instance
    {
        get
        {
            return lazy.Value;
        }
    }
}
```

```csharp
public abstract class ThreadSafeNestedContructorsBaseSingleton<T>
{
    public static T Instance
    {
        get
        {
            return SingletonFactory.Instance;
        }
    }

    internal static class SingletonFactory
    {
        internal static T Instance;

        static SingletonFactory()
        {
            CreateInstance(typeof(T));
        }

        public static T CreateInstance(Type type)
        {
            ConstructorInfo[] ctorsPublic = type.GetConstructors(BindingFlags.Instance | BindingFlags.Public);

            if (ctorsPublic.Length > 0)
            {
                throw new Exception(string.Concat(type.FullName, " has one or more public constructors so the property cannot be enforced."));
            }


            ConstructorInfo nonPublicConstructor =
                type.GetConstructor(BindingFlags.Instance | BindingFlags.NonPublic, null, new Type[0], new ParameterModifier[0]);

            if (nonPublicConstructor == null)
            {
                throw new Exception(string.Concat(type.FullName, " does not have a private/protected constructor so the property cannot be enforced."));
            }

            try
            {
                return Instance = (T)nonPublicConstructor.Invoke(new object[0]);
            }
            catch (Exception e)
            {
                throw new Exception(
                    string.Concat("The Singleton could not be constructed. Check if ", type.FullName, " has a default constructor."), e);
            }
        }
    }
}
```

```csharp
public abstract class BasePageSingletonDerived<S, M> : thread-safeNestedContructorsBaseSingleton<S>
    where M : BasePageElementMap, new()
    where S : BasePageSingletonDerived<S, M>
{
    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string url = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url));
    }
}

public abstract class BasePageSingletonDerived<S, M, V> : BasePageSingletonDerived<S, M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
    where S : BasePageSingletonDerived<S, M, V>
{
    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class SearchEngineMainPage :
BasePageSingletonDerived<
    SearchEngineMainPage,
    SearchEngineMainPageElementMap,
    SearchEngineMainPageValidator>
{
    private SearchEngineMainPage() { }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }

    public override void Navigate(string url = "searchEngineUrl")
    {
        base.Navigate(url);
    }
}
```

```csharp
[TestClass]
public class AdvancedSearchEngineSingletonTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void SearchTextInSearchEngine_Advanced_PageObjectPattern_NoSingleton()
    {
        // Usage without Singleton
        P.SearchEngineMainPage searchEngineMainPage = new P.SearchEngineMainPage();
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.Validate().ResultsCount(",000 RESULTS");
    }

    [TestMethod]
    public void SearchTextInSearchEngine_Advanced_PageObjectPattern_Singleton()
    {
        S.SearchEngineMainPage.Instance.Navigate();
        S.SearchEngineMainPage.Instance.Search("Automate The Planet");
        S.SearchEngineMainPage.Instance.Validate().ResultsCount(",000 RESULTS");
    }
}
```

## Facade Design Pattern in Automated Testing

```csharp
public class ShippingAddressPage : BasePage<ShippingAddressPageMap, ShippingAddressPageValidator>
{
    public void ClickContinueButton()
    {
        this.Map.ContinueButton.Click();
    }

    public void FillShippingInfo(ClientInfo clientInfo)
    {
        this.Map.SwitchToShippingFrame();
        this.Map.CountryDropDown.SelectByText(clientInfo.Country);
        this.Map.FirstName.SendKeys(clientInfo.FirstName);
        this.Map.LastName.SendKeys(clientInfo.LastName);
        this.Map.Address1.SendKeys(clientInfo.Address1);
        this.Map.City.SendKeys(clientInfo.City);
        this.Map.Zip.SendKeys(clientInfo.Zip);
        this.Map.Phone.SendKeys(clientInfo.Phone);
        this.Map.Email.SendKeys(clientInfo.Email);
        this.Map.SwitchToDefault();
    }
}
```

```csharp
public class ClientInfo
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Country { get; set; }
    public string Address1 { get; set; }
    public string City { get; set; }
    public string Phone { get; set; }
    public string Zip { get; set; }
    public string Email { get; set; }
}
```

```csharp
public class ShippingAddressPageMap : BasePageElementMap
{
    public SelectElement CountryDropDown
    {
        get
        {
            this.browserWait.Until<IWebElement>((d) => { return d.FindElement(By.Name("country")); });
            return new SelectElement(this.browser.FindElement(By.Name("country")));
        }
    }

    public IWebElement FirstName
    {
        get
        {
            return this.browser.FindElement(By.Id("firstName"));
        }
    }

    public IWebElement LastName
    {
        get
        {
            return this.browser.FindElement(By.Id("lastName"));
        }
    }

    public IWebElement Address1
    {
        get
        {
            return this.browser.FindElement(By.Id("address1"));
        }
    }

    public IWebElement City
    {
        get
        {
            return this.browser.FindElement(By.Id("city"));
        }
    }

    public IWebElement Zip
    {
        get
        {
            return this.browser.FindElement(By.Id("zip"));
        }
    }

    public IWebElement Phone
    {
        get
        {
            return this.browser.FindElement(By.Id("dayphone1"));
        }
    }

    public IWebElement Email
    {
        get
        {
            return this.browser.FindElement(By.Id("email"));
        }
    }

    public IWebElement Subtotal
    {
        get
        {
            return this.browser.FindElement(By.Id("xo_tot_amt"));
        }
    }

    public IWebElement ContinueButton
    {
        get
        {
            return this.browser.FindElement(By.Id("but_address_continue"));
        }
    }

    public void SwitchToShippingFrame()
    {
        this.WaitForLogo();
        this.browser.SwitchTo().Frame("shpFrame");
    }

    private void WaitForLogo()
    {
        this.browserWait.Until<IWebElement>((d) => { return d.FindElement(By.Id("gh-logo")); });
    }
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_Without_PurchaseFaceade_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_Casio_GShock()
    {
        string itemUrl = "watchItemUrl";
        string itemPrice = "AU $168.00";
        ClientInfo currentClientInfo = new ClientInfo()
        {
            FirstName = "Anton",
            LastName = "Angelov",
            Country = "Bulgaria",
            Address1 = "33 Alexander Malinov Blvd.",
            City = "Sofia",
            Zip = "1729",
            Phone = "0035964644885",
            Email = "aangelov@yahoo.com"
        };
        ItemPage itemPage = new ItemPage();
        CheckoutPage checkoutPage = new CheckoutPage();
        ShippingAddressPage shippingAddressPage = new ShippingAddressPage();
        SignInPage signInPage = new SignInPage();

        itemPage.Navigate(itemUrl);
        itemPage.Validate().Price(itemPrice);
        itemPage.ClickBuyNowButton();
        signInPage.ClickContinueAsGuestButton();
        shippingAddressPage.FillShippingInfo(currentClientInfo);
        shippingAddressPage.Validate().Subtotal(itemPrice);
        shippingAddressPage.ClickContinueButton();
        checkoutPage.Validate().Subtotal(itemPrice);
    }

    [TestMethod]
    public void Purchase_WhiteOpticalKeyboard()
    {
        string itemUrl = "watchItemUrl";
        string itemPrice = "C $20.86";
        ClientInfo currentClientInfo = new ClientInfo()
        {
            FirstName = "Anton",
            LastName = "Angelov",
            Country = "Bulgaria",
            Address1 = "33 Alexander Malinov Blvd.",
            City = "Stara Zagora",
            Zip = "6000",
            Phone = "0035964644885",
            Email = "aangelov@yahoo.com"
        };
        ItemPage itemPage = new ItemPage();
        CheckoutPage checkoutPage = new CheckoutPage();
        ShippingAddressPage shippingAddressPage = new ShippingAddressPage();
        SignInPage signInPage = new SignInPage();

        itemPage.Navigate(itemUrl);
        itemPage.Validate().Price(itemPrice);
        itemPage.ClickBuyNowButton();
        signInPage.ClickContinueAsGuestButton();
        shippingAddressPage.FillShippingInfo(currentClientInfo);
        shippingAddressPage.Validate().Subtotal(itemPrice);
        shippingAddressPage.ClickContinueButton();
        checkoutPage.Validate().Subtotal(itemPrice);
    }
}
```

```csharp
public class PurchaseFacade
{
    private ItemPage itemPage;
    private CheckoutPage checkoutPage;
    private ShippingAddressPage shippingAddressPage;
    private SignInPage signInPage;

    public ItemPage ItemPage
    {
        get
        {
            if (itemPage == null)
            {
                itemPage = new ItemPage();
            }
            return itemPage;
        }
    }

    public SignInPage SignInPage
    {
        get
        {
            if (signInPage == null)
            {
                signInPage = new SignInPage();
            }
            return signInPage;
        }
    }

    public CheckoutPage CheckoutPage
    {
        get
        {
            if (checkoutPage == null)
            {
                checkoutPage = new CheckoutPage();
            }
            return checkoutPage;
        }
    }

    public ShippingAddressPage ShippingAddressPage
    {
        get
        {
            if (shippingAddressPage == null)
            {
                shippingAddressPage = new ShippingAddressPage();
            }
            return shippingAddressPage;
        }
    }

    public void PurchaseItem(string item, string itemPrice, ClientInfo clientInfo)
    {
        this.ItemPage.Navigate(item);
        this.ItemPage.Validate().Price(itemPrice);
        this.ItemPage.ClickBuyNowButton();
        this.SignInPage.ClickContinueAsGuestButton();
        this.ShippingAddressPage.FillShippingInfo(clientInfo);
        this.ShippingAddressPage.Validate().Subtotal(itemPrice);
        this.ShippingAddressPage.ClickContinueButton();
        this.CheckoutPage.Validate().Subtotal(itemPrice);
    }
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_PurchaseFaceade_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_Casio_GShock()
    {
        string itemUrl = "watchItemUrl";
        string itemPrice = "AU $168.00";
        ClientInfo currentClientInfo = new ClientInfo()
        {
            FirstName = "Anton",
            LastName = "Angelov",
            Country = "Bulgaria",
            Address1 = "33 Alexander Malinov Blvd.",
            City = "Sofia",
            Zip = "1729",
            Phone = "0035964644885",
            Email = "aangelov@yahoo.com"
        };
        new PurchaseFacade().PurchaseItem(itemUrl, itemPrice, currentClientInfo);
    }

    [TestMethod]
    public void Purchase_WhiteOpticalKeyboard()
    {
        string itemUrl = "watchItemUrl";
        string itemPrice = "C $20.86";
        ClientInfo currentClientInfo = new ClientInfo()
        {
            FirstName = "Anton",
            LastName = "Angelov",
            Country = "Bulgaria",
            Address1 = "33 Alexander Malinov Blvd.",
            City = "Stara Zagora",
            Zip = "6000",
            Phone = "0035964644885",
            Email = "aangelov@yahoo.com"
        };
        new PurchaseFacade().PurchaseItem(itemUrl, itemPrice, currentClientInfo);
    }
}
```

## Advanced Page Object Pattern in Automated Testing

```csharp
public static class Driver
{
    private static WebDriverWait browserWait;

    private static IWebDriver browser;

    public static IWebDriver Browser
    {
        get
        {
            if (browser == null)
            {
                throw new NullReferenceException("The WebDriver browser instance was not initialized. You should first call the method Start.");
            }
            return browser;
        }
        private set
        {
            browser = value;
        }
    }

    public static WebDriverWait BrowserWait
    {
        get
        {
            if (browserWait == null || browser == null)
            {
                throw new NullReferenceException("The WebDriver browser wait instance was not initialized. You should first call the method Start.");
            }
            return browserWait;
        }
        private set
        {
            browserWait = value;
        }
    }

    public static void StartBrowser(BrowserTypes browserType = BrowserTypes.Firefox, int defaultTimeOut = 30)
    {
        switch (browserType)
        {
            case BrowserTypes.Firefox:
                Driver.Browser = new FirefoxDriver();

                break;
            case BrowserTypes.InternetExplorer:
                break;
            case BrowserTypes.Chrome:
                break;
            default:
                break;
        }
        BrowserWait = new WebDriverWait(Driver.Browser, TimeSpan.FromSeconds(defaultTimeOut));
    }

    public static void StopBrowser()
    {
        Browser.Quit();
        Browser = null;
        BrowserWait = null;
    }
}
```

```csharp
public class SearchEngineMainPageElementMap
{
    private readonly IWebDriver browser;

    public SearchEngineMainPageElementMap(IWebDriver browser)
    {
        this.browser = browser;
    }

    public IWebElement SearchBox
    {
        get
        {
            return this.browser.FindElement(By.Id("sb_form_q"));
        }
    }
}
```

```csharp
public class BasePageElementMap
{
    protected IWebDriver browser;

    public BasePageElementMap()
    {
        this.browser = Driver.Browser;
    }
}
```

```csharp
public class SearchEngineMainPageElementMap : BasePageElementMap
{
    public IWebElement SearchBox
    {
        get
        {
            return this.browser.FindElement(By.Id("sb_form_q"));
        }
    }
}
```

```csharp
public class SearchEngineMainPageValidator
{
    private readonly IWebDriver browser;

    public SearchEngineMainPageValidator(IWebDriver browser)
    {
        this.browser = browser;
    }

    protected SearchEngineMainPageElementMap Map
    {
        get
        {
            return new SearchEngineMainPageElementMap(this.browser);
        }
    }

    public void ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver browser;
    private readonly string url = @"searchEngineUrl";

    public SearchEngineMainPage(IWebDriver browser)
    {
        this.browser = browser;
    }

    protected SearchEngineMainPageElementMap Map
    {
        get
        {
            return new SearchEngineMainPageElementMap(this.browser);
        }
    }

    public SearchEngineMainPageValidator Validate()
    {
        return new SearchEngineMainPageValidator(this.browser);
    }

    public void Navigate()
    {
        this.browser.Navigate().GoToUrl(this.url);
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }
}
```

```csharp
public class BasePage<M>
       where M : BasePageElementMap, new()
{
    protected readonly string url;

    public BasePage(string url)
    {
        this.url = url;
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public void Navigate()
    {
        Driver.Browser.Navigate().GoToUrl(this.url);
    }
}

public class BasePage<M, V> : BasePage<M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    public BasePage(string url)
        : base(url)
    {
    }

    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class SearchEngineMainPage :
    BasePage<SearchEngineMainPageElementMap, SearchEngineMainPageValidator>
{
    public SearchEngineMainPage()
        : base(@"searchEngineUrl")
    {
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }
}
```

```csharp
[TestClass]
public class AdvancedSearchEngineTests
{

    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void SearchTextInSearchEngine_Advanced_PageObjectPattern()
    {
        SearchEngineMainPage searchEngineMainPage = new SearchEngineMainPage();
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.Validate().ResultsCount(",000 RESULTS");
    }
}
```

## Page Object Pattern in Automated Testing

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"searchEngineUrl";

    public SearchEngineMainPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }

    [FindsBy(How = How.Id, Using = "sb_form_q")]
    public IWebElement SearchBox { get; set; }

    [FindsBy(How = How.Id, Using = "sb_form_go")]
    public IWebElement GoButton { get; set; }

    [FindsBy(How = How.Id, Using = "b_tween")]
    public IWebElement ResultsCountDiv { get; set; }

    public void Navigate()
    {
        this.driver.Navigate().GoToUrl(this.url);
    }

    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }

    public void ValidateResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
[FindsBy(How = How.Id, Using = "sb_form_q")]
public IWebElement SearchBox { get; set; }
```

```csharp
public SearchEngineMainPage(IWebDriver browser)
{
    this.driver = browser;
    PageFactory.InitElements(browser, this);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    public IWebDriver Driver { get; set; }
    public WebDriverWait Wait { get; set; }

    [TestInitialize]
    public void SetupTest()
    {
        this.Driver = new FirefoxDriver();
        this.Wait = new WebDriverWait(this.Driver, TimeSpan.FromSeconds(30));
    }

    [TestCleanup]
    public void TeardownTest()
    {
        this.Driver.Quit();
    }

    [TestMethod]
    public void SearchTextInSearchEngine_First()
    {
        SearchEngineMainPage searchEngineMainPage = new SearchEngineMainPage(this.Driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.ValidateResultsCount("264,000 RESULTS");
    }
}
```

```csharp
public class SearchEngineMainPageElementMap
{
    private readonly IWebDriver browser;

    public SearchEngineMainPageElementMap(IWebDriver browser)
    {
        this.browser = browser;
    }

    public IWebElement SearchBox
    {
        get
        {
            return this.browser.FindElement(By.Id("sb_form_q"));
        }
    }

    public IWebElement GoButton
    {
        get
        {
            return this.browser.FindElement(By.Id("sb_form_go"));
        }
    }

    public IWebElement ResultsCountDiv
    {
        get
        {
            return this.browser.FindElement(By.Id("b_tween"));
        }
    }
}
```

```csharp
public class SearchEngineMainPageValidator
{
    private readonly IWebDriver browser;

    public SearchEngineMainPageValidator(IWebDriver browser)
    {
        this.browser = browser;
    }

    protected SearchEngineMainPageElementMap Map
    {
        get
        {
            return new SearchEngineMainPageElementMap(this.browser);
        }
    }

    public void ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver browser;
    private readonly string url = @"searchEngineUrl";

    public SearchEngineMainPage(IWebDriver browser)
    {
        this.browser = browser;
    }

    protected SearchEngineMainPageElementMap Map
    {
        get
        {
            return new SearchEngineMainPageElementMap(this.browser);
        }
    }

    public SearchEngineMainPageValidator Validate()
    {
        return new SearchEngineMainPageValidator(this.browser);
    }

    public void Navigate()
    {
        this.browser.Navigate().GoToUrl(this.url);
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    public IWebDriver Driver { get; set; }
    public WebDriverWait Wait { get; set; }

    [TestInitialize]
    public void SetupTest()
    {
        this.Driver = new FirefoxDriver();
        this.Wait = new WebDriverWait(this.Driver, TimeSpan.FromSeconds(30));
    }

    [TestCleanup]
    public void TeardownTest()
    {
        this.Driver.Quit();
    }

    [TestMethod]
    public void SearchTextInSearchEngine_Second()
    {
        POP.SearchEngineMainPage searchEngineMainPage = new POP.SearchEngineMainPage(this.Driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.Validate().ResultsCount("264,000 RESULTS");
    }
}
```

# Mobile Automation

## Getting Started with Appium for Android C# on Windows in 10 Minutes

```csharp
private static AndroidDriver<AppiumWebElement> _driver;
private static AppiumLocalService _appiumLocalService;
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    _appiumLocalService = new AppiumServiceBuilder().UsingAnyFreePort().Build();
    _appiumLocalService.Start();
    var appiumOptions = new AppiumOptions();
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "Android_Accelerated_x86_Oreo");
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "7.1");
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.BrowserName, "Chrome");
    _driver = new AndroidDriver<AppiumWebElement>(_appiumLocalService, appiumOptions);
    _driver.CloseApp();
}
[TestInitialize]
public void TestInitialize()
{
    _driver?.LaunchApp();
}
[TestCleanup]
public void TestCleanup()
{
    _driver?.CloseApp();
}
[ClassCleanup]
public static void ClassCleanup()
{
    _appiumLocalService.Dispose();
}
```

```csharp
_appiumLocalService = new AppiumServiceBuilder().UsingAnyFreePort().Build();
_appiumLocalService.Start();
```

```csharp
string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "ApiDemos-debug.apk");
```

```csharp
_appiumLocalService = new AppiumServiceBuilder().UsingAnyFreePort().Build();
_appiumLocalService.Start();
var appiumOptions = new AppiumOptions();
appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "Android_Accelerated_x86_Oreo");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "7.1");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.BrowserName, "Chrome");
_driver = new AndroidDriver<AppiumWebElement>(_appiumLocalService, appiumOptions);
```

```csharp
AndroidElement button = _driver.FindElementById("button");

```

```csharp
AndroidElement checkBox = _driver.FindElementByClassName("android.widget.CheckBox");

```

```csharp
AndroidElement thirdButton = _driver.FindElementByXPath("//*[@resource-id='com.example.android.apis:id/button']");

```

```csharp
AndroidElement secondButton = _driver.FindElementByAndroidUIAutomator("new UiSelector().textContains("BUTTO");");

```

```csharp
[TestMethod]
public void LocatingElementInsideAnotherElementTest()
{
    var mainElement = _driver.FindElementById("decor_content_parent");
    var button = mainElement.FindElementById("button");
    button.Click();
    var checkBox = mainElement.FindElementByClassName("android.widget.CheckBox");
    checkBox.Click();
    var thirdButton = mainElement.FindElementByXPath("//*[@resource-id='com.example.android.apis:id/button']");
    thirdButton.Click();
}
```

```csharp
[TestMethod]
public void SwipeTest()
{
    _driver.StartActivity("io.appium.android.apis", ".graphics.FingerPaint");
    var element = _driver.FindElementById("android:id/content");
    Point point = element.Coordinates.LocationInDom;
    Size size = element.Size;
    new TouchAction(_driver)
    .Press(point.X + 5, point.Y + 5)
    .Wait(200)
    .MoveTo(point.X + size.Width - 5, point.Y + size.Height - 5)
    .Release()
    .Perform();
}
```

## Getting Started with Appium for iOS C# in 10 Minutes

```csharp
private static IOSDriver<IOSElement> _driver;
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "TestApp.app.zip");
    var appiumOptions = new AppiumOptions();
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "iPhone 6");
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "iOS");
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "11.3");
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.App, testAppPath);
    _driver = new IOSDriver<IOSElement>(new Uri("http://127.0.0.1:4723/wd/hub"), appiumOptions);
    _driver.CloseApp();
}
[TestInitialize]
public void TestInitialize()
{
    _driver?.LaunchApp();
}
[TestCleanup]
public void TestCleanup()
{
    _driver?.CloseApp();
}
```

```csharp
var args = new OptionCollector().AddArguments(GeneralOptionList.PreLaunch());
_appiumLocalService = new AppiumServiceBuilder().UsingAnyFreePort().Build();
_appiumLocalService.Start();
```

```csharp
string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "TestApp.app.zip");
```

```csharp
string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "TestApp.app.zip");
var appiumOptions = new AppiumOptions();
appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "iPhone 6");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "iOS");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "11.3");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.App, testAppPath);
_driver = new IOSDriver<IOSElement>(new Uri("http://127.0.0.1:4723/wd/hub"), appiumOptions);
```

```csharp
IOSElement textField = _driver.FindElementById("IntegerA");
```

```csharp
IOSElement textField = _driver.FindElementByClass("XCUIElementTypeTextField");

```

```csharp
IOSElement textField = _driver.FindElementByName("IntegerA");

```

```csharp
IOSElement button = _driver.FindElementByXPath("//XCUIElementTypeButton[@name="ComputeSumButton"]");

```

```csharp
IOSElement button = _driver.FindElementByIOSNsPredicate("type == "XCUIElementTypeButton" AND name == "ComputeSumButton"");

```

```csharp
[TestMethod]
public void AddTwoNumbersTest()
{
    IOSElement numberOne = _driver.FindElementById("IntegerA");
    var numberTwo = _driver.FindElementById("IntegerB");
    var compute = _driver.FindElementByName("ComputeSumButton");
    var answer = _driver.FindElementByName("Answer");
    numberOne.Clear();
    numberOne.SetImmediateValue("5");
    numberTwo.Clear();
    numberTwo.SetImmediateValue("6");
    compute.Click();
    Assert.AreEqual("11", answer.GetAttribute("value"));
}
```

```csharp
[TestMethod]
public void LocatingElementInsideAnotherElementTest()
{
    var mainElement = _driver.FindElementByIosNsPredicate("type == "XCUIElementTypeApplication" AND name == "TestApp"");
    var numberOne = mainElement.FindElementById("IntegerA");
    var numberTwo = mainElement.FindElementById("IntegerB");
    var compute = mainElement.FindElementByName("ComputeSumButton");
    var answer = mainElement.FindElementByName("Answer");
    numberOne.Clear();
    numberOne.SetImmediateValue("5");
    numberTwo.Clear();
    numberTwo.SetImmediateValue("6");
    compute.Click();
    Assert.AreEqual("11", answer.GetAttribute("value"));
}
```

```csharp
[TestMethod]
public void SwipeTest()
{
    ITouchAction touchAction = new TouchAction(_driver);
    var element = _driver.FindElementById("IntegerA");
    Point point = element.Coordinates.LocationInDom;
    Size size = element.Size;
    touchAction
    .Press(point.X + 5, point.Y + 5)
    .Wait(200).MoveTo(point.X + size.Width - 5, point.Y + size.Height - 5)
    .Release()
    .Perform();
}
```

```csharp
[TestMethod]
public void MoveToTest()
{
    ITouchAction touchAction = new TouchAction(_driver);
    var element = _driver.FindElementById("IntegerA");
    Point point = element.Coordinates.LocationInDom;
    touchAction.MoveTo(point.X, point.Y).Perform();
}
```

```csharp
[TestMethod]
public void TapTest()
{
    ITouchAction touchAction = new TouchAction(_driver);
    var element = _driver.FindElementById("IntegerA");
    Point point = element.Coordinates.LocationInDom;
    touchAction.Tap(point.X, point.Y, 2).Perform();
}
```

## Getting Started with Appium for Android C# on Mac in 10 Minutes

```csharp
private static AndroidDriver<AndroidElement> _driver;
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "ApiDemos-debug.apk");
    var desiredCaps = new AppiumOptions();
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.DeviceName, "Android_Accelerated_x86_Oreo");
    desiredCaps.AddAdditionalCapability(AndroidMobileCapabilityType.AppPackage, "io.appium.android.apis");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "7.1");
    desiredCaps.AddAdditionalCapability(AndroidMobileCapabilityType.AppActivity, ".ApiDemos");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.App, testAppPath);
    _driver = new AndroidDriver<AndroidElement>(new Uri("http://127.0.0.1:4723/wd/hub"), desiredCaps);
    _driver.CloseApp();
}
[TestInitialize]
public void TestInitialize()
{
    if (_driver != null)
    {
        _driver.LaunchApp();
        _driver.StartActivity("io.appium.android.apis", ".ApiDemos");
    }
}
[TestCleanup]
public void TestCleanup()
{
    _driver?.CloseApp();
}
private static AndroidDriver<AndroidElement> _driver;
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "ApiDemos-debug.apk");
    var desiredCaps = new AppiumOptions();
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.DeviceName, "Android_Accelerated_x86_Oreo");
    desiredCaps.AddAdditionalCapability(AndroidMobileCapabilityType.AppPackage, "io.appium.android.apis");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "7.1");
    desiredCaps.AddAdditionalCapability(AndroidMobileCapabilityType.AppActivity, ".ApiDemos");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.App, testAppPath);
    _driver = new AndroidDriver<AndroidElement>(new Uri("http://127.0.0.1:4723/wd/hub"), desiredCaps);
    _driver.CloseApp();
}
[TestInitialize]
public void TestInitialize()
{
    if (_driver != null)
    {
        _driver.LaunchApp();
        _driver.StartActivity("io.appium.android.apis", ".ApiDemos");
    }
}
[TestCleanup]
public void TestCleanup()
{
    _driver?.CloseApp();
}
```

```csharp
var args = new OptionCollector().AddArguments(GeneralOptionList.PreLaunch());
_appiumLocalService = new AppiumServiceBuilder().UsingAnyFreePort().Build();
_appiumLocalService.Start();
```

```csharp
string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "ApiDemos-debug.apk");
```

```csharp
string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "ApiDemos-debug.apk");
var appiumOptions = new AppiumOptions();
appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "Android_Accelerated_x86_Oreo");
appiumOptions.AddAdditionalCapability(AndroidMobileCapabilityType.AppPackage, "io.appium.android.apis");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "7.1");
appiumOptions.AddAdditionalCapability(AndroidMobileCapabilityType.AppActivity, ".ApiDemos");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.App, testAppPath);
```

```csharp
AndroidElement button = _driver.FindElementById("button");
```

```csharp
AndroidElement checkBox = _driver.FindElementByClassName("android.widget.CheckBox");

```

```csharp
AndroidElement thirdButton = _driver.FindElementByXPath("//*[@resource-id='com.example.android.apis:id/button']");

```

```csharp
AndroidElement secondButton = _driver.FindElementByAndroidUIAutomator("new UiSelector().textContains("BUTTO");");

```

```csharp
[TestMethod]
public void LocatingElementsTest()
{
    AndroidElement button = _driver.FindElementById("button");
    button.Click();
    AndroidElement checkBox = _driver.FindElementByClassName("android.widget.CheckBox");
    checkBox.Click();
    AndroidElement secondButton = _driver.FindElementByAndroidUIAutomator("new UiSelector().textContains("BUTTO");");
    secondButton.Click();
    AndroidElement thirdButton = _driver.FindElementByXPath("//*[@resource-id='com.example.android.apis:id/button']");
    thirdButton.Click();
}
```

```csharp
[TestMethod]
public void LocatingElementInsideAnotherElementTest()
{
    var mainElement = _driver.FindElementById("decor_content_parent");
    var button = mainElement.FindElementById("button");
    button.Click();
    var checkBox = mainElement.FindElementByClassName("android.widget.CheckBox");
    checkBox.Click();
    var thirdButton = mainElement.FindElementByXPath("//*[@resource-id='com.example.android.apis:id/button']");
    thirdButton.Click();
}
```

```csharp
[TestMethod]
public void SwipeTest()
{
    _driver.StartActivity("io.appium.android.apis", ".graphics.FingerPaint");
    ITouchAction touchAction = new TouchAction(_driver);
    var element = _driver.FindElementById("android:id/content");
    Point point = element.Coordinates.LocationInDom;
    Size size = element.Size;
    touchAction
    .Press(point.X + 5, point.Y + 5)
    .Wait(200).MoveTo(point.X + size.Width - 5, point.Y + size.Height - 5)
    .Release()
    .Perform();
}
```

```csharp
[TestMethod]
public void MoveToTest()
{
    ITouchAction touchAction = new TouchAction(_driver);
    var element = _driver.FindElementById("android:id/content");
    Point point = element.Coordinates.LocationInDom;
    touchAction.MoveTo(point.X, point.Y).Perform();
}
```

```csharp
[TestMethod]
public void TapTest()
{
    ITouchAction touchAction = new TouchAction(_driver);
    var element = _driver.FindElementById("android:id/content");
    Point point = element.Coordinates.LocationInDom;
    touchAction.Tap(point.X, point.Y, 2).Perform();
}
```

## Develop ADB Shell Commands Library Appium C#

```csharp
[TestClass]
public class AppiumTests
{
    private static AndroidDriver<AndroidElement> _driver;
    private static AppiumLocalService _appiumLocalService;
    [ClassInitialize]
    public static void ClassInitialize(TestContext context)
    {
        var args = new OptionCollector()
        .AddArguments(GeneralOptionList.PreLaunch())
        .AddArguments(new KeyValuePair<string, string>("--relaxed-security", string.Empty));
        _appiumLocalService = new AppiumServiceBuilder().WithArguments(args).UsingAnyFreePort().Build();
        _appiumLocalService.Start();
        string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "ApiDemos-debug.apk");
        var appiumOptions = new AppiumOptions();
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.AutomationName, "UiAutomator2");
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "android25-test");
        appiumOptions.AddAdditionalCapability(AndroidMobileCapabilityType.AppPackage, "com.example.android.apis");
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "7.1");
        appiumOptions.AddAdditionalCapability(AndroidMobileCapabilityType.AppActivity, ".ApiDemos");
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.App, testAppPath);
        _driver = new AndroidDriver<AndroidElement>(_appiumLocalService, appiumOptions);
        _driver.CloseApp();
    }
    [TestInitialize]
    public void TestInitialize()
    {
        _driver?.LaunchApp();
        _driver?.StartActivity("com.example.android.apis", ".ApiDemos");
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver?.CloseApp();
    }
    [ClassCleanup]
    public static void ClassCleanup()
    {
        _appiumLocalService.Dispose();
    }
    // tests...
}
```

```csharp
var args = new OptionCollector()
.AddArguments(GeneralOptionList.PreLaunch())
.AddArguments(new KeyValuePair<string, string>("--relaxed-security", string.Empty));
_appiumLocalService = new AppiumServiceBuilder().WithArguments(args).UsingAnyFreePort().Build();
_appiumLocalService.Start();
```

```csharp
[TestMethod]
public void PerformRandomShellCommandAsJson()
{
    string result = _driver.ExecuteScript("mobile: shell", "{"command": "dumpsys", "args": ["battery", "reset"]}").ToString();
    Debug.WriteLine(result);
}
```

```csharp
public class AdbCommand
{
    public AdbCommand(string command)
    {
        Command = command;
        Args = new List<string>();
    }
    public AdbCommand(string command, params string[] args)
    {
        Command = command;
        Args = new List<string>(args);
    }
    [JsonProperty("command")]
    public string Command { get; set; }
    [JsonProperty("args")]
    public List<string> Args { get; set; }
    public override string ToString()
    {
        return JsonConvert.SerializeObject(this);
    }
}
```

```csharp
[TestMethod]
public void PerformRandomShellCommand()
{
    string result = _driver.ExecuteScript("mobile: shell", new AdbCommand("dumpsys", "battery", "reset").ToString()).ToString();
    Debug.WriteLine(result);
}
```

```csharp
public static class AppiumDriverAbdExtensionMethods
{
    public static string GetLogs(this AndroidDriver<AndroidElement> androidDriver)
    {
        return ExecuteShellAdbCommand(androidDriver, "logcat"); ;
    }
    public static void ChangeBatteryLevel(this AndroidDriver<AndroidElement> androidDriver, int level)
    {
        ExecuteShellAdbCommand(androidDriver, $"dumpsys battery set level {level}");
    }
    public static void ChangeBatteryReset(this AndroidDriver<AndroidElement> androidDriver)
    {
        ExecuteShellAdbCommand(androidDriver, "adb shell dumpsys battery reset");
    }
    public static string GetBatteryStatus(this AndroidDriver<AndroidElement> androidDriver)
    {
        return ExecuteShellAdbCommand(androidDriver, "adb shell dumpsys battery"); ;
    }
    private static string ExecuteShellAdbCommand(AndroidDriver<AndroidElement> androidDriver, string command, params string[] args)
    {
        return androidDriver.ExecuteScript("mobile: shell", new AdbCommand(command, args).ToString()).ToString();
    }
}
```

```csharp
[TestMethod]
public void PerformShellCommandViaExtensionMethod()
{
    _driver.ResetBattery();
}
```

## Execute Android Appium Tests in Docker Containers Using Selenoid

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

```xml
<ItemGroup>
    <PackageReference Include="Appium.WebDriver" Version="4.1.1" />
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.6.1" />
    <PackageReference Include="MSTest.TestAdapter" Version="2.1.2" />
    <PackageReference Include="MSTest.TestFramework" Version="2.1.2" />
</ItemGroup>
```

```csharp
private static AndroidDriver<AndroidElement> _driver;
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    var appiumOptions = new AppiumOptions();
    appiumOptions.AddAdditionalCapability("deviceName", "android");
    appiumOptions.AddAdditionalCapability("appPackage", "io.appium.android.apis");
    appiumOptions.AddAdditionalCapability("version", "6.0");
    appiumOptions.AddAdditionalCapability("appActivity", ".ApiDemos");
    appiumOptions.AddAdditionalCapability("app", "https://exampleFileshare.com/ApiDemos-debug.apk"); // upload ApiDemos-debug.apk from Resources folder to public file share.
    appiumOptions.AddAdditionalCapability("enableVNC", true);
    appiumOptions.AddAdditionalCapability("enableVideo", true);
    var timeout = TimeSpan.FromSeconds(120);
    // Change with your Selenoid hub instance URL.
    _driver = new AndroidDriver<AndroidElement>(new Uri("http://127.0.0.1:4444/wd/hub"), appiumOptions, timeout);
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
public void PerformActionsButtons()
{
    By byScrollLocator = new ByAndroidUIAutomator("new UiSelector().text("Views");");
    var viewsButton = _driver.FindElement(byScrollLocator);
    viewsButton.Click();
    var controlsViewButton = _driver.FindElementByXPath("//*[@text='Controls']");
    controlsViewButton.Click();
    var lightThemeButton = _driver.FindElementByXPath("//*[@text='1. Light Theme']");
    lightThemeButton.Click();
    var saveButton = _driver.FindElementByXPath("//*[@text='Save']");
    Assert.IsTrue(saveButton.Enabled);
}
```

```csharp
private static AndroidDriver<AndroidElement> _driver;
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    var appiumOptions = new AppiumOptions();
    appiumOptions.AddAdditionalCapability(MobileCapabilityType.BrowserName, "chrome");
    appiumOptions.AddAdditionalCapability("version", "mobile-79.0");
    appiumOptions.AddAdditionalCapability("enableVNC", true);
    appiumOptions.AddAdditionalCapability("enableVideo", true);
    appiumOptions.AddAdditionalCapability("desired-skin", "WSVGA");
    appiumOptions.AddAdditionalCapability("desired-screen-resolution", "1024x600");
    var timeout = TimeSpan.FromSeconds(120);
    _driver = new AndroidDriver<AndroidElement>(new Uri("http://127.0.0.1:4444/wd/hub"), appiumOptions, timeout);
    _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(120);
    _driver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(120);
}
[TestCleanup]
public void TestCleanup()
{
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

## Execute Appium Tests in the Cloud – pCloudy

````xml
<ItemGroup>
    <PackageReference Include="Appium.WebDriver" Version="4.1.1" />
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.6.1" />
    <PackageReference Include="MSTest.TestAdapter" Version="2.1.2" />
    ```csharp

    `<PackageReference Include="MSTest.TestFramework" Version="2.1.2" />
</ItemGroup>
````

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
        By byScrollLocator = new ByAndroidUIAutomator("new UiSelector().text("Views");");
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

## Most Complete Appium C# Cheat Sheet

```csharp
// NuGet: Appium.WebDriver
_appiumLocalService = new AppiumServiceBuilder().UsingAnyFreePort().Build(); // Creates local Appium server instance
_appiumLocalService.Start(); // Starts local Appium server instance
var appiumOptions = new AppiumOptions();
// Android capabilities
appiumOptions.AddAdditionalCapability(MobileCapabilityType.AutomationName, "UiAutomator2");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "Android Virtual Device");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "7.1");
// iOS capabilities
appiumOptions.AddAdditionalCapability(MobileCapabilityType.AutomationName, "XCUITest");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "iPhone 11");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "iOS");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "13.2");
// Install and start an app on Android
appiumOptions.AddAdditionalCapability(AndroidMobileCapabilityType.AppPackage, "com.example.android.apis");
appiumOptions.AddAdditionalCapability(AndroidMobileCapabilityType.AppActivity, ".ApiDemos");
appiumOptions.AddAdditionalCapability(MobileCapabilityType.App, "path/to/TestApp.apk");
// Install and start an app on iOS
appiumOptions.AddAdditionalCapability(MobileCapabilityType.App, "path/to/TestApp.app.zip");
// Start mobile browser on Android
appiumOptions.AddAdditionalCapability(MobileCapabilityType.BrowserName, "Chrome");
// Start mobile browser on iOS
appiumOptions.AddAdditionalCapability(MobileCapabilityType.BrowserName, "safari");
// Set WebView Context for Hybrid Apps
((IContextAware)_driver).Context = ((IContextAware)_driver).Contexts.FirstOrDefault(c => c.Contains("WEBVIEW"));
// Use local server instance
_driver = new AndroidDriver<AndroidElement>(_appiumLocalService, appiumOptions); // initialize Android driver on local server instance
_driver = new IOSDriver<IOSElement>(_appiumLocalService, appiumOptions); // initialize iOS driver on local server instance
// Use remote Appium driver
_driver = new AndroidDriver<AndroidElement>(new Uri("127.0.0.1:4723/wd/hub"), appiumOptions); // initialize Android remote driver
_driver = new IOSDriver<IOSElement>(new Uri("127.0.0.1:4723/wd/hub"), appiumOptions); // initialize iOS remote driver
```

```csharp
_driver.FindElementById("android:id/text1");
_driver.FindElementByClassName("android.widget.CheckBox");
_driver.FindElementByXPath("//*[@text='Views']");
_driver.FindElementByAccessibilityId("Views");
_driver.FindElementByImage(base64EncodedImageFile);
_driver.FindElementByAndroidUIAutomator("new UiSelector().text("Views");");
_driver.FindElementByIOSNsPredicate("type == 'XCUIElementBottn' AND name == 'ComputeSumButton'");
// Find multiple elements
_driver.FindElementsByClassName("android.widget.CheckBox");
```

```csharp
// Alert handling
_driver.SwitchTo().Alert().Accept()
_driver.SwitchTo().Alert().Dismiss()
// Basic actions;
element.Click();
element.SendKeys("textToType");
element.Clear();
// Change orientation
var rotatable = (IRotatable)_driver;
rotatable.Orientation = ScreenOrientation.Landscape; // Portrait
// Clipboard
_driver.SetClipboardText("1234", "plaintext");
string clipboard = _driver.GetClipboardText();
// Mobile gestures
TouchAction touchAction = new TouchAction(_driver);
touchAction.Tap(x, y, count);
touchAction.Press(x, y);
touchAction.Wait(200);
touchAction.MoveTo(x, y);
touchAction.Release();
touchAction.LongPress(x, y);
touchAction.Perform();
// Simulate phone call (Emulator only)
_driver.MakeGsmCall("5551237890", GsmCallActions.Accept);
_driver.MakeGsmCall("5551237890", GsmCallActions.Call);
_driver.MakeGsmCall("5551237890", GsmCallActions.Cancel);
_driver.MakeGsmCall("5551237890", GsmCallActions.Hold);
// Set GSM voice state (Emulator only)
_driver.SetGsmVoice(GsmVoiceState.Denied);
_driver.SetGsmVoice(GsmVoiceState.Home);
_driver.SetGsmVoice(GsmVoiceState.Off);
_driver.SetGsmVoice(GsmVoiceState.On);
_driver.SetGsmVoice(GsmVoiceState.Roaming);
_driver.SetGsmVoice(GsmVoiceState.Searching);
_driver.SetGsmVoice(GsmVoiceState.Unregistered);
// Set GSM signal strength (Emulator only)
_driver.SetGsmSignalStrength(GsmSignalStrength.Good);
_driver.SetGsmSignalStrength(GsmSignalStrength.Great);
_driver.SetGsmSignalStrength(GsmSignalStrength.Moderate);
_driver.SetGsmSignalStrength(GsmSignalStrength.NoneOrUnknown);
_driver.SetGsmSignalStrength(GsmSignalStrength.Poor);
// Simulate receiving SMS message (Emulator only)
_driver.SendSms("555-555-5555", "Your code is 123456");
// Toggle services
_driver.ToggleAirplaneMode();
_driver.ToggleData();
_driver.ToggleLocationServices();
_driver.ToggleWifi();
// Soft keyboard actions
_driver.IsKeyboardShown(); // returns bool
_driver.HideKeyboard();
// Lock device
_driver.IsLocked(); // returns bool
_driver.Lock();
_driver.Unlock();
// Notifications
_driver.OpenNotifications();
// Geolocation actions
_driver.Location; // returns Location {Latitude, Longitude, Altitude}
_driver.Location.Altitude = 94.23;
_driver.Location.Latitude = 121.21;
_driver.Location.Longitude = 11.56;
// Get system time
_driver.DeviceTime; // returns string
// Get display density
_driver.GetDisplayDensity(); // returns float
// File actions
_driver.PushFile("/data/local/tmp/file", new FileInfo("path/to/file"))
_driver.PullFile("/path/to/device/file"); // returns byte[]
_driver.PullFolder("/path/to/device"); // returns byte[]
```

```csharp
// Multitouch action
TouchAction actionOne = new TouchAction(_driver);
actionOne.Press(10, 10);
actionOne.MoveTo(10, 100);
actionOne.Release();
TouchAction actionTwo = new TouchAction(_driver);
actionTwo.Press(20, 20);
actionTwo.MoveTo(20, 200);
actionTwo.Release();
MultiAction action = new MultiAction(_driver);
action.Add(actionOne);
action.Add(actionTwo);
action.Perform();
// Swipe using touch action
TouchAction touchAction = new TouchAction(_driver);
var element = _driver.FindElementById("android:id/text1");
Point point = element.Coordinates.LocationInDom;
Size size = element.Size;
touchAction
.Press(point.X + 5, point.Y + 5).Wait(200)
.MoveTo(point.X + size.Width - 5, point.Y + size.Height - 5)
.Release().Perform()
// Scroll using IJavaScriptExecutor
var js = (IJavaScriptExecutor)_driver;
var swipe = new Dictionary<string, string>();
swipe.Add("direction", "down"); // "up", "right", "left"
swipe.Add("element", element.Id);
js.ExecuteScript("mobile:swipe", swipe);
// Scroll element into veiw by Android UI automator
_driver.FindElementByAndroidUIAutomator(
"new UiScrollable(new UiSelector()).scrollIntoView(new UiSelector().text("Views"));");
// Update Device Settings
_driver.SetSetting("sample", "value");
_driver.Settings // Dictionary<string, object> property
```

```csharp
// Add photos
driver.PushFile("/mnt/sdcard/Pictures/img.jpg", new FileInfo("path/to/img.jpg"))
// Simulate hardware key
_driver.PressKeyCode(new KeyEvent(AndroidKeyCode.Home));
_driver.LongPressKeyCode(new KeyEvent(AndroidKeyCode.Keycode_POWER));
// Get current battery percentage
_driver.ExecuteScript("mobile: shell", "{"command": "dumpsys", "args": ["battery"]}").ToString();
// Set battery percentage
_driver.ExecuteScript("mobile: shell", "{"command": "dumpsys", "args": ["battery", "set", "level", "100"]}").ToString();
// Reset battery percentage
_driver.ExecuteScript("mobile: shell", "{"command": "dumpsys", "args": ["battery", "reset"]}").ToString();
// Take screenshot
_driver.GetScreenshot(); // returns Screenshot (base64 encoded PNG)
// Screen record
_driver.StartRecordingScreen(
AndroidStartScreenRecordingOptions.GetAndroidStartScreenRecordingOptions()
.WithTimeLimit(TimeSpan.FromSeconds(10))
.WithBitRate(500000)
.WithVideoSize("720x1280"));
_driver.StopRecordingScreen();
```

```csharp
// Add photos
driver.PushFile("img.jpg", new FileInfo("path/to/img.jpg"))
// Simulate hardware key
var args = new Dictionary<string, string>();
args.Add("name", "home"); // volumeup; volumedown
_driver.ExecuteScript("mobile: pressButton", args);
// Sending voice commands to Siri
var args = new Dictionary<string, string>();
args.Add("text", "Hey Siri, what's happening?");
_driver.ExecuteScript("mobile: siriCommand", args);
// Perform Touch ID in iOS Simulator
_driver.PerformTouchID(false); // Simulates a failed touch ID
_driver.PerformTouchID(true); // Simulates a passing touch ID
// Shake device
_driver.ShakeDevice();
```

```csharp
// Install app
_driver.InstallApp("path/to/app.apk");
// Remove app
_driver.RemoveApp("com.example.AppName");
// Verify app is installed
_driver.IsAppInstalled("com.example.android.apis"); // returns bool
// Launch app
_driver.LaunchApp();
// Start activity
_driver.StartActivity("com.example.android.apis", ".ApiDemos");
// Start activity with intent
_driver.StartActivityWithIntent("com.example.android.apis", ".ApiDemos", "intentAction");
// Get current activity
_driver.CurrentActivity; // string property
// Get current package
_driver.CurrentPackage; // string property
// Reset app
_driver.ResetApp();
// Close app
_driver.CloseApp();
// Run current app in background
_driver.BackgroundApp(10); // 10 seconds
// Terminate app
_driver.TerminateApp("com.example.android.apis"); // returns bool
// Check app's current state
_driver.GetAppState("com.example.android.apis"); // returns AppState
// Get app strings
_driver.GetAppStringDictionary("en", "/path/to/file"); // returns Dictionary<string, object>
```

```csharp
// Install app
var args = new Dictionary<string, string>();
args.Add("app", "path/to/app.ipa");
_driver.ExecuteScript("mobile: installApp", args);
// Remove app
var args = new Dictionary<string, string>();
args.Add("bundleId", "com.myapp");
_driver.ExecuteScript("mobile: removeApp", args);
// Verify app is installed
var args = new Dictionary<string, string>();
args.Add("bundleId", "com.myapp");
(bool)_driver.ExecuteScript("mobile: isAppInstalled", args);
// Launch app
var args = new Dictionary<string, string>();
args.Add("bundleId", "com.apple.calculator");
_driver.ExecuteScript("mobile: launchApp", args);
// Switch app to foreground
var args = new Dictionary<string, string>();
args.Add("bundleId", "com.myapp");
_driver.ExecuteScript("mobile: activateApp", args);
// Terminate app
var args = new Dictionary<string, string>();
args.Add("bundleId", "com.myapp");
// will return false if app is not running, otherwise true
(bool)_driver.ExecuteScript("mobile: terminateApp", args);
// Check app's current state
var args = new Dictionary<string, string>();
args.Add("bundleId", "com.myapp");
(AppState)_driver.ExecuteScript("mobile: queryAppState", args);
```

## Most Complete Appium Java Cheat Sheet

```java
// Maven: io.appium.java_client
appiumLocalService = new AppiumServiceBuilder().usingAnyFreePort().build(); // Creates local Appium server instance
appiumLocalService.start(); // Starts local Appium server instance
var desiredCapabilities = new DesiredCapabilities();
// Android capabilities
desiredCapabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2");
desiredCapabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Android Virtual Device");
desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "7.1");
// iOS capabilities
desiredCapabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "XCUITest");
desiredCapabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 11");
desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS");
desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "13.2");
// Install and start an app on Android
desiredCapabilities.setCapability(AndroidMobileCapabilityType.APP_PACKAGE, "com.example.android.apis");
desiredCapabilities.setCapability(AndroidMobileCapabilityType.APP_ACTIVITY, ".ApiDemos");
desiredCapabilities.setCapability(MobileCapabilityType.APP, "path/to/TestApp.apk");
// Install and start an app on iOS
desiredCapabilities.setCapability(MobileCapabilityType.APP, "path/to/TestApp.app.zip");
// Start mobile browser on Android
desiredCapabilities.setCapability(MobileCapabilityType.BROWSER_NAME, "Chrome");
// Start mobile browser on iOS
desiredCapabilities.setCapability(MobileCapabilityType.BROWSER_NAME, "safari");
// Set WebView Context for Hybrid Apps
driver.context(driver.getContextHandles().stream().filter(c -> c.contains("WEBVIEW")).findFirst().orElse(null));
// Use local server instance
driver = new AndroidDriver<AndroidElement>(appiumLocalService, desiredCapabilities); // initialize Android driver on local server instance
driver = new IOSDriver<IOSElement>(appiumLocalService, desiredCapabilities); // initialize iOS driver on local server instance
// Use remote Appium driver
driver = new AndroidDriver<AndroidElement>(new URL("http://127.0.0.1:4723/wd/hub"), desiredCapabilities); // initialize Android remote driver
driver = new IOSDriver<IOSElement>(new URL("http://0.0.0.0:4723/wd/hub"), desiredCapabilities); // initialize iOS remote driver
```

```java
driver.findElementById("android:id/text1");
driver.findElementByClassName("android.widget.CheckBox");
driver.findElementByXPath("//*[@text='Views']");
driver.findElementByAccessibilityId("Views");
driver.findElementByImage(base64EncodedImageFile);
driver.findElementByAndroidUIAutomator("new UiSelector().text("Views");");
driver.findElementByIosNsPredicate("type == 'XCUIElementBottn' AND name == 'ComputeSumButton'");
// Find multiple elements
driver.findElementsByClassName("android.widget.CheckBox");
```

```java
// Alert handling
driver.switchTo().alert().accept();
driver.switchTo().alert().dismiss();
// Basic actions;
element.click();
element.sendKeys("textToType");
element.clear();
// Change orientation
driver.rotate(ScreenOrientation.LANDSCAPE); // PORTRAIT
// Clipboard
driver.setClipboardText("1234", "plaintext");
String clipboard = driver.getClipboardText();
// Mobile gestures
TouchAction touchAction = new TouchAction(driver);
touchAction.tap(TapOptions.tapOptions()
.withPosition(PointOption.point(x, y)).withTapsCount(count));
touchAction.press(PointOption.point(x, y));
touchAction.waitAction(WaitOptions
.waitOptions(Duration.ofMillis(200)));
touchAction.moveTo(PointOption.point(x, y));
touchAction.release();
touchAction.longPress(PointOption.point(x, y));
touchAction.perform();
// Simulate phone call (Emulator only)
driver.makeGsmCall("5551237890", GsmCallActions.ACCEPT);
driver.makeGsmCall("5551237890", GsmCallActions.CALL);
driver.makeGsmCall("5551237890", GsmCallActions.CALL);
driver.makeGsmCall("5551237890", GsmCallActions.HOLD);
// Set GSM voice state (Emulator only)
driver.setGsmVoice(GsmVoiceState.DENIED);
driver.setGsmVoice(GsmVoiceState.HOME);
driver.setGsmVoice(GsmVoiceState.OFF);
driver.setGsmVoice(GsmVoiceState.ON);
driver.setGsmVoice(GsmVoiceState.ROAMING);
driver.setGsmVoice(GsmVoiceState.SEARCHING);
driver.setGsmVoice(GsmVoiceState.UNREGISTERED);
// Set GSM signal strength (Emulator only)
driver.setGsmSignalStrength(GsmSignalStrength.GOOD);
driver.setGsmSignalStrength(GsmSignalStrength.GREAT);
driver.setGsmSignalStrength(GsmSignalStrength.MODERATE);
driver.setGsmSignalStrength(GsmSignalStrength.NONE_OR_UNKNOWN);
driver.setGsmSignalStrength(GsmSignalStrength.POOR);
// Set network speed (Emulator only)
driver.setNetworkSpeed(NetworkSpeed.LTE);
// Simulate receiving SMS message (Emulator only)
driver.sendSMS("555-555-5555", "Your code is 123456");
// Toggle services
driver.toggleAirplaneMode();
driver.toggleData();
driver.toggleLocationServices();
driver.toggleWifi();
// Soft keyboard actions
driver.isKeyboardShown(); // returns boolean
driver.hideKeyboard();
// Lock device
driver.isDeviceLocked(); // returns boolean
driver.lockDevice();
driver.unlockDevice();
// Notifications
driver.openNotifications();
// Geolocation actions
driver.location(); // returns Location {Latitude, Longitude, Altitude}
driver.setLocation(new Location(94.23, 121.21, 11.56));
// Get system time
driver.getDeviceTime(); // returns String
// Get display density
driver.getDisplayDensity(); // returns long
// File actions
driver.pushFile("/data/local/tmp/file", new File("path/to/file"));
driver.pullFile("/path/to/device/file"); // returns byte[]
driver.pullFolder("/path/to/device"); // returns byte[]
```

```java
// Multitouch action
TouchAction actionOne = new TouchAction(driver);
actionOne.press(PointOption.point(10, 10));
actionOne.moveTo(PointOption.point(10, 100));
actionOne.release();
TouchAction actionTwo = new TouchAction(driver);
actionTwo.press(PointOption.point(20, 20));
actionTwo.moveTo(PointOption.point(20, 200));
actionTwo.release();
MultiTouchAction action = new MultiTouchAction(driver);
action.add(actionOne);
action.add(actionTwo);
action.perform();
// Swipe using touch action
TouchAction touchAction = new TouchAction(driver);
var element = driver.findElementById("android:id/text1");
Point point = element.getCoordinates().onPage();
Dimension size = element.getSize();
touchAction
.press(PointOption.point(point.getX() + 5, point.getY() + 5))
.waitAction(WaitOptions.waitOptions(Duration.ofMillis(200)))
.moveTo(PointOption.point(point.getX() + size.getWidth() - 5, point.getY() + size.getHeight() - 5))
.release().perform();
// Scroll using JavascriptExecutor
var js = (JavascriptExecutor)driver;
Map<String, String> swipe = new HashMap<>();
swipe.put("direction", "down"); // "up", "right", "left"
swipe.put("element", element.getId());
js.executeScript("mobile:swipe", swipe);
// Scroll element into view by Android UI automator
driver.findElementByAndroidUIAutomator("new UiScrollable(new UiSelector()).scrollIntoView(new UiSelector().text("Views"));");
// Update Device Settings
driver.setSetting(Setting.KEYBOARD_AUTOCORRECTION, false);
driver.getSettings(); // returns Map<String, Object>
// Take screenshot
((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE); // BYTES, BASE64 – returns File, byte[] or String (base64 encoded PNG)
// Screen record
driver.startRecordingScreen();
driver.stopRecordingScreen();
```

```java
// Add photos
driver.pushFile("/mnt/sdcard/Pictures/img.jpg", new File("path/to/img.jpg"));
// Simulate hardware key
driver.pressKey(new KeyEvent().withKey(AndroidKey.HOME));
driver.longPressKey(new KeyEvent().withKey(AndroidKey.POWER));
// Set battery percentage
driver.setPowerCapacity(100);
// Set the state of the battery charger to connected or not
driver.setPowerAC(PowerACState.ON);
driver.setPowerAC(PowerACState.OFF);
// Get performance data
driver.getPerformanceData("my.app.package", "cpuinfo", 5); // returns List<List<Object>>
```

```java
// Add photos
driver.pushFile("img.jpg", new File("path/to/img.jpg"));
// Simulate hardware key
Map<String, Object> args = new HashMap<>();
args.put("name", "home"); // volumeup; volumedown
driver.executeScript("mobile: pressButton", args);
// Sending voice commands to Siri
Map<String, Object> args = new HashMap<>();
args.put("text", "Hey Siri, what's happening?");
driver.executeScript("mobile: siriCommand", args);
// Perform Touch ID in iOS Simulator
driver.performTouchID(false); // Simulates a failed touch ID
driver.performTouchID(true); // Simulates a passing touch ID
// Shake device
driver.shake();
```

```java
// Install app
driver.installApp("path/to/app.apk");
// Remove app
driver.removeApp("com.example.AppName");
// Verify app is installed
driver.isAppInstalled("com.example.android.apis"); // returns boolean
// Launch app
driver.launchApp();
// Start activity
driver.startActivity(new Activity("com.example.android.apis", ".ApiDemos"));
// Get current activity
driver.currentActivity(); // returns String
// Get current package
driver.getCurrentPackage(); // returns String
// Reset app
driver.resetApp();
// Close app
driver.closeApp();
// Run current app in background
driver.runAppInBackground(Duration.ofSeconds(10)); // 10 seconds
// Terminate app
driver.terminateApp("com.example.android.apis"); // returns bool
// Check app's current state
driver.queryAppState("com.example.android.apis"); // returns ApplicationState
// Get app strings
driver.getAppStringMap("en", "path/to/file"); // returns Map<String, String>
```

```java
// Install app
Map<String, Object> args = new HashMap<>();
args.put("app", "path/to/app.ipa");
driver.executeScript("mobile: installApp", args);
// Remove app
Map<String, Object> args = new HashMap<>();
args.put("bundleId", "com.myapp");
driver.executeScript("mobile: removeApp", args);
// Verify app is installed
Map<String, Object> args = new HashMap<>();
args.put("bundleId", "com.myapp");
(boolean)driver.executeScript("mobile: isAppInstalled", args);
// Launch app
Map<String, Object> args = new HashMap<>();
args.put("bundleId", "com.apple.calculator");
driver.executeScript("mobile: launchApp", args);
// Switch app to foreground
Map<String, Object> args = new HashMap<>();
args.put("bundleId", "com.myapp");
driver.executeScript("mobile: activateApp", args);
// Terminate app
Map<String, Object> args = new HashMap<>();
args.put("bundleId", "com.myapp");
// will return false if app is not running, otherwise true
(boolean)driver.executeScript("mobile: terminateApp", args);
// Check app's current state
Map<String, Object> args = new HashMap<>();
args.put("bundleId", "com.myapp");
// will return false if app is not running, otherwise true
(ApplicationState)driver.executeScript("mobile: queryAppState", args);
```

## Enterprise Test Automation Framework: Plugin Architecture in MSTest

```csharp
public class TestWorkflowPlugin
{
    public void Subscribe(ITestWorkflowPluginProvider provider)
    {
        provider.PreTestInitEvent += PreTestInit;
        provider.TestInitFailedEvent += TestInitFailed;
        provider.PostTestInitEvent += PostTestInit;
        provider.PreTestCleanupEvent += PreTestCleanup;
        provider.PostTestCleanupEvent += PostTestCleanup;
        provider.TestCleanupFailedEvent += TestCleanupFailed;
        provider.PreTestsArrangeEvent += PreTestsArrange;
        provider.TestsArrangeFailedEvent += TestsArrangeFailed;
        provider.PreTestsActEvent += PreTestsAct;
        provider.PostTestsActEvent += PostTestsAct;
        provider.PostTestsArrangeEvent += PostTestsArrange;
        provider.PreTestsCleanupEvent += PreTestsCleanup;
        provider.PostTestsCleanupEvent += PostTestsCleanup;
        provider.TestsCleanupFailedEvent += TestsCleanupFailed;
    }

    public void Unsubscribe(ITestWorkflowPluginProvider provider)
    {
        provider.PreTestInitEvent -= PreTestInit;
        provider.TestInitFailedEvent -= TestInitFailed;
        provider.PostTestInitEvent -= PostTestInit;
        provider.PreTestCleanupEvent -= PreTestCleanup;
        provider.PostTestCleanupEvent -= PostTestCleanup;
        provider.TestCleanupFailedEvent -= TestCleanupFailed;
        provider.PreTestsArrangeEvent -= PreTestsArrange;
        provider.TestsArrangeFailedEvent -= TestsArrangeFailed;
        provider.PreTestsActEvent -= PreTestsAct;
        provider.PostTestsActEvent -= PostTestsAct;
        provider.PostTestsArrangeEvent -= PostTestsArrange;
        provider.PreTestsCleanupEvent -= PreTestsCleanup;
        provider.PostTestsCleanupEvent -= PostTestsCleanup;
        provider.TestsCleanupFailedEvent -= TestsCleanupFailed;
    }

    protected virtual void TestsCleanupFailed(object sender, Exception ex) { }

    protected virtual void PreTestsCleanup(object sender,
                                TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestsCleanup(object sender,
                                TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PreTestInit(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void TestInitFailed(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestInit(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PreTestCleanup(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestCleanup(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void TestCleanupFailed(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void TestsArrangeFailed(object sender, Exception e) { }
    protected virtual void PreTestsAct(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PreTestsArrange(object sender
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestsAct(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestsArrange(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }

    protected List<dynamic> GetAllAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var classAttributes = GetClassAttributes<TAttribute>(memberInfo.DeclaringType);
        var methodAttributes = GetMethodAttributes<TAttribute>(memberInfo);
        var attributes = classAttributes.ToList();
        attributes.AddRange(methodAttributes);
        return attributes;
    }

    protected TAttribute GetOverridenAttribute<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var classAttribute = GetClassAttribute<TAttribute>(memberInfo.DeclaringType);
        var methodAttribute = GetMethodAttribute<TAttribute>(memberInfo);
        if (methodAttribute != null)
        {
            return methodAttribute;
        }
        return classAttribute;
    }

    protected dynamic GetClassAttribute<TAttribute>(Type currentType)
        where TAttribute : Attribute
    {
        var classAttribute = currentType.GetCustomAttribute<TAttribute>(true);
        return classAttribute;
    }

    protected dynamic GetMethodAttribute<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var methodAttribute = memberInfo?.GetCustomAttribute<TAttribute>(true);
        return methodAttribute;
    }

    protected IEnumerable<dynamic> GetClassAttributes<TAttribute>(Type currentType)
        where TAttribute : Attribute
    {
        var classAttributes = currentType.GetCustomAttributes<TAttribute>(true);
        return classAttributes;
    }

    protected IEnumerable<dynamic> GetMethodAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var methodAttributes = memberInfo?.GetCustomAttributes<TAttribute>(true);
        return methodAttributes;
    }
}
```

```csharp
[TestClass]
public class MSTestBaseTest
{
    public IServicesCollection Container;
    protected MSTestExecutionContext ExecutionContext;
    private static readonly List<string> TypeForAlreadyExecutedClassInits =
            new List<string>();
    private TestWorkflowPluginProvider _currentTestExecutionProvider;
    public TestContext TestContext { get; set; }
    [TestInitialize]
    public void CoreTestInit()
    {
        ExecutionContext = new MSTestExecutionContext(TestContext);
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(&(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
        ExecuteActArrangePhases();
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(ExecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        try
        {
            Initialize();
            _currentTestExecutionProvider.PreTestInit(
            ExecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            TestInit();
            _currentTestExecutionProvider.PostTestInit(
            ExecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestInitFailed(ex,
            ExecutionContext.TestName,testMethodMemberInfo,
            testClassType, categories, authors, descriptions);
            throw;
        }
    }
    [TestCleanup]
    public void CoreTestCleanup()
    {
        if (ExecutionContext == null)
        {
            ExecutionContext = new MSTestExecutionContext(TestContext);
        }
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(ExecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        try
        {
            _currentTestExecutionProvider.PreTestCleanup(
            (TestOutcome) ExecutionContext.TestOutcome,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            ExecutionContext.ExceptionMessage,
            ExecutionContext.ExceptionStackTrace, ExecutionContext.Exception);
            TestCleanup();
            _currentTestExecutionProvider.PostTestCleanup(
            (TestOutcome) ExecutionContext.TestOutcome,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            ExecutionContext.ExceptionMessage,
            ExecutionContext.ExceptionStackTrace, ExecutionContext.Exception);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestCleanupFailed(ex,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            throw;
        }
    }
    public virtual void Initialize() { }
    public virtual void TestsArrange() { }
    public virtual void TestsAct() { }
    public virtual void TestInit() { }
    public virtual void TestCleanup() { }
    public virtual void TestsCleanup() { }
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
        foreach (var testCategoryAttribute in testCategoryAttributes)
        {
            categories.AddRange(testCategoryAttribute.TestCategories);
        }
        return categories;
    }
    private List<string> GetAllAuthors(MemberInfo memberInfo)
    {
        var authors = new List<string>();
        var ownerAttributes = GetAllAttributes<OwnerAttribute>(memberInfo);
        foreach (var ownerAttribute in ownerAttributes)
        {
            authors.Add(ownerAttribute.Owner);
        }
        return authors;
    }
    private List<string> GetAllDescriptions(MemberInfo memberInfo)
    {
        var descriptions = new List<string>();
        var descriptionAttributes = GetAllAttributes<DescriptionAttribute>(memberInfo);
        foreach (var descriptionAttribute in descriptionAttributes)
        {
            descriptions.Add(descriptionAttribute.Description);
        }
        return descriptions;
    }
    private void InitializeTestExecutionBehaviorObservers(TestWorkflowPluginProvider testExecutionProvider)
    {
        var observers = ServicesCollection.Current.ResolveAll<TestWorkflowPlugin>();
        foreach (var observer in observers)
        {
            observer.Subscribe(testExecutionProvider);
        }
    }
    private void ExecuteActArrangePhases()
    {
        try
        {
            var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
            if (!TypeForAlreadyExecutedClassInits.Contains(ExecutionContext.TestClassName))
            {
                Container = ServicesCollection.Current
                            .CreateChildServicesCollection(testClassType.FullName);
                Container.RegisterInstance(Container);
                Container.RegisterInstance<ExecutionContext>(ExecutionContext);
                _currentTestExecutionProvider = new TestWorkflowPluginProvider();
                InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
                TypeForAlreadyExecutedClassInits.Add(ExecutionContext.TestClassName);
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
        where TAttribute : Attribute
    {
        var allureClassAttributes = GetClassAttributes<TAttribute>(memberInfo.DeclaringType);
        var allureMethodAttributes = GetMethodAttributes<TAttribute>(memberInfo);
        var allAllureAttributes = allureClassAttributes.ToList();
        allAllureAttributes.AddRange(allureMethodAttributes);
        return allAllureAttributes;
    }
    private IEnumerable<TAttribute> GetClassAttributes<TAttribute>(Type currentType)
        where TAttribute : Attribute
    {
        var classAttributes = currentType.GetCustomAttributes<TAttribute>(true);
        return classAttributes;
    }
    private IEnumerable<TAttribute> GetMethodAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
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
    protected MSTestExecutionContext ExecutionContext;
    private static readonly List<string> TypeForAlreadyExecutedClassInits =
            new List<string>();
    private TestWorkflowPluginProvider _currentTestExecutionProvider;
    public TestContext TestContext { get; set; }
    [TestInitialize]
    public void CoreTestInit()
    {
        ExecutionContext = new MSTestExecutionContext(TestContext);
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
        ExecuteActArrangePhases();
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(ExecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        try
        {
            Initialize();
            _currentTestExecutionProvider.PreTestInit(
            ExecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            TestInit();
            _currentTestExecutionProvider.PostTestInit(
            ExecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestInitFailed(ex,
            ExecutionContext.TestName,testMethodMemberInfo,
            testClassType, categories, authors, descriptions);
            throw;
        }
    }
    [TestCleanup]
    public void CoreTestCleanup()
    {
        if (ExecutionContext == null)
        {
            ExecutionContext = new MSTestExecutionContext(TestContext);
        }
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(ExecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        try
        {
            _currentTestExecutionProvider.PreTestCleanup(
            (TestOutcome) ExecutionContext.TestOutcome,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            ExecutionContext.ExceptionMessage,
            ExecutionContext.ExceptionStackTrace, ExecutionContext.Exception);
            TestCleanup();
            _currentTestExecutionProvider.PostTestCleanup(
            (TestOutcome) ExecutionContext.TestOutcome,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            ExecutionContext.ExceptionMessage,
            ExecutionContext.ExceptionStackTrace, ExecutionContext.Exception);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestCleanupFailed(ex,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            throw;
        }
    }
    public virtual void Initialize() { }
    public virtual void TestsArrange() { }
    public virtual void TestsAct() { }
    public virtual void TestInit() { }
    public virtual void TestCleanup() { }
    public virtual void TestsCleanup() { }
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
        foreach (var testCategoryAttribute in testCategoryAttributes)
        {
            categories.AddRange(testCategoryAttribute.TestCategories);
        }
        return categories;
    }
    private List<string> GetAllAuthors(MemberInfo memberInfo)
    {
        var authors = new List<string>();
        var ownerAttributes = GetAllAttributes<OwnerAttribute>(memberInfo);
        foreach (var ownerAttribute in ownerAttributes)
        {
            authors.Add(ownerAttribute.Owner);
        }
        return authors;
    }
    private List<string> GetAllDescriptions(MemberInfo memberInfo)
    {
        var descriptions = new List<string>();
        var descriptionAttributes = GetAllAttributes<DescriptionAttribute>(memberInfo);
        foreach (var descriptionAttribute in descriptionAttributes)
        {
            descriptions.Add(descriptionAttribute.Description);
        }
        return descriptions;
    }
    private void InitializeTestExecutionBehaviorObservers(TestWorkflowPluginProvider testExecutionProvider)
    {
        var observers = ServicesCollection.Current.ResolveAll<TestWorkflowPlugin>();
        foreach (var observer in observers)
        {
            observer.Subscribe(testExecutionProvider);
        }
    }
    private void ExecuteActArrangePhases()
    {
        try
        {
            var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
            if (!TypeForAlreadyExecutedClassInits.Contains(ExecutionContext.TestClassName))
            {
                Container = ServicesCollection.Current
                            .CreateChildServicesCollection(testClassType.FullName);
                Container.RegisterInstance(Container);
                Container.RegisterInstance<ExecutionContext>(ExecutionContext);
                _currentTestExecutionProvider = new TestWorkflowPluginProvider();
                InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
                TypeForAlreadyExecutedClassInits.Add(ExecutionContext.TestClassName);
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
        where TAttribute : Attribute
    {
        var allureClassAttributes = GetClassAttributes<TAttribute>(memberInfo.DeclaringType);
        var allureMethodAttributes = GetMethodAttributes<TAttribute>(memberInfo);
        var allAllureAttributes = allureClassAttributes.ToList();
        allAllureAttributes.AddRange(allureMethodAttributes);
        return allAllureAttributes;
    }
    private IEnumerable<TAttribute> GetClassAttributes<TAttribute>(Type currentType)
        where TAttribute : Attribute
    {
        var classAttributes = currentType.GetCustomAttributes<TAttribute>(true);
        return classAttributes;
    }
    private IEnumerable<TAttribute> GetMethodAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var methodAttributes = memberInfo.GetCustomAttributes<TAttribute>(true);
        return methodAttributes;
    }
}
```

# Web Automation

## Selenium C# MSTest Test Automating Angular, React, VueJS and 20 More

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
[TestClass]
public class TodoTests
{
    private const int WAIT_FOR_ELEMENT_TIMEOUT = 30;
    private IWebDriver _driver;
    private WebDriverWait _webDriverWait;
    private Actions _actions;
    [TestInitialize]
    public void TestInit()
    {
        _driver = new ChromeDriver();
        _driver.Manage().Window.Maximize();
        _webDriverWait = new WebDriverWait(_driver, TimeSpan.FromSeconds(WAIT_FOR_ELEMENT_TIMEOUT));
        _actions = new Actions(_driver);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [DataRow("Backbone.js")]
    [DataRow("AngularJS")]
    [DataRow("React")]
    [DataRow("Vue.js")]
    [DataRow("CanJS")]
    [DataRow("Ember.js")]
    [DataRow("KnockoutJS")]
    [DataRow("Marionette.js")]
    [DataRow("Polymer")]
    [DataRow("Angular 2.0")]
    [DataRow("Dart")]
    [DataRow("Elm")]
    [DataRow("Closure")]
    [DataRow("Vanilla JS")]
    [DataRow("jQuery")]
    [DataRow("cujoJS")]
    [DataRow("Spine")]
    [DataRow("Dojo")]
    [DataRow("Mithril")]
    [DataRow("Kotlin + React")]
    [DataRow("Firebase + AngularJS")]
    [DataRow("Vanilla ES6")]
    [DataTestMethod]
    public void VerifyTodoListCreatedSuccessfully(string technology)
    {
        _driver.Navigate().GoToUrl("https://todomvc.com/");
        OpenTechnologyApp(technology);
        AddNewToDoItem("Clean the car");
        AddNewToDoItem("Clean the house");
        AddNewToDoItem("Buy Ketchup");
        GetItemCheckBox("Buy Ketchup").Click();
        AssertLeftItems(2);
    }
    // private methods
}
```

## Selenium C# xUnit Test Automating Angular, React, VueJS and 20 More

```csharp
[Fact]
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
    return WaitAndFindElement(By.XPath($"//label[text()='{todoItem}']/preceding-sibling::input")
    );
}
private void AddNewToDoItem(string todoItem)
{
    var todoInput = WaitAndFindElement(
        By.XPath("//input[@placeholder='What needs to be done?']")
    );
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
public class TodoTests : IDisposable
{
    private const int WAIT_FOR_ELEMENT_TIMEOUT = 30;
    private readonly IWebDriver _driver;
    private readonly WebDriverWait _webDriverWait;
    private readonly Actions _actions;
    public TodoTests()
    {
        _driver = new ChromeDriver();
        _driver.Manage().Window.Maximize();
        _webDriverWait = new WebDriverWait(_driver, TimeSpan.FromSeconds(WAIT_FOR_ELEMENT_TIMEOUT));
        _actions = new Actions(_driver);
    }
    public void Dispose()
    {
        _driver.Quit();
        GC.SuppressFinalize(this);
    }
    [Theory]
    [InlineData("Backbone.js")]
    [InlineData("AngularJS")]
    [InlineData("React")]
    [InlineData("Vue.js")]
    [InlineData("CanJS")]
    [InlineData("Ember.js")]
    [InlineData("KnockoutJS")]
    [InlineData("Marionette.js")]
    [InlineData("Polymer")]
    [InlineData("Angular 2.0")]
    [InlineData("Dart")]
    [InlineData("Elm")]
    [InlineData("Closure")]
    [InlineData("Vanilla JS")]
    [InlineData("jQuery")]
    [InlineData("cujoJS")]
    [InlineData("Spine")]
    [InlineData("Dojo")]
    [InlineData("Mithril")]
    [InlineData("Kotlin + React")]
    [InlineData("Firebase + AngularJS")]
    [InlineData("Vanilla ES6")]
    public void VerifyTodoListCreatedSuccessfully(string technology)
    {
        _driver.Navigate().GoToUrl("https://todomvc.com/");
        OpenTechnologyApp(technology);
        AddNewToDoItem("Clean the car");
        AddNewToDoItem("Clean the house");
        AddNewToDoItem("Buy Ketchup");
        GetItemCheckBox("Buy Ketchup").Click();
        AssertLeftItems(2);
    }
    // private methods
}
```

## Selenium C# NUnit Test Automating Angular, React, VueJS and 20 More

```csharp
[Test]
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
    return WaitAndFindElement(
        By.XPath($"//label[text()='{todoItem}']/preceding-sibling::input")
    );
}
private void AddNewToDoItem(string todoItem)
{
    var todoInput = WaitAndFindElement(
        By.XPath("//input[@placeholder='What needs to be done?']")
    );
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
[TestFixture]
public class TodoTests
{
    private const int WAIT_FOR_ELEMENT_TIMEOUT = 30;
    private IWebDriver _driver;
    private WebDriverWait _webDriverWait;
    private Actions _actions;
    [SetUp]
    public void TestInit()
    {
        _driver = new ChromeDriver();
        _driver.Manage().Window.Maximize();
        _webDriverWait = new WebDriverWait(_driver, TimeSpan.FromSeconds(WAIT_FOR_ELEMENT_TIMEOUT));
        _actions = new Actions(_driver);
    }
    [TearDown]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [TestCase("Backbone.js")]
    [TestCase("AngularJS")]
    [TestCase("React")]
    [TestCase("Vue.js")]
    [TestCase("CanJS")]
    [TestCase("Ember.js")]
    [TestCase("KnockoutJS")]
    [TestCase("Marionette.js")]
    [TestCase("Polymer")]
    [TestCase("Angular 2.0")]
    [TestCase("Dart")]
    [TestCase("Elm")]
    [TestCase("Closure")]
    [TestCase("Vanilla JS")]
    [TestCase("jQuery")]
    [TestCase("cujoJS")]
    [TestCase("Spine")]
    [TestCase("Dojo")]
    [TestCase("Mithril")]
    [TestCase("Kotlin + React")]
    [TestCase("Firebase + AngularJS")]
    [TestCase("Vanilla ES6")]
    public void VerifyTodoListCreatedSuccessfully(string technology)
    {
        _driver.Navigate().GoToUrl("https://todomvc.com/");
        OpenTechnologyApp(technology);
        AddNewToDoItem("Clean the car");
        AddNewToDoItem("Clean the house");
        AddNewToDoItem("Buy Ketchup");
        GetItemCheckBox("Buy Ketchup").Click();
        AssertLeftItems(2);
    }
    // private methods
}

```

## Headless Execution of WebDriver Tests- Edge Browser

```csharp
private void PerformTestOperations(IWebDriver driver)
{
    string testPagePath =
        "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    driver.Navigate().GoToUrl(testPagePath);
    driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(10);
    driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    var textBoxes = driver.FindElements(By.Name("fname"));
    foreach (var textBox in textBoxes)
    {
        textBox.SendKeys(Guid.NewGuid().ToString());
    }
    var selects = driver.FindElements(By.TagName("select"));
    foreach (var select in selects)
    {
        var selectElement = new SelectElement(select);
        selectElement.SelectByText("Mercedes");
    }
    var submits = driver.FindElements(By.XPath("//input[@type='submit']"));
    foreach (var submit in submits)
    {
        submit.Click();
    }
    var colors = driver.FindElements(By.XPath("//input[@type='color']"));
    foreach (var color in colors)
    {
        SetValueAttribute(driver, color, "#000000");
    }
    var dates = driver.FindElements(By.XPath("//input[@type='date']"));
    foreach (var date in dates)
    {
        SetValueAttribute(driver, date, "2020-06-01");
    }
    var radioButtons = driver.FindElements(By.XPath("//input[@type='radio']"));
    foreach (var radio in radioButtons)
    {
        radio.Click();
    }
}
private void SetValueAttribute(IWebDriver driver, IWebElement element, string value)
{
    SetAttribute(driver, element, "value", value);
}
private void SetAttribute(
    IWebDriver driver,
    IWebElement element,
    string attributeName,
    string attributeValue
)
{
    driver.ExecuteJavaScript(
        "arguments[0].setAttribute(arguments[1], arguments[2]);",
        element,
        attributeName,
        attributeValue
    );
}
```

```csharp
private void PerformTestOperations(IWebDriver driver)
{
    string testPagePath =
        "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    driver.Navigate().GoToUrl(testPagePath);
    driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(10);
    driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    var textBoxes = driver.FindElements(By.Name("fname"));
    foreach (var textBox in textBoxes)
    {
        textBox.SendKeys(Guid.NewGuid().ToString());
    }
    var selects = driver.FindElements(By.TagName("select"));
    foreach (var select in selects)
    {
        var selectElement = new SelectElement(select);
        selectElement.SelectByText("Mercedes");
    }
    var submits = driver.FindElements(By.XPath("//input[@type='submit']"));
    foreach (var submit in submits)
    {
        submit.Click();
    }
    var colors = driver.FindElements(By.XPath("//input[@type='color']"));
    foreach (var color in colors)
    {
        SetValueAttribute(driver, color, "#000000");
    }
    var dates = driver.FindElements(By.XPath("//input[@type='date']"));
    foreach (var date in dates)
    {
        SetValueAttribute(driver, date, "2020-06-01");
    }
    var radioButtons = driver.FindElements(By.XPath("//input[@type='radio']"));
    foreach (var radio in radioButtons)
    {
        radio.Click();
    }
}
private void SetValueAttribute(IWebDriver driver, IWebElement element, string value)
{
    SetAttribute(driver, element, "value", value);
}
private void SetAttribute(
    IWebDriver driver,
    IWebElement element,
    string attributeName,
    string attributeValue
)
{
    driver.ExecuteJavaScript(
        "arguments[0].setAttribute(arguments[1], arguments[2]);",
        element,
        attributeName,
        attributeValue
    );
}
```

```csharp
private void Profile(string testResultsFileName, int iterations, Action actionToProfile)
{
    var desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
    var resultsPath = Path.Combine(
        desktopPath,
        "BenchmarkTestResults",
        string.Concat(testResultsFileName, "_", Guid.NewGuid().ToString(), ".txt")
    );
    var writer = new StreamWriter(resultsPath);
    GC.Collect();
    GC.WaitForPendingFinalizers();
    GC.Collect();
    var watch = new Stopwatch();
    watch.Start();
    for (var i = 0; i < iterations; i++)
    {
        actionToProfile();
    }
    watch.Stop();
    writer.WriteLine(
        "Total: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
        watch.ElapsedMilliseconds,
        watch.ElapsedTicks,
        iterations
    );
    var avgElapsedMillisecondsPerRun = watch.ElapsedMilliseconds / iterations;
    var avgElapsedTicksPerRun = watch.ElapsedMilliseconds / iterations;
    writer.WriteLine(
        "AVG: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
        avgElapsedMillisecondsPerRun,
        avgElapsedTicksPerRun,
        iterations
    );
    writer.Flush();
    writer.Close();
}
```

```csharp
[Test]
public void TestChromeExecutionTime()
{
    Profile(
        "TestChromeExecutionTime",
        10,
        () =>
        {
            using (IWebDriver driver = new ChromeDriver())
            {
                PerformTestOperations(driver);
            }
        }
    );
}
[Test]
public void TestFirefoxExecutionTime()
{
    Profile(
        "TestFirefoxExecutionTime",
        10,
        () =>
        {
            using (IWebDriver driver = new FirefoxDriver())
            {
                PerformTestOperations(driver);
            }
        }
    );
}
[Test]
public void TestEdgeHeadlessExecutionTime()
{
    Profile(
        "TestEdgeHeadlessExecutionTime",
        10,
        () =>
        {
            var edgeDriverService =
                Microsoft.Edge.SeleniumTools.EdgeDriverService.CreateChromiumService();
            var edgeOptions = new Microsoft.Edge.SeleniumTools.EdgeOptions();
            edgeOptions.PageLoadStrategy = PageLoadStrategy.Normal;
            edgeOptions.UseChromium = true;
            edgeOptions.AddArguments("--headless");
            using (
                IWebDriver driver = new Microsoft.Edge.SeleniumTools.EdgeDriver(
                    edgeDriverService,
                    edgeOptions
                )
            )
            {
                PerformTestOperations(driver);
            }
        }
    );
}
[Test]
public void TestEdgeExecutionTime()
{
    Profile(
        "TestEdgeExecutionTime",
        10,
        () =>
        {
            var edgeDriverService =
                Microsoft.Edge.SeleniumTools.EdgeDriverService.CreateChromiumService();
            var edgeOptions = new Microsoft.Edge.SeleniumTools.EdgeOptions();
            edgeOptions.PageLoadStrategy = PageLoadStrategy.Normal;
            edgeOptions.UseChromium = true;
            using (
                IWebDriver driver = new Microsoft.Edge.SeleniumTools.EdgeDriver(
                    edgeDriverService,
                    edgeOptions
                )
            )
            {
                PerformTestOperations(driver);
            }
        }
    );
}
[Test]
public void TestChromeHeadlessExecutionTime()
{
    Profile(
        "TestChromeHeadlessExecutionTime",
        10,
        () =>
        {
            var options = new ChromeOptions();
            options.AddArguments("headless");
            using (IWebDriver driver = new ChromeDriver(options))
            {
                PerformTestOperations(driver);
            }
        }
    );
}
[Test]
public void TestFirefoxHeadlessExecutionTime()
{
    Profile(
        "TestFirefoxHeadlessExecutionTime",
        10,
        () =>
        {
            var options = new FirefoxOptions();
            options.AddArguments("--headless");
            using (IWebDriver driver = new FirefoxDriver(options))
            {
                PerformTestOperations(driver);
            }
        }
    );
}
```

## Most Complete Selenium WebDriver 4.0 Overview

```csharp
var edgeDriverService = Microsoft.Edge.SeleniumTools.EdgeDriverService.CreateChromiumService();
var edgeOptions = new Microsoft.Edge.SeleniumTools.EdgeOptions();
edgeOptions.PageLoadStrategy = PageLoadStrategy.Normal;
edgeOptions.UseChromium = true;
wrappedWebDriver = new Microsoft.Edge.SeleniumTools.EdgeDriver(edgeDriverService, edgeOptions);
```

```csharp
var options = new ChromeOptions();
options.AddArguments("headless");
using (IWebDriver driver = new ChromeDriver(options))
{
    // the rest of your test
}
var options = new FirefoxOptions();
options.AddArguments("--headless");
using (IWebDriver driver = new FirefoxDriver(options))
{
    // the rest of your test
}
```

```csharp
IWebElement imageTitle = _driver.FindElement(By.XPath("//h2[text()='Falcon 9']"));
IWebElement falconSalesButton = _driver.FindElement(RelativeBy.WithTagName("span").Below(imageTitle));
falconSalesButton.Click();
```

```csharp
ChromeDriver _driver = new ChromeDriver();
var session = _driver.CreateDevToolsSession();
```

```csharp
var blockedUrlSettings = new SetBlockedURLsCommandSettings();
blockedUrlSettings.Urls = new string[] { "http://demos.bellatrix.solutions/wp-content/uploads/2018/04/440px-Launch_Vehicle__Verticalization__Proton-M-324x324.jpg" };
devToolssession.Network.SetBlockedURLs(blockedUrlSettings);
```

```csharp
var setExtraHTTPHeadersCommandSettings = new SetExtraHTTPHeadersCommandSettings();
setExtraHTTPHeadersCommandSettings.Headers.Add("Accept-Encoding", "gzip, deflate");
devToolssession.Network.SetExtraHTTPHeaders(setExtraHTTPHeadersCommandSettings);
```

```csharp
EventHandler<RequestInterceptedEventArgs> requestIntercepted = (sender, e) =>
{
    Assert.IsTrue(e.Request.Url.EndsWith("jpg"));
};
RequestPattern requestPattern = new RequestPattern();
requestPattern.InterceptionStage = InterceptionStage.HeadersReceived;
requestPattern.ResourceType = ResourceType.Image;
requestPattern.UrlPattern = "*.jpg";
var setRequestInterceptionCommandSettings = new SetRequestInterceptionCommandSettings();
setRequestInterceptionCommandSettings.Patterns = new RequestPattern[] { requestPattern };
devToolssession.Network.SetRequestInterception(setRequestInterceptionCommandSettings);
devToolssession.Network.RequestIntercepted += requestIntercepted;
```

```csharp
EventHandler<MessageAddedEventArgs> messageAdded = (sender, e) =>
{
    Assert.AreEqual("BELLATRIX is cool", e.Message);
};
devToolssession.Console.Enable();
devToolssession.Console.ClearMessages();
devToolssession.Console.MessageAdded += messageAdded;
_driver.ExecuteScript("console.log('BELLATRIX is cool');");
```

```csharp
var setIgnoreCertificateErrorsCommandSettings = new SetIgnoreCertificateErrorsCommandSettings();
setIgnoreCertificateErrorsCommandSettings.Ignore = true;
devToolssession.Security.SetIgnoreCertificateErrors(setIgnoreCertificateErrorsCommandSettings);
```

```csharp
var setCacheDisabledCommandSettings = new SetCacheDisabledCommandSettings();
setCacheDisabledCommandSettings.CacheDisabled = true;
devToolssession.Network.SetCacheDisabled(setCacheDisabledCommandSettings);
devToolssession.Network.ClearBrowserCache();

```

```csharp
var emulationSettings = new EmulateNetworkConditionsCommandSettings();
emulationSettings.ConnectionType = ConnectionType.Cellular3g;
emulationSettings.DownloadThroughput = 20;
emulationSettings.Latency = 1.2;
emulationSettings.UploadThroughput = 50;
devToolssession.Network.EmulateNetworkConditions(emulationSettings);
```

```csharp
var metrics = devToolssession.Performance.GetMetrics();
foreach (var metric in metrics.Result.Metrics)
{
    Console.WriteLine($"{metric.Name} = {metric.Value}");
}
```

```csharp
var setUserAgentOverrideCommandSettings = new SetUserAgentOverrideCommandSettings();
setUserAgentOverrideCommandSettings.UserAgent = "Mozilla/5.0 CK={} (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko";
devToolssession.Network.SetUserAgentOverride(setUserAgentOverrideCommandSettings);
```

```csharp
_driver.SwitchTo().NewWindow(WindowType.Tab);
_driver.SwitchTo().NewWindow(WindowType.Window);
_driver.SwitchTo().ParentFrame();
```

## Execute Tests in Docker Containers Using Selenoid

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

## Most Complete Selenium WebDriver C# Cheat Sheet

```csharp
// NuGet: Selenium.WebDriver.ChromeDriver
using OpenQA.Selenium.Chrome;
IWebDriver driver = new ChromeDriver();
// NuGet: Selenium.Mozilla.Firefox.Webdriver
using OpenQA.Selenium.Firefox;
IWebDriver driver = new FirefoxDriver();
// NuGet: Selenium.WebDriver.PhantomJS
using OpenQA.Selenium.PhantomJS;
IWebDriver driver = new PhantomJSDriver();
// NuGet: Selenium.WebDriver.IEDriver
using OpenQA.Selenium.IE;
IWebDriver driver = new InternetExplorerDriver();
// NuGet: Selenium.WebDriver.EdgeDriver
using OpenQA.Selenium.Edge;
IWebDriver driver = new EdgeDriver();
```

```csharp
this.driver.FindElement(By.ClassName("className"));
this.driver.FindElement(By.CssSelector("css"));
this.driver.FindElement(By.Id("id"));
this.driver.FindElement(By.LinkText("text"));
this.driver.FindElement(By.Name("name"));
this.driver.FindElement(By.PartialLinkText("pText"));
this.driver.FindElement(By.TagName("input"));
this.driver.FindElement(By.XPath("//*[@id='editor']"));
// Find multiple elements
IReadOnlyCollection<IWebElement> anchors = this.driver.FindElements(By.TagName("a"));
// Search for an element inside another
var div = this.driver.FindElement(By.TagName("div")).FindElement(By.TagName("a"));
```

```csharp
IWebElement element = driver.FindElement(By.Id("id"));
element.Click();
element.SendKeys("someText");
element.Clear();
element.Submit();
string innerText = element.Text;
bool isEnabled = element.Enabled;
bool isDisplayed = element.Displayed;
bool isSelected = element.Selected;
IWebElement element = driver.FindElement(By.Id("id"));
SelectElement select = new SelectElement(element);
select.SelectByIndex(1);
select.SelectByText("Ford");
select.SelectByValue("ford");
select.DeselectAll();
select.DeselectByIndex(1);
select.DeselectByText("Ford");
select.DeselectByValue("ford");
IWebElement selectedOption = select.SelectedOption;
IList<IWebElement> allSelected = select.AllSelectedOptions;
bool isMultipleSelect = select.IsMultiple;
```

```csharp
// Drag and Drop
IWebElement element =
driver.FindElement(By.XPath("//*[@id='project']/p[1]/div/div[2]"));
Actions move = new Actions(driver);
move.DragAndDropToOffset(element, 30, 0).Perform();
// How to check if an element is visible
Assert.IsTrue(driver.FindElement(By.XPath("//*[@id='tve_editor']/div")).Displayed);
// Upload a file
IWebElement element = driver.FindElement(By.Id("RadUpload1file0"));
String filePath = @"D:WebDriver.Series.TestsWebDriver.xml";
element.SendKeys(filePath);
// Scroll focus to control
IWebElement link = driver.FindElement(By.PartialLinkText("Previous post"));
string js = string.Format("window.scroll(0, {0});", link.Location.Y);
((IJavaScriptExecutor)driver).ExecuteScript(js);
link.Click();
// Taking an element screenshot
IWebElement element = driver.FindElement(By.XPath("//*[@id='tve_editor']/div"));
var cropArea = new Rectangle(element.Location, element.Size);
var bitmap = bmpScreen.Clone(cropArea, bmpScreen.PixelFormat);
bitmap.Save(fileName);
// Focus on a control
IWebElement link = driver.FindElement(By.PartialLinkText("Previous post"));
// Wait for visibility of an element
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
wait.Until(ExpectedConditions.VisibilityOfAllElementsLocatedBy(
By.XPath("//*[@id='tve_editor']/div[2]/div[2]/div/div")));
```

```csharp
// Navigate to a page
this.driver.Navigate().GoToUrl(@"http://google.com");
// Get the title of the page
string title = this.driver.Title;
// Get the current URL
string url = this.driver.Url;
// Get the current page HTML source
string html = this.driver.PageSource;
```

```csharp
/ Handle JavaScript pop-ups
IAlert a = driver.SwitchTo().Alert();
a.Accept();
a.Dismiss();
// Switch between browser windows or tabs
ReadOnlyCollection<string> windowHandles = driver.WindowHandles;
string firstTab = windowHandles.First();
string lastTab = windowHandles.Last();
driver.SwitchTo().Window(lastTab);
// Navigation history
this.driver.Navigate().Back();
this.driver.Navigate().Refresh();
this.driver.Navigate().Forward();
// Option 1.
link.SendKeys(string.Empty);
// Option 2.
((IJavaScriptExecutor)driver).ExecuteScript("arguments[0].focus();", link);
// Maximize window
this.driver.Manage().Window.Maximize();
// Add a new cookie
Cookie cookie = new OpenQA.Selenium.Cookie("key", "value");
this.driver.Manage().Cookies.AddCookie(cookie);
// Get all cookies
var cookies = this.driver.Manage().Cookies.AllCookies;
// Delete a cookie by name
this.driver.Manage().Cookies.DeleteCookieNamed("CookieName");
// Delete all cookies
this.driver.Manage().Cookies.DeleteAllCookies();
//Taking a full-screen screenshot
Screenshot screenshot = ((ITakesScreenshot)driver).GetScreenshot();
screenshot.SaveAsFile(@"pathToImage", ImageFormat.Png);
// Wait until a page is fully loaded via JavaScript
WebDriverWait wait = new WebDriverWait(this.driver, TimeSpan.FromSeconds(30));
wait.Until((x) =>
{
    return ((IJavaScriptExecutor)this.driver).ExecuteScript("return document.readyState").Equals("complete");
});
// Switch to frames
this.driver.SwitchTo().Frame(1);
this.driver.SwitchTo().Frame("frameName");
IWebElement element = this.driver.FindElement(By.Id("id"));
this.driver.SwitchTo().Frame(element);
// Switch to the default document
this.driver.SwitchTo().DefaultContent();
```

```csharp
// Use a specific Firefox profile
FirefoxProfileManager profileManager = new FirefoxProfileManager();
FirefoxProfile profile = profileManager.GetProfile("HARDDISKUSER");
IWebDriver driver = new FirefoxDriver(profile);
// Set a HTTP proxy Firefox
FirefoxProfile firefoxProfile = new FirefoxProfile();
firefoxProfile.SetPreference("network.proxy.type", 1);
firefoxProfile.SetPreference("network.proxy.http", "myproxy.com");
firefoxProfile.SetPreference("network.proxy.http_port", 3239);
IWebDriver driver = new FirefoxDriver(firefoxProfile);
// Set a HTTP proxy Chrome
ChromeOptions options = new ChromeOptions();
var proxy = new Proxy();
proxy.Kind = ProxyKind.Manual;
proxy.IsAutoDetect = false;
proxy.HttpProxy =
proxy.SslProxy = "127.0.0.1:3239";
options.Proxy = proxy;
options.AddArgument("ignore-certificate-errors");
IWebDriver driver = new ChromeDriver(options);
// Accept all certificates Firefox
FirefoxProfile firefoxProfile = new FirefoxProfile();
firefoxProfile.AcceptUntrustedCertificates = true;
firefoxProfile.AssumeUntrustedCertificateIssuer = false;
IWebDriver driver = new FirefoxDriver(firefoxProfile);
// Accept all certificates Chrome
DesiredCapabilities capability = DesiredCapabilities.Chrome();
Environment.SetEnvironmentVariable("webdriver.chrome.driver", "C:PathToChromeDriver.exe");
capability.SetCapability(CapabilityType.AcceptSslCertificates, true);
IWebDriver driver = new RemoteWebDriver(capability);
// Set Chrome options.
ChromeOptions options = new ChromeOptions();
DesiredCapabilities dc = DesiredCapabilities.Chrome();
dc.SetCapability(ChromeOptions.Capability, options);
IWebDriver driver = new RemoteWebDriver(dc);
// Turn off the JavaScript Firefox
FirefoxProfileManager profileManager = new FirefoxProfileManager();
FirefoxProfile profile = profileManager.GetProfile("HARDDISKUSER");
profile.SetPreference("javascript.enabled", false);
IWebDriver driver = new FirefoxDriver(profile);
// Set the default page load timeout
driver.Manage().Timeouts().SetPageLoadTimeout(new TimeSpan(10));
// Start Firefox with plugins
FirefoxProfile profile = new FirefoxProfile();
profile.AddExtension(@"C:extensionsLocationextension.xpi");
IWebDriver driver = new FirefoxDriver(profile);
// Start Chrome with an unpacked extension
ChromeOptions options = new ChromeOptions();
options.AddArguments("load-extension=/pathTo/extension");
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.SetCapability(ChromeOptions.Capability, options);
DesiredCapabilities dc = DesiredCapabilities.Chrome();
dc.SetCapability(ChromeOptions.Capability, options);
IWebDriver driver = new RemoteWebDriver(dc);
// Start Chrome with a packed extension
ChromeOptions options = new ChromeOptions();
options.AddExtension(Path.GetFullPath("localpathto/extension.crx"));
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.SetCapability(ChromeOptions.Capability, options);
DesiredCapabilities dc = DesiredCapabilities.Chrome();
dc.SetCapability(ChromeOptions.Capability, options);
IWebDriver driver = new RemoteWebDriver(dc);
// Change the default files??T save location
String downloadFolderPath = @"c:temp";
FirefoxProfile profile = new FirefoxProfile();
profile.SetPreference("browser.download.folderList", 2);
profile.SetPreference("browser.download.dir", downloadFolderPath);
profile.SetPreference("browser.download.manager.alertOnEXEOpen", false);
profile.SetPreference("browser.helperApps.neverAsk.saveToDisk",
"application/msword, application/binary, application/ris, text/csv, image/png, application/pdf,
text / html, text / plain, application / zip, application / x - zip, application / x - zip - compressed, application / download,
application / octet - stream");
this.driver = new FirefoxDriver(profile);
```

## WebDriver- Capture and Modify HTTP Traffic- C# Code

```csharp
private IWebDriver _driver;
private ProxyServer _proxyServer;
private readonly IDictionary<Guid, Proxy.Request> _requestsHistory =
new ConcurrentDictionary<Guid, Proxy.Request>();
private readonly IDictionary<Guid, Proxy.Response> _responsesHistory =
new ConcurrentDictionary<Guid, Proxy.Response>();
[OneTimeSetUp]
public void ClassInit()
{
    _proxyServer = new ProxyServer
    {
        TrustRootCertificate = true
    };
    var explicitEndPoint = new ExplicitProxyEndPoint(System.Net.IPAddress.Any, 18882, true);
    _proxyServer.AddEndPoint(explicitEndPoint);
    _proxyServer.Start();
    _proxyServer.SetAsSystemHttpProxy(explicitEndPoint);
    _proxyServer.SetAsSystemHttpsProxy(explicitEndPoint);
    _proxyServer.BeforeRequest += OnRequestCaptureTrafficEventHandler;
    _proxyServer.BeforeResponse += OnResponseCaptureTrafficEventHandler;
}
[OneTimeTearDown]
public void ClassCleanup()
{
    _proxyServer.Stop();
}
[SetUp]
public void TestInit()
{
    var proxy = new OpenQA.Selenium.Proxy
    {
        HttpProxy = "http://localhost:18882",
        SslProxy = "http://localhost:18882",
        FtpProxy = "http://localhost:18882"
    };
    var options = new ChromeOptions
    {
        Proxy = proxy
    };
    _driver = new ChromeDriver(options);
}
[TearDown]
public void TestCleanup()
{
    _driver.Dispose();
    _requestsHistory.Clear();
    _responsesHistory.Clear();
}
```

```csharp
private async Task OnRequestCaptureTrafficEventHandler(object sender, SessionEventArgs e) => await Task.Run(
() =>
{
    if (!_requestsHistory.ContainsKey(e.HttpClient.Request.GetHashCode()) && e.HttpClient != null && e.HttpClient.Request != null)
    {
        _requestsHistory.Add(e.HttpClient.Request.GetHashCode(), e.HttpClient.Request);
    }
});
```

```csharp
private async Task OnRequestBlockResourceEventHandler(object sender, SessionEventArgs e)
=> await Task.Run(
() =>
{
    if (e.HttpClient.Request.RequestUri.ToString().Contains("analytics"))
    {
        string customBody = string.Empty;
        e.Ok(Encoding.UTF8.GetBytes(customBody));
    }
});
```

```csharp
private async Task OnRequestRedirectTrafficEventHandler(object sender, SessionEventArgs e)
{
    if (e.WebSession.Request.RequestUri.AbsoluteUri.Contains("logo.svg"))
    {
        await e.Redirect("https://automatetheplanet.com/wp-content/uploads/2016/12/homepage-img-1.svg");
    }
}
```

```csharp
private async Task OnRequestModifyTrafficEventHandler(object sender, SessionEventArgs e)
=> await Task.Run(
() =>
{
    var method = e.HttpClient.Request.Method.ToUpper();
    if ((method == "POST" || method == "PUT" || method == "PATCH" || method == "GET"))
    {
        //Get/Set request body bytes
        byte[] bodyBytes = e.GetRequestBody().Result;
        e.SetRequestBody(bodyBytes);
        //Get/Set request body as string
        string bodyString = e.GetRequestBodyAsString().Result;
        e.SetRequestBodyString(bodyString);
    }
});
```

```csharp
private async Task OnResponseCaptureTrafficEventHandler(object sender, SessionEventArgs e) => await Task.Run(
() =>
{
    if (!_responsesHistory.ContainsKey(e.HttpClient.Response.GetHashCode()) && e.HttpClient != null && e.HttpClient.Response != null)
    {
        _responsesHistory.Add(e.HttpClient.Response.GetHashCode(), e.HttpClient.Response);
    }
});
```

```csharp
private async Task OnResponseModifyTrafficEventHandler(object sender, SessionEventArgs e) => await Task.Run(
() =>
{
    if (e.HttpClient.Request.Method == "GET" || e.HttpClient.Request.Method == "POST")
    {
        if (e.HttpClient.Response.StatusCode == 200)
        {
            if (e.HttpClient.Response.ContentType != null && e.HttpClient.Response.ContentType.Trim().ToLower().Contains("text/html"))
            {
                byte[] bodyBytes = e.GetResponseBody().Result;
                e.SetResponseBody(bodyBytes);
                string body = e.GetResponseBodyAsString().Result;
                e.SetResponseBodyString(body);
            }
        }
    }
});
```

```csharp
[Test]
public void FontRequestMade_When_NavigateToHomePage()
{
    _driver.Navigate().GoToUrl("https://automatetheplanet.com/");
    AssertRequestMade("fontawesome-webfont.woff2?v=4.7.0");
}
private void AssertRequestMade(string url)
{
    bool areRequestsMade = _requestsHistory.Values.Any(r => r.RequestUri.ToString().Contains(url));
    Assert.IsTrue(areRequestsMade);
}
```

```csharp
[Test]
public void NoErrorCodes_When_NavigateToHomePage()
{
    _driver.Navigate().GoToUrl("https://automatetheplanet.com/");
    AssertNoErrorCodes();
}
private void AssertNoErrorCodes()
{
    bool areThereErrorCodes = _responsesHistory.Values.Any(r => r.StatusCode > 400 && r.StatusCode < 599);
    Assert.IsFalse(areThereErrorCodes);
}
```

```csharp
[Test]
public void TestNoLargeImages_When_NavigateToHomePage()
{
    _driver.Navigate().GoToUrl("https://automatetheplanet.com/");
    AssertNoLargeImagesRequested();
}
private void AssertNoLargeImagesRequested()
{
    bool areThereLargeImages =
    _requestsHistory.Values.Any(r =>
    r.ContentType != null
    && r.ContentType.StartsWith("image")
    && r.ContentLength < 40000);
    Assert.IsFalse(areThereLargeImages);
}
```

## Headless Execution of WebDriver Tests- Firefox Browser

```csharp
var options = new FirefoxOptions();
options.AddArguments("--headless");
using (IWebDriver driver = new FirefoxDriver(options))
{
    // the rest of your test
}
```

```csharp
private void PerformTestOperations(IWebDriver driver)
{
    string testPagePath =
    "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    driver.Navigate().GoToUrl(testPagePath);
    driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(10);
    driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    var textBoxes = driver.FindElements(By.Name("fname"));
    foreach (var textBox in textBoxes)
    {
        textBox.SendKeys(Guid.NewGuid().ToString());
    }
    var selects = driver.FindElements(By.TagName("select"));
    foreach (var select in selects)
    {
        var selectElement = new SelectElement(select);
        selectElement.SelectByText("Mercedes");
    }
    var submits = driver.FindElements(By.XPath("//input[@type='submit']"));
    foreach (var submit in submits)
    {
        submit.Click();
    }
    var colors = driver.FindElements(By.XPath("//input[@type='color']"));
    foreach (var color in colors)
    {
        SetValueAttribute(driver, color, "#000000");
    }
    var dates = driver.FindElements(By.XPath("//input[@type='date']"));
    foreach (var date in dates)
    {
        SetValueAttribute(driver, date, "2020-06-01");
    }
    var radioButtons = driver.FindElements(By.XPath("//input[@type='radio']"));
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
private void Profile(string testResultsFileName, int iterations, Action actionToProfile)
{
    var desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
    var resultsPath = Path.Combine(desktopPath, "BenchmarkTestResults",
    string.Concat(testResultsFileName, "_", Guid.NewGuid().ToString(), ".txt"));
    var writer = new StreamWriter(resultsPath);
    GC.Collect();
    GC.WaitForPendingFinalizers();
    GC.Collect();
    var watch = new Stopwatch();
    watch.Start();
    for (var i = 0; i < iterations; i++)
    {
        actionToProfile();
    }
    watch.Stop();
    writer.WriteLine("Total: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
    watch.ElapsedMilliseconds, watch.ElapsedTicks, iterations);
    var avgElapsedMillisecondsPerRun = watch.ElapsedMilliseconds / iterations;
    var avgElapsedTicksPerRun = watch.ElapsedMilliseconds / iterations;
    writer.WriteLine("AVG: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
    avgElapsedMillisecondsPerRun, avgElapsedTicksPerRun, iterations);
    writer.Flush();
    writer.Close();
}
```

```csharp
[Test]
public void TestChromeExecutionTime()
{
    Profile
    (
    "TestChromeExecutionTime",
    10,
    () =>
    {
        using (IWebDriver driver = new ChromeDriver())
        {
            PerformTestOperations(driver);
        }
    }
    );
}
[Test]
public void TestFirefoxExecutionTime()
{
    Profile
    (
    "TestFirefoxExecutionTime",
    10,
    () =>
    {
        using (IWebDriver driver = new FirefoxDriver())
        {
            PerformTestOperations(driver);
        }
    }
    );
}
[Test]
public void TestEdgeExecutionTime()
{
    Profile
    (
    "TestEdgeExecutionTime",
    10,
    () =>
    {
        using (IWebDriver driver = new EdgeDriver())
        {
            PerformTestOperations(driver);
        }
    }
    );
}
[Test]
public void TestPhantomJsExecutionTime()
{
    Profile
    (
    "TestPhantomJsExecutionTime",
    10,
    () =>
    {
        using (IWebDriver driver = new PhantomJSDriver())
        {
            PerformTestOperations(driver);
        }
    }
    );
}
[Test]
public void TestChromeHeadlessExecutionTime()
{
    Profile
    (
    "TestChromeHeadlessExecutionTime",
    10,
    () =>
    {
        var options = new ChromeOptions();
        options.AddArguments("headless");
        using (IWebDriver driver = new ChromeDriver(options))
        {
            PerformTestOperations(driver);
        }
    }
    );
}
[Test]
public void TestFirefoxHeadlessExecutionTime()
{
    Profile
    (
    "TestFirefoxHeadlessExecutionTime",
    10,
    () =>
    {
        var options = new FirefoxOptions();
        options.AddArguments("--headless");
        using (IWebDriver driver = new FirefoxDriver(options))
        {
            PerformTestOperations(driver);
        }
    }
    );
}
```

## Finish Him- Kill All the WebDrivers C# Code

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser) => _driver = browser;
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        SearchBox = textToType;
        GoButton.Click();
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement GoButton => _driver.FindElement(By.Id("sb_form_go"));
    public IWebElement ResultsCountDiv => _driver.FindElement(By.Id("b_tween"));
    public string SearchBox
    {
        get => _driver.FindElement(By.Id("sb_form_q")).Text;
        set => _driver.FindElement(By.Id("sb_form_q")).SendKeys(value);
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(ResultsCountDiv.Text, expectedCount);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void TestInit()
    {
        _driver = new ChromeDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private static IWebDriver _driver;
    [AssemblyInitialize]
    public static void AssemblyInitialize(TestContext testContext)
    {
        DisposeDriverService.TestRunStartTime = DateTime.Now;
        _driver = new ChromeDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [AssemblyCleanup]
    public static void AssemblyCleanUp()
    {
        DisposeDriverService.FinishHim(_driver);
    }
    [TestMethod]
    public void SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
}
```

```csharp
public static class DisposeDriverService
{
    private static readonly List<string> _processesToCheck = new List<string> {
    "opera",    "chrome",    "firefox", "ie",
    "gecko",    "phantomjs", "edge",    "microsoftwebdriver",
    "webdriver"
  };
    public static DateTime? TestRunStartTime { get; set; }
    public static void FinishHim(IWebDriver driver)
    {
        driver?.Dispose();
        var processes = Process.GetProcesses();
        foreach (var process in processes)
        {
            try
            {
                Debug.WriteLine(process.ProcessName);
                if (process.StartTime > TestRunStartTime)
                {
                    var shouldKill = false;
                    foreach (var processName in _processesToCheck)
                    {
                        if (process.ProcessName.ToLower().Contains(processName))
                        {
                            shouldKill = true;
                            break;
                        }
                    }
                    if (shouldKill)
                    {
                        process.Kill();
                    }
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
        }
    }
}
```

## Headless Execution of WebDriver Tests- Chrome Browser

```csharp
var options = new ChromeOptions();
options.AddArguments("headless");
using (IWebDriver driver = new ChromeDriver(options))
{
    // the rest of your test
}
```

```csharp
private void PerformTestOperations(IWebDriver driver)
{
    string testPagePath =
        "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    driver.Navigate().GoToUrl(testPagePath);
    driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(10);
    driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    var textBoxes = driver.FindElements(By.Name("fname"));
    foreach (var textBox in textBoxes)
    {
        textBox.SendKeys(Guid.NewGuid().ToString());
    }
    var selects = driver.FindElements(By.TagName("select"));
    foreach (var select in selects)
    {
        var selectElement = new SelectElement(select);
        selectElement.SelectByText("Mercedes");
    }
    var submits = driver.FindElements(By.XPath("//input[@type='submit']"));
    foreach (var submit in submits)
    {
        submit.Click();
    }
    var colors = driver.FindElements(By.XPath("//input[@type='color']"));
    foreach (var color in colors)
    {
        SetValueAttribute(driver, color, "#000000");
    }
    var dates = driver.FindElements(By.XPath("//input[@type='date']"));
    foreach (var date in dates)
    {
        SetValueAttribute(driver, date, "2020-06-01");
    }
    var radioButtons = driver.FindElements(By.XPath("//input[@type='radio']"));
    foreach (var radio in radioButtons)
    {
        radio.Click();
    }
}
private void SetValueAttribute(IWebDriver driver, IWebElement element,
                               string value)
{
    SetAttribute(driver, element, "value", value);
}
private void SetAttribute(IWebDriver driver, IWebElement element,
                          string attributeName, string attributeValue)
{
    driver.ExecuteJavaScript(
        "arguments[0].setAttribute(arguments[1], arguments[2]);", element,
        attributeName, attributeValue);
}
```

```csharp
private void PerformTestOperations(IWebDriver driver)
{
    string testPagePath =
        "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    driver.Navigate().GoToUrl(testPagePath);
    driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(10);
    driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    var textBoxes = driver.FindElements(By.Name("fname"));
    foreach (var textBox in textBoxes)
    {
        textBox.SendKeys(Guid.NewGuid().ToString());
    }
    var selects = driver.FindElements(By.TagName("select"));
    foreach (var select in selects)
    {
        var selectElement = new SelectElement(select);
        selectElement.SelectByText("Mercedes");
    }
    var submits = driver.FindElements(By.XPath("//input[@type='submit']"));
    foreach (var submit in submits)
    {
        submit.Click();
    }
    var colors = driver.FindElements(By.XPath("//input[@type='color']"));
    foreach (var color in colors)
    {
        SetValueAttribute(driver, color, "#000000");
    }
    var dates = driver.FindElements(By.XPath("//input[@type='date']"));
    foreach (var date in dates)
    {
        SetValueAttribute(driver, date, "2020-06-01");
    }
    var radioButtons = driver.FindElements(By.XPath("//input[@type='radio']"));
    foreach (var radio in radioButtons)
    {
        radio.Click();
    }
}
private void SetValueAttribute(IWebDriver driver, IWebElement element,
                               string value)
{
    SetAttribute(driver, element, "value", value);
}
private void SetAttribute(IWebDriver driver, IWebElement element,
                          string attributeName, string attributeValue)
{
    driver.ExecuteJavaScript(
        "arguments[0].setAttribute(arguments[1], arguments[2]);", element,
        attributeName, attributeValue);
}
```

```csharp
[Test]
public void TestChromeExecutionTime()
{
    Profile("TestChromeExecutionTime", 10, () =>
    {
        using (IWebDriver driver = new ChromeDriver())
        {
            PerformTestOperations(driver);
        }
    });
}
[Test]
public void TestFirefoxExecutionTime()
{
    Profile("TestFirefoxExecutionTime", 10, () =>
    {
        using (IWebDriver driver = new FirefoxDriver())
        {
            PerformTestOperations(driver);
        }
    });
}
[Test]
public void TestEdgeExecutionTime()
{
    Profile("TestEdgeExecutionTime", 10, () =>
    {
        using (IWebDriver driver = new EdgeDriver())
        {
            PerformTestOperations(driver);
        }
    });
}
[Test]
public void TestPhantomJsExecutionTime()
{
    Profile("TestPhantomJsExecutionTime", 10, () =>
    {
        using (IWebDriver driver = new PhantomJSDriver())
        {
            PerformTestOperations(driver);
        }
    });
}
[Test]
public void TestChromeHeadlessExecutionTime()
{
    Profile("TestChromeHeadlessExecutionTime", 10, () =>
    {
        var options = new ChromeOptions();
        options.AddArguments("headless");
        using (IWebDriver driver = new ChromeDriver(options))
        {
            PerformTestOperations(driver);
        }
    });
}
```

## Full Page Screenshots in WebDriver via Custom-built Browser Extension

```csharp
[Test]
public void TakingHTML2CanvasFullPageScreenshot()
{
    using (var driver = new ChromeDriver())
    {
        driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(5);
        driver.Navigate().GoToUrl(@"https://automatetheplanet.com");
        IJavaScriptExecutor js = driver;
        var html2canvasJs = File.ReadAllText($"{GetAssemblyDirectory()}html2canvas.js");
        js.ExecuteScript(html2canvasJs);
        string generateScreenshotJS =
        @"function genScreenshot () {
var canvasImgContentDecoded;
html2canvas(document.body).then(function(canvas) {
window.canvasImgContentDecoded = canvas.toDataURL(""image/png"");
});
}
genScreenshot();";
        js.ExecuteScript(generateScreenshotJS);
        var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        wait.IgnoreExceptionTypes(typeof(InvalidOperationException));
        wait.Until(
        wd =>
        {
            string response = (string)js.ExecuteScript
    ("return (typeof canvasImgContentDecoded === 'undefined' || canvasImgContentDecoded === null)");
            if (string.IsNullOrEmpty(response))
            {
                return false;
            }
            return bool.Parse(response);
        });
        wait.Until(wd => !string.IsNullOrEmpty((string)js.ExecuteScript("return canvasImgContentDecoded;")));
        var pngContent = (string)js.ExecuteScript("return canvasImgContentDecoded;");
        pngContent = pngContent.Replace("data:image/png;base64,", string.Empty);
        var tempFilePath = Path.GetTempFileName().Replace(".tmp", ".png");
        File.WriteAllBytes(tempFilePath, Convert.FromBase64String(pngContent));
    }
}
private string GetAssemblyDirectory()
{
    string codeBase = Assembly.GetExecutingAssembly().Location;
    var uri = new UriBuilder(codeBase);
    string path = Uri.UnescapeDataString(uri.Path);
    return Path.GetDirectoryName(path);
}
```

```csharp
[Test]
public void TakingHTML2CanvasFullPageScreenshot()
{
    var options = new ChromeOptions();
    options.AddArguments($"load-extension={GetAssemblyDirectory()}FullPageScreenshotsExtension-Chrome");
    var capabilities = new DesiredCapabilities();
    capabilities.SetCapability(ChromeOptions.Capability, options);
    var dc = DesiredCapabilities.Chrome();
    dc.SetCapability(ChromeOptions.Capability, options);
    using (var driver = new ChromeDriver(options))
    {
        driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(5);
        driver.Navigate().GoToUrl(@"https://automatetheplanet.com");
        var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        var fullPageImg = wait.Until(ExpectedConditions.ElementExists(By.Id("fullPageScreenshotId")));
        var pngContent = fullPageImg.GetAttribute("src");
        pngContent = pngContent.Replace("data:image/png;base64,", string.Empty);
        byte[] data = Convert.FromBase64String(pngContent);
        var tempFilePath = Path.GetTempFileName().Replace(".tmp", ".png");
        Image image;
        using (var ms = new MemoryStream(data))
        {
            image = Image.FromStream(ms);
        }
        image.Save(tempFilePath, ImageFormat.Png);
    }
}
private string GetAssemblyDirectory()
{
    string codeBase = Assembly.GetExecutingAssembly().CodeBase;
    var uri = new UriBuilder(codeBase);
    string path = Uri.UnescapeDataString(uri.Path);
    return Path.GetDirectoryName(path);
}
```

```csharp
var options = new ChromeOptions();
options.AddArguments($"load-extension={GetAssemblyDirectory()}FullPageScreenshotsExtension-Chrome");
var capabilities = new DesiredCapabilities();
capabilities.SetCapability(ChromeOptions.Capability, options);
var dc = DesiredCapabilities.Chrome();
dc.SetCapability(ChromeOptions.Capability, options);
```

```ps1
rd /s /q "$(TargetDir)"

```

```ps1
xcopy $(ProjectDir)FullPageScreenshotsExtension-Chrome* $(ProjectDir)$(OutDir)FullPageScreenshotsExtension-Chrome /Y /I /E
```

```ps1
xcopy $(ProjectDir)FullPageScreenshotsExtension-Edge* $(ProjectDir)$(OutDir)FullPageScreenshotsExtension-Edge /Y /I /E


```

```ps1
xcopy $(ProjectDir)FullPageScreenshotsExtension-Firefox* $(ProjectDir)$(OutDir)FullPageScreenshotsExtension-Firefox /Y /I /E

```

```csharp
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
var fullPageImg = wait.Until(ExpectedConditions.ElementExists(By.Id("fullPageScreenshotId")));
var pngContent = fullPageImg.GetAttribute("src");
```

```json
{
  "name": "WebDriver Full Page Screenshots",
  "version": "0.0.2",
  "manifest_version": 2,
  "description": "Used to create full page screenshots in Selenium WebDriver tests.",
  "background": {
    "scripts": ["background.js"],
    "persistent": true
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["contentScript.js"]
    }
  ],
  "browser_action": {
    "default_title": "WebDriver Full Page Screenshots"
  },
  "permissions": ["https://*/*", "http://*/*", "tabs", "<all_urls>"]
}
```

```csharp
chrome.runtime.sendMessage({ greeting: "screenshot" });

```

```csharp
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting == "screenshot")
    {
        chrome.tabs.query(
        { currentWindow: true, active: true },
      function(tabArray) {
            chrome.tabs.executeScript(tabArray[0].id, { file: "html2canvas.js" });
        }
    );
    }
});
```

```csharp
// ...
// all of the rest HTML2Canvas.js
(function() {
    html2canvas(document.body, {
    onrendered: function(canvas) {
            var img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");
            img.style.visibility = "hidden";
            img.id = "fullPageScreenshotId";
            document.body.appendChild(img);
        },
  });
})();
```

## Capture Full Page Screenshots Using WebDriver with HTML2Canvas.js

```csharp
[Test]
public void TakingWebDriverScreenshot()
{
    using (var driver = new InternetExplorerDriver())
    {
        driver.Navigate().GoToUrl(@"https://automatetheplanet.com");
        var screenshot = ((ITakesScreenshot)driver).GetScreenshot();
        var tempFilePath = Path.GetTempFileName().Replace(".tmp", ".png");
        screenshot.SaveAsFile(tempFilePath, ScreenshotImageFormat.Png);
    }
}
```

```csharp
[Test]
public void TakingHTML2CanvasFullPageScreenshot()
{
    using (var driver = new ChromeDriver())
    {
        driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(5);
        driver.Navigate().GoToUrl(@"https://automatetheplanet.com");
        IJavaScriptExecutor js = driver;
        var html2canvasJs = File.ReadAllText($"{GetAssemblyDirectory()}html2canvas.js");
        js.ExecuteScript(html2canvasJs);
        string generateScreenshotJS =
        @"function genScreenshot () {
var canvasImgContentDecoded;
html2canvas(document.body).then(function(canvas) {
window.canvasImgContentDecoded = canvas.toDataURL(""image/png"");
});
}
genScreenshot();";
        js.ExecuteScript(generateScreenshotJS);
        var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        wait.IgnoreExceptionTypes(typeof(InvalidOperationException));
        wait.Until(
        wd =>
        {
            string response = (string)js.ExecuteScript
    ("return (typeof canvasImgContentDecoded === 'undefined' || canvasImgContentDecoded === null)");
            if (string.IsNullOrEmpty(response))
            {
                return false;
            }
            return bool.Parse(response);
        });
        wait.Until(wd => !string.IsNullOrEmpty((string)js.ExecuteScript("return canvasImgContentDecoded;")));
        var pngContent = (string)js.ExecuteScript("return canvasImgContentDecoded;");
        pngContent = pngContent.Replace("data:image/png;base64,", string.Empty);
        var tempFilePath = Path.GetTempFileName().Replace(".tmp", ".png");
        File.WriteAllBytes(tempFilePath, Convert.FromBase64String(pngContent));
    }
}
private string GetAssemblyDirectory()
{
    string codeBase = Assembly.GetExecutingAssembly().Location;
    var uri = new UriBuilder(codeBase);
    string path = Uri.UnescapeDataString(uri.Path);
    return Path.GetDirectoryName(path);
}
```

```csharp
IJavaScriptExecutor js = driver;
var html2canvasJs = File.ReadAllText($"{GetAssemblyDirectory()}html2canvas.js");
js.ExecuteScript(html2canvasJs);
```

```javascript
function genScreenshot(){
    var canvasImgContentDecoded;
    html2canvas(document.body).then(function(canvas) {
        window.canvasImgContentDecoded = canvas.toDataURL(""image / png"");
    });
  }
  genScreenshot();

```

```csharp
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
wait.IgnoreExceptionTypes(typeof(InvalidOperationException));
wait.Until(
wd =>
{
    string response = (string)js.ExecuteScript
    ("return (typeof canvasImgContentDecoded === 'undefined' || canvasImgContentDecoded === null)");
    if (string.IsNullOrEmpty(response))
    {
        return false;
    }
    return bool.Parse(response);
});
wait.Until(wd => !string.IsNullOrEmpty((string)js.ExecuteScript("return canvasImgContentDecoded;")));
var pngContent = (string)js.ExecuteScript("return canvasImgContentDecoded;");
```

```csharp
var pngContent = (string)js.ExecuteScript("return canvasImgContentDecoded;");

```

```csharp
var pngContent = (string)js.ExecuteScript("return canvasImgContentDecoded;");

```

## Selenium WebDriver + .NET 5.0 – What Everyone Ought to Know

```xml
<PackageReference Include="Selenium.Support" Version="3.141.0" />
<PackageReference Include="Selenium.WebDriver" Version="3.141.0" />
<PackageReference Include="DotNetSeleniumExtras.PageObjects.Core" Version="3.12.0" />
<PackageReference Include="DotNetSeleniumExtras.WaitHelpers" Version="3.11.0" />
<PackageReference Include="Selenium.WebDriver.ChromeDriver" Version="*" />
<PackageReference Include="Selenium.Firefox.WebDriver" Version="*" />
```

```xml
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="*" />
<PackageReference Include="NUnit" Version="*" />
<PackageReference Include="NUnit3TestAdapter" Version="*">
<PrivateAssets>all</PrivateAssets>
<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
</PackageReference>
```

```xml
<PackageReference Include="Selenium.Support" Version="3.141.0" />
<PackageReference Include="Selenium.WebDriver" Version="3.141.0" />
<PackageReference Include="DotNetSeleniumExtras.PageObjects.Core" Version="3.12.0" />
<PackageReference Include="DotNetSeleniumExtras.WaitHelpers" Version="3.11.0" />
<PackageReference Include="Selenium.WebDriver.ChromeDriver" Version="*" />
<PackageReference Include="Selenium.Firefox.WebDriver" Version="*" />
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="*" />
<PackageReference Include="MSTest.TestAdapter" Version="*" />
<PackageReference Include="MSTest.TestFramework" Version="*" />
<PackageReference Include="xunit" Version="*" />
<PackageReference Include="xunit.runner.visualstudio" Version="*" />
<PackageReference Include="NUnit" Version="*" />
<PackageReference Include="NUnit3TestAdapter" Version="*">
<PrivateAssets>all</PrivateAssets>
<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
</PackageReference>
```

```csharp
[Test]
public void TestWithFirefoxDriver()
{
    using (var driver = new FirefoxDriver())
    {
        driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
        var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
        var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
        ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
        var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
        var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
        clickableElement.Click();
    }
}
```

```csharp
[Test]
public void TestWithChromeDriver()
{
    using (var driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
    {
        driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
        var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
        var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
        ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
        var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
        var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
        clickableElement.Click();
    }
}
```

```csharp
[Test]
public void TestWithEdgeDriver()
{
    using (var driver = new EdgeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
    {
        driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
        var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
        var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
        ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
        var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
        var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
        clickableElement.Click();
    }
}
```

```csharp
[TestClass]
public class AutomateThePlanetTestsMsTest
{
    [TestMethod]
    public void TestWithFirefoxDriver()
    {
        using (var driver = new FirefoxDriver())
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
    [TestMethod]
    public void TestWithEdgeDriver()
    {
        using (var driver = new EdgeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
    [TestMethod]
    public void TestWithChromeDriver()
    {
        using (var driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
}
```

```csharp
[TestFixture]
public class AutomateThePlanetTests
{
    [Test]
    public void TestWithFirefoxDriver()
    {
        using (var driver = new FirefoxDriver())
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
    [Test]
    public void TestWithEdgeDriver()
    {
        using (var driver = new EdgeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
    [Test]
    public void TestWithChromeDriver()
    {
        using (var driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
}
```

```csharp
public class AutomateThePlanetTestsXUnit
{
    [Fact]
    public void TestWithFirefoxDriver()
    {
        using (var driver = new FirefoxDriver())
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
    [Fact]
    public void TestWithEdgeDriver()
    {
        using (var driver = new EdgeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
    [Fact]
    public void TestWithChromeDriver()
    {
        using (var driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
        {
            driver.Navigate().GoToUrl(@"https://automatetheplanet.com/multiple-files-page-objects-item-templates/");
            var link = driver.FindElement(By.PartialLinkText("TFS Test API"));
            var jsToBeExecuted = $"window.scroll(0, {link.Location.Y});";
            ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
            var wait = new WebDriverWait(driver, TimeSpan.FromMinutes(1));
            var clickableElement = wait.Until(ExpectedConditions.ElementToBeClickable(By.PartialLinkText("TFS Test API")));
            clickableElement.Click();
        }
    }
}
```

```ps1
dotnet test --logger=trx
```

## Most Exhaustive WebDriver Locators Cheat Sheet

```csharp
_driver.FindElement(By.Id("userName"));
_driver.FindElement(By.ClassName("panel other"));
_driver.FindElement(By.CssSelector("#userName"));
_driver.FindElement(By.LinkText("Automate The Planet"));
_driver.FindElement(By.Name("webDriverCheatSheet"));
_driver.FindElement(By.PartialLinkText("Automate"));
_driver.FindElement(By.TagName("a"));
_driver.FindElement(By.XPath("//*[@id='panel']/div/h1"));
```

```csharp
[FindsBy(How = How.Id, Using = "userName")]
[FindsBy(How = How.ClassName, Using = "panel other")]
[FindsBy(How = How.CssSelector, Using = "#userName")]
[FindsBy(How = How.LinkText, Using = "Automate The Planet")]
[FindsBy(How = How.Name, Using = "webDriverCheatSheet")]
[FindsBy(How = How.PartialLinkText, Using = "Automate")]
[FindsBy(How = How.TagName, Using = "a")]
[FindsBy(How = How.XPath, Using = "//*[@id='panel']/div/h1")]
private IWebElement _myElement;
```

## Enhanced Selenium WebDriver Tests with the New Improved C# 6.0

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver driver;
    public SearchEngineMainPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    public string Url
    {
        get
        {
            return @"searchEngineUrl";
        }
    }
    [FindsBy(How = How.Id, Using = "sb_form_q")]
    public IWebElement SearchBox { get; set; }
    [FindsBy(How = How.Id, Using = "sb_form_go")]
    public IWebElement GoButton { get; set; }
    [FindsBy(How = How.Id, Using = "b_tween")]
    public IWebElement ResultsCountDiv { get; set; }
    public void Navigate()
    {
        this.driver.Navigate().GoToUrl(this.Url);
    }
    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }
    public void AssertResultsCount(string expectedCount)
    {
        Assert.AreEqual(this.ResultsCountDiv.Text, expectedCount);
    }
}
```

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    public string Url => @"searchEngineUrl";
    [FindsBy(How = How.Id, Using = "sb_form_q")]
    public IWebElement SearchBox { get; set; }
    [FindsBy(How = How.Id, Using = "sb_form_go")]
    public IWebElement GoButton { get; set; }
    [FindsBy(How = How.Id, Using = "b_tween")]
    public IWebElement ResultsCountDiv { get; set; }
    public void Navigate() => this.driver.Navigate().GoToUrl(this.url);
    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(this.ResultsCountDiv.Text, expectedCount);
}
```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement SearchBox
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_q"));
        }
    }
    public IWebElement GoButton
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_go"));
        }
    }
    public IWebElement ResultsCountDiv
    {
        get
        {
            return this.driver.FindElement(By.Id("b_tween"));
        }
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement SearchBox => this.driver.FindElement(By.Id("sb_form_q"));
    public IWebElement GoButton => this.driver.FindElement(By.Id("sb_form_go"));
    public IWebElement ResultsCountDiv => this.driver.FindElement(By.Id("b_tween"));
}
```

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver driver;
    public SearchEngineMainPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    public string Url => @"searchEngineUrl";
    public void Navigate() => this.driver.Navigate().GoToUrl(this.Url);
    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }
}
```

```csharp
public class Client
{
    public Client(string firstName, string lastName, string email, string password)
    {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Password = password;
    }
    public Client()
    {
        this.FirstName = "Default First Name";
        this.LastName = "Default Last Name";
        this.Email = "myDefaultClientEmail@gmail.com";
        this.Password = "12345";
    }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
```

```csharp
public class Client
{
    public Client(string firstName, string lastName, string email, string password)
    {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Password = password;
    }
    public string FirstName { get; set; } = "Default First Name";
    public string LastName { get; set; } = "Default Last Name";
    public string Email { get; set; } = "myDefaultClientEmail@gmail.com";
    public string Password { get; set; } = "12345";
}
```

```csharp
public void Login(string email, string password)
{
    if (string.IsNullOrEmpty(email))
    {
        throw new ArgumentException("Email cannot be null or empty.");
    }
    if (string.IsNullOrEmpty(password))
    {
        throw new ArgumentException("Password cannot be null or empty.");
    }
    // login the user
}
```

```csharp
public void Login(string email, string password)
{
    if (string.IsNullOrEmpty(email))
    {
        throw new ArgumentException(nameof(email) + " cannot be null or empty.");
    }
    if (string.IsNullOrEmpty(password))
    {
        throw new ArgumentException(nameof(password) + " cannot be null or empty.");
    }
    // login the user
}
```

```csharp
public partial class ShippingAddressPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"onlineStoreUrlshippingPage";
    public ShippingAddressPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    // some other actions
    private void FillAddressInfoInternal(ClientPurchaseInfo clientInfo)
    {
        this.Country.SelectByText(clientInfo.Country);
        this.FullName.SendKeys(clientInfo.FullName);
        this.Address.SendKeys(clientInfo.Address);
        this.City.SendKeys(clientInfo.City);
        this.Zip.SendKeys(clientInfo.Zip == null ? string.Empty : clientInfo.Zip);
        this.Phone.SendKeys(clientInfo.Phone == null ? string.Empty : clientInfo.Phone);
        this.Vat.SendKeys(clientInfo.Vat == null ? string.Empty : clientInfo.Vat);
    }
}
```

```csharp
public partial class ShippingAddressPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"onlineStoreUrlshippingPage";
    public ShippingAddressPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    // some other actions
    private void FillAddressInfoInternal(ClientPurchaseInfo clientInfo)
    {
        this.Country.SelectByText(clientInfo.Country);
        this.FullName.SendKeys(clientInfo.FullName);
        this.Address.SendKeys(clientInfo.Address);
        this.City.SendKeys(clientInfo.City);
        this.Zip.SendKeys(clientInfo?.Zip ?? string.Empty);
        this.Phone.SendKeys(clientInfo?.Phone ?? string.Empty);
        this.Vat.SendKeys(clientInfo?.Vat ?? string.Empty);
    }
}
```

```csharp
public class RegistrationPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"http://www.automatetheplanet.com/register";
    public RegistrationPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    [FindsBy(How = How.Id, Using = "emailId")]
    public IWebElement Email { get; set; }
    [FindsBy(How = How.Id, Using = "passId")]
    public IWebElement Pass { get; set; }
    [FindsBy(How = How.Id, Using = "userNameId")]
    public IWebElement UserName { get; set; }
    [FindsBy(How = How.Id, Using = "registerBtnId")]
    public IWebElement RegisterButton { get; set; }
    public User RegisterUser(string email = null, string password = null, string userName = null)
    {
        var user = new User();
        this.driver.Navigate().GoToUrl(this.url);
        if (string.IsNullOrEmpty(email))
        {
            email = UniqueEmailGenerator.BuildUniqueEmailTimestamp();
        }
        user.Email = email;
        this.Email.SendKeys(email);
        if (string.IsNullOrEmpty(password))
        {
            password = TimestampBuilder.GenerateUniqueText();
        }
        user.Pass = password;
        this.Pass.SendKeys(password);
        if (string.IsNullOrEmpty(userName))
        {
            userName = TimestampBuilder.GenerateUniqueText();
        }
        user.UserName = userName;
        this.UserName.SendKeys(userName);
        this.RegisterButton.Click();
        return user;
    }
}
```

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
using static WebDriverTestsCSharpSix.CSharpSix.StaticUsingSyntax.TimestampBuilder;
using static WebDriverTestsCSharpSix.CSharpSix.StaticUsingSyntax.UniqueEmailGenerator;
namespace WebDriverTestsCSharpSix.CSharpSix.StaticUsingSyntax
{
    public class RegistrationPage
    {
        private readonly IWebDriver driver;
        private readonly string url = @"http://www.automatetheplanet.com/register";
        public RegistrationPage(IWebDriver browser)
        {
            this.driver = browser;
            PageFactory.InitElements(browser, this);
        }
        [FindsBy(How = How.Id, Using = "emailId")]
        public IWebElement Email { get; set; }
        [FindsBy(How = How.Id, Using = "passId")]
        public IWebElement Pass { get; set; }
        [FindsBy(How = How.Id, Using = "userNameId")]
        public IWebElement UserName { get; set; }
        [FindsBy(How = How.Id, Using = "registerBtnId")]
        public IWebElement RegisterButton { get; set; }
        public User RegisterUser(string email = null, string password = null, string userName = null)
        {
            var user = new User();
            this.driver.Navigate().GoToUrl(this.url);
            if (string.IsNullOrEmpty(email))
            {
                email = BuildUniqueEmailTimestamp();
            }
            user.Email = email;
            this.Email.SendKeys(email);
            if (string.IsNullOrEmpty(password))
            {
                password = GenerateUniqueText();
            }
            user.Pass = password;
            this.Pass.SendKeys(password);
            if (string.IsNullOrEmpty(userName))
            {
                userName = GenerateUniqueText();
            }
            user.UserName = userName;
            this.UserName.SendKeys(userName);
            this.RegisterButton.Click();
            return user;
        }
    }
}
```

```csharp
using static WebDriverTestsCSharpSix.CSharpSix.StaticUsingSyntax.TimestampBuilder;
using static WebDriverTestsCSharpSix.CSharpSix.StaticUsingSyntax.UniqueEmailGenerator;
//....
public User RegisterUser(string email = null, string password = null, string userName = null)
{
    //..
    if (string.IsNullOrEmpty(email))
    {
        email = BuildUniqueEmailTimestamp();
    }
    //..
    return user;
}
```

```csharp
public class ResourcesPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"https://automatetheplanet.com/resources/";
    public ResourcesPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    public string Url => this.url;
    [FindsBy(How = How.Id, Using = "emailId")]
    public IWebElement Email { get; set; }
    [FindsBy(How = How.Id, Using = "nameId")]
    public IWebElement Name { get; set; }
    [FindsBy(How = How.Id, Using = "downloadBtnId")]
    public IWebElement DownloadButton { get; set; }
    [FindsBy(How = How.Id, Using = "successMessageId")]
    public IWebElement SuccessMessage { get; set; }
    public IWebElement GetGridElement(string productName, int rowNumber)
    {
        var xpathLocator = string.Format("(//span[text()='{0}'])[{1}]/ancestor::td[1]/following-sibling::td[7]/span", productName, rowNumber);
        return this.driver.FindElement(By.XPath(xpathLocator));
    }
    public void Navigate() => this.driver.Navigate().GoToUrl(this.url);
    public void DownloadSourceCode(string email, string name)
    {
        this.Email.SendKeys(email);
        this.Name.SendKeys(name);
        this.DownloadButton.Click();
        var successMessage = string.Format("Thank you for downloading {0}! An email was sent to {1}. Check your inbox.", name, email);
        var waitElem = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
        waitElem.Until(ExpectedConditions.TextToBePresentInElementLocated(By.Id("successMessageId"), successMessage));
    }
    public void AssertSuccessMessage(string name, string email)
    {
        var successMessage = string.Format("Thank you for downloading {0}! An email was sent to {1}. Check your inbox.", name, email);
        Assert.AreEqual(successMessage, this.SuccessMessage.Text);
    }
}
```

```csharp
public class ResourcesPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"https://automatetheplanet.com/resources/";
    public ResourcesPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    public string Url => this.url;
    [FindsBy(How = How.Id, Using = "emailId")]
    public IWebElement Email { get; set; }
    [FindsBy(How = How.Id, Using = "nameId")]
    public IWebElement Name { get; set; }
    [FindsBy(How = How.Id, Using = "downloadBtnId")]
    public IWebElement DownloadButton { get; set; }
    [FindsBy(How = How.Id, Using = "successMessageId")]
    public IWebElement SuccessMessage { get; set; }
    public IWebElement GetGridElement(string productName, int rowNumber)
    {
        var xpathLocator = $"(//span[text()='{productName}'])[{rowNumber}]/ancestor::td[1]/following-sibling::td[7]/span";
        return this.driver.FindElement(By.XPath(xpathLocator));
    }
    public void Navigate() => this.driver.Navigate().GoToUrl(this.url);
    public void DownloadSourceCode(string email, string name)
    {
        this.Email.SendKeys(email);
        this.Name.SendKeys(name);
        this.DownloadButton.Click();
        var successMessage = $"Thank you for downloading {name}! An email was sent to {email}. Check your inbox.";
        var waitElem = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
        waitElem.Until(ExpectedConditions.TextToBePresentInElementLocated(By.Id("successMessageId"), successMessage));
    }
    public void AssertSuccessMessage(string name, string email)
    {
        var successMessage = $"Thank you for downloading {name}! An email was sent to {email}. Check your inbox.";
        Assert.AreEqual(successMessage, this.SuccessMessage.Text);
    }
}
```

## Mixing Specflow with Behaviours Design Pattern

```csharp
public class ItemPageNavigationBehaviour : ActionBehaviour
{
    private readonly ItemPage itemPage;
    private readonly string itemUrl;
    public ItemPageNavigationBehaviour(string itemUrl)
    {
        this.itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
        this.itemUrl = itemUrl;
    }
    protected override void PerformAct()
    {
        this.itemPage.Navigate(this.itemUrl);
    }
}
```

```csharp
public class ShippingAddressPageFillShippingBehaviour : ActionBehaviour
{
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ClientPurchaseInfo clientPurchaseInfo;
    public ShippingAddressPageFillShippingBehaviour(
    ClientPurchaseInfo clientPurchaseInfo)
    {
        this.shippingAddressPage =
        UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        this.clientPurchaseInfo = clientPurchaseInfo;
    }
    protected override void PerformAct()
    {
        this.shippingAddressPage.FillShippingInfo(this.clientPurchaseInfo);
    }
}
```

```csharp
[TestMethod]
public void Purchase_SimpleBehaviourEngine()
{
    var itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    var itemPrice = "40.49";
    var clientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    var clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    PerfectSystemTestsDesign.Behaviours.Core.BehaviourExecutor.Execute(
    new ItemPageNavigationBehaviour(itemUrl),
    new ItemPageBuyBehaviour(),
    new PreviewShoppingCartPageProceedBehaviour(),
    new SignInPageLoginBehaviour(clientLoginInfo),
    new ShippingAddressPageFillShippingBehaviour(clientPurchaseInfo),
    new ShippingAddressPageFillDifferentBillingBehaviour(clientPurchaseInfo),
    new ShippingAddressPageContinueBehaviour(),
    new ShippingPaymentPageContinueBehaviour(),
    new PlaceOrderPageAssertFinalAmountsBehaviour(itemPrice));
}
```

```csharp
Feature: Create Purchase in Online Store
In order to receive a book online
As a client
I want to be able to choose it through the browser and pay for it online
@testingFramework
Scenario: Create Successfull Purchase When Billing Country Is United States with American Express Card
When I navigate to "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743"
And I click the 'buy now' button
And then I click the 'proceed to checkout' button
#When the login page loads
And I login with email = "g3984159@trbvm.com" and pass = "ASDFG_12345"
#When the shipping address page loads
And I type full name = "John Smith", country = "United States", Adress = "950 Avenue of the Americas", city = "New Your City", state = "New Your", zip = "10001-2121" and phone = "00164644885569"
And I choose to fill different billing, full name = "John Smith", country = "United States", Adress = "950 Avenue of the Americas", city = "New Your City", state = "New Your", zip = "10001-2121" and phone = "00164644885569"
And click shipping address page 'continue' button
And click shipping payment top 'continue' button
Then assert that order total price = "40.49"
```

```csharp
[Binding]
public class CreatePurchaseSteps
{
    [When(@"I navigate to ""([^""]*)""")]
    public void NavigateToItemUrl(string itemUrl)
    {
        var itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
        itemPage.Navigate(itemUrl);
    }
    [When(@"I click the 'buy now' button")]
    public void ClickBuyNowButtonItemPage()
    {
        var itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
        itemPage.ClickBuyNowButton();
    }
    [When(@"then I click the 'proceed to checkout' button")]
    public void ClickProceedToCheckoutButtonPreviewShoppingCartPage()
    {
        var previewShoppingCartPage = UnityContainerFactory.GetContainer().Resolve<PreviewShoppingCartPage>();
        previewShoppingCartPage.ClickProceedToCheckoutButton();
    }
    [When(@"the login page loads")]
    public void SignInPageLoads()
    {
        var signInPage = UnityContainerFactory.GetContainer().Resolve<SignInPage>();
        signInPage.WaitForPageToLoad();
    }
    [When(@"I login with email = ""([^""]*)"" and pass = ""([^""]*)""")]
    public void LoginWithEmailAndPass(string email, string password)
    {
        var signInPage = UnityContainerFactory.GetContainer().Resolve<SignInPage>();
        signInPage.Login(email, password);
    }
    [When(@"the shipping address page loads")]
    public void ShippingPageLoads()
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        shippingAddressPage.WaitForPageToLoad();
    }
    [When(@"I type full name = ""([^""]*)"", country = ""([^""]*)"", Adress = ""([^""]*)"", city = ""([^""]*)"", state = ""([^""]*)"", zip = ""([^""]*)"" and phone = ""([^""]*)""")]
    public void FillShippingInfo(string fullName, string country, string address, string state, string city, string zip, string phone)
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        var clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = fullName,
            Country = country,
            Address1 = address,
            State = state,
            City = city,
            Zip = zip,
            Phone = phone
        });
        shippingAddressPage.FillShippingInfo(clientPurchaseInfo);
    }
    [When(@"I choose to fill different billing, full name = ""([^""]*)"", country = ""([^""]*)"", Adress = ""([^""]*)"", city = ""([^""]*)"", state = ""([^""]*)"", zip = ""([^""]*)"" and phone = ""([^""]*)""")]
    public void FillDifferentBillingInfo(string fullName, string country, string address, string state, string city, string zip, string phone)
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        var shippingPaymentPage = UnityContainerFactory.GetContainer().Resolve<ShippingPaymentPage>();
        var clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = fullName,
            Country = country,
            Address1 = address,
            State = state,
            City = city,
            Zip = zip,
            Phone = phone
        });
        shippingAddressPage.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        shippingAddressPage.ClickContinueButton();
        shippingPaymentPage.ClickBottomContinueButton();
        shippingAddressPage.FillBillingInfo(clientPurchaseInfo);
    }
    [When(@"click shipping address page 'continue' button")]
    public void ClickContinueButtonShippingAddressPage()
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        shippingAddressPage.ClickContinueButton();
    }
    [When(@"click shipping payment top 'continue' button")]
    public void WhenClickTopPaymentButton()
    {
        var shippingPaymentPage = UnityContainerFactory.GetContainer().Resolve<ShippingPaymentPage>();
        shippingPaymentPage.ClickTopContinueButton();
    }
    [Then(@"assert that order total price = ""([^""]*)""")]
    public void AssertOrderTotalPrice(string itemPrice)
    {
        var placeOrderPage = UnityContainerFactory.GetContainer().Resolve<PlaceOrderPage>();
        double totalPrice = double.Parse(itemPrice);
        placeOrderPage.AssertOrderTotalPrice(totalPrice);
    }
}
```

```csharp
[Binding]
public class CreatePurchaseStepsBehaviours
{
    [When(@"I navigate to ""([^""]*)""")]
    public void NavigateToItemUrl(string itemUrl)
    {
        new ItemPageNavigationBehaviour(itemUrl).Execute();
    }
    [When(@"I click the 'buy now' button")]
    public void ClickBuyNowButtonItemPage()
    {
        new ItemPageBuyBehaviour().Execute();
    }
    [When(@"then I click the 'proceed to checkout' button")]
    public void ClickProceedToCheckoutButtonPreviewShoppingCartPage()
    {
        new PreviewShoppingCartPageProceedBehaviour().Execute();
    }
    [When(@"I login with email = ""([^""]*)"" and pass = ""([^""]*)""")]
    public void LoginWithEmailAndPass(string email, string password)
    {
        new SignInPageLoginBehaviour(
        new ClientLoginInfo()
        {
            Email = email,
            Password = password
        })
        .Execute();
    }
    [When(@"the shipping address page loads")]
    public void ShippingPageLoads()
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        shippingAddressPage.WaitForPageToLoad();
    }
    [When(@"I type full name = ""([^""]*)"", country = ""([^""]*)"", Adress = ""([^""]*)"", city = ""([^""]*)"", state = ""([^""]*)"", zip = ""([^""]*)"" and phone = ""([^""]*)""")]
    public void FillShippingInfo(string fullName, string country, string address, string state, string city, string zip, string phone)
    {
        var clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = fullName,
            Country = country,
            Address1 = address,
            State = state,
            City = city,
            Zip = zip,
            Phone = phone
        });
        new ShippingAddressPageFillShippingBehaviour(clientPurchaseInfo).Execute();
    }
    [When(@"I choose to fill different billing, full name = ""([^""]*)"", country = ""([^""]*)"", Adress = ""([^""]*)"", city = ""([^""]*)"", state = ""([^""]*)"", zip = ""([^""]*)"" and phone = ""([^""]*)""")]
    public void FillDifferentBillingInfo(string fullName, string country, string address, string state, string city, string zip, string phone)
    {
        var clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = fullName,
            Country = country,
            Address1 = address,
            State = state,
            City = city,
            Zip = zip,
            Phone = phone
        });
        new ShippingAddressPageFillDifferentBillingBehaviour(clientPurchaseInfo).Execute();
    }
    [When(@"click shipping address page 'continue' button")]
    public void ClickContinueButtonShippingAddressPage()
    {
        new ShippingPaymentPageContinueBehaviour().Execute();
    }
    [When(@"click shipping payment top 'continue' button")]
    public void WhenClickTopPaymentButton()
    {
        new ShippingPaymentPageContinueBehaviour().Execute();
    }
    [Then(@"assert that order total price = ""([^""]*)""")]
    public void AssertOrderTotalPrice(string itemPrice)
    {
        new PlaceOrderPageAssertFinalAmountsBehaviour(itemPrice).Execute();
    }
}
```

```csharp
public abstract class ActionBehaviour
{
    public virtual void Execute()
    {
        this.PerformAct();
    }
    protected abstract void PerformAct();
}
```

```csharp
[Binding]
public class ItemPageNavigationBehaviour : ActionBehaviour
{
    private readonly ItemPage itemPage;
    private string itemUrl;
    public ItemPageNavigationBehaviour()
    {
        this.itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
    }
    [When(@"I navigate to ""([^""]*)""")]
    public void NavigateToItemUrl(string itemUrl)
    {
        this.itemUrl = itemUrl;
        base.Execute();
    }
    protected override void PerformAct()
    {
        this.itemPage.Navigate(this.itemUrl);
    }
}
```

```csharp
[Binding]
public class ShippingAddressPageFillShippingBehaviour : ActionBehaviour
{
    private readonly ShippingAddressPage shippingAddressPage;
    private ClientPurchaseInfo clientPurchaseInfo;
    public ShippingAddressPageFillShippingBehaviour()
    {
        this.shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
    }
    [When(@"I type full name = ""([^""]*)"", country = ""([^""]*)"", Adress = ""([^""]*)"", city = ""([^""]*)"", state = ""([^""]*)"", zip = ""([^""]*)"" and phone = ""([^""]*)""")]
    public void FillShippingInfo(string fullName, string country, string address, string state, string city, string zip, string phone)
    {
        this.clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = fullName,
            Country = country,
            Address1 = address,
            State = state,
            City = city,
            Zip = zip,
            Phone = phone
        });
        shippingAddressPage.FillShippingInfo(clientPurchaseInfo);
        base.Execute();
    }
    protected override void PerformAct()
    {
        this.shippingAddressPage.FillShippingInfo(this.clientPurchaseInfo);
    }
}
```

## Advanced SpecFlow: 4 Ways for Handling Parameters Properly

```csharp
Scenario: Successfully Convert Kilowatt - hours to Newton-meters
When I navigate to Metric Conversions
And navigate to Energy and power section
And navigate to Kilowatt-hours
And choose conversions to Newton-meters
And type "30" kWh
Then assert that 1.080000e+8 Nm are displayed as answer
Scenario: Successfully Convert Kilowatt-hours to Newton-meters in Fractions format
When I navigate to Metric Conversions
And navigate to Energy and power section
And navigate to Kilowatt-hours
And choose conversions to Newton-meters
And type 30 kWh in Fractions format
Then assert that 1079999999??,64 Nm are displayed as answer
```

```csharp
[When(@"type (.*) kWh")]
public void WhenTypeKWh(double kWh)
{
    this.kilowattHoursPage.ConvertKilowattHoursToNewtonMeters(kWh);
}
[When(@"type (.*) kWh in (.*) format")]
public void WhenTypeKWhInFormat(double kWh, Format format)
{
    this.kilowattHoursPage.ConvertKilowattHoursToNewtonMeters(kWh, format);
}
```

```csharp
public void ConvertKilowattHoursToNewtonMeters(
double kWh,
Format format = CelsiusFahrenheitPage.Format.Decimal)
{
    this.CelsiusInput.SendKeys(kWh.ToString());
    if (format != CelsiusFahrenheitPage.Format.Decimal)
    {
        string formatText =
        Enum.GetName(typeof(CelsiusFahrenheitPage.Format), format);
        new SelectElement(this.Format).SelectByText(formatText);
    }
    this.driverWait.Until(drv => this.Answer != null);
}
```

```csharp
Scenario: Successfully Convert Seconds to Minutes
When I navigate to Seconds to Minutes Page
And type seconds for 1 day, 1 hour, 1 minute, 1 second
Then assert that 1501 minutes are displayed as answer
Scenario: Successfully Convert Seconds to Minutes No Minutes
When I navigate to Seconds to Minutes Page
And type seconds for 1 day, 1 hour, 1 second
Then assert that 1500 minutes are displayed as answer
```

```csharp
[When(@"type seconds for (.*)")]
public void WhenTypeSeconds(TimeSpan seconds)
{
    this.secondsToMinutesPage.ConvertSecondsToMintes(seconds.TotalSeconds);
}
[Then(@"assert that (.*) minutes are displayed as answer")]
public void ThenAssertThatSecondsAreDisplayedAsAnswer(int expectedMinutes)
{
    this.secondsToMinutesPage.AssertMinutes(expectedMinutes.ToString());
}
[StepArgumentTransformation(@"(?:(d*) day(?:s)?(?:, )?)?(?:(d*) hour(?:s)?(?:, )?)?(?:(d*) minute(?:s)?(?:, )?)?(?:(d*) second(?:s)?(?:, )?)?")]
public TimeSpan TimeSpanTransform(string days, string hours, string minutes, string seconds)
{
    int daysParsed;
    int hoursParsed;
    int minutesParsed;
    int secondsParsed;
    int.TryParse(days, out daysParsed);
    int.TryParse(hours, out hoursParsed);
    int.TryParse(minutes, out minutesParsed);
    int.TryParse(seconds, out secondsParsed);
    return new TimeSpan(daysParsed, hoursParsed, minutesParsed, secondsParsed);
}
```

```csharp
Scenario Outline: Successfully Convert Seconds to Minutes Table
When I navigate to Seconds to Minutes Page
And type seconds for <seconds>
Then assert that <minutes> minutes are displayed as answer
Examples:
| seconds | minutes |
| 1 day, 1 hour, 1 second | 1500 |
| 5 days, 3 minutes | 7203 |
| 4 hours | 240 |
| 180 seconds | 3 |
```

```csharp
Scenario: Add Online Store Products with Affiliate Codes
When add products
| Url | AffilicateCode |
| /dp/B00TSUGXKE/ref=ods_gw_d_h1_tab_fd_c3 | affiliate3 |
| /dp/B00KC6I06S/ref=fs_ods_fs_tab_al | affiliate4 |
| /dp/B0189XYY0Q/ref=fs_ods_fs_tab_ts | affiliate5 |
| /dp/B018Y22C2Y/ref=fs_ods_fs_tab_fk | affiliate6 |
```

```csharp
[When(@"add products")]
public void NavigateToItemUrl(Table productsTable)
{
    var itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
    IEnumerable<dynamic> products = productsTable.CreateDynamicSet();
    foreach (var product in products)
    {
        itemPage.Navigate(string.Concat(product.Url, "?", product.AffilicateCode));
        itemPage.ClickBuyNowButton();
    }
}
```

## Advanced SpecFlow: Using Hooks to Extend Test Execution Workflow

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechTalk.SpecFlow;
namespace ExtendTestExecutionWorkflowUsingHooks
{
    [Binding]
    public sealed class Hooks
    {
        // For additional details on SpecFlow hooks see http://go.specflow.org/doc-hooks
        [BeforeScenario]
        public void BeforeScenario()
        {
            //TODO: implement logic that has to run before executing each scenario
        }
        [AfterScenario]
        public void AfterScenario()
        {
            //TODO: implement logic that has to run after executing each scenario
        }
    }
}
```

```csharp
[BeforeTestRun]
[BeforeFeature]
[BeforeScenario]
[BeforeScenarioBlock]
[BeforeStep]
[AfterStep]
[AfterScenarioBlock]
[AfterScenario]
[AfterFeature]
[AfterTestRun]
```

```csharp
Feature: Convert Metrics for Nuclear Science
To do my nuclear-related job
As a Nuclear Engineer
I want to be able to convert different metrics.
Background:
Given web browser is opened
@testingFramework
Scenario: Successfully Convert Kilowatt-hours to Newton-meters
When I navigate to Metric Conversions
And navigate to Energy and power section
And navigate to Kilowatt-hours
And choose conversions to Newton-meters
And type 30 kWh
Then assert that 1.080000e+8 Nm are displayed as answer
Then close web browser
```

```csharp
[Binding]
public class ConvertMetricsForNuclearScienceSteps
{
    private HomePage homePage;
    private KilowattHoursPage kilowattHoursPage;
    [Given(@"web browser is opened")]
    public void GivenWebBrowserIsOpened()
    {
        Driver.StartBrowser(BrowserTypes.Chrome);
    }
    [Then(@"close web browser")]
    public void ThenCloseWebBrowser()
    {
        Driver.StopBrowser();
    }
    [When(@"I navigate to Metric Conversions")]
    public void WhenINavigateToMetricConversions_()
    {
        this.homePage = new HomePage(Driver.Browser);
        this.homePage.Open();
    }
    [When(@"navigate to Energy and power section")]
    public void WhenNavigateToEnergyAndPowerSection()
    {
        this.homePage.EnergyAndPowerAnchor.Click();
    }
    [When(@"navigate to Kilowatt-hours")]
    public void WhenNavigateToKilowatt_Hours()
    {
        this.homePage.KilowattHours.Click();
    }
    [When(@"choose conversions to Newton-meters")]
    public void WhenChooseConversionsToNewton_Meters()
    {
        this.kilowattHoursPage = new KilowattHoursPage(Driver.Browser);
        this.kilowattHoursPage.KilowatHoursToNewtonMetersAnchor.Click();
    }
    [When(@"type (.*) kWh")]
    public void WhenTypeKWh(double kWh)
    {
        this.kilowattHoursPage.ConvertKilowattHoursToNewtonMeters(kWh);
    }
    [Then(@"assert that (.*) Nm are displayed as answer")]
    public void ThenAssertThatENmAreDisplayedAsAnswer(string expectedNewtonMeters)
    {
        this.kilowattHoursPage.AssertFahrenheit(expectedNewtonMeters);
    }
}
```

```csharp
[Binding]
public sealed class TestRunSingleBrowserHooks
{
    [BeforeTestRun]
    public static void RegisterPages()
    {
        Driver.StartBrowser(BrowserTypes.Chrome);
        UnityContainerFactory.GetContainer().RegisterType<HomePage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<KilowattHoursPage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterInstance<IWebDriver>(Driver.Browser);
    }
    // Reuse browser for the whole run.
    [AfterTestRun]
    public static void AfterTestRun()
    {
        Driver.StopBrowser();
    }
}
```

```csharp
[Binding]
public sealed class TestScenarioBrowserHooks
{
    [BeforeTestRun]
    public static void RegisterPages()
    {
        UnityContainerFactory.GetContainer().RegisterType<HomePage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<KilowattHoursPage>(new ContainerControlledLifetimeManager());
    }
    [BeforeScenario
    public static void StartBrowser()
    {
        Driver.StartBrowser(BrowserTypes.Chrome);
        UnityContainerFactory.GetContainer().RegisterInstance<IWebDriver>(Driver.Browser);
    }
    [AfterScenario]
    public static void CloseBrowser()
    {
        Driver.StopBrowser();
    }
}
```

```csharp
@firefox
Feature: Convert Metrics for Nuclear Science
To do my nuclear-related job
As a Nuclear Engineer
I want to be able to convert different metrics.
@hooksExample @firefox
Scenario: Successfully Convert Kilowatt-hours to Newton-meters
When I navigate to Metric Conversions
And navigate to Energy and power section
And navigate to Kilowatt-hours
And choose conversions to Newton-meters
And type 30 kWh
Then assert that 1.080000e+8 Nm are displayed as answer
```

```csharp
[Binding]
public class ConvertMetricsForNuclearScienceSteps
{
    private readonly HomePage homePage;
    private readonly KilowattHoursPage kilowattHoursPage;
    public ConvertMetricsForNuclearScienceSteps()
    {
        this.homePage =
        UnityContainerFactory.GetContainer().Resolve<HomePage>();
        this.kilowattHoursPage =
        UnityContainerFactory.GetContainer().Resolve<KilowattHoursPage>();
    }
    ////[Given(@"web browser is opened")]
    ////public void GivenWebBrowserIsOpened()
    ////{
    //// Driver.StartBrowser(BrowserTypes.Chrome);
    ////}
    ////[Then(@"close web browser")]
    ////public void ThenCloseWebBrowser()
    ////{
    //// Driver.StopBrowser();
    ////}
    [When(@"I navigate to Metric Conversions")]
    public void WhenINavigateToMetricConversions_()
    {
        ////this.homePage = new HomePage(Driver.Browser);
        ////this.homePage = UnityContainerFactory.GetContainer().Resolve<HomePage>();
        this.homePage.Open();
    }
    [When(@"navigate to Energy and power section")]
    public void WhenNavigateToEnergyAndPowerSection()
    {
        this.homePage.EnergyAndPowerAnchor.Click();
    }
    [When(@"navigate to Kilowatt-hours")]
    public void WhenNavigateToKilowatt_Hours()
    {
        this.homePage.KilowattHours.Click();
    }
    [When(@"choose conversions to Newton-meters")]
    public void WhenChooseConversionsToNewton_Meters()
    {
        ////this.kilowattHoursPage = new KilowattHoursPage(Driver.Browser);
        this.kilowattHoursPage.KilowatHoursToNewtonMetersAnchor.Click();
    }
    [When(@"type (.*) kWh")]
    public void WhenTypeKWh(double kWh)
    {
        this.kilowattHoursPage.ConvertKilowattHoursToNewtonMeters(kWh);
    }
    [Then(@"assert that (.*) Nm are displayed as answer")]
    public void ThenAssertThatENmAreDisplayedAsAnswer(string expectedNewtonMeters)
    {
        this.kilowattHoursPage.AssertFahrenheit(expectedNewtonMeters);
    }
}
```

```csharp
[Binding]
public sealed class Hooks
{
    // Reuse browser for the whole run.
    [BeforeTestRun(Order = 1)]
    public static void RegisterPages()
    {
        System.Console.WriteLine("Execute BeforeTestRun- RegisterPages");
        Driver.StartBrowser(BrowserTypes.Chrome);
        UnityContainerFactory.GetContainer().RegisterType<HomePage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<KilowattHoursPage>(new ContainerControlledLifetimeManager());
    }
    [BeforeTestRun(Order = 2)]
    public static void RegisterDriver()
    {
        System.Console.WriteLine("Execute BeforeTestRun- RegisterDriver");
        UnityContainerFactory.GetContainer().RegisterInstance<IWebDriver>(Driver.Browser);
    }
    // Reuse browser for the whole run.
    [AfterTestRun]
    public static void AfterTestRun()
    {
        System.Console.WriteLine("Execute AfterTestRun- StopBrowser");
        Driver.StopBrowser();
    }
    [BeforeFeature]
    public static void BeforeFeature()
    {
    }
    [AfterFeature]
    public static void AfterFeature()
    {
    }
    [BeforeScenario(Order = 2)]
    public static void StartBrowser()
    {
        // New Browser Instance for each test.
        ////Driver.StartBrowser(BrowserTypes.Chrome);
        System.Console.WriteLine("Execute BeforeScenario- StartBrowser");
    }
    [BeforeScenario(Order = 1)]
    public static void LoginUser()
    {
        System.Console.WriteLine("Execute BeforeScenario- LoginUser");
        // Login to your site.
    }
    [AfterScenario(Order = 2)]
    public static void CloseBrowser()
    {
        System.Console.WriteLine("Execute AfterScenario- CloseBrowser");
        // New Browser Instance for each test.
        ////Driver.StopBrowser();
    }
    [AfterScenario(Order = 1)]
    public static void LogoutUser()
    {
        System.Console.WriteLine("Execute AfterScenario- LogoutUser");
        // Logout the user
    }
    [BeforeStep]
    public void BeforeStep()
    {
        System.Console.WriteLine("BeforeStep- Start Timer");
    }
    [AfterStep]
    public static void AfterStep()
    {
        System.Console.WriteLine("BeforeStep- Log something in DB.");
    }
}
```

```csharp
[AfterScenario(Order = 1)]
[Scope(Tag = "hooksExample")]
public static void LogoutUser()
{
    System.Console.WriteLine("Execute AfterScenario- LogoutUser");
    // Logout the user
}
```

```csharp
[AfterScenario(Order = 1)]
[AfterScenario("hooksExample")]
public static void LogoutUser()
{
    System.Console.WriteLine("Execute AfterScenario- LogoutUser");
    // Logout the user
}

```

```csharp
[BeforeScenario(Order = 2)]
public static void StartBrowser()
{
    // Advanced tag filtering
    if (!ScenarioContext.Current.ScenarioInfo.Tags.Contains("firefox"))
    {
        throw new ArgumentException("The browser is not specfied");
    }
    // New Browser Instance for each test.
    ////Driver.StartBrowser(BrowserTypes.Chrome);
    System.Console.WriteLine("Execute BeforeScenario- StartBrowser");
}
```

```csharp
[Binding]
public sealed class OrderHooks
{
    // Reuse browser for the whole run.
    [BeforeTestRun(Order = 1)]
    public static void RegisterPages()
    {
        System.Console.WriteLine("BeforeTestRun");
        Driver.StartBrowser(BrowserTypes.Chrome);
        UnityContainerFactory.GetContainer().RegisterType<HomePage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<KilowattHoursPage>(new ContainerControlledLifetimeManager());
    }
    [BeforeTestRun(Order = 2)]
    public static void RegisterDriver()
    {
        System.Console.WriteLine("Execute BeforeTestRun- RegisterDriver");
        UnityContainerFactory.GetContainer().RegisterInstance<IWebDriver>(Driver.Browser);
    }
    // Reuse browser for the whole run.
    [AfterTestRun]
    public static void AfterTestRun()
    {
        System.Console.WriteLine("AfterTestRun");
        Driver.StopBrowser();
    }
    [BeforeFeature]
    public static void BeforeFeature()
    {
        System.Console.WriteLine("BeforeFeature");
    }
    [AfterFeature]
    public static void AfterFeature()
    {
        System.Console.WriteLine("AfterFeature");
    }
    [BeforeScenario]
    public void LoginUser()
    {
        System.Console.WriteLine("BeforeScenario");
    }
    [AfterScenario(Order = 1)]
    public void AfterScenario()
    {
        System.Console.WriteLine("AfterScenario");
    }
    [BeforeStep]
    public void BeforeStep()
    {
        System.Console.WriteLine("BeforeStep");
    }
    [AfterStep]
    public void AfterStep()
    {
        System.Console.WriteLine("AfterStep");
    }
}
```

## Getting Started with SpecFlow in 10 Minutes

```csharp
public partial class HomePage : BasePage
{
    public HomePage(IWebDriver driver) : base(driver)
    {
    }
    public override string Url
    {
        get
        {
            return "http://www.metric-conversions.org/";
        }
    }
}
public partial class HomePage
{
    public IWebElement EnergyAndPowerAnchor
    {
        get
        {
            return this.driver.FindElement(By.XPath("//a[contains(@title,'Energy Conversion')]"));
        }
    }
    public IWebElement KilowattHours
    {
        get
        {
            return this.driver.FindElement(By.XPath("//a[contains(text(),'Kilowatt-hours')]"));
        }
    }
}
```

```csharp
public partial class KilowattHoursPage : BasePage
{
    public KilowattHoursPage(IWebDriver driver) : base(driver)
    {
    }
    public override string Url
    {
        get
        {
            return "http://www.metric-conversions.org/temperature/celsius-to-fahrenheit.htm";
        }
    }
    public void ConvertKilowattHoursToNewtonMeters(double kWh)
    {
        this.CelsiusInput.SendKeys(kWh.ToString());
        this.driverWait.Until(drv => this.Answer != null);
    }
}
```

```csharp
public partial class KilowattHoursPage
{
    public IWebElement CelsiusInput
    {
        get
        {
            return this.driver.FindElement(By.Id("argumentConv"));
        }
    }
    public IWebElement Answer
    {
        get
        {
            return this.driver.FindElement(By.Id("answer"));
        }
    }
    public IWebElement KilowatHoursToNewtonMetersAnchor
    {
        get
        {
            return this.driver.FindElement(By.XPath("//a[contains(text(),'Kilowatt-hours to Newton-meters')]"));
        }
    }
}
```

```csharp
public static class KilowattHoursPageAsserter
{
    public static void AssertFahrenheit(this KilowattHoursPage page, string expectedNewtonMeters)
    {
        Assert.IsTrue(page.Answer.Text.Contains(string.Format("{0}Nm", expectedNewtonMeters)));
    }
}
```

```csharp
[Binding]
public class ConvertMetricsForNuclearScienceStepsRegularExpressions
{
    [When(@"I navigate to Metric Conversions")]
    public void WhenINavigateToMetricConversions_()
    {
        ScenarioContext.Current.Pending();
    }
    [When(@"navigate to Energy and power section")]
    public void WhenNavigateToEnergyAndPowerSection()
    {
        ScenarioContext.Current.Pending();
    }
    [When(@"navigate to Kilowatt-hours")]
    public void WhenNavigateToKilowatt_Hours()
    {
        ScenarioContext.Current.Pending();
    }
    [When(@"choose conversions to Newton-meters")]
    public void WhenChooseConversionsToNewton_Meters()
    {
        ScenarioContext.Current.Pending();
    }
    [When(@"type (.*) kWh")]
    public void WhenTypeKWh(int p0)
    {
        ScenarioContext.Current.Pending();
    }
    [Then(@"assert that (.*) Nm are displayed as answer")]
    public void ThenAssertThatENmAreDisplayedAsAnswer(Decimal p0, int p1)
    {
        ScenarioContext.Current.Pending();
    }
}
```

```csharp
[Binding]
public class ConvertMetricsForNuclearScienceStepsMethodUnderscrores
{
    [When]
    public void When_I_navigate_to_Metric_Conversions()
    {
        ScenarioContext.Current.Pending();
    }
    [When]
    public void When_navigate_to_Energy_and_power_section()
    {
        ScenarioContext.Current.Pending();
    }
    [When]
    public void When_navigate_to_Kilowatt_hours()
    {
        ScenarioContext.Current.Pending();
    }
    [When]
    public void When_choose_conversions_to_Newton_meters()
    {
        ScenarioContext.Current.Pending();
    }
    [When]
    public void When_type_P0_kWh(int p0)
    {
        ScenarioContext.Current.Pending();
    }
    [Then]
    public void Then_assert_that_P0_Nm_are_displayed_as_answer(string p1)
    {
        ScenarioContext.Current.Pending();
    }
}
```

```csharp
[Binding]
public class ConvertMetricsForNuclearScienceSteps
{
    [When]
    public void WhenINavigateToMetricConversions()
    {
        ScenarioContext.Current.Pending();
    }
    [When]
    public void WhenNavigateToEnergyAndPowerSection()
    {
        ScenarioContext.Current.Pending();
    }
    [When]
    public void WhenNavigateToKilowattHours()
    {
        ScenarioContext.Current.Pending();
    }
    [When]
    public void WhenChooseConversionsToNewtonMeters()
    {
        ScenarioContext.Current.Pending();
    }
    [When]
    public void WhenType_P0_KWh(int p0)
    {
        ScenarioContext.Current.Pending();
    }
    [Then]
    public void ThenAssertThat_P0_NmAreDisplayedAsAnswer(string p0)
    {
        ScenarioContext.Current.Pending();
    }
}
```

```csharp
[Binding]
public class ConvertMetricsForNuclearScienceSteps
{
    private HomePage homePage;
    private KilowattHoursPage kilowattHoursPage;
    [Given(@"web browser is opened")]
    public void GivenWebBrowserIsOpened()
    {
        Driver.StartBrowser(BrowserTypes.Chrome);
    }
    [Then(@"close web browser")]
    public void ThenCloseWebBrowser()
    {
        Driver.StopBrowser();
    }
    [When(@"I navigate to Metric Conversions")]
    public void WhenINavigateToMetricConversions_()
    {
        this.homePage = new HomePage(Driver.Browser);
        this.homePage.Open();
    }
    [When(@"navigate to Energy and power section")]
    public void WhenNavigateToEnergyAndPowerSection()
    {
        this.homePage.EnergyAndPowerAnchor.Click();
    }
    [When(@"navigate to Kilowatt-hours")]
    public void WhenNavigateToKilowatt_Hours()
    {
        this.homePage.KilowattHours.Click();
    }
    [When(@"choose conversions to Newton-meters")]
    public void WhenChooseConversionsToNewton_Meters()
    {
        this.kilowattHoursPage = new KilowattHoursPage(Driver.Browser);
        this.kilowattHoursPage.KilowatHoursToNewtonMetersAnchor.Click();
    }
    [When(@"type (.*) kWh")]
    public void WhenTypeKWh(double kWh)
    {
        this.kilowattHoursPage.ConvertKilowattHoursToNewtonMeters(kWh);
    }
    [Then(@"assert that (.*) Nm are displayed as answer")]
    public void ThenAssertThatENmAreDisplayedAsAnswer(string expectedNewtonMeters)
    {
        this.kilowattHoursPage.AssertFahrenheit(expectedNewtonMeters);
    }
}
```

## Advanced Reuse Tactics for Grid Controls Automated Tests

```csharp
[TestMethod]
public void OrderIdEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/frozen-columns");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    kendoGrid.Filter(
    OrderIdColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.OrderId.ToString());
    this.WaitForGridToLoad(1, kendoGrid);
    var items = kendoGrid.GetItems<GridItem>();
    Assert.AreEqual(1, items.Count);
}
```

```csharp
public interface IGridPage
{
    KendoGrid Grid { get; }
    IWebElement PagerInfoLabel { get; set; }
    IWebElement GoToNextPage { get; set; }
    IWebElement GoToFirstPageButton { get; set; }
    IWebElement GoToLastPage { get; set; }
    IWebElement GoToPreviousPage { get; set; }
    IWebElement NextMorePages { get; set; }
    IWebElement PreviousMorePages { get; set; }
    IWebElement PageOnFirstPositionButton { get; set; }
    IWebElement PageOnSecondPositionButton { get; set; }
    IWebElement PageOnTenthPositionButton { get; set; }
    void NavigateTo();
}
```

```csharp
public class GridFilterPage : IGridPage
{
    public readonly string Url = @"http://demos.telerik.com/kendo-ui/grid/filter-row";
    private readonly IWebDriver driver;
    public GridFilterPage(IWebDriver driver)
    {
        this.driver = driver;
        PageFactory.InitElements(driver, this);
    }
    public KendoGrid Grid
    {
        get
        {
            return new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        }
    }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/span")]
    public IWebElement PagerInfoLabel { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/a[3]")]
    public IWebElement GoToNextPage { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/a[1]")]
    public IWebElement GoToFirstPageButton { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/a[4]/span")]
    public IWebElement GoToLastPage { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/a[2]/span")]
    public IWebElement GoToPreviousPage { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/ul/li[12]/a")]
    public IWebElement NextMorePages { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/ul/li[2]/a")]
    public IWebElement PreviousMorePages { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/ul/li[2]/a")]
    public IWebElement PageOnFirstPositionButton { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/ul/li[3]/a")]
    public IWebElement PageOnSecondPositionButton { get; set; }
    [FindsBy(How = How.XPath, Using = "//*[@id='grid']/div[3]/ul/li[11]/a")]
    public IWebElement PageOnTenthPositionButton { get; set; }
    public void NavigateTo()
    {
        this.driver.Navigate().GoToUrl(this.Url);
    }
}
```

```csharp
public class GridColumnAsserter
{
    public GridColumnAsserter(IGridPage gridPage)
    {
        this.GridPage = gridPage;
    }
    protected IGridPage GridPage { get; set; }
    protected void WaitForPageToLoad(int expectedPage, KendoGrid grid)
    {
        this.Until(() =>
        {
            int currentPage = grid.GetCurrentPageNumber();
            return currentPage == expectedPage;
        });
    }
    protected void WaitForGridToLoad(int expectedCount, KendoGrid grid)
    {
        this.Until(
        () =>
        {
            var items = grid.GetItems<GridItem>();
            return expectedCount == items.Count;
        });
    }
    protected void WaitForGridToLoadAtLeast(int expectedCount, KendoGrid grid)
    {
        this.Until(
        () =>
        {
            var items = grid.GetItems<GridItem>();
            return items.Count >= expectedCount;
        });
    }
    protected void Until(
    Func<bool> condition,
    int timeout = 10,
    string exceptionMessage = "Timeout exceeded.",
    int retryRateDelay = 50)
    {
        DateTime start = DateTime.Now;
        while (!condition())
        {
            DateTime now = DateTime.Now;
            double totalSeconds = (now - start).TotalSeconds;
            if (totalSeconds >= timeout)
            {
                throw new TimeoutException(exceptionMessage);
            }
            Thread.Sleep(retryRateDelay);
        }
    }
    protected List<Order> GetAllItemsFromDb()
    {
        // Create dummy orders. This logic should be replaced with service oriented call
        // to your DB and get all items that are populated in the grid.
        List<Order> orders = new List<Order>();
        for (int i = 0; i < 10; i++)
        {
            orders.Add(new Order());
        }
        return orders;
    }
    protected Order CreateNewItemInDb(string shipName = null)
    {
        // Replace it with service oriented call to your DB. Create real enity in DB.
        return new Order(shipName);
    }
    protected void UpdateItemInDb(Order order)
    {
        // Replace it with service oriented call to your DB. Update the enity in the DB.
    }
    protected int GetUniqueNumberValue()
    {
        var currentTime = DateTime.Now;
        int result = currentTime.Year +
        currentTime.Month +
        currentTime.Hour +
        currentTime.Minute +
        currentTime.Second +
        currentTime.Millisecond;
        return result;
    }
}
```

```csharp
public class OrderIdColumnAsserter : GridColumnAsserter
{
    public OrderIdColumnAsserter(IGridPage gridPage) : base(gridPage)
    {
    }
    public void OrderIdEqualToFilter()
    {
        this.GridPage.NavigateTo();
        var newItem = this.CreateNewItemInDb();
        this.GridPage.Grid.Filter(
        GridColumns.OrderID,
        Enums.FilterOperator.EqualTo,
        newItem.OrderId.ToString());
        this.WaitForGridToLoad(1, this.GridPage.Grid);
        var items = this.GridPage.Grid.GetItems<GridItem>();
        Assert.AreEqual(1, items.Count);
    }
    public void OrderIdGreaterThanOrEqualToFilter()
    {
        this.GridPage.NavigateTo();
        // Create new item with unique ship name;
        var newItem = this.CreateNewItemInDb();
        // Create second new item with the same unique shipping name
        var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
        // When we filter by the second unique column ShippingName,
        // only one item will be displayed. Once we apply the second
        // not equal to filter the grid should be empty.
        this.GridPage.Grid.Filter(
        new GridFilter(
        GridColumns.OrderID,
        Enums.FilterOperator.GreaterThanOrEqualTo,
        newItem.OrderId.ToString()),
        new GridFilter(
        GridColumns.ShipName,
        Enums.FilterOperator.EqualTo,
        newItem.ShipName));
        this.WaitForGridToLoadAtLeast(2, this.GridPage.Grid);
        var results = this.GridPage.Grid.GetItems<Order>();
        Assert.AreEqual(
        secondNewItem.OrderId,
        results.FirstOrDefault(x => x.ShipName == secondNewItem.ShipName).OrderId);
        Assert.AreEqual(
        newItem.OrderId,
        results.FirstOrDefault(x => x.ShipName == newItem.ShipName).OrderId);
        Assert.IsTrue(results.Count() == 2);
    }
    public void OrderIdGreaterThanFilter()
    {
        this.GridPage.NavigateTo();
        // Create new item with unique ship name;
        var newItem = this.CreateNewItemInDb();
        // Create second new item with the same unique shipping name
        var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
        // Filter by the smaller orderId but also by the second unique
        // column in this case shipping name
        this.GridPage.Grid.Filter(
        new GridFilter(
        GridColumns.OrderID,
        Enums.FilterOperator.GreaterThan,
        newItem.OrderId.ToString()),
        new GridFilter(
        GridColumns.ShipName,
        Enums.FilterOperator.EqualTo,
        newItem.ShipName));
        this.WaitForGridToLoadAtLeast(1, this.GridPage.Grid);
        var results = this.GridPage.Grid.GetItems<Order>();
        Assert.AreEqual(
        secondNewItem.OrderId,
        results.FirstOrDefault(x => x.ShipName == secondNewItem.ShipName).OrderId);
        Assert.IsTrue(results.Count() == 1);
    }
    public void OrderIdLessThanOrEqualToFilter()
    {
        this.GridPage.NavigateTo();
        // Create new item with unique ship name;
        var newItem = this.CreateNewItemInDb();
        // Create second new item with the same unique shipping name
        var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
        // Filter by the larger orderId but also by the second unique
        // column in this case shipping name
        this.GridPage.Grid.Filter(
        new GridFilter(
        GridColumns.OrderID,
        Enums.FilterOperator.LessThanOrEqualTo,
        secondNewItem.OrderId.ToString()),
        new GridFilter(
        GridColumns.ShipName,
        Enums.FilterOperator.EqualTo,
        newItem.ShipName));
        this.WaitForGridToLoadAtLeast(2, this.GridPage.Grid);
        var results = this.GridPage.Grid.GetItems<Order>();
        Assert.AreEqual(
        newItem.OrderId,
        results.FirstOrDefault(x => x.ShipName == newItem.ShipName).OrderId);
        Assert.AreEqual(
        secondNewItem.OrderId,
        results.Last(x => x.ShipName == secondNewItem.ShipName).OrderId);
        Assert.IsTrue(results.Count() == 2);
    }
    public void OrderIdLessThanFilter()
    {
        this.GridPage.NavigateTo();
        // Create new item with unique ship name;
        var newItem = this.CreateNewItemInDb();
        // Create second new item with the same unique shipping name
        var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
        // Filter by the larger orderId but also by the second unique
        // column in this case shipping name
        this.GridPage.Grid.Filter(
        new GridFilter(
        GridColumns.OrderID,
        Enums.FilterOperator.LessThan,
        secondNewItem.OrderId.ToString()),
        new GridFilter(
        GridColumns.ShipName,
        Enums.FilterOperator.EqualTo,
        secondNewItem.ShipName));
        this.WaitForGridToLoadAtLeast(1, this.GridPage.Grid);
        var results = this.GridPage.Grid.GetItems<Order>();
        Assert.AreEqual(
        newItem.OrderId,
        results.FirstOrDefault(x => x.ShipName == newItem.ShipName).OrderId);
        Assert.IsTrue(results.Count() == 1);
    }
    public void OrderIdNotEqualToFilter()
    {
        this.GridPage.NavigateTo();
        // Create new item with unique ship name;
        var newItem = this.CreateNewItemInDb();
        // Create second new item with the same unique shipping name
        var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
        // Filter by the larger orderId but also by the second unique
        // column in this case shipping name
        this.GridPage.Grid.Filter(
        new GridFilter(
        GridColumns.OrderID,
        Enums.FilterOperator.NotEqualTo,
        secondNewItem.OrderId.ToString()),
        new GridFilter(
        GridColumns.ShipName,
        Enums.FilterOperator.EqualTo,
        secondNewItem.ShipName));
        this.WaitForGridToLoadAtLeast(1, this.GridPage.Grid);
        var results = this.GridPage.Grid.GetItems<Order>();
        Assert.AreEqual(
        newItem.OrderId,
        results.FirstOrDefault(x => x.ShipName == newItem.ShipName).OrderId);
        Assert.IsTrue(results.Count() == 1);
    }
    public void OrderIdClearFilter()
    {
        this.GridPage.NavigateTo();
        // Create new item with unique ship name;
        var newItem = this.CreateNewItemInDb();
        // Make sure that we have at least 2 items if the grid is empty.
        // The tests are designed to run against empty DB.
        this.CreateNewItemInDb(newItem.ShipName);
        this.GridPage.Grid.Filter(
        GridColumns.OrderID,
        Enums.FilterOperator.EqualTo,
        newItem.OrderId.ToString());
        this.WaitForGridToLoad(1, this.GridPage.Grid);
        this.GridPage.Grid.RemoveFilters();
        this.WaitForGridToLoadAtLeast(1, this.GridPage.Grid);
        var results = this.GridPage.Grid.GetItems<Order>();
        Assert.IsTrue(results.Count() > 1);
    }
}
```

```csharp
[TestClass]
public class KendoGridAdvanceReuseTacticsAutomationTests
{
    private IWebDriver driver;
    private IGridPage gridPage;
    private FreightColumnAsserter freightColumnAsserter;
    private OrderDateColumnAsserter orderDateColumnAsserter;
    private OrderIdColumnAsserter orderIdColumnAsserter;
    private ShipNameColumnAsserter shipNameColumnAsserter;
    private GridPagerAsserter gridPagerAsserter;
    [TestInitialize]
    public void SetupTest()
    {
        this.driver = new FirefoxDriver();
        this.driver.Manage().Timeouts().SetPageLoadTimeout(TimeSpan.FromSeconds(5));
        this.gridPage = new GridFilterPage(this.driver);
        this.freightColumnAsserter = new FreightColumnAsserter(this.gridPage);
        this.orderDateColumnAsserter = new OrderDateColumnAsserter(this.gridPage);
        this.orderIdColumnAsserter = new OrderIdColumnAsserter(this.gridPage);
        this.shipNameColumnAsserter = new ShipNameColumnAsserter(this.gridPage);
        this.gridPagerAsserter = new GridPagerAsserter(this.gridPage);
    }
    [TestCleanup]
    public void TeardownTest()
    {
        this.driver.Quit();
    }
```

```csharp
#region OrderID Test Cases
[TestMethod]
public void OrderIdEqualToFilter()
{
    this.orderIdColumnAsserter.OrderIdEqualToFilter();
}
[TestMethod]
public void OrderIdGreaterThanOrEqualToFilter()
{
    this.orderIdColumnAsserter.OrderIdGreaterThanOrEqualToFilter();
}
[TestMethod]
public void OrderIdGreaterThanFilter()
{
    this.orderIdColumnAsserter.OrderIdGreaterThanFilter();
}
[TestMethod]
public void OrderIdLessThanOrEqualToFilter()
{
    this.orderIdColumnAsserter.OrderIdLessThanOrEqualToFilter();
}
[TestMethod]
public void OrderIdLessThanFilter()
{
    this.orderIdColumnAsserter.OrderIdLessThanFilter();
}
[TestMethod]
public void OrderIdNotEqualToFilter()
{
    this.orderIdColumnAsserter.OrderIdNotEqualToFilter();
}
[TestMethod]
public void OrderIdClearFilter()
{
    this.orderIdColumnAsserter.OrderIdClearFilter();
}
#endregion
```

## Design Grid Control Automated Tests Part 3

```csharp
private void InitializeInvoicesForPaging()
{
    int totalOrders = 11;
    if (!string.IsNullOrEmpty(this.uniqueShippingName))
    {
        uniqueShippingName = Guid.NewGuid().ToString();
    }
    this.testPagingItems = new List<Order>();
    for (int i = 0; i < totalOrders; i++)
    {
        var newOrder = this.CreateNewItemInDb(this.uniqueShippingName);
        testPagingItems.Add(newOrder);
    }
}
```

```csharp
private void NavigateToGridInitialPage(KendoGrid kendoGrid, int initialPageNumber)
{
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.NavigateTo();
    kendoGrid.Filter(ShipNameColumnName, Enums.FilterOperator.EqualTo, this.uniqueShippingName);
    kendoGrid.ChangePageSize(1);
    this.WaitForGridToLoad(1, kendoGrid);
    kendoGrid.NavigateToPage(initialPageNumber);
    WaitForPageToLoad(initialPageNumber, kendoGrid);
    this.AssertPagerInfoLabel(gridFilterPage, initialPageNumber, initialPageNumber, this.testPagingItems.Count);
}
```

```csharp
[TestMethod]
public void NavigateToFirstPage_GoToFirstPageButton()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 11);
    int targetPage = 1;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToFirstPageButton.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(this.testPagingItems[targetPage - 1].OrderId, results.First().OrderId);
    this.AssertPagerInfoLabel(gridFilterPage, targetPage, targetPage, this.testPagingItems.Count());
}
```

```csharp
[TestMethod]
public void GoToFirstPageButtonDisabled_WhenFirstPageIsLoaded()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 11);
    int targetPage = 1;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToFirstPageButton.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    Assert.IsFalse(gridFilterPage.GoToFirstPageButton.Enabled);
}
```

```csharp
[TestMethod]
public void NavigateToLastPage_GoToLastPageButton()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 1);
    int targetPage = 11;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToLastPage.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(this.testPagingItems.Last().OrderId, results.First().OrderId);
    this.AssertPagerInfoLabel(gridFilterPage, targetPage, targetPage, this.testPagingItems.Count());
}
```

```csharp
[TestMethod]
public void GoToLastPageButtonDisabled_WhenLastPageIsLoaded()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 1);
    int targetPage = 11;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToLastPage.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    Assert.IsFalse(gridFilterPage.GoToLastPage.Enabled);
}
```

```csharp
[TestMethod]
public void NavigateToPageNine_GoToPreviousPageButton()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 11);
    int targetPage = 10;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToPreviousPage.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(this.testPagingItems[targetPage - 1].OrderId, results.First().OrderId);
    this.AssertPagerInfoLabel(gridFilterPage, targetPage, targetPage, this.testPagingItems.Count());
}
```

```csharp
[TestMethod]
public void GoToPreviousPageButtonDisabled_WhenFirstPageIsLoaded()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 11);
    int targetPage = 1;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToFirstPageButton.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    Assert.IsFalse(gridFilterPage.GoToPreviousPage.Enabled);
}
```

```csharp
[TestMethod]
public void NavigateToPageTwo_GoToNextPageButton()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 1);
    int targetPage = 2;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToNextPage.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(this.testPagingItems[targetPage - 1].OrderId, results.First().OrderId);
    this.AssertPagerInfoLabel(gridFilterPage, targetPage, targetPage, this.testPagingItems.Count());
}
```

```csharp
[TestMethod]
public void GoToNextPageButtonDisabled_WhenLastPageIsLoaded()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 1);
    int targetPage = 11;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToLastPage.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    Assert.IsFalse(gridFilterPage.GoToNextPage.Enabled);
}
```

```csharp
[TestMethod]
public void NavigateToLastPage_MorePagesNextButton()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 1);
    int targetPage = 11;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.NextMorePages.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(this.testPagingItems[targetPage - 1].OrderId, results.First().OrderId);
    this.AssertPagerInfoLabel(gridFilterPage, targetPage, targetPage, this.testPagingItems.Count());
}
```

```csharp
[TestMethod]
public void NextMorePageButtonDisabled_WhenLastPageIsLoaded()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 1);
    int targetPage = 11;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToLastPage.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    Assert.IsFalse(gridFilterPage.PreviousMorePages.Enabled);
}
```

```csharp
[TestMethod]
public void NavigateToPage10_MorePagesPreviousButton()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 11);
    int targetPage = 1;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.PreviousMorePages.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(this.testPagingItems[targetPage - 1].OrderId, results.First().OrderId);
    this.AssertPagerInfoLabel(gridFilterPage, targetPage, targetPage, this.testPagingItems.Count());
}
```

```csharp
[TestMethod]
public void PreviousMorePagesButtonDisabled_WhenFirstPageIsLoaded()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 11);
    int targetPage = 1;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.GoToFirstPageButton.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    Assert.IsFalse(gridFilterPage.PreviousMorePages.Displayed);
}
```

```csharp
[TestMethod]
public void NavigateToPageTwo_SecondPageButton()
{
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    this.InitializeInvoicesForPaging();
    this.NavigateToGridInitialPage(kendoGrid, 1);
    int targetPage = 2;
    GridFilterPage gridFilterPage = new GridFilterPage(this.driver);
    gridFilterPage.PageOnSecondPositionButton.Click();
    this.WaitForPageToLoad(targetPage, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(this.testPagingItems[targetPage - 1].OrderId, results.First().OrderId);
    this.AssertPagerInfoLabel(gridFilterPage, targetPage, targetPage, this.testPagingItems.Count());
}
```

## Design Grid Control Automated Tests Part 2

```csharp
private int GetUniqueNumberValue()
{
    var currentTime = DateTime.Now;
    int result =
    currentTime.Year +
    currentTime.Month +
    currentTime.Hour +
    currentTime.Minute +
    currentTime.Second +
    currentTime.Millisecond;
    return result;
}
```

```csharp
[TestMethod]
public void FreightEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    newItem.Freight = this.GetUniqueNumberValue();
    this.UpdateItemInDb(newItem);
    kendoGrid.Filter(
    FreightColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.Freight.ToString());
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 1);
    Assert.AreEqual(newItem.Freight.ToString(), results[0].Freight);
}
```

```csharp
[TestMethod]
public void FreightNotEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    newItem.Freight = this.GetUniqueNumberValue();
    this.UpdateItemInDb(newItem);
    kendoGrid.Filter(
    new GridFilter(
    FreightColumnName,
    Enums.FilterOperator.NotEqualTo,
    newItem.Freight.ToString()),
    new GridFilter(
    OrderIdColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.OrderId.ToString()));
    this.WaitForGridToLoad(0, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 0);
}
```

```csharp
[TestMethod]
public void FreightGreaterThanOrEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.Freight);
    var biggestFreight = allItems.Last().Freight;
    var newItem = this.CreateNewItemInDb();
    newItem.Freight = biggestFreight + this.GetUniqueNumberValue();
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.Freight = newItem.Freight + 1;
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    FreightColumnName,
    Enums.FilterOperator.GreaterThanOrEqualTo,
    newItem.Freight.ToString());
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 2);
    Assert.AreEqual(1, results.Count(x => x.Freight == secondNewItem.Freight));
    Assert.AreEqual(1, results.Count(x => x.Freight == newItem.Freight));
}
```

```csharp
[TestMethod]
public void FreightGreaterThanFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.Freight);
    var biggestFreight = allItems.Last().Freight;
    var newItem = this.CreateNewItemInDb();
    newItem.Freight = biggestFreight + this.GetUniqueNumberValue();
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.Freight = newItem.Freight + 1;
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    FreightColumnName,
    Enums.FilterOperator.GreaterThan,
    newItem.Freight.ToString());
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 1);
    Assert.AreEqual(1, results.Count(x => x.Freight == secondNewItem.Freight));
}
```

```csharp
[TestMethod]
public void FreightLessThanOrEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.Freight);
    var smallestFreight = allItems.First().Freight;
    var newItem = this.CreateNewItemInDb();
    newItem.Freight = Math.Round(
    smallestFreight - this.GetUniqueNumberValue(),
    3,
    MidpointRounding.AwayFromZero);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.Freight = Math.Round(
    (newItem.Freight - 0.01),
    3,
    MidpointRounding.AwayFromZero);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    FreightColumnName,
    Enums.FilterOperator.LessThanOrEqualTo,
    newItem.Freight.ToString());
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 2);
    Assert.AreEqual(1, results.Count(x => x.Freight == secondNewItem.Freight));
    Assert.AreEqual(1, results.Count(x => x.Freight == newItem.Freight));
}
```

```csharp
[TestMethod]
public void FreightLessThanFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.Freight);
    var smallestFreight = allItems.First().Freight;
    var newItem = this.CreateNewItemInDb();
    newItem.Freight = Math.Round(
    smallestFreight - this.GetUniqueNumberValue(),
    3,
    MidpointRounding.AwayFromZero);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.Freight = Math.Round(
    (newItem.Freight - 0.01),
    3,
    MidpointRounding.AwayFromZero);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    FreightColumnName,
    Enums.FilterOperator.LessThan,
    newItem.Freight.ToString());
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 1);
    Assert.AreEqual(1, results.Count(x => x.Freight == secondNewItem.Freight));
}
```

```csharp
[TestMethod]
public void FreightClearFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.Freight);
    var biggestFreight = allItems.Last().Freight;
    var newItem = this.CreateNewItemInDb();
    newItem.Freight = biggestFreight + this.GetUniqueNumberValue();
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.Freight = newItem.Freight + 1;
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    FreightColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.Freight.ToString());
    this.WaitForGridToLoad(1, kendoGrid);
    kendoGrid.RemoveFilters();
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
}
```

```csharp
[TestMethod]
public void OrderDateEqualToFilter()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.OrderId);
    var lastOrderDate = allItems.Last().OrderDate;
    var newItem = this.CreateNewItemInDb();
    newItem.OrderDate = lastOrderDate.AddDays(1);
    this.UpdateItemInDb(newItem);
    kendoGrid.Filter(
    OrderDateColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.OrderDate.ToString());
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 1);
    Assert.AreEqual(newItem.OrderDate.ToString(), results[0].OrderDate);
}
```

```csharp
[TestMethod]
public void OrderDateNotEqualToFilter()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.OrderDate);
    var lastOrderDate = allItems.Last().OrderDate;
    var newItem = this.CreateNewItemInDb();
    newItem.OrderDate = lastOrderDate.AddDays(1);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.OrderDate = lastOrderDate.AddDays(2);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    new GridFilter(
    OrderDateColumnName,
    Enums.FilterOperator.NotEqualTo,
    newItem.OrderDate.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName));
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 1);
    Assert.AreEqual(secondNewItem.ToString(), results[0].OrderDate);
}
```

```csharp
[TestMethod]
public void OrderDateAfterFilter()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.OrderDate);
    var lastOrderDate = allItems.Last().OrderDate;
    var newItem = this.CreateNewItemInDb();
    newItem.OrderDate = lastOrderDate.AddDays(1);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.OrderDate = lastOrderDate.AddDays(2);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    new GridFilter(
    OrderDateColumnName,
    Enums.FilterOperator.IsAfter,
    newItem.OrderDate.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName));
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 1);
    Assert.AreEqual(secondNewItem.ToString(), results[0].OrderDate);
}
```

```csharp
[TestMethod]
public void OrderDateIsAfterOrEqualToFilter()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.OrderDate);
    var lastOrderDate = allItems.First().OrderDate;
    var newItem = this.CreateNewItemInDb();
    newItem.OrderDate = lastOrderDate.AddDays(1);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.OrderDate = lastOrderDate.AddDays(2);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    new GridFilter(
    OrderDateColumnName,
    Enums.FilterOperator.IsAfterOrEqualTo,
    newItem.OrderDate.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName));
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 2);
    Assert.AreEqual(secondNewItem.ToString(), results[0].OrderDate);
    Assert.AreEqual(newItem.ToString(), results[1].OrderDate);
}
```

```csharp
[TestMethod]
public void OrderDateBeforeFilter()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.OrderDate);
    var lastOrderDate = allItems.First().OrderDate;
    var newItem = this.CreateNewItemInDb();
    newItem.OrderDate = lastOrderDate.AddDays(-1);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.OrderDate = lastOrderDate.AddDays(-2);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    new GridFilter(
    OrderDateColumnName,
    Enums.FilterOperator.IsBefore,
    newItem.OrderDate.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName));
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 1);
    Assert.AreEqual(secondNewItem.ToString(), results[0].OrderDate);
}
```

```csharp
[TestMethod]
public void OrderDateClearFilter()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    kendoGrid.Filter(
    OrderDateColumnName,
    Enums.FilterOperator.IsAfter,
    DateTime.MaxValue.ToString());
    this.WaitForGridToLoad(0, kendoGrid);
    kendoGrid.RemoveFilters();
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
}
```

```csharp
[TestMethod]
public void OrderDateSortAsc()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.OrderDate);
    var lastOrderDate = allItems.First().OrderDate;
    var newItem = this.CreateNewItemInDb();
    newItem.OrderDate = lastOrderDate.AddDays(-1);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.OrderDate = lastOrderDate.AddDays(-2);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName);
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
    kendoGrid.Sort(OrderDateColumnName, SortType.Asc);
    Thread.Sleep(1000);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 2);
    Assert.AreEqual(secondNewItem.ToString(), results[0].OrderDate);
    Assert.AreEqual(newItem.ToString(), results[1].OrderDate);
}
```

```csharp
[TestMethod]
public void OrderDateSortDesc()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.OrderDate);
    var lastOrderDate = allItems.First().OrderDate;
    var newItem = this.CreateNewItemInDb();
    newItem.OrderDate = lastOrderDate.AddDays(-1);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.OrderDate = lastOrderDate.AddDays(-2);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName);
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
    kendoGrid.Sort(OrderDateColumnName, SortType.Desc);
    Thread.Sleep(1000);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 2);
    Assert.AreEqual(newItem.ToString(), results[0].OrderDate);
    Assert.AreEqual(secondNewItem.ToString(), results[1].OrderDate);
}
```

## Design Grid Control Automated Tests Part 1

```csharp
private void WaitForGridToLoad(int expectedCount, KendoGrid grid)
{
    this.Until(
    () =>
    {
        var items = grid.GetItems<GridItem>();
        return expectedCount == items.Count;
    });
}
private void WaitForGridToLoadAtLeast(int expectedCount, KendoGrid grid)
{
    this.Until(
    () =>
    {
        var items = grid.GetItems<GridItem>();
        return items.Count >= expectedCount;
    });
}
private void Until(
Func<bool> condition,
int timeout = 10,
string exceptionMessage = "Timeout exceeded.",
int retryRateDelay = 50)
{
    DateTime start = DateTime.Now;
    while (!condition())
    {
        DateTime now = DateTime.Now;
        double totalSeconds = (now - start).TotalSeconds;
        if (totalSeconds >= timeout)
        {
            throw new TimeoutException(exceptionMessage);
        }
        Thread.Sleep(retryRateDelay);
    }
}
```

```csharp
[TestMethod]
public void OrderIdEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/frozen-columns");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    kendoGrid.Filter(
    OrderIdColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.OrderId.ToString());
    this.WaitForGridToLoad(1, kendoGrid);
    var items = kendoGrid.GetItems<Order>();
    Assert.AreEqual(1, items.Count);
}
```

```csharp
[TestMethod]
public void OrderIdNotEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/frozen-columns");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    kendoGrid.Filter(
    new GridFilter(
    OrderIdColumnName,
    Enums.FilterOperator.NotEqualTo,
    secondNewItem.OrderId.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    secondNewItem.ShipName));
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(newItem.OrderId,
    results.FirstOrDefault(x => x.ShipName == newItem.ShipName).OrderId);
    Assert.IsTrue(results.Count() == 1);
}
```

```csharp
[TestMethod]
public void OrderIdGreaterThanOrEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/frozen-columns");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    kendoGrid.Filter(
    new GridFilter(
    OrderIdColumnName,
    Enums.FilterOperator.GreaterThanOrEqualTo,
    newItem.OrderId.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName));
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(secondNewItem.OrderId,
    results.FirstOrDefault(x => x.ShipName == secondNewItem.ShipName).OrderId);
    Assert.AreEqual(newItem.OrderId,
    results.FirstOrDefault(x => x.ShipName == newItem.ShipName).OrderId);
    Assert.IsTrue(results.Count() == 2);
}
```

```csharp
[TestMethod]
public void OrderIdGreaterThanFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/frozen-columns");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    kendoGrid.Filter(
    new GridFilter(
    OrderIdColumnName,
    Enums.FilterOperator.GreaterThan,
    newItem.OrderId.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName));
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(secondNewItem.OrderId,
    results.FirstOrDefault(x => x.ShipName == secondNewItem.ShipName).OrderId);
    Assert.IsTrue(results.Count() == 1);
}
```

```csharp
[TestMethod]
public void OrderIdLessThanOrEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/frozen-columns");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    kendoGrid.Filter(
    new GridFilter(
    OrderIdColumnName,
    Enums.FilterOperator.LessThanOrEqualTo,
    secondNewItem.OrderId.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName));
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(newItem.OrderId,
    results.FirstOrDefault(x => x.ShipName == newItem.ShipName).OrderId);
    Assert.AreEqual(secondNewItem.OrderId,
    results.Last(x => x.ShipName == secondNewItem.ShipName).OrderId);
    Assert.IsTrue(results.Count() == 2);
}
```

```csharp
[TestMethod]
public void OrderIdLessThanFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/frozen-columns");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    kendoGrid.Filter(
    new GridFilter(
    OrderIdColumnName,
    Enums.FilterOperator.LessThan,
    secondNewItem.OrderId.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    secondNewItem.ShipName));
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.AreEqual(newItem.OrderId,
    results.FirstOrDefault(x => x.ShipName == newItem.ShipName).OrderId);
    Assert.IsTrue(results.Count() == 1);
}
```

```csharp
[TestMethod]
public void OrderIdClearFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/frozen-columns");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    kendoGrid.Filter(
    OrderIdColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.OrderId.ToString());
    this.WaitForGridToLoad(1, kendoGrid);
    kendoGrid.RemoveFilters();
    this.WaitForGridToLoadAtLeast(1, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() > 1);
}
```

```csharp
[TestMethod]
public void ShipNameEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    kendoGrid.Filter(ShipNameColumnName, Enums.FilterOperator.EqualTo, newItem.ShipName);
    this.WaitForGridToLoad(1, kendoGrid);
    var items = kendoGrid.GetItems<GridItem>();
    Assert.AreEqual(1, items.Count);
}
```

```csharp
[TestMethod]
public void ShipNameNotEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    kendoGrid.Filter(
    new GridFilter(ShipNameColumnName, Enums.FilterOperator.NotEqualTo, newItem.ShipName),
    new GridFilter(OrderIdColumnName, Enums.FilterOperator.EqualTo, newItem.OrderId));
    this.WaitForGridToLoad(0, kendoGrid);
    var items = kendoGrid.GetItems<GridItem>();
    Assert.AreEqual(0, items.Count);
}
```

```csharp
[TestMethod]
public void ShipNameContainsFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    string shipName = Guid.NewGuid().ToString();
    shipName = shipName.TrimStart(shipName.First()).TrimEnd(shipName.Last());
    var newItem = this.CreateNewItemInDb(shipName);
    kendoGrid.Filter(ShipNameColumnName, Enums.FilterOperator.Contains, newItem.ShipName);
    this.WaitForGridToLoad(1, kendoGrid);
    var items = kendoGrid.GetItems<GridItem>();
    Assert.AreEqual(1, items.Count);
}
```

```csharp
[TestMethod]
public void ShipNameNotContainsFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    string shipName = Guid.NewGuid().ToString();
    shipName = shipName.TrimStart(shipName.First()).TrimEnd(shipName.Last());
    var newItem = this.CreateNewItemInDb(shipName);
    kendoGrid.Filter(
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.NotContains,
    newItem.ShipName),
    new GridFilter(
    OrderIdColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.OrderId.ToString()));
    this.WaitForGridToLoad(0, kendoGrid);
    var items = kendoGrid.GetItems<GridItem>();
    Assert.AreEqual(0, items.Count);
}
```

```csharp
[TestMethod]
public void ShipNameStartsWithFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    string shipName = Guid.NewGuid().ToString();
    shipName = shipName.TrimEnd(shipName.Last());
    var newItem = this.CreateNewItemInDb(shipName);
    kendoGrid.Filter(ShipNameColumnName, Enums.FilterOperator.StartsWith, newItem.ShipName);
    this.WaitForGridToLoad(1, kendoGrid);
    var items = kendoGrid.GetItems<GridItem>();
    Assert.AreEqual(1, items.Count);
}
```

```csharp
[TestMethod]
public void ShipNameEndsWithFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    string shipName = Guid.NewGuid().ToString();
    shipName = shipName.TrimStart(shipName.First());
    var newItem = this.CreateNewItemInDb(shipName);
    kendoGrid.Filter(ShipNameColumnName, Enums.FilterOperator.EndsWith, newItem.ShipName);
    this.WaitForGridToLoad(1, kendoGrid);
    var items = kendoGrid.GetItems<GridItem>();
    Assert.AreEqual(1, items.Count);
}
```

```csharp
[TestMethod]
public void ShipNameClearFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    kendoGrid.Filter(
    ShipNameColumnName,
    Enums.FilterOperator.StartsWith,
    Guid.NewGuid().ToString());
    this.WaitForGridToLoad(0, kendoGrid);
    kendoGrid.RemoveFilters();
    WaitForGridToLoadAtLeast(1, kendoGrid);
}
```

## 10 Advanced WebDriver Tips and Tricks Part 3

```csharp
FirefoxProfile profile = new FirefoxProfile();
profile.AddExtension(@"C:extensionsLocationextension.xpi");
IWebDriver driver = new FirefoxDriver(profile);
```

```csharp
ChromeOptions options = new ChromeOptions();
var proxy = new Proxy();
proxy.Kind = ProxyKind.Manual;
proxy.IsAutoDetect = false;
proxy.HttpProxy =
proxy.SslProxy = "127.0.0.1:3239";
options.Proxy = proxy;
options.AddArgument("ignore-certificate-errors");
IWebDriver driver = new ChromeDriver(options);
```

```csharp
ChromeOptions options = new ChromeOptions();
var proxy = new Proxy();
proxy.Kind = ProxyKind.Manual;
proxy.IsAutoDetect = false;
proxy.HttpProxy =
proxy.SslProxy = "127.0.0.1:3239";
options.Proxy = proxy;
options.AddArguments("--proxy-server=http://user:password@127.0.0.1:3239");
options.AddArgument("ignore-certificate-errors");
IWebDriver driver = new ChromeDriver(options);
```

```csharp
ChromeOptions options = new ChromeOptions();
options.AddArguments("load-extension=/pathTo/extension");
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.SetCapability(ChromeOptions.Capability, options);
DesiredCapabilities dc = DesiredCapabilities.Chrome();
dc.SetCapability(ChromeOptions.Capability, options);
IWebDriver driver = new RemoteWebDriver(dc);
```

```csharp
ChromeOptions options = new ChromeOptions();
options.AddExtension(Path.GetFullPath("local/path/to/extension.crx"));
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.SetCapability(ChromeOptions.Capability, options);
DesiredCapabilities dc = DesiredCapabilities.Chrome();
dc.SetCapability(ChromeOptions.Capability, options);
IWebDriver driver = new RemoteWebDriver(dc);
```

```csharp
[TestMethod]
public void AssertButtonEnabledDisabled()
{
    this.driver.Navigate().GoToUrl(@"http://www.w3schools.com/tags/tryit.asp?filename=tryhtml_button_disabled");
    this.driver.SwitchTo().Frame("iframeResult");
    IWebElement button = driver.FindElement(By.XPath("/html/body/button"));
    Assert.IsFalse(button.Enabled);
}
```

```csharp
[TestMethod]
public void SetHiddenField()
{
    ////<input type="hidden" name="country" value="Bulgaria"/>
    IWebElement theHiddenElem = driver.FindElement(By.Name("country"));
    string hiddenFieldValue = theHiddenElem.GetAttribute("value");
    Assert.AreEqual("Bulgaria", hiddenFieldValue);
    ((IJavaScriptExecutor)driver).ExecuteScript(
    "arguments[0].value='Germany';",
    theHiddenElem);
    hiddenFieldValue = theHiddenElem.GetAttribute("value");
    Assert.AreEqual("Germany", hiddenFieldValue);
}
```

```csharp
[TestMethod]
public void VerifyFileDownloadChrome()
{
    string expectedFilePath = @"c:tempTesting_Framework_2015_3_1314_2_Free.exe";
    try
    {
        String downloadFolderPath = @"c:temp";
        var options = new ChromeOptions();
        options.AddUserProfilePreference("download.default_directory", downloadFolderPath);
        driver = new ChromeDriver(options);
        driver.Navigate().GoToUrl("https://www.telerik.com/download-trial-file/v2/telerik-testing-framework");
        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
        wait.Until((x) =>
        {
            return File.Exists(expectedFilePath);
        });
        FileInfo fileInfo = new FileInfo(expectedFilePath);
        long fileSize = fileInfo.Length;
        Assert.AreEqual(4326192, fileSize);
    }
    finally
    {
        if (File.Exists(expectedFilePath))
        {
            File.Delete(expectedFilePath);
        }
    }
}
```

```csharp
[TestMethod]
public void VerifyFileDownloadFirefox()
{
    string expectedFilePath = @"c:tempTesting_Framework_2015_3_1314_2_Free.exe";
    try
    {
        String downloadFolderPath = @"c:temp";
        FirefoxProfile profile = new FirefoxProfile();
        profile.SetPreference("browser.download.folderList", 2);
        profile.SetPreference("browser.download.dir", downloadFolderPath);
        profile.SetPreference("browser.download.manager.alertOnEXEOpen", false);
        profile.SetPreference("browser.helperApps.neverAsk.saveToDisk", "application/msword, application/binary, application/ris, text/csv, image/png, application/pdf, text/html, text/plain, application/zip, application/x-zip, application/x-zip-compressed, application/download, application/octet-stream");
        this.driver = new FirefoxDriver(profile);
        driver.Navigate().GoToUrl("https://www.telerik.com/download-trial-file/v2/telerik-testing-framework");
        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
        wait.Until((x) =>
        {
            return File.Exists(expectedFilePath);
        });
        FileInfo fileInfo = new FileInfo(expectedFilePath);
        long fileSize = fileInfo.Length;
        Assert.AreEqual(4326192, fileSize);
    }
    finally
    {
        if (File.Exists(expectedFilePath))
        {
            File.Delete(expectedFilePath);
        }
    }
}
public void WaitForAjaxComplete(int maxSeconds)
{
    bool isAjaxCallComplete = false;
    for (int i = 1; i <= maxSeconds; i++)
    {
        isAjaxCallComplete = (bool)((IJavaScriptExecutor)driver).
        ExecuteScript("return window.jQuery != undefined && jQuery.active == 0");
        if (isAjaxCallComplete)
        {
            return;
        }
        Thread.Sleep(1000);
    }
    throw new Exception(string.Format("Timed out after {0} seconds", maxSeconds));
}
```

## 10 Advanced WebDriver Tips and Tricks Part 2

```csharp
[TestMethod]
public void DragAndDrop()
{
    this.driver.Navigate().GoToUrl(@"http://loopj.com/jquery-simple-slider/");
    IWebElement element = driver.FindElement(By.XPath("//*[@id='project']/p[1]/div/div[2]"));
    Actions move = new Actions(driver);
    move.DragAndDropToOffset(element, 30, 0).Perform();
}
```

```csharp
[TestMethod]
public void FileUpload()
{
    this.driver.Navigate().GoToUrl(
    @"https://demos.telerik.com/aspnet-ajax/ajaxpanel/application-scenarios/file-upload/defaultcs.aspx");
    IWebElement element =
    driver.FindElement(By.Id("ctl00_ContentPlaceholder1_RadUpload1file0"));
    String filePath =
    @"D:ProjectsPatternsInAutomation.TestsWebDriver.Series.TestsbinDebugWebDriver.xml";
    element.SendKeys(filePath);
}
```

```csharp
[TestMethod]
public void JavaScripPopUps()
{
    this.driver.Navigate().GoToUrl(
    @"http://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");
    this.driver.SwitchTo().Frame("iframeResult");
    IWebElement button = driver.FindElement(By.XPath("/html/body/button"));
    button.Click();
    IAlert a = driver.SwitchTo().Alert();
    if (a.Text.Equals("Press a button!"))
    {
        a.Accept();
    }
    else
    {
        a.Dismiss();
    }
}
```

```csharp
[TestMethod]
public void MovingBetweenTabs()
{
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com/compelling-sunday-14022016/");
    driver.FindElement(By.LinkText("10 Advanced WebDriver Tips and Tricks Part 1")).Click();
    driver.FindElement(By.LinkText("The Ultimate Guide To Unit Testing in ASP.NET MVC")).Click();
    ReadOnlyCollection<String> windowHandles = driver.WindowHandles;
    String firstTab = windowHandles.First();
    String lastTab = windowHandles.Last();
    driver.SwitchTo().Window(lastTab);
    Assert.AreEqual<string>("The Ultimate Guide To Unit Testing in ASP.NET MVC", driver.Title);
    driver.SwitchTo().Window(firstTab);
    Assert.AreEqual<string>("Compelling Sunday – 19 Posts on Programming and Quality Assurance", driver.Title);
}
```

```csharp
[TestMethod]
public void NavigationHistory()
{
    this.driver.Navigate().GoToUrl(
    @"http://www.codeproject.com/Articles/1078541/Advanced-WebDriver-Tips-and-Tricks-Part");
    this.driver.Navigate().GoToUrl(
    @"http://www.codeproject.com/Articles/1017816/Speed-up-Selenium-Tests-through-RAM-Facts-and-Myth");
    driver.Navigate().Back();
    Assert.AreEqual<string>(
    "10 Advanced WebDriver Tips and Tricks - Part 1 - CodeProject",
    driver.Title);
    driver.Navigate().Refresh();
    Assert.AreEqual<string>(
    "10 Advanced WebDriver Tips and Tricks - Part 1 - CodeProject",
    driver.Title);
    driver.Navigate().Forward();
    Assert.AreEqual<string>(
    "Speed up Selenium Tests through RAM Facts and Myths - CodeProject",
    driver.Title);
}
```

```csharp
FirefoxProfileManager profileManager = new FirefoxProfileManager();
FirefoxProfile profile = new FirefoxProfile();
profile.SetPreference(
"general.useragent.override",
"Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+");
this.driver = new FirefoxDriver(profile);
```

```csharp
FirefoxProfile firefoxProfile = new FirefoxProfile();
firefoxProfile.SetPreference("network.proxy.type", 1);
firefoxProfile.SetPreference("network.proxy.http", "myproxy.com");
firefoxProfile.SetPreference("network.proxy.http_port", 3239);
driver = new FirefoxDriver(firefoxProfile);
```

```csharp
FirefoxProfile firefoxProfile = new FirefoxProfile();
firefoxProfile.AcceptUntrustedCertificates = true;
firefoxProfile.AssumeUntrustedCertificateIssuer = false;
driver = new FirefoxDriver(firefoxProfile);
```

```csharp
DesiredCapabilities capability = DesiredCapabilities.Chrome();
Environment.SetEnvironmentVariable("webdriver.chrome.driver", "C:PathToChromeDriver.exe");
capability.SetCapability(CapabilityType.AcceptSslCertificates, true);
driver = new RemoteWebDriver(capability);
```

```csharp
DesiredCapabilities capability = DesiredCapabilities.InternetExplorer();
Environment.SetEnvironmentVariable("webdriver.ie.driver", "C:PathToIEDriver.exe");
capability.SetCapability(CapabilityType.AcceptSslCertificates, true);
driver = new RemoteWebDriver(capability);
```

```csharp
[TestMethod]
public void ScrollFocusToControl()
{
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com/compelling-sunday-14022016/");
    IWebElement link = driver.FindElement(By.PartialLinkText("Previous post"));
    string jsToBeExecuted = string.Format("window.scroll(0, {0});", link.Location.Y);
    ((IJavaScriptExecutor)driver).ExecuteScript(jsToBeExecuted);
    link.Click();
    Assert.AreEqual<string>("10 Advanced WebDriver Tips and Tricks - Part 1", driver.Title);
}
```

```csharp
[TestMethod]
public void FocusOnControl()
{
    this.driver.Navigate().GoToUrl(
    @"http://automatetheplanet.com/compelling-sunday-14022016/");
    IWebElement link = driver.FindElement(By.PartialLinkText("Previous post"));
    // 9.1. Option 1.
    link.SendKeys(string.Empty);
    // 9.1. Option 2.
    ((IJavaScriptExecutor)driver).ExecuteScript("arguments[0].focus();", link);
}
```

## 10 Advanced WebDriver Tips and Tricks Part 1

```csharp
public void TakeFullScreenshot(IWebDriver driver, String filename)
{
    Screenshot screenshot = ((ITakesScreenshot)driver).GetScreenshot();
    screenshot.SaveAsFile(filename, ImageFormat.Png);
}
Sometimes you may need to take a screenshot of a single element.

public void TakeScreenshotOfElement(IWebDriver driver, By by, string fileName)
{
    // 1. Make screenshot of all screen
    var screenshotDriver = driver as ITakesScreenshot;
    Screenshot screenshot = screenshotDriver.GetScreenshot();
    var bmpScreen = new Bitmap(new MemoryStream(screenshot.AsByteArray));
    // 2. Get screenshot of specific element
    IWebElement element = driver.FindElement(by);
    var cropArea = new Rectangle(element.Location, element.Size);
    var bitmap = bmpScreen.Clone(cropArea, bmpScreen.PixelFormat);
    bitmap.Save(fileName);
}
```

```csharp
[TestMethod]
public void WebDriverAdvancedUsage_TakingFullScrenenScreenshot()
{
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com");
    this.WaitUntilLoaded();
    string tempFilePath = Path.GetTempFileName().Replace(".tmp", ".png");
    this.TakeFullScreenshot(this.driver, tempFilePath);
}
[TestMethod]
public void WebDriverAdvancedUsage_TakingElementScreenshot()
{
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com");
    this.WaitUntilLoaded();
    string tempFilePath = Path.GetTempFileName().Replace(".tmp", ".png");
    this.TakeScreenshotOfElement(this.driver,
    By.XPath("//*[@id='tve_editor']/div[2]/div[2]/div/div"), tempFilePath);
}

```

```csharp
[TestMethod]
public void GetHtmlSourceOfWebElement()
{
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com");
    this.WaitUntilLoaded();
    var element =
    this.driver.FindElement(By.XPath("//*[@id='tve_editor']/div[2]/div[3]/div/div"));
    string sourceHtml = element.GetAttribute("innerHTML");
    Debug.WriteLine(sourceHtml);
}
```

```csharp
[TestMethod]
public void ExecuteJavaScript()
{
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com");
    this.WaitUntilLoaded();
    IJavaScriptExecutor js = driver as IJavaScriptExecutor;
    string title = (string)js.ExecuteScript("return document.title");
    Debug.WriteLine(title);
}
```

```csharp
this.driver.Manage().Timeouts().SetPageLoadTimeout(new TimeSpan(0, 0, 10));
You can wait until the page is completely loaded via JavaScript.

private void WaitUntilLoaded()
{
    WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    wait.Until((x) =>
    {
        return ((IJavaScriptExecutor)this.driver)
    .ExecuteScript("return document.readyState").Equals("complete");
    });
}
```

```csharp
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
wait.Until(ExpectedConditions.VisibilityOfAllElementsLocatedBy(
By.XPath("//*[@id='tve_editor']/div[2]/div[2]/div/div")));
```

```csharp
[TestMethod]
public void ExecuteInHeadlessBrowser()
{
    this.driver = new PhantomJSDriver(
    @"D:ProjectsPatternsInAutomation.TestsWebDriver.Series.TestsDrivers");
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com");
    this.WaitUntilLoaded();
    IJavaScriptExecutor js = driver as IJavaScriptExecutor;
    string title = (string)js.ExecuteScript("return document.title");
    Debug.WriteLine(title);
}
```

```csharp
[TestMethod]
public void CheckIfElementIsVisible()
{
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com");
    Assert.IsTrue(driver.FindElement(
    By.XPath("//*[@id='tve_editor']/div[2]/div[2]/div/div")).Displayed);
}
```

```csharp
FirefoxProfileManager profileManager = new FirefoxProfileManager();
FirefoxProfile profile = profileManager.GetProfile("YourProfileName");
this.driver = new FirefoxDriver(profile);
```

```csharp
ChromeOptions options = new ChromeOptions();
// set some options
DesiredCapabilities dc = DesiredCapabilities.Chrome();
dc.SetCapability(ChromeOptions.Capability, options);
IWebDriver driver = new RemoteWebDriver(dc);

```

```csharp
FirefoxProfileManager profileManager = new FirefoxProfileManager();
FirefoxProfile profile = profileManager.GetProfile("HARDDISKUSER");
profile.SetPreference("javascript.enabled", false);
this.driver = new FirefoxDriver(profile);
```

```csharp
Cookie cookie = new Cookie("key", "value");
this.driver.Manage().Cookies.AddCookie(cookie);
```

```csharp
var cookies = this.driver.Manage().Cookies.AllCookies;
foreach (var currentCookie in cookies)
{
    Debug.WriteLine(currentCookie.Value);
}
```

```csharp
this.driver.Manage().Cookies.DeleteCookieNamed("CookieName");
```

```csharp
this.driver.Manage().Cookies.DeleteAllCookies();

```

```csharp
var myCookie = this.driver.Manage().Cookies.GetCookieNamed("CookieName");
Debug.WriteLine(myCookie.Value);
```

```csharp
[TestMethod]
public void MaximizeWindow()
{
    this.driver.Navigate().GoToUrl(@"http://automatetheplanet.com");
    this.driver.Manage().Window.Maximize();
}
```

## Create Custom Selenium IDE Export to WebDriver

```javascript
function parse(testCase, source) {
  var doc = source;
  var commands = [];
  while (doc.length > 0) {
    var line = /(.*)(\r\n|[\r\n])?/.exec(doc);
    var array = line[1].split(/,/);
    if (array.length >= 3) {
      var command = new Command();
      command.command = array[0];
      command.target = array[1];
      command.value = array[2];
      commands.push(command);
    }
    doc = doc.substr(line[0].length);
  }
  testCase.setCommands(commands);
}
```

```javascript
function format(testCase, name) {
  var result = "";
  var commands = testCase.commands;
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    if (command.type == "command") {
      result +=
        command.command + "," + command.target + "," + command.value + "\n";
    }
  }
  return result;
}
```

```csharp
public class BaseWebDriverTest
{
    private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void TestInit(IWebDriver driver, string baseUrl, int timeOut)
    {
        this.Driver = driver;
        this.BaseUrl = baseUrl;
        this.Wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeOut));
        this.TimeOut = timeOut;
    }

    public IWebDriver Driver { get; set; }

    public string BaseUrl { get; set; }

    public WebDriverWait Wait { get; set; }

    public int TimeOut { get; set; }

    public IWebElement GetElement(By by)
    {
        IWebElement result = null;
        try
        {
            result = this.Wait.Until(x => x.FindElement(by));
        }
        catch (TimeoutException ex)
        {
            log.Error(ex.Message);
            throw new NoSuchElementException(by, this, ex);
        }

        return result;
    }

    public bool IsElementPresent(By by)
    {
        try
        {
            this.Driver.FindElement(by);
            return true;
        }
        catch (NoSuchElementException ex)
        {
            log.Error(ex.Message);
            return false;
        }
    }

    public void WaitForElementPresent(By by)
    {
        this.GetElement(by);
    }
}
```

```csharp
this.configForm = '<description>Variable for Selenium instance</description>' +
                  '<textbox id="options_receiver" value="this.Browser"/>' +
                  '<description>MethodName</description>' +
                  '<textbox id="options_methodName" value="TESTMETHODNAME" />' +
                  '<description>Base URL</description>' +
                  '<textbox id="options_baseUrl" value="http://home.telerik.com"/>';
```

```csharp
public partial class SearchEngineMainPage : BasePage
{
    public IWebElement SearchBox
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_q"));
        }
    }

    public IWebElement GoButton
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_go"));
        }
    }

    public IWebElement ResultsCountDiv
    {
        get
        {
            return this.driver.FindElement(By.Id("b_tween"));
        }
    }
}
```

```javascript
var doc = "";
var index = 1;
var tab = "\t";

this.configForm =
  "<description>Variable for Selenium instance</description>" +
  '<textbox id="options_receiver" value="this.driver"/>' +
  "<description>ClassName</description>" +
  '<textbox id="options_className" value="PageName" />';

this.name = "C# Anton (Driver)";
this.testcaseExtension = ".cs";
this.suiteExtension = ".cs";
this.driver = true;

this.options = {
  receiver: "this.driver",
  className: "PageName",
  header: "public partial class Page : BasePage\n{\n",
  footer: "}\n" + "\n" + "\n",
  defaultExtension: "cs",
};

function parse(testCase, source) {
  doc = source;

  var commands = [];
  var sep = {
    comma: ",",
    tab: "\t",
  };
  var count = 0;
  while (doc.length > 0) {
    var line = /(.*)(\r\n|[\r\n])?/.exec(doc);
    count++;
    var array = line[1].split(sep);
    if (array.length >= 3) {
      var command = new Command();
      command.command = array[0];
      command.target = array[1];
      command.value = array[2];
      commands.push(command);
    }
    doc = doc.substr(line[0].length);
  }
  testCase.setCommands(commands);
}

function format(testCase, name) {
  return formatCommands(testCase.commands);
}

function formatCommands(commands) {
  var result = "";
  result += this.options["header"];

  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    if (command.type == "command") {
      var currentResult = "";
      currentResult = setCommand(command);
      result += currentResult;
    }
  }
  result += this.options["footer"];

  return result;
}

setCommand = function (command) {
  var startPropElement =
    tab +
    "public IWebElement Element" +
    index++ +
    "\n" +
    tab +
    "{" +
    "\n" +
    tab +
    tab +
    "get" +
    "\n" +
    tab +
    tab +
    "{" +
    "\n" +
    tab +
    tab +
    tab;
  var endPropElement = "\n" + tab + tab + "}" + "\n" + tab + "}" + "\n";
  var result = tab;

  switch (command.command.toString()) {
    case "clickAndWait":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "click":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "type":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "assertTextPresent":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "verifyTextPresent":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "verifyText":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "assertText":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "waitForElementPresent":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "verifyElementPresent":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "verifyElementNotPresent":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "waitForElementNotPresent":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "waitForTextPresent":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "waitForTextNotPresent":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "waitForChecked":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "waitForNotChecked":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "storeValue":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "storeAttribute":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    case "select":
      result =
        startPropElement +
        searchContext(command.target.toString()) +
        endPropElement;
      break;
    default:
  }

  result += "\n";
  return result;
};

searchContext = function (locator) {
  if (locator.startsWith("xpath")) {
    return (
      'return this.driver.FindElement(By.XPath("' +
      locator.substring("xpath=".length) +
      '"));'
    );
  } else if (locator.startsWith("//")) {
    return 'return this.driver.FindElement(By.XPath("' + locator + '"));';
  } else if (locator.startsWith("css")) {
    return (
      'return this.driver.FindElement(By.CssSelector("' +
      locator.substring("css=".length) +
      '"));'
    );
  } else if (locator.startsWith("link")) {
    return (
      'return this.driver.FindElement(By.LinkText("' +
      locator.substring("link=".length) +
      '"));'
    );
  } else if (locator.startsWith("name")) {
    return (
      'return this.driver.FindElement(By.Name("' +
      locator.substring("name=".length) +
      '"));'
    );
  } else if (locator.startsWith("tag_name")) {
    return (
      'return this.driver.FindElement(By.TagName("' +
      locator.substring("tag_name=".length) +
      '"));'
    );
  } else if (locator.startsWith("partialID")) {
    return (
      'return this.driver.FindElement(By.XPath("' +
      "//*[contains(@id,'" +
      locator.substring("partialID=".length) +
      "')]" +
      '"));'
    );
  } else if (locator.startsWith("id")) {
    return (
      'return this.driver.FindElement(By.Id("' +
      locator.substring("id=".length) +
      '"));'
    );
  } else {
    return 'return this.driver.FindElement(By.Id("' + locator + '"));';
  }
};
```

## Automate Telerik Kendo Grid with WebDriver and JavaScript

```csharp
public class KendoGrid
{
    private readonly string gridId;
    private readonly IJavaScriptExecutor driver;

    public KendoGrid(IWebDriver driver, IWebElement gridDiv)
    {
        this.gridId = gridDiv.GetAttribute("id");
        this.driver = (IJavaScriptExecutor)driver;
    }

    public void NavigateToPage(int pageNumber)
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.page(", pageNumber, ");");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    private string GetGridReference()
    {
        string initializeKendoGrid = string.Format("var grid = $('#{0}').data('kendoGrid');", this.gridId);

        return initializeKendoGrid;
    }
}
```

```csharp
var grid = $("#grid").data("kendoGrid");

```

```csharp
grid.dataSource.page("5");

```

```csharp
public void Sort(string columnName, SortType sortType)
{
    string jsToBeExecuted = this.GetGridReference();
    jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.sort({field: '", columnName, "', dir: '", sortType.ToString().ToLower(), "'});");
    this.driver.ExecuteScript(jsToBeExecuted);
}
```

```csharp
public void ChangePageSize(int newSize)
{
    string jsToBeExecuted = this.GetGridReference();
    jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.pageSize(", newSize, ");");
    this.driver.ExecuteScript(jsToBeExecuted);
}
```

```csharp
public List<T> GetItems<T>() where T : class
{
    string jsToBeExecuted = this.GetGridReference();
    jsToBeExecuted = string.Concat(jsToBeExecuted, "return JSON.stringify(grid.dataSource.data());");
    var jsResults = this.driver.ExecuteScript(jsToBeExecuted);
    var items = JsonConvert.DeserializeObject<List<T>>(jsResults.ToString());
    return items;
}
```

```csharp
public void Filter(string columnName, FilterOperator filterOperator, string filterValue)
{
    this.Filter(new GridFilter(columnName, filterOperator, filterValue));
}

public void Filter(params GridFilter[] gridFilters)
{
    string jsToBeExecuted = this.GetGridReference();
    StringBuilder sb = new StringBuilder();
    sb.Append(jsToBeExecuted);
    sb.Append("grid.dataSource.filter({ logic: \"and\", filters: [");
    foreach (var currentFilter in gridFilters)
    {
        DateTime filterDateTime;
        bool isFilterDateTime = DateTime.TryParse(currentFilter.FilterValue, out filterDateTime);
        string filterValueToBeApplied =
                                        isFilterDateTime ? string.Format("new Date({0}, {1}, {2})", filterDateTime.Year, filterDateTime.Month - 1, filterDateTime.Day) :
                                        string.Format("\"{0}\"", currentFilter.FilterValue);
        string kendoFilterOperator = this.ConvertFilterOperatorToKendoOperator(currentFilter.FilterOperator);
        sb.Append(string.Concat("{ field: \"", currentFilter.ColumnName, "\", operator: \"", kendoFilterOperator, "\", value: ", filterValueToBeApplied, " },"));
    }
    sb.Append("] });");
    jsToBeExecuted = sb.ToString().Replace(",]", "]");
    this.driver.ExecuteScript(jsToBeExecuted);
}

private string ConvertFilterOperatorToKendoOperator(FilterOperator filterOperator)
{
    string kendoFilterOperator = string.Empty;
    switch (filterOperator)
    {
        case FilterOperator.EqualTo:
            kendoFilterOperator = "eq";
            break;
        case FilterOperator.NotEqualTo:
            kendoFilterOperator = "neq";
            break;
        case FilterOperator.LessThan:
            kendoFilterOperator = "lt";
            break;
        case FilterOperator.LessThanOrEqualTo:
            kendoFilterOperator = "lte";
            break;
        case FilterOperator.GreaterThan:
            kendoFilterOperator = "gt";
            break;
        case FilterOperator.GreaterThanOrEqualTo:
            kendoFilterOperator = "gte";
            break;
        case FilterOperator.StartsWith:
            kendoFilterOperator = "startswith";
            break;
        case FilterOperator.EndsWith:
            kendoFilterOperator = "endswith";
            break;
        case FilterOperator.Contains:
            kendoFilterOperator = "contains";
            break;
        case FilterOperator.NotContains:
            kendoFilterOperator = "doesnotcontain";
            break;
        case FilterOperator.IsAfter:
            kendoFilterOperator = "gt";
            break;
        case FilterOperator.IsAfterOrEqualTo:
            kendoFilterOperator = "gte";
            break;
        case FilterOperator.IsBefore:
            kendoFilterOperator = "lt";
            break;
        case FilterOperator.IsBeforeOrEqualTo:
            kendoFilterOperator = "lte";
            break;
        default:
            throw new ArgumentException("The specified filter operator is not supported.");
    }

    return kendoFilterOperator;
}
```

```csharp
public enum FilterOperator
{
    EqualTo,
    NotEqualTo,
    LessThan,
    LessThanOrEqualTo,
    GreaterThan,
    GreaterThanOrEqualTo,
    StartsWith,
    EndsWith,
    Contains,
    NotContains,
    IsAfter,
    IsAfterOrEqualTo,
    IsBefore,
    IsBeforeOrEqualTo
}
```

```csharp
public class KendoGrid
{
    private readonly string gridId;
    private readonly IJavaScriptExecutor driver;

    public KendoGrid(IWebDriver driver, IWebElement gridDiv)
    {
        this.gridId = gridDiv.GetAttribute("id");
        this.driver = (IJavaScriptExecutor)driver;
    }

    public void RemoveFilters()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.filter([]);");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public int TotalNumberRows()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.total();");
        var jsResult = this.driver.ExecuteScript(jsToBeExecuted);
        return int.Parse(jsResult.ToString());
    }

    public void Reload()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.read();");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public int GetPageSize()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "return grid.dataSource.pageSize();");
        var currentResponse = this.driver.ExecuteScript(jsToBeExecuted);
        int pageSize = int.Parse(currentResponse.ToString());
        return pageSize;
    }

    public void ChangePageSize(int newSize)
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.pageSize(", newSize, ");");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public void NavigateToPage(int pageNumber)
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.page(", pageNumber, ");");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public void Sort(string columnName, SortType sortType)
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.sort({field: '", columnName, "', dir: '", sortType.ToString().ToLower(), "'});");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public List<T> GetItems<T>() where T : class
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "return JSON.stringify(grid.dataSource.data());");
        var jsResults = this.driver.ExecuteScript(jsToBeExecuted);
        var items = JsonConvert.DeserializeObject<List<T>>(jsResults.ToString());
        return items;
    }

    public void Filter(string columnName, FilterOperator filterOperator, string filterValue)
    {
        this.Filter(new GridFilter(columnName, filterOperator, filterValue));
    }

    public void Filter(params GridFilter[] gridFilters)
    {
        string jsToBeExecuted = this.GetGridReference();
        StringBuilder sb = new StringBuilder();
        sb.Append(jsToBeExecuted);
        sb.Append("grid.dataSource.filter({ logic: \"and\", filters: [");
        foreach (var currentFilter in gridFilters)
        {
            DateTime filterDateTime;
            bool isFilterDateTime = DateTime.TryParse(currentFilter.FilterValue, out filterDateTime);
            string filterValueToBeApplied =
                                            isFilterDateTime ? string.Format("new Date({0}, {1}, {2})", filterDateTime.Year, filterDateTime.Month - 1, filterDateTime.Day) :
                                            string.Format("\"{0}\"", currentFilter.FilterValue);
            string kendoFilterOperator = this.ConvertFilterOperatorToKendoOperator(currentFilter.FilterOperator);
            sb.Append(string.Concat("{ field: \"", currentFilter.ColumnName, "\", operator: \"", kendoFilterOperator, "\", value: ", filterValueToBeApplied, " },"));
        }
        sb.Append("] });");
        jsToBeExecuted = sb.ToString().Replace(",]", "]");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public int GetCurrentPageNumber()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "return grid.dataSource.page();");
        var result = this.driver.ExecuteScript(jsToBeExecuted);
        int pageNumber = int.Parse(result.ToString());
        return pageNumber;
    }

    private string GetGridReference()
    {
        string initializeKendoGrid = string.Format("var grid = $('#{0}').data('kendoGrid');", this.gridId);

        return initializeKendoGrid;
    }

    private string ConvertFilterOperatorToKendoOperator(FilterOperator filterOperator)
    {
        string kendoFilterOperator = string.Empty;
        switch (filterOperator)
        {
            case FilterOperator.EqualTo:
                kendoFilterOperator = "eq";
                break;
            case FilterOperator.NotEqualTo:
                kendoFilterOperator = "neq";
                break;
            case FilterOperator.LessThan:
                kendoFilterOperator = "lt";
                break;
            case FilterOperator.LessThanOrEqualTo:
                kendoFilterOperator = "lte";
                break;
            case FilterOperator.GreaterThan:
                kendoFilterOperator = "gt";
                break;
            case FilterOperator.GreaterThanOrEqualTo:
                kendoFilterOperator = "gte";
                break;
            case FilterOperator.StartsWith:
                kendoFilterOperator = "startswith";
                break;
            case FilterOperator.EndsWith:
                kendoFilterOperator = "endswith";
                break;
            case FilterOperator.Contains:
                kendoFilterOperator = "contains";
                break;
            case FilterOperator.NotContains:
                kendoFilterOperator = "doesnotcontain";
                break;
            case FilterOperator.IsAfter:
                kendoFilterOperator = "gt";
                break;
            case FilterOperator.IsAfterOrEqualTo:
                kendoFilterOperator = "gte";
                break;
            case FilterOperator.IsBefore:
                kendoFilterOperator = "lt";
                break;
            case FilterOperator.IsBeforeOrEqualTo:
                kendoFilterOperator = "lte";
                break;
            default:
                throw new ArgumentException("The specified filter operator is not supported.");
        }

        return kendoFilterOperator;
    }
}
```

```csharp
[TestClass]
public class KendoGridTests
{
    private IWebDriver driver;

    [TestInitialize]
    public void SetupTest()
    {
        this.driver = new FirefoxDriver();
        this.driver.Manage().Timeouts().SetPageLoadTimeout(TimeSpan.FromSeconds(5));
    }

    [TestCleanup]
    public void TeardownTest()
    {
        this.driver.Quit();
    }

    [TestMethod]
    public void FilterContactName()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        kendoGrid.Filter("ContactName", Enums.FilterOperator.Contains, "Thomas");
        var items = kendoGrid.GetItems<GridItem>();
        Assert.AreEqual(1, items.Count);
    }

    [TestMethod]
    public void SortContactTitleDesc()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        kendoGrid.Sort("ContactTitle", SortType.Desc);
        var items = kendoGrid.GetItems<GridItem>();
        Assert.AreEqual("Sales Representative", items[0]);
        Assert.AreEqual("Sales Representative", items[1]);
    }

    [TestMethod]
    public void TestCurrentPage()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        var pageNumber = kendoGrid.GetCurrentPageNumber();
        Assert.AreEqual(1, pageNumber);
    }

    [TestMethod]
    public void GetPageSize()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        var pageNumber = kendoGrid.GetPageSize();
        Assert.AreEqual(20, pageNumber);
    }

    [TestMethod]
    public void GetAllItems()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));

        var items = kendoGrid.GetItems<GridItem>();
        Assert.AreEqual(91, items.Count);
    }
}
```

## Test URL Redirects with WebDriver and HttpWebRequest

```xml
<?xml version="1.0" encoding="utf-8" ?>
<sites>
  <site url="http://automatetheplanet.com/" name="AutomateThePlanet">
    <redirects>
      <redirect from="http://automatetheplanet.com/singleton-design-pattern-design-patterns-in-automation-testing/" to="/singleton-design-pattern/" />
      <redirect from="/advanced-strategy-design-pattern-design-patterns-in-automation-testing/" to="/advanced-strategy-design-pattern/" />
    </redirects>
  </site>
</sites>
```

```csharp
[XmlRoot(ElementName = "sites")]
public class Sites
{
    [XmlElement(ElementName = "site")]
    public List<Site> Site { get; set; }
}

[XmlRoot(ElementName = "site")]
public class Site
{
    [XmlElement(ElementName = "redirects")]
    public Redirects Redirects { get; set; }

    [XmlAttribute(AttributeName = "url")]
    public string Url { get; set; }

    [XmlAttribute(AttributeName = "name")]
    public string Name { get; set; }
}

[XmlRoot(ElementName = "redirects")]
public class Redirects
{
    [XmlElement(ElementName = "redirect")]
    public List<Redirect> Redirect { get; set; }
}

[XmlRoot(ElementName = "redirect")]
public class Redirect
{
    [XmlAttribute(AttributeName = "from")]
    public string From { get; set; }

    [XmlAttribute(AttributeName = "to")]
    public string To { get; set; }
}
```

```csharp
public class RedirectService : IDisposable
{
    readonly IRedirectStrategy redirectEngine;
    private Sites sites;

    public RedirectService(IRedirectStrategy redirectEngine)
    {
        this.redirectEngine = redirectEngine;
        this.redirectEngine.Initialize();
        this.InitializeRedirectUrls();
    }

    public void TestRedirects()
    {
        bool shouldFail = false;

        foreach (var currentSite in this.sites.Site)
        {
            Uri baseUri = new Uri(currentSite.Url);

            foreach (var currentRedirect in currentSite.Redirects.Redirect)
            {
                Uri currentFromUrl = new Uri(baseUri, currentRedirect.From);
                Uri currentToUrl = new Uri(baseUri, currentRedirect.To);

                string currentSitesUrl = this.redirectEngine.NavigateToFromUrl(currentFromUrl.AbsoluteUri);
                try
                {
                    Assert.AreEqual<string>(currentToUrl.AbsoluteUri, currentSitesUrl);
                    Console.WriteLine(string.Format("{0} \n OK", currentFromUrl));
                }
                catch (Exception)
                {
                    shouldFail = true;
                    Console.WriteLine(string.Format("{0} \n was NOT redirected to \n {1}", currentFromUrl, currentToUrl));
                }
            }
        }
        if (shouldFail)
        {
            throw new Exception("There were incorrect redirects!");
        }
    }

    public void Dispose()
    {
        redirectEngine.Dispose();
    }

    private void InitializeRedirectUrls()
    {
        XmlSerializer deserializer = new XmlSerializer(typeof(Sites));
        TextReader reader = new StreamReader(@"redirect-URLs.xml");
        this.sites = (Sites)deserializer.Deserialize(reader);
        reader.Close();
    }
}
```

```csharp
public interface IRedirectStrategy : IDisposable
{
    void Initialize();

    string NavigateToFromUrl(string fromUrl);

    void Dispose();
}
```

```csharp
public class WebDriverRedirectStrategy : IRedirectStrategy
{
    private IWebDriver driver;

    public void Initialize()
    {
        this.driver = new FirefoxDriver();
    }

    public void Dispose()
    {
        this.driver.Quit();
    }

    public string NavigateToFromUrl(string fromUrl)
    {
        this.driver.Navigate().GoToUrl(fromUrl);
        string currentSitesUrl = this.driver.Url;

        return currentSitesUrl;
    }
}
```

```csharp
public class WebRequestRedirectStrategy : IRedirectStrategy
{
    public void Initialize()
    {
    }

    public string NavigateToFromUrl(string fromUrl)
    {
        HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(fromUrl);
        request.Method = "HEAD";
        request.Timeout = (int)TimeSpan.FromHours(1).TotalMilliseconds;
        string currentSitesUrl = string.Empty;
        try
        {
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {
                currentSitesUrl = response.ResponseUri.ToString();
            }
        }
        catch (WebException)
        {
            currentSitesUrl = null;
        }

        return currentSitesUrl;
    }
    public void Dispose()
    {
    }
}
```

```csharp
[TestClass]
public class RedirectsTester
{
    [TestMethod]
    public void TestRedirects()
    {
        var redirectService = new RedirectService(new WebRequestRedirectStrategy());
        using (redirectService)
        {
            redirectService.TestRedirects();
        }
    }
}
```

## Getting Started with WebDriver C# in 10 Minutes

```csharp
IWebDriver firefoxDriver = new FirefoxDriver();
IWebDriver ieDriver = new InternetExlorerDriver();
IWebDriver edgeDriver = new EdgeDriver();
IWebDriver chromeDriver = new ChromeDriver();
```

```csharp
new DriverManager().SetUpDriver(new ChromeConfig());
new DriverManager().SetUpDriver(new FirefoxConfig());
new DriverManager().SetUpDriver(new EdgeConfig());
new DriverManager().SetUpDriver(new OperaConfig());
```

```csharp
driverOne.Navigate().GoToUrl("http://automatetheplanet.com/");

```

```csharp
// By ID
IWebElement element = driverOne.FindElement(By.Id("myUniqueId"));
// By Class (Find more than one element on the page)
IList<IWebElement> elements = driverOne.FindElements(By.ClassName("green"));
// By Tag Name
IWebElement frame = driverOne.FindElement(By.TagName("iframe"));
// By Name
IWebElement cheese = driverOne.FindElement(By.Name("goran"));
// By Link Text
IWebElement link = driverOne.FindElement(By.LinkText("best features"));
// By XPath
IList<IWebElement> inputs = driverOne.FindElements(By.XPath("//input"));
// By CSS Selector
IWebElement css = driverOne.FindElement(By.CssSelector("#green span.dairy.baged"));
```

```csharp
IWebElement hardToFind = this.driverOne.FindElement(By.ClassName(“firstElementTable")).FindElement(By.Id(“secondElement"));
```

```csharp
IWebElement element = driverOne.FindElement(By.Name("search"));
element.Clear();
element.SendKeys("Automate The Planet!");
```

```csharp
SelectElement selectElement = new SelectElement(driver.FindElement(By.XPath("/html/body/select")));
selectElement.SelectByText("Planet");
```
