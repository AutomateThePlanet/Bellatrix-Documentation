---
layout: default
title:  "Authentication"
excerpt: "Learn how to authenticate your requests using BELLATRIX API library."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/authentication/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[JwtAuthenticationStrategy(GlobalConstants.JwtToken)]
public class AuthenticationTests : APITest
{
    [TestMethod]
    public void GetAlbumById()
    {
        var request = new RestRequest("api/Albums/10");

        var client = App.GetApiClientService();

        var response = client.Get<Albums>(request);

        Assert.AreEqual(10, response.Data.AlbumId);
    }
}
```

Explanations
------------
BELLATRIX provides an easy way to authenticate through the usage of few attributes.
```csharp
[JwtAuthenticationStrategy(GlobalConstants.JwtToken)]
```
We use [JwtToken authentication]( https://tools.ietf.org/html/draft-ietf-oauth-json-web-token). The attribute accepts your text tocken.
Other authentication strategy attributes:

- **HttpBasicAuthenticationStrategy** - user and password.
- **NtlmAuthenticationStrategy** - authenticate with the credentials of the currently logged in user, or impersonate a user.
- **OAuth2AuthorizationRequestHeaderAuthenticationStrategy** - OAuth 2 authenticator using the authorization request header field.
- **OAuth2UriQueryParameterAuthenticationStrategy** - OAuth 2 authenticator using URI query parameter.
- **SimpleAuthenticationStrategy** - userKey, user, passwordKey, password.