const t={bodyEl:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};let e=null;t.btnStart.addEventListener("click",(function(){t.btnStart.disabled=!0,e=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.bodyEl.style.background=e}),1e3)})),t.btnStop.addEventListener("click",(function(){clearInterval(e),t.btnStart.disabled=!1}));
//# sourceMappingURL=01-color-switcher.48d95cb7.js.map
