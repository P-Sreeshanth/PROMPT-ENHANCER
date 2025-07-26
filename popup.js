document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        activeTab: 'output',
        selectedPersonaId: 4, // Default to Creative Collaborator
    };

    // --- DATA ---
    const personas = [
        { id: 1, name: 'Disruptive Founder', tagline: 'Challenges inputs for bold, risky prompts.', icon: '⚡️' },
        { id: 2, name: 'VC Terminator', tagline: 'Converts ideas into killer pitches.', icon: '💼' },
        { id: 3, name: 'Cyberpunk Poet', tagline: 'Injects digital melancholy & emotion.', icon: '🌃' },
        { id: 4, name: 'Creative Collaborator', tagline: 'Brainstorms and expands on your ideas.', icon: '🎨' },
        { id: 5, name: 'Helpful Assistant', tagline: 'Clarifies and structures your request.', icon: '🤝' },
        { id: 6, name: 'Standard Enhancer', tagline: 'Classic, balanced rewriting.', icon: '📝' },
    ];

    const templates = [
        { id: 1, title: 'Startup Launch Wizard', description: 'Generate a complete launch plan from a single product idea.', tags: ['Business', 'Startup'] },
        { id: 2, title: 'Viral YouTube Hooker', description: 'Create 10 irresistible titles and hooks for a video.', tags: ['YouTube', 'Marketing'] },
        { id: 3, title: 'Pitch Deck Generator', description: 'Outline a 10-slide pitch deck from your core concept.', tags: ['Business', 'Pitch'] },
        { id: 4, 'title': 'Code Explainer', 'description': 'Explain a complex code snippet in simple terms.', 'tags': ['Development', 'Code'] },
    ];

    // --- DOM ELEMENTS ---
    const modeSwitcher = document.getElementById('mode-switcher');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const mainEnhanceBtn = document.getElementById('main-enhance-btn');
    const promptInput = document.getElementById('prompt-input');
    const enhancedPromptContent = document.getElementById('enhanced-prompt-content');
    const personaList = document.getElementById('persona-list');
    const templateList = document.getElementById('template-list');
    const templateSearch = document.getElementById('template-search');
    const selectedPersonaDisplay = document.getElementById('selected-persona-display');

    // --- RENDER FUNCTIONS ---
    const renderSelectedPersona = () => {
        const persona = personas.find(p => p.id === state.selectedPersonaId);
        if (!persona) return;
        selectedPersonaDisplay.innerHTML = `
            <div class="text-2xl">${persona.icon}</div>
            <div>
                <p class="font-semibold text-sm text-var(--text-primary)">${persona.name}</p>
                <p class="text-xs text-var(--text-secondary)">${persona.tagline}</p>
            </div>
        `;
    };

    const renderPersonas = () => {
        personaList.innerHTML = '';
        personas.forEach(p => {
            const isSelected = state.selectedPersonaId === p.id;
            const personaEl = document.createElement('div');
            personaEl.className = `p-4 border rounded-lg cursor-pointer transition-all duration-200 flex items-start space-x-4 bg-var(--surface-color) card-hover ${isSelected ? 'persona-selected' : 'border-var(--border-color)'}`;
            personaEl.innerHTML = `
                <div class="text-3xl mt-1">${p.icon}</div>
                <div class="flex-grow">
                    <p class="font-semibold text-var(--text-primary)">${p.name}</p>
                    <p class="text-sm text-var(--text-secondary)">${p.tagline}</p>
                </div>
            `;
            personaEl.addEventListener('click', () => handlePersonaClick(p));
            personaList.appendChild(personaEl);
        });
    };

    const renderTemplates = () => {
        const searchTerm = templateSearch.value.toLowerCase();
        templateList.innerHTML = '';
        templates
            .filter(t => t.title.toLowerCase().includes(searchTerm) || t.tags.join(' ').toLowerCase().includes(searchTerm))
            .forEach(t => {
                const templateEl = document.createElement('div');
                templateEl.className = 'p-4 border border-var(--border-color) bg-var(--surface-color) rounded-lg cursor-pointer transition-all duration-200 card-hover';
                templateEl.innerHTML = `
                    <h4 class="font-bold text-var(--text-primary)">${t.title}</h4>
                    <p class="text-sm text-var(--text-secondary) mt-1 mb-3">${t.description}</p>
                    <div class="flex flex-wrap gap-2">${t.tags.map(tag => `<span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">${tag}</span>`).join('')}</div>
                `;
                templateEl.addEventListener('click', () => handleTemplateClick(t));
                templateList.appendChild(templateEl);
            });
    };
    
    const setActiveTab = (tabName) => {
        state.activeTab = tabName;
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.classList.toggle('tab-active', tab.dataset.tab === state.activeTab);
            tab.classList.toggle('tab-inactive', tab.dataset.tab !== state.activeTab);
        });
        tabPanels.forEach(panel => {
            panel.classList.toggle('hidden', panel.id !== `${state.activeTab}-panel`);
        });
    };

    // --- EVENT HANDLERS ---
    const handleTabSwitch = (e) => {
        const clickedTab = e.target.closest('.mode-tab');
        if (!clickedTab) return;
        setActiveTab(clickedTab.dataset.tab);
    };

    const handlePersonaClick = (persona) => {
        state.selectedPersonaId = persona.id;
        renderSelectedPersona();
        renderPersonas();
    };
    
    const getPersonaBasedPrompt = (persona, originalPrompt) => {
        const base = `Based on the user's request for "${originalPrompt}", generate a detailed and actionable prompt.`;

        switch(persona.id) {
            case 1: // Disruptive Founder
                return `${base}\n\n**PROMPT:**\nDesign a business plan for a tech startup that completely disrupts the traditional gym industry. The core idea is a hyper-personalized, AI-driven fitness platform that uses gamification and social mechanics to drive user engagement. The prompt should ask for:\n\n1.  **Unique Value Proposition:** What makes this different from Peloton, Apple Fitness+, etc.?\n2.  **Disruptive Features:** Detail 3-4 "killer features" that don't exist today (e.g., AI-generated adaptive workouts, AR-based form correction).\n3.  **Go-to-Market Strategy:** A viral marketing plan to acquire the first 10,000 users with a minimal budget.\n4.  **Monetization Model:** A freemium model with a compelling premium offering.`;
            case 2: // VC Terminator
                return `${base}\n\n**PROMPT:**\nCreate an investor-ready pitch deck outline for a "smart gym" concept. The prompt must demand a focus on financial viability and market scalability. The AI should generate content for the following slides:\n\n1.  **The Problem:** Quantify the market inefficiency in the current fitness industry.\n2.  **The Solution:** A concise description of the product and its business model.\n3.  **Market Size:** Detailed TAM, SAM, and SOM analysis.\n4.  **Financial Projections:** A 5-year forecast including revenue, user growth, and EBITDA.\n5.  **The Ask:** Clearly state the funding amount required and the use of funds.`;
            case 3: // Cyberpunk Poet
                return `${base}\n\n**PROMPT:**\nWrite a short story exploring the darker side of a futuristic gym. The story should be set in a cyberpunk dystopia where physical perfection is a currency. The prompt should ask the AI to explore themes of:\n\n1.  **Bio-augmentation:** How technology merges with the human body for fitness.\n2.  **Social Status:** How one's physical fitness, tracked by implants, determines their place in society.\n3.  **The Human Cost:** The psychological toll of striving for engineered perfection.`;
            case 4: // Creative Collaborator
                return `${base}\n\n**PROMPT:**\nBrainstorm five unique and unexpected features for a next-generation fitness app. For each feature, provide a brief description and a potential name. The features should be creative and focus on user delight, not just standard tracking.\n\nExamples to inspire the AI:\n- **"Workout DJ":** An AI that creates a dynamic music playlist that matches the intensity of your workout in real-time.\n- **"AR Finisher":** An augmented reality 'boss battle' for the end of your workout.\n- **"Taste Twin":** A feature that connects you with other users who have a similar taste in workouts and nutrition.`;
            default: // Helpful Assistant & Standard Enhancer
                return `Create a detailed and structured project plan for building a modern gym website. The plan should be aimed at a developer and a project manager, and must include the following sections:\n\n1.  **Core Features:** List the essential features (e.g., class schedules, membership signup, trainer profiles, blog).\n2.  **Tech Stack:** Recommend a specific technology stack (e.g., Frontend: React, Backend: Node.js, DB: PostgreSQL).\n3.  **Development Phases:** Break down the project into 4-5 distinct phases with estimated timelines (e.g., Phase 1: Design & Prototyping, Phase 2: Backend Dev).\n4.  **User Stories:** Write 3-4 sample user stories for the membership feature.`;
        }
    };
    
    const handleEnhanceClick = () => {
        const originalPrompt = promptInput.value.trim();
        if (!originalPrompt) {
            enhancedPromptContent.innerHTML = `<p class="text-center text-var(--text-secondary) p-8">Please enter a prompt on the left to get started.</p>`;
            return;
        }

        const selectedPersona = personas.find(p => p.id === state.selectedPersonaId);
        const enhancedText = getPersonaBasedPrompt(selectedPersona, originalPrompt);
        
        enhancedPromptContent.innerHTML = `
            <div class="output-block">
                <h4><span>"</span>Original Prompt</h4>
                <p class="text-var(--text-secondary) italic">"${originalPrompt}"</p>
            </div>
            <div class="output-block">
                <h4><span>🎯</span>Persona's Goal</h4>
                <p class="text-var(--text-secondary)">To rewrite the prompt from the perspective of a <strong>${selectedPersona.name}</strong>, focusing on its unique objectives.</p>
            </div>
            <div class="output-block relative">
                <button class="copy-enhanced-btn absolute top-3 right-3 py-1 px-2 bg-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-300 hover:text-gray-900 transition">Copy</button>
                <h4><span>🚀</span>Enhanced Prompt</h4>
                <p id="final-prompt-text" class="text-var(--text-primary) whitespace-pre-wrap">${enhancedText}</p>
            </div>
        `;

        setActiveTab('output');
    };

    const handleTemplateClick = (template) => {
        promptInput.value = `Using the "${template.title}" template, ${template.description.charAt(0).toLowerCase() + template.description.slice(1)}`;
        handleEnhanceClick();
    };

    const handleCopy = (buttonElement) => {
        const finalPromptText = document.getElementById('final-prompt-text');
        if (!finalPromptText) return;

        const textarea = document.createElement('textarea');
        textarea.value = finalPromptText.textContent;
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            buttonElement.textContent = 'Copied!';
            setTimeout(() => {
                buttonElement.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            buttonElement.textContent = 'Error!';
        }
        document.body.removeChild(textarea);
    };

    // --- INITIALIZATION ---
    modeSwitcher.addEventListener('click', handleTabSwitch);
    mainEnhanceBtn.addEventListener('click', handleEnhanceClick);
    templateSearch.addEventListener('input', renderTemplates);
    
    enhancedPromptContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-enhanced-btn')) {
            handleCopy(e.target);
        }
    });
    
    renderSelectedPersona();
    renderPersonas();
    renderTemplates();
}); 