"use strict";

const CONFIG = {
  name: "Experiment 626",
  liveCheckout: false,
  checkoutUrl: "checkout.php",
  supportEmail: "support@experiment626.com"
};

/* ---------- Original generated artwork ---------- */

const PALETTES = {
  dusk:  ["#F2D5B8","#E58E6B","#B9506B","#5B3A6B","#FBE9C4"],
  tide:  ["#DCEBEA","#7FB7B0","#3E8A8F","#1D4F63","#F4F1E3"],
  citrus:["#F6E27A","#F29E38","#D9483B","#2E4A62","#FFF6D6"],
  night: ["#1B2238","#3B4F8C","#7D8FD1","#E8B04B","#F2EBD8"],
  moss:  ["#DDE5C8","#9DB569","#5F8553","#2E4F3F","#F6F0D2"],
  rose:  ["#F6D8DC","#EE9AA5","#C65A7C","#5E2F58","#FFF1E6"],
  slate: ["#D9DEE5","#9BA8BA","#5B6B83","#26303F","#F0B35A"]
};

function rng(seed){
  let a = seed >>> 0;
  return function(){
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ART = {
  hills(P, r){
    let s = `<rect width="300" height="400" fill="${P[0]}"/>`;
    s += `<circle cx="${100 + r()*100}" cy="${110 + r()*40}" r="${42 + r()*16}" fill="${P[4]}"/>`;
    for (let i = 0; i < 4; i++){
      const y0 = 190 + i*46, amp = 14 + r()*12, k = 40 + r()*40, ph = r()*6;
      let d = `M0 400 L0 ${y0}`;
      for (let x = 0; x <= 300; x += 10) d += ` L${x} ${(y0 + Math.sin(x/k + ph)*amp).toFixed(1)}`;
      d += " L300 400 Z";
      s += `<path d="${d}" fill="${P[1 + i % 3]}" opacity="${0.78 + i*0.07}"/>`;
    }
    return s;
  },
  waves(P, r){
    let s = `<rect width="300" height="400" fill="${P[0]}"/>`;
    for (let i = 0; i < 9; i++){
      const y0 = 40 + i*40, amp = 8 + r()*12, k = 30 + r()*30, ph = r()*6;
      let d = `M0 400 L0 ${y0}`;
      for (let x = 0; x <= 300; x += 6) d += ` L${x} ${(y0 + Math.sin(x/k + ph)*amp).toFixed(1)}`;
      d += " L300 400 Z";
      s += `<path d="${d}" fill="${P[1 + i % 4]}"/>`;
    }
    return s;
  },
  orbit(P, r){
    let s = `<rect width="300" height="400" fill="${P[0]}"/>`;
    for (let i = 0; i < 7; i++)
      s += `<circle cx="150" cy="200" r="${34 + i*24}" fill="none" stroke="${P[1 + i % 3]}" stroke-width="1.6"/>`;
    s += `<circle cx="150" cy="200" r="30" fill="${P[3]}"/>`;
    for (let i = 0; i < 6; i++){
      const rad = 34 + i*24 + 24, a = r()*Math.PI*2;
      s += `<circle cx="${(150 + Math.cos(a)*rad).toFixed(1)}" cy="${(200 + Math.sin(a)*rad).toFixed(1)}" r="${5 + r()*9}" fill="${P[(i % 2) ? 4 : 2]}"/>`;
    }
    return s;
  },
  blocks(P, r){
    let s = `<rect width="300" height="400" fill="${P[0]}"/>`;
    for (let row = 0; row < 4; row++) for (let col = 0; col < 3; col++){
      const x = col*100, y = row*100, c = P[1 + Math.floor(r()*4)], t = Math.floor(r()*5);
      if (t === 0) s += `<circle cx="${x+50}" cy="${y+50}" r="46" fill="${c}"/>`;
      else if (t === 1) s += `<path d="M${x} ${y+100} A100 100 0 0 1 ${x+100} ${y} L${x+100} ${y+100} Z" fill="${c}"/>`;
      else if (t === 2) s += `<rect x="${x}" y="${y}" width="100" height="50" fill="${c}"/>`;
      else if (t === 3) s += `<path d="M${x} ${y} A100 100 0 0 1 ${x+100} ${y+100} L${x} ${y+100} Z" fill="${c}"/>`;
    }
    return s;
  },
  contour(P, r){
    let s = `<rect width="300" height="400" fill="${P[0]}"/>`;
    const ph = r()*6, ph2 = r()*6;
    for (let i = 0; i < 14; i++){
      let d = "";
      for (let j = 0; j <= 72; j++){
        const a = j/72*Math.PI*2;
        const rad = (14 + i*13) * (1 + 0.12*Math.sin(3*a + i*0.45 + ph) + 0.06*Math.sin(5*a + ph2));
        d += (j ? " L" : "M") + (150 + Math.cos(a)*rad*1.05).toFixed(1) + " " + (205 + Math.sin(a)*rad*1.3).toFixed(1);
      }
      s += `<path d="${d} Z" fill="none" stroke="${P[1 + i % 3]}" stroke-width="1.8"/>`;
    }
    return s;
  },
  mono(P, r){
    let s = `<rect width="300" height="400" fill="${P[0]}"/>`;
    s += `<circle cx="${130 + r()*40}" cy="${120 + r()*20}" r="${56 + r()*10}" fill="${P[4]}"/>`;
    s += `<rect y="270" width="300" height="130" fill="${P[2]}"/>`;
    for (let i = 0; i < 5; i++) s += `<rect y="${284 + i*22}" width="300" height="2" fill="${P[1]}"/>`;
    const h = 150 + r()*40;
    s += `<rect x="126" y="${270 - h}" width="48" height="${h}" fill="${P[3]}"/>`;
    s += `<rect x="126" y="270" width="48" height="26" fill="${P[3]}" opacity=".35"/>`;
    return s;
  }
};

const DESIGNS = [
  { id:1,  name:"Dune Study",       kind:"hills",   pal:"dusk",   seed:3,  desc:"Four layers of low hills under a late sun, in warm sand and plum." },
  { id:2,  name:"Low Tide",         kind:"waves",   pal:"tide",   seed:11, desc:"Stacked bands of water in teal and deep blue, cut with pale foam." },
  { id:3,  name:"Fourth Orbit",     kind:"orbit",   pal:"night",  seed:7,  desc:"Seven rings around a dark core, with small planets caught mid-turn." },
  { id:4,  name:"Quarter Turn",     kind:"blocks",  pal:"citrus", seed:21, desc:"A twelve-cell grid of arcs, circles and half blocks in loud citrus." },
  { id:5,  name:"Ridge Lines",      kind:"contour", pal:"moss",   seed:5,  desc:"Topographic contours of an imaginary hill, drawn in three greens." },
  { id:6,  name:"Monolith at Noon", kind:"mono",    pal:"slate",  seed:9,  desc:"One tall slab on a striped plain beneath a pale amber sun." },
  { id:7,  name:"Evening Hills",    kind:"hills",   pal:"night",  seed:14, desc:"The same rolling ground after dark, lit by a gold moon." },
  { id:8,  name:"Salt Flats",       kind:"waves",   pal:"slate",  seed:2,  desc:"Grey-blue ripples across a dry lakebed, with one warm band." },
  { id:9,  name:"Rosette",          kind:"orbit",   pal:"rose",   seed:17, desc:"Concentric rings in pink and plum that read like a cut flower." },
  { id:10, name:"Block Party",      kind:"blocks",  pal:"tide",   seed:33, desc:"The grid again, cooled down to sea greens and navy." },
  { id:11, name:"Terraces",         kind:"contour", pal:"citrus", seed:8,  desc:"Contour lines in orange and red, like rice terraces from above." },
  { id:12, name:"Pale Moon",        kind:"mono",    pal:"rose",   seed:4,  desc:"A dusky pink sky, a tall dark slab and a quiet moon." }
];
const designById = id => DESIGNS.find(d => d.id === id);
const artInner = d => ART[d.kind](PALETTES[d.pal], rng(d.seed));
const nest = (d, x, y, w, h) =>
  `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">${artInner(d)}</svg>`;

/* ---------- Product types ---------- */

const TEE_COLORS = [
  { id:"white", label:"White", hex:"#F3F3F0" },
  { id:"black", label:"Black", hex:"#1F2227" },
  { id:"gray",  label:"Heather gray", hex:"#A3AAB3" }
];
const teeSizes = base => [
  { id:"s", label:"S", price:base }, { id:"m", label:"M", price:base }, { id:"l", label:"L", price:base },
  { id:"xl", label:"XL", price:base }, { id:"xxl", label:"2XL", price:base + 2 }
];

const TYPES = {
  short: {
    chip:"Short sleeve", noun:"Short Sleeve Tee", designs:[1,3,4,6,9,12],
    options:[
      { key:"size", label:"Size", def:"m", choices:teeSizes(26) },
      { key:"color", label:"Shirt color", def:"white", choices:TEE_COLORS }
    ],
    specs:[["Fabric","Soft cotton blend"],["Print","Full color, front chest"],["Ships","3 to 5 business days"]]
  },
  long: {
    chip:"Long sleeve", noun:"Long Sleeve Tee", designs:[2,5,7,8,10,11],
    options:[
      { key:"size", label:"Size", def:"m", choices:teeSizes(32) },
      { key:"color", label:"Shirt color", def:"white", choices:TEE_COLORS }
    ],
    specs:[["Fabric","Soft cotton blend"],["Print","Full color, front chest"],["Ships","3 to 5 business days"]]
  },
  mug: {
    chip:"Mugs", noun:"Mug", designs:[1,2,4,5,9,10],
    options:[
      { key:"size", label:"Size", def:"11", choices:[
        { id:"11", label:"11 oz", sub:"Classic", price:16 },
        { id:"15", label:"15 oz", sub:"Large", price:19 }
      ]}
    ],
    specs:[["Material","Ceramic, white"],["Print","Full color wrap"],["Care","Dishwasher safe"],["Ships","3 to 5 business days"]]
  },
  tumbler: {
    chip:"Tumblers", noun:"Tumbler", designs:[3,6,7,8,11,12],
    options:[
      { key:"size", label:"Size", def:"20", choices:[
        { id:"20", label:"20 oz", sub:"Fits most cup holders", price:28 },
        { id:"30", label:"30 oz", sub:"Extra large", price:34 }
      ]},
      { key:"color", label:"Body color", def:"steel", choices:[
        { id:"steel", label:"Steel", hex:"#C9CED4" },
        { id:"white", label:"White", hex:"#F3F3F0" },
        { id:"black", label:"Black", hex:"#1F2227" }
      ]}
    ],
    specs:[["Material","Insulated stainless steel"],["Lid","Included"],["Print","Full color wrap"],["Ships","3 to 5 business days"]]
  },
  poster: {
    chip:"Posters", noun:"Poster", designs:[1,2,3,4,5,6,7,8,9,10,11,12],
    options:[
      { key:"size", label:"Size", def:"m", choices:[
        { id:"s", label:"Small", sub:"8 x 11 in", price:19 },
        { id:"m", label:"Medium", sub:"12 x 17 in", price:29 },
        { id:"l", label:"Large", sub:"18 x 24 in", price:45 }
      ]}
    ],
    specs:[["Finish","Matte, rigid backing"],["Ships","3 to 5 business days"]]
  },
  metal: {
    chip:"Metal posters", noun:"Metal Poster", designs:[1,2,3,4,5,6,7,8,9,10,11,12],
    options:[
      { key:"size", label:"Size", def:"m", choices:[
        { id:"s", label:"Small", sub:"8 x 11 in", price:27 },
        { id:"m", label:"Medium", sub:"12 x 17 in", price:39 },
        { id:"l", label:"Large", sub:"18 x 24 in", price:59 }
      ]}
    ],
    specs:[["Material","Printed steel panel"],["Finish","Gloss"],["Hanging","Ready to hang"],["Ships","3 to 5 business days"]]
  },
  calendar: {
    chip:"Calendars", noun:"Calendar", designs:[1,5,7,11],
    options:[
      { key:"size", label:"Style", def:"wall", choices:[
        { id:"wall", label:"Wall", sub:"12 x 12 in", price:24 },
        { id:"desk", label:"Desk", sub:"6 x 6 in, easel stand", price:16 }
      ]}
    ],
    specs:[["Months","12, starting January 2027"],["Print","Full color artwork"],["Ships","3 to 5 business days"]]
  }
};

const PRODUCTS = [];
Object.keys(TYPES).forEach(t => TYPES[t].designs.forEach(did => {
  const d = designById(did);
  PRODUCTS.push({ pid:`${t}-${did}`, type:t, design:d, name:`${d.name} ${TYPES[t].noun}` });
}));
const APPAREL = ["short", "long"];
const productById = pid => PRODUCTS.find(p => p.pid === pid);
const sizeOpt = p => TYPES[p.type].options[0];
const colorOpt = p => TYPES[p.type].options.find(o => o.key === "color");
const fromPrice = p => Math.min(...sizeOpt(p).choices.map(c => c.price));
const colorHex = (p, id) => { const o = colorOpt(p); const c = o && o.choices.find(x => x.id === id); return c ? c.hex : "#F3F3F0"; };

/* ---------- Product mockups, built from the same artwork ---------- */

const MOCK_DEFS = `<defs>
<linearGradient id="bgv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFF1F4"/><stop offset="1" stop-color="#D6DBE1"/></linearGradient>
<linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".34"/><stop offset=".16" stop-color="#000" stop-opacity=".05"/><stop offset=".32" stop-color="#fff" stop-opacity=".38"/><stop offset=".48" stop-color="#fff" stop-opacity=".04"/><stop offset=".84" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient>
<linearGradient id="wrap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
<linearGradient id="tv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".06"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".05"/></linearGradient>
<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".28" stop-color="#fff" stop-opacity=".3"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity=".12"/><stop offset=".82" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="th" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".07"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".07"/></linearGradient>
<filter id="bl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="bl2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter>
</defs>`;

const SHIRT_SHORT = "M126 70 C108 74 88 82 72 92 L26 150 Q24 156 30 160 L62 184 Q68 187 73 181 L80 160 C78 220 78 270 76 314 Q150 326 224 314 C222 270 222 220 220 160 L227 181 Q232 187 238 184 L270 160 Q276 156 274 150 L228 92 C212 82 192 74 174 70 Q150 100 126 70 Z";
const SHIRT_LONG = "M126 70 C108 74 88 82 72 92 L42 220 L36 286 Q35 294 43 296 L68 302 Q75 303 77 296 L88 172 C80 230 78 280 76 314 Q150 326 224 314 C222 280 220 230 212 172 L223 296 Q225 303 232 302 L257 296 Q265 294 264 286 L258 220 L228 92 C212 82 192 74 174 70 Q150 100 126 70 Z";

function mockSvg(p, colorId){
  const d = p.design, hex = colorHex(p, colorId);
  let s = "";
  if (p.type === "poster"){
    s = artInner(d);
    return `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(p.name)}">${s}</svg>`;
  }
  s = MOCK_DEFS + `<rect width="300" height="400" fill="url(#bgv)"/>`;
  if (p.type === "short" || p.type === "long"){
    const shirt = p.type === "short" ? SHIRT_SHORT : SHIRT_LONG;
    s += `<path d="${shirt}" transform="translate(5 9)" fill="#000" opacity=".25" filter="url(#bl)"/>`;
    s += `<path d="${shirt}" fill="${hex}" stroke="#000" stroke-opacity=".2" stroke-width="1"/>`;
    s += nest(d, 112, 112, 76, 101);
    s += `<path d="${shirt}" fill="url(#tv)"/><path d="${shirt}" fill="url(#th)"/>`;
    s += `<g filter="url(#bl2)" fill="none" stroke-linecap="round"><path d="M90 236 Q150 250 210 234" stroke="#000" stroke-opacity=".025" stroke-width="9"/><path d="M90 182 Q108 208 102 236" stroke="#000" stroke-opacity=".02" stroke-width="8"/><path d="M210 182 Q192 208 198 236" stroke="#000" stroke-opacity=".02" stroke-width="8"/>`;
    if (p.type === "long") s += `<path d="M56 150 Q62 220 56 272" stroke="#000" stroke-opacity=".07" stroke-width="8"/><path d="M244 150 Q238 220 244 272" stroke="#000" stroke-opacity=".07" stroke-width="8"/>`;
    s += `</g>`;
    s += `<path d="M80 304 Q150 316 220 304" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="1" stroke-dasharray="3 2"/>`;
    if (p.type === "short") s += `<path d="M35 151 L67 174" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="1" stroke-dasharray="3 2"/><path d="M265 151 L233 174" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="1" stroke-dasharray="3 2"/>`;
    else s += `<path d="M40 284 L72 291" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="1" stroke-dasharray="3 2"/><path d="M260 284 L228 291" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="1" stroke-dasharray="3 2"/>`;
    s += `<path d="M126 70 Q150 62 174 70 Q150 100 126 70 Z" fill="#000" fill-opacity=".38"/>`;
    s += `<path d="M126 70 Q150 100 174 70" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="5" stroke-linecap="round"/>`;
    s += `<path d="M127 73 Q150 103 173 73" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.2"/>`;
  } else if (p.type === "mug"){
    const body = "M88 132 L88 290 Q88 306 150 308 Q212 306 212 290 L212 132 Z";
    s += `<ellipse cx="150" cy="322" rx="92" ry="12" fill="#000" opacity=".22" filter="url(#bl)"/>`;
    s += `<path d="M207 170 C268 160 272 270 205 272" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="19" stroke-linecap="round"/>`;
    s += `<path d="M207 170 C268 160 272 270 205 272" fill="none" stroke="#F3F3F0" stroke-width="14" stroke-linecap="round"/>`;
    s += `<path d="M209 172 C258 165 262 262 207 268" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.5"/>`;
    s += `<path d="M207 178 C252 172 256 260 207 264" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="2"/>`;
    s += `<path d="${body}" fill="#F3F3F0"/>`;
    s += nest(d, 106, 154, 88, 118);
    s += `<rect x="106" y="154" width="88" height="118" fill="url(#wrap)"/>`;
    s += `<path d="${body}" fill="url(#cyl)"/>`;
    s += `<ellipse cx="150" cy="132" rx="62" ry="10" fill="#F6F6F3" stroke="#000" stroke-opacity=".18"/>`;
    s += `<ellipse cx="150" cy="133" rx="55" ry="7.5" fill="#B9BEC5"/>`;
    s += `<ellipse cx="150" cy="135" rx="52" ry="5.5" fill="#8E949C" fill-opacity=".55"/>`;
    s += `<path d="M96 129 Q150 122 204 129" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/>`;
  } else if (p.type === "tumbler"){
    const body = "M100 112 L200 112 L186 322 Q185 336 172 338 L128 338 Q115 336 114 322 Z";
    s += `<ellipse cx="150" cy="345" rx="70" ry="10" fill="#000" opacity=".22" filter="url(#bl)"/>`;
    s += `<path d="${body}" fill="${hex}" stroke="#000" stroke-opacity=".2" stroke-width="1"/>`;
    s += nest(d, 113, 150, 74, 98);
    s += `<rect x="113" y="150" width="74" height="98" fill="url(#wrap)"/>`;
    s += `<path d="${body}" fill="url(#cyl)"/>`;
    s += `<path d="M114 322 Q115 336 128 338 L172 338 Q185 336 186 322 Z" fill="#000" fill-opacity=".15"/>`;
    s += `<path d="M96 98 Q96 90 104 90 L196 90 Q204 90 204 98 L204 114 L96 114 Z" fill="#2B2F36"/>`;
    s += `<path d="M96 98 Q96 90 104 90 L196 90 Q204 90 204 98 L204 114 L96 114 Z" fill="url(#cyl)"/>`;
    s += `<ellipse cx="150" cy="90" rx="52" ry="6" fill="#3A3F48"/>`;
    s += `<rect x="168" y="87" width="14" height="5" rx="2.5" fill="#15181C"/>`;
  } else if (p.type === "metal"){
    s += `<rect x="52" y="60" width="210" height="280" rx="3" fill="#000" opacity=".3" filter="url(#bl)"/>`;
    s += `<rect x="45" y="48" width="210" height="280" rx="3" fill="#B5BBC3"/>`;
    s += nest(d, 48, 51, 204, 274);
    s += `<rect x="48" y="51" width="204" height="274" fill="url(#sheen)"/>`;
    s += `<rect x="45.5" y="48.5" width="209" height="279" rx="3" fill="none" stroke="#fff" stroke-opacity=".65"/>`;
    s += `<rect x="45" y="326" width="210" height="2" fill="#000" fill-opacity=".25"/>`;
  } else if (p.type === "calendar"){
    s += `<rect x="60" y="68" width="190" height="290" fill="#000" opacity=".22" filter="url(#bl)"/>`;
    s += `<rect x="55" y="60" width="190" height="290" fill="#FBFBF9" stroke="#000" stroke-opacity=".2" stroke-width="1.5"/>`;
    s += nest(d, 55, 74, 190, 150);
    s += `<text x="150" y="246" font-size="11" text-anchor="middle" fill="#333" font-family="Arial, sans-serif" letter-spacing="1.5">JANUARY 2027</text>`;
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++)
      s += `<rect x="${67 + c*24.5}" y="${256 + r*17}" width="20" height="12" fill="#E4E7EB"/>`;
    for (let x = 70; x <= 230; x += 20) s += `<circle cx="${x}" cy="62" r="4" fill="#444"/>`;
  }
  return `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(p.name)}">${s}</svg>`;
}

/* ---------- Helpers ---------- */

function esc(s){
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
const money = n => "$" + n.toFixed(2);
const choiceOf = (opt, id) => opt.choices.find(c => c.id === id);

/* ---------- Cart ---------- */

let memCart = [];
function validItem(i){
  const p = i && productById(i.pid);
  if (!p || !(i.qty > 0)) return false;
  if (!choiceOf(sizeOpt(p), i.size)) return false;
  const co = colorOpt(p);
  return co ? !!choiceOf(co, i.color) : true;
}
function loadCart(){
  try {
    const raw = localStorage.getItem("e626-cart");
    if (raw){
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr.filter(validItem);
    }
  } catch (e) {}
  return memCart.slice();
}
let cart = loadCart();
function saveCart(){
  memCart = cart.slice();
  try { localStorage.setItem("e626-cart", JSON.stringify(cart)); } catch (e) {}
  document.getElementById("count").textContent = cart.reduce((n, i) => n + i.qty, 0);
}
const itemProduct = i => productById(i.pid);
const lineTotal = i => choiceOf(sizeOpt(itemProduct(i)), i.size).price * i.qty;
const cartTotal = () => cart.reduce((n, i) => n + lineTotal(i), 0);
function optText(i){
  const p = itemProduct(i), co = colorOpt(p);
  return choiceOf(sizeOpt(p), i.size).label + (co ? ", " + choiceOf(co, i.color).label : "");
}

let toastTimer;
function toast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 1800);
}

