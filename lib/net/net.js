import { textToFilename } from '../text/text';
const mode = 'cors';
const credentials = 'same-origin';
const headers = {
  "Content-Type": "application/json",
};

let apiUrl = 'https://api-trin-nb7bzfogfa-uc.a.run.app';
const devUrl = 'http://localhost:8080';
//apiUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;
console.log(apiUrl);
const audioUrl = apiUrl.concat('/static/audio/');


async function post(route, data)
{
  try {
    const url = apiUrl + route;
    
    return await fetch(url, {
      method: "POST", 
      mode,
      credentials,
      headers,
      body: JSON.stringify(data),
    });
  } catch(e) {
    console.error(e);
    return false;
  }
}

async function get(route)
{
  try {
    const url = apiUrl + route;
    return await fetch(url, {
      method: "GET",
      mode,
      credentials,
      headers,
    });
  } catch(e) {
    console.error(e);
    return false;
  }
}


async function getAudio(text)
{
  
  try {
    const filename = textToFilename(text);
    const url = apiUrl + `/static/audio/${filename}`;
     const res = await fetch(url, {
      method: "GET",
      mode,
      credentials,
      headers,
    });

    return res.text();
  } catch(e) {
    console.error(e);
    return false;
  }
}

export default { getAudio, audioUrl, apiUrl, post, get };
