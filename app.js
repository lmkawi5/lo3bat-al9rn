const $ = (id) => document.getElementById(id);
const translations = {
  en:{eyebrow:"THE DAILY EMOJI CHALLENGE",heroTitle:'Crack the <span>secret</span>.',heroText:"A few emojis. One hidden message. Can you decode it?",tabPlay:"Play",tabCreate:"Create",tabHow:"How to play",dailyLabel:"TODAY'S PUZZLE",dailyTitle:"Daily Secret",unsolved:"Ready to solve?",easy:"EASY",prompt:"What is the hidden phrase?",check:"Check answer",hint:"Hint",reveal:"Reveal",share:"Share",streak:"Day streak",solved:"Solved",best:"Best score",creatorLabel:"MAKE YOUR OWN",creatorTitle:"Create a secret",emojiLabel:"Your emoji clue",answerLabel:"Secret answer",hintLabel:"Optional hint",createShare:"Create & share challenge",privacyNote:"Your custom puzzle is prepared on this device. Sharing creates a link; no account is needed.",guideLabel:"QUICK GUIDE",guideTitle:"How it works",guide1Title:"Read the emojis",guide1Text:"Combine the emojis to discover a phrase, title, or expression.",guide2Title:"Type your guess",guide2Text:"Submit your answer. Use a hint if you get stuck.",guide3Title:"Challenge friends",guide3Text:"Create your own puzzle and share its link with friends.",startPlaying:"Start playing",footer:"A tiny puzzle. A big secret.",placeholder:"Type your guess...",correct:"✨ Correct! You earned 10 points.",wrong:"Not quite. Try another answer!",hintUsed:"Hint: ",answerIs:"The answer is: ",needFields:"Add emojis and an answer first.",created:"Your challenge link is ready!",copied:"Link copied!",shareFailed:"Sharing is unavailable. Copy the link instead.",alreadySolved:"You already solved today's puzzle.",sharedTitle:"Can you solve my Emoji Secret?",sharedText:"Decode these emojis:",emptyAnswer:"Please type an answer first."},
  ar:{eyebrow:"تحدي الإيموجي اليومي",heroTitle:'اكشف <span>السر</span>.',heroText:"بعض الإيموجيات ورسالة مخفية. هل تستطيع فكّها؟",tabPlay:"العب",tabCreate:"أنشئ لغزاً",tabHow:"طريقة اللعب",dailyLabel:"لغز اليوم",dailyTitle:"السر اليومي",unsolved:"هل أنت مستعد؟",easy:"سهل",prompt:"ما هي العبارة المخفية؟",check:"تحقق من الإجابة",hint:"تلميح",reveal:"كشف الحل",share:"مشاركة",streak:"أيام متتالية",solved:"ألغاز محلولة",best:"أفضل نتيجة",creatorLabel:"اصنع لغزك",creatorTitle:"أنشئ سراً",emojiLabel:"الإيموجيات",answerLabel:"الإجابة السرية",hintLabel:"تلميح اختياري",createShare:"أنشئ وشارك التحدي",privacyNote:"يتم إعداد اللغز على هاتفك. المشاركة تنشئ رابطاً ولا تحتاج إلى حساب.",guideLabel:"دليل سريع",guideTitle:"كيف تعمل اللعبة؟",guide1Title:"اقرأ الإيموجيات",guide1Text:"اجمع معاني الرموز لاكتشاف عبارة أو عنوان أو تعبير.",guide2Title:"اكتب تخمينك",guide2Text:"أرسل الإجابة واستعمل تلميحاً إذا واجهتك صعوبة.",guide3Title:"تحدَّ أصدقاءك",guide3Text:"أنشئ لغزك الخاص وشارك رابطه مع أصدقائك.",startPlaying:"ابدأ اللعب",footer:"لغز صغير، سر كبير.",placeholder:"اكتب تخمينك...",correct:"✨ صحيح! ربحت 10 نقاط.",wrong:"ليس تماماً، حاول مرة أخرى!",hintUsed:"تلميح: ",answerIs:"الإجابة هي: ",needFields:"أضف الإيموجيات والإجابة أولاً.",created:"رابط التحدي جاهز!",copied:"تم نسخ الرابط!",shareFailed:"المشاركة غير متاحة. انسخ الرابط يدوياً.",alreadySolved:"لقد حللت لغز اليوم بالفعل.",sharedTitle:"هل تستطيع حل لغز الإيموجي الخاص بي؟",sharedText:"فك رموز هذه الإيموجيات:",emptyAnswer:"اكتب إجابتك أولاً."},
  fr:{eyebrow:"LE DÉFI EMOJI DU JOUR",heroTitle:'Percez le <span>secret</span>.',heroText:"Quelques emojis. Un message caché. Saurez-vous le décoder ?",tabPlay:"Jouer",tabCreate:"Créer",tabHow:"Comment jouer",dailyLabel:"ÉNIGME DU JOUR",dailyTitle:"Secret quotidien",unsolved:"Prêt à résoudre ?",easy:"FACILE",prompt:"Quel est le message caché ?",check:"Vérifier",hint:"Indice",reveal:"Révéler",share:"Partager",streak:"Jours de suite",solved:"Résolus",best:"Meilleur score",creatorLabel:"CRÉEZ LE VÔTRE",creatorTitle:"Créer un secret",emojiLabel:"Votre indice emoji",answerLabel:"Réponse secrète",hintLabel:"Indice facultatif",createShare:"Créer et partager",privacyNote:"Votre énigme est préparée sur cet appareil. Le partage crée un lien sans compte.",guideLabel:"GUIDE RAPIDE",guideTitle:"Comment ça marche",guide1Title:"Lisez les emojis",guide1Text:"Combinez les emojis pour trouver une phrase ou une expression.",guide2Title:"Écrivez votre réponse",guide2Text:"Validez votre réponse. Utilisez un indice si besoin.",guide3Title:"Défiez vos amis",guide3Text:"Créez votre énigme et partagez le lien avec vos amis.",startPlaying:"Commencer",footer:"Petite énigme, grand secret.",placeholder:"Votre réponse...",correct:"✨ Bravo ! Vous gagnez 10 points.",wrong:"Pas tout à fait. Réessayez !",hintUsed:"Indice : ",answerIs:"La réponse est : ",needFields:"Ajoutez les emojis et la réponse.",created:"Votre lien est prêt !",copied:"Lien copié !",shareFailed:"Partage indisponible. Copiez le lien.",alreadySolved:"Vous avez déjà résolu l'énigme du jour.",sharedTitle:"Pouvez-vous résoudre mon Emoji Secret ?",sharedText:"Décodez ces emojis :",emptyAnswer:"Veuillez écrire une réponse."}
};
Object.assign(translations.en,{cat_riddle:"Riddles",cat_emoji:"Emoji",cat_quiz:"Quiz",cat_logic:"Logic",medium:"MEDIUM",hard:"HARD",next:"Next",alreadySolved:"You already solved this one.",dailyLabel:"PUZZLE"});
Object.assign(translations.ar,{cat_riddle:"ألغاز",cat_emoji:"إيموجي",cat_quiz:"أسئلة",cat_logic:"منطق",medium:"متوسط",hard:"صعب",next:"التالي",alreadySolved:"لقد حللت هذا اللغز من قبل.",dailyLabel:"لغز"});
Object.assign(translations.fr,{cat_riddle:"Devinettes",cat_emoji:"Emoji",cat_quiz:"Quiz",cat_logic:"Logique",medium:"MOYEN",hard:"DIFFICILE",next:"Suivant",alreadySolved:"Vous avez déjà résolu celle-ci.",dailyLabel:"ÉNIGME"});
// Puzzle format: languages separated by "~" (en~ar~fr), alternative answers by "|".
// q=question, e=emojis, a=accepted answers, o=quiz options (first one is correct), h=hint, c=category, l=level 1-3
const CATS={riddle:"🧩",emoji:"😂",quiz:"❓",logic:"🧠"};
const puzzles=[
{c:"riddle",l:1,q:"I have hands but cannot clap. What am I?~لي عقارب لكني لا ألدغ، ما أنا؟~J'ai des aiguilles mais je ne pique pas. Qui suis-je ?",a:"clock|a clock~ساعة|الساعة|ساعه~horloge|une horloge|montre",h:"It tells the time.~تُخبرك بالوقت.~Elle donne l'heure."},
{c:"riddle",l:1,q:"What has a neck but no head?~ما الشيء الذي له عنق وليس له رأس؟~Qu'est-ce qui a un cou mais pas de tête ?",a:"bottle|a bottle~زجاجة|قارورة|الزجاجة~bouteille|une bouteille",h:"You drink from it.~نشرب منها.~On boit dedans."},
{c:"riddle",l:2,q:"The more you take, the more you leave behind. What are they?~كلما أخذت منها أكثر، تركت خلفك أكثر. ما هي؟~Plus vous en prenez, plus vous en laissez derrière vous. Que sont-ils ?",a:"footsteps|steps|footprints~خطوات|الخطوات|خطوة~pas|des pas|les pas|empreintes",h:"You make them when you walk.~تصنعها عند المشي.~On les fait en marchant."},
{c:"riddle",l:2,q:"I speak without a mouth and hear without ears. What am I?~أتكلم بلا فم وأسمع بلا أذن، من أنا؟~Je parle sans bouche et j'entends sans oreilles. Qui suis-je ?",a:"echo|an echo~صدى|الصدى|صدى الصوت~écho|un écho|l'écho",h:"Shout in a canyon.~اصرخ في الوادي.~Criez dans une vallée."},
{c:"riddle",l:3,q:"What can you break without touching it?~ما الشيء الذي تكسره دون أن تلمسه؟~Que peut-on briser sans jamais le toucher ?",a:"promise|a promise|silence~وعد|الوعد|الصمت|صمت~promesse|une promesse|silence|le silence",h:"Honest people keep it.~الصادقون يحفظونه.~Les gens honnêtes la tiennent."},
{c:"riddle",l:3,q:"I am always coming but never arrive. What am I?~أنا دائماً قادم لكنني لا أصل أبداً، من أنا؟~Je viens toujours mais je n'arrive jamais. Qui suis-je ?",a:"tomorrow~غدا|الغد|غد~demain",h:"It follows today.~يأتي بعد اليوم.~Il suit aujourd'hui."},
{c:"emoji",l:1,e:"🌞 🌻",a:"sunflower|sun flower~عباد الشمس|دوار الشمس~tournesol",h:"A tall yellow flower.~زهرة صفراء طويلة.~Une grande fleur jaune."},
{c:"emoji",l:1,e:"🐱 👑",a:"king cat|cat king~ملك القطط|القط الملك~roi des chats|chat roi",h:"A royal pet.~حيوان أليف بصفة ملكية.~Un animal de compagnie royal."},
{c:"emoji",l:2,e:"🌙 ❤️ 🎵",a:"love song|romantic song~أغنية حب|اغنية حب~chanson d'amour|chanson d amour",h:"A melody about feelings.~لحن يتحدث عن المشاعر.~Une mélodie qui parle des sentiments."},
{c:"emoji",l:2,e:"🌍 ✈️ 🧳",a:"world travel|travel the world~السفر حول العالم|رحلة حول العالم~voyage autour du monde|tour du monde",h:"A journey to many countries.~رحلة إلى بلدان كثيرة.~Un voyage dans plusieurs pays."},
{c:"emoji",l:3,e:"⏰ = 💰",a:"time is money|time money~الوقت من ذهب~le temps c'est de l'argent|temps c'est de l'argent",h:"A famous saying about time.~مثل مشهور عن الوقت.~Un proverbe célèbre sur le temps."},
{c:"emoji",l:3,e:"🌅 🐦 🪱",a:"the early bird catches the worm|early bird~من جد وجد|الطائر المبكر~l'avenir appartient à ceux qui se lèvent tôt|oiseau matinal",h:"A proverb about waking up early.~مثل عن الاستيقاظ باكراً.~Un proverbe sur le réveil matinal."},
{c:"quiz",l:1,q:"Which planet is known as the Red Planet?~أي كوكب يُعرف بالكوكب الأحمر؟~Quelle planète est appelée la planète rouge ?",o:"Mars|Venus|Jupiter~المريخ|الزهرة|المشتري~Mars|Vénus|Jupiter",h:"It is named after a Roman god of war.~سمّي على اسم إله الحرب الروماني.~Il porte le nom du dieu romain de la guerre."},
{c:"quiz",l:1,q:"How many days are in a week?~كم عدد أيام الأسبوع؟~Combien de jours y a-t-il dans une semaine ?",o:"7|5|10",h:"Monday to Sunday.~من الاثنين إلى الأحد.~Du lundi au dimanche."},
{c:"quiz",l:2,q:"What is the capital of Morocco?~ما هي عاصمة المغرب؟~Quelle est la capitale du Maroc ?",o:"Rabat|Casablanca|Marrakech~الرباط|الدار البيضاء|مراكش~Rabat|Casablanca|Marrakech",h:"Not the biggest city.~ليست أكبر مدينة.~Ce n'est pas la plus grande ville."},
{c:"quiz",l:2,q:"Which is the largest ocean?~ما هو أكبر محيط في العالم؟~Quel est le plus grand océan ?",o:"Pacific|Atlantic|Indian~الهادئ|الأطلسي|الهندي~Pacifique|Atlantique|Indien",h:"Its name means calm.~اسمه يعني السكون.~Son nom évoque le calme."},
{c:"quiz",l:3,q:"Which gas do plants absorb from the air?~أي غاز تمتصه النباتات من الهواء؟~Quel gaz les plantes absorbent-elles de l'air ?",o:"Carbon dioxide|Oxygen|Nitrogen~ثاني أكسيد الكربون|الأكسجين|النيتروجين~Dioxyde de carbone|Oxygène|Azote",h:"They use it for photosynthesis.~تستخدمه في التركيب الضوئي.~Elles l'utilisent pour la photosynthèse."},
{c:"quiz",l:3,q:"In which year was the first Moon landing?~في أي سنة حدث أول هبوط على القمر؟~En quelle année a eu lieu le premier alunissage ?",o:"1969|1959|1979",h:"The late 1960s.~في أواخر الستينات.~Fin des années 1960."},
{c:"logic",l:1,q:"What number comes next? 2, 4, 6, 8, ?~ما العدد التالي؟ 2، 4، 6، 8، ؟~Quel nombre vient ensuite ? 2, 4, 6, 8, ?",a:"10",h:"Add 2 each time.~أضف 2 في كل مرة.~Ajoutez 2 à chaque fois."},
{c:"logic",l:1,q:"I have 3 apples and buy 4 more. How many do I have?~عندي 3 تفاحات واشتريت 4 أخرى. كم أصبح عندي؟~J'ai 3 pommes et j'en achète 4 de plus. Combien en ai-je ?",a:"7",h:"Add them.~اجمعهما.~Additionnez-les."},
{c:"logic",l:2,q:"What comes next? 2, 6, 18, 54, ?~ما العدد التالي؟ 2، 6، 18، 54، ؟~Quel nombre vient ensuite ? 2, 6, 18, 54, ?",a:"162",h:"Multiply by 3.~اضرب في 3.~Multipliez par 3."},
{c:"logic",l:2,q:"A farmer has 17 sheep. All but 9 run away. How many are left?~لدى مزارع 17 خروفاً، هرب كلها ما عدا 9. كم بقي؟~Un fermier a 17 moutons. Tous sauf 9 s'enfuient. Combien en reste-t-il ?",a:"9",h:"Read carefully.~اقرأ بتمعّن.~Lisez attentivement."},
{c:"logic",l:3,q:"What comes next? 1, 1, 2, 3, 5, 8, ?~ما العدد التالي؟ 1، 1، 2، 3، 5، 8، ؟~Quel nombre vient ensuite ? 1, 1, 2, 3, 5, 8, ?",a:"13",h:"Add the previous two numbers.~اجمع العددين السابقين.~Additionnez les deux nombres précédents."},
{c:"logic",l:3,q:"3 cats catch 3 mice in 3 minutes. How many minutes do 100 cats need to catch 100 mice?~تصطاد 3 قطط 3 فئران في 3 دقائق. كم دقيقة تحتاج 100 قطة لاصطياد 100 فأر؟~3 chats attrapent 3 souris en 3 minutes. Combien de minutes faut-il à 100 chats pour attraper 100 souris ?",a:"3",h:"Each cat catches one mouse in 3 minutes.~كل قطة تصطاد فأراً في 3 دقائق.~Chaque chat attrape une souris en 3 minutes."}
];
const LI={en:0,ar:1,fr:2};
const todayKey=new Date().toISOString().slice(0,10);
const yesterdayKey=new Date(Date.now()-864e5).toISOString().slice(0,10);
let lang=localStorage.getItem("es_lang")||"en";
let state=JSON.parse(localStorage.getItem("es_state")||'{"points":0,"solved":0,"best":0,"streak":0,"lastSolved":""}');
state.done=state.done||[];
let cat="emoji",lvl=1,pos=Math.floor(Date.now()/86400000),cur=null,activeShared=null,sharedMode=!!new URLSearchParams(location.search).get("p");
function t(key){return (translations[lang]||translations.en)[key]||translations.en[key]||key}
function L(s){const a=s.split("~");return a[LI[lang]]??a[0]}
function normalize(s){return (s||"").replace(/[٠-٩]/g,d=>d.charCodeAt(0)-1632).replace(/[\u064B-\u065F]/g,"").replace(/[إأآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g,"").replace(/[^\p{L}\p{N}]+/gu," ").trim()}
function accepted(p){return p.shared?[p.a]:p.o?p.o.split("~").map(x=>x.split("|")[0]):p.a.split("~").flatMap(x=>x.split("|"))}
function shown(p){return p.shared?p.a:L(p.o||p.a).split("|")[0]}
function hintOf(p){return p.shared?(p.h||"Think about the emojis."):L(p.h)}
function list(){return puzzles.filter(p=>p.c===cat&&p.l===lvl)}
function save(){localStorage.setItem("es_state",JSON.stringify(state));renderStats()}
function renderStats(){$("points").textContent=state.points;$("solved").textContent=state.solved;$("best").textContent=state.best;$("streak").textContent=state.streak}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)}
function applyLanguage(){document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.querySelectorAll("[data-i18n]").forEach(el=>{el.innerHTML=t(el.dataset.i18n)});$("language").value=lang;$("answerInput").placeholder=t("placeholder")}
function setView(view){["play","create","how"].forEach(v=>{$(v+"View").classList.toggle("hidden",v!==view)});document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.view===view))}
function getPuzzle(){const p=new URLSearchParams(location.search);if(p.has("p")){try{const obj=JSON.parse(decodeURIComponent(escape(atob(p.get("p")))));if(obj.e&&obj.a)return obj}catch(e){}}return null}
function renderFilters(){
 $("catChips").innerHTML=Object.keys(CATS).map(c=>`<button class="chip${c===cat&&!activeShared?" on":""}" data-c="${c}">${CATS[c]} ${t("cat_"+c)}</button>`).join("");
 $("lvlChips").innerHTML=[1,2,3].map(l=>`<button class="chip${l===lvl&&!activeShared?" on":""}" data-l="${l}">${t(["easy","medium","hard"][l-1])}</button>`).join("");
}
function showPuzzle(){
 activeShared=sharedMode?getPuzzle():null;
 if(activeShared){cur={c:"emoji",l:1,shared:1,e:activeShared.e,a:activeShared.a,h:activeShared.h};$("puzzleNumber").textContent="FRIEND"}
 else{const ls=list();cur=ls[pos%ls.length];$("puzzleNumber").textContent=(pos%ls.length+1)+"/"+ls.length}
 renderFilters();
 $("catTitle").textContent=t("cat_"+cur.c);$("diff").textContent=t(["easy","medium","hard"][cur.l-1]);
 $("emojiLine").textContent=cur.e||CATS[cur.c];$("emojiLine").classList.toggle("small",!cur.e);
 $("qText").textContent=cur.q?L(cur.q):"";
 $("prompt").classList.toggle("hidden",cur.c!=="emoji");
 $("answerForm").classList.toggle("hidden",!!cur.o);
 const box=$("options");box.innerHTML="";
 if(cur.o)L(cur.o).split("|").sort(()=>Math.random()-.5).forEach(o=>{const b=document.createElement("button");b.className="opt";b.textContent=o;b.onclick=()=>checkAnswer(o,b);box.appendChild(b)});
 $("answerInput").value="";$("answerInput").disabled=false;$("answerForm").querySelector("button").disabled=false;
 $("hintText").textContent="";feedback("");
}
function feedback(msg,kind=""){$("feedback").textContent=msg;$("feedback").className="feedback "+kind}
function checkAnswer(value,btn){
 if(!value.trim()){feedback(t("emptyAnswer"),"bad");return}
 const id=puzzles.indexOf(cur);
 if(!cur.shared&&state.done.includes(id)){feedback(t("alreadySolved"));return}
 if(!accepted(cur).some(a=>normalize(a)===normalize(value))){feedback(t("wrong"),"bad");if(btn){btn.classList.add("bad");btn.disabled=true}return}
 const pts=10*cur.l;feedback(t("correct").replace("10",pts),"good");
 if(btn)btn.classList.add("good");
 if(!cur.shared){state.points+=pts;state.solved+=1;state.best=Math.max(state.best,state.points);if(state.lastSolved!==todayKey){state.streak=state.lastSolved===yesterdayKey?state.streak+1:1;state.lastSolved=todayKey}state.done.push(id);save()}
 $("answerInput").disabled=true;$("answerForm").querySelector("button").disabled=true;document.querySelectorAll(".opt").forEach(b=>b.disabled=true);
}
function encodePuzzle(obj){return btoa(unescape(encodeURIComponent(JSON.stringify(obj))))}
async function shareText(text,url){try{if(navigator.share){await navigator.share({title:t("sharedTitle"),text,url});return true}}catch(e){if(e.name==="AbortError")return false}try{await navigator.clipboard.writeText(url);toast(t("copied"));return true}catch(e){toast(t("shareFailed"));return false}}
$("answerForm").addEventListener("submit",e=>{e.preventDefault();checkAnswer($("answerInput").value)});
$("hintBtn").addEventListener("click",()=>{$("hintText").textContent=t("hintUsed")+hintOf(cur)});
$("revealBtn").addEventListener("click",()=>{$("hintText").textContent=t("answerIs")+shown(cur)});
$("nextBtn").addEventListener("click",()=>{sharedMode=false;pos++;showPuzzle()});
$("catChips").addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(b){cat=b.dataset.c;pos=0;sharedMode=false;showPuzzle()}});
$("lvlChips").addEventListener("click",e=>{const b=e.target.closest("[data-l]");if(b){lvl=+b.dataset.l;pos=0;sharedMode=false;showPuzzle()}});
$("shareDailyBtn").addEventListener("click",()=>{if(cur.c==="emoji"){const p={e:cur.e,a:shown(cur),h:cur.shared?cur.h:L(cur.h)};shareText(t("sharedText")+" "+p.e,location.origin+location.pathname+"?p="+encodeURIComponent(encodePuzzle(p)))}else shareText(L(cur.q),location.origin+location.pathname)});
$("createShareBtn").addEventListener("click",()=>{const e=$("creatorEmoji").value.trim(),a=$("creatorAnswer").value.trim(),h=$("creatorHint").value.trim();if(!e||!a){$("createFeedback").textContent=t("needFields");$("createFeedback").className="feedback bad";return}const url=location.origin+location.pathname+"?p="+encodeURIComponent(encodePuzzle({e,a,h}));$("createFeedback").textContent=t("created");$("createFeedback").className="feedback good";shareText(t("sharedText")+" "+e,url)});
$("language").addEventListener("change",e=>{lang=e.target.value;localStorage.setItem("es_lang",lang);applyLanguage();showPuzzle()});
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.view)));
$("backToPlay").addEventListener("click",()=>setView("play"));
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}
applyLanguage();renderStats();showPuzzle();