/* ---------- Views ---------- */

let filter = "all";
let lastOrder = null;
const app = document.getElementById("main");

function viewShop(){
  const chips = [["all", "All"], ["apparel", "Apparel"]].concat(
    Object.keys(TYPES).filter(k => !APPAREL.includes(k)).map(k => [k, TYPES[k].chip]));
  app.innerHTML = `
    <section class="hero">
      <div>
        <p class="mono">Printed to order</p>
        <h1 class="mt-10">Your favorite designs on shirts, mugs, posters and more.</h1>
        <p class="lead">Pick a design and a product. Check out with your name and email, and your receipt arrives in your inbox.</p>
        <div class="actions"><a class="btn" href="#catalog" id="browse">Browse the shop</a><a class="btn ghost" href="#help">How it works</a></div>
        <p class="mono types">Shirts / Mugs / Tumblers / Posters / Metal posters / Calendars</p>
      </div>
      <div class="feature" id="feature">
        <a class="card" id="flink" href="#shop">
          <div class="art" id="fart"></div>
          <div class="cap"><span class="name" id="fname"></span><span class="mono" id="fkind"></span></div>
        </a>
        <div class="dots" role="group" aria-label="Featured products">${FEATURED.map((f, i) => `<button class="dot" type="button" data-i="${i}" aria-label="Show featured product ${i + 1}"></button>`).join("")}</div>
      </div>
    </section>
    <section id="catalog" aria-labelledby="cat-h">
      <h2 id="cat-h">Shop</h2>
      <div class="filters" role="group" aria-label="Filter by product type">
        ${chips.map(c => `<button class="chip" type="button" data-t="${c[0]}" aria-pressed="${c[0] === filter}">${esc(c[1])}</button>`).join("")}
      </div>
      <div class="grid" id="grid"></div>
    </section>`;
  const grid = document.getElementById("grid");
  function fill(){
    const list = PRODUCTS.filter(p => filter === "all" || (filter === "apparel" ? APPAREL.includes(p.type) : p.type === filter));
    grid.innerHTML = list.map(p => {
      const co = colorOpt(p);
      return `<a class="card" href="#p-${p.pid}">
        <div class="art">${mockSvg(p, co ? co.def : null)}</div>
        <div class="meta"><span class="name">${esc(p.name)}</span><span class="mono">From $${fromPrice(p)}</span></div>
      </a>`;
    }).join("");
  }
  fill();
  app.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => {
    filter = b.dataset.t;
    app.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.t === filter)));
    fill();
  }));
  document.getElementById("browse").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("catalog").scrollIntoView({behavior:"smooth"});
  });
  startFeature();
}

