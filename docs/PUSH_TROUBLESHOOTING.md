# Pushing to GitHub – Troubleshooting

Your remote is: `https://github.com/smfardeen7/fxair.git` (HTTPS).

## 1. GitHub no longer accepts account passwords for Git

You must use one of these:

### Option A: Personal Access Token (PAT) with HTTPS (recommended)

1. On GitHub: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
2. **Generate new token (classic)**. Give it a name, choose expiry, and enable scope **repo**.
3. Copy the token (you won’t see it again).
4. From your project folder, run:
   ```bash
   cd /Users/shaikmohammadfardeen/Desktop/fxair
   git push origin main
   ```
5. When prompted for **password**, paste the **token** (not your GitHub password).

To avoid typing it every time, use the Git credential helper:
- **macOS:**  
  `git config --global credential.helper osxkeychain`  
  Then push once and enter your GitHub username + token when asked; the keychain will store it.

### Option B: Use SSH instead of HTTPS

1. Generate an SSH key (if you don’t have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com" -N "" -f ~/.ssh/id_ed25519
   ```
2. Add the public key to GitHub: **Settings** → **SSH and GPG keys** → **New SSH key** → paste contents of `~/.ssh/id_ed25519.pub`.
3. Switch the remote to SSH and push:
   ```bash
   cd /Users/shaikmohammadfardeen/Desktop/fxair
   git remote set-url origin git@github.com:smfardeen7/fxair.git
   git push origin main
   ```

## 2. “Updates were rejected” (branch diverged)

If GitHub says you must pull first:

```bash
git pull origin main --rebase
git push origin main
```

## 3. “Repository not found” or “Permission denied”

- Confirm the repo exists: https://github.com/smfardeen7/fxair
- Confirm you’re logged into the correct GitHub account.
- If it’s not your repo, you need to be added as a collaborator with write access.

## 4. Quick test

Run this and note the **exact** error message:

```bash
cd /Users/shaikmohammadfardeen/Desktop/fxair
git push origin main
```

Use that message with the steps above (e.g. “password” prompt → use PAT; “Permission denied (publickey)” → use SSH or add SSH key).
