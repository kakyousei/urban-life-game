# Changelog

All notable changes to Urban Life （都市人生 / アーバンライフ） are documented here.
This project follows [Semantic Versioning](https://semver.org/).

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

[1.1.1]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.1.1
[1.1.0]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.1.0
[1.0.1]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.0.1
[1.0.0]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.0.0
