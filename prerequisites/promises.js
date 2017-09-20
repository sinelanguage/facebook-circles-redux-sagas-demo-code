// callback hell

doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

// using promises
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);

// creating a promise from scratch
// useing the following fn as an example to convert to a promises

setTimeout(() => saySomething("10 seconds passed"), 10000);

/*
Mixing old-style callbacks and promises is problematic. If saySomething fails or contains a programming error, nothing catches it.

Luckily we can wrap it in a promise. Best practice is to wrap problematic functions at the lowest possible level, and then never call them directly again:

Basically, the promise constructor takes an executor function that lets us resolve or reject a promise manually. Since setTimeout doesn't really fail, we left out reject in this case.
*/
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);
