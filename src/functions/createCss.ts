// import * as sass from "sass";
import { CSSObject } from "./types";
import { lazyLoadFromCDN } from "./utils";
import Sass from "../utils/sass.js";
import SassWorker from "../utils/sass.worker.js";
// const sass = require("sass");

class createCss {
  private style;
  private sass;

  constructor() {
    this.style = document.createElement("style");
    document.head.appendChild(this.style);

    // lazyLoadFromCDN("https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.9.2/sass.min.js", () => {
    //   this.sass = new Sass("https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.9.2/sass.worker.js");
    // });
    this.sass = new Sass(SassWorker);
    console.log(this.sass);
  }

  generateCss(title: string, cssObject: CSSObject) {
    let responseString = `${title}{`;
    for (const [key, value] of Object.entries(cssObject)) {
      if (typeof value !== "object") {
        responseString += `${key} : ${value};`;
      } else {
        responseString += this.generateCss(key, value as CSSObject);
      }
    }
    return responseString + "}";
  }

  //   styled(tag: any) {
  //     return function styledTemplate(rules: any) {
  //       return function Component(props: any) {
  //         // remember that tagged template literals give us the string parts as an
  //         // array so for now we just pass the first element of the array which will
  //         // be the entire CSS rule because we aren't passing any variables.
  //         const className = this.generateCss(rules[0]);
  //         return React.createElement(tag, { className, ...props });
  //       };
  //     };
  //   }
  css(cssObject: CSSObject) {
    for (const [key, value] of Object.entries(cssObject)) {
      const sassString = this.generateCss(key, value as CSSObject);
      console.log(sassString);
      console.log(this.sass);
      this.sass.compile(sassString, (result: any) => {
        console.log({ result });
      });
      const string = `
h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}`;
      // const cssString = await sass.compileStringAsync(string);
      // console.log(cssString.css);

      // const result = sass.compileString(`
      //   h1 {
      //     font-size: 40px;
      //     code {
      //       font-face: Roboto Mono;
      //     }
      //   }`);
      // console.log(result.css);
    }
  }
}

export default new createCss();
