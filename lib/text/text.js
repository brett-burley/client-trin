//import pinyin from 'pinyin';
import storage from '../storage/storage';

const maxLength = 10000;

export function textToFilename(str)
{
  if(!str) return '404.wav';

  let code = '';
  for(let i in str) {
    code += str.codePointAt(i);
  }
  return code.concat('.mp3');
}

/*
export async function convertToBook(text)
{
  try {
    console.log(text);
    checkLength(text); 
    const book = strToBook(text);
    console.log(book);
    await storage.setData('book', book);

    return true;
  } catch(err) {
    console.error(err);
    return false
  }
}


export function titleToId(title)
{
  const trimmed = title.trim();
  return trimmed.replace(' ', '');
}

function strToBook(text)
{
  const book = [];
  const lines = text.split('\n');
  lines.forEach(line => {
    if(line.length !== 0) {
      const trimmed = line.trim();
      const split = trimmed.split(/(.*?[，。？：])/g);
      split.forEach(c => {
        if(c.length > 0) {
          const line = strToLine(c);
          const characters = strToCharacters(c);
          book.push({ line, characters });
        }
      })
    }
  })

  return book;
}


function strToLine(mandarin)
{
  return {
    mandarin,
    english: '',
  };
}

function cleanString(text)
{
  return text.replace(/[，。？：]/g, '');
}

function strToCharacters(mandarin)
{
  const text = cleanString(mandarin);
  const all = pinyin(text);
  const groups = pinyin(text, {   segment: "segmentit", group: true });
  
  let i = 0;
  let j = 0;
  const characters = [];
  let current = { mandarin: '', pinyin: '', english: '' }
  let left = groups[0][0].length;

  while(i < all.length) {
    const character = mandarin[i];
    const allStr = all[i][0];
    const groupsStr = groups[j][0]
    left = left - allStr.length;
    if(!left) { 
      current.mandarin += character;
      current.pinyin += groupsStr;
      characters.push(current);
      current = { mandarin: '', pinyin: ''}
      i = i+1;
      j = j+1;
      if(j < groups.length) 
        left = groups[j][0].length;
    } else {
      current.mandarin += character;
      i = i + 1;
    }
  }
  
  return characters;
}
*/
export function uppercaseFirst(str)
{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function checkLength(text)
{
  if(text.length > maxLength)
    throw new Error('Uploaded text is too long: > 10000');

}
