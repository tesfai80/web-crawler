import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';

interface ScrapeResponse {
  links: string[];
}

interface RequestBody {
  url: string;
}

async function fetchHTML(url: string): Promise<string> {
  const { data } = await axios.get<string>(url);
  return data;
}

async function parseHTML(html: string): Promise<string[]> {
  const $ = cheerio.load(html);
  let links: string[] = [];
  $('a').each((index, element) => {
    links.push($(element).attr('href') ?? '');
  });
  return links;
}

export async function POST(req: Request) {
  try {
   
    const { url }:Links = await req.json();
    if (!url) {
      return NextResponse.json({ error: "url is required" });
    }
    const html = await fetchHTML(url);
    const links = await parseHTML(html);
    return NextResponse.json(links);
  } catch (error) {
    console.error(`Error fetching data:`, error);
    return NextResponse.json({ error: 'Error fetching data' });
  }
}


