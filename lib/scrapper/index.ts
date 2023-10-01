import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAmazonProduct(productUrl: string) {
  if (!productUrl) {
    return;
  }
  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = Math.floor(Math.random() * 1000000) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(productUrl, options);
    const $ = cheerio.load(response.data);

    // Extract product title
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice();
  } catch (error: any) {
    throw new Error(`Error scraping product: ${error.message}`);
  }
}
