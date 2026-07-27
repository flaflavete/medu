/* Curso de Hieróglifos (rebuild) — fonte única de dados das lições.
   Consumida pelo índice (index.html) e pelo motor (licao.html via curso.js).
   Acaba com a duplicação tripla do curso antigo: cada lição é dados, não HTML.

   Modelo de uma lição:
   {
     id, num, glyph,
     ready: true,                      // false = ainda não construída (aparece bloqueada no índice)
     kicker, title, desc, dur, type,   // {pt,en} — usados no índice e no hero
     badge, badgeClass,                // selo do índice
     intro,                            // {pt,en} — parágrafo do hero da lição
     sections: [ { title:{pt,en}, blocks:[...] } ],
     quiz: { glyph, question, options:[{label,correct}], feedbackOk, feedbackErr }
   }

   Tipos de bloco (kind):
   - 'p'          { html:{pt,en} }                         parágrafo (HTML inline permitido)
   - 'callout'    { variant:'gold'|'azul', html:{pt,en} }  destaque
   - 'signtypes'  { cards:[{badge,variant,glyph,title,desc}] }
   - 'word'       { label:{pt,en}, signs:[{glyph,id,phon,type,tip}], result?, note }
   - 'direction'  { rows:[{label,glyphs,rtl,arrow}] }
   Exemplos extraídos de vocabulário padrão e bem atestado (Gardiner/Faulkner). */

