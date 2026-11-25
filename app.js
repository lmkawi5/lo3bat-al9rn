const $ = (id) => document.getElementById(id);
const translations = {
  en:{eyebrow:"THE DAILY EMOJI CHALLENGE",heroTitle:'Crack the <span>secret</span>.',heroText:"A few emojis. One hidden message. Can you decode it?",tabPlay:"Play",tabCreate:"Create",tabHow:"How to play",dailyLabel:"TODAY'S PUZZLE",dailyTitle:"Daily Secret",unsolved:"Ready to solve?",easy:"EASY",prompt:"What is the hidden phrase?",check:"Check answer",hint:"Hint",reveal:"Reveal",share:"Share",streak:"Day streak",solved:"Solved",best:"Best score",creatorLabel:"MAKE YOUR OWN",creatorTitle:"Create a secret",emojiLabel:"Your emoji clue",answerLabel:"Secret answer",hintLabel:"Optional hint",createShare:"Create & share challenge",privacyNote:"Your custom puzzle is prepared on this device. Sharing creates a link; no account is needed.",guideLabel:"QUICK GUIDE",guideTitle:"How it works",guide1Title:"Read the emojis",guide1Text:"Combine the emojis to discover a phrase, title, or expression.",guide2Title:"Type your guess",guide2Text:"Submit your answer. Use a hint if you get stuck.",guide3Title:"Challenge friends",guide3Text:"Create your own puzzle and share its link with friends.",startPlaying:"Start playing",footer:"A tiny puzzle. A big secret.",placeholder:"Type your guess...",correct:"✨ Correct! You earned 10 points.",wrong:"Not quite. Try another answer!",hintUsed:"Hint: ",answerIs:"The answer is: ",needFields:"Add emojis and an answer first.",created:"Your challenge link is ready!",copied:"Link copied!",shareFailed:"Sharing is unavailable. Copy the link instead.",alreadySolved:"You already solved today's puzzle.",sharedTitle:"Can you solve my Emoji Secret?",sharedText:"Decode these emojis:",emptyAnswer:"Please type an answer first."},
  ar:{eyebrow:"تحدي الإيموجي اليومي",heroTitle:'اكشف <span>السر</span>.',heroText:"بعض الإيموجيات ورسالة مخفية. هل تستطيع فكّها؟",tabPlay:"العب",tabCreate:"أنشئ لغزاً",tabHow:"طريقة اللعب",dailyLabel:"لغز اليوم",dailyTitle:"السر اليومي",unsolved:"هل أنت مستعد؟",easy:"سهل",prompt:"ما هي العبارة المخفية؟",check:"تحقق من الإجابة",hint:"تلميح",reveal:"كشف الحل",share:"مشاركة",streak:"أيام متتالية",solved:"ألغاز محلولة",best:"أفضل نتيجة",creatorLabel:"اصنع لغزك",creatorTitle:"أنشئ سراً",emojiLabel:"الإيموجيات",answerLabel:"الإجابة السرية",hintLabel:"تلميح اختياري",createShare:"أنشئ وشارك التحدي",privacyNote:"يتم إعداد اللغز على هاتفك. المشاركة تنشئ رابطاً ولا تحتاج إلى حساب.",guideLabel:"دليل سريع",guideTitle:"كيف تعمل اللعبة؟",guide1Title:"اقرأ الإيموجيات",guide1Text:"اجمع معاني الرموز لاكتشاف عبارة أو عنوان أو تعبير.",guide2Title:"اكتب تخمينك",guide2Text:"أرسل الإجابة واستعمل تلميحاً إذا واجهتك صعوبة.",guide3Title:"تحدَّ أصدقاءك",guide3Text:"أنشئ لغزك الخاص وشارك رابطه مع أصدقائك.",startPlaying:"ابدأ اللعب",footer:"لغز صغير، سر كبير.",placeholder:"اكتب تخمينك...",correct:"✨ صحيح! ربحت 10 نقاط.",wrong:"ليس تماماً، حاول مرة أخرى!",hintUsed:"تلميح: ",answerIs:"الإجابة هي: ",needFields:"أضف الإيموجيات والإجابة أولاً.",created:"رابط التحدي جاهز!",copied:"تم نسخ الرابط!",shareFailed:"المشاركة غير متاحة. انسخ الرابط يدوياً.",alreadySolved:"لقد حللت لغز اليوم بالفعل.",sharedTitle:"هل تستطيع حل لغز الإيموجي الخاص بي؟",sharedText:"فك رموز هذه الإيموجيات:",emptyAnswer:"اكتب إجابتك أولاً."},
  fr:{eyebrow:"LE DÉFI EMOJI DU JOUR",heroTitle:'Percez le <span>secret</span>.',heroText:"Quelques emojis. Un message caché. Saurez-vous le décoder ?",tabPlay:"Jouer",tabCreate:"Créer",tabHow:"Comment jouer",dailyLabel:"ÉNIGME DU JOUR",dailyTitle:"Secret quotidien",unsolved:"Prêt à résoudre ?",easy:"FACILE",prompt:"Quel est le message caché ?",check:"Vérifier",hint:"Indice",reveal:"Révéler",share:"Partager",streak:"Jours de suite",solved:"Résolus",best:"Meilleur score",creatorLabel:"CRÉEZ LE VÔTRE",creatorTitle:"Créer un secret",emojiLabel:"Votre indice emoji",answerLabel:"Réponse secrète",hintLabel:"Indice facultatif",createShare:"Créer et partager",privacyNote:"Votre énigme est préparée sur cet appareil. Le partage crée un lien sans compte.",guideLabel:"GUIDE RAPIDE",guideTitle:"Comment ça marche",guide1Title:"Lisez les emojis",guide1Text:"Combinez les emojis pour trouver une phrase ou une expression.",guide2Title:"Écrivez votre réponse",guide2Text:"Validez votre réponse. Utilisez un indice si besoin.",guide3Title:"Défiez vos amis",guide3Text:"Créez votre énigme et partagez le lien avec vos amis.",startPlaying:"Commencer",footer:"Petite énigme, grand secret.",placeholder:"Votre réponse...",correct:"✨ Bravo ! Vous gagnez 10 points.",wrong:"Pas tout à fait. Réessayez !",hintUsed:"Indice : ",answerIs:"La réponse est : ",needFields:"Ajoutez les emojis et la réponse.",created:"Votre lien est prêt !",copied:"Lien copié !",shareFailed:"Partage indisponible. Copiez le lien.",alreadySolved:"Vous avez déjà résolu l'énigme du jour.",sharedTitle:"Pouvez-vous résoudre mon Emoji Secret ?",sharedText:"Décodez ces emojis :",emptyAnswer:"Veuillez écrire une réponse."}
};
Object.assign(translations.en,{cat_riddle:"Riddles",cat_emoji:"Emoji",cat_quiz:"Quiz",cat_logic:"Logic",medium:"MEDIUM",hard:"HARD",next:"Next",alreadySolved:"You already solved this one.",dailyLabel:"PUZZLE"});
Object.assign(translations.ar,{cat_riddle:"ألغاز",cat_emoji:"إيموجي",cat_quiz:"أسئلة",cat_logic:"منطق",medium:"متوسط",hard:"صعب",next:"التالي",alreadySolved:"لقد حللت هذا اللغز من قبل.",dailyLabel:"لغز"});
Object.assign(translations.fr,{cat_riddle:"Devinettes",cat_emoji:"Emoji",cat_quiz:"Quiz",cat_logic:"Logique",medium:"MOYEN",hard:"DIFFICILE",next:"Suivant",alreadySolved:"Vous avez déjà résolu celle-ci.",dailyLabel:"ÉNIGME"});
Object.assign(translations.en,{cat_daily:"Daily",cat_picture:"Pictures",comeBack:"Come back tomorrow for a new challenge!"});
Object.assign(translations.ar,{cat_daily:"تحدي اليوم",cat_picture:"صور",comeBack:"عُد غداً لتحدٍّ جديد!"});
Object.assign(translations.fr,{cat_daily:"Défi du jour",cat_picture:"Images",comeBack:"Revenez demain pour un nouveau défi !"});
// Puzzle format: languages separated by "~" (en~ar~fr), alternative answers by "|".
// q=question, e=emojis, a=accepted answers, o=quiz options (first one is correct), h=hint, c=category, l=level 1-3
const CATS={daily:"📅",riddle:"🧩",emoji:"😂",quiz:"❓",logic:"🧠",picture:"🖼️"};
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
{c:"logic",l:3,q:"3 cats catch 3 mice in 3 minutes. How many minutes do 100 cats need to catch 100 mice?~تصطاد 3 قطط 3 فئران في 3 دقائق. كم دقيقة تحتاج 100 قطة لاصطياد 100 فأر؟~3 chats attrapent 3 souris en 3 minutes. Combien de minutes faut-il à 100 chats pour attraper 100 souris ?",a:"3",h:"Each cat catches one mouse in 3 minutes.~كل قطة تصطاد فأراً في 3 دقائق.~Chaque chat attrape une souris en 3 minutes."},
{c:"riddle",l:1,q:"What has four legs but cannot walk?~ما الشيء الذي له أربع أرجل ولا يمشي؟~Qu'est-ce qui a quatre pieds mais ne marche pas ?",a:"table|a table|chair~طاولة|مائدة|منضدة|كرسي~table|une table|chaise",h:"You eat on it.~نأكل عليها.~On mange dessus."},
{c:"riddle",l:1,q:"What gets wetter the more it dries?~ما الشيء الذي يبتل أكثر كلما جفّف؟~Qu'est-ce qui devient plus mouillé en séchant ?",a:"towel|a towel~منشفة|المنشفة|فوطة~serviette|une serviette",h:"Used after a shower.~تُستعمل بعد الاستحمام.~On l'utilise après la douche."},
{c:"riddle",l:1,q:"What has an eye but cannot see?~ما الشيء الذي له عين ولا يرى؟~Qu'est-ce qui a un œil mais ne voit pas ?",a:"needle|a needle~إبرة|الإبرة|ابرة~aiguille|une aiguille",h:"Used for sewing.~تُستعمل في الخياطة.~Elle sert à coudre."},
{c:"riddle",l:2,q:"What has keys but cannot open locks?~ما الشيء الذي له مفاتيح ولا يفتح الأبواب؟~Qu'est-ce qui a des touches mais n'ouvre aucune porte ?",a:"piano|keyboard|a piano~بيانو|لوحة المفاتيح|البيانو|كيبورد~piano|clavier|un piano",h:"You can play music on it.~يمكنك العزف عليه.~On peut en jouer."},
{c:"riddle",l:2,q:"What goes up but never comes down?~ما الذي يرتفع ولا ينزل أبداً؟~Qu'est-ce qui monte toujours sans jamais descendre ?",a:"age|your age~العمر|عمرك|السن~âge|l'âge",h:"Every birthday makes it bigger.~كل عيد ميلاد يزيده.~Chaque anniversaire l'augmente."},
{c:"riddle",l:2,q:"What can run but never walks?~ما الشيء الذي يجري ولا يمشي؟~Qu'est-ce qui court mais ne marche jamais ?",a:"river|a river|water~نهر|النهر|ماء|الماء|وادي~rivière|fleuve|eau",h:"It flows to the sea.~يصب في البحر.~Il coule vers la mer."},
{c:"riddle",l:3,q:"The more of it there is, the less you see. What is it?~كلما زاد، قلّ ما ترى. ما هو؟~Plus il y en a, moins vous voyez. Qu'est-ce que c'est ?",a:"darkness|dark|the dark~الظلام|ظلام|العتمة~obscurité|noirceur|ténèbres",h:"It comes at night.~يأتي في الليل.~Elle vient la nuit."},
{c:"riddle",l:3,q:"What has cities but no houses, forests but no trees, and water but no fish?~ما الشيء الذي فيه مدن بلا بيوت وغابات بلا أشجار وبحار بلا أسماك؟~Qu'est-ce qui a des villes sans maisons, des forêts sans arbres et de l'eau sans poissons ?",a:"map|a map~خريطة|الخريطة|خارطة~carte|une carte|la carte",h:"You use it to find your way.~تستعمله لتجد طريقك.~On s'en sert pour s'orienter."},
{c:"riddle",l:3,q:"What belongs to you but others use it more than you?~ما الشيء الذي هو لك لكن الآخرين يستعملونه أكثر منك؟~Qu'est-ce qui est à vous mais que les autres utilisent plus que vous ?",a:"name|your name~اسمك|الاسم|اسم~nom|votre nom|prénom",h:"People call you by it.~ينادونك به.~On vous appelle ainsi."},
{c:"emoji",l:1,e:"🍎 🌳",a:"apple tree~شجرة التفاح|شجرة تفاح~pommier|arbre à pommes",h:"A tree with red fruit.~شجرة بثمار حمراء.~Un arbre aux fruits rouges."},
{c:"emoji",l:1,e:"☀️ 🏖️",a:"beach|sunny beach|summer~شاطئ|الشاطئ|البحر|الصيف~plage|la plage|été",h:"Where you swim in summer.~حيث تسبح في الصيف.~Où l'on nage en été."},
{c:"emoji",l:1,e:"🐶 🦴",a:"dog bone|bone~عظمة الكلب|كلب وعظمة|عظمة~os de chien|chien et os",h:"A dog's favorite snack.~وجبة الكلب المفضلة.~La friandise préférée du chien."},
{c:"emoji",l:2,e:"📚 🎓 🏫",a:"school|education|study~مدرسة|المدرسة|تعليم|دراسة~école|éducation|études",h:"Where students learn.~حيث يتعلم الطلاب.~Là où les élèves apprennent."},
{c:"emoji",l:2,e:"🌙 ⭐ 😴",a:"good night|sleep|bedtime~تصبح على خير|نوم|وقت النوم~bonne nuit|dormir|sommeil",h:"What you say before bed.~ما تقوله قبل النوم.~Ce que l'on dit avant de dormir."},
{c:"emoji",l:2,e:"🍕 🎬 👨‍👩‍👧",a:"family movie night|movie night~سهرة فيلم عائلية|سهرة عائلية|ليلة فيلم~soirée cinéma en famille|soirée film",h:"Pizza, a film and family.~بيتزا وفيلم وعائلة.~Pizza, film et famille."},
{c:"emoji",l:3,e:"🧠 💡 ⚡",a:"brainstorm|brainstorming|great idea|idea~عصف ذهني|فكرة عبقرية|فكرة~remue-méninges|idée de génie|idée",h:"A bright thought.~فكرة مشرقة.~Une pensée brillante."},
{c:"emoji",l:3,e:"🐢 🐇 🏁",a:"the tortoise and the hare|tortoise and hare~السلحفاة والأرنب|الأرنب والسلحفاة~le lièvre et la tortue|la tortue et le lièvre",h:"A famous fable about a race.~حكاية مشهورة عن سباق.~Une fable célèbre sur une course."},
{c:"emoji",l:3,e:"🕷️ 🌐",a:"spider web|spiderweb|website|web~شبكة العنكبوت|الإنترنت|عنكبوت~toile d'araignée|toile|site web",h:"Two meanings, one is online.~له معنيان أحدهما على الإنترنت.~Deux sens, l'un en ligne."},
{c:"quiz",l:1,q:"What color do you get by mixing blue and yellow?~ما اللون الناتج عن مزج الأزرق والأصفر؟~Quelle couleur obtient-on en mélangeant bleu et jaune ?",o:"Green|Red|Purple~الأخضر|الأحمر|البنفسجي~Vert|Rouge|Violet",h:"Like grass.~مثل العشب.~Comme l'herbe."},
{c:"quiz",l:1,q:"How many legs does a spider have?~كم عدد أرجل العنكبوت؟~Combien de pattes une araignée a-t-elle ?",o:"8|6|10",h:"More than an insect.~أكثر من الحشرة.~Plus qu'un insecte."},
{c:"quiz",l:1,q:"Which animal is called the king of the jungle?~أي حيوان يُلقّب بملك الغابة؟~Quel animal est appelé le roi de la jungle ?",o:"Lion|Tiger|Elephant~الأسد|النمر|الفيل~Lion|Tigre|Éléphant",h:"It has a big mane.~له عرف كبير.~Il a une grande crinière."},
{c:"quiz",l:2,q:"How many continents are there?~كم عدد قارات العالم؟~Combien y a-t-il de continents ?",o:"7|5|9",h:"Asia is the largest.~آسيا أكبرها.~L'Asie est la plus grande."},
{c:"quiz",l:2,q:"Which is the longest river in Africa?~ما هو أطول نهر في أفريقيا؟~Quel est le plus long fleuve d'Afrique ?",o:"Nile|Congo|Niger~النيل|الكونغو|النيجر~Nil|Congo|Niger",h:"It flows through Egypt.~يمر عبر مصر.~Il traverse l'Égypte."},
{c:"quiz",l:2,q:"How many players does a football team have on the pitch?~كم لاعباً في فريق كرة القدم داخل الملعب؟~Combien de joueurs a une équipe de football sur le terrain ?",o:"11|10|12",h:"Goalkeeper included.~بما فيهم حارس المرمى.~Gardien compris."},
{c:"quiz",l:3,q:"What is the chemical symbol for gold?~ما الرمز الكيميائي للذهب؟~Quel est le symbole chimique de l'or ?",o:"Au|Ag|Go",h:"From the Latin word aurum.~من الكلمة اللاتينية أوروم.~Du mot latin aurum."},
{c:"quiz",l:3,q:"What is the smallest prime number?~ما هو أصغر عدد أولي؟~Quel est le plus petit nombre premier ?",o:"2|1|3",h:"It is also even.~وهو زوجي أيضاً.~Il est aussi pair."},
{c:"quiz",l:3,q:"Who wrote the Muqaddimah?~من كتب «المقدمة»؟~Qui a écrit la Muqaddima ?",o:"Ibn Khaldun|Ibn Battuta|Ibn Sina~ابن خلدون|ابن بطوطة|ابن سينا~Ibn Khaldoun|Ibn Battuta|Avicenne",h:"A founder of sociology.~من مؤسسي علم الاجتماع.~Un fondateur de la sociologie."},
{c:"logic",l:1,q:"What is 5 + 6?~ما ناتج 5 + 6؟~Combien font 5 + 6 ?",a:"11",h:"Count up from 5.~عُدّ من 5.~Comptez à partir de 5."},
{c:"logic",l:1,q:"What comes next? 5, 10, 15, 20, ?~ما العدد التالي؟ 5، 10، 15، 20، ؟~Quel nombre vient ensuite ? 5, 10, 15, 20, ?",a:"25",h:"Add 5 each time.~أضف 5 في كل مرة.~Ajoutez 5 à chaque fois."},
{c:"logic",l:1,q:"How many sides does a triangle have?~كم ضلعاً للمثلث؟~Combien de côtés a un triangle ?",a:"3",h:"The name hints at the number.~الاسم يوحي بالعدد.~Le nom indique le nombre."},
{c:"logic",l:2,q:"What is 12 × 3?~ما ناتج 12 × 3؟~Combien font 12 × 3 ?",a:"36",h:"10 × 3 plus 2 × 3.~10 × 3 زائد 2 × 3.~10 × 3 plus 2 × 3."},
{c:"logic",l:2,q:"A trip starts at 2 o'clock and lasts 3 hours. At what hour does it end?~تبدأ رحلة عند الساعة 2 وتدوم 3 ساعات. عند أي ساعة تنتهي؟~Un trajet commence à 2 h et dure 3 heures. À quelle heure finit-il ?",a:"5",h:"Add the hours.~اجمع الساعات.~Additionnez les heures."},
{c:"logic",l:2,q:"What comes next? 1, 4, 9, 16, ?~ما العدد التالي؟ 1، 4، 9، 16، ؟~Quel nombre vient ensuite ? 1, 4, 9, 16, ?",a:"25",h:"Perfect squares.~مربعات الأعداد.~Les carrés parfaits."},
{c:"logic",l:3,q:"What comes next? 2, 3, 5, 7, 11, ?~ما العدد التالي؟ 2، 3، 5، 7، 11، ؟~Quel nombre vient ensuite ? 2, 3, 5, 7, 11, ?",a:"13",h:"Prime numbers.~الأعداد الأولية.~Les nombres premiers."},
{c:"logic",l:3,q:"I am a number. Double me and add 6 to get 20. What am I?~أنا عدد. إذا ضاعفتني وأضفت 6 أحصل على 20. ما هو العدد؟~Je suis un nombre. Doublez-moi et ajoutez 6 pour obtenir 20. Quel est ce nombre ?",a:"7",h:"Work backwards.~ابدأ من النتيجة.~Partez du résultat."},
{c:"logic",l:3,q:"A bat and a ball cost 110 cents. The bat costs 100 cents more than the ball. How many cents is the ball?~مضرب وكرة يكلفان معاً 110 سنتات. المضرب أغلى من الكرة بـ 100 سنت. كم سنتاً تكلف الكرة؟~Une batte et une balle coûtent 110 centimes. La batte coûte 100 centimes de plus que la balle. Combien de centimes coûte la balle ?",a:"5",h:"It is not 10.~ليس 10.~Ce n'est pas 10."}
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
function hintOf(p){return p.shared?(p.h||"Think about the emojis."):(p.h?L(p.h):"")}
function list(){return puzzles.filter(p=>p.c===cat&&p.l===lvl)}
function save(){localStorage.setItem("es_state",JSON.stringify(state));renderStats()}
function renderStats(){$("points").textContent=state.points;$("solved").textContent=state.solved;$("best").textContent=state.best;$("streak").textContent=state.streak}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)}
function applyLanguage(){document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.querySelectorAll("[data-i18n]").forEach(el=>{el.innerHTML=t(el.dataset.i18n)});$("language").value=lang;$("answerInput").placeholder=t("placeholder")}
function setView(view){["play","create","how"].forEach(v=>{$(v+"View").classList.toggle("hidden",v!==view)});document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.view===view))}
function getPuzzle(){const p=new URLSearchParams(location.search);if(p.has("p")){try{const obj=JSON.parse(decodeURIComponent(escape(atob(p.get("p")))));if(obj.e&&obj.a)return obj}catch(e){}}return null}
const PC=["#a78bfa","#e879f9","#65e6b1","#ffd166","#ff8eaa"],PS=["circle","square","triangle","star"];
const R=n=>Math.floor(Math.random()*n),shuf=a=>a.sort(()=>Math.random()-.5);
const PQ={count:"Count the shapes identical to the one in the box.~عدّ الأشكال المطابقة للشكل داخل الإطار.~Comptez les formes identiques à celle du cadre.",odd:"Tap the odd one out.~المس العنصر المختلف.~Touchez l'intrus."};
function shp(s,x,y,r,c,ex=""){
 if(s==="circle")return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${ex}/>`;
 if(s==="square")return `<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" rx="4" fill="${c}" ${ex}/>`;
 const pts=s==="triangle"?[0,1,2].map(i=>[x+r*1.15*Math.sin(i*2.094),y-r*1.15*Math.cos(i*2.094)]):[...Array(10)].map((_,i)=>{const q=i%2?r*.45:r*1.15,a=i*.628;return[x+q*Math.sin(a),y-q*Math.cos(a)]});
 return `<polygon points="${pts.map(p=>p.map(v=>v.toFixed(1)).join(",")).join(" ")}" fill="${c}" ${ex}/>`;
}
function genPic(l){
 const s=PS[R(4)],c=PC[R(5)];
 if(Math.random()<.5){
  const n=2+R(3)+l,d=3+l*3,cells=shuf([...Array(24).keys()]);
  let svg=`<svg viewBox="0 0 300 220"><rect x="6" y="6" width="44" height="44" rx="8" fill="none" stroke="#a78bfa" stroke-width="2"/>${shp(s,28,28,13,c)}`;
  for(let i=0;i<n+d;i++){const k=cells[i];let s2=s,c2=c;if(i>=n){do{s2=PS[R(4)];c2=PC[R(5)]}while(s2===s&&c2===c)}svg+=shp(s2,30+(k%6)*48+R(8),70+Math.floor(k/6)*36,12,c2)}
  return {c:"picture",l,k:"count",img:svg+"</svg>",q:PQ.count,o:[n,n+1,n-1].join("|")};
 }
 const odd=R(18);let s2=s,c2=c,ex="";
 if(l===1){do{s2=PS[R(4)]}while(s2===s)}else if(l===2){do{c2=PC[R(5)]}while(c2===c)}else ex='opacity=".7"';
 let svg='<svg viewBox="0 0 300 200">';
 for(let i=0;i<18;i++){const x=28+(i%6)*48,y=40+Math.floor(i/6)*56,o=i===odd;svg+=`<g data-i="${i+1}" style="cursor:pointer"><rect x="${x-24}" y="${y-24}" width="48" height="48" fill="transparent"/>${shp(o?s2:s,x,y,14,o?c2:c,o?ex:"")}</g>`}
 return {c:"picture",l,k:"odd",img:svg+"</svg>",q:PQ.odd,a:String(odd+1)};
}
function dailyList(){let seed=+todayKey.replace(/-/g,"");const rnd=()=>(seed=(seed*1664525+1013904223)%4294967296)/4294967296;return puzzles.map(p=>[rnd(),p]).sort((a,b)=>a[0]-b[0]).slice(0,5).map(x=>x[1])}
function dailySummary(){const r=state.daily.r,sc=r.filter(Boolean).length,sq=r.map(x=>x?"🟩":"🟥").join("");
 $("pic").innerHTML=`<div class="sum"><div class="big">${sc}/5</div><div>${sq}</div><button class="primary-btn" id="shareRes">↗ ${t("share")}</button><p>${t("comeBack")}</p></div>`;
 $("shareRes").onclick=()=>shareText(`Emoji Secret 🤫 ${todayKey}\n${sc}/5 ${sq}`,location.origin+location.pathname)}
