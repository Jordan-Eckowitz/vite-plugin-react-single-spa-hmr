import { Plugin, ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";

/** single-spa entry points (can be either a single entry point or an array of entry points) */
type EntryPoints = string | string[];

/** this ensures that React Fast Refresh (HMR) is properly setup in the development environment. See here for more details: https://github.com/WJSoftware/vite-plugin-single-spa/issues/74#issuecomment-2315823945 */
const vitePluginReactHMR = (entryPoints: EntryPoints): Plugin => {
  // placeholder base value (set by configResolved)
  let base = "";
  // convert entryPoints to an array if it's not already
  const _entryPoints = Array.isArray(entryPoints) ? entryPoints : [entryPoints];
  return {
    name: "vite-plugin-single-spa-react-hmr",
    configResolved(resolvedConfig: ResolvedConfig) {
      base = resolvedConfig.base;
    },
    transform(code, id) {
      if (_entryPoints.some((entryPoint) => id.includes(entryPoint))) {
        return react.preambleCode.replace("__BASE__", base) + code;
      }
    },
  };
};

export default vitePluginReactHMR;
