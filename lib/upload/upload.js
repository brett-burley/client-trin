async function readFile(path)
{
  try {
    return fs.readFileSync(path, { encoding: 'utf-8'});
  } catch(e) {
    return '';
  }
}


function formatMandarin(mandarin)
{
  const regex = /(.*?[.。，！;:、?　])/g
  const split = mandarin.split(regex);
  const compact = split.map(line => {
    const text = line.replaceAll(/[ 　\n]/g,'');
    return text;
  })
  const cleaned = compact.filter(l => l !== "" && l !== '，');
  console.log('[');
  const result = cleaned.map(line => {
    const mandarin = removePunc(line);
    const characters = lineToPinyin(mandarin);
    console.log(`{line:'${line}',`);
    console.log('characters:[');
    characters.forEach(c => console.log(c,','));
    console.log(']},');

    return { mandarin: line, characters };
  })
  
  return JSON.stringify(result);
}

function lineToPinyin(mandarin)
{
  const all = pinyin(mandarin);
  const groups = pinyin(mandarin, {   segment: "segmentit", group: true });
  
  let i = 0;
  let j = 0;
  const characters = [];
  let current = { mandarin: '', pinyin: '' }
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

function removePunc(line)
{
  if(!line) return '';

  return line.replace(/[。，]/g, '');
}

function matchTone(str)
{
  const regex = /ūǔúùīǐìíǒōòóěéèēāáàǎ/g;

  const matches = str.matchAll(regex);
  console.log(matches)
}

module.exports = { formatMandarin };