const FEATURED = [["short-6","black"],["mug-1",null],["long-2","gray"],["tumbler-3","black"],["poster-7",null],["metal-9",null],["calendar-5",null]];

function startFeature(){
  const box = document.getElementById("feature"), art = document.getElementById("fart");
  const name = document.getElementById("fname"), kind = document.getElementById("fkind"), link = document.getElementById("flink");
  const dots = Array.from(box.querySelectorAll(".dot"));
  let idx = 0, timer = null;
  function paint(i){
    const f = FEATURED[i], p = productById(f[0]);
    art.innerHTML = mockSvg(p, f[1]);
    name.textContent = p.name; kind.textContent = TYPES[p.type].noun;
    link.href = "#p-" + p.pid;
    dots.forEach((d, j) => d.setAttribute("aria-current", String(j === i)));
    idx = i;
  }
  function show(i){
    art.classList.add("out");
    setTimeout(() => { paint(i); art.classList.remove("out"); }, 250);
  }
  function stop(){ clearInterval(timer); timer = null; }
  function start(){
    stop();
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => {
      if (!document.body.contains(art)){ stop(); return; }
      show((idx + 1) % FEATURED.length);
    }, 4000);
  }
  dots.forEach(d => d.addEventListener("click", () => { show(+d.dataset.i); start(); }));
  box.addEventListener("mouseenter", stop);
  box.addEventListener("mouseleave", start);
  box.addEventListener("focusin", stop);
  box.addEventListener("focusout", start);
  paint(0);
  start();
}

