# Changelog

All notable changes to Urban Life （都市人生 / アーバンライフ） are documented here.
This project follows [Semantic Versioning](https://semver.org/).

## [1.3.3] — 2026-11-03

### Fixed — entered amounts changed by a yen or two (6000 → 6001)
- Display-currency inputs (build-my-city amounts, the budget dialog) were
  converted to USD rounded to whole dollars. At roughly ¥7.1 per dollar,
  that rounding is worth up to ¥3.5, so a round trip could add or lose a
  few yen — 5999 and 6000 both came back as 6001. Amounts are now kept to
  cent precision, so what you type is what you see.

## [1.3.2] — 2026-11-03

### Fixed — editor field label and confirmation text
- The editor's amount label always reverted to "Price" after any re-render:
  the static-label pass hard-coded it. It now follows the selected type
  (Monthly rent for homes, Per-shift pay for jobs, Fare for transport…).
- The "added" confirmation named the Streets for almost every type; it is
  now place-neutral (the friend message still points to the Café).

## [1.3.1] — 2026-11-03

### Fixed — text cut off at the right edge on phones
- A mobile-fit pass over the stylesheet: flex and grid children may now
  shrink below their content size, long unbroken text (custom names, diary
  lines, billboards, the speech bubble) wraps instead of stretching the
  page, and the top chips (date / cash) get compact sizing on narrow
  screens so the whole layout always fits the device width.

## [1.3.0] — 2026-11-03

### Changed — flat pay, monthly rent, currency-linked editor inputs
- **Pay no longer grows with experience.** Shift pay is the job's fixed rate;
  promotions and per-job levels are removed from play. The signing bonus is
  unchanged in size (one shift's pay) but now counts as **other income** —
  only shifts actually worked at the office count as **salary**.
- **Rent is monthly.** Homes now charge once a month (at the calendar
  month rollover, right after the previous month closes): $280 / $720 /
  $1,800 / $4,800, the old weekly rents × 4. Debt interest (5%) applies on
  the same monthly tick, moving house pays one month up front, and all
  rent/debt wording switched from weekly to monthly. Returning after a
  month away also charges the new month's rent on load.
- **Build-my-city amounts follow the display currency**, like the budget
  dialog already did: enter amounts in CNY under Chinese, JPY under
  Japanese, USD under English — they are converted to USD at the live rate
  when saved. Previously editor inputs were taken as raw USD.

## [1.2.2] — 2026-11-03

### Fixed — editor type labels showed raw keys (cuTypeOffice…)
- `index.html` loaded `js/i18n.js` **without** the `?v=` cache-buster every
  other module carries, so browsers (notably iOS Safari) kept serving a
  cached older dictionary after updates: new strings — the four new editor
  type labels first — fell back to their raw key names while the rest of the
  game updated around them. i18n.js now carries the same version parameter
  as all other assets.
- Verified the whole unification surface while at it: all 292 UI strings
  exist in all three languages (0 missing), and every dynamically composed
  key family (budget categories, editor types, place effects) resolves.

## [1.2.1] — 2026-11-03

### Fixed — the clock now follows your system time
- Opening the game re-syncs the in-game date and clock to your device: the
  date jumps to today (a month you missed is closed into its monthly report
  first, if you played during it) and the hour is set to your current local
  hour. New games also start at the real hour instead of 08:00. While you
  play, actions still advance the clock as game time (a shift takes 4 hours,
  travel takes 1, and so on).

### Fixed — duplicated currency symbols, everywhere
- Swept all remaining messages and diary lines that printed a literal "$" in
  front of an amount that already carries its currency symbol ($¥…). 33
  occurrences across the three languages (rent, promotion, repayments,
  moving, event and work diary lines, and more).

## [1.2.0] — 2026-11-03

### Added — income categories
- Income is now tracked by category, like spending: **salary** (shift pay and
  signing bonuses), **gigs** (odd-job events) and **other income** (KTV tips,
  found money). The budget panel shows this month's income with its breakdown,
  and the budget summary and the monthly report gained an income-breakdown
  section. Previously work income only existed as one lump total.

### Added — build-my-city covers every facility
- The editor gains four types so all **11 map facilities** have a matching
  editor type: **Company** (appears at the Office — work a shift there for the
  pay you set), **Nightclub**, **Hotel** (stay the night: restores you and
  starts a new day, charged to stays) and **KTV** (charged to fun).

### Removed — leftover district names
- The map tiles no longer show district abbreviations (YABA, IKEJA, VI,
  LEKKI, IKOYI, SURULERE) and facility titles, an NPC line and a few input
  placeholders no longer mention Lagos neighbourhoods — leftovers from the
  game's original framing that meant nothing in Urban Life. District grouping
  still drives transport fares internally, under neutral codes.

## [1.1.3] — 2026-11-03

### Changed — hiring, redesigned
- **No experience gate on hiring.** Any job can be applied for at any XP;
  the job board no longer disables buttons or lists an XP requirement.
- **Experience is never wiped.** XP and levels are now kept **per job**:
  switching jobs keeps each job's level and progress, and returning to a job
  resumes where you left it (previously changing jobs reset you to Lv.1).
- **Getting hired pays.** A first hire into a job pays a signing bonus of one
  shift's pay, counted as income (once per job, so it can't be farmed by
  switching back and forth).

### Fixed
- The "shift done" message showed a duplicated currency symbol ($¥…); the
  stray "$" is removed, matching the work button fix in 1.1.2.

## [1.1.2] — 2026-11-03

Consistency audit across facility names, editor types, activity types,
merchant categories and budget categories — and every money movement.

### Fixed
- **Custom facilities now actually work when used.** Eating a custom dish,
  applying for a custom job, buying a custom product and moving into a custom
  home read the built-in lists instead of the combined ones, so custom entries
  acted on the wrong item or failed. All four actions now use the combined
  lists the panels render.
- **Merchant and singer payments are counted.** They were paid in cash but
  recorded in no budget category, so the monthly report understated spending.
  A tracked **Other** category （其他 / その他） now covers them and appears in
  the monthly summary and report.
- **Merchant categories re-localise.** The business category was stored as
  text in whatever language it was picked in and stayed that way; it is now
  stored as an index and rendered in the current language (old ads with a
  stored string still display as-is).
- Work pay wording is per shift everywhere (was "per day" in places), and a
  stray "$" that duplicated the currency symbol in the work button is gone.

### Verified already consistent
- Budget category names are one key set shared by the budget panel, the
  budget dialog, the monthly summary and the monthly report in all languages.
- Editor types name their facility; activity types, their labels and their
  effects correspond; all other income and spending (work, gigs, tips, rent,
  fares, food, fun, stays, shopping, custom places) is categorised.

## [1.1.1] — 2026-11-03

### Added
- **Merchant placements can include a URL**, just like singer placements: the
  merchant form has a link field, and the URL is shown as a clickable link
  wherever the ad appears (street billboards, mall picks, club sponsorship).
  Song links in the club playlist are clickable now too.
- **Virtual-payment notice**: both the merchant and singer dialogs state
  clearly, right above the pay button and in all three languages, that payment
  is virtual for now — settled in in-game cash, no real payment needed.

## [1.1.0] — 2026-11-03

### Changed
- **No more background picker.** The game starts immediately with **0 cash**;
  set your real starting balance any time in the budget dialog
  （初期資金 / Starting money).
