
"use strict";
var pendingReport=false;
var BCATS=["food","transport","fun","shop"];
var ALLCATS=["rent","food","transport","fun","shop","stay","other"];
function exp(cat, amt){ if(S.mExp && S.mExp[cat]!==undefined) S.mExp[cat]+=amt; }
var INCCATS=["salary","side","extra"];
function freshInc(){ return {salary:0,side:0,extra:0}; }
function inc(amt, cat){ S.mInc=(S.mInc||0)+amt; if(cat){ if(!S.mIncCats) S.mIncCats=freshInc(); if(S.mIncCats[cat]!==undefined) S.mIncCats[cat]+=amt; } }
function freshExp(){ return {rent:0,food:0,transport:0,fun:0,shop:0,stay:0,other:0}; }
function closeMonth(ym){
  var tot=0; ALLCATS.forEach(function(c){ tot+=(S.mExp[c]||0); });
  var net=S.mInc-tot;
  var rate=S.mInc>0 ? net/S.mInc : (net>=0?1:-1);
  var g= rate>=0.3 ? "S" : rate>=0.15 ? "A" : rate>=0 ? "B" : rate>=-0.2 ? "C" : "D";
  S.lastReport={ym:ym, inc:S.mInc, incCats:Object.assign({}, S.mIncCats||{}), exp:Object.assign({}, S.mExp), tot:tot, net:net,
    rate:Math.round(rate*100), grade:g, budgets:Object.assign({}, S.budgets)};
  logT("lMonth", money(net));
  S.mInc=0; S.mIncCats=freshInc(); S.mExp=freshExp();
  pendingReport=true;
}
function resyncClock(){
  var today=todayISO();
  if(S.dateISO && S.dateISO<today){
    var om=S.dateISO.slice(0,7);
    if(om!==today.slice(0,7)){
      if(S.mInc>0 || ALLCATS.some(function(c){ return (S.mExp[c]||0)>0; })) closeMonth(om);
      S.dateISO=today;
      if(typeof chargeRent==="function") chargeRent();
    } else S.dateISO=today;
  }
  S.hour=new Date().getHours();
}
function maybeReport(){ if(pendingReport){ pendingReport=false; openModal("report"); } }
function barRow(label, val, max, color, rightText){
  var pct=max>0 ? Math.min(100, Math.round(val/max*100)) : 0;
  return "<div style='margin-bottom:7px'><div style='display:flex; justify-content:space-between; font-size:13.5px'><span>"+label+"</span><b>"+rightText+"</b></div>"
    +"<div class='bar'><div style='width:"+pct+"%; background:"+color+"'></div></div></div>";
}
function renderBudgetPanel(){
  var w=$("budgetPanel"); if(!w) return;
  $("hBudget").textContent=t("hBudget")+" · "+intlYM(S.dateISO);
  var h="";
  var incParts=[];
  INCCATS.forEach(function(c){ var v=(S.mIncCats||{})[c]||0; if(v>0) incParts.push(t("cat"+c.charAt(0).toUpperCase()+c.slice(1))+" "+money(v)); });
  h+="<div style='margin-bottom:9px; font-size:13.5px'>"+t("rpIncome")+": <b>"+money(S.mInc)+"</b>"+(incParts.length ? "<br><span style='opacity:.75'>"+incParts.join(" · ")+"</span>" : "")+"</div>";
  BCATS.forEach(function(c){
    var spent=S.mExp[c]||0, cap=S.budgets[c]||0, over=cap>0 && spent>cap;
    h+=barRow(t("cat"+c.charAt(0).toUpperCase()+c.slice(1)), spent, Math.max(cap, spent, 1),
      over ? "#ef476f" : "#06d6a0", money(spent)+" / "+money(cap)+(over ? " · "+t("budOver") : ""));
  });
  var gp=S.goal>0 ? Math.min(100, Math.round(S.cash/S.goal*100)) : 100;
  h+="<div style='margin-top:9px'>"+barRow(t("goalW"), S.cash, Math.max(S.goal, S.cash, 1), "#ffb703", money(S.cash)+" / "+money(S.goal))+"</div>";
  w.innerHTML=h;
}
function fillBudget(){
  $("bCash").value=toDisplay(S.cash);
  $("bFood").value=toDisplay(S.budgets.food); $("bTransport").value=toDisplay(S.budgets.transport);
  $("bFun").value=toDisplay(S.budgets.fun); $("bShop").value=toDisplay(S.budgets.shop); $("bGoal").value=toDisplay(S.goal);
  ["bCash","bFood","bTransport","bFun","bShop","bGoal"].forEach(function(id){ $(id).step=fxStep(); });
  var tot=0; ALLCATS.forEach(function(c){ tot+=(S.mExp[c]||0); });
  var lines=intlYM(S.dateISO)+" · "+t("rpIncome")+" <b>"+money(S.mInc)+"</b> · "+t("rpExpense")+" <b>"+money(tot)+"</b><br>";
  ALLCATS.forEach(function(c){ lines+=t("cat"+c.charAt(0).toUpperCase()+c.slice(1))+": "+money(S.mExp[c]||0)+"　"; });
  lines+="<br>"+t("rpIncCats")+": ";
  INCCATS.forEach(function(c){ lines+=t("cat"+c.charAt(0).toUpperCase()+c.slice(1))+": "+money((S.mIncCats||{})[c]||0)+"　"; });
  $("bSummary").innerHTML=lines;
  $("bMsg").textContent="";
}
function saveBudget(){
  function num(id, old){ var v=parseInt($(id).value,10); return isNaN(v)||v<0 ? old : v; }
  S.cash=toUSD(num("bCash", toDisplay(S.cash)));
  S.budgets.food=toUSD(num("bFood", toDisplay(S.budgets.food)));
  S.budgets.transport=toUSD(num("bTransport", toDisplay(S.budgets.transport)));
  S.budgets.fun=toUSD(num("bFun", toDisplay(S.budgets.fun)));
  S.budgets.shop=toUSD(num("bShop", toDisplay(S.budgets.shop)));
  S.goal=toUSD(num("bGoal", toDisplay(S.goal)));
  $("bMsg").textContent=t("bSaved");
  render();
}
function renderReport(){
  var r=S.lastReport, w=$("rBody"); if(!w) return;
  if(!r){ w.innerHTML="—"; return; }
  var h="<p style='font-size:16px'><b>"+intlYM(r.ym)+"</b> · "+t("rpGrade")+": <b style='font-size:22px'>"+r.grade+"</b><br>"
    +"<span style='font-size:13.5px; opacity:.8'>"+t("g"+r.grade)+"</span></p>";
  h+="<div class='item'><span>"+t("rpIncome")+"</span><b>"+money(r.inc)+"</b></div>";
  h+="<div class='item'><span>"+t("rpExpense")+"</span><b>"+money(r.tot)+"</b></div>";
  h+="<div class='item'><span>"+t("rpNet")+"</span><b>"+money(r.net)+"</b></div>";
  h+="<div class='item'><span>"+t("rpRate")+"</span><b>"+r.rate+"%</b></div>";
  h+="<h4 style='margin:12px 0 6px'>"+t("rpCats")+"</h4>";
  ALLCATS.forEach(function(c){
    var v=r.exp[c]||0; if(v<=0) return;
    h+=barRow(t("cat"+c.charAt(0).toUpperCase()+c.slice(1)), v, Math.max(r.tot,1), "#118ab2", money(v)+" ("+Math.round(v/Math.max(r.tot,1)*100)+"%)");
  });
  h+="<h4 style='margin:12px 0 6px'>"+t("rpIncCats")+"</h4>";
  INCCATS.forEach(function(c){
    var v=(r.incCats||{})[c]||0; if(v<=0) return;
    h+=barRow(t("cat"+c.charAt(0).toUpperCase()+c.slice(1)), v, Math.max(r.inc,1), "#06d6a0", money(v)+" ("+Math.round(v/Math.max(r.inc,1)*100)+"%)");
  });
  var overs=[];
  BCATS.forEach(function(c){ var cap=r.budgets[c]||0; if(cap>0 && (r.exp[c]||0)>cap) overs.push(t("cat"+c.charAt(0).toUpperCase()+c.slice(1))+" "+money(r.exp[c])+" / "+money(cap)); });
  h+="<h4 style='margin:12px 0 6px'>"+t("rpOverT")+"</h4><p style='margin:0'>"+(overs.length? overs.join("<br>") : t("rpNone"))+"</p>";
  w.innerHTML=h;
}
