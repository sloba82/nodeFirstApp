const p = Promise.resolve({ id:1 });
p.then(result => console.log(result));


const e = Promise.reject(new Error('reason for rejection... test 1'));
p.catch(result => console.log(result));


const t = Promise.reject('reason for rejection... test 2');
t.catch(result => console.log(result));

