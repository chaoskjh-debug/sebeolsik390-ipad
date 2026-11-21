# 세벌식 390 입력기 (iPad·iPhone Safari용)

iPad나 iPhone에 매직 키보드, 블루투스 키보드 같은 외장 키보드를 연결하고 **Safari 웹 페이지에서 세벌식 390으로 한글을 입력**할 수 있게 해 주는 사용자 스크립트입니다.

iPadOS와 iOS에는 세벌식 입력 방식이 없어서, macOS에서 세벌식 390을 쓰던 사람도 iPad와 iPhone에서는 두벌식을 써야 했습니다.
이 스크립트는 웹 페이지 안에서 키 입력을 받아 직접 세벌식으로 조합합니다. 배열은 **macOS의 "세벌식 390" 입력 소스와 같습니다.**

> **할 수 있는 것과 없는 것**
> - ✅ Safari로 연 웹 페이지의 입력칸: 검색창, 게시판·메일 쓰기, 댓글 등
> - ❌ Safari 주소창, 메모·메시지 같은 다른 앱, 화면(소프트웨어) 키보드
>
> iPadOS·iOS가 다른 앱의 외장 키보드 입력을 가로채는 것을 허용하지 않기 때문에 생기는 한계입니다.

## 설치 (iPad·iPhone)

