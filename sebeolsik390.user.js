// ==UserScript==
// @name            세벌식 390 입력기
// @name:en         Sebeolsik 390 Korean Input
// @namespace       https://github.com/chaoskjh-debug/sebeolsik390-ipad
// @version         0.1.1
// @description     iPad Safari 등에서 외장 키보드로 세벌식 390 한글을 입력합니다. macOS의 세벌식 390과 같은 배열입니다.
// @description:en  Type Korean with the Sebeolsik 390 (3-set) layout on a hardware keyboard in web pages, e.g. iPad Safari. Same layout as macOS "390 Sebulshik".
// @author          chaoskjh-debug
// @license         MIT
// @homepageURL     https://github.com/chaoskjh-debug/sebeolsik390-ipad
// @supportURL      https://github.com/chaoskjh-debug/sebeolsik390-ipad/issues
// @match           *://*/*
// @run-at          document-start
// @inject-into     content
// @grant           none
// ==/UserScript==

/*
 * 세벌식 390 입력기
 * Copyright (c) 2026 chaoskjh-debug — MIT License (https://github.com/chaoskjh-debug/sebeolsik390-ipad)
 *
 * 사용법
 *  - iPad(또는 Mac)의 입력 언어는 영어(ABC)로 둡니다. 한글 조합은 이 스크립트가 합니다.
 *  - Shift+Space: 한글(세벌식 390) / 영문 전환. 화면 오른쪽 아래 표시를 눌러도 전환됩니다.
 *  - 지원 입력창: input(text/search/url/tel), textarea, contenteditable. 비밀번호 칸에서는 동작하지 않습니다.
 *  - 배열은 macOS의 "세벌식 390" 입력 소스와 같습니다 (tools/extract_390.py로 확인).
 */

