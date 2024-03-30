import{a as v,S,i}from"./assets/vendor-03da8548.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();async function h(t,e,o){try{const n="https://pixabay.com/api/",r="43043595-2b9ab8fff7b2b720f98fadc4f";return(await v.get(n,{params:{key:r,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:o}})).data}catch(n){throw console.error("Error fetching images:",n),n}}const a=document.querySelector(".gallery"),E=new S(".gallery a",{captionsData:"alt",captionDelay:250});E.refresh();function L(t){t.forEach(e=>{const o=`
      <li class="gallery-item">
        <a href="${e.largeImageURL}" class="gallery-link">
          <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-img">
          <ul class="gallery-descript">
    <li class="gallery-descript__item"><p><span class="gallery-descript__span">Likes</span>${e.likes}</p></li>
  <li class="gallery-descript__item"><p><span class="gallery-descript__span">Views</span>${e.views}</p></li>
  <li class="gallery-descript__item"><p><span class="gallery-descript__span">Comments</span>${e.comments}</p></li>
  <li class="gallery-descript__item"><p><span class="gallery-descript__span">Downloads</span>${e.downloads}</p></li>
        </ul>
        </a>
      </li>
    `;a.insertAdjacentHTML("beforeend",o)}),E.refresh()}function b(){const t=document.createElement("p");t.classList.add("end-message"),t.textContent="We're sorry, but you've reached the end of search results.",a.insertAdjacentElement("afterend",t)}const T=document.querySelector(".search-form"),g=document.querySelector(".search-input"),w=document.querySelector(".loader"),p=document.querySelector(".load-more-btn"),m=document.querySelector(".scroll-to-top");function _(){w.classList.remove(".is-hidden")}function y(){w.classList.add(".is-hidden")}y();let c="",l=1;const f=15;T.addEventListener("submit",M);async function M(t){if(t.preventDefault(),c=g.value.trim(),l=1,a.innerHTML="",c===""){i.error({title:"Error",message:"Please complete the field.",position:"topCenter"}),d();return}C(),_();try{const e=await h(c,l,f),o=e.totalHits;if(e.hits.length===0){a.innerHTML="",i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),d();return}else L(e.hits),g.value="",q();f*l>=o&&(d(),b())}catch(e){console.error("Error fetching images:",e),i.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topCenter"})}finally{y()}}p.addEventListener("click",async()=>{try{p&&(l+=1);const t=await h(c,l,f),e=t.totalHits;L(t.hits),_(),f*l>=e&&(d(),b());const o=a.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:o*3,behavior:"smooth"})}catch(t){console.error("Error fetching more images:",t),i.error({title:"Error",message:`Error fetching more images: ${t}`})}finally{y()}});function q(){p.style.display="block"}function d(){p.style.display="none"}function C(){const t=document.querySelector(".end-message");t&&t.remove()}window.addEventListener("scroll",()=>{document.body.scrollTop>30||document.documentElement.scrollTop>30?m.style.display="flex":m.style.display="none"});function H(){window.scrollTo({top:0,behavior:"smooth"})}m.addEventListener("click",H);
//# sourceMappingURL=commonHelpers.js.map
