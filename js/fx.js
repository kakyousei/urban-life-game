"use strict";
/* Currency display: amounts are stored in USD. The display currency follows the
   language (zh -> CNY, ja -> JPY, en -> USD) and converts with live rates
   from open.er-api.com when reachable, otherwise cached or default rates. */
var FX={USD:1, CNY:7.2, JPY:155, live:false};
try{ var fc=JSON.parse(localStorage.getItem("urban-life-fx-v1")); if(fc && fc.CNY && fc.JPY){ FX.CNY=fc.CNY; FX.JPY=fc.JPY; } }catch(e){}
function curForLang(){ return LANG==="ja" ? {c:"JPY", s:"¥"} : (LANG==="zh" ? {c:"CNY", s:"¥"} : {c:"USD", s:"$"}); }
function money(v){
  var cf=curForLang(), r=FX[cf.c]||1, x=Math.round(v*r);
  return (x<0?"-":"")+cf.s+Math.abs(x).toLocaleString("en-US");
}
function fxText(){
  var cf=curForLang();
  if(cf.c==="USD") return "";
  var rate=(FX[cf.c]).toLocaleString("en-US",{maximumFractionDigits:2});
  var shown=cf.s+rate;
  return fmt(FX.live ? "fxLive" : "fxDef", shown, cf.c);
}
function fetchRates(){
  if(typeof fetch!=="function") return;
  fetch("https://open.er-api.com/v6/latest/USD").then(function(res){ return res.json(); }).then(function(j){
    if(j && j.rates && j.rates.CNY && j.rates.JPY){
      FX.CNY=j.rates.CNY; FX.JPY=j.rates.JPY; FX.live=true;
      try{ localStorage.setItem("urban-life-fx-v1", JSON.stringify({CNY:FX.CNY, JPY:FX.JPY})); }catch(e){}
      render();
    }
  }).catch(function(){});
}
