---
name: links-monthly-chart
description: Query the project's Neon Postgres database (DATABASE_URL from .env) for links created in the past 12 months and export a PNG bar chart of links created per month. Use whenever the user asks for link creation stats, growth or activity over time, a monthly links report, a chart or graph of links, or "how many links were created each month", even if they don't mention charts, Python, or the database.
---

# Links created per month chart

Produces a PNG bar chart: x axis = each of the last 12 calendar months (including the current, partial month), y axis = total links created that month. Months with no links show as 0.

## How to run

Run from the project root so the `.env` file is found (the script searches upward from the cwd, or pass `--env-file`):

```bash
pip install psycopg2-binary matplotlib
python .agents/skills/links-monthly-chart/scripts/plot_links_per_month.py --output links-per-month.png
```

Options: `--output <path.png>` (default `links-per-month.png` in the cwd), `--months <n>` (default 12), `--env-file <path>`.

The script reads `DATABASE_URL`, runs one read-only `COUNT ... GROUP BY month` query on the `links` table (`created_at`, bucketed in UTC), plots it, and prints the saved path plus the per-month counts. Report the PNG path and a one-line summary of the counts to the user.

## Rules

- The database URL is a secret: never print, log, echo, or copy it anywhere. Do not `cat` the `.env` file; the script reads it itself.
- Keep the query read-only. This skill only counts rows; do not modify data.
- Counts cover all users' links (it is a global stats chart). If the user asks for a specific user, add a `WHERE user_id = %s` filter with a parameterized value rather than string formatting.
- Do not commit the generated PNG unless asked.

## Troubleshooting

- `python` not found (Windows shows a Microsoft Store prompt): Python is not installed. Tell the user to install it (e.g. from python.org) and re-run; do not work around it by reimplementing the chart in another language unless asked.
- `ModuleNotFoundError`: install the packages from the command above.
- Connection errors: check that `DATABASE_URL` in `.env` is set and the Neon project is reachable; do not print the URL when reporting the error.
