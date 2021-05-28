---
layout: default
title:  "Azure Key Vault"
excerpt: "Learn to store secrets using Azure Key Vault integration."
date:   2021-06-23 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/azure-key-vault/
anchors:
  what-is-azure-key-vault: What Is Azure Key Vault?
  configuration: Configuration
  usage: Usage
---
What is Azure Key Vault?
------------------
**[Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/)** can be used to Securely store and tightly control access to tokens, passwords, certificates, API keys, and other secrets

![Bellatrix](images/reportportal-filters.png)

Configuration
------------------
To use the integration you need first to create and configure the Azure Key Vault service in your Azure subscription. To do so, you can follow the [official documentation](https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-cli).

Once you have everything in place you need to add the info to the BELLATRIX configuration under the **keyVaultSettings** section.
```json
  "keyVaultSettings": {
    "keyVaultEndpoint": "keyVaultEndpointUrl",
    "isEnabled": "false"
  },
```

Usage
------------------
Many of our services that require secrets, such as cloud provider integrations, can work out of the box with this service. In the configuration where you need to supply the password, username, or URL, you need to write the secret's name in the Azure Key Vault starting with the prefix **vault_**. If you have turned off the KeyVault, but you want to store secrets through environmental variables, you can still do that. First, keep the secret in an environmental variable. Then, in the config, instead of the prefix **vault_**, use **env_** followed by the name of the environmental variable where you stored the secret.
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
          "username": "vault_saucelabuser",
          "accessKey": "vault_accessKey"
        }
      ]
 }
```
Another way how you can use directly the integration is through to services **KeyVault** and **SecretsResolver**.
```csharp
string keyVaultValue = KeyVault.GetSecret("saucelabuser");
var _uri = SecretsResolver.GetSecret(() => ConfigurationService.GetSection<ReportingSettings>().Url);
```
The core difference is that **KeyVault** directly connects and returns the value for the secret in the key vault. At the same time, **SecretsResolver** also checks whether there is a set environmental variable on the execution machine matching the secret name.