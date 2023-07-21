const { chineseToPinyin } = require('../pinyin/pinyin');
const { translations } = require('../../assets/chars/characters');

function lineToChars(line)
{
  return line.split('').filter(c => !isPunctuation(c)).map(c => (
    {
      mandarin: c,
      pinyin: chineseToPinyin(c),
      english: translations[c]
    })
  );
}

function removePunc(line)
{
  if(!line) return '';

  return line.replace(/[。，]/g, '');
}

function isVowel(c)
{
  const regex = /[aeiou]/g;
  const match = c.match(regex);

  return match ? true : false;
}

function isPunctuation(c)
{
  const regex = /[。，]/g;
  const match = c.match(regex);

  return match ? true : false;
}


module.exports = { removePunc, lineToChars, isVowel, isPunctuation };
