#!/usr/bin/env python3
"""Plot links created per month (last N calendar months) from the Neon DB as a PNG bar chart.

Reads DATABASE_URL from a .env file (or the environment), runs one read-only
COUNT query against the `links` table, and writes the chart. Never prints the URL.
"""
import argparse
import os
import sys
from datetime import datetime, timezone
from pathlib import Path


def find_env_file(start: Path) -> Path | None:
    for directory in [start, *start.parents]:
        candidate = directory / ".env"
        if candidate.is_file():
            return candidate
    return None


def read_database_url(env_file: Path | None) -> str:
    if env_file is not None:
        for raw in env_file.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if line.startswith("export "):
                line = line[len("export "):]
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            if key.strip() == "DATABASE_URL":
                return value.strip().strip("'\"")
    url = os.environ.get("DATABASE_URL", "")
    if not url:
        sys.exit("DATABASE_URL not found in the .env file or the environment.")
    return url


def month_starts(count: int, now: datetime) -> list[datetime]:
    """First instant (UTC) of each of the last `count` calendar months, oldest first."""
    months = []
    year, month = now.year, now.month
    for _ in range(count):
        months.append(datetime(year, month, 1, tzinfo=timezone.utc))
        month -= 1
        if month == 0:
            year, month = year - 1, 12
    return months[::-1]


def fetch_counts(database_url: str, since: datetime) -> dict[str, int]:
    import psycopg2

    conn = psycopg2.connect(database_url)
    try:
        conn.set_session(readonly=True)
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM') AS ym, COUNT(*)
                FROM links
                WHERE created_at >= %s
                GROUP BY ym
                """,
                (since,),
            )
            return {ym: int(total) for ym, total in cur.fetchall()}
    finally:
        conn.close()


def plot(labels: list[str], values: list[int], output: Path) -> None:
    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.ticker import MaxNLocator

    fig, ax = plt.subplots(figsize=(11, 6))
    bars = ax.bar(labels, values, color="#4f46e5")
    ax.bar_label(bars, padding=3)
    ax.set_xlabel("Month")
    ax.set_ylabel("Links created")
    ax.set_title(f"Links created per month (last {len(labels)} months)")
    ax.yaxis.set_major_locator(MaxNLocator(integer=True))
    ax.set_ylim(0, max(values + [1]) * 1.15)
    ax.spines[["top", "right"]].set_visible(False)
    plt.setp(ax.get_xticklabels(), rotation=45, ha="right")
    fig.tight_layout()
    output.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output, dpi=150)
    plt.close(fig)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--env-file", type=Path, help="Path to .env (default: nearest .env above the cwd)")
    parser.add_argument("--output", type=Path, default=Path("links-per-month.png"))
    parser.add_argument("--months", type=int, default=12)
    args = parser.parse_args()

    env_file = args.env_file or find_env_file(Path.cwd())
    database_url = read_database_url(env_file)

    starts = month_starts(args.months, datetime.now(timezone.utc))
    counts = fetch_counts(database_url, starts[0])

    keys = [s.strftime("%Y-%m") for s in starts]
    labels = [s.strftime("%b %Y") for s in starts]
    values = [counts.get(k, 0) for k in keys]

    plot(labels, values, args.output)

    print(f"Saved chart to {args.output.resolve()}")
    for label, value in zip(labels, values):
        print(f"{label}: {value}")


if __name__ == "__main__":
    main()
