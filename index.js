import{a as p,i as n,S as f}from"./assets/vendor-CkdzJWux.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const h=a=>a.map(({webformatURL:r,largeImageURL:s,tags:o,likes:e,views:t,comments:i,downloads:m})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img class="gallery-image" src="${r}" alt="${o}" width="360" />
        </a>
        <div class="thumb-block">
          <div class="block"><h2 class="title">Likes</h2><p class="amount">${e}</p></div>
          <div class="block"><h2 class="title">Views</h2><p class="amount">${t}</p></div>
          <div class="block"><h2 class="title">Comments</h2><p class="amount">${i}</p></div>
          <div class="block"><h2 class="title">Downloads</h2><p class="amount">${m}</p></div>
        </div>
      </li>`).join(""),y="49342840-003e2c292237fbf09de0074d9",g="https://pixabay.com/api/";async function b(a){var r,s;try{return(await p.get(g,{params:{key:y,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(o){throw new Error(((s=(r=o.response)==null?void 0:r.data)==null?void 0:s.message)||"Failed to fetch images")}}const d=document.querySelector(".form"),u=document.querySelector(".gallery"),l=document.querySelector(".loader");l.style.display="none";d.addEventListener("submit",L);function v(){l.style.display="block"}function c(){l.style.display="none"}function L(a){a.preventDefault(),u.innerHTML="",v();const r=a.target.elements["search-text"].value.trim();if(!r){n.error({title:"Error",message:"Input cannot be empty!",color:"#ff0000"}),c();return}b(r).then(s=>{if(c(),!s.hits.length){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}u.innerHTML=h(s.hits),new f(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),d.reset()}).catch(s=>{c(),n.error({title:"Error",message:s.message})})}
//# sourceMappingURL=index.js.map
