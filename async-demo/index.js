console.log('Before');

// getUser(1, (user) => {
//     console.log('User', user);
//     getRepositories(user.gitHubUsername, (repos) => {
//         console.log('Repos ', repos);
//     })

// });

// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits ' , commits))
//     .catch(err => console.log('Error ', err.message));


// Async and Await approach
async function displayCommits() {

    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commit = await getCommits(repos[0]);
        console.log(commit);
    }
    catch (err) {
        console.log(err);
    }
}


displayCommits();


console.log('After');


// Callbacks
// Promises
// Async/await
function getUser(id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user form db...');
            resolve({
                id: id,
                gitHubUsername: 'mosh'
            });
        }, 2000);
    });

}

function getRepositories(username) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling github...');
            // resolve(['repo1', 'repo2', 'repo3']);

            // reject example 
            reject( new Error('some example reject... '));

        }, 2000);
    });
}


function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling gitHub APi...');
            resolve(['commit']);
        }, 2000);
    });
}

