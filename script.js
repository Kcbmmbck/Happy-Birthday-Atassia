const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const loader=$('#loader');window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hidden'),900));

// Countdown: Nov 28, 2026
const target=new Date(2026,10,28,0,0,0);let last={};function updateCountdown(){const now=new Date();let diff=Math.max(0,target-now);const values={days:Math.floor(diff/864e5),hours:Math.floor(diff%864e5/36e5),minutes:Math.floor(diff%36e5/6e4),seconds:Math.floor(diff%6e4/1e3)};for(const key in values){const el=$('#'+key);const text=String(values[key]).padStart(2,'0');if(last[key]!==text){el.textContent=text;el.classList.remove('flip');void el.offsetWidth;el.classList.add('flip')}last[key]=text}}updateCountdown();setInterval(updateCountdown,1000);

// Page transitions
let current=0;const pages=$$('.page');function goTo(index){if(index===current)return;pages[current].classList.add('turning-out');pages[current].classList.remove('active');setTimeout(()=>{pages[current].classList.remove('turning-out');current=index;pages.forEach((p,i)=>p.classList.toggle('active',i===index));pages[index].classList.add('turning-in');$$('.progress-dot').forEach((d,i)=>d.classList.toggle('active',i===index));setTimeout(()=>pages[index].classList.remove('turning-in'),450);if(index===1)revealCards();if(index===4)setTimeout(()=>$('#foreverText').classList.add('show'),500)},300)}
$('#openSurprise').addEventListener('click',()=>{burst(window.innerWidth/2,window.innerHeight*.7,55);confetti(90);goTo(1)});$$('[data-next]').forEach(b=>b.addEventListener('click',()=>goTo(Number(b.dataset.next))));$$('.progress-dot').forEach(d=>d.addEventListener('click',()=>goTo(Number(d.dataset.page))));$('#restart').addEventListener('click',()=>goTo(0));