function award(pts,id){state.points+=pts;state.solved+=1;state.best=Math.max(state.best,state.points);if(state.lastSolved!==todayKey){state.streak=state.lastSolved===yesterdayKey?state.streak+1:1;state.lastSolved=todayKey}if(id>=0)state.done.push(id);save()}
function renderFilters(){
 $("lvlChips").classList.toggle("hidden",cat==="daily");
 $("catChips").innerHTML=Object.keys(CATS).map(c=>`<button class="chip${c===cat&&!activeShared?" on":""}" data-c="${c}">${CATS[c]} ${t("cat_"+c)}</button>`).join("");
 $("lvlChips").innerHTML=[1,2,3].map(l=>`<button class="chip${l===lvl&&!activeShared?" on":""}" data-l="${l}">${t(["easy","medium","hard"][l-1])}</button>`).join("");
}
function showPuzzle(){
 activeShared=sharedMode?getPuzzle():null;let done=false;
 if(activeShared){cur={c:"emoji",l:1,shared:1,e:activeShared.e,a:activeShared.a,h:activeShared.h};$("puzzleNumber").textContent="FRIEND"}
 else if(cat==="picture"){cur=genPic(lvl);$("puzzleNumber").textContent="∞"}
 else if(cat==="daily"){const dl=dailyList();if(!state.daily||state.daily.d!==todayKey)state.daily={d:todayKey,r:[]};const k=state.daily.r.length;done=k>=5;cur=dl[Math.min(k,4)];$("puzzleNumber").textContent=Math.min(k+1,5)+"/5"}
 else{const ls=list();cur=ls[pos%ls.length];$("puzzleNumber").textContent=(pos%ls.length+1)+"/"+ls.length}
 renderFilters();
 $("catTitle").textContent=t("cat_"+(cat==="daily"&&!activeShared?"daily":cur.c));$("diff").textContent=t(["easy","medium","hard"][cur.l-1]);
 $("pic").innerHTML=cur.img||"";$("pic").classList.toggle("hidden",!cur.img&&!done);
 $("emojiLine").classList.toggle("hidden",!!cur.img||done);
 $("emojiLine").textContent=cur.e||CATS[cur.c];$("emojiLine").classList.toggle("small",!cur.e);
 $("qText").textContent=done?"":cur.q?L(cur.q):"";
 $("prompt").classList.toggle("hidden",cur.c!=="emoji"||done);
 $("answerForm").classList.toggle("hidden",!!cur.o||cur.k==="odd"||done);
 const box=$("options");box.innerHTML="";
 if(cur.o&&!done)L(cur.o).split("|").sort(()=>Math.random()-.5).forEach(o=>{const b=document.createElement("button");b.className="opt";b.textContent=o;b.onclick=()=>checkAnswer(o,b);box.appendChild(b)});
 $("answerInput").value="";$("answerInput").disabled=false;$("answerForm").querySelector("button").disabled=false;
 $("hintText").textContent="";feedback("");
 if(done)dailySummary();
}
function feedback(msg,kind=""){$("feedback").textContent=msg;$("feedback").className="feedback "+kind}
function checkAnswer(value,btn){
 if(!value.trim()){feedback(t("emptyAnswer"),"bad");return}
 const id=puzzles.indexOf(cur),daily=cat==="daily"&&!cur.shared;
 if(daily&&state.daily.r.length>=5)return;
 if(!daily&&!cur.shared&&id>=0&&state.done.includes(id)){feedback(t("alreadySolved"));return}
 const ok=accepted(cur).some(a=>normalize(a)===normalize(value));
 const pts=(cur.c==="picture"?5:10)*cur.l;
 const lock=()=>{$("answerInput").disabled=true;$("answerForm").querySelector("button").disabled=true;document.querySelectorAll(".opt").forEach(b=>b.disabled=true)};
 if(daily){const fresh=ok&&!state.done.includes(id);state.daily.r.push(ok);if(fresh)award(pts,id);else save();feedback(ok?t("correct").replace("10",fresh?pts:0):t("answerIs")+shown(cur),ok?"good":"bad");lock();setTimeout(showPuzzle,1500);return}
 if(!ok){feedback(t("wrong"),"bad");if(btn){btn.classList.add("bad");btn.disabled=true}return}
 feedback(t("correct").replace("10",pts),"good");
 if(btn)btn.classList.add("good");
 if(!cur.shared)award(pts,id);
 lock();
 if(cat==="picture")setTimeout(()=>{pos++;showPuzzle()},1100);
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
$("pic").addEventListener("click",e=>{const g=e.target.closest("[data-i]");if(g&&cur&&cur.k==="odd")checkAnswer(g.dataset.i)});
applyLanguage();renderStats();showPuzzle();
