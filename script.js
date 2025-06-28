// COSC Commit Counter - HackWeek Tracker
// JavaScript functionality for real-time commit tracking

// Counter state variables
let counter = 0;
let incrementCount = 0;
let decrementCount = 0;
let resetCount = 0;

// DOM element references
const counterValue = document.getElementById('counterValue');
const decrementBtn = document.getElementById('decrementBtn');
const incrementCountEl = document.getElementById('incrementCount');
const decrementCountEl = document.getElementById('decrementCount');
const resetCountEl = document.getElementById('resetCount');

/**
 * Updates the counter display and UI state
 */
function updateDisplay() {
    // Update main counter display
    counterValue.textContent = counter;
    
    // Add animation effect
    counterValue.classList.add('animate');
    setTimeout(() => counterValue.classList.remove('animate'), 300);
    
    // Update button states
    decrementBtn.disabled = counter === 0;
    
    // Update statistics
    incrementCountEl.textContent = incrementCount;
    decrementCountEl.textContent = decrementCount;
    resetCountEl.textContent = resetCount;
}

/**
 * Increments the counter (simulates a new commit)
 */
function incrementCounter() {
    counter++;
    incrementCount++;
    updateDisplay();
    
    // Add visual feedback
    const btn = document.getElementById('incrementBtn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 150);
    
    console.log(`✅ New commit! Total: ${counter}`);
}

/**
 * Decrements the counter (simulates reverting a commit)
 * Ensures counter never goes below 0
 */
function decrementCounter() {
    if (counter > 0) {
        counter--;
        decrementCount++;
        updateDisplay();
        
        // Add visual feedback
        const btn = document.querySelector('.btn-decrement');
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = '', 150);
        
        console.log(`↩️ Commit reverted! Total: ${counter}`);
    } else {
        console.log('⚠️ Cannot decrement below 0');
    }
}

/**
 * Resets the counter to 0 (simulates starting a new day)
 */
function resetCounter() {
    const previousCount = counter;
    counter = 0;
    resetCount++;
    updateDisplay();
    
    // Add visual feedback
    const btn = document.querySelector('.btn-reset');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 150);
    
    // Show reset animation
    counterValue.style.color = '#e74c3c';
    setTimeout(() => counterValue.style.color = '', 500);
    
    console.log(`🔄 Counter reset! Previous: ${previousCount}, Current: ${counter}`);
}

/**
 * Keyboard shortcut handler
 */
function handleKeyboardShortcuts(event) {
    switch(event.key) {
        case '+':
        case '=':
            event.preventDefault();
            incrementCounter();
            break;
        case '-':
            event.preventDefault();
            decrementCounter();
            break;
        case 'r':
        case 'R':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                resetCounter();
            }
            break;
        case 'Escape':
            // Clear focus from buttons
            document.activeElement.blur();
            break;
    }
}

/**
 * Initialize the application
 */
function init() {
    // Set up event listeners
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Initialize display
    updateDisplay();
    
    // Add entrance animation
    const container = document.querySelector('.container');
    container.style.animation = 'fadeInUp 0.8s ease-out';
    
    console.log('🚀 COSC Commit Counter initialized!');
    console.log('Keyboard shortcuts:');
    console.log('  + or = : Increment counter');
    console.log('  - : Decrement counter');
    console.log('  Ctrl+R : Reset counter');
}

/**
 * Get current statistics
 * @returns {Object} Current counter statistics
 */
function getStats() {
    return {
        currentCount: counter,
        totalIncrements: incrementCount,
        totalDecrements: decrementCount,
        totalResets: resetCount,
        netCommits: incrementCount - decrementCount
    };
}

/**
 * Export data for potential future use
 * @returns {string} JSON string of current state
 */
function exportData() {
    const data = {
        timestamp: new Date().toISOString(),
        ...getStats()
    };
    return JSON.stringify(data, null, 2);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make functions available globally for button onclick handlers
window.incrementCounter = incrementCounter;
window.decrementCounter = decrementCounter;
window.resetCounter = resetCounter;
window.getStats = getStats;
window.exportData = exportData;
