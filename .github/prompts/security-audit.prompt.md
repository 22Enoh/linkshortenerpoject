---
agent: ask
---

perform a security audit on the project to detect potential vulnerabilities and security risks. 

Output your findings in a markdown table following id, serial, vulnerability, issue, filepath, lineunmber(s) and recommendation. Start at 1 and autoincrement the serial.

Next ask the user which issues they want to fix by eithrt replyng 'all' or a comma separated list of id numbers., run a separate sub agent (#runSubAgent) to fix eachissue that the user has specified. Each sub agent should report back witha  simple `subAgentSuccess: true|false` message.