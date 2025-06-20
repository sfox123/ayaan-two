// @ts-nocheck
import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

function loadHtml(slug: string) {
  // HTML files live in the project root one directory above this app
  const filePath = path.join(process.cwd(), '..', `${slug}.html`);
  try {
    let html = readFileSync(filePath, 'utf8');
    // strip script tags that use jquery
    html = html.replace(/<script[^>]*jquery[^>]*><\/script>/g, '');
    return html;
  } catch (e) {
    return null;
  }
}

export default function Page({ params }: any) {
  const slug = params.slug || 'index';
  const html = loadHtml(slug);
  if (!html) return notFound();
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function generateStaticParams() {
  const files = readdirSync(path.join(process.cwd(), '..'));
  return files
    .filter((f) => f.endsWith('.html') && f !== 'index.html')
    .map((f) => ({ slug: f.replace(/\.html$/, '') }));
}

export const dynamicParams = false;
