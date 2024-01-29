
# Next.js Web Scraping Application

## Overview
This Next.js application is specifically designed for web scraping operations. Utilizing server-side API routes, it effectively bypasses CORS restrictions, enabling efficient scraping of content from external websites.

## Features
- Web scraping capabilities powered by Cheerio and Axios.
- Server-side API routes implemented in Next.js for handling requests.
- A user-friendly client-side interface to interact with the scraping service.

## Prerequisites
- Node.js (Install from [Node.js official website](https://nodejs.org/))
- npm (usually comes with Node.js) or Yarn (Install from [Yarn official website](https://yarnpkg.com/))

## Installation
To set up this project, follow these steps:
1. Clone the repository using:
   ```bash
   git clone <repository-url>
   ```
   Replace `<repository-url>` with the URL of this repository.

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
   Replace `<project-directory>` with the name of the project directory.

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application
To run the application in development mode, follow these steps:
1. Execute the following command in your terminal:
   ```bash
   npm run dev
   ```
2. Open a web browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage
1. On the homepage, enter a URL in the provided input field.
2. Click the 'Scrape URL' button to start the scraping process.
3. The application will then display a list of links extracted from the specified URL.

## API Endpoint
The scraping functionality is accessible through a server-side API endpoint:
```
GET /api/scrape?url=<URL_TO_SCRAPE>
```
Replace `<URL_TO_SCRAPE>` with your target URL. The endpoint returns a JSON response containing the scraped links.

## Contributing
Contributions are welcome! Please follow this workflow:
1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License
This project is open-sourced under the MIT License. See the LICENSE file for more details.

## Contact
 For any inquiries or suggestions regarding this project, please contact me at [My GitHub Profile](https://github.com/tesfai80).

