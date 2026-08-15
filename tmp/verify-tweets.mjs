import {getTweet} from 'react-tweet/api';
const ids = process.argv.slice(2);
for (const id of ids) {
  try {
    const t = await getTweet(id);
    if (!t) { console.log(id, 'NULL'); continue; }
    console.log(JSON.stringify({id, date: t.created_at, media: (t.mediaDetails||[]).map(m=>m.type), text: t.text.replace(/\n/g,' ').slice(0,150)}));
  } catch(e) { console.log(id, 'ERR', e.message.slice(0,80)); }
  await new Promise(r=>setTimeout(r,400));
}
