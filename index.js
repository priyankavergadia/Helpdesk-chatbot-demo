// /**
//  * Cloud Function.
//  *
//  * @param {object} event The Cloud Functions event.
//  * @param {function} callback The callback function.
//  */
// exports.helloWorld = function helloWorld (event, callback) {
//   console.log(`My Cloud Function: ${event.data.message}`);
//   var airlines = require('airline-codes');
//   console.log(airlines.findWhere({ iata: 'WS' }).get('name'));
//   callback();
// };
// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';


const http = require('http');
// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = '<Enter your Project ID here>';

// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});

// The kind for the new entity
const kind = 'incidence';
// The name/ID for the new entity is default auto-generated ID

// The Cloud Datastore key for the new entity

const taskKey = datastore.key(kind);


exports.logIncidence = (req, res) => {
  // Get the city and date from the request
  let incidence = req.body.result.parameters['any'];  // incidence is a required param that comes from api.ai webhook - it is called "any" in the api.ai json

  // Prepares the new entity
  const task = {
    key: taskKey,
    data: {
      description: incidence
    }
  };

  console.log("incidence is  " + task);

// Saves the entity
datastore.save(task)
  .then(() => {
    console.log(`Saved ${task.key}: ${task.data.description}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
}
