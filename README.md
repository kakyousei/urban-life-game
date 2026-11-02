# 🌆 都市人生 · アーバンライフ · Urban Life

一款城市生活模拟游戏：在拉各斯找工作、赚钱、交朋友、泡夜店、住酒店、下馆子、唱 KTV、逛商场，把日子过成自己想要的样子。支持 **中文 / 日本語 / English** 三种语言切换。

A city life-simulation game set in Lagos — work, earn, make friends, hit the clubs, book hotels, eat out, sing karaoke and shop, and live the life you want. Playable in **Chinese / Japanese / English**.

ラゴスを舞台にした街暮らしシミュレーション。仕事、友達、クラブ、ホテル、食事、カラオケ、買い物――自分の生きたい人生を。**中文 / 日本語 / English** の3言語対応。

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

**Three starts** (silver spoon / working class / hustler in debt), jobs with promotions, housing with weekly rent and interest-bearing debt, five needs (energy, mood, food, hygiene, social), transport fares and traffic, everyday events like power cuts — and clubs, hotels, restaurants, karaoke, malls and friends.

## ✏️ 打造我的城市（玩家共创）

把你熟悉的街道、常去的小店、生活里的朋友加进游戏：小店出现在「街道」，朋友出现在「咖啡馆」。Add your own shops and people — shops appear under Streets, friends at the Café.

## 🪙 金币、商家与歌手

- **充值**：4 个金币包，Stripe / Paystack 两个入口。⚠️ 公开版为**演示模式**，不会真实扣款
- **商家入驻**：街道广告牌 / 商场推荐位 / 夜店赞助（20/30/40 金币 · 3 天）
- **歌手入驻**：25 金币把自己的歌放进夜店播放列表「正在热播」（3 天）

## 💳 正式接真实支付（上线清单）

GitHub Pages 是纯静态站点，不能安全保存密钥或确认支付。正式收费前需要：

1. 注册 **Stripe** 和/或 **Paystack** 商户账号（本地收款可用 Paystack，国际卡可用 Stripe）
2. 一个小后端（云函数即可）：按金币包创建 Checkout / Payment Link；接收并验签 **Webhook**，支付成功后才发放金币
3. 把 `payDemo()` 换成跳转收银台；商家广告费、歌手上架费同理
4. 补齐价格与税费说明、退款政策、广告审核规则、歌手歌曲版权声明
5. 游戏内货币为封闭虚拟货币：不可提现、不可转让

Production payments need merchant accounts plus a small backend that verifies webhooks before crediting coins — see the checklist above (Chinese).

## 技术 / Tech

单个 HTML 文件（原生 CSS + JavaScript），无构建步骤；状态、自建内容、广告与歌单存放在浏览器 localStorage。Single-file HTML, no build step; all state lives in localStorage.

## 许可 / License

MIT License — 欢迎 fork、学习和改编。
