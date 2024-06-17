import fs from 'fs';
import axios from 'axios';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(".env") });
const baseUrl = process.env.RENDER_FRONTEND_URL;
const backendUrl = process.env.RENDER_BACKEND_URL;

const fetchPostIds = async () => {
  try {
    const response = await axios.get(`${backendUrl}/posts`);
    const postIds = response.data.data.map(post => post.id);
    return postIds;
  } catch (error) {
    console.error('Error fetching post IDs:', error);
    return [];
  }
};

const createSitemap = async () => {
  const postIds = await fetchPostIds();
  const staticRoutes = [
    { path: '/', title: 'Home Page' },
    { path: '/contact-us', title: 'Contact Us' },
    { path: '/affiliate-disclosure', title: 'Affiliate Disclosure' },
    { path: '/privacy-policy', title: 'Privacy Policy' },
    { path: '/terms-and-conditions', title: 'Terms & Conditions' },
    { path: '/disclaimer', title: 'Disclaimer' },
    { path: '/page-not-found', title: '404 Not Found' },
    { path: '/*', title: '404 Not Found' }
  ];

  const urls = [
    ...staticRoutes.map(route => `
      <url>
        <loc>${baseUrl}${route.path}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>`),
    ...postIds.map(id => `
      <url>
        <loc>${baseUrl}/${id}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>`)
  ].join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;
};

const generateSitemap = async () => {
  const sitemapXml = await createSitemap();
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  console.log('Sitemap generated at public/sitemap.xml');
};



export default generateSitemap;
