/* ---------- actions ---------- */
function doSleep(){ S.energy=100; S.hygiene=clamp(S.hygiene+10); S.hunger=clamp(S.hunger-8); S.hour=8; newDay(); sayT("sSleep"); logT("lSleep"); render(); maybeReport(); }
function doRest(){ S.energy=clamp(S.energy+18); S.mood=clamp(S.mood+6); advance(2); sayT("sRest"); render(); }
function doShower(){ S.hygiene=clamp(S.hygiene+38); advance(1); sayT("sShower"); render(); }
function doNoodle(){ S.hunger=clamp(S.hunger+14); advance(1); sayT("sNoodle"); render(); }
function doMove(i){
  var rent=allHomes()[i].rent;
  if(S.cash<rent){ sayT("sMoveNo", money(rent)); render(); return; }
  S.cash-=rent; exp("rent",rent); S.home=i; S.mood=clamp(S.mood+8);
  sayT("sMoved", L(allHomes()[i].name)); logT("lMove", L(allHomes()[i].name)); render();
}
function applyJob(i){ var j=allJobs()[i]; S.job=j.title.zh; S.jobLevel=1; sayT("sHired", L(j.title)); logT("lHired", L(j.title)); render(); }
function doWork(){
  if(S.energy<22){ sayT("sTired"); render(); return; }
  var pay=jobPay(); S.cash+=pay; inc(pay); S.xp+=10; S.energy=clamp(S.energy-22); S.hunger=clamp(S.hunger-6);
  advance(4); logT("lWork", money(pay));
  var jt=jobTitleObj();
  if(jt && S.xp>=S.jobLevel*40 && S.jobLevel<5){ S.jobLevel+=1; sayT("sPromoted", L(jt.title), S.jobLevel, money(jobPay())); logT("lPromote", L(jt.title), S.jobLevel); }
  else sayT("sWork", money(pay));
  render();
}
function doOfficeChat(){ S.social=clamp(S.social+8); S.energy=clamp(S.energy-4); advance(1); sayT("sOfficeChat"); render(); }
function doDance(){ if(!spendCash(20,"fun")){ render(); return; } S.mood=clamp(S.mood+18); S.social=clamp(S.social+12); S.energy=clamp(S.energy-15); advance(2); sayT("sDance"); logT("lDance"); render(); }
function doClubChat(){
  if(!spendCash(12,"fun")){ render(); return; }
  S.social=clamp(S.social+10); S.mood=clamp(S.mood+6); advance(1);
  var n=NPCS[Math.floor(Math.random()*NPCS.length)];
  S.friends[n.id]=clamp((S.friends[n.id]||0)+4);
  sayT("sClubChat", n.name, 4); render();
}
function doVip(){ if(!spendCash(60,"fun")){ render(); return; } S.mood=clamp(S.mood+26); S.social=clamp(S.social+16); advance(2); sayT("sVip"); logT("lVip"); render(); }
function doHotel(tier){
  if(tier===0){ if(!spendCash(80,"stay")){ render(); return; } S.mood=clamp(S.mood+8); S.hygiene=100; sayT("sHotelStd"); logT("lHotel", t("hotelStd")); }
  else { if(!spendCash(150,"stay")){ render(); return; } S.mood=clamp(S.mood+22); S.hunger=clamp(S.hunger+15); S.hygiene=100; sayT("sHotelLux"); logT("lHotel", t("hotelLux")); }
  S.energy=100; S.hour=8; newDay(); render(); maybeReport();
}
function doTea(){ if(!spendCash(25,"fun")){ render(); return; } S.mood=clamp(S.mood+10); S.social=clamp(S.social+5); advance(1); sayT("sTea"); render(); }
function doEat(i){ var f=allFoods()[i]; if(!spendCash(f.price,"food")){ render(); return; } S.hunger=clamp(S.hunger+f.hunger); S.mood=clamp(S.mood+f.mood); advance(1); sayT("sEat", L(f.name), L(f.desc)); logT("lEat", L(f.name)); render(); }
function doKtv(tier){
  if(tier===0){ if(!spendCash(15,"fun")){ render(); return; } S.mood=clamp(S.mood+12); S.social=clamp(S.social+6); advance(2); sayT("sKtv0"); }
  else{
    if(!spendCash(45,"fun")){ render(); return; }
    S.mood=clamp(S.mood+24); S.social=clamp(S.social+14); advance(3);
    if(Math.random()<0.35){ S.cash+=10; inc(10); sayT("sKtv1Tip", money(10)); } else sayT("sKtv1");
  }
  logT("lKtv"); render();
}
function doBuy(i){
  var g=allGoods()[i]; if(!spendCash(g.price,"shop")){ render(); return; }
  if(g.once) S.items.push(g.name.zh); else S.gifts+=1;
  S.mood=clamp(S.mood+6); sayT("sBuy", L(g.name), L(g.tag)); logT("lBuy", L(g.name)); advance(1); render();
}
function visitBiz(){ S.mood=clamp(S.mood+5); advance(1); sayT("sBiz"); render(); }
function doWalk(){
  advance(1); S.mood=clamp(S.mood+5);
  var r=Math.random();
  if(r<0.25){ S.cash+=5; inc(5); sayT("sWalk1", money(5)); }
  else if(r<0.5){ var n=NPCS[Math.floor(Math.random()*NPCS.length)]; S.friends[n.id]=clamp((S.friends[n.id]||0)+3); sayT("sWalk2", n.name); }
  else sayT("sWalk3");
  render();
}
function doMarket(){ if(!spendCash(10,"shop")){ render(); return; } S.mood=clamp(S.mood+9); advance(1); sayT("sMarket"); render(); }
function visitCustom(i){ var c=S.customShops[i]; S.mood=clamp(S.mood+6); S.social=clamp(S.social+3); advance(1); sayT("sCustom", c.name, c.desc); render(); }
function doChat(id){
  var n=npcById(id);
  var gain=5 + (hasItem("智能手机")?2:0);
  var line = typeof n.line==="string" ? n.line : L(n.line);
  if(S.hygiene<25){ gain=Math.max(1, Math.floor(gain/2)); S.friends[id]=clamp((S.friends[id]||0)+gain); S.social=clamp(S.social+3); advance(1); sayT("sChatDirty", n.name, "", gain); }
  else { S.friends[id]=clamp((S.friends[id]||0)+gain); S.social=clamp(S.social+6); advance(1); sayT("sChat", n.name, line, gain); }
  render();
}
function doGift(id){ if(S.gifts<=0) return; S.gifts-=1; var n=npcById(id); S.friends[id]=clamp((S.friends[id]||0)+18); sayT("sGift", n.name); logT("lGift", n.name); render(); }
function doRepay(){
  if(S.debt<=0) return;
  var amt=Math.min(200, S.debt, S.cash);
  if(amt<=0){ sayT("sNoCash"); render(); return; }
  S.cash-=amt; S.debt-=amt;
  if(S.debt<=0){ S.debt=0; sayT("sRepayDone"); } else sayT("sRepay", money(amt), money(S.debt));
  logT("lRepay", money(amt)); render();
}
