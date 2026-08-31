# Ex-Ford PMO Meet Up — project notes

React + Vite site (Tailwind CSS v4, Framer Motion, React Router, optional
Firebase). See [README.md](README.md) for setup, dev, build, and deploy
instructions.

## Git policy — IMPORTANT

**Never `git commit` or `git push` unless the user explicitly asks in that
session.** Do not do it automatically after making changes, and do not treat
an earlier "yes, commit" as standing permission for later changes.

**Why:** This site is hosted on Netlify's free plan, which auto-triggers a
build on every push to the connected branch. Free-tier build minutes are
limited, so the user wants to batch changes and push deliberately — typically
once or twice a day — rather than on every edit.

**How to apply:** Make and save code changes as normal. When done, just say
what changed and stop — don't run `git add`/`commit`/`push`. Only commit and
push when the user says something like "commit this", "push it", or "let's
deploy". If a task is inherently about committing/pushing (e.g. "commit and
push what we've done today"), that's fine — just don't do it unprompted on
routine edits.
