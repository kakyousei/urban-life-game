
"use strict";
function L3(zh,ja,en){ return {zh:zh, ja:ja, en:en}; }
var LOCS=[
  {id:"home",  icon:"🏠", dist:"yaba",     emoji:"🏠", name:L3("住处","住まい","Home"),                 title:L3("Yaba 的住处","Yaba の住まい","A home in Yaba"),        desc:L3("你住的地方。城市再大，也要有个落脚处。","あなたの住まい。街が大きくても、帰る場所は必要。","Where you live. However big the city gets, you need a place to land.")},
  {id:"jobs",  icon:"🧭", dist:"ikeja",    emoji:"🧭", name:L3("职业中心","職業センター","Career centre"), title:L3("Ikeja 职业中心","Ikeja 職業センター","Ikeja career centre"),     desc:L3("招聘墙上贴满了机会，先从一份工作开始。","求人ボードはチャンスだらけ。まずは仕事から。","The job board is full of chances — start with a job.")},
  {id:"office",icon:"🏢", dist:"vi",       emoji:"🏢", name:L3("公司","会社","Office"),               title:L3("VI 的写字楼","VI のオフィスビル","Office tower in VI"),          desc:L3("玻璃幕墙、海景和会议室——上班族的战场。","ガラス張りのビルと会議室。会社員の戦場。","Glass walls, sea views and meeting rooms — the office battlefield.")},
  {id:"club",  icon:"🌃", dist:"lekki",    emoji:"🪩", name:L3("夜店","クラブ","Nightclub"),          title:L3("Lekki 夜店","Lekki のクラブ","Lekki nightclub"),                 desc:L3("霓虹、节拍和人群。夜晚才刚刚开始。","ネオンとビートと人混み。夜はこれから。","Neon, beats and crowds. The night is just starting.")},
  {id:"hotel", icon:"🏨", dist:"ikoyi",    emoji:"🏨", name:L3("酒店","ホテル","Hotel"),              title:L3("Ikoyi 大酒店","Ikoyi のホテル","Grand hotel in Ikoyi"),          desc:L3("累了就住一晚好的，早餐和海景都能治愈人。","疲れた日は良いホテルへ。朝食と海の景色が癒してくれる。","On tired days, stay somewhere nice — breakfast and a sea view heal.")},
  {id:"food",  icon:"🍽️", dist:"surulere", emoji:"🍽️", name:L3("餐厅","レストラン","Restaurants"),   title:L3("Surulere 餐厅街","Surulere のレストラン街","Surulere food street"), desc:L3("Jollof Rice 的香气飘满整条街。","Jollof Rice の香りが通りに広がる。","The smell of Jollof rice fills the whole street.")},
  {id:"ktv",   icon:"🎤", dist:"vi",       emoji:"🎤", name:L3("KTV","カラオケ","Karaoke"),           title:L3("VI KTV 会所","VI のカラオケ","KTV lounge in VI"),                desc:L3("拿起麦克风，今晚你就是主角。","マイクを握れば、今夜の主役はあなた。","Grab the mic — tonight you're the star.")},
  {id:"mall",  icon:"🛍️", dist:"ikeja",    emoji:"🛍️", name:L3("商场","モール","Mall"),               title:L3("Ikeja 商场","Ikeja のモール","Ikeja mall"),                      desc:L3("衣服、手机、香水和送给朋友的礼物。","服、スマホ、香水、友達へのギフト。","Clothes, phones, perfume and gifts for friends.")},
  {id:"street",icon:"🚶", dist:"any",      emoji:"🌇", name:L3("街道","街","Streets"),                title:L3("拉各斯的街道","ラゴスの街並み","The streets of Lagos"),           desc:L3("广告牌、夜市和偶遇，生活气息最浓的地方。","看板、夜市、偶然の出会い。生活の香りが一番濃い場所。","Billboards, night markets and chance meetings — everyday life at its richest.")},
  {id:"cafe",  icon:"☕", dist:"yaba",      emoji:"☕", name:L3("咖啡馆","カフェ","Café"),              title:L3("Yaba 咖啡馆","Yaba のカフェ","A café in Yaba"),                  desc:L3("朋友们常在这里碰头，聊天、八卦、谈梦想。","友達が集まる場所。おしゃべり、噂話、夢の話。","Where friends meet — chat, gossip and big dreams.")}
  ,{id:"transport", icon:"🚌", dist:"any", emoji:"🚌", name:L3("交通","交通","Transport"), title:L3("城市交通","街の交通","Getting around"), desc:L3("选一种你习惯的出行方式，跨区移动就按它收费。自己的方式可以在「打造我的城市」里添加。","移動方法を選ぼう。エリア移動はその料金で計算します。自分の方法は「自分の街を作る」から追加できます。","Pick how you get around — trips between districts are charged by your mode. Add your own in Build my city.")}
];
var JOBS=[
  {pay:90,  xp:0,  title:L3("外卖骑手","デリバリーライダー","Delivery rider"),      desc:L3("跑遍大街小巷，先赚到第一桶金。","街を走り回って、まず最初の収入を。","Ride all over the city and earn your first income.")},
  {pay:130, xp:15, title:L3("商场店员","モールの店員","Mall shop assistant"),       desc:L3("站柜台、学待客，稳定起步。","接客を学びながら、安定したスタート。","Learn the retail trade — a steady start.")},
  {pay:320, xp:35, title:L3("软件工程师","ソフトウェアエンジニア","Software engineer"), desc:L3("写代码、做产品，收入明显上台阶。","コードを書いて製品を作る。収入が一段上がる。","Build products and code — a real step up in pay.")},
  {pay:580, xp:70, title:L3("项目经理","プロジェクトマネージャー","Project manager"), desc:L3("带团队、扛结果，高薪也高压。","チームを率いて結果を出す。高給だが責任も重い。","Lead teams and own results — high pay, high pressure.")}
];
var NPCS=[
  {id:"ada", emoji:"👗", name:"Adaeze", job:L3("服装设计师","服飾デザイナー","Fashion designer"), line:L3("新一季的设计刚出来，你眼光好，帮我挑挑？","新作ができたの。センスのいいあなた、選ぶの手伝って？","My new collection is out — you have great taste, help me pick?")},
  {id:"tun", emoji:"🎧", name:"Tunde",  job:L3("夜店 DJ","クラブDJ","Club DJ"),                line:L3("今晚夜店有新歌单，记得来蹦迪！","今夜クラブで新しいセットを流すよ。踊りに来て！","New set at the club tonight — come dance!")},
  {id:"fun", emoji:"👩🏾‍🍳", name:"Funke", job:L3("餐厅主厨","レストランのシェフ","Restaurant chef"),   line:L3("我的 Jollof 可是全 Surulere 第一。","私の Jollof は Surulere で一番よ。","My Jollof is the best in all of Surulere.")},
  {id:"eme", emoji:"💡", name:"Emeka",  job:L3("创业者","起業家","Startup founder"),           line:L3("我有个小生意点子，就差一个合伙人了。","小さなビジネスのアイデアがあるんだ。あとは相棒だけ。","I have a small business idea — I just need a partner.")},
  {id:"bol", emoji:"🎙️", name:"Bola",  job:L3("歌手","歌手","Singer"),                        line:L3("新歌刚录完，哪天去 KTV 唱给你听。","新曲を録り終えたの。今度カラオケで歌ってあげる。","Just recorded a new song — I'll sing it for you at KTV sometime.")}
];
var FOODS=[
  {price:25, hunger:32, mood:6,  name:L3("Jollof Rice 派对饭","Jollof Rice","Jollof rice"),       desc:L3("番茄辣饭，这座城市的灵魂食物。","トマトの炊き込みご飯。この街のソウルフード。","Spicy tomato rice — the soul food of this city.")},
  {price:18, hunger:18, mood:9,  name:L3("Suya 烤肉串","Suya 串焼き","Suya skewers"),             desc:L3("花生辣椒粉一撒，香到走不动。","ピーナッツと唐辛子の粉で、香りがたまらない。","Peanut-chilli spice dusted on — smells irresistible.")},
  {price:90, hunger:48, mood:15, name:L3("海鲜大餐","シーフード御膳","Seafood feast"),             desc:L3("大虾、螃蟹配香槟，庆祝一下。","大きな海老と蟹にシャンパン。お祝いに。","Big prawns, crab and champagne — a celebration.")},
  {price:9,  hunger:12, mood:4,  name:L3("街边小吃拼盘","屋台の盛り合わせ","Street snack plate"), desc:L3("炸豆饼配可乐，实惠管饱。","豆の揚げ餅とコーラ。安くて満腹。","Fried bean cakes with a cola — cheap and filling.")}
];
var GOODS=[
  {price:150, once:true,  name:L3("时尚外套","おしゃれなジャケット","Fashion jacket"),   tag:L3("出门更有型","お出かけが決まる","Step out in style")},
  {price:450, once:true,  name:L3("智能手机","スマートフォン","Smartphone"),             tag:L3("聊天交友更顺畅（好感 +2）","友達との会話が弾む（好感度 +2）","Chatting works better (bond +2)")},
  {price:80,  once:true,  name:L3("香水","香水","Perfume"),                              tag:L3("出门自带气场","存在感アップ","An aura wherever you go")},
  {price:600, once:true,  name:L3("小型发电机","小型発電機","Small generator"),           tag:L3("停电也不怕，睡个好觉","停電でも安心して眠れる","Power cuts won't ruin your sleep")},
  {price:1200, once:true, name:L3("太阳能供电套装","ソーラー電源セット","Solar power kit"), tag:L3("停电免疫，还省电费心情","停電知らずで気分も上々","Immune to power cuts, mood bonus")},
  {price:50,  once:false, name:L3("小礼物","ギフト","Small gift"),                       tag:L3("在咖啡馆送给朋友，好感大涨","カフェで友達に渡すと好感度アップ","Give it at the café for a big bond boost")}
];
var HOMES=[
  {rent:70,   name:L3("合租单间","シェアハウスの一部屋","Shared single room")},
  {rent:180,  name:L3("一居室公寓","ワンルームアパート","One-bedroom flat")},
  {rent:450,  name:L3("豪华公寓","高級アパート","Luxury apartment")},
  {rent:1200, name:L3("海景别墅","海の見える邸宅","Ocean-view house")}
];

var CATS=[L3("餐饮","飲食","Food & drink"), L3("服饰","ファッション","Fashion"), L3("美容","美容","Beauty"), L3("电子产品","電化製品","Electronics"), L3("其他","その他","Other")];
var ADS_COST={street:100, mall:150, club:200};
var SINGER_COST=120;


var TRANS=[
  {id:"walk", fare:0,  name:L3("步行","徒歩","Walk"),   desc:L3("免费，就是慢，还费体力","無料。その代わり遅くて疲れる","Free — but slow and tiring")},
  {id:"bus", fare:3,  name:L3("公交车","バス","Bus"),   desc:L3("便宜，可能堵车","安い。渋滞するかも","Cheap, but traffic happens")},
  {id:"metro", fare:5,  name:L3("地铁","地下鉄","Metro"), desc:L3("准时，不堵车","定時運行、渋滞なし","On time, no traffic")},
  {id:"taxi", fare:15, name:L3("出租车","タクシー","Taxi"), desc:L3("快又舒服，心情也好","速くて快適、気分も上々","Fast and comfy, mood bonus")}
];
