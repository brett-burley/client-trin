const fs = require('fs');

async function main()
{
  const file = await fs.readFileSync('./strokes.dat', { encoding: 'utf-8' });

  const arr = file.split('\n')
  let count = 1;
  console.log('{');
  for(let i = 0; i < arr.length-2; i += 3) {
    //console.log(arr[i]);
    const stroke = arr[i].split(/\d/);
    //console.log(stroke);
    const words = stroke[2] ? stroke[2].trim() : stroke[1].trim();
    const names = words.split(/\s/);
    //console.log('names: ', names);
    const name = names.shift();
    const pinyin = names.join().trim();
    //console.log('name: ', name);
    //console.log('pinyin: ', pinyin);
    const type = arr[i+1];
    //console.log('type: ', type);
    const examples = arr[i+2];
    //console.log('examples: ', examples);
    console.log(`  ${name}: {`);
    console.log(`    pinyin: '${pinyin}',`);
    console.log(`    type: '${type}',`);
    console.log(`    examples: '${examples}',`);
    console.log(`    img: require('/assets/writing/strokes/images/${count++}.png')`)
    console.log(`  },`);
  }
  console.log('}');

}

main();
