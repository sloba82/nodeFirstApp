console.log('Before');

getUser(1, (user) => {
    console.log('User', user);
    getRepositories(user.gitHubUsername, (repos)=> {
        console.log('Repos ', repos);
    })

});



console.log('After');


// Callbacks
// Promises
// Async/await
function getUser(id, callback)
{
    setTimeout(() => {
        console.log('Reading a user form db...');
        callback ({
            id:id,
            gitHubUsername: 'mosh'
        });
    }, 2000);
 
}

function getRepositories(username, callback) {
    setTimeout(() =>{
        console.log('calling github...');
        callback (['repo1', 'repo2', 'repo3']);
    }, 2000);


}