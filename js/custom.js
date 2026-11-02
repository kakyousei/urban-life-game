"use strict";
/* "Build my city": players add their own real-life facilities of every kind —
   shops, friends, homes, jobs, dishes, products and places to visit. */
function cuTypeChanged(){
  var ty=$("cType").value;
  var n1=$("cuNum1Wrap"), n2=$("cuNum2Wrap"), fx=$("cuFxWrap"), em=$("cuEmojiWrap");
  n1.style.display="none"; n2.style.display="none"; fx.style.display="none"; em.style.display="none";
  if(ty==="home"){ n1.style.display=""; $("cuNum1Lb").textContent=t("cuRentLb"); }
  else if(ty==="job"){ n1.style.display=""; $("cuNum1Lb").textContent=t("cuPayLb"); }
  else if(ty==="food"){ n1.style.display=""; n2.style.display=""; $("cuNum1Lb").textContent=t("cuPriceLb"); }
  else if(ty==="goods"){ n1.style.display=""; $("cuNum1Lb").textContent=t("cuPriceLb"); }
  else if(ty==="place"){ n1.style.display=""; fx.style.display=""; em.style.display=""; $("cuNum1Lb").textContent=t("cuCostLb"); }
  else if(ty==="transport"){ n1.style.display=""; $("cuNum1Lb").textContent=t("cuFareLb"); }
  else if(ty==="office"){ n1.style.display=""; $("cuNum1Lb").textContent=t("cuPayLb"); }
  else if(ty==="club"||ty==="hotel"||ty==="ktv"){ n1.style.display=""; $("cuNum1Lb").textContent=t("cuPriceLb"); }
}
function cuNum(id, dft){ var v=parseFloat($(id).value); return isNaN(v)||v<0 ? dft : Math.max(0, toUSD(v)); }
function submitCustom(){
  var nm=$("cName").value.trim(); if(!nm){ $("cMsg").textContent=t("cuNeedName"); return; }
  var ty=$("cType").value, d=$("cDesc").value.trim();
  var msgKey="cuOkShop";
  if(ty==="shop"){ S.customShops.push({name:nm, desc:d||nm}); }
  else if(ty==="npc"){ S.customNpcs.push({name:nm, desc:d||t("myFriend")}); msgKey="cuOkNpc"; }
  else if(ty==="home"){ S.custom.homes.push({rent:cuNum("cNum1",150), name:L3(nm,nm,nm)}); msgKey="cuOkShop"; }
  else if(ty==="job"){ S.custom.jobs.push({pay:cuNum("cNum1",100), xp:0, title:L3(nm,nm,nm), desc:L3(d||nm,d||nm,d||nm)}); msgKey="cuOkShop"; }
  else if(ty==="food"){ var hv=parseFloat($("cNum2").value); if(isNaN(hv)||hv<0) hv=20; hv=Math.min(100, Math.round(hv)); S.custom.foods.push({price:cuNum("cNum1",20), hunger:hv, mood:6, name:L3(nm,nm,nm), desc:L3(d||nm,d||nm,d||nm)}); msgKey="cuOkShop"; }
  else if(ty==="goods"){ S.custom.goods.push({price:cuNum("cNum1",30), once:true, name:L3(nm,nm,nm), tag:L3(d||nm,d||nm,d||nm)}); msgKey="cuOkShop"; }
  else if(ty==="place"){ S.custom.places.push({name:nm, desc:d||nm, cost:cuNum("cNum1",10), fx:$("cFx").value, emoji:$("cEmoji").value}); msgKey="cuOkShop"; }
  else if(ty==="transport"){ S.custom.transports.push({name:nm, fare:cuNum("cNum1",3)}); msgKey="cuOkShop"; }
  else if(ty==="office"||ty==="club"||ty==="hotel"||ty==="ktv"){
    if(!S.custom.venues) S.custom.venues={office:[],club:[],hotel:[],ktv:[]};
    if(!S.custom.venues[ty]) S.custom.venues[ty]=[];
    var defs={office:100,club:30,hotel:100,ktv:25};
    S.custom.venues[ty].push({name:nm, desc:d||nm, amount:cuNum("cNum1",defs[ty])}); msgKey="cuOkShop";
  }
  $("cMsg").textContent=t(msgKey);
  $("cName").value=""; $("cDesc").value="";
  logT("lCustom", nm); renderCustomList(); render();
}
function renderCustomList(){
  var w=$("customList"); if(!w) return;
  var h="";
  S.customShops.forEach(function(c){ h+="<div class='item'><span>🏪 "+c.name+"</span><small>"+c.desc+"</small></div>"; });
  S.customNpcs.forEach(function(c){ h+="<div class='item'><span>🧑 "+c.name+"</span><small>"+c.desc+"</small></div>"; });
  S.custom.homes.forEach(function(c){ h+="<div class='item'><span>🏠 "+c.name.zh+"</span><small>"+money(c.rent)+"</small></div>"; });
  S.custom.jobs.forEach(function(c){ h+="<div class='item'><span>💼 "+c.title.zh+"</span><small>"+money(c.pay)+"</small></div>"; });
  S.custom.foods.forEach(function(c){ h+="<div class='item'><span>🍽️ "+c.name.zh+"</span><small>"+money(c.price)+"</small></div>"; });
  S.custom.goods.forEach(function(c){ h+="<div class='item'><span>🧺 "+c.name.zh+"</span><small>"+money(c.price)+"</small></div>"; });
  S.custom.places.forEach(function(c){ h+="<div class='item'><span>"+c.emoji+" "+c.name+"</span><small>"+c.desc+"</small></div>"; });
  S.custom.transports.forEach(function(c){ h+="<div class='item'><span>🚌 "+c.name+"</span><small>"+money(c.fare)+"</small></div>"; });
  if(S.custom.venues){
    (S.custom.venues.office||[]).forEach(function(c){ h+="<div class='item'><span>🏢 "+c.name+"</span><small>"+money(c.amount)+"</small></div>"; });
    (S.custom.venues.club||[]).forEach(function(c){ h+="<div class='item'><span>🌃 "+c.name+"</span><small>"+money(c.amount)+"</small></div>"; });
    (S.custom.venues.hotel||[]).forEach(function(c){ h+="<div class='item'><span>🏨 "+c.name+"</span><small>"+money(c.amount)+"</small></div>"; });
    (S.custom.venues.ktv||[]).forEach(function(c){ h+="<div class='item'><span>🎤 "+c.name+"</span><small>"+money(c.amount)+"</small></div>"; });
  }
  w.innerHTML=h ? "<h4 style='margin:12px 0 6px'>"+t("addedH")+"</h4>"+h : "";
}
function doVenueShift(i){
  var v=S.custom.venues && S.custom.venues.office[i]; if(!v) return;
  if(S.energy<22){ sayT("sTired"); render(); return; }
  S.cash+=v.amount; inc(v.amount,"salary"); S.xp+=10;
  S.energy=clamp(S.energy-22); S.hunger=clamp(S.hunger-6); advance(4);
  sayT("sWork", money(v.amount)); logT("lWork", money(v.amount)); render();
}
function doVenueFun(kind,i){
  var v=S.custom.venues && S.custom.venues[kind][i]; if(!v) return;
  if(!spendCash(v.amount,"fun")){ render(); return; }
  S.mood=clamp(S.mood+18); S.social=clamp(S.social+12); advance(2);
  sayT("sVenueFun", v.name); render();
}
function doVenueStay(i){
  var v=S.custom.venues && S.custom.venues.hotel[i]; if(!v) return;
  if(!spendCash(v.amount,"stay")){ render(); return; }
  S.mood=clamp(S.mood+12); S.hygiene=100; S.energy=100; S.hour=8;
  sayT("sVenueStay", v.name); newDay(); render(); maybeReport();
}
function visitPlace(i){
  var p=S.custom.places[i]; if(!p) return;
  if(p.cost>0 && !spendCash(p.cost, "fun")){ render(); return; }
  if(p.fx==="relax"){ S.mood=clamp(S.mood+12); }
  else if(p.fx==="social"){ S.social=clamp(S.social+12); S.mood=clamp(S.mood+6); }
  else if(p.fx==="study"){ S.xp+=6; S.mood=clamp(S.mood+2); }
  else if(p.fx==="exercise"){ S.energy=clamp(S.energy-10); S.mood=clamp(S.mood+10); S.hygiene=clamp(S.hygiene-8); }
  advance(2);
  sayT("sPlace", p.name);
  render();
}
