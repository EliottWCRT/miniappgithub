document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();

    if (username !== '') {
        searchGitHubProfile(username);
    } else {
        alert('Please enter a GitHub username.');
    }
});

function searchGitHubProfile(username) {
    const apiUrl = `https://api.github.com/users/${username}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            displayUserProfile(data);
            saveProfileToLocal(data);
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
}

function displayUserProfile(profile) {
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.innerHTML = `
        <h2>${profile.name}</h2>
        <p>${profile.bio || 'No bio available'}</p>
        <p>Followers: ${profile.followers}</p>
        <p>Following: ${profile.following}</p>
        <p>Public Repositories: ${profile.public_repos}</p>
    `;
}

function saveProfileToLocal(profile) {
    let savedProfiles = JSON.parse(localStorage.getItem('savedProfiles')) || [];
    savedProfiles.push(profile.login);

    localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
}
