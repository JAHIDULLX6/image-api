/**
 * ============================================
 *  Coded with ➲ by SAGOR
 * ============================================
 */

module.exports = (req, res) => {

  const API_KEY = "sagor";

  // Root API
  if (req.url === "/") {
    return res.status(200).json({
      status: "success",
      author: "SAGOR"
    });
  }

  // SAGOR endpoint
  if (req.url.startsWith("/sagor")) {

    const { q, limit, apikey } = req.query;

    let amount = parseInt(limit) || 4;

    if (apikey !== API_KEY) {
      return res.status(403).json({
        status: "error",
        author: "SAGOR",
        message: "Invalid API key"
      });
    }

    if (!q) {
      return res.status(400).json({
        status: "error",
        author: "SAGOR",
        message: "Missing parameter: q"
      });
    }

    if (amount > 50) amount = 50;
    if (amount < 1) amount = 1;

    const images = [];

    for (let i = 0; i < amount; i++) {
      images.push(`https://source.unsplash.com/600x600/?${encodeURIComponent(q)}&sig=${i}`);
    }

    return res.status(200).json({
      status: "success",
      author: "SAGOR",
      total: images.length,
      data: images
    });

  }

  // Unknown route
  res.status(404).json({
    status: "error",
    message: "Endpoint not found"
  });

};
