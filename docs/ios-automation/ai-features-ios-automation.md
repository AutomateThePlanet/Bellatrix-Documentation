---
layout: default
title:  "AI Features in iOS Automation"
excerpt: "Learn how to use the advanced LLM-powered BELLTRIX features such as element finding by prompt, assertions, self-healing, and smart failure analysis."
date:   2025-05-28 17:00:00 +0300
parent: ios-automation
permalink: /ios-automation/ai-features/  
anchors:  
  overview: Overview  
  element-finding: Element Finding by Prompt  
  assert-validate: AI Assertions and Validations  
  self-healing: Native Self-Healing via LLM  
  smart-analysis: Smart AI Analysis  
  configuration: Configuration and Settings  
  troubleshooting: Troubleshooting & Examples  
---

Overview
--------
BELLATRIX Mobile iOS brings advanced AI-driven automation to native and hybrid iOS apps:

- **Element Finding by Prompt**: Find elements with human-readable instructions, using semantic NSPredicate locators.
- **AssertByPrompt / ValidateByPrompt**: Validate UI state by describing what you expect.
- **Native Self-Healing via LLM**: Instantly repair failing locators after UI changes.
- **Smart AI Analysis**: Automated failure root cause analysis and actionable recommendations.

Element Finding by Prompt
--------
BELLATRIX for iOS allows you to locate any UI element just by describing it, without needing to know its internal identifiers.

**Example:**
```csharp
// Traditional:
var numberOne = App.Components.CreateById<TextField>("IntegerA");

// AI-powered, prompt-driven:
var compute = App.Components.CreateByPrompt<Button>("find the compute sum button");
compute.Click();
```

**How it works:**
- The framework first tries to match your prompt to known PageObject locators using Retrieval-Augmented Generation (RAG).
- If no match is found, it generates a new NSPredicate expression with LLM using the live view hierarchy snapshot.
- All successful locators are cached for instant and resilient future use.

**Example of AI-generated NSPredicate locator:**
```
nspredicate=label == 'ComputeSumButton'
```
or for fuzzy matches:
```
nspredicate=label CONTAINS 'Sum'
```

**What’s special:**
- The LLM picks the most robust match among available properties: `name`, `label`, `value`, `type`, and always prefers visible elements.
- All NSPredicate strings are quoted properly and designed for maximum resilience.
- No XPath is ever used, ensuring fast and stable tests.

AssertByPrompt and ValidateByPrompt
--------
Validate UI states using simple human-readable statements.

**Example:**
```csharp
ValidateByPrompt("validate that the result is 11");
```

**Output:**
```
✅ AI Validate passed: validate that the result is 11
```

**How it works:**
- BELLATRIX builds a structured JSON snapshot of the visible iOS controls and content.
- The LLM returns PASS or FAIL based on your intent, giving reasons on failure.

Native Self-Healing via LLM
--------
When a locator fails (due to changes in UI structure, accessibility, or text):

1. The framework compares the last successful snapshot with the current one.
2. The LLM generates a new, valid NSPredicate locator matching your intent and the new view state.
3. The new locator is tried only for this run (it’s not written permanently).
4. The self-healing process and result are fully logged.

**Trigger conditions:**
- `enableSelfHealing` is `true` in the settings.
- A locator fails due to text, name, or layout change.

**Scenarios:**
- Accessibility identifiers or button texts change after an app update.
- New layout or visibility rules.
- Dynamic localization or theming.

Smart AI Analysis via LLM
--------
On every test failure (or optionally on every run), BELLATRIX provides comprehensive AI-powered analysis:

- **BDD-style logs**: Every action and assertion is tracked.
- **UI Snapshots**: Both before and after the failure.
- **Root cause classification**: Test bug, app bug, or environment problem.
- **Concrete recommendations**: Next steps for the engineer.
- **Stacktrace and full log output** for investigation.

**Example output:**
```
🧠 AI-Driven Root Cause Summary:
---
### 🧠 Root Cause Classification:  
**Test Bug**  
The result label changed from '11' to '12' after UI logic update.
---
### 🛠 Recommended Actions:  
1. Update the validation statement or app logic.
2. Confirm correct expected value for calculation.
---
### 🧩 Reasoning and Evidence:  
- **Old Snapshot:** Result label = '11'
- **New Snapshot:** Result label = '12'
---
```

Configuration and Settings
--------
All main AI features are controlled in **testFrameworkSettings.Debug.json** under the section **largeLanguageModelsSettings**.

**Sample settings:**
```json
"largeLanguageModelsSettings": {
  "modelSettings": [
    {
      "endpoint": "env_AZURE_OPENAI_ENDPOINT",
      "key": "env_AZURE_OPENAI_KEY",
      "deployment": "gpt-4o"
    },
    {
      "serviceId": "openai-embed",
      "endpoint": "env_AZURE_OPENAI_EMBEDDINGS_ENDPOINT",
      "key": "env_AZURE_OPENAI_EMBEDDINGS_KEY",
      "embeddingDeployment": "text-embedding-ada-002"
    }
  ],
  "qdrantMemoryDbEndpoint": "http://localhost:6333",
  "localCacheConnectionString": "env_LocalCacheConnectionString",
  "localCacheProjectName": "ios_getting_started",
  "shouldIndexPageObjects": false,
  "pageObjectFilesPath": "Pages",
  "memoryIndex": "PageObjects",
  "resetIndexEverytime": false,
  "locatorRetryAttempts": 5,
  "validationsTimeout": 15,
  "sleepInterval": 1,
  "enableSelfHealing": true,
  "enableSmartFailureAnalysis": true
}
```

**Where to configure:**
- The file is in your project root.
- For cloud, set all keys and endpoints as environment variables.

**Docker Compose for Qdrant and local cache:**
```bash
docker-compose -f docker-compose.local_cache_postgres.yml up -d
```

- The compose file is in your repo root.
- For cloud, deploy Qdrant and update configuration.


**DB caching:**
- All resolved prompt-locators are cached and reused for future runs.
- The cache can be reset via `localCacheProjectName`.

Troubleshooting & Examples
--------
- When self-healing is triggered, you’ll see log lines like:
  - `⚠️ RAG-located element not present. Trying cached selectors...`
  - `🧠 Caching new selector for 'find the compute sum button': nspredicate=label == 'ComputeSumButton'`
  - `✅ Using cached selector.`
- If self-healing fails, smart AI analysis explains the problem and next steps.
