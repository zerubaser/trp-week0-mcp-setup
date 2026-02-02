# TRP Week 0 — MCP Setup & Agent Rules Submission

This repository contains my submission for **TRP Week 0 (MCP Setup Challenge)**.  
It demonstrates MCP configuration, AI agent rule design, experimentation, verification, and documentation using a realistic backend project.

---

## Overview

The goal of this task was to:
- Configure a modern IDE with the Tenx MCP server
- Design and refine AI agent rules
- Test how rules influence agent behavior
- Verify changes with real execution and documentation

All work was done in **VS Code** with MCP enabled and active during experimentation.

---

## Repository Structure

```text
.
├── .vscode/
│   └── mcp.json                  # Tenx MCP server configuration
├── .github/
│   └── copilot-instructions.md   # Final Copilot agent rules
├── setup/
│   └── mcp-setup.md              # Task 1: MCP setup log
├── report/
│   └── agent-rules-report.md     # Task 2 & 3: Experiments, results, insights
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── db/
│   └── utils/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tsconfig.json
├── package.json
└── README.md
Tasks Completed
Task 1 — MCP Setup
Configured Tenx MCP server in VS Code

Completed GitHub authentication

Verified MCP tools availability in Copilot Agent mode

MCP connection remained active throughout the work

📄 Details: setup/mcp-setup.md

Task 2 — Research & Configure
Designed and refined Copilot agent rules

Tested agent behavior against:

Ambiguous requests

Multi-file changes

Verification-heavy tasks

Prevented assumption-based coding (e.g., auth strategy, dependencies)

Enforced planning, minimal diffs, and verification-first behavior

📄 Details: report/agent-rules-report.md
📄 Rules file: .github/copilot-instructions.md

Task 3 — Documentation
Documented what worked, what didn’t, and how issues were resolved

Included real verification using API requests

Captured insights on how rules changed agent behavior

📄 Details: report/agent-rules-report.md

Running the Project Locally (Optional)
npm install
npm run dev
API Usage
Health check
GET http://localhost:3000/health
Expected response:

{ "ok": true }
Notes API authentication
All /notes endpoints require the following request header:

x-user-id: <user-id>
Key Insights
Explicit agent rules significantly reduce assumption-based behavior

Enforcing planning and file listing prevents scope creep

Requiring verification steps leads to reproducible, trustworthy outputs

Simple, testable rules are more effective than rigid or theoretical enforcement

Submission
This repository is public and contains all required artifacts for review.

Thank you.