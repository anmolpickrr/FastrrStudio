# Leads, contact popup and accounts

Every call to action on the site opens one of two popups:

| Button | Opens |
| --- | --- |
| Start a project, Create for my brand, Make my ad, Show me, Start yours, Contact us | Contact popup, **A project** |
| Let’s talk | Contact popup, **A project**, with *Call* preselected |
| Set up your team | Contact popup, **Agency or team** |
| Ask us anything | Contact popup, **A question** |
| Sign in, Sign up, Create an account | Account popup |

Links also work directly: `/#contact-us`, `/#signin`, `/#signup`.

Every enquiry and sign-up is saved as a row in a Supabase `leads` table. The sales team works these leads in **`/leads.html`**, where they can search, filter, open a lead, set its status, owner and notes, call, email or WhatsApp it, and export to CSV.

## What is saved for each lead

Reference number, type (project, agency, question, signup), the button they clicked, name, email, phone, brand, website, role, creatives wanted, brands managed, monthly volume, budget, timeline, best way to reach them, message, consent, page, referrer, UTM tags, and the account ID if they were signed in. Sales adds status (new, contacted, qualified, proposal, won, lost, spam), owner and notes.

## Switch it on (about 10 minutes, once)

1. Create a free project at supabase.com. The Mumbai (ap-south-1) region is closest to Gurugram.
2. Open **SQL Editor**, paste `supabase/schema.sql` and run it.
3. Add the sales team, one line per person (they then sign up on the site with that email):
   ```sql
   insert into public.staff (email, name) values ('sales@fastrr.com', 'Sales');
   ```
4. Under **Authentication > URL Configuration**, set the Site URL to `https://anmolpickrr.github.io/FastrrStudio/` and add it to Redirect URLs. Confirmation and password-reset emails link back here.
5. Under **Project Settings > API**, copy the Project URL and the `anon` public key into `assets/js/config.js` (`supabaseUrl`, `supabaseAnonKey`). The anon key is meant to be public, and Row Level Security means visitors can only add leads, never read them.
6. Optional:
   - Google sign-in: enable it under **Authentication > Providers**, then set `googleSignIn: true`.
   - Instant alerts: **Database > Webhooks**, on insert into `leads`, posting to Slack, email or your CRM.
   - WhatsApp: set `whatsapp` in config.js to show a WhatsApp link in the popup.

## Before Supabase is connected

Nothing is lost. The popup still validates everything, then opens the visitor's email app addressed to `salesEmail`, with every field filled in and a reference number. Sign up does the same, so you can send invites by hand. Sign in explains that access comes with an invite.

## Security

- Row Level Security: anyone can insert a lead; only staff can read, update or delete leads. Signed-in visitors can read only their own requests (shown under *My requests*).
- Visitors can write only the enquiry columns. Status, owner and notes are staff-only.
- Spam: a hidden honeypot field, a minimum fill time, and a limit of 4 sends per browser every 10 minutes. Add Supabase's CAPTCHA under Auth settings if you need more.
- The dashboard escapes all lead content, and the CSV export guards against spreadsheet formula injection.
