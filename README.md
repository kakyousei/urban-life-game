# 🌆 都市人生 · アーバンライフ · Urban Life

一款**生活成本预算模拟**游戏：在城市里找工作赚钱、付房租、吃喝玩乐，同时给每类开支设预算、看月末收支报告、努力把钱存下来。它回答一个很实际的问题：**拿这份工资，在这座城市到底能不能过好一个月？** 支持 **中文 / 日本語 / English** 三种语言切换。

**v1.0.0 正式发布** · [更新日志](CHANGELOG.md) · [MIT 许可](LICENSE)

A **cost-of-living budget simulation** set in a big city: earn a salary, pay rent, eat, go out — while setting budgets per category, reading a monthly income-and-spending report, and trying to save. It answers a practical question: **can this salary actually carry a good month in this city?** Playable in **Chinese / Japanese / English**.

街暮らしの**生活費予算シミュレーション**。給料を稼ぎ、家賃を払い、食べて遊びながら、カテゴリごとに予算を決め、月末の収支レポートを見て貯金を目指します。**この給料で、この街で1か月やっていけるか？** を試せるゲームです。**中文 / 日本語 / English** の3言語対応。

## 原作者与原始出处 / Original Author & Repository / 原作者と原典

- **Original Author（原作者）**: Jingcheng He ([@kakyousei](https://github.com/kakyousei))
- **Original Repository（原始仓库）**: https://github.com/kakyousei/urban-life-game
- **Copyright**: © 2026 Jingcheng He (kakyousei) — 本项目以 [MIT License](LICENSE) 开源发布。

欢迎 fork、提 issue 和 PR，一起完善这个项目。若转载或再发布，请保留版权声明，并注明原作者与原始仓库链接。Forks and contributions are welcome; when redistributing, please keep the copyright notice and link back to the original author and repository.

## 在线玩 / Play / 遊ぶ

**https://kakyousei.github.io/urban-life-game/**

无需安装、无需注册，进度保存在浏览器本地。No install, no sign-up — progress saves in your browser.

## 玩法 / How to play / 遊び方

- 🎬 **三种开局**：含着金钥匙 / 普通打工族 / 负债逆袭局——起点不同，玩法不同
- 🧭 **找工作与升职**：骑手、店员、工程师、项目经理；经验攒够自动升职加薪
- 🏠 **住房与房租**：合租单间 → 一居室 → 豪华公寓 → 海景别墅；每周扣房租，付不起变欠款（带利息）
- 💳 **欠款系统**：欠款会涨利息，可以在状态栏分期还清
- 🧼 **五维状态**：精力、心情、饱腹、清洁、社交——脏兮兮去社交效果减半
- 🚌 **交通**：跨区移动收交通费，也可能堵车；没钱就只能走路
- ⚡ **生活事件**：停电（买发电机/太阳能可以免疫）、临时小活、朋友请客
- 🌃 **夜生活与日常**：夜店、酒店、餐厅、KTV、商场、咖啡馆、街道夜市
- ☕ **朋友系统**：聊天、送礼涨好感；本地食物 Jollof Rice、Suya 等
- 📊 **预算系统（核心玩法）**：所有收支按类别自动记账（房租/餐饮/交通/娱乐/购物/住宿）；给餐饮、交通、娱乐、购物设月度上限，超支标红
- 📅 **真实日历**：游戏从今天的真实日期开始，天数按真实日历推进；每月在真实月末结算，月份天数与现实一致
- 💱 **多币种显示**：金额以美元为基准存储，按界面语言自动换算显示——中文 ¥（人民币）、日本語 ¥（日元）、English $（美元），汇率联网自动获取（open.er-api.com），离线时用默认汇率。全部花费都用货币结算，没有金币
- 🏗️ **全部设施可自建**：不只是小店和朋友——住处、工作、餐厅食物、商品、常去的场所（放松/社交/学习/锻炼）都能按你自己的真实生活添加
- 📋 **月度收支报告**：每个自然月末自动结算——总收入、总支出、结余、储蓄率、支出构成、超支清单，还有 S/A/B/C/D 评级和一句点评
- 🎯 **存钱目标**：设定目标金额，预算栏实时显示进度

**Three starts** (silver spoon / working class / hustler in debt), jobs with promotions, housing with weekly rent and interest-bearing debt, five needs (energy, mood, food, hygiene, social), transport fares and traffic, everyday events like power cuts — and clubs, hotels, restaurants, karaoke, malls and friends.

## ✏️ 打造我的城市（玩家共创）

把你真实生活里的一切加进游戏：小店、朋友、住处、工作、餐厅食物、商品、常去的场所。Add your own everything — shops, friends, homes, jobs, dishes, products and places.

## 🪙 金币、商家与歌手

- 全部花费都用货币结算，**没有金币、没有充值**
- **商家入驻**：街道广告牌 $100 / 商场推荐位 $150 / 夜店赞助 $200（各 3 天），演示版用游戏内现金结算
- **歌手入驻**：$120 把自己的歌放进夜店播放列表「正在热播」（3 天），演示版同样用现金结算

## 💳 正式接真实支付（上线清单）

GitHub Pages 是纯静态站点，不能安全保存密钥或确认支付。正式收费前需要：

1. 注册 **Stripe** 和/或 **Paystack** 商户账号（本地收款可用 Paystack，国际卡可用 Stripe）
2. 一个小后端（云函数即可）：按金币包创建 Checkout / Payment Link；接收并验签 **Webhook**，支付成功后才发放金币
3. 把 `payDemo()` 换成跳转收银台；商家广告费、歌手上架费同理
4. 补齐价格与税费说明、退款政策、广告审核规则、歌手歌曲版权声明
5. 游戏内货币为封闭虚拟货币：不可提现、不可转让

Production payments need merchant accounts plus a small backend that verifies webhooks before crediting coins — see the checklist above (Chinese).

## 技术 / Tech

模块化静态站点（原生 CSS + JavaScript，**无构建步骤**）：

```
index.html        页面结构
css/style.css     样式
js/i18n.js        三语言文案      js/fx.js      货币与汇率
js/data.js        内置数据        js/core.js    状态与日历
js/ui.js          界面渲染        js/actions.js 玩法动作
js/budget.js      预算与月报      js/portals.js 商家/歌手
js/custom.js      自建设施        js/app.js     启动
```

状态、自建内容、广告与歌单存放在浏览器 localStorage；旧版本存档会自动迁移。Modular static site, no build step; state lives in localStorage with automatic save migration.

## 许可 / License

MIT License — 欢迎 fork、学习和改编。
