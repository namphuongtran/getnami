// Runs before first paint: applies the saved theme ("light", "dark" or "system") to <html>.
// Dark is the server-rendered default, so a visitor with no saved choice never sees a flash.
const script = `(function(){try{var s=localStorage.getItem("theme");var m=s==="light"||s==="dark"?s:s==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):"dark";var r=document.documentElement;r.classList.toggle("dark",m==="dark");r.dataset.theme=s||"dark"}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
