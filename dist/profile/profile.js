const fs = require('fs');
const path = './profile.json';

// Read profiles
function getProfiles() {
  const data = fs.readFileSync(path);
  return JSON.parse(data).users;
}

// Create new profile
function createProfile(user) {
  const data = JSON.parse(fs.readFileSync(path));
  data.users.push(user);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// Update profile by username
function updateProfile(username, updates) {
  const data = JSON.parse(fs.readFileSync(path));
  const index = data.users.findIndex(u => u.username === username);
  if (index !== -1) {
    data.users[index] = { ...data.users[index], ...updates };
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  }
}

// Delete profile
function deleteProfile(username) {
  const data = JSON.parse(fs.readFileSync(path));
  data.users = data.users.filter(u => u.username !== username);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile
};