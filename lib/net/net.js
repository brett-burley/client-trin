import { textToFilename } from '../text/text';
const mode = 'cors';
const credentials = 'same-origin';
const headers = {
  "Content-Type": "application/json",
};

const prodUrl = 'https://api-trin-nb7bzfogfa-uc.a.run.app';
const devUrl = 'http://localhost:8080';
const apiUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;
const audioUrl = apiUrl.concat('/static/audio/');


async function post(route, data)
{
  try {
    const url = apiUrl + route;
    const res = await fetch(url, {
      method: "POST", 
      mode,
      credentials,
      headers,
      body: JSON.stringify(data),
    });

    return res.blob();
  } catch(e) {
    console.error(e);
    return false;
  }
}

async function get(route)
{
  try {
    const url = apiUrl + route;
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