window.CURSO_LICOES = [
  {
    id: 'sistema',
    num: 1,
    glyph: '𓁹',
    ready: true,
    kicker: { pt: 'Lição 1 · Fundamentos', en: 'Lesson 1 · Foundations' },
    title:  { pt: 'Como funciona a escrita egípcia', en: 'How Egyptian writing works' },
    desc:   { pt: 'Entenda os três tipos de sinais (fonéticos, logogramas, determinativos) e a lógica do sistema antes de qualquer símbolo.', en: 'Understand the three types of signs (phonetic, logogram, determinative) and the logic of the system before any individual symbol.' },
    dur:    { pt: '~10 min', en: '~10 min' },
    type:   { pt: 'Teoria', en: 'Theory' },
    badge:  { pt: 'Começar aqui', en: 'Start here' },
    badgeClass: 'badge-start',
    intro:  { pt: 'A escrita hieroglífica não é um simples alfabeto, pois combina três tipos de sinais de formas que, uma vez compreendidas, tornam tudo mais fácil.', en: 'Hieroglyphic writing is not a simple alphabet; it combines three types of signs in ways that, once understood, make everything much easier.' },
    sections: [
      {
        title: { pt: 'Hieróglifos não são letras', en: 'Hieroglyphs are not letters' },
        blocks: [
          { kind: 'p', html: { pt: 'O nome <em>hieróglifo</em> vem do grego: <em>hieros</em> (sagrado) + <em>glyphe</em> (gravura). Os próprios egípcios chamavam sua escrita de <strong>mdw nṯr</strong>, que significa "palavras de deus".', en: 'The name <em>hieroglyph</em> comes from Greek: <em>hieros</em> (sacred) + <em>glyphe</em> (carving). The Egyptians themselves called their writing <strong>mdw nṯr</strong>, meaning "words of god".' } },
          { kind: 'p', html: { pt: 'Diferente do nosso alfabeto, onde cada letra representa um som, os hieróglifos funcionam em três camadas ao mesmo tempo. Um sinal pode representar um <strong>som</strong>, uma <strong>palavra inteira</strong> ou simplesmente <strong>categorizar</strong> o que veio antes, sem ter som próprio.', en: 'Unlike our alphabet, where each letter represents a sound, hieroglyphs work on three levels at once. A sign can represent a <strong>sound</strong>, an <strong>entire word</strong>, or simply <strong>categorize</strong> what came before, without having a sound of its own.' } },
          { kind: 'callout', variant: 'gold', html: { pt: 'Imagine que no português, a palavra "sol" pudesse ser escrita de três maneiras. Com o desenho de um sol ☀ (lógico), com as letras S-O-L (fonético), ou com um sol sem som para classificar algo luminoso (determinativo). Os egípcios misturavam tudo isso.', en: 'Imagine that in English, the word "sun" could be written three ways. With a drawing of a sun ☀ (logographic), with the letters S-U-N (phonetic), or with a silent sun to classify something luminous (determinative). The Egyptians mixed all of these.' } },
        ],
      },
      {
        title: { pt: 'Os três tipos de sinais', en: 'The three types of signs' },
        blocks: [
          { kind: 'signtypes', cards: [
            { badge: { pt: 'Fonéticos', en: 'Phonetic' }, variant: 'uni', glyph: '𓄿', title: { pt: 'Sinais fonéticos', en: 'Phonetic signs' }, desc: { pt: 'Representam sons de uma, duas ou três consoantes. São como as letras do nosso alfabeto.', en: 'Represent one, two, or three consonants. They function like the letters of our alphabet.' } },
            { badge: { pt: 'Logograma', en: 'Logogram' }, variant: 'bi', glyph: '𓇳', title: { pt: 'Logogramas', en: 'Logograms' }, desc: { pt: 'Representam a palavra inteira pelo próprio desenho. O sol 𓇳 pode simplesmente significar "sol" ou "dia".', en: 'Represent an entire word through the picture itself. The sun 𓇳 can simply mean "sun" or "day".' } },
            { badge: { pt: 'Determinativo', en: 'Determinative' }, variant: 'det', glyph: '𓀀', title: { pt: 'Determinativos', en: 'Determinatives' }, desc: { pt: 'Não têm som. Aparecem no final de palavras para indicar a categoria semântica (animal, pessoa, deus, ação).', en: 'Have no sound. They appear at the end of words to indicate the semantic category (animal, person, god, action).' } },
          ] },
          { kind: 'p', html: { pt: 'É muito comum uma palavra egípcia combinar sinais fonéticos (para soletrar) com um determinativo no final (para classificar). Isso ajudava a diferenciar palavras que soariam igual.', en: 'It is very common for an Egyptian word to combine phonetic signs (for spelling) with a determinative at the end (for classification). This helped distinguish words that would sound alike.' } },
          { kind: 'foto', src: '../assets/photos/dendera.jpg',
            alt: { pt: 'Bloco de calcário com o nome da deusa Hathor: um falcão dentro de um recinto retangular.', en: 'Limestone block with the name of the goddess Hathor: a falcon inside a rectangular enclosure.' },
            caption: { pt: 'O nome da deusa <em>Hathor</em> (<em>Ḥwt-Ḥr</em>, "Casa de Hórus"), escrito com o falcão de Hórus dentro do recinto <em>ḥwt</em>, "casa". O nome é, ao pé da letra, um desenho com significado.', en: 'The name of the goddess <em>Hathor</em> (<em>Ḥwt-Ḥr</em>, "House of Horus"), written with the Horus falcon inside the <em>ḥwt</em> enclosure, "house". The name is, quite literally, a picture with meaning.' },
            credit: { pt: 'Foto: Flavia Lima Corpas · Templo de Dendera, Qena', en: 'Photo: Flavia Lima Corpas · Temple of Dendera, Qena' } },
        ],
      },
      {
        title: { pt: 'Veja na prática: a palavra <em>nfr</em>', en: 'See it in practice: the word <em>nfr</em>' },
        blocks: [
          { kind: 'p', html: { pt: 'A palavra <strong>nfr</strong> (pronunciada aproximadamente "nefer") significa "belo, bom, perfeito". É uma das mais comuns em textos egípcios. Veja como ela é escrita:', en: 'The word <strong>nfr</strong> (pronounced approximately "nefer") means "beautiful, good, perfect". It is one of the most common in Egyptian texts. See how it is written:' } },
          { kind: 'word', label: { pt: 'Passe o mouse sobre o sinal', en: 'Hover over the sign' },
            signs: [
              { glyph: '𓄤', id: 'F35', phon: 'nfr', type: 'bi', typeLabel: { pt: 'trilítero', en: 'triliteral' }, tip: { pt: '𓄤 nfr, coração com traqueia · representa as três consoantes N-F-R', en: '𓄤 nfr, heart with trachea · represents the three consonants N-F-R' } },
            ],
            note: { pt: 'Neste caso, um único sinal, o coração com traqueia, que representa as três consoantes <em>nfr</em> de uma vez. É um <strong>trilítero</strong>.', en: 'In this case, a single sign, the heart with trachea, represents the three consonants <em>nfr</em> at once. It is a <strong>triliteral</strong>.' } },
          { kind: 'p', html: { pt: 'Mas o egípcio frequentemente adiciona sinais complementares para reforçar a leitura:', en: 'But Egyptian frequently adds complementary signs to reinforce the reading:' } },
          { kind: 'word', label: { pt: 'Escrita completa de nfr', en: 'Full writing of nfr' },
            signs: [
              { glyph: '𓄤', id: 'F35', phon: 'nfr', type: 'bi', typeLabel: { pt: 'trilítero', en: 'triliteral' }, tip: { pt: '𓄤 nfr, o sinal principal (três consoantes de uma vez)', en: '𓄤 nfr, the main sign (three consonants at once)' } },
              { glyph: '𓆑', id: 'I9', phon: 'f', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓆑 f, cobra cornuda · confirma o som F de nfr', en: '𓆑 f, horned viper · confirms the F sound of nfr' } },
              { glyph: '𓂋', id: 'D21', phon: 'r', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓂋 r, boca · confirma o som R de nfr', en: '𓂋 r, mouth · confirms the R sound of nfr' } },
            ],
            result: '𓄤𓆑𓂋',
            note: { pt: 'Os sinais 𓆑 (f) e 𓂋 (r) são <strong>complementos fonéticos</strong> que não adicionam novos sons, apenas confirmam a leitura do sinal principal. É como se o egípcio "soletrasse" parte da palavra novamente para não deixar dúvida.', en: 'The signs 𓆑 (f) and 𓂋 (r) are <strong>phonetic complements</strong> that add no new sounds; they only confirm the reading of the main sign. It is as if Egyptian "spelled out" part of the word again to leave no doubt.' } },
          { kind: 'callout', variant: 'azul', html: { pt: 'A <strong>regra prática</strong> é simples. Quando um sinal principal vem seguido de outros sinais cujos sons ele já carrega, esses sinais são complementos fonéticos; leia o sinal principal uma vez e não repita os sons.', en: 'The <strong>practical rule</strong> is simple. When a main sign is followed by other signs whose sounds it already carries, those signs are phonetic complements; read the main sign once and do not repeat the sounds.' } },
        ],
      },
      {
        title: { pt: 'Direção da leitura', en: 'Reading direction' },
        blocks: [
          { kind: 'p', html: { pt: 'Os hieróglifos podem ser escritos da direita para a esquerda, da esquerda para a direita, ou de cima para baixo. Como saber para onde ler?', en: 'Hieroglyphs can be written from right to left, from left to right, or from top to bottom. How do you know which way to read?' } },
          { kind: 'p', html: { pt: '<strong>Observe os animais e pessoas.</strong> Eles sempre olham para o início da linha. A direção que os rostos encaram é por onde você começa a ler.', en: '<strong>Observe the animals and people.</strong> They always face the beginning of the line. The direction the faces are looking is where you start reading.' } },
          { kind: 'direction', rows: [
            { label: { pt: '← direita p/ esquerda', en: '← right to left' }, glyphs: '𓀀𓂋𓈖', rtl: true, arrow: { pt: '←', en: '←' } },
            { label: { pt: '→ esquerda p/ direita', en: '→ left to right' }, glyphs: '𓀀𓂋𓈖', rtl: false, arrow: { pt: '→', en: '→' } },
          ] },
          { kind: 'p', html: { pt: 'Seja em textos religiosos e monumentais ou em papiros e textos cotidianos, a direção variava. O importante é seguir <strong>sempre os rostos.</strong>', en: 'Whether in religious and monumental texts or in papyri and everyday texts, the direction varied. The important thing is to always follow <strong>the faces.</strong>' } },
          { kind: 'foto', src: '../assets/photos/estela1.jpeg',
            alt: { pt: 'Estela de calcário com um homem sentado diante de uma mesa de oferendas e linhas de hieróglifos.', en: 'Limestone stela with a seated man before an offering table and lines of hieroglyphs.' },
            caption: { pt: 'O dono da estela, <em>Tjenu</em>, está sentado <strong>virado para a direita</strong>. Por isso o texto se lê da direita para a esquerda, começando pelo lado para onde ele olha.', en: 'The stela owner, <em>Tjenu</em>, sits <strong>facing right</strong>. So the text reads from right to left, starting on the side he looks toward.' },
            credit: { pt: 'Foto: Cristina Brandão · Estela de Tjenu, Abydos · Grand Egyptian Museum', en: 'Photo: Cristina Brandão · Stela of Tjenu, Abydos · Grand Egyptian Museum' } },
        ],
      },
      {
        title: { pt: 'Vogais: onde estão?', en: 'Vowels: where are they?' },
        blocks: [
          { kind: 'p', html: { pt: 'O egípcio antigo, como o árabe e o hebraico, escrevia apenas as <strong>consoantes</strong>. As vogais eram omitidas e o leitor nativo as deduzia pelo contexto.', en: 'Ancient Egyptian, like Arabic and Hebrew, wrote only the <strong>consonants</strong>. Vowels were omitted and the native reader deduced them from context.' } },
          { kind: 'p', html: { pt: 'Isso significa que quando você lê <em>nfr</em>, não sabe ao certo como soava. Linguistas adicionam vogais convencionais (como <em>nefer</em>) para facilitar a pronúncia, mas essa não é a pronúncia original.', en: 'This means that when you read <em>nfr</em>, you do not know exactly how it sounded. Linguists add conventional vowels (such as <em>nefer</em>) to facilitate pronunciation, but that is not the original pronunciation.' } },
          { kind: 'callout', variant: 'gold', html: { pt: 'Na prática, não precisa se preocupar em pronunciar "certo". A comunidade de estudo usa <em>e</em> entre consoantes como convenção (<em>nefer</em>, <em>remen</em>). O foco real é reconhecer os sinais e as consoantes.', en: 'In practice, you do not need to worry about pronouncing it "correctly". The scholarly community uses <em>e</em> between consonants as a convention (<em>nefer</em>, <em>remen</em>). The real focus is on recognizing the signs and the consonants.' } },
        ],
      },
    ],
    quiz: [
      {
        glyph: '𓀀',
        question: { pt: 'Este sinal aparece ao final de uma palavra sem ter som próprio, apenas para indicar que a palavra é sobre uma pessoa. Que tipo de sinal é este?', en: 'This sign appears at the end of a word without having a sound of its own, only to indicate that the word is about a person. What type of sign is this?' },
        options: [
          { label: { pt: 'Unilítero (representa um único som)', en: 'Uniliteral (represents a single sound)' }, correct: false },
          { label: { pt: 'Logograma (representa a palavra "homem")', en: 'Logogram (represents the word "man")' }, correct: false },
          { label: { pt: 'Determinativo (classifica a palavra sem som)', en: 'Determinative (classifies the word without sound)' }, correct: true },
          { label: { pt: 'Complemento fonético (reforça a leitura)', en: 'Phonetic complement (reinforces the reading)' }, correct: false },
        ],
        feedbackOk: { pt: 'Exato! Determinativos não têm som; eles apenas classificam. O sinal de homem sentado 𓀀 é um dos determinativos mais comuns, podendo aparecer em palavras relacionadas a seres masculinos.', en: 'Exactly! Determinatives have no sound; they only classify. The seated man sign 𓀀 is one of the most common determinatives, and can appear in words related to male beings.' },
        feedbackErr: { pt: 'Não desta vez. Quando um sinal aparece sem som ao final de uma palavra para categorizar, ele é um determinativo.', en: 'Not this time. When a sign appears without sound at the end of a word to categorize, it is a determinative.' },
      },
      {
        glyph: '𓄤𓆑𓂋',
        question: { pt: 'Na escrita completa de "nfr" (𓄤𓆑𓂋), os sinais 𓆑 (f) e 𓂋 (r) vêm depois do sinal principal. Qual é a função deles?', en: 'In the full writing of "nfr" (𓄤𓆑𓂋), the signs 𓆑 (f) and 𓂋 (r) come after the main sign. What is their function?' },
        options: [
          { label: { pt: 'Acrescentam novos sons à palavra', en: 'They add new sounds to the word' }, correct: false },
          { label: { pt: 'Confirmam a leitura do sinal principal, sem somar sons', en: 'They confirm the reading of the main sign, without adding sounds' }, correct: true },
          { label: { pt: 'Classificam a categoria da palavra', en: 'They classify the word\'s category' }, correct: false },
          { label: { pt: 'Marcam o plural', en: 'They mark the plural' }, correct: false },
        ],
        feedbackOk: { pt: 'Isso. São complementos fonéticos: repetem sons que 𓄤 já carrega. Leia o sinal principal uma vez só, como nfr.', en: 'Right. They are phonetic complements: they repeat sounds 𓄤 already carries. Read the main sign once, as nfr.' },
        feedbackErr: { pt: 'Os complementos fonéticos 𓆑 (f) e 𓂋 (r) só confirmam a leitura de 𓄤 nfr; não acrescentam sons novos.', en: 'The phonetic complements 𓆑 (f) and 𓂋 (r) only confirm the reading of 𓄤 nfr; they add no new sounds.' },
      },
      {
        glyph: '𓅓',
        question: { pt: 'Você abre um papiro e não sabe por onde começar a ler. Qual é a pista mais confiável para descobrir a direção?', en: 'You open a papyrus and do not know where to start reading. What is the most reliable clue to find the direction?' },
        options: [
          { label: { pt: 'Começar sempre pela esquerda, como no português', en: 'Always start from the left, as in English' }, correct: false },
          { label: { pt: 'Olhar para onde as figuras de pessoas e animais estão voltadas', en: 'Look at which way the figures of people and animals face' }, correct: true },
          { label: { pt: 'Começar sempre de cima para baixo', en: 'Always start from top to bottom' }, correct: false },
          { label: { pt: 'Procurar o sinal maior da linha', en: 'Find the largest sign in the line' }, correct: false },
        ],
        feedbackOk: { pt: 'Exato. As figuras olham para o início da linha; siga os rostos e você acha por onde começar.', en: 'Exactly. The figures face the beginning of the line; follow the faces and you find where to start.' },
        feedbackErr: { pt: 'A direção variava. A pista certa são os rostos: pessoas e animais olham para o início da linha.', en: 'The direction varied. The right clue is the faces: people and animals look toward the beginning of the line.' },
      },
      {
        glyph: '𓄤',
        question: { pt: 'O egípcio escrevia só as consoantes. Quando lemos "nefer" para 𓄤 (nfr), o "e" é...', en: 'Egyptian wrote only consonants. When we read "nefer" for 𓄤 (nfr), the "e" is...' },
        options: [
          { label: { pt: 'A pronúncia exata reconstruída dos antigos egípcios', en: 'The exact reconstructed pronunciation of the ancient Egyptians' }, correct: false },
          { label: { pt: 'Uma convenção moderna para conseguirmos pronunciar a palavra', en: 'A modern convention so we can pronounce the word' }, correct: true },
          { label: { pt: 'Um hieróglifo de vogal que não foi escrito', en: 'A vowel hieroglyph that was left out' }, correct: false },
          { label: { pt: 'Um determinativo', en: 'A determinative' }, correct: false },
        ],
        feedbackOk: { pt: 'Isso. As vogais não eram escritas; o "e" é só uma convenção de estudo, não a pronúncia original.', en: 'Right. Vowels were not written; the "e" is only a scholarly convention, not the original pronunciation.' },
        feedbackErr: { pt: 'As vogais não eram escritas. O "e" de "nefer" é uma convenção moderna, não como a palavra soava de fato.', en: 'Vowels were not written. The "e" in "nefer" is a modern convention, not how the word actually sounded.' },
      },
    ],
  },

  /* As lições abaixo ainda serão construídas no rebuild. Ficam listadas no índice
     como "em breve" até receberem ready:true + sections/quiz. */
  {
    id: 'unileteros',
    num: 2,
    glyph: '𓄿',
    ready: true,
    kicker: { pt: 'Lição 2 · Fonética', en: 'Lesson 2 · Phonetics' },
    title:  { pt: 'Os 24 unilíteros', en: 'The 24 uniliterals' },
    desc:   { pt: 'O "alfabeto" do egípcio: cada sinal representa uma única consoante. A base de tudo que vem depois.', en: 'The Egyptian "alphabet": each sign represents a single consonant. The foundation of everything that follows.' },
    dur:    { pt: '~20 min', en: '~20 min' }, type: { pt: '24 sinais', en: '24 signs' },
    badge:  { pt: 'Novo', en: 'New' }, badgeClass: 'badge-new',
    intro:  { pt: 'Os unilíteros são os sinais mais básicos da escrita egípcia: cada um vale uma única consoante. São 24 ao todo, e costumam ser chamados de "alfabeto" egípcio, ainda que a comparação tenha limites.', en: 'Uniliterals are the most basic signs of Egyptian writing: each one stands for a single consonant. There are 24 in all, often called the Egyptian "alphabet", though the comparison has its limits.' },
    sections: [
      {
        title: { pt: 'Um alfabeto consonantal', en: 'A consonantal alphabet' },
        blocks: [
          { kind: 'p', html: { pt: 'Um sinal <strong>unilítero</strong> representa uma só consoante, como uma letra do nosso alfabeto. Os 24 unilíteros são a base da escrita: aparecem soletrando palavras curtas, completando a leitura de outros sinais (os complementos fonéticos que você viu na Lição 1) e escrevendo nomes estrangeiros.', en: 'A <strong>uniliteral</strong> sign stands for a single consonant, like a letter in our alphabet. The 24 uniliterals are the foundation of the writing: they spell out short words, complete the reading of other signs (the phonetic complements you saw in Lesson 1), and write foreign names.' } },
          { kind: 'callout', variant: 'gold', html: { pt: 'Por que "alfabeto" entre aspas? Porque a lista anota só consoantes (e algumas semivogais), nunca vogais. E porque esses mesmos sinais não vivem isolados: também entram dentro de palavras maiores, ao lado de bilíteros, trilíteros e determinativos.', en: 'Why "alphabet" in quotes? Because the list notes only consonants (and a few semivowels), never vowels. And because these signs do not live in isolation: they also appear inside larger words, alongside biliterals, triliterals, and determinatives.' } },
        ],
      },
      {
        title: { pt: 'Os 24 sinais', en: 'The 24 signs' },
        blocks: [
          { kind: 'p', html: { pt: 'Explore os sinais na ordem convencional da egiptologia. Clique em cada um para ver o nome do desenho e a explicação do Gardiner.', en: 'Explore the signs in the conventional Egyptological order. Click each one to see the name of the picture and Gardiner\'s explanation.' } },
          { kind: 'siggrid',
            ids: ['G1', 'M17', 'Z4', 'D36', 'G43', 'D58', 'Q3', 'I9', 'G17', 'N35', 'D21', 'O4', 'V28', 'Aa1', 'F32', 'S29', 'N37', 'N29', 'V31', 'W11', 'X1', 'V13', 'D46', 'I10'],
            hint: { pt: 'Clique num sinal para ver o nome do desenho e a explicação do Gardiner.', en: 'Click a sign to see the name of the picture and Gardiner\'s explanation.' } },
          { kind: 'callout', variant: 'azul', html: { pt: 'Não tente decorar os 24 de uma vez. A ideia é reconhecer alguns e voltar aqui quando precisar. Os mais frequentes (como 𓅓 m, 𓈖 n, 𓂋 r, 𓏏 t) vão grudando sozinhos.', en: 'Do not try to memorize all 24 at once. The idea is to recognize a few and come back when you need to. The most frequent ones (like 𓅓 m, 𓈖 n, 𓂋 r, 𓏏 t) stick on their own.' } },
        ],
      },
      {
        title: { pt: 'Parecem vogais, mas não são', en: 'They look like vowels, but they are not' },
        blocks: [
          { kind: 'p', html: { pt: 'Dois sinais costumam confundir: <strong>ꜣ</strong> (𓄿, o abutre) e <strong>ꜥ</strong> (𓂝, o antebraço). Eles parecem a vogal "a", mas são consoantes que o português e o inglês não possuem. Por convenção, ꜣ representa uma consoante fraca (uma oclusão glotal, o pequeno "corte" de voz) e ꜥ um som produzido no fundo da garganta, como o ayin do árabe e do hebraico.', en: 'Two signs often cause confusion: <strong>ꜣ</strong> (𓄿, the vulture) and <strong>ꜥ</strong> (𓂝, the forearm). They look like the vowel "a", but they are consonants that Portuguese and English do not have. By convention, ꜣ stands for a weak consonant (a glottal stop, the small catch in the voice) and ꜥ a sound made deep in the throat, like the ayin of Arabic and Hebrew.' } },
          { kind: 'p', html: { pt: 'Do mesmo modo, <strong>ỉ</strong> (𓇋, o junco) e <strong>w</strong> (𓅱, a codorniz) são semivogais, próximas de "i" e "u". Como as vogais não eram escritas, na leitura moderna inserimos um "e" por convenção e damos a ꜣ e ꜥ um som aproximado de "a", apenas para conseguir pronunciar. Não é a pronúncia original.', en: 'Likewise, <strong>ỉ</strong> (𓇋, the reed) and <strong>w</strong> (𓅱, the quail chick) are semivowels, close to "i" and "u". Since vowels were not written, in modern reading we insert an "e" by convention and give ꜣ and ꜥ an approximate "a" sound, just to be able to pronounce them. This is not the original pronunciation.' } },
        ],
      },
    ],
    quiz: [
      {
        glyph: '𓅓',
        question: { pt: 'Que som este sinal representa?', en: 'What sound does this sign represent?' },
        options: [
          { label: { pt: 'm (a coruja)', en: 'm (the owl)' }, correct: true },
          { label: { pt: 'n (a ondulação de água)', en: 'n (the water ripple)' }, correct: false },
          { label: { pt: 'r (a boca)', en: 'r (the mouth)' }, correct: false },
          { label: { pt: 'w (a codorniz)', en: 'w (the quail chick)' }, correct: false },
        ],
        feedbackOk: { pt: 'Isso. 𓅓 é a coruja, o unilítero m.', en: 'Right. 𓅓 is the owl, the uniliteral m.' },
        feedbackErr: { pt: 'Este é 𓅓, a coruja: o som m.', en: 'This is 𓅓, the owl: the sound m.' },
      },
      {
        glyph: '𓈖',
        question: { pt: 'E este sinal, qual é o som?', en: 'And this sign, what is its sound?' },
        options: [
          { label: { pt: 'n (a ondulação de água)', en: 'n (the water ripple)' }, correct: true },
          { label: { pt: 'm (a coruja)', en: 'm (the owl)' }, correct: false },
          { label: { pt: 'š (o lago)', en: 'š (the pool)' }, correct: false },
          { label: { pt: 'h (o abrigo)', en: 'h (the shelter)' }, correct: false },
        ],
        feedbackOk: { pt: 'Exato. 𓈖 é a ondulação de água, o unilítero n.', en: 'Exactly. 𓈖 is the water ripple, the uniliteral n.' },
        feedbackErr: { pt: '𓈖 é a água em ondulação: o som n.', en: '𓈖 is rippling water: the sound n.' },
      },
      {
        glyph: '𓄿',
        question: { pt: 'Os sinais ꜣ (𓄿) e ꜥ (𓂝) representam...', en: 'The signs ꜣ (𓄿) and ꜥ (𓂝) represent...' },
        options: [
          { label: { pt: 'Consoantes que o português não tem', en: 'Consonants that English does not have' }, correct: true },
          { label: { pt: 'As vogais "a" e "o"', en: 'The vowels "a" and "o"' }, correct: false },
          { label: { pt: 'Números', en: 'Numbers' }, correct: false },
          { label: { pt: 'Determinativos', en: 'Determinatives' }, correct: false },
        ],
        feedbackOk: { pt: 'Isso. Apesar da aparência, ꜣ e ꜥ são consoantes (oclusão glotal e som de garganta), não vogais.', en: 'Right. Despite appearances, ꜣ and ꜥ are consonants (a glottal stop and a throat sound), not vowels.' },
        feedbackErr: { pt: 'ꜣ e ꜥ parecem "a", mas são consoantes que não existem no português; as vogais não eram escritas.', en: 'ꜣ and ꜥ look like "a", but they are consonants absent from English; vowels were not written.' },
      },
      {
        glyph: '𓂋',
        question: { pt: 'Um sinal unilítero representa...', en: 'A uniliteral sign represents...' },
        options: [
          { label: { pt: 'Uma única consoante', en: 'A single consonant' }, correct: true },
          { label: { pt: 'Uma palavra inteira', en: 'An entire word' }, correct: false },
          { label: { pt: 'Uma sílaba com vogal', en: 'A syllable with a vowel' }, correct: false },
          { label: { pt: 'A categoria da palavra', en: 'The category of the word' }, correct: false },
        ],
        feedbackOk: { pt: 'Exato. Cada unilítero vale uma só consoante. 𓂋 é a boca, o som r.', en: 'Exactly. Each uniliteral stands for a single consonant. 𓂋 is the mouth, the sound r.' },
        feedbackErr: { pt: 'Unilítero quer dizer um sinal, uma consoante. 𓂋 (a boca) é o som r.', en: 'Uniliteral means one sign, one consonant. 𓂋 (the mouth) is the sound r.' },
      },
    ],
  },
  {
    id: 'bi-tri',
    num: 3,
    glyph: '𓆣',
    ready: true,
    kicker: { pt: 'Lição 3 · Fonética', en: 'Lesson 3 · Phonetics' },
    title:  { pt: 'Bilíteros e trilíteros', en: 'Biliterals and triliterals' },
    desc:   { pt: 'Sinais de duas e três consoantes e os complementos fonéticos que confirmam a leitura.', en: 'Two- and three-consonant signs and the phonetic complements that confirm the reading.' },
    dur:    { pt: '~25 min', en: '~25 min' }, type: { pt: 'Fonética', en: 'Phonetics' },
    badge:  { pt: 'Novo', en: 'New' }, badgeClass: 'badge-new',
    intro:  { pt: 'Soletrar tudo com unilíteros daria muito trabalho. Por isso o egípcio tinha sinais que já valem duas ou três consoantes de uma vez: os bilíteros e os trilíteros. São eles que fazem a escrita andar rápido.', en: 'Spelling everything out with uniliterals would be a lot of work. So Egyptian had signs that already stand for two or three consonants at once: biliterals and triliterals. They are what make the writing move fast.' },
    sections: [
      {
        title: { pt: 'Sinais de mais de uma consoante', en: 'Signs for more than one consonant' },
        blocks: [
          { kind: 'p', html: { pt: 'Um sinal <strong>bilítero</strong> vale duas consoantes; um <strong>trilítero</strong>, três. São fonogramas, como os unilíteros, mas mais econômicos: 𓉐 já é <em>pr</em> ("casa") sem precisar de p mais r; 𓋹 já é <em>ꜥnḫ</em> ("vida") sem soletrar ꜥ, n, ḫ.', en: 'A <strong>biliteral</strong> sign is worth two consonants; a <strong>triliteral</strong>, three. They are phonograms, like the uniliterals, but more economical: 𓉐 already reads <em>pr</em> ("house") without needing p plus r; 𓋹 already reads <em>ꜥnḫ</em> ("life") without spelling out ꜥ, n, ḫ.' } },
          { kind: 'p', html: { pt: 'Muitos desses sinais também funcionam como <strong>logogramas</strong> (a palavra inteira pelo desenho). O mesmo 𓉐 pode ser o fonograma <em>pr</em> dentro de outra palavra ou o logograma "casa". O contexto e os sinais vizinhos dizem qual leitura vale.', en: 'Many of these signs also work as <strong>logograms</strong> (the whole word through the picture). The same 𓉐 can be the phonogram <em>pr</em> inside another word, or the logogram "house". Context and neighboring signs tell you which reading applies.' } },
        ],
      },
      {
        title: { pt: 'Alguns bilíteros comuns', en: 'Some common biliterals' },
        blocks: [
          { kind: 'p', html: { pt: 'Não são para decorar de uma vez. Explore e note como cada um condensa duas consoantes num só desenho.', en: 'Not to be memorized at once. Explore and notice how each one condenses two consonants into a single picture.' } },
          { kind: 'siggrid', ids: ['O1', 'Y5', 'U1', 'E34', 'F31', 'G39', 'D28', 'V30', 'R11', 'D1', 'D2', 'O29'] },
        ],
      },
      {
        title: { pt: 'Os trilíteros', en: 'The triliterals' },
        blocks: [
          { kind: 'p', html: { pt: 'Poucos em número, mas de altíssima frequência: aparecem em palavras centrais da cultura egípcia, como "vida", "deus", "belo" e "tornar-se".', en: 'Few in number, but very high in frequency: they appear in words central to Egyptian culture, such as "life", "god", "beautiful", and "to become".' } },
          { kind: 'siggrid', ids: ['F35', 'S34', 'L1', 'R4', 'R8', 'S40', 'N14', 'F12', 'S38'] },
          { kind: 'callout', variant: 'azul', html: { pt: '<strong>E quatro consoantes?</strong> Praticamente não existe sinal puramente fonético de quatro. As leituras mais longas que você encontra (pr-ḥḏ "tesouro", ḥtp-dỉ-nsw na fórmula de oferenda) são logogramas: um sinal que vale uma palavra inteira, não um bloco de sons. Por isso o esqueleto fonético para nos trilíteros.', en: '<strong>What about four consonants?</strong> There is essentially no purely phonetic four-consonant sign. The longer readings you meet (pr-ḥḏ "treasury", ḥtp-dỉ-nsw in the offering formula) are logograms: a single sign standing for a whole word, not a block of sounds. That is why the phonetic skeleton stops at triliterals.' } },
        ],
      },
      {
        title: { pt: 'Os complementos fonéticos', en: 'Phonetic complements' },
        blocks: [
          { kind: 'p', html: { pt: 'Você viu isso rapidamente na Lição 1. Agora com calma: o egípcio costuma escrever o bilítero ou trilítero e, logo depois, repetir parte dos seus sons com unilíteros. Esses unilíteros são <strong>complementos fonéticos</strong>. Eles não adicionam sons novos, só confirmam a leitura do sinal principal.', en: 'You saw this briefly in Lesson 1. Now slowly: Egyptian usually writes the biliteral or triliteral and, right after, repeats part of its sounds with uniliterals. Those uniliterals are <strong>phonetic complements</strong>. They add no new sounds; they only confirm the reading of the main sign.' } },
          { kind: 'word', label: { pt: 'Passe o mouse sobre cada sinal', en: 'Hover over each sign' },
            signs: [
              { glyph: '𓋹', id: 'S34', phon: 'ꜥnḫ', type: 'bi', typeLabel: { pt: 'trilítero', en: 'triliteral' }, tip: { pt: '𓋹 ꜥnḫ, o ânkh · representa as três consoantes ꜥ-n-ḫ', en: '𓋹 ꜥnḫ, the ankh · represents the three consonants ꜥ-n-ḫ' } },
              { glyph: '𓈖', id: 'N35', phon: 'n', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓈖 n, ondulação de água · confirma o som N de ꜥnḫ', en: '𓈖 n, water ripple · confirms the N sound of ꜥnḫ' } },
              { glyph: '𓐍', id: 'Aa1', phon: 'ḫ', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓐍 ḫ, placenta ou peneira · confirma o som Ḫ de ꜥnḫ', en: '𓐍 ḫ, placenta or sieve · confirms the Ḫ sound of ꜥnḫ' } },
            ],
            result: '𓋹𓈖𓐍',
            note: { pt: 'A palavra continua sendo <strong>ꜥnḫ</strong> ("vida"). Os sinais 𓈖 (n) e 𓐍 (ḫ) só repetem sons que 𓋹 já carrega: lê-se ꜥnḫ uma vez, não "ꜥnḫ-n-ḫ".', en: 'The word is still <strong>ꜥnḫ</strong> ("life"). The signs 𓈖 (n) and 𓐍 (ḫ) merely repeat sounds that 𓋹 already carries: you read ꜥnḫ once, not "ꜥnḫ-n-ḫ".' } },
          { kind: 'word', label: { pt: 'Um bilítero com complemento', en: 'A biliteral with a complement' },
            signs: [
              { glyph: '𓏠', id: 'Y5', phon: 'mn', type: 'bi', typeLabel: { pt: 'bilítero', en: 'biliteral' }, tip: { pt: '𓏠 mn, tabuleiro de senet · representa as duas consoantes m-n', en: '𓏠 mn, senet board · represents the two consonants m-n' } },
              { glyph: '𓈖', id: 'N35', phon: 'n', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓈖 n · confirma o som N de mn', en: '𓈖 n · confirms the N sound of mn' } },
            ],
            result: '𓏠𓈖',
            note: { pt: 'Lê-se <strong>mn</strong>, não "mn-n". É essa combinação que aparece, por exemplo, no nome do deus Amon (ỉ-mn).', en: 'You read <strong>mn</strong>, not "mn-n". This is the combination that appears, for example, in the name of the god Amun (ỉ-mn).' } },
          { kind: 'callout', variant: 'azul', html: { pt: 'A <strong>regra</strong> de novo: um sinal principal seguido de outros sinais cujos sons já estão nele = complementos. Leia o sinal principal uma vez e siga em frente.', en: 'The <strong>rule</strong> again: a main sign followed by other signs whose sounds are already in it = complements. Read the main sign once and move on.' } },
        ],
      },
    ],
    quiz: [
      {
        glyph: '𓆣',
        question: { pt: 'O que é um sinal bilítero?', en: 'What is a biliteral sign?' },
        options: [
          { label: { pt: 'Um sinal que vale duas consoantes', en: 'A sign worth two consonants' }, correct: true },
          { label: { pt: 'Um sinal que vale uma consoante', en: 'A sign worth one consonant' }, correct: false },
          { label: { pt: 'Um sinal sem som, que classifica', en: 'A soundless sign that classifies' }, correct: false },
          { label: { pt: 'Duas palavras escritas juntas', en: 'Two words written together' }, correct: false },
        ],
        feedbackOk: { pt: 'Isso. Bilítero = dois; trilítero = três consoantes num só sinal. 𓆣 (ḫpr) é trilítero.', en: 'Right. Biliteral = two; triliteral = three consonants in a single sign. 𓆣 (ḫpr) is a triliteral.' },
        feedbackErr: { pt: 'Bilítero vale duas consoantes de uma vez (tri, três). Um vale uma consoante é o unilítero.', en: 'A biliteral is worth two consonants at once (tri, three). One consonant is the uniliteral.' },
      },
      {
        glyph: '𓋹',
        question: { pt: 'Este trilítero, o ânkh, escreve qual palavra?', en: 'This triliteral, the ankh, writes which word?' },
        options: [
          { label: { pt: 'ꜥnḫ ("vida")', en: 'ꜥnḫ ("life")' }, correct: true },
          { label: { pt: 'nfr ("belo")', en: 'nfr ("beautiful")' }, correct: false },
          { label: { pt: 'ḥtp ("oferenda")', en: 'ḥtp ("offering")' }, correct: false },
          { label: { pt: 'nṯr ("deus")', en: 'nṯr ("god")' }, correct: false },
        ],
        feedbackOk: { pt: 'Exato. 𓋹 é ꜥnḫ, "vida", um dos sinais mais conhecidos do Egito.', en: 'Exactly. 𓋹 is ꜥnḫ, "life", one of the most recognizable signs from Egypt.' },
        feedbackErr: { pt: '𓋹 é o ânkh: ꜥnḫ, "vida".', en: '𓋹 is the ankh: ꜥnḫ, "life".' },
      },
      {
        glyph: '𓋹',
        question: { pt: 'Em ꜥnḫ escrito 𓋹𓈖𓐍, o que fazem os sinais 𓈖 (n) e 𓐍 (ḫ)?', en: 'In ꜥnḫ written 𓋹𓈖𓐍, what do the signs 𓈖 (n) and 𓐍 (ḫ) do?' },
        options: [
          { label: { pt: 'Confirmam sons que 𓋹 já tem, sem adicionar', en: 'They confirm sounds 𓋹 already has, without adding' }, correct: true },
          { label: { pt: 'Adicionam sons, virando "ꜥnḫnḫ"', en: 'They add sounds, making it "ꜥnḫnḫ"' }, correct: false },
          { label: { pt: 'Classificam a palavra (determinativo)', en: 'They classify the word (determinative)' }, correct: false },
          { label: { pt: 'Marcam o plural', en: 'They mark the plural' }, correct: false },
        ],
        feedbackOk: { pt: 'Isso. São complementos fonéticos: repetem o n e o ḫ que 𓋹 já carrega. Lê-se ꜥnḫ uma vez só.', en: 'Right. They are phonetic complements: they repeat the n and ḫ that 𓋹 already carries. You read ꜥnḫ just once.' },
        feedbackErr: { pt: 'São complementos fonéticos: só confirmam a leitura de 𓋹 (ꜥnḫ), não acrescentam sons.', en: 'They are phonetic complements: they only confirm the reading of 𓋹 (ꜥnḫ); they add no sounds.' },
      },
      {
        glyph: '𓊹',
        question: { pt: 'O trilítero nṯr (𓊹) significa...', en: 'The triliteral nṯr (𓊹) means...' },
        options: [
          { label: { pt: 'Deus', en: 'God' }, correct: true },
          { label: { pt: 'Casa', en: 'House' }, correct: false },
          { label: { pt: 'Vida', en: 'Life' }, correct: false },
          { label: { pt: 'Belo', en: 'Beautiful' }, correct: false },
        ],
        feedbackOk: { pt: 'Isso. nṯr (𓊹, tecido sobre mastro) é "deus". "Casa" é pr, "vida" é ꜥnḫ, "belo" é nfr.', en: 'Right. nṯr (𓊹, cloth on a pole) is "god". "House" is pr, "life" is ꜥnḫ, "beautiful" is nfr.' },
        feedbackErr: { pt: 'nṯr (𓊹) é "deus". Casa = pr, vida = ꜥnḫ, belo = nfr.', en: 'nṯr (𓊹) is "god". House = pr, life = ꜥnḫ, beautiful = nfr.' },
      },
    ],
  },
  {
    id: 'palavras',
    num: 4,
    glyph: '𓂋',
    ready: true,
    kicker: { pt: 'Lição 4 · Vocabulário', en: 'Lesson 4 · Vocabulary' },
    title:  { pt: 'Escrevendo em egípcio antigo', en: 'Writing in ancient Egyptian' },
    desc:   { pt: 'Combine os sinais no construtor para ler palavras frequentes do egípcio clássico.', en: 'Combine signs in the builder to read frequent words of classical Egyptian.' },
    dur:    { pt: '~30 min', en: '~30 min' }, type: { pt: 'Construtor', en: 'Builder' },
    badge:  { pt: 'Novo', en: 'New' }, badgeClass: 'badge-new',
    intro:  { pt: 'Hora de juntar tudo. Você já conhece unilíteros, bilíteros, trilíteros e os complementos. Agora vai escrever palavras em egípcio, sinal por sinal, e ver a leitura aparecer.', en: 'Time to put it all together. You already know uniliterals, biliterals, triliterals, and complements. Now you will write words in Egyptian, sign by sign, and watch the reading appear.' },
    sections: [
      {
        title: { pt: 'Como uma palavra se monta', en: 'How a word is built' },
        blocks: [
          { kind: 'p', html: { pt: 'A maioria das palavras segue um esquema simples: um <strong>sinal principal</strong> (bilítero, trilítero ou logograma) que carrega o miolo da leitura, seguido de <strong>complementos fonéticos</strong> que confirmam parte dos sons, e às vezes um <strong>determinativo</strong> no fim para classificar. Nesta lição o foco é o esqueleto sonoro; os determinativos ficam de fora por enquanto.', en: 'Most words follow a simple pattern: a <strong>main sign</strong> (biliteral, triliteral, or logogram) carrying the core of the reading, followed by <strong>phonetic complements</strong> that confirm part of the sounds, and sometimes a <strong>determinative</strong> at the end to classify. In this lesson the focus is the sound skeleton; determinatives are left aside for now.' } },
          { kind: 'callout', variant: 'gold', html: { pt: 'No construtor abaixo, cada palavra vem com o significado e a transliteração. Clique nos sinais na ordem para montá-la. Se errar, use <strong>⌫ Apagar</strong>. Ao acertar, repare como os complementos não somam sons novos.', en: 'In the builder below, each word comes with its meaning and transliteration. Click the signs in order to build it. If you slip, use <strong>⌫ Delete</strong>. When you get it right, notice how the complements add no new sounds.' } },
        ],
      },
      {
        title: { pt: 'O construtor', en: 'The builder' },
        blocks: [
          { kind: 'builder',
            palette: ['O1', 'Y5', 'F35', 'S34', 'I9', 'D21', 'N35', 'Aa1', 'G17', 'D58', 'M17', 'S29'],
            challenges: [
              { meaning: { pt: 'casa', en: 'house' }, translit: 'pr', answer: ['O1', 'D21'],
                note: { pt: '𓉐 já vale pr; o 𓂋 (r) é só um complemento. Lê-se pr, não pr-r.', en: '𓉐 already reads pr; the 𓂋 (r) is just a complement. You read pr, not pr-r.' } },
              { meaning: { pt: 'permanecer, ser firme', en: 'to remain, be firm' }, translit: 'mn', answer: ['Y5', 'N35'],
                note: { pt: '𓏠 vale mn; o 𓈖 (n) confirma o som. É o mn do nome do deus Amon (ỉ-mn).', en: '𓏠 reads mn; the 𓈖 (n) confirms the sound. This is the mn in the name of the god Amun (ỉ-mn).' } },
              { meaning: { pt: 'belo, bom, perfeito', en: 'beautiful, good, perfect' }, translit: 'nfr', answer: ['F35', 'I9', 'D21'],
                note: { pt: '𓄤 já é nfr; 𓆑 (f) e 𓂋 (r) são complementos. Lê-se nfr, não nfr-f-r.', en: '𓄤 is already nfr; 𓆑 (f) and 𓂋 (r) are complements. You read nfr, not nfr-f-r.' } },
              { meaning: { pt: 'vida', en: 'life' }, translit: 'ꜥnḫ', answer: ['S34', 'N35', 'Aa1'],
                note: { pt: '𓋹 é ꜥnḫ; 𓈖 (n) e 𓐍 (ḫ) repetem sons que ele já carrega. Uma das palavras mais escritas do Egito.', en: '𓋹 is ꜥnḫ; 𓈖 (n) and 𓐍 (ḫ) repeat sounds it already carries. One of the most written words in Egypt.' } },
            ] },
          { kind: 'p', html: { pt: 'Montou as quatro? Então você já lê o esqueleto de palavras de verdade. É exatamente assim que os escribas combinavam os sinais, só que com um repertório maior e, quase sempre, um determinativo fechando a palavra.', en: 'Built all four? Then you can already read the skeleton of real words. This is exactly how the scribes combined signs, only with a larger repertoire and, almost always, a determinative closing the word.' } },
        ],
      },
    ],
  },
  {
    id: 'cartuchos',
    num: 5,
    glyph: '𓇳',
    ready: true,
    kicker: { pt: 'Lição 5 · Cartuchos', en: 'Lesson 5 · Cartouches' },
    title:  { pt: 'Cartuchos e os nomes do rei', en: 'Cartouches and the king\'s names' },
    desc:   { pt: 'O cartucho, os nomes reais e como ler nomes de faraó.', en: 'The cartouche, the royal names, and how to read pharaoh names.' },
    dur:    { pt: '~20 min', en: '~20 min' }, type: { pt: 'Cartuchos', en: 'Cartouches' },
    badge:  { pt: 'Novo', en: 'New' }, badgeClass: 'badge-new',
    intro:  { pt: 'Aquele oval alongado que você já viu em templos e museus tem nome: cartucho. E ele guarda justamente o que mais chama a atenção, o nome do rei. Com o que você já sabe, dá para começar a lê-los.', en: 'That elongated oval you have seen on temples and in museums has a name: cartouche. And it holds exactly what draws the most attention, the king\'s name. With what you already know, you can start reading them.' },
    sections: [
      {
        title: { pt: 'O que é um cartucho', en: 'What a cartouche is' },
        blocks: [
          { kind: 'p', html: { pt: 'O cartucho é uma <strong>alça de corda</strong> desenhada como um oval com uma barra numa das pontas. Ele envolve o nome e sinaliza que ali dentro está um <strong>nome real</strong>. A corda que circunda simboliza proteção, e a forma vem do anel <em>shen</em>, que representava tudo aquilo que o sol contorna.', en: 'A cartouche is a <strong>loop of rope</strong> drawn as an oval with a bar at one end. It surrounds the name and signals that a <strong>royal name</strong> is inside. The encircling rope symbolizes protection, and the shape comes from the <em>shen</em> ring, which represented all that the sun encircles.' } },
          { kind: 'p', html: { pt: 'Veja o cartucho de <strong>Ramsés</strong>, lido da esquerda para a direita:', en: 'Look at the cartouche of <strong>Ramesses</strong>, read from left to right:' } },
          { kind: 'word', label: { pt: 'Passe o mouse sobre cada sinal', en: 'Hover over each sign' }, cartouche: true,
            signs: [
              { glyph: '𓇳', id: 'N5', phon: 'rꜥ', type: 'bi', typeLabel: { pt: 'logograma', en: 'logogram' }, tip: { pt: '𓇳 Rꜥ, o deus-sol · logograma', en: '𓇳 Rꜥ, the sun god · logogram' } },
              { glyph: '𓄟', id: 'F31', phon: 'ms', type: 'bi', typeLabel: { pt: 'bilítero', en: 'biliteral' }, tip: { pt: '𓄟 ms · "gerar, dar à luz"', en: '𓄟 ms · "to fashion, give birth"' } },
              { glyph: '𓋴', id: 'S29', phon: 's', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓋴 s · complemento de ms', en: '𓋴 s · complement of ms' } },
              { glyph: '𓇓', id: 'M23', phon: 'sw', type: 'bi', typeLabel: { pt: 'bilítero', en: 'biliteral' }, tip: { pt: '𓇓 sw · o "su" final de Ramessu', en: '𓇓 sw · the final "su" of Ramessu' } },
              { glyph: '𓅱', id: 'G43', phon: 'w', type: 'uni', typeLabel: { pt: 'unilítero', en: 'uniliteral' }, tip: { pt: '𓅱 w · complemento de sw', en: '𓅱 w · complement of sw' } },
            ],
            result: '𓇳𓄟𓋴𓇓𓅱',
            note: { pt: 'Lê-se <strong>Rꜥ-ms-sw</strong> (Ramessu, o nosso "Ramsés"), algo como "Rá o gerou". O 𓋴 (s) e o 𓅱 (w) são complementos que confirmam ms e sw. E repare: o disco solar 𓇳 vem primeiro, porque nomes reais costumam abrir com o deus.', en: 'It reads <strong>Rꜥ-ms-sw</strong> (Ramessu, our "Ramesses"), roughly "Ra fashioned him". The 𓋴 (s) and 𓅱 (w) are complements confirming ms and sw. And notice: the sun disk 𓇳 comes first, because royal names often open with the god.' } },
          { kind: 'foto', src: '../assets/photos/karnak.JPG',
            alt: { pt: 'Cartucho talhado numa coluna de pedra, com o disco solar e outros sinais dentro de um oval.', en: 'Cartouche carved on a stone column, with the sun disk and other signs inside an oval.' },
            caption: { pt: 'O nome de trono de <em>Ramsés II</em>, <em>Wsr-Mꜣꜥt-Rꜥ</em> ("Poderosa é a Maat de Rá"). Repare no disco solar 𓇳 escrito primeiro, por respeito: é a transposição honorífica.', en: 'The throne name of <em>Ramesses II</em>, <em>Wsr-Mꜣꜥt-Rꜥ</em> ("The Maat of Ra is powerful"). Notice the sun disk 𓇳 written first, out of respect: honorific transposition.' },
            credit: { pt: 'Foto: Flavia Lima Corpas · Templo de Karnak', en: 'Photo: Flavia Lima Corpas · Temple of Karnak' } },
        ],
      },
      {
        title: { pt: 'Os cinco nomes do rei', en: 'The king\'s five names' },
        blocks: [
          { kind: 'p', html: { pt: 'O faraó não tinha um nome só, mas um conjunto de <strong>cinco</strong> (a titulatura real). Dois deles eram escritos dentro de cartuchos: o <strong>nome de trono</strong> (adotado na coroação) e o <strong>nome de nascimento</strong>, este precedido do título "Filho de Rá". Os outros três (nomes de Hórus, das Duas Senhoras e de Hórus de Ouro) ficavam fora do cartucho.', en: 'The pharaoh did not have a single name, but a set of <strong>five</strong> (the royal titulary). Two of them were written inside cartouches: the <strong>throne name</strong> (taken at coronation) and the <strong>birth name</strong>, the latter preceded by the title "Son of Ra". The other three (the Horus, Two Ladies, and Golden Horus names) sat outside the cartouche.' } },
          { kind: 'callout', variant: 'azul', html: { pt: '<strong>Transposição honorífica:</strong> quando um nome contém um deus, o sinal do deus costuma ser escrito na frente, por respeito, mesmo que seja lido depois.', en: '<strong>Honorific transposition:</strong> when a name contains a god, the god\'s sign is usually written first, out of respect, even if it is read later.' } },
          { kind: 'p', html: { pt: 'É o que acontece em <strong>Tutancâmon</strong>. No cartucho, o nome de Amon (ỉmn) aparece escrito primeiro, mas se lê por último:', en: 'This is what happens in <strong>Tutankhamun</strong>. In the cartouche, the name of Amun (ỉmn) is written first but read last:' } },
          { kind: 'word', label: { pt: 'Escrito nesta ordem', en: 'Written in this order' }, cartouche: true,
            signs: [
              { glyph: '𓇋', id: 'M17', phon: 'ỉ', type: 'uni', typeLabel: { pt: 'Amon', en: 'Amun' }, tip: { pt: '𓇋𓏠𓈖 ỉmn (Amon), escrito primeiro por respeito', en: '𓇋𓏠𓈖 ỉmn (Amun), written first out of respect' } },
              { glyph: '𓏠', id: 'Y5', phon: 'mn', type: 'bi', typeLabel: { pt: 'Amon', en: 'Amun' }, tip: { pt: '𓏠 mn · parte de ỉmn (Amon)', en: '𓏠 mn · part of ỉmn (Amun)' } },
              { glyph: '𓈖', id: 'N35', phon: 'n', type: 'uni', typeLabel: { pt: 'Amon', en: 'Amun' }, tip: { pt: '𓈖 n · complemento de ỉmn (Amon)', en: '𓈖 n · complement of ỉmn (Amun)' } },
              { glyph: '𓏏', id: 'X1', phon: 't', type: 'uni', typeLabel: { pt: 'twt', en: 'twt' }, tip: { pt: '𓏏𓅱𓏏 twt ("imagem, semelhança")', en: '𓏏𓅱𓏏 twt ("image, likeness")' } },
              { glyph: '𓅱', id: 'G43', phon: 'w', type: 'uni', typeLabel: { pt: 'twt', en: 'twt' }, tip: { pt: '𓅱 w · parte de twt', en: '𓅱 w · part of twt' } },
              { glyph: '𓏏', id: 'X1', phon: 't', type: 'uni', typeLabel: { pt: 'twt', en: 'twt' }, tip: { pt: '𓏏 t · parte de twt', en: '𓏏 t · part of twt' } },
              { glyph: '𓋹', id: 'S34', phon: 'ꜥnḫ', type: 'bi', typeLabel: { pt: 'ꜥnḫ', en: 'ꜥnḫ' }, tip: { pt: '𓋹 ꜥnḫ ("viver, vida")', en: '𓋹 ꜥnḫ ("to live, life")' } },
            ],
            result: '𓇋𓏠𓈖𓏏𓅱𓏏𓋹',
            note: { pt: 'Lê-se <strong>Twt-ꜥnḫ-ỉmn</strong>, "Imagem viva de Amon". Escreve-se Amon, depois twt, depois ꜥnḫ; mas a leitura começa por twt e termina em Amon. Essa é a transposição honorífica.', en: 'It reads <strong>Twt-ꜥnḫ-ỉmn</strong>, "Living image of Amun". You write Amun, then twt, then ꜥnḫ; but the reading starts with twt and ends with Amun. That is honorific transposition.' } },
        ],
      },
      {
        title: { pt: 'Monte um cartucho', en: 'Build a cartouche' },
        blocks: [
          { kind: 'p', html: { pt: 'Agora você. Monte os dois nomes abaixo clicando os sinais na ordem; eles vão aparecer dentro do cartucho.', en: 'Now you. Build the two names below by clicking the signs in order; they will appear inside the cartouche.' } },
          { kind: 'builder', cartouche: true,
            palette: ['M17', 'Y5', 'N35', 'X1', 'G43', 'S34', 'N5', 'F31', 'S29', 'M23', 'G17', 'D21'],
            challenges: [
              { meaning: { pt: 'Ramessu (Ramsés)', en: 'Ramessu (Ramesses)' }, translit: 'rꜥ-ms-sw', answer: ['N5', 'F31', 'S29', 'M23', 'G43'],
                note: { pt: '𓇳 (Rꜥ) + 𓄟 (ms) + 𓋴 (s) + 𓇓 (sw) + 𓅱 (w). O disco solar abre o nome, e os complementos confirmam ms e sw.', en: '𓇳 (Rꜥ) + 𓄟 (ms) + 𓋴 (s) + 𓇓 (sw) + 𓅱 (w). The sun disk opens the name, and the complements confirm ms and sw.' } },
              { meaning: { pt: 'Tutancâmon (escreva o deus primeiro!)', en: 'Tutankhamun (write the god first!)' }, translit: 'twt-ꜥnḫ-ỉmn', answer: ['M17', 'Y5', 'N35', 'X1', 'G43', 'X1', 'S34'],
                note: { pt: 'Na ordem escrita: 𓇋𓏠𓈖 (ỉmn, Amon) + 𓏏𓅱𓏏 (twt) + 𓋹 (ꜥnḫ). Escreve-se o deus primeiro, mas lê-se por último: Twt-ꜥnḫ-ỉmn. É a transposição honorífica.', en: 'In written order: 𓇋𓏠𓈖 (ỉmn, Amun) + 𓏏𓅱𓏏 (twt) + 𓋹 (ꜥnḫ). You write the god first but read it last: Twt-ꜥnḫ-ỉmn. That is honorific transposition.' } },
            ] },
          { kind: 'p', html: { pt: 'Pronto: você acabou de escrever nomes de faraó do jeito que os egípcios escreviam, há mais de três mil anos.', en: 'There you go: you have just written pharaoh names the way the Egyptians wrote them, more than three thousand years ago.' } },
        ],
      },
    ],
  },
  {
    id: 'texto',
    num: 6,
    glyph: '𓏛',
    ready: true,
    kicker: { pt: 'Lição 6 · Leitura', en: 'Lesson 6 · Reading' },
    title:  { pt: 'Ler um texto mágico', en: 'Reading a magical text' },
    desc:   { pt: 'Juntar tudo e ler a fórmula de oferenda, palavra a palavra.', en: 'Put it all together and read the offering formula, word by word.' },
    dur:    { pt: '~25 min', en: '~25 min' }, type: { pt: 'Leitura', en: 'Reading' },
    badge:  { pt: 'Novo', en: 'New' }, badgeClass: 'badge-new',
    intro:  { pt: 'Chegou a hora de ler de verdade. Você vai encarar a fórmula de oferenda, o texto mais comum de todo o Egito antigo, e vai entender cada sinal.', en: 'Time to read for real. You will take on the offering formula, the most common text in all of ancient Egypt, and understand every sign.' },
    sections: [
      {
        title: { pt: 'O texto mais comum do Egito', en: 'The most common text in Egypt' },
        blocks: [
          { kind: 'p', html: { pt: 'De estelas a paredes de tumba, do Reino Médio em diante, uma mesma frase aparece milhares de vezes: a <strong>fórmula de oferenda</strong>. Ela pede que o rei e um deus providenciem oferendas para o morto, de modo que seu <em>ka</em> seja alimentado para sempre. Ler essa fórmula é ler egípcio antigo de verdade.', en: 'From stelae to tomb walls, from the Middle Kingdom onward, one same phrase appears thousands of times: the <strong>offering formula</strong>. It asks the king and a god to provide offerings for the deceased, so that their <em>ka</em> is sustained forever. Reading this formula is reading real ancient Egyptian.' } },
        ],
      },
      {
        title: { pt: 'Leia a fórmula, palavra por palavra', en: 'Read the formula, word by word' },
        blocks: [
          { kind: 'p', html: { pt: 'Ela começa sempre igual: <strong>ḥtp-dỉ-nsw</strong>. Veja os sinais:', en: 'It always begins the same way: <strong>ḥtp-dỉ-nsw</strong>. Look at the signs:' } },
          { kind: 'word', label: { pt: 'Passe o mouse sobre cada sinal', en: 'Hover over each sign' },
            signs: [
              { glyph: '𓇓', id: 'M23', phon: 'nsw', type: 'bi', typeLabel: { pt: 'rei', en: 'king' }, tip: { pt: '𓇓 nsw, o junco · logograma de "rei", escrito primeiro por respeito', en: '𓇓 nsw, the sedge · logogram of "king", written first out of respect' } },
              { glyph: '𓏏', id: 'X1', phon: 't', type: 'uni', typeLabel: { pt: 'rei', en: 'king' }, tip: { pt: '𓏏 t · parte de nsw(t), "rei"', en: '𓏏 t · part of nsw(t), "king"' } },
              { glyph: '𓊵', id: 'R4', phon: 'ḥtp', type: 'bi', typeLabel: { pt: 'trilítero', en: 'triliteral' }, tip: { pt: '𓊵 ḥtp · "oferenda, contentamento"', en: '𓊵 ḥtp · "offering, contentment"' } },
              { glyph: '𓏙', id: 'X8', phon: 'dỉ', type: 'bi', typeLabel: { pt: 'dar', en: 'give' }, tip: { pt: '𓏙 dỉ · "dar"', en: '𓏙 dỉ · "to give"' } },
            ],
            result: '𓇓𓏏𓊵𓏙',
            note: { pt: 'Lê-se <strong>ḥtp-dỉ-nsw</strong>: "uma oferenda que o rei dá". O sinal do rei 𓇓 vem escrito primeiro, por respeito, mas se lê por último: é a mesma transposição honorífica do nome de Tutancâmon.', en: 'It reads <strong>ḥtp-dỉ-nsw</strong>: "an offering which the king gives". The king sign 𓇓 is written first, out of respect, but read last: the same honorific transposition as in Tutankhamun\'s name.' } },
          { kind: 'p', html: { pt: 'A oferenda costuma ser dedicada a um deus. Muitas vezes é <strong>Osíris</strong>, senhor dos mortos:', en: 'The offering is usually dedicated to a god. Often it is <strong>Osiris</strong>, lord of the dead:' } },
          { kind: 'word', label: { pt: 'Osíris', en: 'Osiris' },
            signs: [
              { glyph: '𓊨', id: 'Q1', phon: 'ws', type: 'bi', typeLabel: { pt: 'trono', en: 'throne' }, tip: { pt: '𓊨 ws, o trono · em Wsỉr (Osíris)', en: '𓊨 ws, the throne · in Wsỉr (Osiris)' } },
              { glyph: '𓁹', id: 'D4', phon: 'ỉr', type: 'bi', typeLabel: { pt: 'olho', en: 'eye' }, tip: { pt: '𓁹 ỉr, o olho · em Wsỉr (Osíris)', en: '𓁹 ỉr, the eye · in Wsỉr (Osiris)' } },
              { glyph: '𓀭', id: 'A40', phon: '', type: 'det', typeLabel: { pt: 'determinativo', en: 'determinative' }, tip: { pt: '𓀭 determinativo de deus (sem som)', en: '𓀭 determinative of a god (no sound)' } },
            ],
            result: '𓊨𓁹𓀭',
            note: { pt: 'Lê-se <strong>Wsỉr</strong>, "Osíris", escrito com o trono e o olho, e fechado pelo 𓀭, o determinativo de deus, que não tem som e só marca que a palavra é uma divindade.', en: 'It reads <strong>Wsỉr</strong>, "Osiris", written with the throne and the eye, and closed by 𓀭, the determinative of a god, which has no sound and only marks that the word is a deity.' } },
          { kind: 'callout', variant: 'gold', html: { pt: 'Juntando: <span class="gloss-glyph">𓇓𓏏𓊵𓏙 𓊨𓁹𓀭</span><br><strong>ḥtp-dỉ-nsw wsỉr</strong> = "Uma oferenda que o rei dá a Osíris". Pronto: você acabou de ler um texto egípcio de verdade.', en: 'Putting it together: <span class="gloss-glyph">𓇓𓏏𓊵𓏙 𓊨𓁹𓀭</span><br><strong>ḥtp-dỉ-nsw wsỉr</strong> = "An offering which the king gives to Osiris". There you go: you have just read a real Egyptian text.' } },
          { kind: 'foto', src: '../assets/photos/estela.jpg',
            alt: { pt: 'Estela de calcário de Tjenu, com um homem sentado diante da mesa de oferendas e linhas de texto no alto.', en: 'Limestone stela of Tjenu, with a seated man before the offering table and lines of text above.' },
            caption: { pt: 'A estela de <em>Tjenu</em>, guarda da sala do vestuário real (Abydos, calcário, 13ª dinastia). No alto, à direita, começa o <em>ḥtp-dỉ-nsw</em>, dedicado ao <em>ka</em> do dono. E ele não é um rei: a fórmula "que o rei dá" é justamente a das pessoas comuns.', en: 'The stela of <em>Tjenu</em>, keeper of the hall of the royal wardrobe (Abydos, limestone, 13th Dynasty). At the top right begins the <em>ḥtp-dỉ-nsw</em>, dedicated to the owner\'s <em>ka</em>. And he is no king: the formula "which the king gives" is precisely the one for ordinary people.' },
            credit: { pt: 'Foto: Cristina Brandão · Grand Egyptian Museum', en: 'Photo: Cristina Brandão · Grand Egyptian Museum' } },
        ],
      },
      {
        title: { pt: 'Agora escreva você', en: 'Now you write it' },
        blocks: [
          { kind: 'p', html: { pt: 'Feche o curso escrevendo a própria fórmula. Lembre: o rei vem primeiro.', en: 'Close the course by writing the formula yourself. Remember: the king comes first.' } },
          { kind: 'callout', variant: 'azul', html: { pt: 'Antes de montar: a tecla do junco 𓇓 aparece com o som <strong>sw</strong> (é o valor dele na Lista de Gardiner). Mas aqui ele escreve a palavra <strong>nsw</strong>, "rei", com o <em>n</em> inicial que não é grafado. Por isso a leitura da fórmula é <em>nsw</em>, mesmo o sinal valendo sw sozinho.', en: 'Before you build: the sedge key 𓇓 shows the sound <strong>sw</strong> (its value in the Gardiner list). But here it writes the word <strong>nsw</strong>, "king", with an initial <em>n</em> that is not written. That is why the formula reads <em>nsw</em>, even though the sign sounds sw on its own.' } },
          { kind: 'builder', cartouche: false,
            palette: ['M23', 'X1', 'R4', 'X8', 'Q1', 'D4', 'A40', 'N35', 'G17'],
            challenges: [
              { meaning: { pt: 'a fórmula de oferenda (o rei primeiro!)', en: 'the offering formula (the king first!)' }, translit: 'ḥtp-dỉ-nsw', answer: ['M23', 'X1', 'R4', 'X8'],
                note: { pt: '𓇓𓏏 (nsw, rei) + 𓊵 (ḥtp) + 𓏙 (dỉ). Escreve-se o rei primeiro, mas lê-se ḥtp-dỉ-nsw.', en: '𓇓𓏏 (nsw, king) + 𓊵 (ḥtp) + 𓏙 (dỉ). You write the king first, but read ḥtp-dỉ-nsw.' } },
              { meaning: { pt: 'Osíris', en: 'Osiris' }, translit: 'wsỉr', answer: ['Q1', 'D4', 'A40'],
                note: { pt: '𓊨 (ws, trono) + 𓁹 (ỉr, olho) + 𓀭 (determinativo de deus, sem som). O deus a quem a oferenda é dedicada.', en: '𓊨 (ws, throne) + 𓁹 (ỉr, eye) + 𓀭 (determinative of a god, no sound). The god to whom the offering is dedicated.' } },
            ] },
          { kind: 'p', html: { pt: 'É isso. Você começou sem saber um sinal e agora lê e escreve a frase que cobre as paredes do Egito antigo. Da próxima vez que vir uma estela num museu, procure o 𓇓𓏏𓊵𓏙: você vai reconhecer.', en: 'That is it. You started without knowing a single sign, and now you read and write the phrase that covers the walls of ancient Egypt. Next time you see a stela in a museum, look for the 𓇓𓏏𓊵𓏙: you will recognize it.' } },
        ],
      },
    ],
  },
];
