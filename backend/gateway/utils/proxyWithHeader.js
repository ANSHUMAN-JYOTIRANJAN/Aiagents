import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, reqsrc) => {
      const userId = reqsrc.user?.userId || reqsrc.headers?.["x-user-id"];
      if (userId) {
        proxyReqOpts.headers["x-user-id"] = userId;
      }
      return proxyReqOpts;
    },
  });
};
