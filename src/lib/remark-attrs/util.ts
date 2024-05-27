class Cursor {
  pos = 0;

  constructor(private readonly input: string) {}

  isEof() {
    return this.pos >= this.input.length;
  }

  get char() {
    return this.input[this.pos];
  }

  match(char: string | RegExp): boolean {
    const current = this.char;

    if (char instanceof RegExp) {
      return !!current && char.test(current);
    } else {
      return current === char;
    }
  }

  consumeTrivia() {
    while (this.accept(/\s|\n|\r/)) {
      //
    }
  }

  advance() {
    const char = this.char;
    this.pos++;
    return char;
  }

  accept(char: string | RegExp): boolean {
    if (this.match(char)) {
      this.pos++;
      return true;
    }

    return false;
  }
}

function parseKey(cursor: Cursor): string {
  cursor.consumeTrivia();

  if (!cursor.match(/\w/)) {
    return "";
  }

  let key = cursor.advance();

  while (cursor.match(/[\w-]/)) {
    key += cursor.advance();
  }

  cursor.consumeTrivia();

  return key;
}

function parseValue(cursor: Cursor): string {
  let value = "";
  let eos = " ";

  if (cursor.accept('"')) {
    eos = '"';
  } else if (cursor.accept("'")) {
    eos = "'";
  }

  while (!cursor.isEof() && !cursor.accept(eos)) {
    value += cursor.advance();
  }

  cursor.consumeTrivia();

  return value.trim();
}

/// simple recursive decent parser for strings like:
/// 1) something=true
/// 2) target="_blank"
/// 2) hello='there'
/// 3) easy peasy data-value=5
export default function parseAttributes(
  input: string
): Record<string, string> | null {
  const result: Record<string, string> = {};
  const cursor = new Cursor(input);

  cursor.consumeTrivia();

  while (!cursor.isEof()) {
    const key = parseKey(cursor);

    if (!key && !cursor.isEof()) {
      // something goes wrong. Parsing failed
      return null;
    }

    if (key) {
      result[key] = cursor.accept("=") ? parseValue(cursor) : "";
    }
  }

  return result;
}
