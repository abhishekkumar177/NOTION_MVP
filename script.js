// GSAP is loaded via CDN in index.html

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const sidebar = document.querySelector('.sidebar');
    const quickAddBtn = document.querySelector('.quick-add-btn');
    const aiAssistant = document.querySelector('.ai-assistant');
    const notifications = document.querySelectorAll('.notification');
    const footer = document.querySelector('footer');
    const closeAiBtn = document.querySelector('.ai-assistant .close-btn');
    const aiInput = document.querySelector('.ai-input input');
    const aiSendBtn = document.querySelector('.ai-input button');
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const toggleIndicators = document.querySelectorAll('.toggle-indicator');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const calendarToggleButtons = document.querySelectorAll('.calendar-toggle button');
    const addEventBtn = document.querySelector('.add-event-btn');
    const searchInput = document.querySelector('.search-bar input');

    // --- GSAP Animations & Initial State Setup ---
    
    // Animate sidebar on load
    gsap.fromTo(sidebar, {
        opacity: 0,
        x: -100
    }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out"
    });

    // Animate widgets with stagger on scroll
    gsap.utils.toArray('.widget-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate kanban board with stagger on scroll
    gsap.utils.toArray('.kanban-column').forEach((column, i) => {
        gsap.fromTo(column, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: column,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate footer on scroll
    gsap.fromTo(footer, {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate quick add button on scroll
    gsap.fromTo(quickAddBtn, {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: quickAddBtn,
            start: "bottom 90%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate notifications on load
    notifications.forEach((notification, index) => {
        gsap.fromTo(notification, {
            opacity: 0,
            x: 100
        }, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: "power3.out"
        });
    });

    // Animate AI assistant on load
    gsap.fromTo(aiAssistant, {
        opacity: 0,
        x: 100
    }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 1,
        ease: "power3.out"
    });

    // --- Event Listeners and Functionality ---

    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');

        if (isDark) {
            themeToggleIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        } else {
            themeToggleIcon.innerHTML = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>`;
        }
    });

    // Quick Add Button animation and notification
    quickAddBtn.addEventListener('click', () => {
        gsap.to(quickAddBtn, {
            scale: 1.2,
            duration: 0.2,
            ease: "back.out(1.7)"
        });
        gsap.to(quickAddBtn, {
            scale: 1,
            duration: 0.2,
            delay: 0.2,
            ease: "back.out(1.7)"
        });

        // Create and show notification
        const newNotification = document.createElement('div');
        newNotification.className = 'notification';
        newNotification.innerHTML = `
            <div class="notification-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            </div>
            <div class="notification-content">
                <div class="notification-title">Quick Add</div>
                <div class="notification-message">What would you like to add?</div>
            </div>
        `;
        document.querySelector('.notifications').appendChild(newNotification);

        gsap.fromTo(newNotification, {
            opacity: 0,
            x: 100
        }, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out"
        });

        setTimeout(() => {
            gsap.to(newNotification, {
                opacity: 0,
                x: 100,
                duration: 0.4,
                onComplete: () => newNotification.remove()
            });
        }, 3000);
    });

    // AI Assistant toggle
    closeAiBtn.addEventListener('click', () => {
        gsap.to(aiAssistant, {
            opacity: 0,
            x: 100,
            duration: 0.4
        });
    });

    // AI Assistant message sending
    function sendMessage() {
        const message = aiInput.value.trim();
        if (!message) return;

        const userMessage = document.createElement('div');
        userMessage.className = 'ai-message user';
        userMessage.textContent = message;
        aiAssistant.querySelector('.ai-messages').appendChild(userMessage);

        aiInput.value = '';
        aiAssistant.querySelector('.ai-messages').scrollTop = aiAssistant.querySelector('.ai-messages').scrollHeight;

        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'ai-message bot';
            botMessage.textContent = "Thanks for your message! I'm still learning, but I can help you organize your tasks, suggest priorities, and remind you of upcoming deadlines.";
            aiAssistant.querySelector('.ai-messages').appendChild(botMessage);
            aiAssistant.querySelector('.ai-messages').scrollTop = aiAssistant.querySelector('.ai-messages').scrollHeight;
        }, 500);
    }
    
    aiSendBtn.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Task checkbox functionality
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('checked');
            if (checkbox.classList.contains('checked')) {
                gsap.fromTo(checkbox, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: "back.out(1.7)" });
            } else {
                gsap.to(checkbox, { scale: 1, duration: 0.2 });
            }
        });
    });

    // Toggle list functionality
    toggleIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            indicator.classList.toggle('checked');
        });
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Calendar toggle
    calendarToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            calendarToggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Search bar focus animation
    searchInput.addEventListener('focus', () => {
        gsap.to(searchInput, {
            boxShadow: "0 0 0 3px rgba(144, 202, 249, 0.3)",
            duration: 0.3
        });
    });
    
    searchInput.addEventListener('blur', () => {
        gsap.to(searchInput, {
            boxShadow: "var(--shadow-sm)",
            duration: 0.3
        });
    });

    // Kanban drag and drop simulation
    let draggedCard = null;
    const kanbanCards = document.querySelectorAll('.kanban-card');
    const kanbanColumns = document.querySelectorAll('.kanban-column');

    kanbanCards.forEach(card => {
        card.addEventListener('dragstart', () => {
            draggedCard = card;
            setTimeout(() => {
                card.style.opacity = '0.4';
            }, 0);
        });

        card.addEventListener('dragend', () => {
            card.style.opacity = '1';
            draggedCard = null;
            updateKanbanCounts();
        });
    });

    kanbanColumns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(column.querySelector('.kanban-cards'), e.clientY);
            const cardsContainer = column.querySelector('.kanban-cards');
            if (afterElement == null) {
                cardsContainer.appendChild(draggedCard);
            } else {
                cardsContainer.insertBefore(draggedCard, afterElement);
            }
        });
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.kanban-card')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function updateKanbanCounts() {
        kanbanColumns.forEach(column => {
            const count = column.querySelectorAll('.kanban-card').length;
            column.querySelector('.kanban-count').textContent = count;
        });
    }
    updateKanbanCounts();

    // Add event handler for calendar
    addEventBtn.addEventListener('click', () => {
        alert('Add Event Modal would open here!');
    });

    // Notification click handler
    document.querySelectorAll('.notification').forEach(notif => {
        notif.addEventListener('click', () => {
            gsap.to(notif, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => notif.remove()
            });
        });
    });
});