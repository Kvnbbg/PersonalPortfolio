"use strict";

// Day Night Toggle
function toggleTheme() {
  document.body.classList.toggle("night");
}

// Improved function to generate random integers
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Optimized and improved error handling for fetching IP addresses
const updateDisplayWithIPAndCountry = async () => {
  const displayElement = document.getElementById("ip-display");
  if (!displayElement) {
    console.error("Element with id='ip-display' not found.");
    return;
  }

  try {
    const onVPN = Math.random() < 0.5; // 50% chance
    const content = onVPN
      ? getFakeIPWithCountryEmoji()
      : await getRealIPAddress();
    displayElement.textContent = content;
  } catch (error) {
    console.error("Error fetching or simulating IP:", error);
    displayElement.textContent = "Error fetching IP address";
  }
};

// Using fetch API with error checking for getting real IP address
const getRealIPAddress = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  if (!response.ok) throw new Error("Failed to fetch IP address");
  const data = await response.json();
  return data.ip;
};

// Simplified fake IP address generation
const getFakeIPWithCountryEmoji = () => {
  const fakeIP = Array.from({ length: 4 }, () => getRandomInt(0, 255)).join(
    ".",
  );
  const countryEmojis = ["🇺🇸", "🇨🇦", "🇬🇧", "🇩🇪", "🇯🇵", "🇦🇺", "🇫🇷"];
  const randomEmoji = countryEmojis[getRandomInt(0, countryEmojis.length - 1)];
  return `${fakeIP}, ${randomEmoji}`;
};