function optionHtml(opt, sel){
  const rows = opt.choices.some(c => c.sub);
  const items = opt.choices.map(c => {
    const checked = sel[opt.key] === c.id ? "checked" : "";
    if (rows) return `<label class="opt"><span><input type="radio" name="${opt.key}" value="${c.id}" ${checked}>${esc(c.label)} <small>${esc(c.sub)}</small></span><strong>$${c.price}</strong></label>`;
    return `<label class="pill"><input type="radio" name="${opt.key}" value="${c.id}" ${checked}>${c.hex ? `<span class="sw sw-${c.id}"></span>` : ""}${esc(c.label)}</label>`;
  }).join("");
  return `<fieldset><legend class="mono">${esc(opt.label)}</legend><div class="${rows ? "opts" : "pills"}">${items}</div></fieldset>`;
}

function viewProduct(pid){
  const p = productById(pid);
  if (!p){ location.hash = "#shop"; return; }
  const T = TYPES[p.type], sel = {};
  T.options.forEach(o => { sel[o.key] = o.def; });
  app.innerHTML = `
    <p class="crumbs mono"><a href="#shop">Shop</a> / ${APPAREL.includes(p.type) ? "Apparel" : esc(T.chip)} / ${esc(p.design.name)}</p>
    <div class="product">
      <div class="art" id="pimg"></div>
      <div>
        <p class="mono">${esc(T.noun)}</p>
        <h1 class="h-lg mt-8">${esc(p.name)}</h1>
        <p class="lead mt-12">${esc(p.design.desc)}</p>
        <div class="price" id="price"></div>
        ${T.options.map(o => optionHtml(o, sel)).join("")}
        <button class="btn" type="button" id="add">Add to cart</button>
        <dl class="spec">${T.specs.map(s => `<dt>${esc(s[0])}</dt><dd>${esc(s[1])}</dd>`).join("")}<dt>Artwork</dt><dd>Original design, free to print</dd></dl>
      </div>
    </div>`;
  const img = document.getElementById("pimg"), price = document.getElementById("price");
  const upd = () => {
    img.innerHTML = mockSvg(p, sel.color);
    price.textContent = money(choiceOf(sizeOpt(p), sel.size).price);
  };
  upd();
  app.querySelectorAll('input[type="radio"]').forEach(r => r.addEventListener("change", () => { sel[r.name] = r.value; upd(); }));
  document.getElementById("add").addEventListener("click", () => {
    const row = cart.find(i => i.pid === p.pid && i.size === sel.size && i.color === sel.color);
    if (row) row.qty = Math.min(20, row.qty + 1); else cart.push({pid:p.pid, size:sel.size, color:sel.color, qty:1});
    saveCart();
    toast(`${p.name} added to cart`);
  });
}

