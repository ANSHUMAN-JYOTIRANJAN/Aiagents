import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, reqsrc) => {
      if (reqsrc) {
        proxyReqOpts.headers["x-user-id"] = reqsrc.user.userId;

        proxyReqOpts.headers["x-user-email"] = reqsrc.user.email;
        proxyReqOpts.headers["x-user-avatar"] = reqsrc.user.avatar;
      }
      return proxyReqOpts;
    },
  });
};
