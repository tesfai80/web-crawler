'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css'; 

interface URLData {
  urls: string[];
}

const Home= () => {
  const [url, setUrl] = useState<string>('');
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  async function getUrlFromFile(): Promise<string[]> {
    const response = await fetch('../url.json');
    const data: URLData = await response.json();
    return data.urls;
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value);
  };

  const handleScrape = async (): Promise<void> => {
    setLoading(true);
    const urls = await getUrlFromFile();
    let currentIndex = 0;

    const scrapeUrl = async (url: string): Promise<void> => {
      try {
        const response = await fetch('/api/crawler', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLinks(prevLinks => [...prevLinks, ...(data || [])]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    intervalRef.current = window.setInterval(() => {
      if (currentIndex < urls.length) {
        scrapeUrl(urls[currentIndex]);
        currentIndex++;
      } else {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setLoading(false);
      }
    }, 10000); // Run every 10 seconds

    setLoading(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.icon}>🕸️</span>
        <h1>Web Crawler</h1>
      </div>
      <input
        className={styles.input}
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter URL to scrape"
      />
      <button
        className={styles.button}
        onClick={handleScrape}
        disabled={!url || loading}
      >
        Scrape URL
      </button>
      {loading && <p className={styles.loading}>Loading...</p>}
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li className={styles.listItem} key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
