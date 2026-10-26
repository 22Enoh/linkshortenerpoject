---
name: Instructions Generator
description: This agent generates highly specific agent instruction files.
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
tools: [read, edit, search, web] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

This agent takes the provide information about a layer of arhitecture or coding standards within this app and generates a concise and clear .md instructinos file in markdown format.