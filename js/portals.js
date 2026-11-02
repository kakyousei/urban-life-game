/* ---------- modals ---------- */
function openModal(k){ $("modal-"+k).classList.add("show"); if(k==="custom") renderCustomList(); if(k==="budget" && typeof fillBudget==="function") fillBudget(); if(k==="report" && typeof renderReport==="function") renderReport(); }
function closeModal(k){ $("modal-"+k).classList.remove("show"); }
function submitMerchant(){
  var biz=$("mBiz").value.trim(); if(!biz){ $("mMsg").textContent=t("meNeedName"); return; }
  var place=$("mPlace").value;
  var cost=ADS_COST[place];
  if(!spendCash(cost)){ $("mMsg").textContent=fmt("meNoCoins", money(cost)); render(); return; }
  S.ads.push({biz:biz, cat:$("mCat").value, place:place, days:3});
  $("mMsg").textContent=fmt("meOk", biz);
  logT("lMerchant", biz); render();
}
function submitSinger(){
  var nm=$("sName").value.trim(), tt2=$("sTitle").value.trim();
  if(!nm || !tt2){ $("sMsg").textContent=t("siNeed"); return; }
  if(!spendCash(SINGER_COST)){ $("sMsg").textContent=fmt("siNoCoins", money(SINGER_COST)); render(); return; }
  S.songs.push({singer:nm, title:tt2, link:$("sLink").value.trim(), days:3});
  $("sMsg").textContent=fmt("siOk", tt2);
  logT("lSinger", nm, tt2); render();
}
