export function injectVKOpenApi() {
  return new Promise((resolve, reject) => {
    try {
      const fjs = document.getElementsByTagName("script")[0];
      if (document.getElementById("vk_openapi_js")) {
        resolve();
        return;
      }
      const js = document.createElement("script");
      js.id = "vk_openapi_js";
      js.src = "//vk.com/js/api/openapi.js?162";
      js.onload = resolve;
      js.onerror = reject;

      fjs.parentNode.insertBefore(js, fjs);
    } catch (err) {
      reject(err);
    }
  });
}

export const initVK = () => () =>
  VK.init({ apiId: process.env.VUE_APP_VK_APP_ID });

export const initCallVK = () =>
  new Promise((resolve, reject) => {
    try {
      window.name = "fXD";
      VK.init(resolve);
    } catch (err) {
      reject(err);
    }
  })