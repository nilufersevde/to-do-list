(()=>{"use strict";function e(e){const t=[];return{title:e,taskarray:t,addTask:function(e){t.push(e),e.id=t.indexOf(e)},deleteTask:function(e){const n=t.indexOf(e);t.splice(n,1)}}}function t(e){let t=document.querySelector("table");for(let n=t.rows.length;n<e.taskarray.length;n++){let i=t.insertRow(n);i.setAttribute("data-index",n),i.classList.add("row"),i.insertCell(0).innerHTML='\n        <label for="accept">\n            <input type="checkbox" id="check" name="check" value="yes"></input>\n        </label>';let a=i.insertCell(1);a.innerHTML=e.taskarray[n].title,a.classList.add("tb");let d=i.insertCell(2);d.innerHTML=e.taskarray[n].importance,d.classList.add("tb");let l=i.insertCell(3);l.innerHTML=e.taskarray[n].dueDate,l.classList.add("tb");let r=document.createElement("button");r.innerText="Details",r.classList.add("details"),i.insertCell().appendChild(r);let o=document.createElement("button");o.innerText="edit",o.classList.add("edit-button"),i.insertCell().appendChild(o);let s=document.createElement("button");s.innerText="X",s.classList.add("delete-button"),i.insertCell().appendChild(s)}}const n=document.querySelector(".project-list");function i(e){for(let t=document.querySelectorAll(".project-list div").length;t<e.length;t++){let i=document.createElement("div");i.innerText=e[t].title,i.classList.add("project_element"),i.setAttribute("data-index",t),n.appendChild(i);let a=document.createElement("button");a.innerText="X",a.classList.add("delete-button-project"),i.appendChild(a)}}function a(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function l(e){a(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===d(e)&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function r(e){a(1,arguments);var t=l(e);return t.setHours(0,0,0,0),t}function o(e){return a(1,arguments),function(e,t){a(2,arguments);var n=r(e),i=r(t);return n.getTime()===i.getTime()}(e,Date.now())}var s={};function c(){return s}function u(e,t){var n,i,d,r,o,s,u,p;a(1,arguments);var m=c(),y=function(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}(null!==(n=null!==(i=null!==(d=null!==(r=null==t?void 0:t.weekStartsOn)&&void 0!==r?r:null==t||null===(o=t.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==d?d:m.weekStartsOn)&&void 0!==i?i:null===(u=m.locale)||void 0===u||null===(p=u.options)||void 0===p?void 0:p.weekStartsOn)&&void 0!==n?n:0);if(!(y>=0&&y<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var v=l(e),f=v.getDay(),k=(f<y?7:0)+f-y;return v.setDate(v.getDate()-k),v.setHours(0,0,0,0),v}function p(e,t){return a(1,arguments),function(e,t,n){a(2,arguments);var i=u(e,n),d=u(t,n);return i.getTime()===d.getTime()}(e,Date.now(),t)}!function(){const n=document.querySelector(".create-project"),a=document.querySelector(".modal-project"),d=document.querySelector(".project-list"),r=document.querySelector(".close-modal-task"),s=document.querySelector(".close-modal-project"),c=document.querySelector(".main-place"),u=document.querySelector(".default"),m=document.querySelector(".form-project"),y=document.querySelector(".modal-task"),v=document.querySelector(".form-task"),f=document.querySelector("table");let k=document.createElement("div");const b=document.createElement("button");document.querySelector(".delete-button"),b.innerText="+",c.appendChild(k),c.appendChild(b),b.style.visibility="hidden",c.appendChild(f);let g=" ",T=!1;const L=document.querySelector(".add"),h=e("All tasks"),E=e("today"),S=e("This week"),w=e("important"),D=[];let H=h;function x(){a.style.display="none",m.reset()}function M(){y.style.display="none",v.reset()}i(D),t(H),k.innerHTML="All Tasks",b.style.visibility="visible",u.addEventListener("click",(function(e){e.target.classList.contains("default-project")&&(k.innerHTML=" ",k.innerHTML=e.target.innerText,f.innerHTML=" ",b.style.visibility="visible","allTasks"==e.target.id?t(h):"today"==e.target.id?(t(E),b.style.visibility="hidden"):"thisWeek"==e.target.id?(t(S),b.style.visibility="hidden"):(t(w),b.style.visibility="hidden"))})),n.addEventListener("click",(()=>{a.style.display="block"})),s.addEventListener("click",x),a.addEventListener("submit",(t=>{t.preventDefault();const n=e(document.getElementById("title").value);D.push(n),n.id=D.indexOf(n),i(D),x()})),d.addEventListener("click",(function(e){if(e.target.classList.contains("delete_button")){const n=e.target.parentNode.getAttribute("data-index"),i=D.find((e=>e.id==n)),a=D.indexOf(i);H==i&&(k.innerHTML=" ",f.innerHTML=" ",k.innerHTML="All Tasks",H=h,t(H)),D.splice(a,1),e.target.parentNode.remove()}else if(e.target.classList.contains("project_element")){const n=e.target.getAttribute("data-index");k.innerHTML=" ",f.innerHTML=" ",H=D.find((e=>e.id==n)),k.innerText=H.title,b.style.visibility="visible",t(H)}})),b.addEventListener("click",(()=>{y.style.display="block"})),r.addEventListener("click",M),L.addEventListener("click",(e=>{if(e.preventDefault(),0==T){let e=document.getElementById("name").value,n=document.getElementById("description").value,i=document.getElementById("due-date").value,a=document.querySelector('input[name="importance"]:checked').value;const d={title:e,description:n,dueDate:i,importance:a};H.addTask(d),H!==h&&h.addTask(d);let r=l(new Date(i));o(r)&&E.addTask(d),p(r)&&S.addTask(d),"High"==a&&w.addTask(d),M(),t(H)}}));let q=document.createElement("div");q.classList.add="pop-up",c.appendChild(q),q.style.display="none",document.addEventListener("click",(function(e){if(e.target.classList.contains("popup__close")&&(q.style.display="none"),e.target.classList.contains("details")){const t=e.target.parentNode.parentNode.getAttribute("data-index");g=H.taskarray.find((e=>e.id==t)),function(e){q.style.display="block",q.innerHTML=`\n         <div class="popup">\n            <div class="popup__close">X</div>\n            <div class="popup__content">\n            \t<div class="popup title">${e.title}</div>\n            \t<div class="popup priority"><span>Priority: </span>${e.importance}</div>\n            \t<div class="popup due"><span>Due Date: </span>${e.dueDate}</div>\n            \t<div class="popup details"><span>Description: </span>${e.description}</div>\n            </div>\n        </div>\n         `}(g)}})),f.addEventListener("click",(e=>{if(e.target.classList.contains("edit-button")){T=!0,y.style.display="block";const t=e.target.parentNode.parentNode.getAttribute("data-index");g=H.taskarray.find((e=>e.id==t)),document.getElementById("name").value=g.title,document.getElementById("description").value=g.description,document.getElementById("due-date").value=g.dueDate,"High"==g.importance?document.formTask.importance[0].checked=!0:"Medium"==g.importance?document.formTask.importance[1].checked=!0:document.formTask.importance[2].checked=!0;let n=g.importance,i=l(new Date(g.dueDate));function a(){g.title=document.getElementById("name").value,g.description=document.getElementById("description").value,g.dueDate=document.getElementById("due-date").value,g.importance=document.querySelector('input[name="importance"]:checked').value,f.rows[t].cells[1].innerHTML=g.title,f.rows[t].cells[2].innerHTML=g.importance,f.rows[t].cells[3].innerHTML=g.dueDate;let e=l(new Date(g.dueDate));o(i)&&0==o(e)&&E.deleteTask(g),p(i)&&0==p(e)&&S.deleteTask(g),0==o(i)&&o(e)&&E.addTask(g),0==p(i)&&p(e)&&S.addTask(g),"High"==n&"High"!=g.importance&&w.deleteTask(g),"High"!=n&"High"==g.importance&&w.addTask(g),T=!1,M(),0==T&&L.removeEventListener("click",biseyler)}L.addEventListener("click",a)}})),f.addEventListener("click",(e=>{if(e.target.classList.contains("delete-button")){const t=e.target.parentNode.parentNode.getAttribute("data-index");g=H.taskarray.find((e=>e.id==t)),H.deleteTask(g),h.deleteTask(g),E.deleteTask(g),S.deleteTask(g),w.deleteTask(g),e.target.parentNode.parentNode.remove()}}))}()})();