---
layout: default
title:  "Use with AI Agents"
excerpt: "Let an AI coding agent write BELLATRIX C# tests for web, desktop and mobile with the bellatrix CLI and scaffolded skills."
date:   2026-10-27 06:50:17 +0200
permalink: /use-with-ai-agents/
anchors:
  overview: Overview
  install-the-cli: Install the CLI
  scaffold-the-c-skills: Scaffold the C# Skills
  set-up-the-test-project: Set Up the Test Project
  learn-more: Learn More
---
Overview
--------
The BELLATRIX AI agent toolkit lets an AI coding agent (Claude Code, GitHub Copilot, Cursor, Devin, Codex CLI, Gemini CLI for enterprise, Antigravity CLI, Kiro CLI or OpenCode) write BELLATRIX tests for you. It has two parts:
- the **`bellatrix` CLI**, which drives a live app one action at a time (`bellatrix desktop|web|mobile <verb>`) and runs no AI model itself;
- **skills and subagents** that `bellatrix init` writes into your repository, in your agent's native layout. They teach the agent the BELLATRIX C# components, page objects and test structure, and how to resolve stable locators.

The C# skills cover **web, desktop and mobile (Android and iOS)**.

Install the CLI
---------------
You need the .NET 8 SDK. The CLI is the .NET global tool `Bellatrix.Cli`:
```
dotnet tool install -g Bellatrix.Cli
bellatrix --version
bellatrix help
```
The driver is yours to run: WinAppDriver for desktop, Appium plus a device or emulator for mobile. For web, the CLI starts a local browser driver itself.

Scaffold the C# Skills
----------------------
Run this in the root of your test repository:
```
bellatrix init --agent claude --language csharp --domains desktop,web,mobile --json
```
Replace `claude` with `copilot`, `cursor`, `devin`, `codex`, `gemini`, `antigravity`, `kiro` or `opencode`, or list several (`--agent claude,cursor`). With a `*.csproj` or `*.sln` in the root folder, `--language csharp` is detected automatically. Add `--dry-run` to preview the files.

Set Up the Test Project
-----------------------
Reference the BELLATRIX projects for your domain from your test project, as described in [How to Use Starter Kits?](https://docs.bellatrix.solutions/general-information/how-to-use-starter-kits/), and use the BELLATRIX NUnit (default) or MSTest base classes. The generated page objects follow the 3-file pattern: actions, map and assertions.

Learn More
----------
The full guide — workflow, CLI reference, support matrix per AI agent and known limits — is at [bellatrix.solutions/agent](https://bellatrix.solutions/agent/).
The CLI and the skill templates are open source: [BELLATRIX-Agent on GitHub](https://github.com/AutomateThePlanet/BELLATRIX-Agent).
