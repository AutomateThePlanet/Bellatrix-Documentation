---
layout: default
title:  "AWS Secrets Manager"
excerpt: "Learn to store secrets using AWS Secrets Manager integration."
date:   2022-08-12 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/aws-secrets-manager/
anchors:
  what-is-aws-secrets-manager: What Is AWS Secrets Manager?
  usage: Usage
---
What Is AWS Secrets Manager?
------------------
**[AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)** can be used to Securely store and tightly control access to tokens, passwords, certificates, API keys, and other secrets

Usage
------------------
Many of our services that require secrets, such as cloud provider integrations, can work out of the box with this service. In the configuration where you need to supply the password, username, or URL, you need to write the secret's name in the AWS Secrets Manager starting with the prefix **smaws_**. If you have turned off the Secrets Manager, but you want to store secrets through environmental variables, you can still do that. First, keep the secret in an environmental variable. Then, in the config, instead of the prefix **smaws_**, use **env_** followed by the name of the environmental variable where you stored the secret.
```json
 "executionSettings": {
      "executionType": "regular",
      "defaultBrowser": "chrome",
      "defaultLifeCycle": "restart every time",
      "resolution": "",
      "browserVersion": "",
      "url": "http://127.0.0.1:4444/wd/hub",
      "arguments": [
        {
          "name": "{runName}",
          "platform": "Windows",
          "version": "86",
          "recordVideo": "true",
          "recordScreenshots": "true",
          "screenResolution": "1920x1080x24",
          "username": "smaws_saucelabuser",
          "accessKey": "smaws_accessKey"
        }
      ]
 }
```
Another way how you can use directly the integration is through to services **App.AWS.SecretsManager** and **App.AWS.SecretsResolver**.
```csharp
string keyVaultValue = App.AWS.SecretsManager.GetSecret("saucelabuser");
var _uri = App.AWS.SecretsResolver.GetSecret(() => ConfigurationService.GetSection<ReportingSettings>().Url);
```
The core difference is that **SecretsManager** directly connects and returns the value for the secret in the key vault. At the same time, **SecretsResolver** also checks whether there is a set environmental variable on the execution machine matching the secret name.