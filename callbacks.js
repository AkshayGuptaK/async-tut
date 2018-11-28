const request = require('./helper.js')


// Callbacks allow us to handle asynchronous operations
// while producing the desired behavior

function makeRequestWithCallback (req) {
  request.makeRequest(req, console.log) // callback function will handle response
  let value = 5 * 3
  console.log(value)
}

makeRequestWithCallback('request')


// By Node.js conventions, the callback function must first take an error argument
// There can be any number of total arguments


function makeErroneousRequest() {
  request.makeRequest('', console.log) // Suppose this request is invalid
}

//makeErroneousRequest()

// If there is an error, the response will generally be undefined
// So we should check for the truthiness of the error first


function makeRequestAndHandleErrors(req) {
  request.makeRequest(req, function (err, response) {
    if (err) {
      console.log(err)
    } else {
      console.log(response)
    }
  })
}

//makeRequestAndHandleErrors('')


// This is what happens when multiple asynchronous operations are chained

function makeThreeRequestsWithCallbacks (reqOne, reqTwo, reqThree) {
  let output = []
  request.makeRequest(reqOne, function(err, resOne) {
    if (err) {
      console.log(err)
    } else {
      output.push(resOne)
      request.makeRequest(reqTwo, function(err, resTwo) {
        if (err) {
          console.log(err)
        } else {
          output.push(resTwo)
          request.makeRequest(reqThree, function(err, resThree) {
            if (err) {
              console.log(err)
            } else {
              output.push(resThree)
              console.log(output)
            }
          })
        }
      })
    }
  })
}

//makeThreeRequestsWithCallbacks('requestOne', 'requestTwo', 'requestThree')
//console.log('This operation is not blocked')
