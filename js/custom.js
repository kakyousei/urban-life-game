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
}
function cuNum(id, dft){ var v=parseInt($(id).value,10); return isNaN(v)||v<0 ? dft : v; }
function submitCustom(){
  var nm=$("cName").value.trim(); if(!nm){ $("cMsg").textContent=t("cuNeedName"); return; }
  var ty=$("cType").value, d=$("cDesc").value.trim();
  var msgKey="cuOkShop";
  if(ty==="shop"){ S.customShops.push({name:nm, desc:d||nm}); }
  else if(ty==="npc"){ S.customNpcs.push({name:nm, desc:d||t("myFriend")}); msgKey="cuOkNpc"; }
  else if(ty==="home"){ S.custom.homes.push({rent:cuNum("cNum1",150), name:L3(nm,nm,nm)}); msgKey="cuOkShop"; }
  else if(ty==="job"){ S.custom.jobs.push({pay:cuNum("cNum1",100), xp:0, title:L3(nm,nm,nm), desc:L3(d||nm,d||nm,d||nm)}); msgKey="cuOkShop"; }
  else if(ty==="food"){ S.custom.foods.push({price:cuNum("cNum1",20), hunger:cuNum("cNum2",20), mood:6, name:L3(nm,nm,nm), desc:L3(d||nm,d||nm,d||nm)}); msgKey="cuOkShop"; }
  else if(ty==="goods"){ S.custom.goods.push({price:cuNum("cNum1",30), once:true, name:L3(nm,nm,nm), tag:L3(d||nm,d||nm,d||nm)}); msgKey="cuOkShop"; }
  else if(ty==="place"){ S.custom.places.push({name:nm, desc:d||nm, cost:cuNum("cNum1",10), fx:$("cFx").value, emoji:$("cEmoji").value}); msgKey="cuOkShop"; }
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
  w.innerHTML=h ? "<h4 style='margin:12px 0 6px'>"+t("addedH")+"</h4>"+h : "";
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
