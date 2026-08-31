# Pushing this site to GitHub → Netlify

A step-by-step reference for getting this project onto GitHub and keeping
Netlify auto-deploying it. Written for this specific project
(`c:\Repos\PMO`) on this machine, where Git is already installed
(`git version 2.55.0`) and your identity is already configured
(`Ian Lancaster` / `ian.lancaster1971@gmail.com`).

You'll do the **one-time setup** (Part A) once. After that, every future
update is just **the daily workflow** (Part B) — three commands.

---

## Part A — One-time setup

### Step 1: Create an empty repository on GitHub

1. Go to [github.com/new](https://github.com/new) (log in first if needed).
2. **Repository name**: something like `ex-ford-pmo-meetup`.
3. **Description**: optional, e.g. "Ex-Ford PMO Meet Up website".
4. **Public or Private**: your choice — Netlify's free plan works with either.
5. **Important**: leave "Add a README file", "Add .gitignore", and "Choose a
   license" all **unchecked**. This project already has those files locally;
   if GitHub creates its own, the first push will fail because the
   histories don't match.
6. Click **Create repository**.
7. GitHub will show you a page with a URL like:
   ```
   https://github.com/<your-username>/ex-ford-pmo-meetup.git
   ```
   Keep this page open — you'll need that URL in Step 4.

### Step 2: Open a terminal in the project folder

In VS Code: **Terminal menu → New Terminal**. Confirm you're in the right
place:

```
cd c:\Repos\PMO
```

### Step 3: Turn this folder into a Git repository

This project isn't a Git repo yet, so initialize one:

```
git init
git branch -M main
```

`git branch -M main` just makes sure the branch is named `main` (matches
what GitHub expects by default).

### Step 4: Connect it to the GitHub repository you created

Replace the URL below with **your own** repository URL from Step 1:

```
git remote add origin https://github.com/<your-username>/ex-ford-pmo-meetup.git
```

Check it worked:

```
git remote -v
```

You should see `origin` listed twice (fetch and push), pointing at your repo.

### Step 5: Stage and commit everything

```
git add -A
git commit -m "Initial commit"
```

`git add -A` stages every file (respecting `.gitignore`, so `node_modules`,
`dist`, and your `.env` file are correctly left out). `git commit` saves
that snapshot locally with a message.

### Step 6: Push to GitHub

```
git push -u origin main
```

**What happens next:** since this is the first push, a browser window
should pop up asking you to log in to GitHub and authorize Git — this
machine already has Git Credential Manager installed, so you shouldn't need
to paste any tokens or passwords. Log in, approve it, and the push will
continue automatically in the terminal.

*(If no browser window appears and you instead get a username/password
prompt in the terminal, see the "Authentication problems" section below.)*

### Step 7: Verify

Refresh your GitHub repository page in the browser — you should see all the
project files there. That's the code safely on GitHub.

### Step 8: Connect Netlify to this GitHub repository

1. Log in to [app.netlify.com](https://app.netlify.com).
2. Click **Add new site → Import an existing project**.
3. Choose **Deploy with GitHub**, and authorize Netlify to access your
   GitHub account if it asks.
4. Select the `ex-ford-pmo-meetup` repository from the list.
5. Netlify will try to auto-detect the build settings. Confirm they're set
   to:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. **Environment variables** (only if you've connected Firebase — see
   `README.md`): click **Add environment variables** and add each
   `VITE_FIREBASE_...` key/value from your local `.env` file. Skip this if
   you're still in demo mode.
7. Click **Deploy site**. Netlify will run the build and give you a live
   `https://something-random.netlify.app` URL a minute or two later — that's
   your site, live on the internet.
8. Optional: in **Site configuration → Domain management**, you can rename
   the free `.netlify.app` subdomain to something nicer, or connect a custom
   domain you own.

From this point on, **every time you push to the `main` branch on GitHub,
Netlify automatically rebuilds and redeploys the site** — which is exactly
why we're deliberate about when we push (see `CLAUDE.md`).

---

## Part B — Daily workflow (every time after this)

Once Part A is done, updating the live site is just:

```
git add -A
git commit -m "Describe what changed"
git push
```

- `git add -A` — stage all changed files
- `git commit -m "..."` — save a snapshot with a short description (e.g.
  `"Add Christmas social event, tweak home page copy"`)
- `git push` — send it to GitHub, which triggers a Netlify build automatically

As agreed, I (Claude) won't run these commands unless you explicitly ask —
just say something like "commit and push" when you're ready, and I'll batch
up everything changed since the last push.

You can watch the build happen in **Netlify → your site → Deploys** — it
takes a minute or two, then the live site updates.

---

## Troubleshooting

**"Authentication problems" / no browser popup on push, or a
username/password prompt in the terminal instead:**
GitHub no longer accepts your account password for this. Use a Personal
Access Token instead:
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens) →
   **Generate new token (classic)**.
2. Give it a name, set an expiry, and tick the **repo** scope.
3. Click **Generate token** and copy it immediately (you won't see it
   again).
4. When the terminal asks for a password, paste the token instead (it won't
   show any characters as you paste — that's normal, just press Enter).

**`error: remote origin already exists`** when running `git remote add`:
Someone (possibly an earlier attempt) already added a remote. Check what
it's pointing at with `git remote -v`, and if it's wrong, fix it with:
```
git remote set-url origin https://github.com/<your-username>/ex-ford-pmo-meetup.git
```

**`error: failed to push some refs` / "rejected" mentioning the remote has
work you don't have locally:**
This happens if GitHub's repo isn't actually empty (e.g. you did tick
"Add a README" in Step 1 by mistake). Easiest fix — delete the repo on
GitHub and recreate it empty, then repeat from Step 4.

**Netlify build fails:**
Click into the failed deploy in **Netlify → Deploys** to read the build
log. The most common cause here would be a missing environment variable
(if you've connected Firebase) — check **Site configuration → Environment
variables** matches your `.env` file.

**Wondering how many free build minutes you have left:**
Netlify → your team → **Billing** shows current usage against the free
plan's monthly build minutes allowance. This is exactly why we push in
batches rather than after every small change.

**Want to double-check what's about to be pushed before you commit:**
```
git status
```
shows changed files; add `git diff` to see the actual line-by-line changes.