(function () {
  'use strict';

  const CONFIG = {
    startInKorean: true,   // 페이지를 열었을 때 한글 상태로 시작
    wonForBackquote: true, // macOS 390과 같이 ` 키를 ₩로 입력 (false면 `)
    showBadge: true,       // 오른쪽 아래 한/영 표시
    debug: false,          // true면 오른쪽 아래 표시에 마지막 키 정보(key/code/keyCode)를 보여 줌
  };

  // KeyboardEvent.code -> 출력. 유니코드 첫가끝 자모(초성 U+1100, 중성 U+1161, 종성 U+11A8)는
  // 한글 조합에 쓰이고, 그 밖의 문자는 그대로 입력됩니다.
  const LAYOUT = {
    plain: {
      Backquote: '₩',
      Digit1: '\u11C2', // ㅎ 종성
      Digit2: '\u11BB', // ㅆ 종성
      Digit3: '\u11B8', // ㅂ 종성
      Digit4: '\u116D', // ㅛ 중성
      Digit5: '\u1172', // ㅠ 중성
      Digit6: '\u1163', // ㅑ 중성
      Digit7: '\u1168', // ㅖ 중성
      Digit8: '\u1174', // ㅢ 중성
      Digit9: '\u116E', // ㅜ 중성
      Digit0: '\u110F', // ㅋ 초성
      Minus: '-',
      Equal: '=',
      KeyQ: '\u11BA', // ㅅ 종성
      KeyW: '\u11AF', // ㄹ 종성
      KeyE: '\u1167', // ㅕ 중성
      KeyR: '\u1162', // ㅐ 중성
      KeyT: '\u1165', // ㅓ 중성
      KeyY: '\u1105', // ㄹ 초성
      KeyU: '\u1103', // ㄷ 초성
      KeyI: '\u1106', // ㅁ 초성
      KeyO: '\u110E', // ㅊ 초성
      KeyP: '\u1111', // ㅍ 초성
      BracketLeft: '[',
      BracketRight: ']',
      Backslash: "\\",
      KeyA: '\u11BC', // ㅇ 종성
      KeyS: '\u11AB', // ㄴ 종성
      KeyD: '\u1175', // ㅣ 중성
      KeyF: '\u1161', // ㅏ 중성
      KeyG: '\u1173', // ㅡ 중성
      KeyH: '\u1102', // ㄴ 초성
      KeyJ: '\u110B', // ㅇ 초성
      KeyK: '\u1100', // ㄱ 초성
      KeyL: '\u110C', // ㅈ 초성
      Semicolon: '\u1107', // ㅂ 초성
      Quote: '\u1110', // ㅌ 초성
      KeyZ: '\u11B7', // ㅁ 종성
      KeyX: '\u11A8', // ㄱ 종성
      KeyC: '\u1166', // ㅔ 중성
      KeyV: '\u1169', // ㅗ 중성
      KeyB: '\u116E', // ㅜ 중성
      KeyN: '\u1109', // ㅅ 초성
      KeyM: '\u1112', // ㅎ 초성
      Comma: ',',
      Period: '.',
      Slash: '\u1169', // ㅗ 중성
    },
    shift: {
      Backquote: '~',
      Digit1: '\u11BD', // ㅈ 종성
      Digit2: '@',
      Digit3: '#',
      Digit4: '$',
      Digit5: '%',
      Digit6: '^',
      Digit7: '&',
      Digit8: '*',
      Digit9: '(',
      Digit0: ')',
      Minus: '_',
      Equal: '+',
      KeyQ: '\u11C1', // ㅍ 종성
      KeyW: '\u11C0', // ㅌ 종성
      KeyE: '\u11BF', // ㅋ 종성
      KeyR: '\u1164', // ㅒ 중성
      KeyT: ';',
      KeyY: '<',
      KeyU: '7',
      KeyI: '8',
      KeyO: '9',
      KeyP: '>',
      BracketLeft: '{',
      BracketRight: '}',
      Backslash: '|',
      KeyA: '\u11AE', // ㄷ 종성
      KeyS: '\u11AD', // ㄶ 종성
      KeyD: '\u11B0', // ㄺ 종성
      KeyF: '\u11A9', // ㄲ 종성
      KeyG: '/',
      KeyH: '\'',
      KeyJ: '4',
      KeyK: '5',
      KeyL: '6',
      Semicolon: ':',
      Quote: "\"",
      KeyZ: '\u11BE', // ㅊ 종성
      KeyX: '\u11B9', // ㅄ 종성
      KeyC: '\u11B1', // ㄻ 종성
      KeyV: '\u11B6', // ㅀ 종성
      KeyB: '!',
      KeyN: '0',
      KeyM: '1',
      Comma: '2',
      Period: '3',
      Slash: '?',
    },
  };

  // ---------------------------------------------------------------------------
  // 한글 조합기 (세벌식: 초성·중성·종성이 키로 구분됨)
  // ---------------------------------------------------------------------------
  const CHO_COMPAT = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const JUNG_COMPAT = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  const JONG_COMPAT = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

  // 초성 겹치기: ㄱㄱ→ㄲ, ㄷㄷ→ㄸ, ㅂㅂ→ㅃ, ㅅㅅ→ㅆ, ㅈㅈ→ㅉ
  const CHO_COMBO = { '0,0': 1, '3,3': 4, '7,7': 8, '9,9': 10, '12,12': 13 };
  // 겹모음: ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ
  const JUNG_COMBO = { '8,0': 9, '8,1': 10, '8,20': 11, '13,4': 14, '13,5': 15, '13,20': 16, '18,20': 19 };
  // 겹받침: ㄲ ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅄ ㅆ
  const JONG_COMBO = {
    '1,1': 2, '1,19': 3, '4,22': 5, '4,27': 6, '8,1': 9, '8,16': 10, '8,17': 11,
    '8,19': 12, '8,25': 13, '8,26': 14, '8,27': 15, '17,19': 18, '19,19': 20,
  };

  function classify(ch) {
    if (ch.length === 1) {
      const cp = ch.charCodeAt(0);
      if (cp >= 0x1100 && cp <= 0x1112) return { type: 'cho', idx: cp - 0x1100 };
      if (cp >= 0x1161 && cp <= 0x1175) return { type: 'jung', idx: cp - 0x1161 };
      if (cp >= 0x11a8 && cp <= 0x11c2) return { type: 'jong', idx: cp - 0x11a7 };
    }
    return { type: 'char', ch };
  }

  class Composer {
    constructor() { this.reset(); }
    reset() { this.cho = -1; this.jung = -1; this.jong = 0; this.history = []; }
    get empty() { return this.cho < 0 && this.jung < 0 && this.jong === 0; }

    // 조합 중인 글자. 초성+중성이 있으면 완성형 음절, 아니면 호환 자모를 나열합니다.
    preedit() {
      if (this.cho >= 0 && this.jung >= 0) {
        return String.fromCharCode(0xac00 + (this.cho * 21 + this.jung) * 28 + this.jong);
      }
      let s = '';
      if (this.cho >= 0) s += CHO_COMPAT[this.cho];
      if (this.jung >= 0) s += JUNG_COMPAT[this.jung];
      if (this.jong) s += JONG_COMPAT[this.jong];
      return s;
    }

    flush() { const s = this.preedit(); this.reset(); return s; }
    _save() { this.history.push([this.cho, this.jung, this.jong]); }

    // 자모 하나를 넣습니다. commit: 확정된 글자(이전 조합), preedit: 새로 조합 중인 글자
    input(t) {
      let commit = '';
      if (t.type === 'cho') {
        if (this.cho >= 0 && this.jung < 0 && this.jong === 0) {
          const c = CHO_COMBO[this.cho + ',' + t.idx];
          if (c !== undefined) { this._save(); this.cho = c; return { commit, preedit: this.preedit() }; }
        }
        if (!this.empty) commit = this.flush();
        this._save(); this.cho = t.idx;
      } else if (t.type === 'jung') {
        if (this.jung >= 0 && this.jong === 0) {
          const c = JUNG_COMBO[this.jung + ',' + t.idx];
          if (c !== undefined) { this._save(); this.jung = c; return { commit, preedit: this.preedit() }; }
          commit = this.flush();
        } else if (this.jong !== 0) {
          commit = this.flush();
        }
        this._save(); this.jung = t.idx;
      } else if (t.type === 'jong') {
        if (this.jong !== 0) {
          const c = JONG_COMBO[this.jong + ',' + t.idx];
          if (c !== undefined) { this._save(); this.jong = c; return { commit, preedit: this.preedit() }; }
          commit = this.flush();
        } else if (this.jung < 0 && !this.empty) {
          commit = this.flush();
        }
        this._save(); this.jong = t.idx;
      }
      return { commit, preedit: this.preedit() };
    }

    // 조합 중이면 마지막 자모를 지우고 새 preedit를 돌려줍니다. 조합 중이 아니면 null.
    backspace() {
      if (this.empty) return null;
      const prev = this.history.pop();
      if (prev) [this.cho, this.jung, this.jong] = prev; else this.reset();
      if (this.empty) this.history = [];
      return this.preedit();
    }
  }

  if (typeof window === 'undefined') {
    // Node 테스트용
    module.exports = { Composer, classify, LAYOUT, CONFIG };
    return;
  }
  if (window.__sebeolsik390) return;
  window.__sebeolsik390 = true;
  const VERSION = '0.1.1';
  console.info(`[세벌식 390] v${VERSION} 실행됨: ${location.href} (readyState=${document.readyState})`);

  // ---------------------------------------------------------------------------
  // 웹 페이지 입력창 연결
  // ---------------------------------------------------------------------------
  const composer = new Composer();
  let korean = CONFIG.startInKorean;
  let pre = '';     // 입력창에 들어가 있는 조합 중인 글자
  let preEl = null; // 조합 중인 글자가 있는 입력창

  const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Fn', 'FnLock', 'AltGraph', 'Hyper', 'Super', 'OS', 'Unidentified', 'Dead']);
  const TEXT_INPUT_TYPES = new Set(['text', 'search', 'url', 'tel']);

  // event.code가 비어 있을 때를 대비한 QWERTY(US) 역매핑
  const KEY_TO_CODE = (() => {
    const m = {};
    for (let i = 0; i < 26; i++) {
      const c = String.fromCharCode(97 + i);
      m[c] = m[c.toUpperCase()] = 'Key' + c.toUpperCase();
    }
    const pairs = ['`~Backquote', '1!Digit1', '2@Digit2', '3#Digit3', '4$Digit4', '5%Digit5', '6^Digit6',
      '7&Digit7', '8*Digit8', '9(Digit9', '0)Digit0', '-_Minus', '=+Equal', '[{BracketLeft', ']}BracketRight',
      '\\|Backslash', ';:Semicolon', '\'"Quote', ',<Comma', '.>Period', '/?Slash'];
    for (const p of pairs) { m[p[0]] = m[p[1]] = p.slice(2); }
    return m;
  })();

  function isField(el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'; }

  function editableOf(e) {
    const t = (e.composedPath && e.composedPath()[0]) || e.target;
    if (!t || t.nodeType !== 1) return null;
    if (t.tagName === 'TEXTAREA') return t.readOnly || t.disabled ? null : t;
    if (t.tagName === 'INPUT') return TEXT_INPUT_TYPES.has(t.type) && !t.readOnly && !t.disabled ? t : null;
    if (t.isContentEditable) return t;
    return null;
  }

  // 커서 바로 앞에 조합 중인 글자가 그대로 있는지 확인합니다 (사용자가 커서를 옮겼으면 false).
  function preIntact(el) {
    if (!pre || el !== preEl) return false;
    if (isField(el)) {
      const s = el.selectionStart, e = el.selectionEnd;
      return s === e && e >= pre.length && el.value.slice(e - pre.length, e) === pre;
    }
    const sel = window.getSelection();
    if (!sel || !sel.isCollapsed || !sel.rangeCount) return false;
    for (let i = 0; i < pre.length; i++) sel.modify('extend', 'backward', 'character');
    const ok = sel.toString() === pre;
    sel.collapseToEnd();
    return ok;
  }

  // 커서 앞 oldLen 글자를 newText로 바꿉니다.
  function applyEdit(el, oldLen, newText) {
    if (!oldLen && !newText) return;
    if (isField(el)) {
      const end = el.selectionEnd;
      const start = oldLen ? end - oldLen : el.selectionStart;
      if (oldLen) el.setSelectionRange(start, end);
      const ok = newText ? document.execCommand('insertText', false, newText) : document.execCommand('delete', false);
      if (!ok) {
        el.setRangeText(newText, start, end, 'end');
        el.dispatchEvent(new InputEvent('input', {
          bubbles: true, inputType: newText ? 'insertText' : 'deleteContentBackward', data: newText || null,
        }));
      }
    } else {
      const sel = window.getSelection();
      if (oldLen) for (let i = 0; i < oldLen; i++) sel.modify('extend', 'backward', 'character');
      if (newText) document.execCommand('insertText', false, newText);
      else if (!sel.isCollapsed) document.execCommand('delete', false);
    }
  }

  function finish() { composer.reset(); pre = ''; preEl = null; }

  function consume(e) { e.preventDefault(); e.stopImmediatePropagation(); }

  function onKeyDown(e) {
    try {
      const handled = handleKey(e);
      if (CONFIG.debug) {
        renderBadge(`${e.key}/${e.code || '-'}/${e.keyCode}${e.isComposing ? '/조합' : ''} ${handled ? '✓' : '·'}`);
      }
    } catch (err) {
      finish();
      console.error('[세벌식 390] 키 처리 오류', err);
      renderBadge('오류: ' + (err && err.message ? err.message : err).toString().slice(0, 40));
    }
  }

  // 키를 이 스크립트가 처리했으면 true
  function handleKey(e) {
    ensureBadge();
    if (MODIFIER_KEYS.has(e.key)) return false;

    // Shift+Space: 한/영 전환 (입력창 안에서만 가로챔)
    if (e.code === 'Space' && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (editableOf(e)) { consume(e); finish(); setKorean(!korean); return true; }
      return false;
    }
    if (!korean) return false;

    // 기기 쪽 한글 입력기가 켜져 있으면 키 이벤트가 'Process'로 옵니다.
    if (e.isComposing || e.key === 'Process' || e.keyCode === 229) { finish(); badgeWarn(); return false; }

    const el = editableOf(e);
    if (!el) { finish(); return false; }
    if (el !== preEl) finish();
    if (e.ctrlKey || e.metaKey || e.altKey) { finish(); return false; }

    if (e.key === 'Backspace') {
      if (pre && preIntact(el)) {
        const p = composer.backspace();
        consume(e);
        applyEdit(el, pre.length, p);
        pre = p; if (!pre) preEl = null;
        return true;
      }
      finish();
      return false;
    }

    const code = e.code || KEY_TO_CODE[e.key];
    const ch = code && (e.shiftKey ? LAYOUT.shift : LAYOUT.plain)[code];
    if (ch === undefined) { finish(); return false; } // Space, Enter, Tab, 화살표 등은 그대로 통과

    consume(e);
    if (pre && !preIntact(el)) finish();

    const t = classify(ch);
    if (t.type === 'char') {
      const out = code === 'Backquote' && !e.shiftKey && !CONFIG.wonForBackquote ? '`' : t.ch;
      finish();
      applyEdit(el, 0, out);
      return true;
    }
    const r = composer.input(t);
    if (r.commit) applyEdit(el, 0, r.preedit); // 이전 글자는 이미 입력창에 있으므로 확정만 하고 새 글자를 덧붙임
    else applyEdit(el, pre.length, r.preedit);
    pre = r.preedit;
    preEl = pre ? el : null;
    return true;
  }

  window.addEventListener('keydown', onKeyDown, true);
  // 마우스·터치로 커서를 옮기거나 다른 입력창으로 가면 조합을 끝냅니다.
  window.addEventListener('pointerdown', finish, true);
  window.addEventListener('focusin', finish, true);
  window.addEventListener('blur', finish, true);

  // ---------------------------------------------------------------------------
  // 한/영 표시 (최상위 프레임에만)
  // ---------------------------------------------------------------------------
  let badge = null, warnTimer = 0;

  function renderBadge(text) {
    if (!badge) return;
    badge.textContent = text || (korean ? '한 390' : 'EN');
    badge.dataset.mode = korean ? 'ko' : 'en';
  }
  function setKorean(v) { korean = v; renderBadge(); }
  function badgeWarn() {
    if (!badge || warnTimer) return;
    renderBadge('기기 입력을 영어로');
    badge.dataset.mode = 'warn';
    warnTimer = setTimeout(() => { warnTimer = 0; renderBadge(); }, 2500);
  }

  let badgeHost = null;
  const BADGE_CSS = `
    button{font:600 12px/1 -apple-system,system-ui,sans-serif;padding:7px 10px;border-radius:999px;
      border:1px solid rgba(0,0,0,.15);background:#fff;color:#1d1d1f;opacity:.88;cursor:pointer;
      box-shadow:0 1px 4px rgba(0,0,0,.18);-webkit-user-select:none;user-select:none}
    button[data-mode=ko]{background:#1d6fe0;color:#fff;border-color:#1d6fe0}
    button[data-mode=warn]{background:#d33;color:#fff;border-color:#d33}`;

  // innerHTML을 쓰지 않고 DOM API로만 만듭니다 (Trusted Types를 강제하는 사이트에서도 동작하도록).
  function mountBadge() {
    if (!CONFIG.showBadge || window.top !== window || badge) return;
    const parent = document.body || document.documentElement;
    if (!parent) return;
    try {
      const host = document.createElement('div');
      host.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:2147483647;';
      const root = host.attachShadow({ mode: 'closed' });
      const style = document.createElement('style');
      style.textContent = BADGE_CSS;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.title = 'Shift+Space로 한/영 전환';
      root.append(style, btn);
      // 입력창 포커스를 빼앗지 않도록 pointerdown 기본 동작을 막고 click으로 전환
      btn.addEventListener('pointerdown', (e) => e.preventDefault());
      btn.addEventListener('mousedown', (e) => e.preventDefault());
      btn.addEventListener('click', () => { finish(); setKorean(!korean); });
      parent.appendChild(host);
      badge = btn;
      badgeHost = host;
      renderBadge();
    } catch (err) {
      console.error('[세벌식 390] 한/영 표시를 만들지 못함', err);
    }
  }

  // 사이트가 body를 갈아 끼우거나 표시를 지웠으면 다시 붙입니다.
  function ensureBadge() {
    if (badgeHost && !badgeHost.isConnected) {
      (document.body || document.documentElement).appendChild(badgeHost);
    } else if (!badge) {
      mountBadge();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountBadge);
  else mountBadge();
  window.addEventListener('focusin', ensureBadge, true);
})();
