import{a as g,S as y,i as d}from"./assets/vendor-BH9GyP-n.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const b="48187645-2fe8d1ae3615e126e0d343d6c",x="https://pixabay.com/api/";function p(o,t){const s={params:{key:b,page:t,per_page:15,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}};return g.get(`${x}`,s)}function h(o){return o.map(({webformatURL:t,largeImageURL:s,tags:n,likes:e,views:i,comments:a,downloads:m})=>`<li class="gallery-item">
    <article class="card">
      <a class="gallery-link" href="${s}"
        ><img class="gallery-img" src="${t}" alt="${n}"
      /></a>
      <ul class="info-list">
        <li class="info-item">
          <h2 class="info-subtitle">Likes:</h2>
          <p class="info-text">${e}</p>
        </li>
        <li class="info-item">
          <h2 class="info-subtitle">Views:</h2>
          <p class="info-text">${i}</p>
        </li>
        <li class="info-item">
          <h2 class="info-subtitle">Comments:</h2>
          <p class="info-text">${a}</p>
        </li>
        <li class="info-item">
          <h2 class="info-subtitle">Downloads:</h2>
          <p class="info-text">${m}</p>
        </li>
      </ul>
    </article>
  </li>`).join("")}const L=document.querySelector(".form-search"),f=document.querySelector(".gallery"),u=document.querySelector(".loader"),l=document.querySelector(".button-load");let r=1,c="";u.style.display="none";l.classList.add("is-hidden");const w=new y(".gallery a",{captions:!0,captionsData:"alt",captionsPosition:"bottom",captionsDelay:250}),S=async o=>{try{if(o.preventDefault(),c=o.target.query.value.trim(),f.innerHTML="",!c){d.show({backgroundColor:"#ef4040",message:"Please fill in the field to search for data!",borderBottom:"2px solid #ffbebe",borderRadius:"4px",padding:"20px",width:"432px",height:"88px",color:"#fafafb",position:"topRight"});return}u.style.display="inline-block",r=1,l.classList.add("is-hidden");const{data:t}=await p(c,r);if(t.hits.length===0){d.show({backgroundColor:"#ef4040",borderBottom:"2px solid #ffbebe",borderRadius:"4px",padding:"20px",width:"432px",height:"88px",color:"#fafafb",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f.insertAdjacentHTML("beforeend",h(t.hits)),t.totalHits>r*15&&l.classList.remove("is-hidden"),w.refresh()}catch(t){console.error(t.message)}finally{u.style.display="none"}o.target.reset()};L.addEventListener("submit",S);const q=async()=>{try{r++;const{data:o}=await p(c,r);if(f.insertAdjacentHTML("beforeend",h(o.hits)),r*15>=o.totalHits||o.hits.length===0){d.info({title:"Info",position:"topRight",message:"There are no more images matching your request."}),l.classList.add("is-hidden");return}const t=document.querySelector(".gallery-item");if(t){const s=t.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}catch{d.error({title:"Error",position:"topRight",message:"The image you requested could not be loaded. Please try again later."})}};l.addEventListener("click",q);
//# sourceMappingURL=index.js.map
