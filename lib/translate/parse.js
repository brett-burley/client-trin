import _ from 'lodash';
import net from '../net/net';
import common from './common'
import storage from '../storage/storage';
import pinyin from 'pinyin';
import story from '../../assets/books/text/Fuxiandbagua';

let commonCount = 0;
let localCount = 0;
let networkCount = 0;

export default async function textToBook(text)
{
  const textArray = parseText(story);
  const book =  await Promise.all(textArray.map(async (line, i) => {
    if(line.length) {
      const l = await getLine(line);
      const c = await getCharacters(line)
      
      console.log(`line #${i}: done - ${line}`);
      return { l, c };
    }
  }));

  console.log(commonCount);
  console.log(localCount);
  console.log(networkCount);
  return book;
}


function parseText(text)
{
  const withoutLines = text.replaceAll("\n", '');
  const split = withoutLines.split(/(.*?[！，。、？：；…])/g);
  const blanksRemoved = split.filter(line => line.length && line !== '…');
  return blanksRemoved;
}


async function getLine(text)
{
  const line = { m: '', e: '' };
  try {
    const mandarin = textToMandarin(text);
    const english = await translateLine(text);
    line.m = text;
    line.e = english;
    return line;
  } catch(e) {
    console.error(e);
    return line;
  }
}


async function getCharacters(text)
{
  const mandarin = textToMandarin(text)
  const charArray = Array.from(mandarin);
  const groups = pinyin(mandarin, { segment: "segmentit", group: true });
  const singles = pinyin(mandarin, { segment: true, heteronym: true });

  let entry = { m: '', p: { g: '', s: [] }, e: { g: '', s: [] } };
  let characters = [];
  for(const groupArray of groups) {
    const g = groupArray[0];
    entry.p.g = g;
    const c = charArray[0];
    if(isCharacter(c)) {
      await getTranslations(g)  
      characters.push(entry);
      entry = { m: '', p: { g: '', s: [] }, e: { g: '', s: [] } };
    }
  }

  return characters;


  async function getTranslations(g)
  {
    const result = { p: [], e: { g: '', s: [] } };
    let single = [];
    try {
      let copy = g.slice();
      while(copy.length) {
        const c = charArray.shift();
        if(c) entry.m += c;

        if(singles.length)
          single = singles.shift();
        else
          copy = '';

        for(const p of single) {
          const index = copy.indexOf(p);
          if(index >= 0) {
            entry.p.s.push(p);
            entry.e.s.push(await translateChars(c));
            copy = copy.slice(p.length);
          }
        }
      }
      entry.e.g = await translateChars(entry.m);
      return true;
    } catch(e) {
      console.log(e);
    }
  }
}


async function translateLine(text)
{
  try {
    networkCount++;
    return 'line';
    const english = await net.translate(text);
    return english;
  } catch(e) {
    console.error(e);
    return '';
  }
}


async function translateChars(text)
{
  try {
    if(text.length === 1) {
      const isCommon = common.isCommon(text);
      if(isCommon) { 
        commonCount++;
        return isCommon;
      }
    }
   
    // CHECK LOCAL
    const local = await storage.getData(text);
    if(local) { 
      localCount++;
      return local;
    }

    networkCount++;
    return 'char';
    const english = await net.translate(text);
    await storage.setData(text, english);
    return english;
  } catch(e) {
    console.error(e);
    return '';
  }
}


function isCharacter(c) {
  if(!c) return false;
  const search = c.search(/[…！，。、；？：“”\Z]/g);
  return search < 0 ? true : false;
}


function textToArray(text)
{
  const mandarin = textToMandarin(text);
  return Array.from(mandarin);
}


function textToMandarin(text)
{
  return text.substring(0, text.length-1)
}








  /*

  let result = [];
  let promises = [];
  let entry = { m: '', p: { g: '', s: [] }, e: { g: '', s: [] } };
  let group = groups[0][0];
  let left = group.length;
  let g = 1;
  let s = 0;
  characters.forEach((c, i) => {
    if(c && isCharacter(c)) {
      entry.m += c;
      promises.push(translateChars(c));
      
      if(singles[s]) {
        const single = singles[s++];
        const pinyin = getPinyin(single, group);
        entry.p.s.push(pinyin);
        left = left - pinyin.length;
      } else {
        left = 0;
      }
      if(left <= 0) {
        entry.p.g = group;
        result.push(entry);
        promises.push(translateChars(entry.m), '-');
        if(groups[g]) {
          group = groups[g++][0];
          left = group.length;
        }
        entry = { m: '', p: { g: '', s: [] }, e: { g: '', s: [] } };
      }
    }
  });

  
  const translations = await Promise.all(promises);
  addTranslations();

  return result;


  function addTranslations()
  {
    let j = 0;
    let k = 0;
    for(let i = 0; i < translations.length-1; i++) {
      let english = translations[i];
      const current = result[j];
      const next = translations[i+1];
      if(next === '-') {
        storage.setData(current.m, english);
        current.e.g = english;
        j++;
        i++;
        k = 0;
      } else {
        const character = current.m.charAt(k);
        k++;
        current.e.s.push(english);
        storage.setData(character, english);
      }
    } 
  }

function getPinyin(singles, group)
{
  let pinyin = singles[0];
  singles.forEach(p => {
    if(group.includes(p)) {
      pinyin = p;
    }
  }); 

  return pinyin;
}
  */

