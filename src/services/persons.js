// import {
//   stringify
// } from 'qs';
// import request from '@/utils/request';

// const path = 'https://randomuser.me/api'
const path = 'http://localhost:8080/api';
// const path = 'https://swapi.co/api';

export async function getPersonsList() {
  const options = {
    // mode: 'cors-with-forced-preflight',
    // mode: 'cors',
    // mode: 'no-cors',
    // credentials: 'omit'
  };

  //   fetch(`${path}/persons`, options)
  //   .then(response=>response.text())
  //   .then(data=>console.log('sdfasdf = ',data))

  let respJson;

  try {
    // const resp = await fetch(`${path}/`, options);
    const resp = await fetch(`${path}/persons`, options);
    // const resp = await fetch(`${path}/people`, options);
    //   debugger;
    // const respText = await resp.text();
    // console.log('text - ' + respText);
    respJson = await resp.json();
    // console.log('respJson - ', respJson.toString())

    //   debugger;
  } catch (e) {
    console.log('error 2038', e);
  }

  // eslint-disable-next-line no-underscore-dangle
  return respJson._embedded.persons;
  //   return [];
}

export async function createUpdatePerson(Person) {
  return {};
}

export async function getPerson(id) {
  const options = {
    // mode: 'cors',
    // mode: 'no-cors',
    // credentials: 'omit'
  };

  let respJson;

  try {
    const resp = await fetch(`${path}/persons/${id}`, options);
    respJson = await resp.json();
  } catch (e) {
    console.log('error 204538', e);
  }

  return respJson;
}

export async function delPerson(id) {
  const options = {
    method: 'DELETE',
    // mode: 'cors',
    // mode: 'no-cors',
    // credentials: 'omit'
  };

  let respJson;

  try {
    const resp = await fetch(`${path}/persons/${id}`, options);
    respJson = await resp.json();
  } catch (e) {
    console.log('error 204538', e);
  }

  return respJson;

  return true;
}
