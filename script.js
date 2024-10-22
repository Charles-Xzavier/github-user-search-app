'use strict';
const toggleSwitch = document.querySelector('.switch');
const sun = document.querySelector('.sun');

const title = document.querySelector('.title');
const switchText = document.querySelector('.switch--text');
const name = document.querySelector('.name');
const loginn = document.querySelector('.login');
const h3 = document.querySelector('h3');
const p = document.querySelector('p');
const a = document.querySelector('a');
const section = document.querySelector('section');

const input = document.querySelector('#search--label');
const button = document.querySelector('.btn');
const avatarMobile = document.querySelector('.avatar-mobile');
const avatarDesktop = document.querySelector('.desktop--avatar');
const nameElement = document.querySelector('.name');
const login = document.querySelector('.login');
const joinDate = document.querySelector('.join-date');
const bio = document.querySelector('.bio');
const repos = document.querySelector('#repos');
const followers = document.querySelector('#followers');
const following = document.querySelector('#following');
const city = document.querySelector('#city');
const blog = document.querySelector('#blog');
const twitter = document.querySelector('#twitter');
const company = document.querySelector('#company');
const body = document.querySelector('body');

// Check local storage for saved mode preference
const savedMode = localStorage.getItem('mode');
if (savedMode) {
  body.classList.add(savedMode);
  if (savedMode === 'light-mode') {
    toggleSwitch.textContent = 'DARK';
  }
}

// Event listener for toggle button
toggleSwitch.addEventListener('click', function (e) {
  e.preventDefault();
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    switchText.textContent = 'LIGHT';
    sun.src = './assets/icon-sun.svg';
    localStorage.setItem('mode', '');
  } else {
    body.classList.add('light-mode');
    switchText.textContent = 'DARK';
    sun.src = './assets/icon-moon.svg';
    localStorage.setItem('mode', 'light-mode');
  }
});

// Function to show the loading spinner
const showSpinner = function () {
  const markup = `
    <div class="loader main--section">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  `;
  section.insertAdjacentHTML('beforebegin', markup);
  section.style.display = 'none';
};

// Function to hide the loading spinner
const hideSpinner = function () {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
};

button.addEventListener('click', function (e) {
  e.preventDefault();

  if (!input.value.trim()) {
    alert('Please enter a username');
    return;
  }

  const fetchUserData = async function () {
    showSpinner();

    try {
      const res = await fetch(`https://api.github.com/users/${input.value}`);
      if (!res.ok) throw new Error('User not found');

      const data = await res.json();

      input.value = '';
      avatarDesktop.src = data.avatar_url;
      avatarMobile.src = data.avatar_url;
      nameElement.innerHTML = data.name || 'Not Available';
      login.innerHTML = `@${data.login}`;

      const dateTransformer = (date) => {
        const dateObj = new Date(date);
        const dateString = dateObj.toDateString();
        const [weekday, month, day, year] = dateString.split(' ');
        return `${day} ${month} ${year}`;
      };

      const date = dateTransformer(data.created_at);
      joinDate.innerHTML = `joined ${date}`;
      bio.innerHTML = data.bio || 'Not Available';
      repos.innerHTML = data.public_repos || '0';
      followers.innerHTML = data.followers || '0';
      following.innerHTML = data.following || '0';

      city.innerHTML = data.location || 'Not Available';
      blog.innerHTML = data.blog || 'Not Available';
      twitter.innerHTML = data.twitter_username || 'Not Available';
      company.innerHTML = data.company || 'Not Available';
    } catch (error) {
      console.error(error);
      alert(`Invalid!... ${error.message}`);
    } finally {
      hideSpinner();
      section.style.display = 'flex';
    }
  };

  fetchUserData();
});
