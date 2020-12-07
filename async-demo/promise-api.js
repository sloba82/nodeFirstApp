// const p = Promise.resolve({ id:1 });
// p.then(result => console.log(result));


// const e = Promise.reject(new Error('reason for rejection... test 1'));
// p.catch(result => console.log(result));


// const t = Promise.reject('reason for rejection... test 2');
// t.catch(result => console.log(result));

const p1 = new Promise((resolve) => {
    setTimeout(()=>{
        console.log('Async operation 1.... ');
        resolve(1);
    }, 3000);
});

const p2 = new Promise((resolve) => {
    setTimeout(()=>{
        console.log('Async operation 2.... ');
        resolve(2);
    }, 2000);
});

const reject = new Promise((resolve, reject )=>{
    setTimeout(() => {
        console.log('Reject async ...')
        reject(new Error('Something failed... '));
    }, 4000);
});

Promise.all([p1, p2, reject])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err));


