export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage
}

function makeId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

function saveToStorage(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

function loadFromStorage(key) {
    let value = localStorage.getItem(key);
    return JSON.parse(value);
}