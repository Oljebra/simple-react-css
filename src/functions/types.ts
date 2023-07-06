import type * as CSS from "csstype";

export interface CSSObject {
  [key: string]: CSS.Properties | CSSObject;
}
