const commonChars = {聪: 'Satoshi',明: 'Bright',也: 'also',我: 'I',所: 'Place',很: 'very',我: 'I',是: 'Yes',个: 'indivual',在: 'exist',觉: 'Sleep',一: 'one',时: 'Time',你: 'you',亲: 'Dear',但: 'but',知: 'Know',现: 'now',了: 'span',于: 'At',要: 'want',一: 'one',睡: 'sleep',也: 'also',的: 'of',听: 'listen',淘: 'Amoy',你: 'you',需: 'need',候: 'wait',想: 'think',个: 'indivual',很: 'very',他: 'he',只: 'Only',子: 'son',天: 'sky',给: 'Give',故: 'Therefore',你: 'you',强: 'powerful',的: 'of',爱: 'Love',晚: 'Night',时: 'Time',但: 'but',是: 'Yes',关: 'close',的: 'of',觉: 'Sleep',事: 'thing',很: 'very',说: 'Say',现: 'now',玩: 'Play',我: 'I',猴: 'monkey',讲: 'speak',在: 'exist',以: 'by',在: 'exist',这: 'This',了: 'span',气: 'gas',他: 'he',很: 'very',睡: 'sleep',是: 'Yes',有: 'Have',故: 'Therefore',前: 'forward',了: 'span',什: 'Varied',时: 'Time',事: 'thing',的: 'of',道: 'road',间: 'between',了: 'span',孩: 'child',的: 'of',很: 'very',累: 'tired',一: 'one',子: 'son',猴: 'monkey',大: 'Big',么: 'what',学: 'study',习: 'habit',你: 'you',子: 'son',老: 'old',候: 'wait',去: 'go',去: 'go',学: 'study',习: 'habit',怎: 'How',么: 'what',是: 'Yes',爱: 'Love',去: 'go',别: 'do not',帮: 'help',人: 'people',助: 'help'}

function isCommon(text)
{
  return commonChars[text];
}

export default { isCommon }
