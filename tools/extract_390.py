"""Extract the macOS 390Hangul.keylayout (ANSI, plain + shift) into JSON keyed by DOM KeyboardEvent.code."""
import json, re, sys, unicodedata

SRC = "/System/Library/Input Methods/KoreanIM.app/Contents/PlugIns/KIM_Extension.appex/Contents/Resources/390Hangul.keylayout"

# macOS virtual keycode -> DOM KeyboardEvent.code (ANSI)
MAC2CODE = {
    0: "KeyA", 1: "KeyS", 2: "KeyD", 3: "KeyF", 4: "KeyH", 5: "KeyG", 6: "KeyZ", 7: "KeyX",
    8: "KeyC", 9: "KeyV", 11: "KeyB", 12: "KeyQ", 13: "KeyW", 14: "KeyE", 15: "KeyR",
    16: "KeyY", 17: "KeyT", 18: "Digit1", 19: "Digit2", 20: "Digit3", 21: "Digit4",
    22: "Digit6", 23: "Digit5", 24: "Equal", 25: "Digit9", 26: "Digit7", 27: "Minus",
    28: "Digit8", 29: "Digit0", 30: "BracketRight", 31: "KeyO", 32: "KeyU",
    33: "BracketLeft", 34: "KeyI", 35: "KeyP", 37: "KeyL", 38: "KeyJ", 39: "Quote",
    40: "KeyK", 41: "Semicolon", 42: "Backslash", 43: "Comma", 44: "Slash", 45: "KeyN",
    46: "KeyM", 47: "Period", 50: "Backquote",
}

text = open(SRC, encoding="utf-8").read()
ansi = re.search(r'<keyMapSet id="ANSI">(.*?)</keyMapSet>', text, re.S).group(1)
out = {}
for idx, name in ((0, "plain"), (1, "shift")):
    body = re.search(r'<keyMap index="%d"[^>]*>(.*?)</keyMap>' % idx, ansi, re.S).group(1)
    layer = {}
    for code, val in re.findall(r'<key code="(\d+)" output="([^"]*)"', body):
        code = int(code)
        if code in MAC2CODE:
            val = (val.replace("&#x0022;", '"').replace("&quot;", '"').replace("&amp;", "&")
                      .replace("&lt;", "<").replace("&gt;", ">").replace("&apos;", "'").replace("&#x0027;", "'"))
            val = re.sub(r"&#x([0-9A-Fa-f]+);", lambda m: chr(int(m.group(1), 16)), val)
            layer[MAC2CODE[code]] = val
    out[name] = layer

missing = {n: sorted(set(MAC2CODE.values()) - set(l)) for n, l in out.items()}
print("missing:", missing, file=sys.stderr)
json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