function summaryHtml(){
  return `
    <div class="sumrow"><span>Subtotal</span><span class="right">${money(cartTotal())}</span></div>
    <div class="sumrow"><span>Shipping</span><span class="right">Free</span></div>
    <div class="sumrow total"><span>Total</span><span class="right">${money(cartTotal())}</span></div>`;
}

function viewCart(){
  if (!cart.length){
    app.innerHTML = `<div class="empty"><h2>Your cart is empty</h2><p>Pick a product and it will show up here.</p><a class="btn" href="#shop">Browse the shop</a></div>`;
    return;
  }
  app.innerHTML = `
    <h1 class="h-sm mb-24">Your cart</h1>
    <div class="two">
      <div class="panel" id="lines"></div>
      <aside class="panel">
        <h3 class="mb-12">Order summary</h3>
        <div id="sum"></div>
        <a class="btn block mt-16" href="#checkout">Check out</a>
      </aside>
    </div>`;
  const lines = document.getElementById("lines");
  function draw(){
    if (!cart.length){ viewCart(); return; }
    lines.innerHTML = cart.map((i, idx) => {
      const p = itemProduct(i);
      return `<div class="line">
        <div class="art">${mockSvg(p, i.color)}</div>
        <div>
          <a href="#p-${p.pid}"><strong>${esc(p.name)}</strong></a>
          <div class="sub">${esc(optText(i))}</div>
          <div><span class="qty"><button type="button" data-d="-1" data-i="${idx}" aria-label="Decrease quantity">-</button><span>${i.qty}</span><button type="button" data-d="1" data-i="${idx}" aria-label="Increase quantity">+</button></span><button class="linkbtn" type="button" data-rm="${idx}">Remove</button></div>
        </div>
        <div class="right">${money(lineTotal(i))}</div>
      </div>`;
    }).join("");
    document.getElementById("sum").innerHTML = summaryHtml();
  }
  draw();
  lines.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.rm !== undefined) cart.splice(+b.dataset.rm, 1);
    else if (b.dataset.d){
      const it = cart[+b.dataset.i]; it.qty = Math.min(20, Math.max(0, it.qty + +b.dataset.d));
      if (it.qty === 0) cart.splice(+b.dataset.i, 1);
    }
    saveCart(); draw();
  });
}

