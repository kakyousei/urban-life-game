
"use strict";
function setLang(l){
  LANG=l; localStorage.setItem(LANGKEY, l);
  document.documentElement.lang = l==="ja" ? "ja" : (l==="en" ? "en" : "zh-CN");
  document.title = t("title").replace("🌆 ","") + " · Urban Life";
  render();
}
function applyStatic(){
  $("hTitle").textContent=t("title");
  $("hSub").textContent=t("sub");
  $("btnCustom").textContent=t("btnCustom");
  $("btnMerchant").textContent=t("btnMerchant");
  $("btnSinger").textContent=t("btnSinger");
  $("lbEnergy").textContent=t("stEnergy"); $("lbMood").textContent=t("stMood");
  $("lbHunger").textContent=t("stHunger"); $("lbHygiene").textContent=t("stHygiene"); $("lbSocial").textContent=t("stSocial");
  $("hJob").textContent=t("hJob"); $("hHome").textContent=t("hHome"); $("hDebt").textContent=t("hDebt");
  $("hBag").textContent=t("hBag"); $("hFriends").textContent=t("hFriends"); $("hDiary").textContent=t("hDiary");
  $("lbXp").textContent=t("xpW"); $("btnRepay").textContent=t("repayW")+" "+money(200); $("btnReset").textContent=t("reset");
  $("footNote").innerHTML=t("foot"); var fxt=fxText(); if(fxt) $("footNote").innerHTML+=" · "+fxt;
  $("btnBudget").textContent=t("btnBudget");
  $("bTitle").textContent=t("bTitle"); $("bNote").textContent=t("bNote"); $("bCur").textContent=t("bCur");
  $("bCashLb").textContent=t("bCashLb"); $("bFoodLb").textContent=t("catFood"); $("bTransportLb").textContent=t("catTransport");
  $("bFunLb").textContent=t("catFun"); $("bShopLb").textContent=t("catShop");
  $("bGoalLb").textContent=t("bGoalLb"); $("bSave").textContent=t("bSave");
  $("rTitle").textContent=t("rpTitle");
  $("meTitle").textContent=t("meTitle"); $("meNote").textContent=t("meNote");
  $("meBizLb").textContent=t("meBizLb"); $("mBiz").placeholder=t("meBizPh");
  $("meCatLb").textContent=t("meCatLb"); $("mePlaceLb").textContent=t("mePlaceLb");
  var mc=$("mCat"); mc.innerHTML=""; CATS.forEach(function(c){ var o=document.createElement("option"); o.textContent=L(c); mc.appendChild(o); });
  var mp=$("mPlace"); mp.innerHTML="";
  [["street","placeStreet"],["mall","placeMall"],["club","placeClub"]].forEach(function(x){ var o=document.createElement("option"); o.value=x[0]; o.textContent=fmt(x[1], money(ADS_COST[x[0]])); mp.appendChild(o); });
  $("meLinkLb").textContent=t("meLinkLb"); $("mePayNote").textContent=t("payVirtual");
  $("meGo").textContent=t("meGo");
  $("siTitle").textContent=t("siTitle"); $("siNote").textContent=t("siNote");
  $("siNameLb").textContent=t("siNameLb"); $("sName").placeholder=t("siNamePh");
  $("siSongLb").textContent=t("siSongLb"); $("sTitle").placeholder=t("siSongPh");
  $("siLinkLb").textContent=t("siLinkLb"); $("siPayNote").textContent=t("payVirtual"); $("siGo").textContent=fmt("siGo", money(SINGER_COST));
  $("cuTitle").textContent=t("cuTitle"); $("cuNote").textContent=t("cuNote");
  $("cuTypeLb").textContent=t("cuTypeLb");
  var ctOpts=["cuTypeShop","cuTypeNpc","cuTypeHome","cuTypeJob","cuTypeFood","cuTypeGoods","cuTypePlace","cuTypeTransport"];
  for(var ci=0; ci<ctOpts.length && ci<$("cType").options.length; ci++) $("cType").options[ci].textContent=t(ctOpts[ci]);
  $("cuNum1Lb").textContent=t("cuPriceLb"); $("cuNum2Lb").textContent=t("cuHungerLb");
  $("cuFxLb").textContent=t("cuFxLb"); $("cuEmojiLb").textContent=t("cuEmojiLb");
  var fxSel=$("cFx"); fxSel.innerHTML="";
  [["relax","fxRelax"],["social","fxSocial"],["study","fxStudy"],["exercise","fxExercise"]].forEach(function(x){ var o=document.createElement("option"); o.value=x[0]; o.textContent=t(x[1]); fxSel.appendChild(o); });
  $("cuNameLb").textContent=t("cuNameLb"); $("cName").placeholder=t("cuNamePh");
  $("cuDescLb").textContent=t("cuDescLb"); $("cDesc").placeholder=t("cuDescPh");
  $("cuGo").textContent=t("cuGo");
  document.querySelectorAll("[data-lang]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-lang")===LANG); });
}
function render(){
  applyStatic();
  $("vDate").textContent=intlDate(S.dateISO)+" · "+(S.hour<10?"0":"")+S.hour+":00";
  $("vCash").textContent=money(S.cash);
  $("debtChip").style.display=S.debt>0?"":"none"; $("vDebt").textContent=money(S.debt);
  $("debtSec").style.display=S.debt>0?"":"none";
  if(S.debt>0) $("debtInfo").textContent=fmt("debtInfo", money(S.debt));
  $("barEnergy").style.width=S.energy+"%"; $("vEnergy").textContent=S.energy;
  $("barMood").style.width=S.mood+"%"; $("vMood").textContent=S.mood;
  $("barHunger").style.width=S.hunger+"%"; $("vHunger").textContent=S.hunger;
  $("barHygiene").style.width=S.hygiene+"%"; $("vHygiene").textContent=S.hygiene;
  $("barSocial").style.width=S.social+"%"; $("vSocial").textContent=S.social;
  $("vXp").textContent=S.xp;
  var jt=jobTitleObj();
  $("jobInfo").textContent = jt ? fmt("jobInfo", L(jt.title), S.jobLevel, money(jobPay())) : t("noJob");
  $("homeInfo").textContent=fmt("homeInfo", L(allHomes()[S.home].name), money(allHomes()[S.home].rent));
  if(document.activeElement!==$("nameInput")) $("nameInput").value=S.name;
  var Lc=loc();
  $("sceneEmoji").textContent=Lc.emoji; $("sceneName").textContent=L(Lc.title); $("sceneDesc").textContent=L(Lc.desc);
  $("scene").classList.toggle("night", isNight());
  $("speech").textContent=fmt.apply(null,[lastSay.k].concat(lastSay.a));
  var map=$("map"); map.innerHTML="";
  LOCS.forEach(function(x){
    var b=document.createElement("button");
    b.className="loc"+(x.id===S.loc?" active":"");
    b.innerHTML=x.icon+" "+L(x.name)+"<small>"+x.dist.toUpperCase()+"</small>";
    b.onclick=function(){ go(x.id); };
    map.appendChild(b);
  });
  S.custom.places.forEach(function(pl,i){
    var b=document.createElement("button");
    b.className="loc"+(S.loc==="cp"+i?" active":"");
    b.innerHTML=pl.emoji+" "+pl.name+"<small>✦</small>";
    b.onclick=function(){ go("cp"+i); };
    map.appendChild(b);
  });
  var bag=$("bag"); bag.innerHTML="";
  if(S.items.length===0 && S.gifts===0){ bag.innerHTML='<div class="item"><span>'+t("bagEmpty")+'</span></div>'; }
  S.items.forEach(function(zh){
    var g=null; GOODS.forEach(function(x){ if(x.name.zh===zh) g=x; });
    var d=document.createElement("div"); d.className="item"; d.innerHTML="<span>🎁 "+(g?L(g.name):zh)+"</span>"; bag.appendChild(d);
  });
  if(S.gifts>0){ var gd=document.createElement("div"); gd.className="item"; gd.innerHTML="<span>"+fmt("giftX", S.gifts)+"</span><small>"+t("giftHint")+"</small>"; bag.appendChild(gd); }
  var fr=$("friends"); fr.innerHTML="";
  allNpcs().forEach(function(n){
    var pts=S.friends[n.id]||0;
    var d=document.createElement("div"); d.className="friend";
    d.innerHTML="<span>"+n.emoji+" <b>"+n.name+"</b> · "+(typeof n.job==="string"?n.job:L(n.job))+"</span><span class='heartbar'><div style='width:"+Math.min(100,pts)+"%'></div></span> "+pts;
    fr.appendChild(d);
  });
  renderDiary();
  renderPanel();
  if(typeof renderBudgetPanel==="function") renderBudgetPanel();
  save();
}
function actBtn(label, sub, fn, disabled){
  return '<button class="act" onclick="'+fn+'" '+(disabled?"disabled":"")+'>'+label+'<small>'+sub+'</small></button>';
}
function linkHtml(url){ if(!url) return ""; var u=String(url); if(!/^https?:\/\//i.test(u)) u="https://"+u; return " · <a href='"+u+"' target='_blank' rel='noopener'>"+url+"</a>"; }
function renderPanel(){
  var p=$("panel"), h="";
  if(S.loc==="home"){
    h="<h3>"+t("pHome")+"</h3><div class='row'>"
      + actBtn(t("aSleep"), t("aSleepS"), "doSleep()")
      + actBtn(t("aRest"), t("aRestS"), "doRest()")
      + actBtn(t("aShower"), t("aShowerS"), "doShower()")
      + actBtn(t("aNoodle"), t("aNoodleS"), "doNoodle()")
      + "</div><h3 style='margin-top:12px'>"+t("moveH")+"</h3><div class='list'>";
    allHomes().forEach(function(hm,i){
      h+="<div class='item'><span><b>"+L(hm.name)+"</b><small>"+t("rentW")+" "+money(hm.rent)+"</small></span>"
        + (i===S.home ? "<b>"+t("curHome")+"</b>" : "<button class='mini' onclick='doMove("+i+")'>"+t("moveBtn")+"</button>") + "</div>";
    });
    h+="</div>";
  }
  if(S.loc==="jobs"){
    h="<h3>"+t("pJobs")+"</h3><div class='list'>";
    allJobs().forEach(function(j,i){
      var cur=S.job===j.title.zh, ok=S.xp>=j.xp && !cur;
      h+="<div class='item'><span><b>"+L(j.title)+"</b> · "+money(j.pay)+"<small>"+L(j.desc)+"（"+fmt("xpNeed", j.xp)+"）</small></span>"
        + (cur ? "<b>"+t("onJob")+"</b>" : "<button class='mini' onclick='applyJob("+i+")' "+(ok?"":"disabled")+">"+t("apply")+"</button>") + "</div>";
    });
    h+="</div><p style='font-size:13px;opacity:.7'>"+t("jobsHint")+"</p>";
  }
  if(S.loc==="office"){
    h="<h3>"+t("pOffice")+"</h3><div class='row'>";
    if(S.job){
      h+= actBtn(t("aWork"), fmt("aWorkS", money(jobPay())), "doWork()")
        + actBtn(t("aOfficeChat"), t("aOfficeChatS"), "doOfficeChat()");
    } else {
      h+= actBtn(t("noJobGo"), t("noJobGoS"), "go('jobs')");
    }
    h+="</div>";
  }
  if(S.loc==="club"){
    h="<h3>"+t("pClub")+"</h3>";
    S.ads.filter(function(a){return a.place==="club";}).forEach(function(a){ h+="<div class='billboard'>"+fmt("sponsorF", a.biz, a.cat)+linkHtml(a.link)+"</div>"; });
    h+="<div id='playlist'></div><div class='row'>"
      + actBtn(t("aDance"), fmt("aDanceS", money(20)), "doDance()")
      + actBtn(t("aClubChat"), fmt("aClubChatS", money(12)), "doClubChat()")
      + actBtn(t("aVip"), fmt("aVipS", money(60)), "doVip()")
      + "</div>";
  }
  if(S.loc==="hotel"){
    h="<h3>🏨</h3><div class='list'>"
      + "<div class='item'><span><b>"+t("hotelStd")+"</b><small>"+fmt("hotelStdS", money(80))+"</small></span><button class='mini' onclick='doHotel(0)'>"+t("checkin")+"</button></div>"
      + "<div class='item'><span><b>"+t("hotelLux")+"</b><small>"+fmt("hotelLuxS", money(150))+"</small></span><button class='mini pink' onclick='doHotel(1)'>"+t("checkin")+"</button></div>"
      + "<div class='item'><span><b>"+t("hotelTea")+"</b><small>"+fmt("hotelTeaS", money(25))+"</small></span><button class='mini' onclick='doTea()'>"+t("order1")+"</button></div>"
      + "</div>";
  }
  if(S.loc==="food"){
    h="<h3>"+t("pFood")+"</h3><div class='list'>";
    allFoods().forEach(function(fd,i){
      h+="<div class='item'><span><b>"+L(fd.name)+"</b> · "+money(fd.price)+"<small>"+L(fd.desc)+" "+fmt("foodFx", fd.hunger, fd.mood)+"</small></span><button class='mini' onclick='doEat("+i+")'>"+t("eatBtn")+"</button></div>";
    });
    h+="</div>";
  }
  if(S.loc==="ktv"){
    h="<h3>"+t("pKtv")+"</h3><div class='row'>"
      + actBtn(t("aKtv0"), fmt("aKtv0S", money(15)), "doKtv(0)")
      + actBtn(t("aKtv1"), fmt("aKtv1S", money(45)), "doKtv(1)")
      + "</div>";
  }
  if(S.loc==="mall"){
    var recs=S.ads.filter(function(a){return a.place==="mall";});
    if(recs.length){ h="<h3>"+t("recH")+"</h3><div class='list'>";
      recs.forEach(function(a){ h+="<div class='item'><span>🏪 <b>"+a.biz+"</b><small>"+a.cat+"</small>"+linkHtml(a.link)+"</span><button class='mini' onclick='visitBiz()'>"+t("visit")+"</button></div>"; });
      h+="</div><h3 style='margin-top:12px'>"+t("shelfH")+"</h3>";
    } else h="<h3>"+t("shelfH")+"</h3>";
    h+="<div class='list'>";
    allGoods().forEach(function(g,i){
      var owned=S.items.indexOf(g.name.zh)>=0;
      h+="<div class='item'><span><b>"+L(g.name)+"</b> · "+money(g.price)+"<small>"+L(g.tag)+"</small></span>"
        + (owned && g.once ? "<b>"+t("owned")+"</b>" : "<button class='mini' onclick='doBuy("+i+")'>"+t("buy")+"</button>") + "</div>";
    });
    h+="</div>";
  }
  if(S.loc==="street"){
    h="<h3>"+t("pStreet")+"</h3>";
    S.ads.filter(function(a){return a.place==="street";}).forEach(function(a){ h+="<div class='billboard'>"+fmt("boardF", a.biz, a.cat)+linkHtml(a.link)+"</div>"; });
    h+="<div class='row'>"
      + actBtn(t("aWalk"), t("aWalkS"), "doWalk()")
      + actBtn(t("aMarket"), fmt("aMarketS", money(10)), "doMarket()")
      + "</div>";
    if(S.customShops.length){
      h+="<h3 style='margin-top:12px'>"+t("customH")+"</h3><div class='list'>";
      S.customShops.forEach(function(c,i){
        h+="<div class='item'><span><b>"+c.name+"</b><small>"+c.desc+"</small></span><button class='mini' onclick='visitCustom("+i+")'>"+t("checkin2")+"</button></div>";
      });
      h+="</div>";
    }
  }
  if(S.loc==="transport"){
    h="<h3>🚌 "+L(loc().name)+"</h3><p style='font-size:13px;opacity:.75;margin:2px 0 8px'>"+t("transNote")+"</p><div class='list'>";
    allTransModes().forEach(function(m){
      var cur=S.transMode===m.id;
      h+="<div class='item'><span><b>"+L(m.name)+"</b> · "+(m.fare>0?money(m.fare):t("freeW"))+"<small>"+L(m.desc)+"</small></span>"
        + (cur ? "<b>"+t("curW")+"</b>" : "<button class='mini' onclick='setTransMode(\""+m.id+"\")'>"+t("useBtn")+"</button>") + "</div>";
    });
    h+="</div>";
  }
  if(S.loc && S.loc.indexOf("cp")===0){
    var pi=parseInt(S.loc.slice(2),10), pl2=S.custom.places[pi];
    if(pl2){
      h="<h3>"+pl2.emoji+" "+pl2.name+"</h3><p style='font-size:14px; opacity:.8'>"+pl2.desc+"</p><div class='row'>"
        + actBtn(t("fx"+pl2.fx.charAt(0).toUpperCase()+pl2.fx.slice(1)).split("（")[0].split("(")[0], fmt("placeVisit", money(pl2.cost)), "visitPlace("+pi+")")
        + "</div>";
    }
  }
  if(S.loc==="cafe"){
    h="<h3>"+t("pCafe")+"</h3><div class='list'>";
    allNpcs().forEach(function(n){
      var line = typeof n.line==="string" ? n.line : L(n.line);
      var job = typeof n.job==="string" ? n.job : L(n.job);
      h+="<div class='item'><span>"+n.emoji+" <b>"+n.name+"</b> · "+job+"<small>“"+line+"”</small></span>"
        + "<span><button class='mini' onclick=\"doChat('"+n.id+"')\">"+t("chat")+"</button> "
        + "<button class='mini pink' onclick=\"doGift('"+n.id+"')\" "+(S.gifts>0?"":"disabled")+">"+t("gift")+"</button></span></div>";
    });
    h+="</div>";
  }
  p.innerHTML=h;
  var pl=$("playlist");
  if(pl){
    var lines="<div class='songline'>"+t("playlistBase")+"</div>";
    S.songs.forEach(function(g){
      lines+="<div class='songline'>"+fmt("songHot", g.singer, g.title, linkHtml(g.link), g.days)+"</div>";
    });
    pl.innerHTML=lines;
  }
}