- **Transport is its own facility**, right after the Café on the map. Pick how
  you get around — walk (free), bus ($3), metro ($5), taxi ($15) — and trips
  between districts are charged by your mode instead of one fixed fare.
  Like every other facility, transport modes are **customisable**: add your
  own (name + fare) in Build my city and select it.
- Theme line refreshed on the start header and page title, with cache-busting
  asset URLs so updates reach players immediately.

### Fixed
- The date chip showed two calendar icons; it now shows one.
- The header tagline could overflow small screens; it now wraps.

## [1.0.1] — 2026-11-03

### Fixed
- **Budget editing now uses the display currency.** The budget dialog showed raw
  USD values while the rest of the UI shows converted amounts (CNY / JPY / USD),
  which made caps — transport included — look wrong and painful to edit. Inputs
  now convert both ways and use sensible step sizes per currency.
- **Transport is visibly part of the budget.** The monthly summary in the budget
  dialog lists every category (including transport at ¥0), and transport fares
  accumulate against the editable transport cap like any other category.
- **Removed the last "28-day month" wording.** The budget dialog's note claimed
  a month has 28 days; months follow the real calendar, as the engine already
  did — the text now says so in all three languages.
- Removed a leftover dead coin-spending helper (coins were abolished in 1.0.0).

### Changed
- **New theme line**: "Play while you track your mood and your monthly budget"
  （边玩游戏，边算清你的心情和每月预算 / 遊びながら計算する、あなたの気分と毎月の予算） —
  the subtitle, page title and README now lead with mood + monthly budget.
