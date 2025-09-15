/*!
 * logger@2.0.0 https://github.com/EvitcaStudio/Logger
 * Compiled Mon, 15 Sep 2025 13:44:37 UTC
 * Copyright (c) 2025 Evitca Studio, "doubleactii"
 *
 * logger is privately licensed.
 */

// src/logger.ts
class Logger {
  RESET = "\x1B[0m";
  BRIGHT = "\x1B[1m";
  DIM = "\x1B[2m";
  UNDERSCORE = "\x1B[4m";
  BLINK = "\x1B[5m";
  REVERSE = "\x1B[7m";
  HIDDEN = "\x1B[8m";
  FG_BLACK = "\x1B[30m";
  FG_RED = "\x1B[31m";
  FG_GREEN = "\x1B[32m";
  FG_YELLOW = "\x1B[33m";
  FG_BLUE = "\x1B[34m";
  FG_MAGENTA = "\x1B[35m";
  FG_CYAN = "\x1B[36m";
  FG_WHITE = "\x1B[37m";
  FG_GRAY = "\x1B[90m";
  BG_BLACK = "\x1B[40m";
  BG_RED = "\x1B[41m";
  BG_GREEN = "\x1B[42m";
  BG_YELLOW = "\x1B[43m";
  BG_BLUE = "\x1B[44m";
  BG_MAGENTA = "\x1B[45m";
  BG_CYAN = "\x1B[46m";
  BG_WHITE = "\x1B[47m";
  BG_GRAY = "\x1B[100m";
  TYPE_SPACER_LENGTH = 13;
  types = {
    default: this.FG_WHITE
  };
  currentType = "";
  SPACE_CHAR = " ";
  FG_COLORS = {};
  BG_COLORS = {};
  constructor(pTypes) {
    for (let i = 0;i <= 255; i++) {
      this.FG_COLORS[i] = "\x1B[38;5;" + i + "m";
      this.BG_COLORS[i] = "\x1B[48;5;" + i + "m";
    }
    if (Array.isArray(pTypes)) {
      this.registerTypes(pTypes);
    }
  }
  prefix(pType) {
    if (typeof pType === "string")
      this.currentType = pType;
    return this;
  }
  message(pMethod = "log", ...pMessage) {
    const TYPE = this.currentType ? this.currentType : "";
    const IS_EMPTY_TYPE = TYPE.length === 0;
    if (IS_EMPTY_TYPE) {
      console[pMethod](...pMessage);
    } else {
      const TYPE_LONGER_THAN_SPACER = TYPE.length >= this.TYPE_SPACER_LENGTH;
      let TYPE_COLOR = this.types[TYPE.toLowerCase()] ? this.types[TYPE.toLowerCase()] : this.types.default;
      const IS_ANSI = TYPE_COLOR.includes("\x1B");
      if (!IS_ANSI) {
        TYPE_COLOR = `color: ${TYPE_COLOR}`;
      }
      if (globalThis.window) {
        if (IS_ANSI) {
          console[pMethod](TYPE_COLOR + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|" + this.RESET, ...pMessage);
        } else {
          console[pMethod]("%c" + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|", TYPE_COLOR, ...pMessage);
        }
      } else {
        console[pMethod](TYPE_COLOR + TYPE + this.SPACE_CHAR.repeat(Math.max(this.TYPE_SPACER_LENGTH - TYPE.length, TYPE_LONGER_THAN_SPACER ? 1 : 0)) + "|" + this.RESET, ...pMessage);
      }
    }
    this.currentType = "";
  }
  log(...pMessage) {
    this.message("log", ...pMessage);
  }
  info(...pMessage) {
    this.message("info", ...pMessage);
  }
  error(...pMessage) {
    this.message("error", ...pMessage);
  }
  warn(...pMessage) {
    this.message("warn", ...pMessage);
  }
  assert(...pMessage) {
    console.assert(...pMessage);
  }
  debug(...pMessage) {
    this.message("debug", ...pMessage);
  }
  count(pLabel) {
    console.count(pLabel);
  }
  countReset(pLabel) {
    console.countReset(pLabel);
  }
  table(pData, pColumns) {
    console.table(pData, pColumns);
  }
  time(pLabel) {
    this.message("time", pLabel);
  }
  timeLog(pLabel) {
    this.message("timeLog", pLabel);
  }
  timeEnd(pLabel) {
    this.message("timeEnd", pLabel);
  }
  trace(...pMessage) {
    this.message("trace", ...pMessage);
  }
  group(pLabel) {
    this.message("group", pLabel);
  }
  groupCollapsed(pLabel) {
    console.groupCollapsed(pLabel);
  }
  groupEnd() {
    console.groupEnd();
  }
  clear() {
    console.clear();
  }
  registerType(pType, pAnsiInfo) {
    if (this.types[pType])
      return;
    if (typeof pType === "string" && typeof pAnsiInfo === "string") {
      this.types[pType.toLowerCase()] = pAnsiInfo;
    }
  }
  registerTypes(pTypes) {
    if (Array.isArray(pTypes)) {
      for (let i = 0;i < pTypes.length; i++) {
        this.registerType(pTypes[i].type, pTypes[i].ansi);
      }
    }
  }
  unregisterType(pType) {
    if (this.types[pType])
      delete this.types[pType];
  }
}
export {
  Logger
};

//# debugId=F4CEE19D1BCA66FE64756E2164756E21