1. App Store에서 **[Userscripts](https://apps.apple.com/app/userscripts/id1463298887)** 앱(무료, 오픈소스)을 설치하고 한 번 엽니다.
   스크립트를 보관할 폴더를 지정하라고 하면 아무 폴더나 지정합니다.
2. **설정 → 앱 → Safari → 확장 프로그램 → Userscripts**를 켜고, 웹사이트 권한을 **모든 웹사이트 허용**으로 둡니다.
3. iPad·iPhone Safari에서 **[Greasy Fork의 세벌식 390 입력기 페이지](https://greasyfork.org/scripts/606450)**를 열고 초록색 **설치** 버튼을 누릅니다.
   나타나는 Userscripts 창에서 **설치(Install)**를 누르면 됩니다. 이 방법으로 설치하면 새 버전이 나왔을 때 자동으로 업데이트됩니다.
   - 창이 뜨지 않으면 주소창의 확장 프로그램 버튼(퍼즐 모양) → Userscripts를 누릅니다.
   - Greasy Fork를 쓸 수 없을 때는 [GitHub의 원본 파일](https://raw.githubusercontent.com/chaoskjh-debug/sebeolsik390-ipad/main/sebeolsik390.user.js)을 열어 설치할 수도 있습니다. 이 경우 자동 업데이트는 되지 않습니다.
4. **Safari를 완전히 종료했다가 다시 엽니다.** 앱 전환 화면에서 Safari를 위로 밀어 닫습니다.

## 사용법

- **기기 입력 언어는 영어로** 둡니다. 한글 조합은 스크립트가 하므로, iPad·iPhone 자체의 한국어(두벌식) 입력이 켜져 있으면 안 됩니다.
  한국어가 켜진 채로 치면 오른쪽 아래 표시가 빨간색 "기기 입력을 영어로"로 바뀝니다. 🌐 키나 Caps Lock으로 영어로 바꾸세요.
- **Shift + Space**: 한글(세벌식 390) ↔ 영문 전환. 화면 오른쪽 아래의 `한 390` / `EN` 표시를 눌러도 됩니다.
- 비밀번호 칸에서는 동작하지 않습니다(항상 영문).
- 숫자는 Mac 390과 같이 **Shift + 오른손 자리**로 입력합니다(아래 배열표 참고). 윗줄 숫자 키는 모음과 받침입니다.

### 배열표 (세벌식 390)

`.`이 붙은 글자는 받침(종성)이고, 나머지 자음은 첫소리(초성)입니다.

```
[기본]
₩   ㅎ. ㅆ. ㅂ. ㅛ  ㅠ  ㅑ  ㅖ  ㅢ  ㅜ  ㅋ  -   =
  ㅅ. ㄹ. ㅕ  ㅐ  ㅓ  ㄹ  ㄷ  ㅁ  ㅊ  ㅍ  [   ]   \
    ㅇ. ㄴ. ㅣ  ㅏ  ㅡ  ㄴ  ㅇ  ㄱ  ㅈ  ㅂ  ㅌ
      ㅁ. ㄱ. ㅔ  ㅗ  ㅜ  ㅅ  ㅎ  ,   .   ㅗ

[Shift]
~   ㅈ. @   #   $   %   ^   &   *   (   )   _   +
  ㅍ. ㅌ. ㅋ. ㅒ  ;   <   7   8   9   >   {   }   |
    ㄷ. ㄶ. ㄺ. ㄲ. /   '   4   5   6   :   "
      ㅊ. ㅄ. ㄻ. ㅀ. !   0   1   2   3   ?
```

- 쌍자음 첫소리(ㄲ ㄸ ㅃ ㅆ ㅉ)는 같은 자음을 두 번 칩니다. 예: `ㄱ ㄱ ㅏ` → 까
- 겹모음(ㅘ ㅝ ㅢ 등)과 겹받침(ㄳ ㄵ ㄺ ㅄ 등)은 차례로 치면 조합됩니다.
- 백스페이스는 조합 중인 글자를 자모 단위로 지웁니다. 예: 닭 → 달 → 다 → ㄷ

### 설정 바꾸기

Userscripts 앱에서 스크립트를 열면 맨 위 `CONFIG`에서 바꿀 수 있습니다.

| 항목 | 기본값 | 설명 |
|---|---|---|
| `startInKorean` | `true` | 페이지를 열었을 때 한글 상태로 시작 |
| `wonForBackquote` | `true` | `` ` `` 키를 ₩로 입력 (macOS 390과 같음). `false`면 `` ` `` |
| `showBadge` | `true` | 오른쪽 아래 한/영 표시 |
| `debug` | `false` | 표시에 마지막 키 정보를 보여 줌 (문제 신고용) |

## 잘 안 될 때

오른쪽 아래 `한 390` 표시가 없고 영문이 그대로 입력되면, 그 페이지에 스크립트가 들어가지 않은 것입니다.

1. **Safari 완전 종료 후 다시 실행.** 가장 효과가 좋습니다. 확장 프로그램이 멈춰 있던 경우 이것으로 해결됩니다.
2. **페이지 새로고침.** 설치 전부터 열려 있던 탭에는 스크립트가 들어가지 않습니다.
3. **사이트 권한 확인.** 주소창 왼쪽 페이지 메뉴 → 확장 프로그램 관리에서 Userscripts가 그 사이트에 **허용**되어 있는지 확인합니다.
4. **개인정보 보호 브라우징 탭**이라면, 설정 → 앱 → Safari → 확장 프로그램 → Userscripts에서 "개인정보 보호 브라우징에서 허용"을 켭니다.
5. **상위 히트 미리 로드 끄기.** 설정 → 앱 → Safari → "상위 히트 미리 로드"를 끕니다.
   주소창에서 미리 불러온 페이지에는 스크립트 주입이 늦어지는 Safari 버그가 보고되어 있습니다.

표시는 보이는데 입력이 이상하거나, 특정 사이트에서만 안 되면 **[Issues](https://github.com/chaoskjh-debug/sebeolsik390-ipad/issues)**에 알려 주세요.
사이트 주소, 기기와 iPadOS·iOS 버전, 증상(어떤 키를 쳤을 때 무엇이 입력됐는지)을 적어 주시면 도움이 됩니다.

### 알려진 한계

- 조합 중인 글자에 밑줄 표시가 없습니다.
- Google Docs, Notion처럼 입력을 자체적으로 처리하는 편집기에서는 오동작할 수 있습니다.
- 한/영 표시는 최상위 페이지에만 나타납니다. iframe 안의 입력칸(일부 메일·블로그 편집기)은 한/영 상태가 따로 관리됩니다.

## 다른 브라우저에서 쓰기

| 환경 | 가능 여부 | 방법 |
|---|---|---|
| iPad Safari | ✅ 확인됨 | 위 설치 방법 (Userscripts 앱) |
| iPhone Safari | ✅ 확인됨 | iPad와 같은 방법 (블루투스 키보드 연결) |
| iPad Safari + Tampermonkey | △ 미확인 | Userscripts 대신 Safari용 Tampermonkey 앱을 써도 동작할 것으로 예상 |
| iPad·iPhone의 Chrome·Edge·Firefox 등 | ❌ 불가 | iOS의 다른 브라우저는 확장 프로그램을 지원하지 않음 |
| iPad Orion 브라우저 | △ 미확인 | Chrome·Firefox 확장을 시험적으로 지원. Tampermonkey를 설치하면 동작할 가능성 있음 |
| Mac·Windows Chrome·Edge | △ 미확인 | Tampermonkey 확장으로 설치 (아래 참고) |
| Mac Safari | △ 미확인 | Mac용 Userscripts 앱으로 iPad와 같은 방법 |

> Mac에는 세벌식 390이 시스템에 기본으로 들어 있어서 보통은 이 스크립트가 필요 없습니다.
> Windows 한국어 입력기에도 세벌식 배열 설정이 있습니다.
> 입력기 설정을 바꿀 수 없는 회사·학교 PC처럼 운영체제 입력기를 쓸 수 없을 때 유용합니다.

### 확인한 환경

| 기기 | 키보드 | OS | 결과 |
|---|---|---|---|
| iPad Pro | Apple Magic Keyboard (iPad Pro용) | iPadOS 27.2.1 | ✅ |
| iPhone | Logitech MX Keys for Mac (블루투스) | iOS 27.2 | ✅ |

다른 기기·키보드에서 써 보신 결과(잘 되는 경우도)를 [Issues](https://github.com/chaoskjh-debug/sebeolsik390-ipad/issues)에 남겨 주시면 표에 추가하겠습니다.

### 컴퓨터용 Chrome·Edge에 설치하기

1. Chrome 웹 스토어(Edge는 Edge 추가 기능)에서 **Tampermonkey** 확장 프로그램을 설치합니다.
2. **Chrome 138 이상:** 주소창에 `chrome://extensions`를 입력하고 Tampermonkey의 **세부정보**를 엽니다.
   **사용자 스크립트 허용**(Allow User Scripts)을 켜야 스크립트가 실행됩니다. 새로 설치한 확장은 기본으로 꺼져 있습니다.
   - Chrome 137 이하는 같은 화면 오른쪽 위의 **개발자 모드**를 켭니다.
   - Edge는 `edge://extensions`에서 같은 설정을 확인합니다.
3. **[Greasy Fork의 세벌식 390 입력기 페이지](https://greasyfork.org/scripts/606450)**에서 **설치** 버튼을 누르고, Tampermonkey 설치 화면에서 **설치**를 누릅니다.
4. 열려 있던 탭은 새로고침합니다.
5. **운영체제 입력 언어를 영어로** 두고 웹 페이지 입력칸에서 칩니다. 한/영 전환은 iPad·iPhone과 같이 **Shift + Space**입니다.

---

## 개발자용

### 파일 구성

| 파일 | 내용 |
|---|---|
| `sebeolsik390.user.js` | 사용자 스크립트 (배포 파일은 이것 하나) |
| `test/engine.test.js` | 한글 조합기 단위 테스트 |
| `test/test.html` | 입력칸 종류별(input, textarea, contenteditable) 자동 테스트 페이지 |
| `test/tt.html` | Trusted Types를 강제하는 페이지(Google·YouTube 방식)에서의 동작 확인용 |
| `tools/extract_390.py` | macOS의 390 입력 소스에서 배열을 읽어 `tools/390.json`으로 저장 (배열 검증용) |

### 테스트

```bash
node --test test/engine.test.js
```

```bash
python3 -m http.server 8390 --bind 127.0.0.1
```

두 번째 명령으로 서버를 띄운 뒤 브라우저에서 <http://localhost:8390/test/test.html>을 열고 **자동 테스트 실행**을 누릅니다.
Mac 입력 소스를 ABC로 바꾸면 각 칸에 직접 쳐 볼 수도 있습니다.

### 동작 방식

- 페이지의 `keydown` 이벤트를 가장 먼저(capture 단계) 받아, `event.code`(물리 키 위치)를 세벌식 390 배열로 해석합니다.
- 조합 중인 글자는 입력칸에 바로 넣고, 다음 자모가 오면 `document.execCommand('insertText')`로 바꿔 넣습니다.
  그래서 사이트의 `input` 이벤트, 실행 취소(Undo)와 함께 동작합니다.
- 배열은 macOS가 쓰는 첫가끝 자모(초성·중성·종성이 구분된 유니코드)로 저장되어 있어, 같은 자음이라도 초성인지 받침인지가 키마다 정해져 있습니다.

## 라이선스

[MIT](LICENSE) © 2026 chaoskjh-debug
