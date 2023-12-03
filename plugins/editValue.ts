import fs from "fs";

interface Token {
  value: string;
  type: string;
  description?: string;
}

interface TokenSet {
  [key: string]: Token | TokenSet;
}

interface JsonData {
  global: {
    [category: string]: TokenSet;
  };
  theme: {
    colors: TokenSet;
  };
  $themes: any[];
  $metadata: {
    tokenSetOrder: string[];
  };
}

const data: JsonData = JSON.parse(
  fs.readFileSync("./data/tokens.json", "utf8")
);

function replaceColorValues(
  obj: TokenSet | Token | string,
  globalColors: TokenSet
): void {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key as keyof typeof obj] === "object") {
      replaceColorValues(
        obj[key as keyof typeof obj] as TokenSet | Token,
        globalColors
      ); // 再帰的に探索
    } else if (
      typeof obj[key] === "string" &&
      obj[key].startsWith("{") &&
      obj[key].endsWith("}")
    ) {
      let colorValue = globalColors;
      let colorRef = obj[key].slice(1, -1).split("."); // "colors.gray.900"
      let colorObj = colorValue[colorRef[1]][colorRef[2]];

      obj[key] = typeof colorObj === "object" ? colorObj.value : colorObj; // 参照の置き換え
    }
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (obj[key].hasOwnProperty("value") && obj[key].hasOwnProperty("type")) {
        obj[key] = obj[key].value; // オブジェクトを値に置き換え
      }
    }
  });
}

replaceColorValues(data.theme.colors, data.global.colors);

export default data;
