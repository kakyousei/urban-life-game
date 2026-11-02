# Changelog

All notable changes to Urban Life （都市人生 / アーバンライフ） are documented here.
This project follows [Semantic Versioning](https://semver.org/).

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

[1.0.0]: https://github.com/kakyousei/urban-life-game/releases/tag/v1.0.0
