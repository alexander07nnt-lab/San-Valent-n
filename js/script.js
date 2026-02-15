let heartAnimation; // control de requestAnimationFrame para detenerlo
// ===== MATRIX =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let w, h;
function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
window.addEventListener("resize", resize);
resize();

const chars = "❤01ABCDEFGHIJKLMNOPQRSTUVWXYZ❤";
const fontSize = 20;
const phrases = ["mi princesa","mi cielo","te amo","me gustas","eres lo mejor de la vida","me encantas"];
const columns = Math.floor(w / fontSize);
const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,w,h);
  ctx.font = fontSize + "px monospace";

  for(let i=0;i<drops.length;i++){
    let text = Math.random() > 0.985 ? phrases[Math.floor(Math.random()*phrases.length)] : chars.charAt(Math.floor(Math.random()*chars.length));
    const x = i*fontSize, y = drops[i]*fontSize;
    ctx.fillStyle = "#ff003c";
    ctx.fillText(text,x,y);
    if(y>h && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  }
}
setInterval(draw,55);

// ===== PASSWORD =====
function check(){
  const val = document.getElementById("pw").value.trim();
  const msg = document.getElementById("msg");
  if(val==="PANQUECITO"){
    msg.textContent="✅ Correcto, acceso concedido";
    msg.className="msg ok";
    document.getElementById("primero").style.display="none";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    document.getElementById("segundoBody").style.display="block";
    initSegundoCodigo();
  }else{
    msg.textContent="❌ Contraseña incorrecta";
    msg.className="msg err";
  }
}

