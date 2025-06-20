// @ts-nocheck
import { readFileSync } from 'fs';
import path from 'path';

export default function Home() {
  // HTML files are stored in the parent directory
  const filePath = path.join(process.cwd(), '..', 'index.html');
  const html = readFileSync(filePath, 'utf8');
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
