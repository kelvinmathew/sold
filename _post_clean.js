const puppeteer = require('puppeteer');
(async () => {
  const B='https://valores.newpropertyuae.ae';
  const browser = await puppeteer.launch({args:['--disable-dev-shm-usage']});
  const urls=[['Home',B+'/'],['Services',B+'/services/'],['Why SOLD',B+'/why-sold/'],
    ['Contact',B+'/contact/'],['Insights',B+'/insights/'],['Client Success',B+'/client-success/'],
    ['Events',B+'/events/'],['Lead Gen',B+'/lead-generation/']];
  const KNOWN=['valores.newpropertyuae.ae','fonts.googleapis.com','fonts.gstatic.com',
    'cdn.jsdelivr.net','cdnjs.cloudflare.com','google-analytics.com','googletagmanager.com'];
  let bad=0; const foreign=new Set();
  for(const [n,u] of urls){
    const p=await browser.newPage(); const errs=[];
    p.on('pageerror',e=>errs.push(e.message));
    p.on('request',r=>{ try{const h=new URL(r.url()).hostname;
      if(!KNOWN.some(k=>h.endsWith(k))) foreign.add(h);}catch(e){} });
    let ok=true;
    try{await p.goto(u,{waitUntil:'domcontentloaded',timeout:45000});}catch(e){ok=false;}
    await new Promise(r=>setTimeout(r,1500));
    if(!ok){console.log('  !! '+n+': LOAD FAILED');bad++;await p.close();continue;}
    const r=await p.evaluate(()=>({
      err:/Fatal error|Warning:/i.test(document.body.innerText.slice(0,3000)),
      h:document.body.scrollHeight,
      hdr:!!document.querySelector('.site-header')}));
    const probs=[];
    if(r.err)probs.push('PHP ERROR ON PAGE');
    if(r.h<500)probs.push('PAGE TOO SHORT');
    if(errs.length)probs.push('JS: '+errs[0].slice(0,40));
    if(probs.length){bad++;console.log('  !! '+n+': '+probs.join(' ; '));}
    else console.log('  ok  '+n);
    await p.close();
  }
  console.log('\nThird-party hosts contacted:');
  foreign.size? [...foreign].forEach(h=>console.log('   - '+h)) : console.log('   (none - clean)');
  console.log(bad===0?'\n==== ALL PAGES HEALTHY ====':'\n==== '+bad+' issue(s) ====');
  await browser.close();
})();
