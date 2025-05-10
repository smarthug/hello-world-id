import { onRequestOptions as __verify_js_onRequestOptions } from "C:\\Users\\note\\Desktop\\2505\\hello-world-id\\functions\\verify.js"
import { onRequestPost as __verify_js_onRequestPost } from "C:\\Users\\note\\Desktop\\2505\\hello-world-id\\functions\\verify.js"
import { onRequest as __helloworld_js_onRequest } from "C:\\Users\\note\\Desktop\\2505\\hello-world-id\\functions\\helloworld.js"

export const routes = [
    {
      routePath: "/verify",
      mountPath: "/",
      method: "OPTIONS",
      middlewares: [],
      modules: [__verify_js_onRequestOptions],
    },
  {
      routePath: "/verify",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__verify_js_onRequestPost],
    },
  {
      routePath: "/helloworld",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__helloworld_js_onRequest],
    },
  ]