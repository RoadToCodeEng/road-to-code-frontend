# Road to Code - websites

Monorepo for the static sites on roadtocode.tech. No build step anywhere: plain HTML, CSS and native web components.

| Directory | Domain | What it is |
| --- | --- | --- |
| `sites/web/` | roadtocode.tech | marketing site built from the Figma design |
| `sites/mta-sts/` | mta-sts.roadtocode.tech | MTA-STS policy for inbound mail |

Each directory is its own Netlify site with its own `netlify.toml`.

## Run locally

```bash
python3 -m http.server 4173 --directory sites/web/public
```

Then open http://localhost:4173. (ES modules don't load from `file://`, so use a server.)

## Structure of `sites/web/`

```
netlify.toml                 Netlify config: publish dir, security headers, font caching
public/                      everything that gets deployed
  .well-known/security.txt   security contact, PGP-signed (see "security.txt" below; renew before the Expires date)
  .well-known/pgp-key.txt    public key that security.txt is signed with (its Encryption field)
  robots.txt                 crawler rules: search and AI assistants allowed, AI training crawlers blocked
  sitemap.xml                page list for search engines (add new pages here)
  llms.txt                   site summary for AI agents (keep in sync with the page content)
  index.html  services.html  about.html  contact.html
  404.html                   "page not found", served by Netlify for any missing path
  css/fonts.css              self-hosted @font-face rules (Manrope, JetBrains Mono)
  css/tokens.css             design tokens (colours, fonts, radii, spacing)
  css/styles.css             base styles + component styles
  js/main.js                 registers every component
  js/components/             reusable custom elements (light DOM)
  js/contact-form.js         submits the contact form to Netlify Forms in the background
  assets/                    logo, icons and images exported from Figma
  assets/fonts/              woff2 font files + their OFL licences
```

## Components

| Element | Attributes | Children |
| --- | --- | --- |
| `<site-header>` | `active` = `services` \| `about` \| `contact` | - |
| `<site-footer>` | - | - |
| `<section-heading>` | `eyebrow`, `heading`, `align="center"`, `eyebrow-size="sm"` | - |
| `<feature-card>` | `icon` (file in `assets/icons`), `heading`, `size="lg"` | description text |
| `<step-card>` | `number`, `heading` | description text |
| `<service-section>` | `eyebrow`, `heading`, `tone="light"`, `reverse`, `id` | `<p>` description, `<li>` checklist items, one `slot="visual"` element |
| `<check-list>` | - | `<li>` items |
| `<code-window>` | `filename`, `variant` = `editor` \| `panel` \| `terminal` \| `report` | window body |
| `<cta-banner>` | `heading`, `subtitle`, `label`, `href` | - |
| `<form-field>` | `label` | one `<input>`, `<select>` or `<textarea>` (kept in the HTML so Netlify Forms can detect it) |

Buttons are CSS classes: `btn` + `btn--primary` / `btn--accent`, sized with `btn--sm` / `btn--lg` / `btn--block`.

Components use root-relative URLs (`/assets/...`, `/about.html`) so they also work on `404.html`, which Netlify serves at any path.

## Deploying (Netlify)

Create one Netlify site per directory under `sites/`, all linked to this repository, with **Base directory** set to that directory (e.g. `sites/web`) and no build command. Each `netlify.toml` publishes only its `public/` folder, so `README.md` and `netlify.toml` are never deployed, and skips deploys when nothing in its own directory changed.

### `sites/web`

- **Contact form**: handled by Netlify Forms (`data-netlify="true"` on the form in `sites/web/public/contact.html`). Netlify detects the form and its fields from the static HTML at deploy time, so keep every field as a real element in the HTML. Set up email notifications under *Site configuration → Forms → Form notifications*.
- **Security headers**: set in `netlify.toml`. The Content-Security-Policy only allows resources from this site, so any new third-party script, font, image or iframe must be added to it. Keep header values on one line: Netlify joins multi-line values with commas.

#### security.txt

> [!WARNING]
> `public/.well-known/security.txt` is signed with the PGP key for `security@roadtocode.tech` (private key and passphrase in the secrets vault). **Every edit, including renewing `Expires`, must be re-signed**, or the signature no longer matches and the file shows as tampered.

To change it, strip the old signature, edit the plain fields, and sign again (from `sites/web`):

```bash
gpg --decrypt public/.well-known/security.txt > security.txt.unsigned   # check the signature and extract the fields
# edit security.txt.unsigned
gpg --local-user security@roadtocode.tech --clearsign --output public/.well-known/security.txt security.txt.unsigned
rm security.txt.unsigned
```

The private key lives only in the secrets vault (item "PGP key - security@roadtocode.tech": passphrase in the password field, plus the private key, public key and revocation certificate as attachments). Import it before signing, and delete it from your keyring afterwards if it should not stay on the machine:

```bash
# ...import the key using <read key> | gpg --import
# ...sign as above, gpg asks for the passphrase...
gpg --delete-secret-keys 98FC2A778E5C765F8D97F4EC6ECABC4E9FB11623
```

The key expires on 2028-10-16. Extend it (`gpg --quick-set-expire`) or replace it before then, and update `public/.well-known/pgp-key.txt` and the secrets vault item.

### `sites/mta-sts`

Serves `https://mta-sts.roadtocode.tech/.well-known/mta-sts.txt`, which tells sending mail servers to require TLS to our Google MX hosts. It pairs with the TXT record `_mta-sts.roadtocode.tech` (`v=STSv1; id=<date>`): change the `id` every time the policy file changes, or senders keep using their cached copy. Start in `mode: testing`, and switch to `mode: enforce` with a longer `max_age` once the TLS reports (`_smtp._tls` TXT record) are clean.
