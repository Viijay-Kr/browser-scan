declare module "doiuse" {
  export default function doiuse(opts: any): {
    info(opts: {}): {
      browsers: string[][];
      features: string[][];
    };
    postcss(css: any, result: any): any;
  };
}

declare module "doiuse/lib/browsers" {
  export default class BrowserSelection {
    constructor(query: string);
    list(): Array<string>;
  }
}
