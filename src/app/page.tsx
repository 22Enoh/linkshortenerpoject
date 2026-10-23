import { SignUpButton } from "@clerk/nextjs";
import {
  ArrowRight,
  BarChart3,
  Link2,
  MousePointer2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Link2,
    title: "Short links, instantly",
    description:
      "Turn long, messy URLs into clean links that are easy to share anywhere.",
  },
  {
    icon: BarChart3,
    title: "Your links, in one place",
    description:
      "Keep your links together and find the one you need from your dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Made for your workflow",
    description:
      "Sign in to manage your links securely and pick up right where you left off.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-gradient-to-b from-primary/10 via-background to-background"
        />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12">
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
              A simpler way to share
            </div>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Long links,
              <br />
              <span className="text-primary">meet short links.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Make every link easier to share. Create clean, memorable short
              links and keep them organized in one simple dashboard.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <SignUpButton mode="modal">
                <Button size="lg" className="gap-2">
                  Get started for free
                  <ArrowRight aria-hidden="true" />
                </Button>
              </SignUpButton>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No fuss. Just better links.
            </p>
          </div>

          <Card className="relative mx-auto w-full max-w-xl border-border/70 bg-card/80 p-2 shadow-2xl shadow-primary/5 backdrop-blur">
            <CardHeader className="gap-2 p-6 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  LINK PREVIEW
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Ready to share
                </span>
              </div>
              <CardTitle className="text-xl font-semibold tracking-tight">
                A cleaner link in seconds
              </CardTitle>
              <CardDescription>
                Shorten a long URL and make it simple to share.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Your original link
                </p>
                <p className="break-all text-sm text-muted-foreground">
                  https://example.com/articles/how-to-share-links
                </p>
                <div className="my-5 flex items-center gap-3 text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  <ArrowRight className="size-4" aria-hidden="true" />
                  <span className="h-px flex-1 bg-border" />
                </div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Your short link
                </p>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/70 px-4 py-3">
                  <span className="flex min-w-0 items-center gap-2 font-medium text-foreground">
                    <Link2
                      className="size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="truncate">short.link/share-more</span>
                  </span>
                  <MousePointer2
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-7xl scroll-mt-8 px-6 pb-20 sm:px-10 sm:pb-28 lg:px-12"
      >
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Everything in its place
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Links that work harder for you.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Less clutter in your URLs, more clarity in the way you share.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="bg-card/60 transition-colors hover:bg-card">
              <CardHeader className="gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle
                  role="heading"
                  aria-level={3}
                  className="text-lg font-semibold"
                >
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-6">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
