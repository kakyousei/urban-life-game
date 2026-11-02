var KEY="urban-life-save-v1";
function $(id){ return document.getElementById(id); }
function clamp(v){ return Math.max(0, Math.min(100, Math.round(v))); }
function fmtN(n){ return n.toLocaleString("en-US"); }

function fresh(){
  return {started:true, name:"小拉", day:1, hour:8, cash:0, debt:0, energy:85, mood:70, hunger:70, hygiene:80, social:40,
    job:null, jobLevel:1, xp:0, loc:"home", home:0, transMode:"bus", items:[], gifts:0, friends:{ada:10,tun:5,fun:0,eme:0,bol:15},
    dateISO:todayISO(), daysPlayed:0, custom:{homes:[],jobs:[],foods:[],goods:[],places:[],transports:[]}, customShops:[], customNpcs:[], ads:[], songs:[], diary:[], month:1, mInc:0, mExp:{rent:0,food:0,transport:0,fun:0,shop:0,stay:0}, budgets:{food:600,transport:200,fun:400,shop:300}, goal:2000, lastReport:null};
}
var S;
try{ S=JSON.parse(localStorage.getItem(KEY))||JSON.parse(localStorage.getItem("naira-life-save-v1"))||JSON.parse(localStorage.getItem("lagos-life-save-v1"))||null; }catch(e){ S=null; }
if(!S || typeof S.cash!=="number"){ S=fresh(); } else { var f=fresh(); for(var k in f) if(S[k]===undefined) S[k]=f[k]; }
if(!S.dateISO) S.dateISO=todayISO();
if(S.daysPlayed===undefined || S.daysPlayed===null) S.daysPlayed=Math.max(0,(S.day||1)-1);
if(!S.custom) S.custom={homes:[],jobs:[],foods:[],goods:[],places:[],transports:[]};
if(!S.custom.transports) S.custom.transports=[];
if(!S.transMode) S.transMode="bus";
S.started=true;
var selPack=1, lastSay={k:"sStart", a:[]};

