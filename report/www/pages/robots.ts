import { MetadataRoute } from 'next';
import dashlordConfig from "@/config.json";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(dashlordConfig.seo ?
        { allow: '/' } :
        { disallow: '/' }
      )
    },
  }
}