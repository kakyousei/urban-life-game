"use strict";
/* App bootstrap: wire up page-level listeners, load FX rates, first render. */
$("nameInput").addEventListener("change", function(){ var v=this.value.trim(); if(v){ S.name=v; render(); } });
$("btnReset").onclick=function(){
  if(confirm(t("confirmReset"))){
    S=fresh(); save();
    $("modal-start").classList.add("show"); render();
  }
};
if($("cType")){ $("cType").addEventListener("change", cuTypeChanged); }
if(!S.started){ $("modal-start").classList.add("show"); }
render();
fetchRates();
if(typeof cuTypeChanged==="function"){ try{ cuTypeChanged(); }catch(e){} }
