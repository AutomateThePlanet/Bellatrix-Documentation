---
layout: default
title:  "Email Testing Testmail"
excerpt: "Learn to test emails via Testmail integration."
date:   2022-08-12 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/testmail/
anchors:
  what-is-testmail: What Is Testmail?
  usage: Usage
---
What Is Testmail?
------------------
**[Testmail](https://testmail.app/)** is a service offering unlimited email addresses and mailboxes for automating end-to-end tests with our simple APIs.

Usage
------------------
BELLATRIX offers a few utilities for email testing. There are few scenarios where we need such integration. The first one is related to creating unique email inboxes and using the generated individual emails to submit various online forms. Later, we can read the emails via the services and check the content of the emails. It might be enough to verify the content via regular C#, or in some cases, we might need to interact with the email content in the browser. For both cases we offer utilities.
Testmail is a PAID service so you need to create an account and generate an API key which you need to pass to our service class, this is the only configuration needed.
```csharp
var testmailService = new TestmailService("yourAPIkey", "namespaceName");
```
**Get Last Sent Email**
```csharp
var email = testmailService.GetLastSentEmail("mainInboxName");
```
**Get All Emails**
```csharp
var emails = testmailService.GetAllEmails("mainInboxName");
```
**Interact with Email in Browser**

There is another service class which can read email's HTML body and loaded in the current test browser. Afterwards you can use standard BELLATRIX code to interact with it. The **EmailService** is located in the **Bellatrix.Web** project under the **utilities** namespace.
```csharp
EmailService.LoadEmailBody("emailHTML");
```
This utility supports running in Cloud Grid mode, but you need to check your grid's documentation on enabling testing within a local folder. Also, you might need to add additional code to the method.