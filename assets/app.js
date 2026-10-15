(()=>{'use strict';const db=window.CHRONOS_DATA,items=db.events.map(e=>({...e,stamp:Date.parse(e.date+'T00:00:00Z')})),defs=Object.fromEntries(db.defs.map(d=>[d[0],d[1]]));const start=Date.UTC(1938,0,1),end=Date.UTC(1946,11,31),week=604800000,count=Math.ceil((end-start+1)/week),els={slider:document.querySelector('#slider'),label:document.querySelector('#weekLabel'),results:document.querySelector('#results'),title:document.querySelector('#resultsTitle'),count:document.querySelector('#count'),search:document.querySelector('#search'),years:document.querySelector('#years')};let index=0;els.slider.max=count-1;const fmt=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const date=ms=>fmt.format(new Date(ms));function enabled(){return new Set([...document.querySelectorAll('[name=front]:checked')].map(x=>x.value))}// UI-015: display the already bundled article body in each result card without an extra click.
// MAP-001: Conservative geographical region hints; no fabricated point coordinates.
const MAP_REGIONS={"europe":"Europe","east-europe":"Eastern Europe","britain":"British Isles","north-africa":"North Africa","atlantic":"Atlantic","pacific":"Pacific Ocean","asia":"Asia","hawaii":"Hawaiian Islands","mediterranean":"Mediterranean","americas":"North and South America"};
function eventMapRegion(e){
 const t=(e.title||'').toLowerCase();
 if(/pearl.harbor|hawai/.test(t))return 'hawaii';
 if(/britain|london|english|dunkirk/.test(t))return 'britain';
 if(/el.alamein|egypt|libya|tunis|alger|morocc|africa/.test(t))return 'north-africa';
 if(/atlantic|convoy|submarine|u-boat/.test(t))return 'atlantic';
 if(/midway|guadalcanal|okinawa|pacific/.test(t))return 'pacific';
 if(/italy|sicil|greece|malta|mediterranean/.test(t))return 'mediterranean';
 if(/moscow|leningrad|stalingrad|kyiv|kharkiv|poland|lithuan|latvi|eston|finland|belarus|ukrain/.test(t))return 'east-europe';
 if(/france|french|belg|german|austria|czechoslov|netherland|normand/.test(t))return 'europe';
 if(/japan|china|manila|burma|myanmar|korea|singapore/.test(t))return 'asia';
 if(e.front==='west')return 'europe';
 if(e.front==='east')return 'east-europe';
 if(e.front==='med')return 'north-africa';
 if(e.front==='atl')return 'atlantic';
 if(e.front==='pac')return 'pacific';
 return null;
}
const EVENT_LOCAL_MAP={"1938-03-12-000":"local-062.webp","1938-07-29-091":"local-000.webp","1938-09-29-001":"local-063.webp","1939-03-15-003":"local-064.webp","1939-03-31-new001":"local-052.webp","1939-04-07-new002":"local-041.webp","1939-05-11-092":"local-001.webp","1939-09-01-005":"local-047.webp","1939-09-03-006":"local-052.webp","1939-09-28-new003":"local-005.webp","1939-12-13-093":"local-066.webp","1940-03-12-094":"local-065.webp","1940-04-09-009":"local-055.webp","1940-04-11-131":"local-002.webp","1940-04-13-132":"local-002.webp","1940-04-14-133":"local-003.webp","1940-04-27-134":"local-055.webp","1940-05-10-010":"local-052.webp","1940-05-14-new004":"local-053.webp","1940-05-26-011":"local-004.webp","1940-05-28-135":"local-002.webp","1940-06-14-095":"local-006.webp","1940-06-22-013":"local-047.webp","1940-06-28-new005":"local-007.webp","1940-07-10-014":"local-057.webp","1940-09-07-015":"local-056.webp","1940-10-28-017":"local-040.webp","1940-11-15-018":"local-005.webp","1941-04-06-021":"local-040.webp","1941-04-10-new007":"local-058.webp","1941-05-20-022":"local-039.webp","1941-05-24-023":"local-054.webp","1941-09-08-025":"local-009.webp","1941-09-29-026":"local-011.webp","1941-12-05-028":"local-008.webp","1941-12-07-029":"local-018.webp","1941-12-11-031":"local-047.webp","1942-01-02-125":"local-027.webp","1942-01-07-126":"local-008.webp","1942-01-23-127":"local-026.webp","1942-02-15-033":"local-028.webp","1942-03-01-130":"local-030.webp","1942-04-09-034":"local-029.webp","1942-05-30-new008":"local-044.webp","1942-07-17-038":"local-013.webp","1942-08-23-040":"local-013.webp","1942-10-23-041":"local-033.webp","1942-11-11-106":"local-047.webp","world-1942-12-02-02":"local-038.webp","1943-02-02-044":"local-013.webp","world-1943-04-09-03":"local-081.webp","1943-04-19-046":"local-005.webp","1943-05-13-047":"local-042.webp","1943-07-05-048":"local-017.webp","1943-07-10-049":"local-037.webp","1943-09-09-136":"local-034.webp","1943-09-10-137":"local-038.webp","1943-09-16-138":"local-034.webp","1943-09-25-139":"local-014.webp","1943-09-28-140":"local-036.webp","1943-10-13-110":"local-047.webp","1943-10-19-worldnew003":"local-039.webp","1944-01-22-054":"local-035.webp","1944-01-27-055":"local-009.webp","1944-03-19-new009":"local-047.webp","1944-04-08-056":"local-016.webp","1944-06-04-057":"local-038.webp","1944-06-06-058":"local-048.webp","1944-06-19-060":"local-032.webp","1944-07-25-new010":"local-048.webp","1944-08-01-062":"local-005.webp","1944-08-07-worldnew004":"local-078.webp","1944-08-15-063":"local-052.webp","1944-08-25-064":"local-049.webp","1944-10-02-141":"local-005.webp","1944-10-06-143":"local-015.webp","1944-10-07-142":"local-072.webp","1944-10-20-065":"local-024.webp","1944-10-23-066":"local-024.webp","1945-01-27-069":"local-072.webp","1945-02-13-116":"local-043.webp","1945-02-19-071":"local-022.webp","1945-03-07-072":"local-045.webp","1945-03-09-117":"local-073.webp","1945-04-01-073":"local-023.webp","1945-04-16-074":"local-046.webp","1945-05-07-new011":"local-047.webp","1945-05-08-077":"local-047.webp","1945-06-22-078":"local-023.webp","1945-07-17-079":"local-069.webp","1945-08-06-080":"local-074.webp","1945-08-09-082":"local-075.webp","1945-08-17-121":"local-076.webp","world-1946-02-14-05":"local-081.webp","1946-03-05-122":"local-067.webp","1946-07-04-089":"local-071.webp","1946-09-20-worldnew006":"local-077.webp"};
function eventMap(e,small=false){const region=eventMapRegion(e);if(!region)return '';const label=MAP_REGIONS[region];return `<figure class="chronos-region-map${small?' chronos-region-map-small':''}"><img src="assets/maps/${EVENT_LOCAL_MAP[e.slug]||region+'.webp'}" alt="Geographic diagram: ${esc(label)}" loading="lazy"><figcaption>REGION · ${esc(label)} · SCHEMATIC MAP</figcaption></figure>`}
function card(e){
 const content=window.CHRONOS_ARTICLE_CONTENT?.[e.slug]||'This archival file is unavailable in the local build.';
 return `<article data-chronos-slug="${esc(e.slug)}" class="card ${e.major?'major':''}"><div class="chronos-expanded">${/<h1(?:\s|>)/i.test(content)?'':`<div class="meta">${esc(date(e.stamp))} · ${esc(defs[e.front]||e.front)}</div><h3>${esc(e.title)}</h3>`}${content.replace(/(<div class=\"meta\"[^>]*>[^<]*<\/div>)/i, '$1'+eventMap(e))===content ? eventMap(e)+content : content.replace(/(<div class=\"meta\"[^>]*>[^<]*<\/div>)/i, '$1'+eventMap(e))}</div></article>`;
}
const svg=document.getElementById('radioSvg'),scroll=document.getElementById('radioScroll'),scale=document.getElementById('scale');
// EVENT-001: one preview card and one pending timer (no per-marker DOM overlays).
const COUNTRIES={"de":"Germany (1935–1945)","su":"USSR","us":"United States","gb":"United Kingdom","jp":"Japan","pl":"Poland","fr":"France","ca":"Canada","it":"Kingdom of Italy","fi":"Finland","no":"Norway","dk":"Denmark","gr":"Greece","cz":"Czechoslovakia / Czech lands","at":"Austria","yu":"Yugoslavia","au":"Australia"};
const FLAG_META={"gb":{"name":"United Kingdom","validFrom":"1938-01-01","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_the_United_Kingdom.webp","file":"assets/flags/gb.webp","review":"simple-vector-reference"},"us":{"name":"United States · 48 stars","validFrom":"1912-07-04","validTo":"1959-07-03","source":"https://commons.wikimedia.org/wiki/File:Flag_of_the_United_States_(1912-1959).webp","file":"assets/flags/us.webp","review":"simple-vector-reference"},"jp":{"name":"Japan","validFrom":"1870-02-27","validTo":"1999-08-12","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Japan_(1870–1999).webp","file":"assets/flags/jp.webp","review":"simple-vector-reference"},"pl":{"name":"Poland","validFrom":"1938-01-01","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Poland.webp","file":"assets/flags/pl.webp","review":"simple-vector-reference"},"fi":{"name":"Finland","validFrom":"1938-01-01","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Finland.webp","file":"assets/flags/fi.webp","review":"simple-vector-reference"},"no":{"name":"Norway","validFrom":"1938-01-01","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Norway.webp","file":"assets/flags/no.webp","review":"simple-vector-reference"},"dk":{"name":"Denmark","validFrom":"1938-01-01","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Denmark.webp","file":"assets/flags/dk.webp","review":"simple-vector-reference"},"fr":{"name":"French tricolour · political affiliation not specified","validFrom":"1938-01-01","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_France.webp","file":"assets/flags/fr.webp","review":"simple-vector-reference","caveat":"The French tricolour does not distinguish Vichy France from Free France; attribution must be checked for each event."},"gr":{"name":"Greece · national flag","validFrom":"1938-01-01","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Greece.webp","file":"assets/flags/gr.webp","review":"simple-vector-reference"},"at":{"name":"Austria · pre-war flag","validFrom":"1938-01-01","validTo":"1938-03-12","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Austria.webp","file":"assets/flags/at.webp","review":"simple-vector-reference"},"cz":{"name":"Czechoslovakia","validFrom":"1938-01-01","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Czechoslovakia.webp","file":"assets/flags/cz.webp","review":"simple-vector-reference"},"yu":{"name":"Kingdom of Yugoslavia · pre-war tricolour","validFrom":"1938-01-01","validTo":"1945-11-29","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Yugoslavia_(1918–1941).webp","file":"assets/flags/yu.webp","review":"simple-vector-reference"},"de":{"name":"Germany — state flag 1935–1945","validFrom":"1935-09-15","validTo":"1945-05-08","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Germany_(1935–1945).webp","file":"assets/flags/de.svg","review":"locally-rendered-vector; historical-visual-review-recommended","delivery":"local-offline"},"su":{"name":"USSR — flag 1936–1955","validFrom":"1936-12-05","validTo":"1955-08-19","source":"https://commons.wikimedia.org/wiki/File:Flag_of_the_Soviet_Union_(1936_–_1955).webp","file":"assets/flags/su.svg","review":"locally-rendered-vector; historical-visual-review-recommended","delivery":"local-offline"},"it":{"name":"Kingdom of Italy — historical state flag","validFrom":"1861-03-17","validTo":"1946-06-18","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Italy_(1861–1946).webp","file":"assets/flags/it.svg","review":"locally-rendered-vector; historical-visual-review-recommended","delivery":"local-offline","caveat":"After September 1943, different Italian political and military entities existed; the Kingdom of Italy flag must not be attributed to the Italian Social Republic."},"ca":{"name":"Canada — Canadian Red Ensign 1921–1957","validFrom":"1921-11-26","validTo":"1957-01-01","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Canada_(1921–1957).webp","file":"assets/flags/ca.svg","review":"locally-rendered-vector; historical-visual-review-recommended","delivery":"local-offline"},"au":{"name":"Australia — 1908 pattern national flag","validFrom":"1908-12-08","validTo":"1946-12-31","source":"https://commons.wikimedia.org/wiki/File:Flag_of_Australia.webp","file":"assets/flags/au.svg","review":"locally-rendered-vector; historical-visual-review-recommended","delivery":"local-offline"}};
function flagSrc(code,stamp){const m=FLAG_META[code];if(!m?.file)return null;const when=new Date(stamp).toISOString().slice(0,10);return (!m.validFrom||when>=m.validFrom)&&(!m.validTo||when<=m.validTo)?m.file:null}
function flagView(code,stamp){const path=flagSrc(code,stamp);const name=esc(FLAG_META[code]?.name||COUNTRIES[code]||code);return path?`<img class="historical-flag" src="${path}" alt="Flag: ${name}" loading="lazy">`:`<b class="rp-code" title="Historical flag not yet verified">${esc(code.toUpperCase())}</b>`}
const preview=document.getElementById('radioPreview');let previewTimer=0,previewEvent=null,previewAnchor=null,previewTouch=null;
const isTouch=()=>window.matchMedia('(hover: none)').matches;
function hidePreview(){clearTimeout(previewTimer);previewTimer=0;preview.hidden=true;previewEvent=null;previewAnchor=null}
function positionPreview(anchor){if(preview.hidden||!anchor)return;const rect=anchor.getBoundingClientRect(),w=preview.offsetWidth,h=preview.offsetHeight;let x=rect.left+16,y=rect.bottom+12;if(x+w>innerWidth-12)x=Math.max(12,innerWidth-w-12);if(y+h>innerHeight-12)y=Math.max(12,rect.top-h-12);preview.style.left=x+'px';preview.style.top=y+'px'}
function showPreview(e,anchor){clearTimeout(previewTimer);previewEvent=e;previewAnchor=anchor;const codes=window.CHRONOS_PARTICIPANTS?.[e.slug]||[];const flags=codes.length?`<div class="rp-countries">${codes.map(c=>`<span class="rp-country">${flagView(c,e.stamp)}${esc(COUNTRIES[c]||c)}</span>`).join('')}</div>`:'';preview.innerHTML=`<div class="rp-meta">${esc(date(e.stamp))} · ${esc(defs[e.front]||e.front)} ${e.major?'<span class="rp-major">MAJOR EVENT</span>':''}</div><h3 class="rp-title">${esc(e.title)}</h3>${flags}${eventMap(e,true)}<p class="rp-text">${esc(e.desc)}</p><a class="rp-link" href="events/${encodeURIComponent(e.slug)}/">READ FULL ARTICLE →</a>`;preview.hidden=false;positionPreview(anchor)}
function queuePreview(e,anchor){clearTimeout(previewTimer);previewTimer=setTimeout(()=>showPreview(e,anchor),1000)}
// BUG-012: the preview's full-text link opens the existing expandable result card.
preview.addEventListener('click',event=>{
 const link=event.target.closest('a.rp-link');
 if(!link||!preview.contains(link))return;
 event.preventDefault();
 const selected=previewEvent;
 if(!selected)return;
 const targetIndex=Math.max(0,Math.min(count-1,Math.floor((selected.stamp-start)/week)));
 if(scale.value!=='weeks')changeScale('weeks',targetIndex);
 else {index=targetIndex;render(false)}
 const article=[...els.results.querySelectorAll('[data-chronos-slug]')]
   .find(node=>node.dataset.chronosSlug===selected.slug);
 if(!article)return;
 hidePreview();
 article.scrollIntoView({behavior:'smooth',block:'start'});
});
preview.addEventListener('pointerenter',()=>clearTimeout(previewTimer));
preview.addEventListener('pointerleave',hidePreview);
window.addEventListener('resize',()=>positionPreview(previewAnchor));
window.addEventListener('scroll',()=>{if(!preview.hidden)hidePreview()},true);
document.addEventListener('pointerdown',ev=>{if(!preview.hidden&&!preview.contains(ev.target)&&!ev.target.closest?.('.radio-event'))hidePreview()});
// AUDIO-001: tiny generated, looped noise buffer; no external samples or autoplay.
const soundButton=document.getElementById('radioSound');let audioContext=null,noiseNode=null,noiseGain=null,lastTune=0,fadeTimer=0,lastCrackle=0;
let soundOn=false;try{soundOn=localStorage.getItem('ww2_radio_sound')==='on'}catch{}
function soundButtonState(){soundButton.querySelector('.sound-icon').textContent=soundOn?'◖))':'◖×';soundButton.setAttribute('aria-pressed',String(soundOn));soundButton.setAttribute('aria-label',soundOn?'Turn radio sound off':'Turn radio sound on');soundButton.title=soundOn?'Turn radio sound off':'Turn radio sound on'}soundButtonState();
function initSound(){if(!soundOn)return false;try{if(!audioContext){const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return false;audioContext=new Ctx();const buff=audioContext.createBuffer(1,Math.floor(audioContext.sampleRate*1.3),audioContext.sampleRate);let arr=buff.getChannelData(0);for(let i=0;i<arr.length;i++)arr[i]=Math.random()*2-1;noiseNode=audioContext.createBufferSource();noiseNode.buffer=buff;noiseNode.loop=true;const lp=audioContext.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1700;noiseGain=audioContext.createGain();noiseGain.gain.value=0;noiseNode.connect(lp).connect(noiseGain).connect(audioContext.destination);noiseNode.start()}if(audioContext.state==='suspended')audioContext.resume();return true}catch{return false}}
function quietRadio(){clearTimeout(fadeTimer);if(noiseGain&&audioContext){const t=audioContext.currentTime;noiseGain.gain.cancelScheduledValues(t);noiseGain.gain.setTargetAtTime(0,t,.095)}}
function tuneSound(speed=1){if(!soundOn||!initSound())return;const now=performance.now(),t=audioContext.currentTime,v=Math.min(.045,.012+Math.max(0,speed)*.008);noiseGain.gain.cancelScheduledValues(t);noiseGain.gain.setTargetAtTime(v,t,.025);lastTune=now;clearTimeout(fadeTimer);fadeTimer=setTimeout(quietRadio,115)}
function crackle(){if(!soundOn||!initSound()||performance.now()-lastCrackle<400)return;lastCrackle=performance.now();const osc=audioContext.createOscillator(),g=audioContext.createGain(),t=audioContext.currentTime;osc.type='sawtooth';osc.frequency.value=105;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.023,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+.045);osc.connect(g).connect(audioContext.destination);osc.start(t);osc.stop(t+.05)}
soundButton.addEventListener('click',()=>{soundOn=!soundOn;try{localStorage.setItem('ww2_radio_sound',soundOn?'on':'off')}catch{}soundButtonState();if(soundOn)initSound();else quietRadio()});
// DISPLAY-001: mode 3 => major, mode 2 => major+main, mode 1 => all.
const importanceInputs=[...document.querySelectorAll('[name=importanceMode]')];
let importanceMode=2;try{const stored=Number(localStorage.getItem('ww2_importance_mode'));if([1,2,3].includes(stored))importanceMode=stored}catch{}
importanceInputs.forEach(r=>{r.checked=Number(r.value)===importanceMode;r.addEventListener('change',()=>{importanceMode=Number(r.value);try{localStorage.setItem('ww2_importance_mode',String(importanceMode))}catch{}hidePreview();radioDraw();render(false)})});
const visibleImportance=e=>(e.importance|| (e.major?3:2))>=importanceMode;
const NS='http://www.w3.org/2000/svg',frontOrder=db.defs.map(d=>d[0]);const frontName=Object.fromEntries(db.defs.map(d=>[d[0],d[1]]));let lastScale='',lastFrontKey='',radioPositions=[];
function svgEl(tag,attrs={},parent=svg){const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));parent.append(n);return n}
function radioDraw(){
 const mode=scale.value,fronts=enabled(),frontKey=[...fronts].sort().join('|');
 // Fixed calendar geometry: no timezone shifts and one distinct mark per week.
 const left=18,unit=mode==='years'?Math.max(116,(scroll.clientWidth-left-50)/9):mode==='months'?Math.max(48,(scroll.clientWidth-left-32)/12):76;
 const width=mode==='years'?left+9*unit+32:mode==='months'?left+108*unit+32:left+count*unit+32;
 const plot=width-left-28;
 hidePreview();svg.replaceChildren();svg.setAttribute('viewBox',`0 0 ${width} 390`);
 svg.setAttribute('width',width);svg.setAttribute('height',390);svg.style.width=width+'px';
 const xFor=ms=>left+Math.max(0,Math.min(1,(ms-start)/(end-start)))*plot;
 const text=(x,y,value,size=11,anchor='middle',className='radio-number')=>{let n=svgEl('text',{x,y,class:className,'font-size':size,'text-anchor':anchor});n.textContent=value;return n};
 const tick=(x,y1,y2,opacity='.7')=>svgEl('line',{x1:x,y1,x,x2:x,y2,stroke:'var(--radio-brass)','stroke-opacity':opacity});
 svgEl('rect',{x:0,y:0,width,height:390,fill:'transparent'});
 // Scale readout remains on the glass, not in an overlay that hides marks.
 if(mode==='years'){
   for(let y=1938;y<=1946;y++){
     const x=xFor(Date.UTC(y,0,1));tick(x,40,67,'1');text(x,29,String(y),23);
     for(let m=1;m<12;m++){const xx=xFor(Date.UTC(y,m,1));tick(xx,53,66,'.48')}
   }
 } else if(mode==='months'){
   for(let y=1938;y<=1946;y++)for(let m=0;m<12;m++){
     const x=xFor(Date.UTC(y,m,1));tick(x,42,69,m===0?'1':'.7');
     text(x+4,24,String(m+1).padStart(2,'0'),13,'start');
     if(m===0)text(x+4,87,String(y),17,'start','radio-year-number');
     for(let d=7;d<=28;d+=7)tick(xFor(Date.UTC(y,m,d)),61,68,'.35');
   }
 } else {
   // Weekly ticks are anchored to the fixed seven-day grid. Month boundaries
   // are separately computed from real UTC calendar dates, not inferred from
   // which month a cross-month week happens to start in.
   for(let i=0;i<count;i++){
     const ms=start+i*week,xx=xFor(ms),last=Math.min(ms+week-1,end);
     const first=new Date(ms),lastDay=new Date(last);
     tick(xx,48,72,'1');
     text(xx+3,22,`${String(first.getUTCDate()).padStart(2,'0')}–${String(lastDay.getUTCDate()).padStart(2,'0')}`,12,'start');
   }
   for(let y=1938;y<=1946;y++)for(let m=0;m<12;m++){
     const x=xFor(Date.UTC(y,m,1));
     tick(x,70,80,'1');
     text(x+5,91,`${String(m+1).padStart(2,'0')}.${y}`,16,'start','radio-year-number');
   }

 }
 const visible=frontOrder.filter(f=>fronts.has(f)),spacing=Math.min(29,270/Math.max(1,visible.length)),y0=114;
 const names={west:'WEST',east:'EAST',med:'AFRICA',atl:'ATLANTIC',pac:'PACIFIC',air:'AIR',human:'CIVILIANS',world:'DIPLOM.',discoveries:'DISCOVERIES'};
 for(let j=0;j<visible.length;j++){
   const f=visible[j],yy=y0+j*spacing;
   svgEl('line',{x1:left,y1:yy,x2:width-15,y2:yy,stroke:'var(--radio-brass)','stroke-opacity':'.56'});

 }
 const labelPanel=document.getElementById('radioFixedLabels');if(labelPanel)labelPanel.replaceChildren(...visible.map((f,i)=>{const el=document.createElement('div');el.className='radio-fixed-item';el.style.top=(y0+i*spacing)+'px';el.textContent=names[f]||f;return el}));
 const rows=Object.fromEntries(visible.map((f,i)=>[f,y0+i*spacing]));
 // Geometry-based marker grouping. Date-x never shifts; close markers collapse
 // into an accessible count (zooming in reduces the collisions naturally).
 const hits=items.filter(e=>(e.front in rows)&&visibleImportance(e));
 const grouped=new Map();
 for(const e of hits){const a=grouped.get(e.front)||[];a.push(e);grouped.set(e.front,a)}
 const markers=[];
 for(const [front,evs] of grouped){
   evs.sort((a,b)=>a.stamp-b.stamp);
   let group=[],lastX=-Infinity;
   function flush(){if(!group.length)return;
     const positions=group.map(e=>xFor(e.stamp));
     const cx=positions[0];
     markers.push({front,events:group,x:cx});group=[];
   }
   for(const e of evs){let xx=xFor(e.stamp);
     if(mode==='weeks'){flush();markers.push({front,events:[e],x:xx,solo:true});continue}
     if(group.length&&xx-xFor(group[0].stamp)>38)flush();
     group.push(e);lastX=xx;
   }flush();
 }
 const clusterPreview=(events,anchor)=>{
   clearTimeout(previewTimer);previewEvent=events[0];previewAnchor=anchor;
   preview.innerHTML=`<div class="rp-meta">EVENT GROUP · ${events.length} ENTRIES</div><h3 class="rp-title">Events in this period</h3><div class="rp-cluster-list">${events.map(e=>`<a href="?date=${encodeURIComponent(e.date)}" data-event-slug="${esc(e.slug)}">${esc(e.date)} · ${esc(e.title)}</a>`).join('')}</div>`;
   preview.hidden=false;positionPreview(anchor);
   preview.querySelectorAll('[data-event-slug]').forEach(link=>link.addEventListener('click',ev=>{
     if(scale.value==='weeks')return;
     ev.preventDefault();const selected=events.find(item=>item.slug===link.dataset.eventSlug);
     if(!selected)return;
     changeScale('weeks',Math.max(0,Math.min(count-1,Math.floor((selected.stamp-start)/week))));
   }));
 };
 for(const {front,events,x:xx} of markers){
   // BUG-013: always place the marker centre on its front's horizontal rail.
   // Individual overlapping events remain keyboard-selectable via tabindex.
   const e=events[0],multi=events.length>1;const yy=rows[front];
   const importance=Math.max(...events.map(e=>e.importance||2));
   const g=svgEl('g',{class:'radio-event'+(multi?' radio-cluster':''),tabindex:0,role:'button','aria-label':multi?`Group of ${events.length} events, ${defs[front]}`:`${e.date} ${e.title}`});
   svgEl('circle',{cx:xx,cy:yy,r:16,fill:'transparent'},g);
   if(front==='discoveries'){svgEl('polygon',{points:`${xx},${yy-(mode==='years'?12:9)} ${xx+(mode==='years'?10.4:8)},${yy} ${xx},${yy+(mode==='years'?12:9)} ${xx-(mode==='years'?10.4:8)},${yy}`,fill:'#c9b474',stroke:'var(--radio-glass)','stroke-width':1},g)}else if(importance===3){
     const outer=(multi?8:9)*(mode==='years'?1.3:1),inner=outer*.48,pts=[];
     for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,r=k%2?inner:outer;pts.push(`${(xx+r*Math.cos(a)).toFixed(2)},${(yy+r*Math.sin(a)).toFixed(2)}`)}
     svgEl('polygon',{points:pts.join(' '),fill:'#d7ae65',stroke:'var(--radio-glass)','stroke-width':1},g);
   }else svgEl('circle',{cx:xx,cy:yy,r:(importance===2?5.5:3)*(mode==='years'?1.3:1),fill:importance===2?'var(--radio-marker)':'var(--radio-brass)',stroke:'var(--radio-glass)','stroke-width':1},g);
   if(multi){svgEl('circle',{cx:xx+10,cy:yy-10,r:8,fill:'#362e25',stroke:'#cba765','stroke-width':1},g);const n=svgEl('text',{x:xx+10,y:yy-7,'text-anchor':'middle','font-size':10,fill:'#f0d8a4','pointer-events':'none'},g);n.textContent=String(events.length)}
   // Participant flags are shown only on single markers with curated attribution.
   const codes=window.CHRONOS_PARTICIPANTS?.[e.slug]||[];
   if(!multi&&codes.length&&front!=='discoveries'&&mode!=='years'&&(mode==='weeks'||!markers.some(other=>other.front===front&&!(other.events.length===1&&other.events[0]===e)&&Math.abs(other.x-xx)<105))){const flagX=xx+18;
     codes.slice(0,2).forEach((c,i)=>{
       const path=flagSrc(c,e.stamp);if(path){svgEl('image',{x:flagX+i*27,y:yy-15,width:23,height:15,href:path,'pointer-events':'none'},g)}else{const badge=svgEl('text',{x:flagX+i*27,y:yy-4,'font-size':13,fill:'#ead1a4','pointer-events':'none'},g);badge.textContent=c.toUpperCase()}
     });
     if(codes.length>2){let more=svgEl('text',{x:flagX+56,y:yy-3,'font-size':13,fill:'#f0d8a4','pointer-events':'none'},g);more.textContent='+'+(codes.length-2)}
   }
   const choose=(selectedEvent=e)=>{
     hidePreview();
     const targetIndex=Math.max(0,Math.min(count-1,Math.floor((selectedEvent.stamp-start)/week)));
     if(scale.value!=='weeks'){
       changeScale('weeks',targetIndex);
       return;
     }
     index=targetIndex;render(false);
     // BUG-010: keep navigation in the existing below-dial event feed.
     const article=[...els.results.querySelectorAll('[data-chronos-slug]')]
       .find(node=>node.dataset.chronosSlug===selectedEvent.slug);
     if(article)article.scrollIntoView({behavior:'smooth',block:'start'});
   };
   const show=()=>multi?clusterPreview(events,g):showPreview(e,g);
   g.addEventListener('pointerenter',ev=>{if(ev.pointerType!=='touch'){clearTimeout(previewTimer);previewTimer=setTimeout(show,1000)}});
   g.addEventListener('pointerleave',()=>{clearTimeout(previewTimer);previewTimer=setTimeout(()=>{if(!preview.matches(':hover'))hidePreview()},120)});
   g.addEventListener('focus',()=>{clearTimeout(previewTimer);previewTimer=setTimeout(show,1000)});
   g.addEventListener('blur',()=>{clearTimeout(previewTimer);if(!preview.matches(':hover'))hidePreview()});
   // The overview star is a drill-down control, including grouped key events.
   // Cluster previews remain available through hover/focus (and in other zoom modes).
   const activate=()=>{
     // In overview scales, a cluster is a chooser, not an arbitrary date.
     if(multi){previewTouch=null;show();return}
     if(isTouch()&&(previewTouch!==e.slug||preview.hidden)){
       previewTouch=e.slug;show();return;
     }
     previewTouch=null;choose(e);
   };
   g.addEventListener('pointerdown',ev=>ev.stopPropagation());
   g.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();activate()});
   g.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();activate()}});
 }
 lastScale=mode;lastFrontKey=frontKey;radioPositions=[left,plot];radioCursor(true);
}
let alignYear=null;
function radioCursor(recenter=false){
 if(!radioPositions.length)return;
 svg.querySelectorAll('.radio-pointer').forEach(n=>n.remove());
 const [left,plot]=radioPositions,xx=left+Math.max(0,Math.min(1,(index*week)/(end-start)))*plot;
 svgEl('line',{class:'radio-pointer',x1:xx,y1:44,x2:xx,y2:380,stroke:'var(--radio-marker)','stroke-width':2.6,'pointer-events':'none'});
 svgEl('path',{class:'radio-pointer',d:`M ${xx-9} 72 L ${xx+9} 72 L ${xx} 87 Z`,fill:'var(--radio-marker)','pointer-events':'none'});
 const viewport=scroll.clientWidth,desired=Math.max(0,xx-viewport/2);
 if(alignYear!==null){const janX=left+Math.max(0,Math.min(1,(Date.UTC(alignYear,0,1)-start)/(end-start)))*plot;scroll.scrollLeft=Math.max(0,janX-left);alignYear=null;return}
 if(recenter||xx<scroll.scrollLeft+135||xx>scroll.scrollLeft+viewport-80)scroll.scrollLeft=desired;
}
function chooseRadioX(clientX){
 const bounds=svg.getBoundingClientRect(),x=(clientX-bounds.left)*svg.viewBox.baseVal.width/bounds.width;
 const [left,plot]=radioPositions;
 const ratio=Math.max(0,Math.min(1,(x-left)/plot));
 const nextIndex=Math.max(0,Math.min(count-1,Math.round(ratio*(end-start)/week)));
 if(nextIndex!==index){tuneSound(Math.abs(nextIndex-index));index=nextIndex;render(false);if(items.some(e=>e.major&&Math.floor((e.stamp-start)/week)===index))crackle()}
}
// The dial is active. Pointer Events handle both mouse and touch; clicking a
// historical marker keeps its own event handler and does not tune the dial.
let dragId=null;
svg.addEventListener('pointerdown',ev=>{
 if(ev.button!==0 || ev.target.closest('.radio-event'))return;
 dragId=ev.pointerId;svg.setPointerCapture?.(dragId);chooseRadioX(ev.clientX);
});
svg.addEventListener('pointermove',ev=>{if(dragId===ev.pointerId)chooseRadioX(ev.clientX)});
function endRadioDrag(ev){if(dragId===ev.pointerId){dragId=null;if(svg.hasPointerCapture?.(ev.pointerId))svg.releasePointerCapture(ev.pointerId)}}
svg.addEventListener('pointerup',endRadioDrag);svg.addEventListener('pointercancel',endRadioDrag);
svg.setAttribute('tabindex','0');svg.setAttribute('role','slider');svg.setAttribute('aria-label','Radio timeline: left and right arrows change the week');
svg.addEventListener('keydown',ev=>{if(ev.target!==svg)return;if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'){ev.preventDefault();move(ev.key==='ArrowLeft'?-1:1)}});
function changeScale(nextMode,nextIndex=index){
 if(!['years','months','weeks'].includes(nextMode))return;
 hidePreview();
 index=Math.max(0,Math.min(count-1,nextIndex));
 scale.value=nextMode;
 document.querySelectorAll('.scale-button').forEach(b=>{const active=b.dataset.scale===nextMode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 // Rebuild the dial and its cursor together, avoiding stale coordinates.
 lastScale='';
 radioDraw();
 render(false);
 radioCursor(true);
}
scale.addEventListener('change',()=>changeScale(scale.value));
document.querySelectorAll('.scale-button').forEach(b=>b.addEventListener('click',()=>changeScale(b.dataset.scale)));
function render(refreshRadio=true){const from=start+index*week,to=Math.min(from+week-1,end),q=els.search.value.toLocaleLowerCase('en').trim(),fronts=enabled();const match=items.filter(e=>visibleImportance(e)&&fronts.has(e.front)&&(!q?(e.stamp>=from&&e.stamp<=to):(e.title+' '+e.desc+' '+e.detail+' '+e.date).toLocaleLowerCase('en').includes(q)));els.slider.value=index;svg.setAttribute('aria-valuemin','1');svg.setAttribute('aria-valuemax',String(count));svg.setAttribute('aria-valuenow',String(index+1));svg.setAttribute('aria-valuetext',date(from));els.label.textContent=date(from)+' — '+date(to);els.title.textContent=q?'SEARCH RESULTS':'EVENTS OF THE WEEK';els.count.textContent=match.length+' ENTRIES';els.results.innerHTML=match.length?match.map(card).join(''):'<div class="empty">No entries match the selected filters. This does not mean that no wartime events occurred during the week.</div>';[...els.years.children].forEach(b=>b.classList.toggle('active',+b.dataset.year===new Date(from).getUTCFullYear()));if(refreshRadio||lastFrontKey!==[...fronts].sort().join('|')){if(lastScale!==scale.value||lastFrontKey!==[...fronts].sort().join('|'))radioDraw();else radioCursor()}else radioCursor()}function move(n){const old=index;index=Math.max(0,Math.min(count-1,index+n));if(index!==old){tuneSound(Math.abs(n));if(items.some(e=>e.major&&Math.floor((e.stamp-start)/week)===index))crackle()}render()}document.querySelector('#prev').addEventListener('click',()=>move(-1));document.querySelector('#next').addEventListener('click',()=>move(1));document.querySelector('#prevYear').addEventListener('click',()=>move(-52));document.querySelector('#nextYear').addEventListener('click',()=>move(52));els.slider.addEventListener('input',()=>{const old=index;index=+els.slider.value;if(old!==index)tuneSound(Math.abs(index-old));render()});let timer;els.search.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(render,140)});document.querySelectorAll('[name=front]').forEach(el=>el.addEventListener('change',render));for(let y=1938;y<=1946;y++){const b=document.createElement('button');b.type='button';b.className='btn year';b.dataset.year=y;b.textContent=y;b.addEventListener('click',()=>{index=Math.max(0,Math.min(count-1,Math.ceil((Date.UTC(y,0,1)-start)/week)));alignYear=y;changeScale('months',index)});els.years.append(b)}const url=new URL(location.href);let selected=url.searchParams.get('date');if(selected&&/^\d{4}-\d{2}-\d{2}$/.test(selected)){const ms=Date.parse(selected+'T00:00:00Z');if(Number.isFinite(ms))index=Math.max(0,Math.min(count-1,Math.floor((ms-start)/week)))}radioDraw();render()})();