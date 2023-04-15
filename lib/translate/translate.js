import net from '../net/net';
import common from './common'
import storage from '../storage/storage';


async function translateCurrent(c)
{
  try {
    const done = isTranslated(c.line.english);
    if(!done) return false;
    const line = await translateLine(c.line);
    const characters = await translateCharacters(c.characters);
    return { current: { line, characters } };
  } catch(e) {
    console.error(e);
    return false;
  }
}

async function translatePage(page)
{
  try {
    return await Promise.all(page.map(async c => {
      if(isTranslated(c.line)) return c;
      
      const line = await translateLine(c.line);
      const characters = await translateCharacters(c.characters);
      return { line, characters };
    }));
  } catch(e) {
    console.error(e);
    return [];
  }
}


async function translateLine(line)
{
  try {
    if(line.english) return line;
    
    const { mandarin } = line;
    const english = await translateText(mandarin);
    return { mandarin, english };
  } catch(e) {
    return line;
  }
}


async function translateCharacters(characters)
{
  try {
    return await Promise.all(characters.map( async (c, i) => {
      const { mandarin, pinyin } = c;
      const english = await translateText(mandarin);
      return { mandarin, pinyin, english }
    }));
  } catch(e) {
    return characters;
  }
}


async function translateText(text)
{
  try {
    if(text.length === 1) {
      console.log('trans common: ', text)
      const isCommon = common.isCommon(text);
      if(isCommon) return isCommon;
    }
   
    // CHECK LOCAL
    const local = await storage.getData(text);
    if(local) { 
      console.log('trans local: ', text)
      return local;
    }

    // TRANSLATE
    const translation = await net.post('/text/translate', { text });
    if(translation) {
      console.log('trans network: ', text)
      await storage.setData(text, translation);
    }

    return translation;
  } catch(e) {
    console.error(e);
    return '';
  }

}


function isTranslated(english)
{
  return english.length > 0
}


export default { translateCurrent, translatePage };
