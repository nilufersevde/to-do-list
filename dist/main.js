(()=>{"use strict";let e=0,t=4;function a(a){let r=[];const s=localStorage.getItem("projectId");s?t=JSON.parse(s):localStorage.setItem("projectId",JSON.stringify(t));let n=null;n="All tasks"==a?0:"today"==a?1:"This week"==a?2:"important"==a?3:t,localStorage.setItem("projectId",JSON.stringify(t));const i=localStorage.getItem("taskId");return i&&(e=JSON.parse(i)),{id:n,title:a,taskarray:r,taskID:function(){e++,localStorage.setItem("taskId",JSON.stringify(e))},addTask:function(t,a){const s=localStorage.getItem(`taskarray_${t}`);s&&(r=JSON.parse(s));const n=[...r,a];console.log(a.id,"task.id1"),null==a.id&&(a.id=e),localStorage.setItem(`taskarray_${t}`,JSON.stringify(n))},deleteTask:function(e,t){const a=localStorage.getItem(`taskarray_${e}`);a&&(r=JSON.parse(a));const s=r.findIndex((e=>e.id===t.id));r.splice(s,1),localStorage.setItem(`taskarray_${e}`,JSON.stringify(r))},projectID:function(){t++,localStorage.setItem("projectId",JSON.stringify(t))}}}function r(e){let t=document.querySelector("table");const a=localStorage.getItem(`taskarray_${e.id}`);a&&(e.taskarray=JSON.parse(a));for(let a=t.rows.length;a<e.taskarray.length;a++){let r=t.insertRow(a);r.setAttribute("data-index",e.taskarray[a].id),r.classList.add("row"),r.insertCell(0).innerHTML='\n        <label for="accept">\n            <input type="checkbox" class="check" name="check"></input>\n        </label>';let s=r.insertCell(1);s.innerHTML=e.taskarray[a].title,s.classList.add("tb");let n=r.insertCell(2);n.innerHTML=e.taskarray[a].importance,n.classList.add("importance"),"High"==e.taskarray[a].importance?n.classList.add("task-high"):"Medium"==e.taskarray[a].importance?n.classList.add("task-medium"):"Low"==e.taskarray[a].importance&&n.classList.add("task-low");let i=r.insertCell(3);i.innerHTML=e.taskarray[a].dueDate,i.classList.add("cell");let o=document.createElement("img");o.classList.add("details"),o.src="images/file.png";let l=r.insertCell();l.appendChild(o),l.classList.add("cell");let c=document.createElement("img");c.classList.add("edit-button"),c.src="images/edit.png";let d=r.insertCell();d.appendChild(c),d.classList.add("cell");let u=document.createElement("img");u.src="images/bin.png",u.classList.add("delete-button");let y=r.insertCell();y.appendChild(u),y.classList.add("cell");const p=r.querySelector(".check");1==e.taskarray[a].completed&&(p.checked=!0,s.classList.add("crossed-out","slanted"),r.classList.add("opacity")),t.querySelectorAll(".check").forEach((e=>{e.addEventListener("change",(function(){let t=this.closest(".row").querySelector(".tb"),a=this.closest(".row");e.checked?(t.classList.add("crossed-out","slanted"),a.classList.add("opacity")):(t.classList.remove("crossed-out","slanted"),a.classList.remove("opacity"))}))}))}}const s=document.querySelector(".project-list");function n(e){for(let t=document.querySelectorAll(".project-list div").length;t<e.length;t++){let a=document.createElement("div");a.innerText=e[t].title,a.classList.add("project_element"),a.setAttribute("data-index",e[t].id),s.appendChild(a);let r=document.createElement("img");r.src="images/bin.png",r.classList.add("delete-button-project"),a.appendChild(r)}}function i(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function l(e){i(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===o(e)&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function c(e){i(1,arguments);var t=l(e);return t.setHours(0,0,0,0),t}function d(e){return i(1,arguments),function(e,t){i(2,arguments);var a=c(e),r=c(t);return a.getTime()===r.getTime()}(e,Date.now())}var u={};function y(){return u}function p(e,t){var a,r,s,n,o,c,d,u;i(1,arguments);var p=y(),m=function(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}(null!==(a=null!==(r=null!==(s=null!==(n=null==t?void 0:t.weekStartsOn)&&void 0!==n?n:null==t||null===(o=t.locale)||void 0===o||null===(c=o.options)||void 0===c?void 0:c.weekStartsOn)&&void 0!==s?s:p.weekStartsOn)&&void 0!==r?r:null===(d=p.locale)||void 0===d||null===(u=d.options)||void 0===u?void 0:u.weekStartsOn)&&void 0!==a?a:0);if(!(m>=0&&m<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var g=l(e),k=g.getDay(),S=(k<m?7:0)+k-m;return g.setDate(g.getDate()-S),g.setHours(0,0,0,0),g}function m(e,t){return i(1,arguments),function(e,t,a){i(2,arguments);var r=p(e,a),s=p(t,a);return r.getTime()===s.getTime()}(e,Date.now(),t)}const g=document.querySelector(".open_menu"),k=document.querySelector(".menu"),S=document.querySelector(".main-place");g.addEventListener("click",(()=>{k.classList.toggle("open"),S.classList.toggle("open")})),function(){const e=document.querySelector(".content"),t=document.querySelector(".create-project");t.classList.add("addPage");const s=document.querySelector(".modal-project"),i=document.querySelector(".project-list"),o=document.querySelector(".close-modal-task"),c=document.querySelector(".close-modal-project"),u=document.querySelector(".main-place"),y=document.querySelector(".default"),p=document.querySelector(".form-project"),g=document.querySelector(".modal-task"),k=document.querySelector(".form-task"),S=document.querySelector("table");let v=document.createElement("div"),f=document.createElement("div");f.classList.add("project-header-place");const L=document.createElement("button"),I=document.querySelector(".pop-up-place");L.innerText="+",L.classList.add("addPage"),L.classList.add("addTaskButton"),v.appendChild(f),v.appendChild(L),v.classList.add("header-and-button"),u.appendChild(v),L.style.visibility="hidden",u.appendChild(S);let b=" ",T=!1;const h=document.querySelector(".add"),N=document.querySelector("#allTasks"),O=document.querySelector(".today"),E=document.querySelector(".thisWeek"),j=document.querySelector(".important");N.classList.add("active");let J=!1;const q=a("All tasks"),_=a("today"),w=a("This week"),x=a("important");let D=[],H=q;const M=localStorage.getItem("projectArray");M&&(D=JSON.parse(M),D.forEach(((e,t)=>{const{id:r,title:s,taskarray:n}=e,i=a(s);i.id=r,i.taskarray=n,D[t]=i})));const A=Object.values(D);function C(){s.style.display="none",p.reset(),e.classList.remove("blur")}function $(){g.style.display="none",e.classList.remove("blur"),k.reset(),T=!1}localStorage.setItem("projectArray",JSON.stringify(A)),n(D),r(q),f.innerHTML="All Tasks",L.style.visibility="visible",y.addEventListener("click",(function(e){e.target.classList.contains("all")&&(f.innerHTML=" ",S.innerHTML=" ",L.style.visibility="visible",e.target==N||e.target.parentElement==N?(r(q),document.querySelector(".active")&&document.querySelector(".active").classList.remove("active"),N.classList.add("active"),f.innerHTML="All Tasks",H=q):e.target==O||e.target.parentElement==O?(r(_),L.style.visibility="hidden",document.querySelector(".active")&&document.querySelector(".active").classList.remove("active"),O.classList.add("active"),f.innerHTML="Today",H=_):e.target==E||e.target.parentElement==E?(r(w),L.style.visibility="hidden",document.querySelector(".active")&&document.querySelector(".active").classList.remove("active"),E.classList.add("active"),f.innerHTML="This week",H=w):e.target!=j&&e.target.parentElement!=j||(r(x),L.style.visibility="hidden",document.querySelector(".active")&&document.querySelector(".active").classList.remove("active"),j.classList.add("active"),f.innerHTML="Important",H=x))})),document.addEventListener("click",(function(e){if(e.target.classList.contains("check")){let t=e.target.parentNode.parentNode.parentNode.getAttribute("data-index"),a=H.taskarray.find((e=>e.id==t));e.target.checked?a.completed=!0:a.completed=!1;const r=localStorage.getItem("taskarray_0");r&&(q.taskarray=JSON.parse(r));const s=q.taskarray.findIndex((e=>e.id==a.id));q.taskarray.splice(s,1,a),console.log("allTasksIndex",s);const n=localStorage.getItem("taskarray_1");n&&(_.taskarray=JSON.parse(n));const i=_.taskarray.findIndex((e=>e.id==a.id));-1!==i&&_.taskarray.splice(i,1,a),console.log("todayIndex",i);const o=localStorage.getItem("taskarray_2");o&&(w.taskarray=JSON.parse(o));const l=w.taskarray.findIndex((e=>e.id==a.id));-1!==l&&w.taskarray.splice(l,1,a),console.log("thisWeekIndex",l);const c=localStorage.getItem("taskarray_3");c&&(x.taskarray=JSON.parse(c));const d=x.taskarray.findIndex((e=>e.id==a.id));if(-1!==d&&x.taskarray.splice(d,1,a),console.log("importantIndex",d),"All tasks"!==a.project){const e=D.find((e=>e.title==a.project));console.log(e);const t=localStorage.getItem(`taskarray_${e.id}`);t&&(e.taskarray=JSON.parse(t));const r=e.taskarray.findIndex((e=>e.id==a.id));e.taskarray[r]=a,console.log("targetedproject.taskarray[originalProjectIndex].id",e.taskarray[r].id),console.log("originalProjectIndex",r),console.log("targetedproject.taskarray",e.taskarray),console.log("currentTask.id4",a.id),localStorage.setItem(`taskarray_${e.id}`,JSON.stringify(e.taskarray))}localStorage.setItem("taskarray_0",JSON.stringify(q.taskarray)),localStorage.setItem("taskarray_1",JSON.stringify(_.taskarray)),localStorage.setItem("taskarray_2",JSON.stringify(w.taskarray)),localStorage.setItem("taskarray_3",JSON.stringify(x.taskarray))}})),t.addEventListener("click",(()=>{s.style.display="block",e.classList.add("blur")})),c.addEventListener("click",C),s.addEventListener("submit",(e=>{e.preventDefault();const t=a(document.getElementById("title").value);D.push(t),localStorage.setItem("projectArray",JSON.stringify(D)),n(D),t.projectID(),C()})),i.addEventListener("click",(function(e){if(e.target.classList.contains("delete-button-project")){const t=e.target.parentNode.getAttribute("data-index"),a=D.find((e=>e.id==t)),s=D.indexOf(a);for(let e=0;e<a.taskarray.length;e++){const r=localStorage.getItem(`taskarray_${t}`);r&&(a.taskarray=JSON.parse(r));let s=a.taskarray[e];q.deleteTask(0,s),_.deleteTask(1,s),w.deleteTask(2,s),x.deleteTask(3,s),localStorage.setItem("taskarray_0",JSON.stringify(q.taskarray)),localStorage.setItem("taskarray_1",JSON.stringify(_.taskarray)),localStorage.setItem("taskarray_2",JSON.stringify(w.taskarray)),localStorage.setItem("taskarray_3",JSON.stringify(x.taskarray))}H==a&&(f.innerHTML=" ",S.innerHTML=" ",f.innerHTML="All Tasks",H=q,N.classList.add("active"),r(H)),D.splice(s,1),e.target.parentNode.remove(),localStorage.setItem("projectArray",JSON.stringify(D))}else if(e.target.classList.contains("project_element")){const t=e.target.getAttribute("data-index");f.innerHTML=" ",S.innerHTML=" ",document.querySelector(".active").classList.remove("active"),e.target.classList.add("active"),H=D.find((e=>e.id==t)),f.innerText=H.title,L.style.visibility="visible",r(H)}})),L.addEventListener("click",(()=>{g.style.display="block",e.classList.add("blur")})),o.addEventListener("click",$),h.addEventListener("click",(e=>{if(e.preventDefault(),0==T){1==J&&h.removeEventListener("click",P);let e=document.getElementById("name").value,t=document.getElementById("description").value,a=document.getElementById("due-date").value,s=document.querySelector('input[name="importance"]:checked').value;const n={title:e,description:t,dueDate:a,importance:s,project:H.title,completed:undefined};H.addTask(H.id,n),H!==q&&q.addTask(q.id,n);let i=l(new Date(a));d(i)&&_.addTask(1,n),m(i)&&w.addTask(2,n),"High"==s&&x.addTask(3,n),H.taskID(),$(),r(H)}}));let B=document.createElement("div");function P(){console.log(b.id,"currentTask.id2");let t=b.importance,a=l(new Date(b.dueDate));b.title=document.getElementById("name").value,b.description=document.getElementById("description").value,b.dueDate=document.getElementById("due-date").value,b.importance=document.querySelector('input[name="importance"]:checked').value;const r=H.taskarray.findIndex((e=>e.id==R));S.rows[r].cells[1].innerHTML=b.title,S.rows[r].cells[2].innerHTML=b.importance,S.rows[r].cells[3].innerHTML=b.dueDate;let s=l(new Date(b.dueDate));d(a)&&0==d(s)&&_.deleteTask(1,b),0==d(a)&&d(s)&&_.addTask(1,b),m(a)&&0==m(s)&&w.deleteTask(2,b),0==m(a)&&m(s)&&w.addTask(2,b),"High"==t&"High"!=b.importance&&x.deleteTask(3,b),"High"!=t&"High"==b.importance&&x.addTask(3,b),console.log(b.id,"currentTask.id3");const n=S.rows[r].cells[2],i=n.classList;if(i.length>0){const e=i[i.length-1];n.classList.remove(e)}"High"==b.importance?n.classList.add("task-high"):"Medium"==b.importance?n.classList.add("task-medium"):"Low"==b.importance&&n.classList.add("task-low");const o=localStorage.getItem("taskarray_0");o&&(q.taskarray=JSON.parse(o));const c=q.taskarray.findIndex((e=>e.id==b.id));q.taskarray.splice(c,1,b),console.log("allTasksIndex",c);const u=localStorage.getItem("taskarray_1");u&&(_.taskarray=JSON.parse(u));const y=_.taskarray.findIndex((e=>e.id==b.id));-1!==y&&_.taskarray.splice(y,1,b),console.log("todayIndex",y);const p=localStorage.getItem("taskarray_2");p&&(w.taskarray=JSON.parse(p));const g=w.taskarray.findIndex((e=>e.id==b.id));-1!==g&&w.taskarray.splice(g,1,b),console.log("thisWeekIndex",g);const k=localStorage.getItem("taskarray_3");k&&(x.taskarray=JSON.parse(k));const v=x.taskarray.findIndex((e=>e.id==b.id));if(-1!==v&&x.taskarray.splice(v,1,b),console.log("importantIndex",v),"All tasks"!==b.project){const e=D.find((e=>e.title==b.project)),t=localStorage.getItem(`taskarray_${e.id}`);t&&(e.taskarray=JSON.parse(t));const a=e.taskarray.findIndex((e=>e.id==b.id));e.taskarray[a]=b,console.log("targetedproject.taskarray[originalProjectIndex].id",e.taskarray[a].id),console.log("originalProjectIndex",a),console.log("targetedproject.taskarray",e.taskarray),console.log("currentTask.id4",b.id),localStorage.setItem(`taskarray_${e.id}`,JSON.stringify(e.taskarray))}localStorage.setItem("taskarray_0",JSON.stringify(q.taskarray)),localStorage.setItem("taskarray_1",JSON.stringify(_.taskarray)),localStorage.setItem("taskarray_2",JSON.stringify(w.taskarray)),localStorage.setItem("taskarray_3",JSON.stringify(x.taskarray)),b.id=R,h.removeEventListener("click",W),e.classList.remove("blur"),T=!1,$()}B.classList.add="pop-up",I.appendChild(B),B.style.display="none",document.addEventListener("click",(function(t){if(t.target.classList.contains("popup__close")&&(B.style.display="none",e.classList.remove("blur")),t.target.classList.contains("details")){const a=t.target.parentNode.parentNode.getAttribute("data-index");b=H.taskarray.find((e=>e.id==a)),function(t){B.style.display="block",e.classList.add("blur"),B.innerHTML=`\n         <div class="pop-up-div">\n            <div class="popup__close">X</div>\n            <div class="popup__content">\n            \t<div class="popup title">${t.title}</div>\n                <div class="popup details"><span>Project: </span>${t.project}</div>\n            \t<div class="popup priority"><span>Priority: </span>${t.importance}</div>\n            \t<div class="popup due"><span>Due Date: </span>${t.dueDate}</div>\n            \t<div class="popup details"><span>Description: </span>${t.description}</div>\n            </div>\n        </div>\n         `}(b)}}));let W=null,R=" ";S.addEventListener("click",(t=>{t.target.classList.contains("edit-button")&&(e.classList.add("blur"),T=!0,g.style.display="block",R=t.target.parentNode.parentNode.getAttribute("data-index"),b=H.taskarray.find((e=>e.id==R)),console.log(b.id,"currentTask.id1"),document.getElementById("name").value=b.title,document.getElementById("description").value=b.description,document.getElementById("due-date").value=b.dueDate,"High"==b.importance?document.formTask.importance[0].checked=!0:"Medium"==b.importance?document.formTask.importance[1].checked=!0:document.formTask.importance[2].checked=!0,W&&h.removeEventListener("click",W),W=()=>{P()},h.addEventListener("click",W),J=!0)})),S.addEventListener("click",(e=>{if(e.target.classList.contains("delete-button")){const t=e.target.parentNode.parentNode.getAttribute("data-index");if(b=H.taskarray.find((e=>e.id==t)),H.deleteTask(H.id,b),H!=q&&q.deleteTask(0,b),H!=_&&_.deleteTask(1,b),H!=w&&w.deleteTask(2,b),H!=x){const e=D.find((e=>e.title==b.project));-1!==e.taskarray.findIndex((e=>e.id==b.id))&&e.deleteTask(e.id,b),x.deleteTask(3,b)}e.target.parentNode.parentNode.remove(),b=null}}))}()})();