function viewCheckout(){
  if (!cart.length){ location.hash = "#cart"; return; }
  app.innerHTML = `
    <h1 class="h-sm mb-24">Checkout</h1>
    <div class="two">
      <form class="panel" id="form" novalidate>
        <h3 class="mb-16">Your details</h3>
        <div class="field"><label for="co-name">Full name</label><input id="co-name" name="name" type="text" autocomplete="name" maxlength="80" required><div class="err" id="err-name"></div></div>
        <div class="field"><label for="co-email">Email</label><input id="co-email" name="email" type="email" autocomplete="email" maxlength="120" required><div class="err" id="err-email"></div></div>
        <p class="note mb-18">We use your name and email only to process this order, email your receipt, and answer customer service questions. No payment details are collected and nothing is charged. See our <a href="#privacy">privacy notice</a>.</p>
        <div class="err" id="err-form" role="alert"></div>
        <button class="btn" type="submit" id="place">Place order</button>
      </form>
      <aside class="panel">
        <h3 class="mb-12">Order summary</h3>
        ${cart.map(i => `<div class="sumrow"><span>${esc(itemProduct(i).name)} <span class="note">${esc(optText(i))} x ${i.qty}</span></span><span class="right">${money(lineTotal(i))}</span></div>`).join("")}
        <div class="spacer"></div>
        ${summaryHtml()}
      </aside>
    </div>`;
  const form = document.getElementById("form");
  const setErr = (id, msg) => {
    document.getElementById("err-" + id).textContent = msg;
    const inp = document.getElementById("co-" + id); if (inp) inp.setAttribute("aria-invalid", msg ? "true" : "false");
  };
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name = form.name.value.trim(), email = form.email.value.trim();
    let ok = true;
    setErr("name", ""); setErr("email", ""); document.getElementById("err-form").textContent = "";
    if (name.length < 2){ setErr("name", "Enter your full name."); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ setErr("email", "Enter an email address like name@example.com."); ok = false; }
    if (!ok) return;
    const btn = document.getElementById("place");
    btn.disabled = true; btn.textContent = "Placing order...";
    const items = cart.map(i => ({pid:i.pid, size:i.size, color:i.color || null, qty:i.qty}));
    let orderId;
    try {
      if (!CONFIG.liveCheckout){
        orderId = "E626-" + String(Math.floor(100000 + Math.random()*900000));
      } else {
        const res = await fetch(CONFIG.checkoutUrl, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name, email, items})});
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error("Order failed");
        orderId = data.orderId;
      }
    } catch (err) {
      document.getElementById("err-form").textContent = "We could not place your order. Please try again.";
      btn.disabled = false; btn.textContent = "Place order";
      return;
    }
    lastOrder = {id:orderId, name, email, items:cart.map(i => ({...i})), total:cartTotal()};
    cart = []; saveCart();
    location.hash = "#order";
  });
}

