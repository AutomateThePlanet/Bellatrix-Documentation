---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

## Testing for Developers- Unit Testing Fundamentals

```csharp
public void ClearCart()
{
var cartItems = _appDbContext
.ShoppingCartItems
.Where(cart => cart.ShoppingCartId == ShoppingCartId);
_appDbContext.ShoppingCartItems.RemoveRange(cartItems);
_appDbContext.SaveChanges();
}
```

```csharp
public void ClearCart()
{
    var cartItems = _appDbContext
    .ShoppingCartItems
    .Where(cart => cart.ShoppingCartId == ShoppingCartId);
    _appDbContext.ShoppingCartItems.RemoveRange(cartItems);
    _appDbContext.SaveChanges();
}
```

```csharp
public List<ShoppingCartItem> GetShoppingCartItems()
{
    return ShoppingCartItems ??
    (ShoppingCartItems =
    _appDbContext.ShoppingCartItems
    .Where(c => c.ShoppingCartId == ShoppingCartId)
    .Include(s => s.Pie)
    .ToList());
}
```

```csharp
private string _shoppingCartId;
public static ShoppingCartService GetCart(IServiceProvider services)
{
    ISession session = services.GetRequiredService<IHttpContextAccessor>()?
    .HttpContext.Session;
    var context = services.GetService<AppDbContext>();
    string cartId = session.GetString("CartId") ?? Guid.NewGuid().ToString();
    session.SetString("CartId", cartId);
    return new ShoppingCartService(context) { _shoppingCartId = cartId };
}
```

```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetPie(int id)
{
    try
    {
        return Ok(pieDto);
    }
    catch (Exception ex)
    {
        _logger.LogCritical($"Exception while ... id {id}.", ex);
        return StatusCode(500, "A problem happened.");
    }
}

```

```csharp
[TestMethod]
public void ReturnCorrectDate_When_OneItemPresent()
{
    var shoppingCartService = new ShoppingCartService();
    shoppingCartService.AddToCart(new Pie(), 100);
    var item = shoppingCartService.GetShoppingCartItems().First();
    Assert.AreEqual(item.Created.Minute, DateTime.Now.Minute);
}
```

```csharp
[TestMethod]
public void ReturnCorrectDate_When_OneItemPresent()
{
    var shoppingCartService = new ShoppingCartService();
    shoppingCartService.AddToCart(new Pie(), 100);
    var item = shoppingCartService.GetShoppingCartItems().First();
    Assert.AreEqual(item.Created.Minute, DateTime.Now.Minute);
}
```

```csharp
[TestMethod]
public void AddPieToCart()
{
    var shoppingCartService = new ShoppingCartService();
    shoppingCartService.AddToCart(new Pie(), 100);
}
[TestMethod]
public void ReturnCorrectDate_When_OneItemPresent()
{
    var shoppingCartService = new ShoppingCartService();
    var item = shoppingCartService.GetShoppingCartItems().First();
    Assert.AreEqual(item.Created.Minute, DateTime.Now.Minute);
}
```

```csharp
[TestMethod]
public void ReturnCorrectDate_When_OneItemPresent()
{
    var shoppingCartService = new ShoppingCartService(new AppDbContext());
    shoppingCartService.AddToCart(new Pie(), 100);
    var item = shoppingCartService.GetShoppingCartItems().First();
    Assert.AreEqual(item.Created.Minute, DateTime.Now.Minute);
}
```

```csharp
public decimal GetShoppingCartTotal()
{
    var total = _appDbContext.ShoppingCartItems.Where(c => c.ShoppingCartId == ShoppingCartId)
    .Select(c => c.Pie.Price * c.Amount).Sum();
    return total;
}
```

```csharp
public static ShoppingCartService GetCart(IServiceProvider services)
{
    ISession session = services.GetRequiredService<IHttpContextAccessor>()?
    .HttpContext.Session;
    var context = services.GetService<AppDbContext>();
    string cartId = session.GetString("CartId") ?? Guid.NewGuid().ToString();
    session.SetString("CartId", cartId);
    return new ShoppingCartService(context);
}
```

```csharp
public string ShoppingCartId { get; set; }
public List<ShoppingCartItem> ShoppingCartItems { get; set; }
```

```csharp
public string ShortDescription
{
    get => _shortDescription;
    set
    {
        if (value.Length > 50)
        {
            throw new ArgumentException("Description should be less than 50 chars.");
        }
        _shortDescription = value;
    }
}
```