- **Unified facility names** across the map, panels and the city editor in all
  three languages: the home location is 住处 / 住まい / Home everywhere (it was
  公寓 on the map but 住处 in the editor), and every editor type now names the
  facility it belongs to, e.g. 工作（职业中心） / Dish (Restaurants).
- Job pay is described as per shift rather than per day, matching how work
  actually pays out.

## [1.0.0] — 2026-11-03

First formal open-source release. The game is positioned as a **cost-of-living
budget simulation**: earn a salary in a big city, pay rent, eat, go out — and
try to end each real calendar month in the black.

### Highlights

- **Real calendar** — the game starts on today's real date; days advance on the
  real calendar, rent is charged every 7 days, and each month closes on the
  real month-end with an automatic income-and-spending report (income,
  spending by category, net, savings rate, over-budget list, S–D grade).
- **One currency, no coins** — everything is priced in money. Amounts are
  stored in USD and displayed per language: Chinese → CNY (¥), Japanese →
  JPY (¥), English → USD ($), converted with live exchange rates
  (open.er-api.com) and an offline fallback.
- **Budgets** — monthly caps for food, transport, fun and shopping, with
  progress bars, over-budget highlighting and a savings goal.
- **Life simulation** — three starting backgrounds (silver spoon / working
  class / hustler in debt), jobs with promotions, housing tiers with weekly
  rent, interest-bearing debt, five needs (energy, mood, food, hygiene,
  social), transport fares and traffic, everyday events such as power cuts,
  plus nightclubs, hotels, restaurants, karaoke, malls, cafés and friends.
- **Build your own city** — players add their own real-life facilities of
  every kind: shops, friends, homes, jobs, restaurant dishes, products and
  places to visit (with activity types: relax, socialise, study, exercise).
- **Business & creator portals (demo settlement)** — merchants place ads
  (street billboards, mall picks, club sponsorship) and singers place songs
  on the club playlist. Production payments are designed for Stripe /
  Paystack with webhook-verified crediting (see README).
- **Trilingual** — full Chinese / Japanese / English UI, including the diary
  and monthly report, switchable at any time (also on the start screen).
- **Modular codebase** — the former single file is split into `css/style.css`
  and focused `js/` modules (i18n, data, fx, core, ui, actions, budget,
  portals, custom, app). No build step; plain static hosting.

### Notes

- Progress is stored in the browser's localStorage; saves from earlier
  pre-release versions migrate automatically.
- In-game money is fictional and cannot be cashed out.

[1.1.3]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.1.3
[1.3.3]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.3.3
[1.3.2]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.3.2
[1.3.1]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.3.1
[1.3.0]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.3.0
[1.2.2]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.2.2
[1.2.1]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.2.1
[1.2.0]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.2.0
[1.1.2]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.1.2
[1.1.1]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.1.1
[1.1.0]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.1.0
[1.0.1]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.0.1
[1.0.0]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.0.0
