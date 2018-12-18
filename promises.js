const util = require('util')
const request = require('./helper.js')


// Promises are a standard class in JS

let value = 16
let QuickPromise = new Promise(function (resolve, reject) {
  if (value) {
    resolve(value)
  } else {
    reject('error')
  }
})

// the constructor for a promise takes a function with resolve and reject arguments
// this creates a placeholder Promise object with a pending status
// if the resolve function is called the Promise is fulfilled with that value
// if the reject function is called the Promise is rejected

QuickPromise.then(result => console.log(result*2), console.log)

// A callback can be attached to promises using .then
// .then takes a callback function to be executed upon promise resolution
// and another optional callback function to be executed upon rejection

// .then returns a promise so multiple .then can be chained

value = 5

function delayedLog (value) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (value) {
        console.log(value)
        resolve(value)
      } else {
        reject()
      }
    }, 1000)
  })
}

// QuickPromise.then(delayedLog).then(delayedLog)


// Even if a promise is already resolved, its callbacks will continue to be chained


// We can also deal with promise resolutions and rejections separately using .catch
// .catch is simply shorthand for a .then with a null resolve function

// QuickPromise.then(doThisOnSuccess).catch(doThisOnEitherFailure)


makeRequest = util.promisify(request.makeRequest)

// Util is a Node js module which introduced the promisify method in node js 8
// It converts a callback based function to a promise based one


function makeThreeRequestswithPromises (reqOne, reqTwo, reqThree) {
  let output = []
  makeRequest(reqOne)
  .then(res => output.push(res) && makeRequest(reqTwo))
  .then(res => output.push(res) && makeRequest(reqThree))
  .then(res => output.push(res) && console.log(output))    
  .catch(console.log)
}

//makeThreeRequestswithPromises('requestOne', 'requestTwo', 'requestThree')


function makeThreeRequestsParallelWithPromises (reqOne, reqTwo, reqThree) {
  let output = []
  output.push(makeRequest(reqOne))
  output.push(makeRequest(reqTwo))
  output.push(makeRequest(reqThree))
  Promise.all(output).then(console.log).catch(console.log)
}

//makeThreeRequestsParallelWithPromises('requestOne', 'requestTwo', 'requestThree')

// async/await is syntactic sugar which allows asynchronous code to be written in a synchronous style
// async causes the function to return a promise which resolves to the return value of the function
// this feature is implemented under the hood using promises and generators

async function makeThreeRequestsWithAsyncAwait (reqOne, reqTwo, reqThree) {
  let output = []
  let res = await makeRequest(reqOne).catch(console.log)
  if (res) {
    output.push(res)
    res = await makeRequest(reqTwo).catch(console.log)
    if (res) {
      output.push(res)
      res = await makeRequest(reqThree).catch(console.log)
      if (res) {
        output.push(res)
        console.log(output)
      }
    }
  }
}

//makeThreeRequestsWithAsyncAwait('requestOne', 'requestTwo', 'requestThree')
