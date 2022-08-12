---
layout: default
title:  "Email Testing Mailslurp"
excerpt: "Learn to test emails via Mailslurp integration."
date:   2022-08-12 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/mailslurp/
anchors:
  what-is-mailslurp: What Is Mailslurp?
  usage: Usage
---
What Is Mailslurp?
------------------
**[Mailslurp](https://www.mailslurp.com/)** is a service offering powerful email & SMS APIs for development and testing. You can send and receive emails from unlimited custom email addresses in code and tests. Create real phone numbers and process inbound TXT messages.

Usage
------------------
BELLATRIX offers a few utilities for email testing. There are few scenarios where we need such integration. The first one is related to creating unique email inboxes and using the generated individual emails to submit various online forms. Later, we can read the emails via the services and check the content of the emails. It might be enough to verify the content via regular C#, or in some cases, we might need to interact with the email content in the browser. For both cases we offer utilities.
Mailslurp is a PAID service so you need to create an account and generate an API key which you need to pass to our service class, this is the only configuration needed.
```csharp
var mailslurpService = new MailslurpService("yourAPIkey");
```
**Create Inbox**
```csharp
var testingInbox = mailslurpService.CreateInbox("mainTestingInbox");
```
**Wait for Latest Email**
```csharp
mailslurpService.WaitForLatestEmail(testingInbox, DateTime.Now.AddMinutes(-5));
```
We wait for latest emails received in the last 5 minutes. Better use different inboxes for different tests since if you run them in parallel everything can messed up.
**Send Email**
Sometimes it might be useful to be able to send emails via code.
```csharp
mailslurpService.SendEmail(testingInbox, "john.smith@yahoo.com", "some subject", "NameOfYourEmailTemplateAsEmbededResource");
```
**Interact with Email in Browser**

There is another service class which can read email's HTML body and loaded in the current test browser. Afterwards you can use standard BELLATRIX code to interact with it. The **EmailService** is located in the **Bellatrix.Web** project under the **utilities** namespace.
```csharp
EmailService.LoadEmailBody("emailHTML");
```
This utility supports running in Cloud Grid mode, but you need to check your grid's documentation on enabling testing within a local folder. Also, you might need to add additional code to the method.