/**
 * Timer middleware
 *
 */
export default ({ method, originalUrl, statusCode }, res) => {
  const start = Date.now();
  const bytesReceived = 0;
  const bytesSent = 0;

  req.on("data", (chunk) => {
    bytesReceived += chunk.length;
  });

  const originalSend = res.send;
  res.send = function (body) {
    if (body) {
      bytesSent += Buffer.byteLength(body, "utf8");
    }
    originalSend.call(this, body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;

    process.send({
      type: "httpRequest",
      value: {
        method,
        originalUrl,
        statusCode,
        duration,
        receivedAt: new Date().toISOString(),
        bytesReceived,
        bytesSent
      },
    });
  });

  next();
};

const metricasMiddleware = (req, res, next) => {
  req.on("data", (chunk) => {
    totalBytesReceived += chunk.length;
  });

  // const originalSend = res.send;
  // res.send = function (body) {
  //   if (body) {
  //     totalBytesSent += Buffer.byteLength(body, "utf8");
  //   }
  //   originalSend.call(this, body);
  // };

  next();
};
