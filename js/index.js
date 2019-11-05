const form = document.getElementById("github-form");
const userList = document.getElementById("user-list");
const reposList = document.getElementById("repos-list");
let username;

// Accept: application/vnd.github.v3+json
// https://api.github.com/search/users?q=octocat
// https://api.github.com/users/octocat/repos

// When the form is submitted, it should take the value of the input 
// and search GitHub for user matches using the User Search Endpoint.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  username = form.search.value;
  fetchUsers(username);
});

function fetchUsers(username) {
  userList.innerHTML = "";
  let url = `https://api.github.com/search/users?q=${username}&per_page=10`;
  fetch(url)
    .then(response => response.json())
    .then(json => appendUsers(json.items));
};

// Using the results of the search, display information about the users to the page. 
// (You might include showing their username, avatar and a link to their profile.)
function appendUsers(users) {
  console.log(users);
  users.forEach(user => {
    let username = user.login;
    let profileUrl = user.html_url;
    let avatarUrl = user.avatar_url;
    let userListItem = document.createElement("li");
    let userAvatar = document.createElement("img");
    let userHeader = document.createElement("h2");
    let userProfile = document.createElement("h3");
    let userRepos = document.createElement("button");

    userAvatar.setAttribute("src", avatarUrl);
    userHeader.innerText = username;
    userProfile.innerHTML = `<a href="${profileUrl}">Profile Page</a>`;
    userRepos.setAttribute("id", `${username}`);
    userRepos.innerText = "Show Repositories ⬇️";

    userRepos.addEventListener("click", (event) => {
      let username = event.target.id;
      fetchRepos(username);
    });

    userListItem.appendChild(userAvatar);
    userListItem.appendChild(userHeader);
    userListItem.appendChild(userProfile);
    userListItem.appendChild(userRepos);
    userList.appendChild(userListItem);
  });
};

// Clicking on one of these users should send a request to the User Repos Endpoint 
// and return data about all the repositories for that user.
function fetchRepos(username) {
  let url =`https://api.github.com/users/${username}/repos`;
  fetch(url)
    .then(response => response.json())
    .then(json => console.log(json));
};

// Using the response from the Users Repos Endpoint, display all the repositories 
// for that user on the page.
// Rinse and repeat the above!