// Embed YouTube video with more robust element checking
const embedYouTubeVideo = () => {
  const videoContainer = document.getElementById("video-container");
  if (!videoContainer) {
    console.error("Element with id='video-container' not found.");
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.width = "560";
  iframe.height = "315";
  iframe.src = "https://www.youtube.com/embed/PE4JJ80QDNE";
  iframe.frameBorder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  videoContainer.appendChild(iframe);
};

// Improved dynamic warning message creation
const createWarningDiv = () => {
  const userLang = navigator.language || navigator.userLanguage;
  const messages = {
    en: "JavaScript is required to fully enjoy our content. Please enable it in your browser settings.",
    fr: "JavaScript est nécessaire pour profiter pleinement de notre contenu. Veuillez l'activer dans les paramètres de votre navigateur.",
  };

  const message = messages[userLang.startsWith("fr") ? "fr" : "en"];
  const warningDiv = document.createElement("div");
  warningDiv.setAttribute("role", "alert");
  warningDiv.classList.add("warning-div");
  warningDiv.textContent = message;
  document.body.appendChild(warningDiv);

  const yesButton = document.createElement("button");
  yesButton.textContent = userLang.startsWith("fr")
    ? "Oui, j'ai JavaScript"
    : "Yes, I have JavaScript";
  yesButton.onclick = () => {
    warningDiv.style.display = "none";
    triggerFireworks();
  };

  const noButton = document.createElement("button");
  noButton.textContent = userLang.startsWith("fr")
    ? "Non, je n'ai pas JavaScript"
    : "No, I don't have JavaScript";
  noButton.onclick = () =>
    window.open("https://www.wikihow.com/Enable-Javascript", "_blank");

  warningDiv.appendChild(yesButton);
  warningDiv.appendChild(noButton);

  return warningDiv;
};

// Random math joke generator with mental calculations
const mathJokes = {
  en: [
    "Why did the student do multiplication problems on the floor? The teacher told him not to use tables.",
    "Why don't you do arithmetic in the jungle? Because if you add 4+4 you get ate.",
    "If you have 5 apples and you give away 2, how many apples do you have left?",
    "Why was the math book sad? Because it had too many problems.",
    "Why was the equal sign so humble? Because it knew it wasn’t less than or greater than anyone else.",
  ],
  fr: [
    "Pourquoi l'élève faisait-il des multiplications par terre? Parce que le professeur lui a dit de ne pas utiliser les tables.",
    "Pourquoi ne fait-on pas d'arithmétique dans la jungle? Parce que si vous ajoutez 4+4, vous obtenez mangé.",
    "Si vous avez 5 pommes et que vous en donnez 2, combien vous en reste-t-il?",
    "Pourquoi le livre de maths était-il triste? Parce qu'il avait trop de problèmes.",
    "Pourquoi le signe égal était-il si humble? Parce qu'il savait qu'il n'était ni inférieur ni supérieur à quiconque.",
  ],
};

// Developer jokes
const developerJokes = {
  en: [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "How many programmers does it take to change a light bulb? None, it's a hardware problem.",
    "Why do Java developers wear glasses? Because they don't C#.",
    "What is a programmer's favorite hangout place? Foo Bar.",
    "Why did the programmer go broke? Because he used up all his cache.",
  ],
  fr: [
    "Pourquoi les programmeurs préfèrent-ils le mode sombre? Parce que la lumière attire les bugs.",
    "Combien de programmeurs faut-il pour changer une ampoule? Aucun, c'est un problème matériel.",
    "Pourquoi les développeurs Java portent-ils des lunettes? Parce qu'ils ne voient pas en C#.",
    "Quel est l'endroit préféré des programmeurs? Foo Bar.",
    "Pourquoi le programmeur est-il devenu fauché? Parce qu'il a utilisé tout son cache.",
  ],
};

// Random math challenge generator
const generateMathChallenge = () => {
  const num1 = getRandomInt(1, 10);
  const num2 = getRandomInt(1, 10);
  const operators = ["+", "-", "*", "/"];
  const operator = operators[getRandomInt(0, operators.length - 1)];
  const challenge = `${num1} ${operator} ${num2}`;
  const answer = eval(challenge).toFixed(2); // Rounded to 2 decimal places
  return { challenge, answer };
};

// State management for the math mini-game
let currentChallenge = null;
const userLang = navigator.language.startsWith("fr") ? "fr" : "en";

// Simplified chatbot response function with math challenges and jokes
function getChatbotResponse() {
  const userInput = document.getElementById("userInput")?.value.toLowerCase();
  const responseElement = document.getElementById("chatbotAnswer");

  if (!userInput || userInput.trim() === "") {
    responseElement.innerText =
      userLang === "en"
        ? "Please type something!"
        : "Veuillez taper quelque chose !";
    return;
  }

  let response;

  if (currentChallenge) {
    const userAnswer = parseFloat(userInput);
    if (
      !isNaN(userAnswer) &&
      userAnswer === parseFloat(currentChallenge.answer)
    ) {
      response =
        userLang === "en" ? "Correct! Well done!" : "Correct! Bien joué!";
      currentChallenge = null;
    } else {
      response =
        userLang === "en"
          ? `Incorrect. Try again: ${currentChallenge.challenge} = ?`
          : `Incorrect. Essayez encore : ${currentChallenge.challenge} = ?`;
    }
  } else if (Math.random() < 0.5) {
    const joke =
      developerJokes[userLang][
        getRandomInt(0, developerJokes[userLang].length)
      ];
    response = joke;
  } else {
    currentChallenge = generateMathChallenge();
    response =
      userLang === "en"
        ? `Let's play a math game! Solve this: ${currentChallenge.challenge} = ?`
        : `Jouons à un jeu de mathématiques ! Résolvez ceci : ${currentChallenge.challenge} = ?`;
  }

  responseElement.innerText = response;

  if (Math.random() < 0.2) {
    // 20% chance to trigger fireworks
    triggerFireworks();
  }
}

// Implementations of triggering fireworks as needed
function triggerFireworks() {
  const fireworksDiv = document.createElement("div");
  fireworksDiv.classList.add("fireworks-animation");

  const styles = ["red", "green", "blue", "yellow", "purple"];
  const randomStyle = styles[getRandomInt(0, styles.length - 1)];
  fireworksDiv.style.backgroundColor = randomStyle;

  fireworksDiv.style.position = "fixed";
  fireworksDiv.style.top = `${getRandomInt(10, 90)}%`;
  fireworksDiv.style.left = `${getRandomInt(10, 90)}%`;
  fireworksDiv.style.width = "50px";
  fireworksDiv.style.height = "50px";
  fireworksDiv.style.borderRadius = "50%";
  fireworksDiv.style.boxShadow = "0 0 20px 10px rgba(255, 255, 255, 0.7)";
  fireworksDiv.style.animation = "explode 1s ease-out";

  document.body.appendChild(fireworksDiv);

  setTimeout(() => {
    document.body.removeChild(fireworksDiv);
  }, 2000); // Adjust time according to your animation
}

// Adding fireworks animation CSS
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes explode {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

// Initialization after DOM load
document.addEventListener("DOMContentLoaded", () => {
  embedYouTubeVideo();
  updateDisplayWithIPAndCountry();
  if (!document.querySelector(".warning-div")) {
    createWarningDiv();
  }
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
  document.getElementById("userInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getChatbotResponse();
    }
  });
});
 /********* Notice Modal Handling **********/
      (function() {
        const noticeModal = document.getElementById("notice-modal");
        const noticeYesBtn = document.getElementById("notice-yes-btn");
        noticeYesBtn.addEventListener("click", () => {
          noticeModal.style.transition = "opacity 0.5s ease-out";
          noticeModal.style.opacity = 0;
          setTimeout(() => { noticeModal.style.display = "none"; }, 500);
        });
      })();

      /********* Chatbot Interaction Logic **********/
      function sendMessage() {
        const inputField = document.getElementById("user-message");
        const message = inputField.value.trim();
        if (!message) return;
        const chatOutput = document.getElementById("chat-output");
        inputField.value = "";

        // Create user message bubble
        const userBubble = document.createElement("p");
        userBubble.style.textAlign = "right";
        userBubble.style.backgroundColor = "#007aff";
        userBubble.style.color = "#fff";
        userBubble.style.padding = "10px 15px";
        userBubble.style.margin = "10px 0";
        userBubble.style.borderRadius = "20px 20px 20px 0";
        userBubble.textContent = message;
        chatOutput.appendChild(userBubble);
        chatOutput.scrollTop = chatOutput.scrollHeight;

        // Check for secret trigger: "space game"  🛸
        if (message.toLowerCase() === "space game") {
          setTimeout(() => {
            window.open("https://kvnbbg.github.io/Underconstruction-Screen-Space-theme/", "_blank");
          }, 500);
          addBotMessage("Secret trigger activated! Opening game link...🛸 ");
          return;
        }

        // Basic responses for common queries 🛸
        if (message.toLowerCase().includes("about")) {
          addBotMessage("I began my journey at STUDI and now work as a freelance developer creating projects.");
        } else if (message.toLowerCase().includes("project")) {
          addBotMessage("Check out my projects on my portfolio and GitHub. Visit my blog at https://kvnbbg.fr for more insights!");
        } else if (message.toLowerCase().includes("github")) {
          addBotMessage("My GitHub profile: https://github.com/kvnbbg");
        } else if (message.toLowerCase().includes("blog")) {
          addBotMessage("Visit my blog here: https://kvnbbg.fr");
        } else {
          showLoadingAnimation();
          setTimeout(() => {
            hideLoadingAnimation();
            addBotMessage("I'm continuously learning and evolving. Ask me more about my work, type 'about'  or type 'space game' for a surprise! 🛸");
          }, 2000);
        }
      }

      function addBotMessage(text) {
        const chatOutput = document.getElementById("chat-output");
        const botBubble = document.createElement("p");
        botBubble.style.textAlign = "left";
        botBubble.style.backgroundColor = "#e5e5ea";
        botBubble.style.color = "#000";
        botBubble.style.padding = "10px 15px";
        botBubble.style.margin = "10px 0";
        botBubble.style.borderRadius = "20px 20px 0 20px";
        botBubble.textContent = text;
        chatOutput.appendChild(botBubble);
        chatOutput.scrollTop = chatOutput.scrollHeight;
      }

      function showLoadingAnimation() {
        document.getElementById("loading-animation").style.display = "flex";
      }
      function hideLoadingAnimation() {
        document.getElementById("loading-animation").style.display = "none";
      }

      /********* Engine Loop for Continuous Updates **********/
      let progress = 0;
      function updateProgress() {
        if (progress < 20) {
          progress += 0.2;
        } else {
          progress = 0;
        }
        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
          progressBar.value = progress;
          const colorFactor = Math.sin(progress * Math.PI / 20);
          const energyColor = `rgb(${76 + colorFactor * 50}, ${175 + colorFactor * 80}, 50)`;
          progressBar.style.backgroundColor = energyColor;
          progressBar.style.setProperty('--glow-color', energyColor);
        }
      }
      function engineLoop() {
        updateProgress();
        requestAnimationFrame(engineLoop);
      }
      engineLoop();
        // Render projects
    const projectsContainer = document.getElementById('projects-container');
    const projectsHTML = projects.map(project => `
      <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm card-hover">
        <div class="h-48 overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
        </div>
        <div class="p-6">
          <h3 class="font-bold text-xl mb-2">${project.title}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">${project.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.tags.map(tag => `<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">${tag}</span>`).join('')}
          </div>
          <a href="${project.link}" class="inline-flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
            View project
            <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>

      `).join('');
    
    projectsContainer.innerHTML = projectsHTML;
    
    // Render skills
    const skillsContainer = document.getElementById('skills-container');
    const skillsHTML = skills.map(skill => `
      <div class="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm card-hover">
        <i class="${skill.icon} ${skill.color} text-4xl mb-2"></i>
        <span class="font-medium">${skill.name}</span>
      </div>
    `).join('');
    
    skillsContainer.innerHTML = skillsHTML;
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
      } else {
        backToTopButton.classList.add('hidden');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Mobile menu toggle
    document.querySelectorAll('[data-hs-overlay]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const target = document.querySelector(toggle.getAttribute('data-hs-overlay'));
        target.classList.toggle('hidden');
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-fade-in');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate-fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
// Notice Modal
    document.addEventListener('DOMContentLoaded', () => {
      const noticeModal = document.getElementById('notice-modal');
      const noticeYesBtn = document.getElementById('notice-yes-btn');
      const flags = document.querySelectorAll('.flag');

      noticeYesBtn.addEventListener('click', () => {
        noticeModal.style.transition = 'opacity 0.5s ease-out';
        noticeModal.style.opacity = '0';
        setTimeout(() => { noticeModal.style.display = 'none'; }, 500);
      });

      flags.forEach(flag => {
        flag.addEventListener('click', () => {
          const lang = flag.getAttribute('data-lang');
          document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.classList.contains('flag')) return;
            el.hidden = el.getAttribute('data-lang') !== lang;
          });
        });
      });
    });

const glossary = {
  'list': 'All typing commands are: about, projects, github, blog, skills, contact, funfact, quest, leaderboard, and easter...'
  'about': 'I’m a freelance dev with 7+ years of coding wizardry! From web apps to 3D realms, I craft digital adventures. Self-taught, fueled by curiosity! 🌌',
  'projects': 'My portfolio’s a galaxy of creations: chatbots, 3D space games, and more! Explore at https://github.com/kvnbbg or the projects section. 🛠️',
  'github': 'Dive into my code universe at https://github.com/kvnbbg. Repos packed with experiments and open-source treasures! 🐙',
  'blog': 'Tech tales and tutorials await at https://kvnbbg.fr. Level up your skills with my blog! 📝',
  'skills': 'Mastering JavaScript, Python, React, Three.js, and beyond. My tech stack’s always evolving! 💻',
  'contact': 'Ping me at contact@kvnbbg.fr or @techandstream on X. Ready to team up for epic projects! 📬',
  'funfact': 'I once built a game in 48 hours for a hackathon—pure chaos and glory! 🎮',
  'quest': 'Embark on a mission: ask about "skills", "projects", and "funfact" to unlock a secret reward! 🗝️',
  'leaderboard': 'You’re climbing the ranks! Current level: ${getUserLevel()}. Keep chatting to top the leaderboard! 🏆',
  'easter': 'Hunt for hidden gems! Try "space game" or other secrets to boost your score. 🕵️'
};

const badges = {
  explorer: { name: 'Explorer', desc: 'Asked about 3+ topics!', points: 50, earned: false },
  gamer: { name: 'Gamer', desc: 'Launched the space game!', points: 100, earned: false },
  scholar: { name: 'Scholar', desc: 'Viewed the glossary!', points: 30, earned: false },
  quester: { name: 'Quester', desc: 'Completed the secret mission!', points: 150, earned: false },
  chatter: { name: 'Chatter', desc: 'Sent 5+ messages!', points: 70, earned: false }
};

let userProgress = loadProgress();
let lastMessageTime = 0;
const RATE_LIMIT_MS = 1000; // 1 second cooldown
const QUEST_TOPICS = ['skills', 'projects', 'funfact'];

function loadProgress() {
  const saved = localStorage.getItem('chatbotProgress');
  return saved ? JSON.parse(saved) : {
    level: 1,
    points: 0,
    topicsAsked: new Set(),
    badgesEarned: 0,
    messageCount: 0
  };
}

function saveProgress() {
  localStorage.setItem('chatbotProgress', JSON.stringify(userProgress));
}

function getUserLevel() {
  return Math.floor(userProgress.points / 100) + 1;
}

function sendMessage() {
  const now = Date.now();
  if (now - lastMessageTime < RATE_LIMIT_MS) {
    addBotMessage('Slow down, space traveler! Wait a sec before sending again. ⏳');
    return;
  }
  lastMessageTime = now;

  const input = document.getElementById('user-message');
  const message = input.value.trim().substring(0, 200); // Cap at 200 chars
  if (!message) {
    addBotMessage('No message? C’mon, share your quest! Try "list" or "space game". 😄');
    return;
  }

  // Basic XSS prevention
  const sanitizedMessage = message.replace(/[<>]/g, '');
  const output = document.getElementById('chat-output');
  const userBubble = document.createElement('"p");
  userBubble.style.cssText = 'text-align: right; background: #0ea5e9; color: white; padding: 10px 15px; margin: 10px; border-radius: 20px 20px 20px 0;';
  userBubble.textContent = sanitizedMessage;
  output.appendChild(userBubble);
  input.value = '';
  output.scrollTop = output.scrollHeight;

  userProgress.messageCount += 1;
  if (userProgress.messageCount >= 5 && !badges.chatter.earned) {
    awardBadge('chatter');
  }
  userProgress.points += 10; // Points per message
  saveProgress();
  updateProgressBar();

  const lowerMessage = sanitizedMessage.toLowerCase();
  if (lowerMessage === 'space game') {
    setTimeout(() => {
      window.open('https://kvnbbg.github.io/Underconstruction-Screen-Space-theme/', '_blank');
      awardBadge('gamer');
      playSound('launch'); // Optional sound effect
    }, 500);
    addBotMessage('Secret trigger activated! 🚀 Warp drive engaged! Opening game link...🛸 Launching space game...');
    return;
  }

  if (lowerMessage.includes('full') || lowerMessage.includes('glossary')) {
    awardBadge('scholar');
    addBotMessage(getGlossary());
    return;
  }

  const responseKey = Object.keys(glossary).find(key => lowerMessage.includes(key));
  if (responseKey) {
    userProgress.topicsAsked.add(responseKey);
    if (userProgress.topicsAsked.size >= 3 && !badges.explorer.earned) {
      awardBadge('explorer');
    }
    if (QUEST_TOPICS.every(topic => userProgress.topicsAsked.has(topic)) && !badges.quester.earned) {
      awardBadge('quester');
    }
    setTimeout(() => {
      const response = glossary[responseKey].replace('${getUserLevel()}', getUserLevel());
      addBotMessage(`${response} ${getRandomEncouragement()} Your level: ${getUserLevel()}!`);
      playSound('success');
    }, 1000);
  } else {
    setTimeout(() => {
      addBotMessage(`Lost in space? Try "about", "quest", or "glossary" for all commands! 🌠 ${getRandomEncouragement()} Your level: ${getUserLevel()}!`);
      playSound('error');
    }, 1000);
  }
}

function addBotMessage(text) {
  const output = document.getElementById('chat-output');
  const botBubble = document.createElement('p');
  botBubble.style.cssText = 'text-align: left; background: #e5e5ea; color: #000; padding: 10px 15px; margin: 10px; border-radius: 20px 20px 0 20px;';
  botBubble.textContent = text;
  output.appendChild(botBubble);
  output.scrollTop = output.scrollHeight;
}

function getGlossary() {
  const commands = Object.keys(glossary).map(key => `"${key}"`).join(', ');
  return `📜 Galactic Command Codex: ${commands}. Discover secrets like "space game" or "quest"! Progress: ${getProgressBar()}`;
}

function awardBadge(badgeKey) {
  if (!badges[badgeKey].earned) {
    badges[badgeKey].earned = true;
    userProgress.badgesEarned += 1;
    userProgress.points += badges[badgeKey].points;
    saveProgress();
    updateProgressBar();
    addBotMessage(`🎉 Achievement Unlocked: "${badges[badgeKey].name}"! ${badges[badgeKey].desc} (+${badges[badgeKey].points} points)`);
    if (userProgress.badgesEarned === Object.keys(badges).length) {
      addBotMessage('🌟 Legendary Status! You’ve earned ALL badges. The galaxy is yours! 🏅');
      playSound('victory');
    }
  }
}

function getRandomEncouragement() {
  const encouragements = [
    'You’re blazing through the cosmos! 🌟',
    'Epic move, adventurer! 🚀',
    'Keep questing, legend! 🗡️',
    'The galaxy’s cheering for you! 🎉',
    'Boldly going where no one has gone! 🌌'
  ];
  return encouragements[Math.floor(Math.random() * encouragements.length)];
}

function getProgressBar() {
  const pointsToNextLevel = (getUserLevel() * 100) - userProgress.points;
  const progressPercent = Math.min(100, ((userProgress.points % 100) / 100) * 100);
  const bars = Math.floor(progressPercent / 10);
  return `[${'█'.repeat(bars)}${'-'.repeat(10 - bars)}] ${progressPercent.toFixed(0)}% to level ${getUserLevel() + 1} (${pointsToNextLevel} pts left)`;
}

function updateProgressBar() {
  addBotMessage(`📊 Quest Progress: ${getProgressBar()}`);
}

function playSound(type) {
  // Optional: Add audio feedback for gaming vibe https://simpleguics2pygame.readthedocs.io/en/latest/_static/links/snd_links.html
  //
  const sounds = {
  //  
    launch: new Audio('https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg'),
  //   
    success: new Audio('https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3'),
  //   
    error: new Audio('https://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3'),
  //  
    victory: new Audio('https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3')
  //
      };
  // 
  sounds[type]?.play();
  console.log(`Sound effect: ${type}`); // Placeholder
}

// Handle Enter key and button click
document.getElementById('user-message').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
document.getElementById('send-button')?.addEventListener('click', sendMessage);

    // Render Skills
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = skills.map(skill => `
      <div class="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm card-hover">
        <i class="${skill.icon} ${skill.color} text-4xl mb-2"></i>
        <span class="font-medium text-sm">${skill.name}</span>
      </div>
    `).join('');

    // Render Projects
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = projects.map(project => `
      <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm card-hover">
        <div class="h-48 overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" loading="lazy">
        </div>
        <div class="p-6">
          <h3 class="font-bold text-xl mb-2">${project.title}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">${project.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.tags.map(tag => `<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">${tag}</span>`).join('')}
          </div>
          <div class="flex gap-4">
            ${project.link ? `<a href="${project.link}" class="inline-flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium" target="_blank" rel="noopener noreferrer">
              View Project <i class="fas fa-arrow-right ml-2"></i>
            </a>` : ''}
            ${project.repoLink ? `<a href="${project.repoLink}" class="inline-flex items-center text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 font-medium" target="_blank" rel="noopener noreferrer">
              GitHub <i class="fab fa-github ml-2"></i>
            </a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
    if (currentTheme === 'dark') document.documentElement.classList.add('dark');

    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Back to Top
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('hidden', window.pageYOffset <= 300);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Contact Form Submission
    document.getElementById('contact-form').addEventListener('submit', async e => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      try {
        const response = await fetch('https://api.kvnbbg.fr/contact', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          alert('Message sent successfully!');
          form.reset();
        } else {
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-fade-in').forEach(el => observer.observe(el));

    // Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(reg => console.log('Service Worker registered:', reg.scope))
          .catch(err => console.error('Service Worker registration failed:', err));
      });
    }
