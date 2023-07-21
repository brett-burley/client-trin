const NUM_MAX = 10;
const QUEST_MAX = 6;

const digits = [
  { mandarin: '零', pinyin: 'líng', audio: require('@audio/numbers/38646.mp3') },
  { mandarin: '一', pinyin: 'yī', audio: require('@audio/numbers/19968.mp3') },
  { mandarin: '二', pinyin: 'èr', audio: require('@audio/numbers/20108.mp3') },
  { mandarin: '三', pinyin: 'sān', audio: require('@audio/numbers/19977.mp3') },
  { mandarin: '四', pinyin: 'sì', audio: require('@audio/numbers/22235.mp3') },
  { mandarin: '五', pinyin: 'wǔ', audio: require('@audio/numbers/20116.mp3') },
  { mandarin: '六', pinyin: 'liù', audio: require('@audio/numbers/20845.mp3') },
  { mandarin: '七', pinyin: 'qī', audio: require('@audio/numbers/19971.mp3') },
  { mandarin: '八', pinyin: 'bā', audio: require('@audio/numbers/20843.mp3') },
  { mandarin: '九', pinyin: 'jiǔ', audio: require('@audio/numbers/20061.mp3') },
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



export default function getNumber()
{
  const answer = getAnswer();
  const questions = getQuestions(answer);
  return { answer, questions };
}


function getAnswer()
{
  const rand = getRandom(NUM_MAX);
  const answer = digits[rand];
  answer.value = rand;
  return answer;
 
}
/**
 * Creates an array of numbers close to a given value
 *
 * @param {<Object>} answer - The answer object
 * @param {number} length - The length of the returned array.
 * @returns {Array.<Object>} - An array of values close to the initial value
 */
function getQuestions(answer)
{
  const questions = [];
  const index = getRandom(QUEST_MAX);
  const { audio, ...newObj } = answer;
  questions[index] = newObj;

  for(let i = 0; i < QUEST_MAX; i++) {
    if(i !== index) {
      let entry = getAnswer();
      while(entry.value === answer.value) {
        entry = getAnswer();
      }
      const payload = {
        mandarin: entry.mandarin,
        pinyin: entry.pinyin,
        value: entry.value,
      };
      questions[i] = payload;
    }
  }
  return questions;
}


/**
 * Generates a random number between 0 and max.
 *
 * @param {number} max - The first number.
 * @returns {number} - A random number.
 */
function getRandom(max)
{
  return Math.floor(Math.random() * max);
}