function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
function sayT(k){ lastSay={k:k, a:Array.prototype.slice.call(arguments,1)}; $("speech").textContent=fmt.apply(null,[k].concat(lastSay.a)); }
function logT(k){ S.diary.unshift({k:k, a:Array.prototype.slice.call(arguments,1), d:S.dateISO}); if(S.diary.length>40) S.diary.length=40; renderDiary(); }
function renderDiary(){
  var w=$("diary"); w.innerHTML="";
  S.diary.forEach(function(e){
    var p=document.createElement("p");
    p.textContent=((typeof e.d==="string") ? intlShort(e.d) : ("#"+e.d))+" · "+fmt.apply(null,[e.k].concat(e.a));
    w.appendChild(p);
  });
}
function locById(id){
  if(id && id.indexOf("cp")===0){ var i=parseInt(id.slice(2),10); var p=S.custom.places[i];
    if(p) return {id:id, dist:"any", emoji:p.emoji, name:L3(p.name,p.name,p.name), title:L3(p.name,p.name,p.name), desc:L3(p.desc,p.desc,p.desc), placeIdx:i}; }
  for(var j=0;j<LOCS.length;j++) if(LOCS[j].id===id) return LOCS[j];
  return LOCS[0];
}
function loc(){ return locById(S.loc); }
function isNight(){ return S.hour>=18 || S.hour<5; }
function allHomes(){ return HOMES.concat(S.custom.homes); }
function allJobs(){ return JOBS.concat(S.custom.jobs); }
function allFoods(){ return FOODS.concat(S.custom.foods); }
function allGoods(){ return GOODS.concat(S.custom.goods); }
function jobPay(){ if(!S.job) return 0; var base=0, list=allJobs(); for(var i=0;i<list.length;i++) if(list[i].title.zh===S.job) base=list[i].pay; return Math.round(base*(1+0.25*(S.jobLevel-1))); }
function jobTitleObj(){ var list=allJobs(); for(var i=0;i<list.length;i++) if(list[i].title.zh===S.job) return list[i]; return null; }
function hasItem(zhName){ return S.items.indexOf(zhName)>=0; }
function advance(h){
  for(var i=0;i<h;i++){
    S.hour+=1; S.hunger=clamp(S.hunger-2); S.hygiene=clamp(S.hygiene-1);
    if(S.hour>=24){ S.hour-=24; newDay(); }
  }
  if(S.energy<=5) sayT("sTired"); else if(S.hunger<=10) sayT("sHungry"); else if(S.hygiene<=15) sayT("sDirty");
}
function newDay(){
  var prevISO=S.dateISO;
  S.dateISO=isoAdd(S.dateISO, 1); S.day+=1; S.daysPlayed+=1;
  logT("lNewDay");
  S.ads=S.ads.filter(function(a){ a.days-=1; if(a.days<=0){ logT("lAdExp", a.biz); return false; } return true; });
  S.songs=S.songs.filter(function(g){ g.days-=1; if(g.days<=0){ logT("lSongExp", g.title); return false; } return true; });
  if(S.dateISO.slice(0,7)!==prevISO.slice(0,7)){ closeMonth(prevISO.slice(0,7)); }
  if(S.daysPlayed%7===0){
    var rent=allHomes()[S.home].rent;
    if(S.cash>=rent){ S.cash-=rent; exp("rent",rent); logT("lRent", money(rent)); sayT("sRentPaid", money(rent)); }
    else { var short=rent-S.cash; S.cash=0; S.debt+=short; logT("lRentDebt", money(short)); sayT("sRentDebt", money(rent)); }
    if(S.debt>0){ S.debt=Math.round(S.debt*1.05); }
  }
  var r=Math.random();
  if(r<0.22){
    if(hasItem("太阳能供电套装")||hasItem("小型发电机")){ sayT("sEvPowerGen"); }
    else { S.mood=clamp(S.mood-6); sayT("sEvPower"); }
  } else if(r<0.34){ var gig=20+Math.floor(Math.random()*3)*5; S.cash+=gig; inc(gig); sayT("sEvGig", money(gig)); }
  else if(r<0.42){ S.hunger=clamp(S.hunger+12); sayT("sEvTreat"); }
}
function spendCash(n, cat){ if(S.cash<n){ sayT("sNoCash"); return false; } S.cash-=n; if(cat) exp(cat, n); return true; }
function go(id){
  var from=loc(), to=locById(id);
  if(to && from.id!==to.id && from.dist!=="any" && to.dist!=="any" && from.dist!==to.dist){
    var tm=transModeObj();
    if(tm.fare>0 && S.cash>=tm.fare){
      S.cash-=tm.fare; exp("transport", tm.fare); sayT("sFare", money(tm.fare));
      if(tm.id==="taxi"){ S.mood=clamp(S.mood+2); }
      if(tm.id==="bus" || tm.custom){ if(Math.random()<0.18){ advance(1); S.mood=clamp(S.mood-5); sayT("sTraffic"); } }
    }
    else { advance(1); S.energy=clamp(S.energy-6); sayT("sWalkFar"); }
  }
  S.loc=id; render(); window.scrollTo({top:0, behavior:"smooth"});
}
function allNpcs(){
  var list=NPCS.slice();
  S.customNpcs.forEach(function(c,i){ list.push({id:"cus"+i, emoji:"🧑", name:c.name, job:c.desc||t("myFriend"), line:c.desc||""}); });
  return list;
}
function npcById(id){ var a=allNpcs(); for(var i=0;i<a.length;i++) if(a[i].id===id) return a[i]; return a[0]; }

function todayISO(){ var d=new Date(); return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2); }
function isoToDate(iso){ var p=String(iso).split("-"); return new Date(parseInt(p[0],10), parseInt(p[1],10)-1, parseInt(p[2],10)); }
function isoAdd(iso, days){ var d=isoToDate(iso); d.setDate(d.getDate()+days); return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2); }
function intlDate(iso){ try{ return new Intl.DateTimeFormat(localeTag(), {year:"numeric", month:"short", day:"numeric", weekday:"short"}).format(isoToDate(iso)); }catch(e){ return iso; } }
function intlYM(iso){ try{ var v=(String(iso).length===7) ? iso+"-02" : iso; return new Intl.DateTimeFormat(localeTag(), {year:"numeric", month:"long"}).format(isoToDate(v)); }catch(e){ return iso; } }
function intlShort(iso){ try{ return new Intl.DateTimeFormat(localeTag(), {month:"short", day:"numeric"}).format(isoToDate(iso)); }catch(e){ return iso; } }

function transModeObj(){
  if(S.transMode && S.transMode.indexOf("ct")===0){
    var cm=S.custom.transports[parseInt(S.transMode.slice(2),10)];
    if(cm) return {id:S.transMode, fare:cm.fare, custom:true, name:{zh:cm.name, ja:cm.name, en:cm.name}};
  }
  for(var i=0;i<TRANS.length;i++) if(TRANS[i].id===S.transMode) return TRANS[i];
  return TRANS[1];
}
function setTransMode(id){ S.transMode=id; var m=transModeObj(); sayT("sTransSet", L(m.name)); render(); }
function allTransModes(){
  var list=TRANS.slice();
  S.custom.transports.forEach(function(cm,i){ list.push({id:"ct"+i, fare:cm.fare, custom:true, name:{zh:cm.name, ja:cm.name, en:cm.name}, desc:{zh:"", ja:"", en:""}}); });
  return list;
}