// Love story reveal and flip
function revealCards(){const cards=$$('.memory-card');cards.forEach((c,i)=>setTimeout(()=>c.classList.add('reveal'),i*220))}setTimeout(revealCards,1400);
$$('.memory-card').forEach(card=>{card.addEventListener('click',()=>card.classList.toggle('flipped'));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')card.classList.toggle('flipped')})});
$$('.photo-placeholder img[src]:not([src=""])').forEach(img=>{
  const card=img.closest('.photo-placeholder');
  img.addEventListener('load',()=>{
    img.classList.add('loaded');
    card.classList.add('loaded');
  });
  if(img.complete&&img.naturalWidth)img.dispatchEvent(new Event('load'));
});

// Envelope and typewriter
const letterText=`Happy Birthday, my beautiful baby, Atassia! Mwah mwah mwah! 💋💋❤️ Today is your special day, and I want you to know how thankful I am to have you in my life. I hope your birthday is filled with happiness, laughter, beautiful memories, and all the love you deserve. You are such a special person to me, and I feel so lucky that I have someone like you whom I can love, care for, laugh with, and share my everyday moments with.

Baby, I hope we continue to have more funny moments together. I love making you laugh, teasing you, joking around with you, and sometimes being silly just to see your beautiful smile. Even when we talk about random things that don't make any sense, I still enjoy every second with you. Hahaha! I want us to keep being playful, sweet, and a little bit crazy together because that's one of the things that makes our relationship so special. Never stop smiling, baby, because your smile makes my heart happy. ❤️

I also wish that we could continue having our long video calls together. I love seeing your beautiful face on my screen, listening to your voice, looking at your smile, and talking about everything and anything. Sometimes we might not even notice how many hours have passed because we're enjoying each other's company. I hope we have countless more video calls, even if we're sleepy, tired, or have nothing important to talk about. Just seeing you and spending time with you is already enough to make my day complete. I never get tired of talking to you, baby. 🥰

I also look forward to having more dates with you, exploring different places, trying delicious foods, visiting food parks, taking cute pictures, holding hands, hugging, and making unforgettable memories together. I want us to experience more beautiful adventures, discover new places, and enjoy every little moment as a couple. I hope we can go on more romantic dates, laugh together, and create memories that we will remember for a very long time.

Baby, I want us to continue talking more, sharing our stories, telling each other about our days, expressing our feelings, and understanding each other even better. I want to be someone you can always talk to, laugh with, and share your happiness with. No matter how busy life gets, I hope we always make time for each other.

Most importantly, I wish you good health, success, happiness, and blessings in everything you do. Always take care of yourself, eat properly, get enough rest, and remember that you are loved so much.

I LOVE YOU SO, SO MUCH, MY BABY ATASSIA! ❤️ I am excited for all the birthdays, dates, adventures, long video calls, sweet conversations, funny moments, and beautiful memories waiting for us in the future.

Happy Birthday again, my baby, my sweetheart, and my favorite person! Keep smiling and stay sweet. I love you endlessly!

Mwah mwah mwah! 💋💋💋❤️❤️❤️

Forever your baby. I LOVE YOU SO MUCH! 🥹💕`;
let letterRead=false;
$('#envelope').addEventListener('click',e=>{
  $('.letter-next').hidden=true;
  e.currentTarget.classList.add('open');
  setTimeout(()=>{
    $('#letterModal').classList.add('open');
    $('#letterModal').setAttribute('aria-hidden','false');
    if(letterRead){
      $('#typewriter').textContent=letterText;
      clearInterval($('#typewriter').typewriterTimer);
    }else{
      typewrite($('#typewriter'),letterText);
    }
    $('.close-letter').focus();
  },1100);
});
function closeLetter(){if(!letterRead)return;$('#letterModal').classList.remove('open');$('#letterModal').setAttribute('aria-hidden','true');$('.letter-next').hidden=false;$('#envelope').focus();}
$('.close-letter').addEventListener('click',closeLetter);
function typewrite(el,text){el.textContent='';letterRead=false;let i=0;clearInterval(el.typewriterTimer);el.typewriterTimer=setInterval(()=>{el.textContent+=text[i++]||'';if(i>=text.length){clearInterval(el.typewriterTimer);letterRead=true}},28)}

// Celebration candles
const candles=$$('.candle');let blown=0;candles.forEach(c=>c.addEventListener('click',()=>{if(!c.classList.contains('out')){c.classList.add('out');blown++;if(blown===candles.length){$('#wishCopy').textContent='Your wish is on its way to the stars... ✨';confetti(100)}}}));
$('#wishButton').addEventListener('click',()=>{
  confetti(140);
  burst(window.innerWidth/2,window.innerHeight*.45,100);
  $('#wishCopy').textContent='I love you so much baby mwah mwah ❤️❤️';
  if(!musicPlaying){
    musicPlaying=true;
    $('.music-label').textContent='Pause';
    $('.music-icon').textContent='❚❚';
  }
  backgroundMusic.play().catch(()=>{});
});

// Keyboard and modal UX
document.addEventListener('keydown',e=>{
  if($('#letterModal').classList.contains('open') && e.key==='Escape'){
    closeLetter();
    return;
  }
  if(e.target.matches('input,textarea,button'))return;
  if(e.key==='ArrowRight')goTo(Math.min(pages.length-1,current+1));
  if(e.key==='ArrowLeft')goTo(Math.max(0,current-1));
});

// Background music
const backgroundMusic = new Audio('music/Taylor%20Swift%20-%20The%20Fate%20of%20Ophelia%20(Official%20Music%20Video).mp3');
backgroundMusic.loop=true;
backgroundMusic.volume=.5;
let musicPlaying=false;
$('#musicToggle').addEventListener('click',()=>{
  musicPlaying=!musicPlaying;
  $('.music-label').textContent=musicPlaying?'Pause':'Play';
  $('.music-icon').textContent=musicPlaying?'❚❚':'♫';
  if(musicPlaying){
    backgroundMusic.play().catch(()=>{musicPlaying=false;$('.music-label').textContent='Play';$('.music-icon').textContent='♫'});
  }else{
    backgroundMusic.pause();
  }
});

// Canvas effects
const canvas=$('#magicCanvas'),ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
let W,H,particles=[],pixelRatio=1,frameId=0,lastFrameTime=0;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function resize(){pixelRatio=Math.min(window.devicePixelRatio||1,innerWidth<600?1:1.25);W=canvas.width=Math.round(innerWidth*pixelRatio);H=canvas.height=Math.round(innerHeight*pixelRatio);canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px'}let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,100)});resize();
function makeParticle(x,y,type='heart'){const chars=['❤','♡','✨','✦','💗'];return{x:x+Math.random()*24-12,y:y+Math.random()*24-12,vx:(Math.random()-.5)*2,vy:-Math.random()*2.5-.6,size:Math.random()*7+9,char:type==='heart'?chars[Math.floor(Math.random()*4)]:chars[Math.floor(Math.random()*5)],life:1,rotation:Math.random()*6}}
function burst(x,y,n=20){if(reducedMotion)return;const count=Math.min(n,innerWidth<600?16:24);for(let i=0;i<count;i++)particles.push(makeParticle(x,y,'heart'));startAnimation()}
function confetti(n=24){if(reducedMotion)return;const count=Math.min(n,innerWidth<600?18:28);for(let i=0;i<count;i++){const p=makeParticle(Math.random()*innerWidth,-20,'star');p.vx=(Math.random()-.5)*2;p.vy=Math.random()*2+1;p.char=['✨','💗','♡','✦'][Math.floor(Math.random()*4)];particles.push(p)}startAnimation()}
function animate(timestamp=0){
  frameId=0;
  const frameInterval=1000/60;
  if(lastFrameTime && timestamp-lastFrameTime<frameInterval-1){
    if(!reducedMotion&&particles.length)frameId=requestAnimationFrame(animate);
    return;
  }
  const delta=lastFrameTime?Math.min((timestamp-lastFrameTime)/frameInterval,2):1;
  lastFrameTime=timestamp;
  ctx.clearRect(0,0,W,H);
  ctx.save();
  ctx.scale(pixelRatio,pixelRatio);
  particles=particles.filter(p=>p.life>0&&p.y<innerHeight+50).slice(-50);
  particles.forEach(p=>{
    p.x+=p.vx*delta;
    p.y+=p.vy*delta;
    p.vy+=(p.char==='•'?0.02:-0.005)*delta;
    p.life-=.018*delta;
    p.rotation+=.008*delta;
    ctx.globalAlpha=Math.max(0,p.life);
    ctx.font=`${p.size}px serif`;
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle='#e98daf';
    ctx.fillText(p.char,-p.size/2,-p.size/2);
    ctx.restore();
  });
  ctx.restore();
  if(!reducedMotion&&particles.length)frameId=requestAnimationFrame(animate);
}
function startAnimation(){lastFrameTime=0;if(!reducedMotion&&!frameId&&particles.length)frameId=requestAnimationFrame(animate)}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&frameId){cancelAnimationFrame(frameId);frameId=0}else if(!document.hidden&&particles.length)startAnimation()});
animate();
