var F=Object.defineProperty;var M=(o,t,e)=>t in o?F(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var p=(o,t,e)=>(M(o,typeof t!="symbol"?t+"":t,e),e),$=(o,t,e)=>{if(!t.has(o))throw TypeError("Cannot "+e)};var r=(o,t,e)=>($(o,t,"read from private field"),e?e.call(o):t.get(o)),h=(o,t,e)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,e)},f=(o,t,e,n)=>($(o,t,"write to private field"),n?n.call(o,e):t.set(o,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class E{constructor(t,e,n){p(this,"date",new Date);p(this,"id",(Date.now()+"").slice(-10));p(this,"clicks",0);this.coords=t,this.distance=e,this.duration=n}_setDescription(){const t=["January","February","March","April","May","June","July","August","September","October","November","December"];this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on ${t[this.date.getMonth()]} ${this.date.getDate()}`}click(){this.clicks++}}class O extends E{constructor(e,n,s,i){super(e,n,s);p(this,"type","running");this.cadence=i,this.calcPace(),this._setDescription()}calcPace(){return this.pace=this.duration/this.distance,this.pace}}class D extends E{constructor(e,n,s,i){super(e,n,s);p(this,"type","cycling");this.elevationGain=i,this.calcSpeed(),this._setDescription()}calcSpeed(){return this.speed=this.distance/(this.duration/60),this.speed}}const d=document.querySelector(".form"),q=document.querySelector(".workouts"),P=document.querySelector(".form__input--type"),y=document.querySelector(".form__input--distance"),W=document.querySelector(".form__input--duration"),w=document.querySelector(".form__input--cadence"),k=document.querySelector(".form__input--elevation");var l,m,g,u;class C{constructor(){h(this,l,void 0);h(this,m,13);h(this,g,void 0);h(this,u,[]);this._getPosition(),this._getLocalStorage(),d.addEventListener("submit",this._newWorkout.bind(this)),P.addEventListener("change",this._toggleElevationField),q.addEventListener("click",this._moveToPopup.bind(this))}_getPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){alert("Could not get your position")})}_loadMap(t){const{latitude:e}=t.coords,{longitude:n}=t.coords;console.log(`https://www.google.pt/maps/@${e},${n}`);const s=[e,n];f(this,l,L.map("map").setView(s,r(this,m))),L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(r(this,l)),r(this,l).on("click",this._showForm.bind(this)),r(this,u).forEach(i=>{this._renderWorkoutMarker(i)})}_showForm(t){f(this,g,t),d.classList.remove("hidden"),y.focus()}_hideForm(){y.value=W.value=w.value=k.value="",d.style.display="none",d.classList.add("hidden"),setTimeout(()=>d.style.display="grid",1e3)}_toggleElevationField(){k.closest(".form__row").classList.toggle("form__row--hidden"),w.closest(".form__row").classList.toggle("form__row--hidden")}_newWorkout(t){const e=(...c)=>c.every(v=>Number.isFinite(v)),n=(...c)=>c.every(v=>v>0);t.preventDefault();const s=P.value,i=+y.value,a=+W.value,{lat:b,lng:S}=r(this,g).latlng;let _;if(s==="running"){const c=+w.value;if(!e(i,a,c)||!n(i,a,c))return alert("Inputs have to be positive numbers!");_=new O([b,S],i,a,c)}if(s==="cycling"){const c=+k.value;if(!e(i,a,c)||!n(i,a))return alert("Inputs have to be positive numbers!");_=new D([b,S],i,a,c)}r(this,u).push(_),this._renderWorkoutMarker(_),this._renderWorkout(_),this._hideForm(),this._setLocalStorage()}_renderWorkoutMarker(t){L.marker(t.coords).addTo(r(this,l)).bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:!1,closeOnClick:!1,className:`${t.type}-popup`})).setPopupContent(`${t.type==="running"?"🏃‍♂️":"🚴‍♀️"} ${t.description}`).openPopup()}_renderWorkout(t){let e=`
      <li class="workout workout--${t.type}" data-id="${t.id}">
        <h2 class="workout__title">${t.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${t.type==="running"?"🏃‍♂️":"🚴‍♀️"}</span>
          <span class="workout__value">${t.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${t.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;t.type==="running"&&(e+=`
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${t.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${t.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `),t.type==="cycling"&&(e+=`
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${t.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${t.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `),d.insertAdjacentHTML("afterend",e)}_moveToPopup(t){if(!r(this,l))return;const e=t.target.closest(".workout");if(!e)return;const n=r(this,u).find(s=>s.id===e.dataset.id);r(this,l).setView(n.coords,r(this,m),{animate:!0,pan:{duration:1}})}_setLocalStorage(){localStorage.setItem("workouts",JSON.stringify(r(this,u)))}_getLocalStorage(){const t=JSON.parse(localStorage.getItem("workouts"));t&&(f(this,u,t),r(this,u).forEach(e=>{this._renderWorkout(e)}))}reset(){localStorage.removeItem("workouts"),location.reload()}}l=new WeakMap,m=new WeakMap,g=new WeakMap,u=new WeakMap;new C;
