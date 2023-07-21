const fs = require('fs');

const API_URL = 'https://api-trin-nb7bzfogfa-uc.a.run.app';
const DEV_URL = 'http://localhost:8080';

//let baseUrl = process.env.ENV === 'development' ? DEV_URL : API_URL;
let baseUrl = DEV_URL; 

const options = getOptions();

const digits = [
  { mandarin:'零', pinyin: 'líng' },
  { mandarin:'一', pinyin: 'yī' },
  { mandarin:'二', pinyin: 'èr' },
  { mandarin:'三', pinyin: 'sān' },
  { mandarin:'四', pinyin: 'sì' },
  { mandarin:'五', pinyin: 'wǔ' },
  { mandarin:'六', pinyin: 'liù' },
  { mandarin:'七', pinyin: 'qī' },
  { mandarin:'八', pinyin: 'bā' },
  { mandarin:'九', pinyin: 'jiǔ' }
];

const multipliers = {
   10: { mandarin: '十', pinyin: 'shí' },
   100: { mandarin: '百', pinyin: 'bǎi' },
   1000: { mandarin: '千', pinyin: 'qiān' },
   10000: { mandarin: '万', pinyin: 'wàn' },
   100000: { mandarin: '十万', pinyin: 'shí wàn' },
   1000000: { mandarin: '百万', pinyin: 'bǎi wàn' },
   10000000: { mandarin: '百万', pinyin: 'bǎi wàn' },
 };

main();

async function main()
{
  digits.forEach(d => {
    const text = d.mandarin;
    console.log('{', `mandarin: '${text}',`, `pinyin: '${d.pinyin}',`, `audio: '${strToCode(text)}'}`);

  });
}

async function get(text)
{
  try {
    const code = strToCode(text);
    const url = baseUrl + `/static/audio/${code}`;
    const res = await fetch(url, {
      method: "GET",
      ...options
    });
    const data = await res.blob();
    return data;
    /*
    if(!res.ok)
      throw new Error('Error: ', res.statusText);

    const reader = res.body.getReader();
    const stream = await reader.read();
    const intArr = stream.value;
    console.log('intArr', intArr);
    const decoder = new TextDecoder();
    const data = decoder.decode(intArr);
    console.log(data);
    return data;
    */

  } catch(e) {
    console.error(e);
    return false;
  }
}

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


function strToCode(str)
{
  if(!str) return '404.wav';

  let code = '';
  for(let i in str) {
    code += str.codePointAt(i);
  }
  return code.concat('.mp3');
}
