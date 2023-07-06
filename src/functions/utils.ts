export const lazyLoadFromCDN = (src: string, callback: Function) => {
  const script = document.createElement("script");
  script.setAttribute("src", src);
  //   script.setAttribute("type", "module");
  script.addEventListener("load", () => callback());
  document.head.appendChild(script);
};
