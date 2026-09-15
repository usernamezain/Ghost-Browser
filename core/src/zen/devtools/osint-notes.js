document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("notes-area");
  const status = document.getElementById("save-status");
  const STORAGE_KEY = "ghost_browser_osint_notes_store";

  // Load existing notes from local storage / xulStore
  try {
    const savedNotes = window.localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      textarea.value = savedNotes;
    }
  } catch (e) {
    console.error("Failed to load OSINT notes from storage:", e);
  }

  let timeoutId = null;

  // Save notes on input with debounce
  textarea.addEventListener("input", () => {
    status.textContent = "SAVING...";
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, textarea.value);
        status.textContent = "SAVED";
      } catch (e) {
        console.error("Failed to save OSINT notes to storage:", e);
        status.textContent = "ERROR";
      }
    }, 500);
  });
});
