"use server";

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scrapper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) {
    return;
  }
  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) {
      return;
    }
  } catch (error: any) {
    throw new Error(`Error scraping product: ${error.message}`);
  }
}
