import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Zap, Shield, Layers } from "lucide-react";
import { Navbar, agents } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AgentHub — One Platform, Every AI Agent" },
      {
        name: "description",
        content:
          "AgentHub connects specialized AI agents — search, coding, presentations, PDFs, and image generation — into one seamless workspace.",
      },
      {
        property: "og:title",
        content: "AgentHub — One Platform, Every AI Agent",
      },
      {
        property: "og:description",
        content:
          "Connect and orchestrate specialized AI agents in one workspace.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-background to-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-4 py-2 backdrop-blur">
            <Sparkles className="h-4 w-4 text-emerald-700" />
            <span className="text-sm font-semibold text-emerald-800">
              Multi-Agent AI Platform
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            One Workspace For
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Every AI Agent
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AgentHub connects specialized AI agents — search, coding,
            presentations, PDFs, and image generation — into one seamless
            workspace. Attach the right agent for any task.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-emerald-600/25 transition hover:shadow-emerald-600/40">
              Explore Agents
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button className="rounded-2xl border border-border bg-background px-6 py-3.5 text-base font-semibold text-foreground shadow-sm transition hover:bg-muted">
              View Dashboard
            </button>
          </div>

          {/* Stat cards */}
          <div className="mt-20 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { value: "5+", label: "Specialized Agents" },
              { value: "24/7", label: "Always Available" },
              { value: "10k+", label: "Tasks Completed" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-background/80 p-6 text-left shadow-sm backdrop-blur"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <Sparkles className="h-5 w-5 text-emerald-700" />
                </div>
                <div className="mt-4 text-3xl font-bold text-foreground">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents grid */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Layers className="h-3.5 w-3.5" /> Agent Library
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Attach any agent,{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                anywhere
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pick the right specialist for your task. Combine them for more
              powerful workflows.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((a) => (
              <div
                key={a.name}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 transition group-hover:opacity-100`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${a.color}`}
                  >
                    <a.icon className={`h-6 w-6 ${a.iconColor}`} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">
                    {a.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
                  <button className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 transition group-hover:gap-2">
                    Attach agent <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Agents respond in real-time with streaming outputs.",
            },
            {
              icon: Shield,
              title: "Private & Secure",
              desc: "Your data stays yours. End-to-end encrypted workspaces.",
            },
            {
              icon: Layers,
              title: "Composable",
              desc: "Chain multiple agents together into powerful workflows.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-border/60 bg-background p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <f.icon className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <div>© 2026 AgentHub. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
