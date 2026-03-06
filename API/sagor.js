/**
 * ============================================
 *  Coded with ➲ by SAGOR
 *  Author: SAGOR
 *  Image Search API (1-50)
 * ============================================
 */

export default async function handler(req, res) {

  const API_KEY = "sagor";

  try {

    const { q, apikey, limit } = req.query;

    let amount = parseInt(limit) || 4;

    if (!apikey || apikey !== API_KEY) {
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

    res.status(200).json({
      status: "success",
      author: "SAGOR",
      total: images.length,
      data: images
    });

  } catch (error) {

    res.status(500).json({
      status: "error",
      author: "SAGOR",
      message: "API failed",
      error: error.message
    });

  }

}
