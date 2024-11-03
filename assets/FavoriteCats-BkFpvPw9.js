import{e as p,j as e}from"./index-DkW6z3w1.js";import{u as h,F as j,C as N}from"./useStore-Cdbu7CGz.js";const g=()=>{var n,l,i,d;const{favorites:a,removeFavorite:u}=h(),[x,r]=p.useState(!1),[s,o]=p.useState(null),b=t=>{o(t),r(!0)},v=()=>{o(null),r(!1)};return e.jsx("section",{className:"pb-[50px] md:pb-[100px]",children:e.jsxs("div",{className:"container mt-8",children:[e.jsx("div",{className:"custom-grid mt-4",children:a.length===0?e.jsx("p",{children:"No favorite cats added yet."}):a.map(t=>{var c,m;return e.jsxs("div",{className:"relative overflow-hidden rounded-md shadow-custom-card",children:[e.jsx("img",{src:t.url,alt:`Favorite Cat ${(c=t.breeds[0])==null?void 0:c.name}`,className:"h-full w-full cursor-pointer object-cover object-center transition-all duration-200 ease-in-out hover:scale-110",onClick:()=>b(t)}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-black/20 px-4 py-4 text-center backdrop-blur-sm",children:[e.jsx("p",{className:"text-white",children:((m=t.breeds[0])==null?void 0:m.name)||"Unknown Breed"}),e.jsx("button",{type:"button","aria-label":"Remove Favorite",onClick:()=>u(t),className:"group flex items-center justify-center text-xl",children:e.jsx(j,{className:`mr-1 transition-colors duration-300 ${a.some(f=>f.id===t.id)?"text-red-500":"text-white/70 group-hover:text-red-500"}`})})]})]},t.id)})}),s&&e.jsx(N,{isOpen:x,onClose:v,name:((n=s.breeds[0])==null?void 0:n.name)||"Unknown",temperament:((l=s.breeds[0])==null?void 0:l.temperament)||"Not Available",description:((i=s.breeds[0])==null?void 0:i.description)||"No description available.",lifeSpan:((d=s.breeds[0])==null?void 0:d.life_span)||"Unknown",imageUrl:s.url})]})})};export{g as default};