function viewOrder(){
  if (!lastOrder){ location.hash = "#shop"; return; }
  const o = lastOrder;
  app.innerHTML = `
    <div class="done">
      <span class="stamp">Order ${esc(o.id)}</span>
      <h1 class="h-md">Thanks, ${esc(o.name.split(" ")[0])}. Your order is in.</h1>
      <p class="lead mt-12">${CONFIG.liveCheckout
        ? "We sent your receipt to " + esc(o.email) + ". It includes a link to customer service if anything looks wrong."
        : "Your receipt will be emailed to " + esc(o.email) + " with a link to customer service."}</p>
      <div class="panel my-24">
        ${o.items.map(i => `<div class="sumrow"><span>${esc(itemProduct(i).name)} <span class="note">${esc(optText(i))} x ${i.qty}</span></span><span class="right">${money(lineTotal(i))}</span></div>`).join("")}
        <div class="sumrow total"><span>Total</span><span class="right">${money(o.total)}</span></div>
      </div>
      <div class="actions"><a class="btn" href="#shop">Keep shopping</a><a class="btn ghost" href="#help">Customer service</a></div>
    </div>`;
}

function viewHelp(){
  app.innerHTML = `
    <div class="narrow">
      <p class="mono">Customer service</p>
      <h1 class="h-lg mt-8">Questions about an order?</h1>
      <p class="lead mt-12">Email us with your order number or your issue and we will reply within one business day!</p>
      <div class="addr"><code id="addr">${esc(CONFIG.supportEmail)}</code><button class="btn ghost" type="button" id="copy">Copy address</button></div>
      <div class="faq">
        <details><summary>How does ordering work?</summary><p>Add products to your cart, then enter your name and email at checkout. We email a receipt. No card or bank details are asked for.</p></details>
        <details><summary>When will my order ship?</summary><p>Everything is made to order and ships in 3 to 5 business days.</p></details>
        <details><summary>What if something arrives damaged?</summary><p>Reply to your receipt email with a photo and we will send a replacement.</p></details>
        <details><summary>Where does the artwork come from?</summary><p>Every design is original or free to print, so there are no licensing restrictions on any piece.</p></details>
      </div>
    </div>`;
  document.getElementById("copy").addEventListener("click", () => {
    const addr = CONFIG.supportEmail;
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(addr).then(() => toast("Address copied"), selectAddr);
    } else selectAddr();
  });
  function selectAddr(){
    const r = document.createRange(); r.selectNodeContents(document.getElementById("addr"));
    const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Address selected");
  }
}

