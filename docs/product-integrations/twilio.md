---
layout: default
title:  "Twilio SMS Integration"
excerpt: "Learn how to test SMS using Twilio with BELLATRIX"
date:   2024-07-04 16:40:00 +0200
parent: product-integrations
permalink: /product-integrations/twilio/
anchors:
  what-is-twilio: What Is Twilio?
  usage: Usage
  config: Config
---
What Is Twilio?
------------------
**[Twilio](https://www.twilio.com/)** is a cloud communications platform that enables developers to build, scale, and operate real-time communications within their applications. Founded in 2008, Twilio offers various APIs to facilitate communication services, including voice, video, and messaging.

Twilio's SMS services are among its most popular offerings, allowing businesses to send and receive text messages globally.

Usage
------------------

The Twilio SMS API is exposed through an **SmsService** in BELLATRIX. To access it, you must include the Bellatrix.SMS project as a dependency.
**SmsService** class is an utility class and contains only static methods. Another class is **SmsListener**.

Here are some examples usages of the twilio integration in BELLATRIX:
```csharp
var authenticationSmsListener = SmsService.ListenForSms(fromNumber);
// code which will trigger an sms to be sent to the phone number you have specified inside the config file
var authenticationMessage = authenticationSmsListener.GetFirstMessage();
authenticationSmsListener.StopListening(); // we stop listening for messages as we have already received the message we need
```
We start listening for messages from the number we are expecting a message from, we wait for the message to be received and then we get it.

```csharp
var allMessages = authenticationSmsListener.GetMessages();
```
Get all messages.
```csharp
var lastMessage = authenticationSmsListener.GetLastMessage();
```
Get last message.

Config
------------------
The settings section in the config file must look like this:
```JSON
"twilioSettings": {
  "accountSID": "insert your account SID",
  "authToken": "insert your auth token",
  "phoneNumber": "insert the phone number which will be used by your tests"
}
```