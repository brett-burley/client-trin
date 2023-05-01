import { strToCode } from '../text/text';

const API_URL = 'https://api-trin-nb7bzfogfa-uc.a.run.app';
const DEV_URL = 'http://localhost:8080';

const baseUrl = process.env.ENV === 'development' ? DEV_URL : API_URL;
const audioUrl = baseUrl.concat('/static/audio/');

const options = getOptions();

async function post(route, data)
{
  try {
    const url = baseUrl + route;
    
    return await fetch(url, {
      method: "POST", 
      body: JSON.stringify(data),
      ...options
    });
  } catch(e) {
    console.error(e);
    return false;
  }
}

async function get(route)
{
  try {
    const url = baseUrl + route;
    return await fetch(url, {
      method: "GET",
      ...options
    });
  } catch(e) {
    console.error(e);
    return false;
  }
}


async function getAudio(text)
{
  
  try {
    const filename = strToCode(text);
    const url = baseUrl + `/static/audio/${filename}`;
     const res = await fetch(url, {
      method: "GET",
      ...options
    });

    return res.text();
  } catch(e) {
    console.error(e);
    return false;
  }
}


function getOptions()
{
  return {
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    }
  }
}


export default { getAudio, audioUrl, post, get };