function viewBusiness(){
  app.innerHTML = `
    <div class="narrow legal-text">
      <p class="mono">For business</p>
      <h1 class="h-lg mt-8">Consultations and bulk orders</h1>
      <p class="lead mt-12">Ordering for a team, an event or a company? Email us to talk it through before you buy.</p>
      <div class="addr"><code id="baddr">${esc(CONFIG.supportEmail)}</code><button class="btn ghost" type="button" id="bcopy">Copy address</button></div>
      <h2 class="legal">What we can help with</h2>
      <ul><li>Bulk orders of shirts, mugs, tumblers, posters, metal posters and calendars for teams, events and promotions.</li><li>Consultations on products, sizes and which designs suit your project.</li><li>Quotes for larger quantities.</li></ul>
      <h2 class="legal">What to include in your email</h2>
      <ul><li>Your name and company.</li><li>Which products you want and roughly how many.</li><li>The date you need them by.</li></ul>
      <h2 class="legal">What happens next</h2>
      <p>We reply within one business day. The details you send are used only to answer your inquiry.</p>
    </div>`;
  document.getElementById("bcopy").addEventListener("click", () => {
    const addr = CONFIG.supportEmail;
    function selectAddr(){
      const r = document.createRange(); r.selectNodeContents(document.getElementById("baddr"));
      const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Address selected");
    }
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(addr).then(() => toast("Address copied"), selectAddr);
    } else selectAddr();
  });
}

function viewPrivacy(){
  app.innerHTML = `
    <div class="narrow legal-text">
      <p class="mono">Last updated November 2026</p>
      <h1 class="h-lg mt-8">Privacy notice</h1>
      <h2 class="legal">What we collect</h2>
      <ul><li>Your name and email address, which you enter at checkout.</li><li>The items in your order, your order number and the time of the order.</li></ul>
      <h2 class="legal">Why we collect it</h2>
      <p>To process your order, email your receipt, and answer customer service questions about it. We do not use it for anything else.</p>
      <h2 class="legal">Your device</h2>
      <p>Your cart is saved in your browser's local storage so it survives a page reload. It never leaves your device until you place an order. Clearing your site data removes it.</p>
      <h2 class="legal">Security</h2>
      <p>Orders are sent over an encrypted HTTPS connection. Order records are stored on a restricted database server and are accessible only to site administrators.</p>
      <h2 class="legal">Your choices</h2>
      <p>To see, correct or delete your information, email <strong>${esc(CONFIG.supportEmail)}</strong> with your order number.</p>
    </div>`;
}

function viewTerms(){
  app.innerHTML = `
    <div class="narrow legal-text">
      <p class="mono">Last updated November 2026</p>
      <h1 class="h-lg mt-8">Terms of use</h1>
      <h2 class="legal">About this store</h2>
      <p>Class project demo store. No payment is collected. ${esc(CONFIG.name)} is a fictional business created for a university class project, and no goods are shipped.</p>
      <h2 class="legal">Artwork</h2>
      <p>All designs on this site are original or free to print. Nothing here depends on third-party licensed characters, logos or brands.</p>
      <h2 class="legal">No affiliation</h2>
      <p>${esc(CONFIG.name)} is not affiliated with, sponsored by or endorsed by any other company, brand or franchise.</p>
      <h2 class="legal">Acceptable use</h2>
      <p>Do not attempt to disrupt the site or access data that is not yours, except where the class assessment rules for this project allow it.</p>
      <h2 class="legal">Contact</h2>
      <p>Questions about these terms can be sent to <strong>${esc(CONFIG.supportEmail)}</strong>.</p>
    </div>`;
}

let firstRoute = true;
function route(){
  const h = (location.hash || "#shop").slice(1);
  const m = /^p-([a-z]+-\d+)$/.exec(h);
  if (m) viewProduct(m[1]);
  else if (h === "cart") viewCart();
  else if (h === "checkout") viewCheckout();
  else if (h === "order") viewOrder();
  else if (h === "business") viewBusiness();
  else if (h === "help") viewHelp();
  else if (h === "privacy") viewPrivacy();
  else if (h === "terms") viewTerms();
  else if (h === "catalog"){ viewShop(); document.getElementById("catalog").scrollIntoView(); return; }
  else viewShop();
  window.scrollTo(0, 0);
  if (!firstRoute) app.focus({preventScroll:true});
  firstRoute = false;
}

(function init(){
  const parts = CONFIG.name.split(" "), last = parts.pop();
  document.getElementById("brand").innerHTML = esc(parts.join(" ")) + (parts.length ? " " : "") + "<span>" + esc(last) + "</span>";
  document.getElementById("foot-name").textContent = CONFIG.name;
  document.getElementById("skip").addEventListener("click", e => { e.preventDefault(); app.focus(); });
  saveCart();
  window.addEventListener("hashchange", route);
  route();
})();
