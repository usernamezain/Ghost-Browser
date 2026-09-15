import GhostThemeManager from './ghost-theme-manager.js';

document.addEventListener('DOMContentLoaded', async () => {
    const themeListContainer = document.getElementById('theme-list');
    const progressBar = document.getElementById('progress-indicator');
    
    // Show subtle progress animation
    progressBar.classList.add('active');

    try {
        const themes = await GhostThemeManager.scanLocalThemes();
        
        themes.forEach((theme, index) => {
            const card = document.createElement('div');
            card.className = 'theme-card';
            card.innerHTML = `
                <div class="theme-info">
                    <span class="theme-name">${theme.name}</span>
                    <span class="theme-type">${theme.type} | ${theme.path}</span>
                </div>
                <button class="apply-btn" data-id="${theme.id}">Apply</button>
            `;
            themeListContainer.appendChild(card);
        });

        // Add event listeners
        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const themeId = e.target.getAttribute('data-id');
                const success = await GhostThemeManager.applyTheme(themeId);
                if (success) {
                    alert(`Successfully applied: ${themeId}`);
                }
            });
        });

        // GSAP Animations: stagger for list items
        if (typeof gsap !== 'undefined') {
            gsap.from('.theme-card', {
                duration: 0.6,
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: "power2.out"
            });
        }

    } catch (error) {
        console.error("Error loading themes:", error);
    } finally {
        // Hide progress animation
        progressBar.classList.remove('active');
    }

    // Listen to events for UI updates
    document.addEventListener('agent.action.started', (e) => {
        console.log(`Action started: ${e.detail.action}`);
        // Can trigger a GSAP animation here as well
    });
});
