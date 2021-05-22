import { pipe } from 'fp-ts/function';
import { ap } from 'fp-ts/Identity';

console.log('---- Curring ----');

function write(key: string, value: string, flush: boolean): unknown {
  return `write key: ${key}, value: ${value} and flush: ${flush}`;
}

const writeC = (key: string) => (value: string) => (flush: boolean) =>
  write(key, value, flush);

console.log('writeC', writeC('key')('value')(true));

// ❌ Wrong
// pipe(true, 'value', 'key', writeC);

// ✅ Correct
console.log('writeC pipe', pipe(true, pipe('value', pipe('key', writeC))));

console.log('writeC pipe ap', pipe(writeC, ap('key'), ap('value'), ap(true)));

console.log('---- Curring ----');
