// 조합기 단위 테스트: node --test test/
// 키 시퀀스는 KeyboardEvent.code 이름이고, 'S-'를 붙이면 Shift, 'BS'는 백스페이스입니다.
const test = require('node:test');
const assert = require('node:assert');
const { Composer, classify, LAYOUT } = require('../sebeolsik390.user.js');

const K = (c) => (/^\d$/.test(c) ? 'Digit' + c : c.length === 1 ? 'Key' + c : c);

// 실제 입력창 동작을 흉내 냅니다: 확정된 글자 + 조합 중인 글자
function type(seq) {
  const comp = new Composer();
  let text = '', pre = '';
  for (const tok of seq.split(' ')) {
    if (tok === 'BS') {
      const p = comp.backspace();
      if (p === null) text = text.slice(0, -1); else pre = p;
      continue;
    }
    const shift = tok.startsWith('S-');
    const ch = (shift ? LAYOUT.shift : LAYOUT.plain)[K(shift ? tok.slice(2) : tok)];
    assert.ok(ch !== undefined, 'unknown key ' + tok);
    const t = classify(ch);
    if (t.type === 'char') { text += comp.flush() + t.ch; pre = ''; continue; }
    const r = comp.input(t);
    text += r.commit; pre = r.preedit;
  }
  return text + pre;
}

const cases = [
  ['M F S K G W', '한글'],
  ['N C Semicolon T W N D X', '세벌식'],
  ['K K F O D', '까치'],            // 초성 ㄱㄱ → ㄲ
  ['U F W X', '닭'],                // 겹받침 ㄺ
  ['K F 3 Q', '값'],                // 겹받침 ㅄ
  ['J V R', '왜'],                  // 겹모음 ㅙ
  ['J G D', '의'],                  // ㅡ+ㅣ → ㅢ
  ['J 8', '의'],                    // ㅢ 단독 키
  ['J 9 T S', '원'],                // 9(ㅜ)+ㅓ → ㅝ
  ['J Slash F', '와'],              // /(ㅗ)+ㅏ → ㅘ
  ['J T 3 Q U F', '없다'],
  ['J D 2', '있'],                  // ㅆ 종성 단독 키
  ['J F S S-1', '앉'],              // Shift+1 = ㅈ 종성
  ['J F S 1', '않'],
  ['Semicolon 9 C W X', '뷁'],
  ['K V J 6 A J D', '고양이'],
  ['0 0', 'ㅋㅋ'],                  // ㅋ은 겹치지 않음
  ['K K K', 'ㄲㄱ'],
  ['F F', 'ㅏㅏ'],
  ['K F S-U S-I', '가78'],          // Shift+U/I = 7/8 (오른손 숫자)
  ['S-N S-M S-Comma S-Period', '0123'],
  ['M F S Period', '한.'],
  ['U F W X BS', '달'],
  ['U F W X BS BS', '다'],
  ['U F W X BS BS BS', 'ㄷ'],
  ['U F W X BS BS BS BS', ''],
  ['K F BS BS BS', ''],              // 조합이 끝나면 확정된 글자를 지움(여기선 없음)
  ['K F K F BS BS', '가'],           // 두 번째 '가'의 ㅏ, ㄱ만 지워지고 첫 '가'는 남음
  ['K F K F BS BS BS', ''],          // 세 번째는 확정된 첫 '가'를 지움
  ['J V F BS', '오'],                // ㅘ → ㅗ
  ['S X', 'ㄴㄱ'],                   // 종성만 단독으로 (호환 자모)
  ['K F X X', '갂'],                 // 종성 ㄱㄱ → ㄲ
  ['K F S-F', '갂'],                 // Shift+F = ㄲ 종성
  ['Backquote S-Backquote', '₩~'],
];

for (const [seq, want] of cases) {
  test(`${seq} → ${want || '(빈 문자열)'}`, () => assert.strictEqual(type(seq), want));
}
