import{a as h,S as m,i as c}from"./assets/vendor-Db2TdIkw.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const g="48187645-2fe8d1ae3615e126e0d343d6c",b="https://pixabay.com/api/";async function L(t,i){const o={params:{key:g,page:i,per_page:15,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0}};return await h.get(b,o)}function w(t){return t.map(({webformatURL:i,largeImageURL:o,tags:r,likes:e,views:s,comments:a,downloads:y})=>`<li class="gallery-item">
    <article class="card">
      <a class="gallery-link" href="${o}"
        ><img class="gallery-img" src="${i}" alt="${r}"
      /></a>
      <ul class="info-list">
        <li class="info-item">
          <h2 class="info-subtitle">Likes:</h2>
          <p class="info-text">${e}</p>
        </li>
        <li class="info-item">
          <h2 class="info-subtitle">Views:</h2>
          <p class="info-text">${s}</p>
        </li>
        <li class="info-item">
          <h2 class="info-subtitle">Comments:</h2>
          <p class="info-text">${a}</p>
        </li>
        <li class="info-item">
          <h2 class="info-subtitle">Downloads:</h2>
          <p class="info-text">${y}</p>
        </li>
      </ul>
    </article>
  </li>`).join("")}const S=document.querySelector(".form"),f=document.querySelector(".gallery"),d=document.querySelector(".button-load"),n=document.querySelector(".loader");let u="",l=1;const q=new m(".gallery a",{captionsData:"alt",captionDelay:250});S.addEventListener("submit",x);d.addEventListener("click",v);async function x(t){t.preventDefault(),n.style.display="block",f.innerHTML="",l=1,u=t.target.elements.query.value.trim(),await p()}async function v(){l+=1,n.style.display="block",await p()}async function p(){try{if(!u){c.warning({title:"Warning",message:"The search field is empty!",position:"topRight"}),n.style.display="none";return}const{data:t}=await L(u,l);if(t.hits.length===0){c.info({title:"Info",message:"No images match your search query. Please try again!",position:"topRight"}),n.style.display="none";return}if(f.insertAdjacentHTML("beforeend",w(t.hits)),q.refresh(),l>1){const i=document.querySelectorAll(".gallery-item"),o=i[i.length-1];if(o){const r=o.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}l*15>=t.totalHits?(c.info({title:"Info",message:"You've reached the end of search results.",position:"topRight"}),d.classList.add("is-hidden")):d.classList.remove("is-hidden")}catch(t){console.error("❌ Error fetching images:",t),c.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{n.style.display="none"}}
//# sourceMappingURL=index.js.map
