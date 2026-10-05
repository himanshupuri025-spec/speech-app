/**
 * VOXPULSE TTS STUDIO - MAIN APPLICATION CONTROLLER
 * High-performance multilingual speech synthesis with ElevenLabs
 */

// Default Configuration
const DEFAULT_API_KEY = 'sk_1448db47f22c7c405d38b680dc88d65a8b2ddee38eb57683';
const STORAGE_KEY = 'voxpulse_api_key';
const HISTORY_STORAGE_KEY = 'voxpulse_speech_history';

// Verified voices that work seamlessly with this ElevenLabs key
const PREMADE_VOICES = [
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', desc: 'Warm, British, Narrative', gender: 'male', initial: 'G' },
  { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', desc: 'Bright, American, Expressive', gender: 'female', initial: 'J' },
  { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura', desc: 'Calm, American, Storytelling', gender: 'female', initial: 'L' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', desc: 'Young, American, Energetic', gender: 'male', initial: 'L' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', desc: 'Deep, American, Narration', gender: 'male', initial: 'B' },
  { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', desc: 'Clear, British, Engaging', gender: 'female', initial: 'A' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', desc: 'Authoritative, British, News', gender: 'male', initial: 'D' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', desc: 'Warm, British, Velvet', gender: 'female', initial: 'L' },
  { id: 'pqHfZKP75CvOlQylNhV4', name: 'Bill', desc: 'Trustworthy, American, Docu', gender: 'male', initial: 'B' },
  { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Callum', desc: 'Intense, Transatlantic, Story', gender: 'male', initial: 'C' },
  { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris', desc: 'Charming, American, Casual', gender: 'male', initial: 'C' },
  { id: 'cjVigY5qzO86Huf0OWal', name: 'Eric', desc: 'Friendly, American, Casual', gender: 'male', initial: 'E' },
  { id: 'SAz9YHcvj6GT2YYXdXww', name: 'River', desc: 'Confident, American, Narration', gender: 'neutral', initial: 'R' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', desc: 'Soft, American, News & Calm', gender: 'female', initial: 'S' },
  { id: 'bIHbv24MWmeRgasZH58o', name: 'Will', desc: 'Friendly, American, Expressive', gender: 'male', initial: 'W' }
];

// Rich Sample Paragraphs in Multiple Languages
const SAMPLE_PARAGRAPHS = {
  hi: {
    flag: '🇮🇳',
    name: 'Hindi',
    samples: [
      {
        title: 'मनोरम कहानी (Story)',
        text: 'एक समय की बात है, हिमालय की शांत और मनोरम वादियों में एक प्राचीन पुस्तकालय स्थित था। वहाँ ज्ञान का एक ऐसा अनमोल भंडार था जो सदियों पुराने रहस्यों को संजोए हुए था। जब सुबह की सुनहरी धूप बर्फ से ढकी चोटियों पर पड़ती, तो पूरा वातावरण एक अलौकिक तेज से भर उठता था। चारों तरफ केवल पक्षियों की मधुर चहचहाहट और बहती नदी की कल-कल ध्वनि सुनाई देती थी।'
      },
      {
        title: 'तकनीक और भविष्य (Tech & AI)',
        text: 'आर्टिफिशियल इंटेलिजेंस और आधुनिक तकनीक ने हमारे संचार करने के तरीके को पूरी तरह से बदल दिया है। अब भाषा की कोई सीमा नहीं रही। हम सहजता से अपनी मातृभाषा हिंदी में विचार व्यक्त कर सकते हैं और पूरी दुनिया से जुड़ सकते हैं। यह डिजिटल युग हर विद्यार्थी और शोधकर्ता के लिए ज्ञान के नए द्वार खोल रहा है।'
      },
      {
        title: 'प्रेरणादायक विचार (Inspiration)',
        text: 'सफलता किसी मंजिल का नाम नहीं, बल्कि निरंतर सीखने और आगे बढ़ने की एक खूबसूरत यात्रा है। जब आप अपने सपनों को सच करने का संकल्प लेते हैं, तो रास्ते में आने वाली हर बाधा एक नई सीख बन जाती है। अपनी मेहनत और धैर्य पर विश्वास रखिए, क्योंकि जो कभी हार नहीं मानते, जीत हमेशा उन्हीं की होती है।'
      }
    ]
  },
  en: {
    flag: '🇬🇧',
    name: 'English',
    samples: [
      {
        title: 'Epic Journey',
        text: 'Deep within the heart of an ancient forest, whispers of forgotten legends danced among the towering emerald trees. The morning mist carried the crisp scent of pine and adventure, inviting wanderers to discover the quiet secrets tucked away beneath the canopy of time.'
      },
      {
        title: 'AI Revolution',
        text: 'Modern neural speech synthesis represents a profound milestone in human-computer interaction. By capturing nuanced intonations, emotional warmth, and rhythmic cadence, artificial intelligence bridges geographical barriers and allows stories to resonate across every corner of the globe.'
      }
    ]
  },
  es: {
    flag: '🇪🇸',
    name: 'Spanish',
    samples: [
      {
        title: 'El Valle Dorado',
        text: 'En lo profundo del valle dorado, donde los ríos cantan melodías olvidadas y las montañas tocan el cielo, un joven soñador descubrió el poder transformador de las palabras. Cada nuevo amanecer ofrecía una oportunidad irrepetible para aprender, crear y compartir esperanza con el mundo entero.'
      }
    ]
  },
  fr: {
    flag: '🇫🇷',
    name: 'French',
    samples: [
      {
        title: 'Nuit Parisienne',
        text: 'Au cœur d’une nuit étoilée sur les berges paisibles de la Seine, les lumières de la ville reflètent des siècles d’histoire, de poésie et d’art. La voix humaine possède cette capacité magnifique d’éveiller les émotions et de créer des ponts invisibles entre les âmes.'
      }
    ]
  },
  de: {
    flag: '🇩🇪',
    name: 'German',
    samples: [
      {
        title: 'Der Schwarzwald',
        text: 'In den dichten Wäldern des Schwarzwaldes verbirgt sich eine jahrhundertealte Faszination für Natur und Philosophie. Mit jedem wohlüberlegten Wort erwacht die Vergangenheit zu neuem Leben, getragen von unendlicher Neugier und dem stetigen Streben nach Wissen.'
      }
    ]
  },
  ja: {
    flag: '🇯🇵',
    name: 'Japanese',
    samples: [
      {
        title: '桜の季節 (Sakura)',
        text: '静寂に包まれた朝の京都で、古い寺院の庭に咲き誇る桜の花びらが静かに風に舞っています。何世代にもわたって受け継がれてきた伝統と現代のテクノロジーが調和し、心に深く響く安らぎのひとときを届けてくれます。'
      }
    ]
  },
  ar: {
    flag: '🇸🇦',
    name: 'Arabic',
    samples: [
      {
        title: 'حكمة الشرق',
        text: 'في قلب الصحراء الشاسعة، حيث تلتقي الرمال الذهبية بأفق السماء الصافية، تهمس الرياح بحكايات الأجداد وحكمتهم الخالدة. الكلمة الطيبة سراج ينير دروب الأمل ويبني جسوراً راسخة من المحبة والتفاهم بين جميع شعوب الأرض.'
      }
    ]
  }
};

// Application State
const state = {
  apiKey: localStorage.getItem(STORAGE_KEY) || DEFAULT_API_KEY,
  currentLanguage: 'hi',
  selectedVoiceId: 'JBFqnCBsd6RMkjVDRZzb', // George by default
  modelId: 'eleven_multilingual_v2',
  stability: 0.5,
  similarityBoost: 0.75,
  style: 0.0,
  speed: 1.0,
  audioBlob: null,
  audioUrl: null,
  audioElement: new Audio(),
  audioCtx: null,
  analyserNode: null,
  sourceNode: null,
  isPlaying: false,
  isGenerating: false,
  history: []
};

// DOM Elements
const elements = {
  // Navigation & Status
  apiKeyModal: document.getElementById('api-key-modal'),
  openApiKeyBtn: document.getElementById('btn-open-apikey'),
  closeApiKeyBtn: document.getElementById('btn-close-apikey'),
  saveApiKeyBtn: document.getElementById('btn-save-apikey'),
  apiKeyInput: document.getElementById('apikey-input'),
  apiStatusText: document.getElementById('api-status-text'),
  langQuickbar: document.getElementById('lang-quickbar'),
  samplePillsBar: document.getElementById('sample-pills-bar'),

  // Text Area
  speechText: document.getElementById('speech-text'),
  charCount: document.getElementById('char-count'),
  wordCount: document.getElementById('word-count'),
  estDuration: document.getElementById('est-duration'),
  btnClearText: document.getElementById('btn-clear-text'),
  btnPasteText: document.getElementById('btn-paste-text'),

  // Synthesis Control
  btnGenerate: document.getElementById('btn-generate'),
  btnGenerateText: document.getElementById('btn-generate-text'),

  // Voice Select & Settings
  voiceSearch: document.getElementById('voice-search'),
  voicesList: document.getElementById('voices-list'),
  modelSelect: document.getElementById('model-select'),
  sliderStability: document.getElementById('slider-stability'),
  valStability: document.getElementById('val-stability'),
  sliderSimilarity: document.getElementById('slider-similarity'),
  valSimilarity: document.getElementById('val-similarity'),
  sliderStyle: document.getElementById('slider-style'),
  valStyle: document.getElementById('val-style'),

  // Player & Visualizer
  playerContainer: document.getElementById('player-container'),
  canvas: document.getElementById('visualizer-canvas'),
  visualizerPlaceholder: document.getElementById('visualizer-placeholder'),
  btnPlayPause: document.getElementById('btn-play-pause'),
  iconPlay: document.getElementById('icon-play'),
  iconPause: document.getElementById('icon-pause'),
  btnRewind: document.getElementById('btn-rewind'),
  btnForward: document.getElementById('btn-forward'),
  seekSlider: document.getElementById('seek-slider'),
  timeCurrent: document.getElementById('time-current'),
  timeTotal: document.getElementById('time-total'),
  btnDownload: document.getElementById('btn-download-speech'),
  speedChips: document.querySelectorAll('.speed-chip'),

  // History
  historyList: document.getElementById('history-list'),
  btnClearHistory: document.getElementById('btn-clear-history'),
  toastContainer: document.getElementById('toast-container')
};

// Canvas context
let canvasCtx = null;
let animFrameId = null;

// ==========================================================================
// INITIALIZATION
// ==========================================================================
function initApp() {
  canvasCtx = elements.canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Setup API Key
  elements.apiKeyInput.value = state.apiKey;
  updateApiStatusUI();

  // Populate Voices Grid
  renderVoicesList(PREMADE_VOICES);

  // Setup Language Bar & Initial Sample
  renderLanguageBar();
  setLanguage('hi', 0); // Load Hindi story sample by default

  // Setup Event Listeners
  setupEventListeners();

  // Load Saved History
  loadHistoryFromStorage();

  // Draw idle visualizer
  drawIdleVisualizer();
}

function resizeCanvas() {
  const rect = elements.canvas.getBoundingClientRect();
  elements.canvas.width = rect.width * window.devicePixelRatio;
  elements.canvas.height = rect.height * window.devicePixelRatio;
  if (canvasCtx) {
    canvasCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
}

// ==========================================================================
// VOICE RENDERING & SELECTION
// ==========================================================================
function renderVoicesList(voices) {
  elements.voicesList.innerHTML = '';

  voices.forEach(voice => {
    const isSelected = voice.id === state.selectedVoiceId;
    const card = document.createElement('div');
    card.className = `voice-card ${isSelected ? 'selected' : ''}`;
    card.dataset.id = voice.id;

    card.innerHTML = `
      <div class="voice-avatar ${voice.gender}">
        ${voice.initial}
      </div>
      <div class="voice-meta">
        <div class="voice-name">
          <span>${voice.name}</span>
          ${isSelected ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
        </div>
        <div class="voice-tag">${voice.desc}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      selectVoice(voice.id);
    });

    elements.voicesList.appendChild(card);
  });
}

function selectVoice(voiceId) {
  state.selectedVoiceId = voiceId;
  const cards = elements.voicesList.querySelectorAll('.voice-card');
  cards.forEach(card => {
    const isThis = card.dataset.id === voiceId;
    card.classList.toggle('selected', isThis);
    const nameEl = card.querySelector('.voice-name');
    const existingCheck = nameEl.querySelector('svg');
    if (isThis && !existingCheck) {
      nameEl.insertAdjacentHTML('beforeend', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>');
    } else if (!isThis && existingCheck) {
      existingCheck.remove();
    }
  });

  const selectedVoice = PREMADE_VOICES.find(v => v.id === voiceId);
  if (selectedVoice) {
    showToast(`Voice set to ${selectedVoice.name} (${selectedVoice.desc})`, 'success');
  }
}

// Voice search filter
function filterVoices(query) {
  const q = query.toLowerCase().trim();
  const filtered = PREMADE_VOICES.filter(v =>
    v.name.toLowerCase().includes(q) ||
    v.desc.toLowerCase().includes(q) ||
    v.gender.toLowerCase().includes(q)
  );
  renderVoicesList(filtered);
}

// ==========================================================================
// LANGUAGES & PARAGRAPH SAMPLES
// ==========================================================================
function renderLanguageBar() {
  elements.langQuickbar.innerHTML = '<span class="lang-label">Languages</span>';

  Object.entries(SAMPLE_PARAGRAPHS).forEach(([code, lang]) => {
    const btn = document.createElement('button');
    btn.className = `lang-pill ${code === state.currentLanguage ? 'active' : ''}`;
    btn.innerHTML = `<span class="lang-flag">${lang.flag}</span> <span>${lang.name}</span>`;

    btn.addEventListener('click', () => {
      setLanguage(code, 0);
    });

    elements.langQuickbar.appendChild(btn);
  });
}

function setLanguage(code, sampleIndex = 0) {
  state.currentLanguage = code;

  // Update active pill in quickbar
  const pills = elements.langQuickbar.querySelectorAll('.lang-pill');
  pills.forEach((p, idx) => {
    const langKeys = Object.keys(SAMPLE_PARAGRAPHS);
    p.classList.toggle('active', langKeys[idx] === code);
  });

  const lang = SAMPLE_PARAGRAPHS[code];
  if (!lang) return;

  // Render sample paragraph buttons
  elements.samplePillsBar.innerHTML = `<span class="sample-tag">${lang.name} Samples:</span>`;
  lang.samples.forEach((sample, idx) => {
    const sBtn = document.createElement('button');
    sBtn.className = 'sample-btn';
    sBtn.textContent = sample.title;
    sBtn.addEventListener('click', () => {
      elements.speechText.value = sample.text;
      updateTextStats();
      showToast(`Loaded ${lang.name}: ${sample.title}`, 'info');
    });
    elements.samplePillsBar.appendChild(sBtn);
  });

  // Load sample into textarea
  if (lang.samples[sampleIndex]) {
    elements.speechText.value = lang.samples[sampleIndex].text;
    updateTextStats();
  }
}

function updateTextStats() {
  const text = elements.speechText.value;
  const chars = text.length;
  elements.charCount.textContent = chars.toLocaleString();

  // Words count
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  elements.wordCount.textContent = words.toLocaleString();

  // Estimated speech duration at ~140 words per minute
  const totalSeconds = Math.ceil((words / 140) * 60);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  elements.estDuration.textContent = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
}

// ==========================================================================
// ELEVENLABS TEXT-TO-SPEECH API CALL
// ==========================================================================
async function generateSpeech() {
  const text = elements.speechText.value.trim();

  if (!text) {
    showToast('Please enter or select a paragraph to read!', 'error');
    elements.speechText.focus();
    return;
  }

  if (!state.apiKey) {
    showToast('ElevenLabs API key is missing. Please enter your key.', 'error');
    openApiKeyModal();
    return;
  }

  // Set loading state
  setGeneratingState(true);

  try {
    const voiceId = state.selectedVoiceId;
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const payload = {
      text: text,
      model_id: state.modelId,
      voice_settings: {
        stability: parseFloat(state.stability),
        similarity_boost: parseFloat(state.similarityBoost),
        style: parseFloat(state.style),
        use_speaker_boost: true
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': state.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorMsg = `Server returned error (${response.status})`;
      try {
        const errJson = await response.json();
        if (errJson.detail && errJson.detail.message) {
          errorMsg = errJson.detail.message;
        }
      } catch (e) {
        // Fallback
      }
      throw new Error(errorMsg);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    // Update state
    state.audioBlob = audioBlob;
    state.audioUrl = audioUrl;

    // Load into player
    loadAudioIntoPlayer(audioUrl);

    // Save to history
    const voiceObj = PREMADE_VOICES.find(v => v.id === voiceId) || { name: 'Custom Voice' };
    const langObj = SAMPLE_PARAGRAPHS[state.currentLanguage] || { flag: '🌐', name: 'Text' };

    addToHistory({
      id: Date.now(),
      textSnippet: text.slice(0, 90) + (text.length > 90 ? '...' : ''),
      fullText: text,
      flag: langObj.flag,
      voiceName: voiceObj.name,
      voiceId: voiceId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      blob: audioBlob,
      url: audioUrl
    });

    showToast('Speech generated successfully! Ready to play.', 'success');
  } catch (err) {
    console.error('TTS Generation error:', err);
    showToast(`Generation Failed: ${err.message}`, 'error');
  } finally {
    setGeneratingState(false);
  }
}

function setGeneratingState(isGenerating) {
  state.isGenerating = isGenerating;
  elements.btnGenerate.disabled = isGenerating;
  elements.btnGenerate.classList.toggle('loading', isGenerating);
  elements.btnGenerateText.textContent = isGenerating ? 'Synthesizing Audio with ElevenLabs...' : 'Read Whole Paragraph';
}

// ==========================================================================
// AUDIO PLAYER & VISUALIZER (Web Audio API)
// ==========================================================================
function setupAudioGraph() {
  if (state.audioCtx) return;

  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  state.audioCtx = new AudioCtx();
  state.analyserNode = state.audioCtx.createAnalyser();
  state.analyserNode.fftSize = 128;
  state.analyserNode.smoothingTimeConstant = 0.8;

  state.sourceNode = state.audioCtx.createMediaElementSource(state.audioElement);
  state.sourceNode.connect(state.analyserNode);
  state.analyserNode.connect(state.audioCtx.destination);
}

function loadAudioIntoPlayer(audioUrl) {
  state.audioElement.src = audioUrl;
  state.audioElement.playbackRate = state.speed;

  elements.playerContainer.classList.add('active');
  elements.visualizerPlaceholder.classList.add('hidden');
  elements.btnPlayPause.disabled = false;
  elements.btnDownload.disabled = false;

  state.audioElement.onloadedmetadata = () => {
    elements.seekSlider.max = Math.floor(state.audioElement.duration);
    elements.seekSlider.value = 0;
    elements.timeTotal.textContent = formatTime(state.audioElement.duration);
    elements.timeCurrent.textContent = '00:00';

    // Auto play once loaded
    playAudio();
  };

  state.audioElement.ontimeupdate = () => {
    if (!elements.seekSlider.matches(':active')) {
      elements.seekSlider.value = Math.floor(state.audioElement.currentTime);
    }
    elements.timeCurrent.textContent = formatTime(state.audioElement.currentTime);
  };

  state.audioElement.onended = () => {
    pauseAudio();
    elements.seekSlider.value = 0;
    elements.timeCurrent.textContent = '00:00';
  };
}

function playAudio() {
  setupAudioGraph();
  if (state.audioCtx && state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }

  state.audioElement.play().then(() => {
    state.isPlaying = true;
    elements.iconPlay.style.display = 'none';
    elements.iconPause.style.display = 'block';
    startVisualizerLoop();
  }).catch(err => {
    console.warn('Audio play error:', err);
  });
}

function pauseAudio() {
  state.audioElement.pause();
  state.isPlaying = false;
  elements.iconPlay.style.display = 'block';
  elements.iconPause.style.display = 'none';
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
  }
  drawIdleVisualizer();
}

function togglePlayPause() {
  if (!state.audioElement.src) return;
  if (state.isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

// Visualizer Loop
function startVisualizerLoop() {
  if (!state.analyserNode || !canvasCtx) return;

  const bufferLength = state.analyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    animFrameId = requestAnimationFrame(draw);
    state.analyserNode.getByteFrequencyData(dataArray);

    const width = elements.canvas.getBoundingClientRect().width;
    const height = elements.canvas.getBoundingClientRect().height;

    canvasCtx.clearRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.2;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height * 0.85;

      // Dynamic color gradient for visualizer bars
      const grad = canvasCtx.createLinearGradient(0, height, 0, 0);
      grad.addColorStop(0, '#6366f1');
      grad.addColorStop(0.5, '#a855f7');
      grad.addColorStop(1, '#ec4899');

      canvasCtx.fillStyle = grad;
      canvasCtx.beginPath();
      canvasCtx.roundRect(x, height - barHeight, barWidth - 2, barHeight, [4, 4, 0, 0]);
      canvasCtx.fill();

      // Top glow dot
      if (barHeight > 8) {
        canvasCtx.fillStyle = '#ffffff';
        canvasCtx.beginPath();
        canvasCtx.arc(x + (barWidth - 2) / 2, height - barHeight + 2, 1.8, 0, Math.PI * 2);
        canvasCtx.fill();
      }

      x += barWidth;
    }
  }

  draw();
}

function drawIdleVisualizer() {
  if (!canvasCtx) return;
  const width = elements.canvas.getBoundingClientRect().width;
  const height = elements.canvas.getBoundingClientRect().height;
  canvasCtx.clearRect(0, 0, width, height);

  // Subtle sine wave pattern when paused
  canvasCtx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
  canvasCtx.lineWidth = 2;
  canvasCtx.beginPath();
  for (let x = 0; x < width; x += 5) {
    const y = height / 2 + Math.sin(x * 0.05) * 8;
    if (x === 0) canvasCtx.moveTo(x, y);
    else canvasCtx.lineTo(x, y);
  }
  canvasCtx.stroke();
}

// Download Audio as MP3
function downloadAudio() {
  if (!state.audioBlob) return;

  const currentVoice = PREMADE_VOICES.find(v => v.id === state.selectedVoiceId) || { name: 'voice' };
  const filename = `voxpulse_${state.currentLanguage}_${currentVoice.name.toLowerCase()}_${Date.now()}.mp3`;

  const a = document.createElement('a');
  a.href = state.audioUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showToast(`Downloaded: ${filename}`, 'success');
}

// ==========================================================================
// HISTORY MANAGEMENT
// ==========================================================================
function addToHistory(item) {
  state.history.unshift(item);
  if (state.history.length > 20) state.history.pop();
  renderHistory();
}

function renderHistory() {
  if (state.history.length === 0) {
    elements.historyList.innerHTML = `
      <div class="empty-state">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:8px; opacity:0.5;">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <p>No generated speeches yet. Type or pick a paragraph and click "Read Whole Paragraph"!</p>
      </div>
    `;
    return;
  }

  elements.historyList.innerHTML = '';
  state.history.forEach(item => {
    const el = document.createElement('div');
    el.className = 'history-item';
    el.innerHTML = `
      <div class="history-info">
        <span class="history-flag">${item.flag}</span>
        <div class="history-text-preview">
          <span class="history-title">${escapeHtml(item.textSnippet)}</span>
          <span class="history-meta">
            <span>Voice: <strong>${item.voiceName}</strong></span>
            <span>•</span>
            <span>${item.timestamp}</span>
          </span>
        </div>
      </div>
      <div class="history-actions">
        <button class="btn-history-play" title="Play recording">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </button>
        <button class="btn-history-load" title="Load text into editor">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
        <button class="btn-history-download" title="Download MP3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        </button>
      </div>
    `;

    // Actions
    el.querySelector('.btn-history-play').addEventListener('click', () => {
      state.audioBlob = item.blob;
      state.audioUrl = item.url;
      loadAudioIntoPlayer(item.url);
      showToast(`Playing clip (${item.voiceName})`, 'info');
    });

    el.querySelector('.btn-history-load').addEventListener('click', () => {
      elements.speechText.value = item.fullText;
      updateTextStats();
      selectVoice(item.voiceId);
      showToast('Text loaded into editor', 'info');
    });

    el.querySelector('.btn-history-download').addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = item.url;
      a.download = `speech_${item.voiceName.toLowerCase()}_${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    elements.historyList.appendChild(el);
  });
}

function loadHistoryFromStorage() {
  renderHistory();
}

function clearHistory() {
  state.history = [];
  renderHistory();
  showToast('Speech history cleared', 'info');
}

// ==========================================================================
// API KEY MODAL & UTILS
// ==========================================================================
function openApiKeyModal() {
  elements.apiKeyInput.value = state.apiKey;
  elements.apiKeyModal.classList.add('open');
}

function closeApiKeyModal() {
  elements.apiKeyModal.classList.remove('open');
}

function saveApiKey() {
  const newKey = elements.apiKeyInput.value.trim();
  if (!newKey) {
    showToast('API Key cannot be empty', 'error');
    return;
  }
  state.apiKey = newKey;
  localStorage.setItem(STORAGE_KEY, newKey);
  updateApiStatusUI();
  closeApiKeyModal();
  showToast('API Key updated successfully!', 'success');
}

function updateApiStatusUI() {
  if (state.apiKey) {
    const masked = state.apiKey.slice(0, 6) + '...' + state.apiKey.slice(-4);
    elements.apiStatusText.textContent = `ElevenLabs Connected (${masked})`;
  } else {
    elements.apiStatusText.textContent = 'API Key Not Set';
  }
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;

  elements.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

// ==========================================================================
// EVENT LISTENERS BINDING
// ==========================================================================
function setupEventListeners() {
  // Text area inputs
  elements.speechText.addEventListener('input', updateTextStats);

  // Clear & Paste buttons
  elements.btnClearText.addEventListener('click', () => {
    elements.speechText.value = '';
    updateTextStats();
    elements.speechText.focus();
  });

  elements.btnPasteText.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        elements.speechText.value = text;
        updateTextStats();
        showToast('Pasted text from clipboard', 'info');
      }
    } catch (err) {
      showToast('Clipboard access denied. Please paste manually (Ctrl+V)', 'error');
    }
  });

  // Generate Button
  elements.btnGenerate.addEventListener('click', generateSpeech);

  // Voice Search
  elements.voiceSearch.addEventListener('input', e => {
    filterVoices(e.target.value);
  });

  // Model Selector
  elements.modelSelect.addEventListener('change', e => {
    state.modelId = e.target.value;
    showToast(`Model set to: ${e.target.selectedOptions[0].text}`, 'info');
  });

  // Sliders
  elements.sliderStability.addEventListener('input', e => {
    state.stability = e.target.value;
    elements.valStability.textContent = `${Math.round(e.target.value * 100)}%`;
  });

  elements.sliderSimilarity.addEventListener('input', e => {
    state.similarityBoost = e.target.value;
    elements.valSimilarity.textContent = `${Math.round(e.target.value * 100)}%`;
  });

  elements.sliderStyle.addEventListener('input', e => {
    state.style = e.target.value;
    elements.valStyle.textContent = `${Math.round(e.target.value * 100)}%`;
  });

  // Player controls
  elements.btnPlayPause.addEventListener('click', togglePlayPause);

  elements.btnRewind.addEventListener('click', () => {
    state.audioElement.currentTime = Math.max(0, state.audioElement.currentTime - 5);
  });

  elements.btnForward.addEventListener('click', () => {
    state.audioElement.currentTime = Math.min(state.audioElement.duration || 0, state.audioElement.currentTime + 5);
  });

  elements.seekSlider.addEventListener('input', e => {
    state.audioElement.currentTime = e.target.value;
  });

  // Speed chips
  elements.speedChips.forEach(chip => {
    chip.addEventListener('click', () => {
      elements.speedChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const rate = parseFloat(chip.dataset.speed);
      state.speed = rate;
      state.audioElement.playbackRate = rate;
    });
  });

  // Download
  elements.btnDownload.addEventListener('click', downloadAudio);

  // History Clear
  elements.btnClearHistory.addEventListener('click', clearHistory);

  // API Key Modal
  elements.openApiKeyBtn.addEventListener('click', openApiKeyModal);
  elements.closeApiKeyBtn.addEventListener('click', closeApiKeyModal);
  elements.saveApiKeyBtn.addEventListener('click', saveApiKey);
  elements.apiKeyModal.addEventListener('click', e => {
    if (e.target === elements.apiKeyModal) closeApiKeyModal();
  });
}

// Kick off
document.addEventListener('DOMContentLoaded', initApp);
