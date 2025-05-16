"use strict";

// =============================
// Modular Professional Script
// =============================

(function() {
  // ---------- Configuration Constants ----------
  const CONFIG = {
    RATE_LIMIT_MS: 1000,
    MAX_MESSAGE_LENGTH: 200,
    LOCAL_STORAGE_KEY: 'chatbotProgress',
    API_CONTACT: 'https://api.kvnbbg.fr/contact',
    SOUNDS: {
      launch: 'https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg',
      success: 'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3',
      error: 'https://codeskulptor-demos.commondatorage.googleapis.com/pang/arrow.mp3',
      victory: 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'
    },
    QUIET_SCROLL_THRESHOLD: 300
  };

  // ---------- State Variables ----------
  let lastMessageTime = 0;
  let userProgress = {
    level: 1,
    points: 0,
    topicsAsked: new Set(),
    badgesEarned: 0,
    messageCount: 0
  };

  // ---------- DOM Cache ----------
  const dom = {};

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // Cache elements
    dom.html = document.documentElement;
    dom.chatOutput = document.getElementById('chat-output');
    dom.userInput = document.getElementById('user-message');
    dom.sendButton = document.querySelector('.input-container button');
    dom.progressBar = document.getElementById('progressBar');
    dom.themeToggle = document.getElementById('theme-toggle');
    dom.backToTop = document.getElementById('back-to-top');
    
    // Load progress
    loadProgress();
    updateProgressUI();

    // Attach handlers
    dom.sendButton.addEventListener('click', sendMessage);
    dom.userInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendMessage();
    });
    dom.themeToggle.addEventListener('click', toggleTheme);
    window.addEventListener('scroll', handleScroll);
    dom.backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ---------- Theme Toggle ----------
  function toggleTheme() {
    const isDark = dom.html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // ---------- Scroll Handler ----------
  function handleScroll() {
    if (window.pageYOffset > CONFIG.QUIET_SCROLL_THRESHOLD) {
      dom.backToTop.classList.add('visible');
    } else {
      dom.backToTop.classList.remove('visible');
    }
  }

  // ---------- Chatbot Logic ----------
  function sendMessage() {
    const now = Date.now();
    if (now - lastMessageTime < CONFIG.RATE_LIMIT_MS) {
      return addBotMessage('⏳ Slow down, space traveler!');
    }
    lastMessageTime = now;

    const text = dom.userInput.value.trim().slice(0, CONFIG.MAX_MESSAGE_LENGTH);
    if (!text) {
      return addBotMessage('Please enter a message. Try "list" or "space game".');
    }
    addUserMessage(text);
    dom.userInput.value = '';

    userProgress.messageCount++;
    userProgress.points += 10;
    checkMilestones();
    saveProgress();
    updateProgressUI();

    // Process commands
    const cmd = text.toLowerCase();
    if (cmd === 'space game') {
      openGame();
    } else if (cmd === 'list' || cmd.includes('glossary')) {
      addBotMessage(getGlossary());
    } else if (hasKnownCommand(cmd)) {
      respondToCommand(cmd);
    } else {
      addBotMessage(`I didn't catch that. Try "about", "quest", or "skills".`);
    }
  }

  function addUserMessage(msg) {
    const p = document.createElement('p');
    p.classList.add('user');
    p.textContent = msg;
    dom.chatOutput.appendChild(p);
    dom.chatOutput.scrollTop = dom.chatOutput.scrollHeight;
  }

  function addBotMessage(msg) {
    const p = document.createElement('p');
    p.classList.add('bot');
    p.textContent = msg;
    dom.chatOutput.appendChild(p);
    dom.chatOutput.scrollTop = dom.chatOutput.scrollHeight;
  }

  function respondToCommand(cmd) {
    // Example: explore glossary keys
    const key = Object.keys(glossary).find(k => cmd.includes(k));
    if (key) {
      userProgress.topicsAsked.add(key);
      addBotMessage(glossary[key].replace('${getUserLevel()}', getUserLevel()));
      checkMilestones();
    }
  }

  function openGame() {
    addBotMessage('🚀 Launching space game...');
    window.open('https://kvnbbg.github.io/Underconstruction-Screen-Space-theme/', '_blank');
    awardBadge('gamer');
  }

  // ---------- Progress & Badges ----------
  function getUserLevel() {
    return Math.floor(userProgress.points / 100) + 1;
  }

  function getProgressPercent() {
    return Math.min(100, (userProgress.points % 100));
  }

  function updateProgressUI() {
    if (dom.progressBar) dom.progressBar.value = getProgressPercent();
  }

  function awardBadge(key) {
    if (badges[key] && !badges[key].earned) {
      badges[key].earned = true;
      userProgress.badgesEarned++;
      userProgress.points += badges[key].points;
      saveProgress();
      updateProgressUI();
      addBotMessage(`🏅 Achievement: ${badges[key].name}!`);
    }
  }

  function checkMilestones() {
    if (userProgress.messageCount === 5) awardBadge('chatter');
    if (userProgress.topicsAsked.size >= 3) awardBadge('explorer');
  }

  function saveProgress() {
    const data = {
      level: userProgress.level,
      points: userProgress.points,
      topicsAsked: Array.from(userProgress.topicsAsked),
      badgesEarned: userProgress.badgesEarned,
      messageCount: userProgress.messageCount
    };
    localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  function loadProgress() {
    const saved = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);
    if (saved) {
      const obj = JSON.parse(saved);
      userProgress = Object.assign(userProgress, obj, { topicsAsked: new Set(obj.topicsAsked) });
    }
  }

  // ---------- Glossary & Badges Data ----------
  const glossary = {
    list: 'Commands: about, projects, github, blog, skills, contact, funfact, quest, leaderboard, easter',
    about: 'I’m a freelance dev with 7+ years of coding wizardry! 🌌',
    projects: 'Explore my work at https://github.com/kvnbbg 🚀',
    github: 'Find code at https://github.com/kvnbbg 🐙',
    blog: 'Read tutorials at https://kvnbbg.fr 📝',
    skills: 'JS, Python, React, Three.js, GraphQL, and more! 💻',
    contact: 'Reach me at contact@kvnbbg.fr 📬',
    funfact: 'I built a game in 48h at a hackathon! 🎮',
    quest: 'Ask about "skills", "projects", "funfact"! 🗝️',
    leaderboard: `You’re level ${getUserLevel()}! Aim for more points! 🏆`,
    easter: 'Type "space game" for a surprise! 🕵️'
  };

  const badges = {
    explorer: { name: 'Explorer', desc: 'Asked 3 topics', points: 50, earned: false },
    gamer:    { name: 'Gamer',    desc: 'Launched game',    points: 100, earned: false },
    chatter:  { name: 'Chatter',  desc: 'Sent 5 msgs',      points: 70, earned: false }
  };

})();