// ===== SEGUNDO BLOQUE: VIDEO + CARTA + FRASES + LLUVIA DE CORAZONES =====
function initSegundoCodigo(){
  const video = document.getElementById('videoAmor');
  const carta = document.getElementById('carta');
  const btn = document.getElementById('btnAmor');
  const overlay = document.getElementById('overlay');
  const overlayInner = document.getElementById('overlayInner');

  const razones = ["Tu personalidad","Tus ojitos hermosos","Tus labios","Tu rostro","Tu sonrisa","Tu lindo cabello","Tu belleza","Tu hermosa voz","Tu forma de tratarme","Tu carisma","Tu cariño","Tus detalles","Tu presencia","Tu forma de ser","Tus mensajes","Nuestras llamadas","Lo divertida que eres","Tus chistes o bromas xd","Tu forma de molestarme","Por lo única que eres","Tú paciencia hacia mí uffffff","Tus gustos","Tu forma de amarme","Tus \"Fotos 7u7\"","Tus \"Cachetitos\"","Las cosas tan tiernas que haces","Tus halagos","Porqué siempre me haces sentir bien","Te preocupas por mi","Me pones atención","Me haces sonreír en mis peores días","Me aceptas tal y como soy jeje","No me rechazaste... ahora somos novios","Porqué me haces sentir amado","Porqué me das paz","Porque te esfuerzas por mi","Porque eres una buena novia","Porque siempre me dices cosas lindas","Porque eres mi musa","Tus celos a veces xd","Porque me apoyas en todo","Porque me animas cuando estoy triste","Porqué eres muy tierna","Porque eres suficiente","Eres mi lugar seguro","Tus \"Ay que sordo eres!!\"","Tus \"te amo\"","Los vídeos que me compartes y queremos hacer","Porqué te ríes de mis tonterías, aunque no den risa","Me hacés sentir especial","Porque eres la chica más perfecta que he conocido","Porque sí uwu","Me haces reír","Siempre me dices que me amas","Contigo puedo ser yo mismo","Siempre tratas de entenderme o a veces jej","Siempre dices que soy lindo","Me valoras","Tienes una voz que encanta","Porque eres mi universo","Tenemos los mismos gustos","Me has mostrado un amor muy bonito","Juegas LUDO conmigo","Tu esencia es muy linda","Porque no necesito fingir contigo","Porqué eres amable","Porque me da felicidad verte ganar aunque Yo pierda","Me haces sentir seguro","Cómo te burlas de mi a veces","Porque eres pervertida hehe","Porque tu forma de amarme es muy única","Eres mi persona favorita","Quiero estar a tu lado siempre","Me hiciste volver a creer en el amor verdadero","Porque me hiciste volver a amar","Porque me tienes muy enamorado","Porque pienso en ti cuando veo algo que te gusta","Porque me soportas","Porque siempre que nos vemos me gustas mas","Porqué me gusta mucho todo de ti","Tienes un enorme corazón","Eres generosa","Eres la mejor persona que he conocido","Eres mi mundo entero","Porque eres mi chica soñada","Tú cuerpo y alma son hermosos","Porque no quiero estar con otra persona","Porque eres muy importante para mi","A tu lado todo es mejor","Porque te necesito","Porque me salvaste de mi mismo","Por llenar mi vida de paz y felicidad","Porque eres mi luz","Porque eres la dueña de mi corazón","Por existir","Porque mereces ser amada","Me motivas a seguir a delante","Eres el amor de vida","Me derrites el corazón con tu amor","A tu lado todo es mejor","Porqué eres simplemente tu ♡"]; // acorté para prueba
  const emojisRomanticos = ["❤️","💕","💘","💞","💌","🥰","😍","😘"];

  // ===== LLUVIA DE CORAZONES =====
  let heartAnimation;
  function startHeartRain() {
    if(document.getElementById('heartsCanvas')) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'heartsCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '5';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const heartColors = ["#ff4d6d","#ff1a4b","#ff80aa","#ff6699"];
    const heartCount = 60;
    const hearts = [];

    for(let i=0;i<heartCount;i++){
      hearts.push({
        x: Math.random()*width,
        y: Math.random()*height,
        size: Math.random()*20 + 15,
        speed: Math.random()*1 + 0.3,
        color: heartColors[Math.floor(Math.random()*heartColors.length)],
        sway: Math.random()*0.5
      });
    }

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);

    function drawHearts() {
      ctx.clearRect(0,0,width,height);
      hearts.forEach(h=>{
        ctx.fillStyle = h.color;
        ctx.font = `${h.size}px monospace`;
        ctx.fillText("❤", h.x, h.y);
        h.y += h.speed;
        h.x += Math.sin(h.y * 0.01) * h.sway;
        if(h.y > height){
          h.y = -h.size;
          h.x = Math.random()*width;
        }
      });
      heartAnimation = requestAnimationFrame(drawHearts);
    }

    drawHearts();
  }

  function stopHeartRain(){
    cancelAnimationFrame(heartAnimation);
    const canvas = document.getElementById('heartsCanvas');
    if(canvas) canvas.remove();
  }

  // ===== EVENTOS =====
  video.addEventListener('play', ()=>{
    setTimeout(()=>{
      carta.style.display='block';
      btn.style.display='block';
      carta.scrollIntoView({behavior:'smooth'});

      // Inicia lluvia
      startHeartRain();
    },900);
  });

  btn.addEventListener('click', ()=>{
    overlayInner.className='announce-box';
    overlayInner.textContent='¿Quieres saber las razones por las cuales te amo y me gustas?';
    overlay.classList.add('show');

    setTimeout(()=>{
      overlayInner.textContent='Bueno mi amorcito hermoso... Estas son las razones:';
      setTimeout(()=> startFrasesCarrusel(),4000);
    },3000);
  });

  function startFrasesCarrusel(){
    let idx=0;
    overlayInner.className='frase-box';
    function mostrar(){
      if(idx>=razones.length){
        overlay.classList.remove('show');

        // Detener lluvia de corazones
        stopHeartRain();

        return;
      }
      const r1 = emojisRomanticos[Math.floor(Math.random()*emojisRomanticos.length)];
      const r2 = emojisRomanticos[Math.floor(Math.random()*emojisRomanticos.length)];
      overlayInner.innerHTML=`${r1} &nbsp; ${razones[idx]} &nbsp; ${r2}`;
      idx++;
    }
    mostrar();
    const t = setInterval(()=>{
      mostrar();
      if(idx>=razones.length) clearInterval(t);
    },1900);
  }
}
// ===== LLUVIA DE CORAZONES =====
let heartsCanvas, heartsCtx, heartDrops;
function startHeartRain() {
  if(document.getElementById('heartsCanvas')) return; // evitar duplicar

  const heartsCanvas = document.createElement('canvas');
  heartsCanvas.id = 'heartsCanvas';
  heartsCanvas.style.position = 'fixed';
  heartsCanvas.style.top = '0';
  heartsCanvas.style.left = '0';
  heartsCanvas.style.width = '100%';
  heartsCanvas.style.height = '100%';
  heartsCanvas.style.pointerEvents = 'none';
  heartsCanvas.style.zIndex = '5';
  document.body.appendChild(heartsCanvas);

  const heartsCtx = heartsCanvas.getContext('2d');
  let fontSize = 24;
  let columns = Math.floor(window.innerWidth / fontSize);
  let drops = Array(columns).fill(0);

  function resizeHearts(){
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
    columns = Math.floor(window.innerWidth / fontSize);
    drops = Array(columns).fill(0);
  }
  window.addEventListener('resize', resizeHearts);

  function drawHearts() {
    heartsCtx.clearRect(0,0,heartsCanvas.width,heartsCanvas.height);
    heartsCtx.font = fontSize + "px monospace";
    for(let i=0;i<drops.length;i++){
      const x = i*fontSize;
      const y = drops[i]*fontSize;
      heartsCtx.fillStyle = `rgba(255,0,100,0.8)`;
      heartsCtx.fillText("❤", x, y);
      drops[i]++;
      if(y > heartsCanvas.height && Math.random()>0.975) drops[i]=0;
    }
    heartAnimation = requestAnimationFrame(drawHearts);
  }
  drawHearts();
}

function stopHeartRain() {
  cancelAnimationFrame(heartAnimation);
  const canvas = document.getElementById('heartsCanvas');
  if(canvas) canvas.remove();
}

