import type { MetadataRoute } from "next";

const SITE_URL = "https://www.acapulcopadeltour.com";
const ROUTES = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
