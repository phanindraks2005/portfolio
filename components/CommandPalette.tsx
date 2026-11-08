"use client";

import { ArrowRight, Copy, Download, FileText, Hash, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { projects, site } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { scrollToHash } from "./SmoothScroll";
import { copyEmail } from "./toast";

const OPEN_EVENT = "palette:open";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

const GROUPS = ["Sections", "Projects", "Links"];

type Item = { id: string; label: string; group: string; icon: ReactNode; run: () => void; keywords?: string };

const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const router = useRouter();

  const items: Item[] = useMemo(() => {
    const go = (hash: string) => {
      if (location.pathname !== "/") router.push("/" + hash);
      else scrollToHash(hash);
    };
    const list: Item[] = [
      { id: "projects", label: "Projects", group: "Sections", icon: <Hash size={16} />, run: () => go("#projects") },
      ...projects.map((p) => ({
        id: p.slug,
        label: p.name,
        group: "Projects",
        keywords: p.kind + " " + p.stack.join(" "),
        icon: <span className="size-2.5 rounded-full" style={{ background: p.color }} />,
        run: () => go(`#${p.slug}`),
      })),
      {
        id: "bugs",
        label: "Bugs I’ve killed",
        group: "Sections",
        keywords: "engineering debugging stories",
        icon: <Hash size={16} />,
        run: () => go("#bugs"),
      },
      {
        id: "verified",
        label: "Built, then verified",
        group: "Sections",
        keywords: "lighthouse audit numbers",
        icon: <Hash size={16} />,
        run: () => go("#verified"),
      },
      { id: "about", label: "About", group: "Sections", icon: <Hash size={16} />, run: () => go("#about") },
      {
        id: "now",
        label: "Now",
        group: "Sections",
        keywords: "what i'm doing currently placements dsa",
        icon: <Hash size={16} />,
        run: () => go("#now"),
      },
      {
        id: "skills",
        label: "Skills",
        group: "Sections",
        keywords: "stack technologies tools",
        icon: <Hash size={16} />,
        run: () => go("#skills"),
      },
      { id: "experience", label: "Experience", group: "Sections", icon: <Hash size={16} />, run: () => go("#experience") },
      {
        id: "education",
        label: "Education",
        group: "Sections",
        keywords: "college bmsce school coursework",
        icon: <Hash size={16} />,
        run: () => go("#education"),
      },
      {
        id: "achievements",
        label: "Achievements",
        group: "Sections",
        keywords: "chess football athletics utsav awards",
        icon: <Hash size={16} />,
        run: () => go("#achievements"),
      },
      { id: "contact", label: "Contact", group: "Sections", icon: <Hash size={16} />, run: () => go("#contact") },
      {
        id: "email",
        label: "Copy email address",
        group: "Links",
        keywords: site.email,
        icon: <Copy size={16} />,
        run: () => copyEmail(),
      },
      {
        id: "resume-page",
        label: "View resume",
        group: "Links",
        keywords: "cv",
        icon: <FileText size={16} />,
        run: () => router.push("/resume"),
      },
      {
        id: "resume",
        label: "Download resume PDF",
        group: "Links",
        keywords: "cv pdf",
        icon: <Download size={16} />,
        run: () => {
          const a = document.createElement("a");
          a.href = site.resume;
          a.download = "KS_Phanindra_Resume.pdf";
          a.click();
        },
      },
      { id: "github", label: "GitHub", group: "Links", icon: <GitHubIcon size={16} />, run: () => open(site.github) },
      { id: "linkedin", label: "LinkedIn", group: "Links", icon: <LinkedInIcon size={16} />, run: () => open(site.linkedin) },
      ...projects
        .filter((p) => p.live)
        .map((p) => ({
          id: `${p.slug}-demo`,
          label: `${p.name} live demo`,
          group: "Links",
          icon: <FileText size={16} />,
          run: () => open(p.live!),
        })),
    ];
    // One heading per group: sort is stable, so items keep their order within a group.
    return list.sort((a, b) => GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group));
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => (i.label + " " + i.group + " " + (i.keywords ?? "")).toLowerCase().includes(q));
  }, [items, query]);

  const show = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);
  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setActive(0);
          }
          return !o;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [show]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    // While open, Lenis is stopped and the page is locked; the list scrolls natively (it has data-lenis-prevent,
    // because a stopped Lenis cancels every wheel event that isn't marked).
    if (isOpen && !d.open) {
      window.__lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      d.showModal();
      input.current?.focus();
    } else if (!isOpen && d.open) d.close();
    if (!isOpen) {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
    }
  }, [isOpen]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (i: Item | undefined) => {
    if (!i) return;
    hide();
    // Let the dialog close (and give focus back) before scrolling or opening a tab.
    requestAnimationFrame(() => i.run());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[active]);
    }
  };

  return (
    <dialog
      ref={dialog}
      onClose={hide}
      onClick={(e) => e.target === dialog.current && hide()}
      aria-label="Command menu"
      className="palette m-auto mt-[12vh] w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-[0_30px_100px_-20px_rgb(0_0_0/0.8)] backdrop:bg-black/70"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search size={18} className="shrink-0 text-muted" aria-hidden="true" />
        <input
          ref={input}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Jump to a section, project or link…"
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
          autoComplete="off"
          spellCheck={false}
          className="h-14 w-full bg-transparent text-[16px] text-ink placeholder:text-muted focus:outline-none"
        />
        <kbd className="hidden font-mono text-[12px] text-muted sm:block">Esc</kbd>
      </div>
      <ul
        id="palette-list"
        ref={list}
        role="listbox"
        aria-label="Commands"
        data-lenis-prevent
        className="max-h-[min(380px,60vh)] overflow-y-auto overscroll-contain p-2"
      >
        {filtered.length === 0 && <li className="px-3 py-8 text-center text-[14px] text-muted">Nothing matches “{query}”.</li>}
        {filtered.map((item, index) => {
          const heading = index === 0 || filtered[index - 1].group !== item.group ? item.group : null;
          return (
            <li key={item.id} role="presentation">
              {heading && (
                <div className="px-3 pt-3 pb-1.5 text-[12px] font-medium text-muted" role="presentation">
                  {heading}
                </div>
              )}
              <div
                id={`cmd-${item.id}`}
                role="option"
                aria-selected={index === active}
                data-index={index}
                onMouseMove={() => setActive(index)}
                onClick={() => choose(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] ${
                  index === active ? "bg-surface-2 text-ink shadow-[inset_0_0_0_1px_rgb(79_124_255/0.45)]" : "text-ink-2"
                }`}
              >
                <span className="grid size-5 place-items-center text-muted" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {index === active && <ArrowRight size={15} className="text-muted" aria-hidden="true" />}
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
