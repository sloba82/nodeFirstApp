console.log('Before');


// Asynchronous
getUser(1, getRepositories);  // parent 


console.log('After');

//  Named functions,  
//  getRepositories(user.gitHubUsername, getCommits);  
//  prvi parametar je vrednost 
//  drugi parametar je callback funkcija, 
// ustvari posledjuje se prvi parametar -> drugom parametru koji prima taj isti parametar kao da je funkcija
function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

// Callbacks
// Promises
// Async/await
// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log('Reading a user form db...');
//         callback({
//             id: id,
//             gitHubUsername: 'mosh'
//         });
//     }, 2000);

// }

// function getRepositories(username, callback) {
//     setTimeout(() => {
//         console.log('calling github...');
//         callback(['repo1', 'repo2', 'repo3']);
//     }, 2000);


// }

