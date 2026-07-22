import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, reqsrc) => {
      if (reqsrc.user) {
        proxyReqOpts.headers["x-user-id"] = reqsrc.user.userId;
      }
    },
  });
};
