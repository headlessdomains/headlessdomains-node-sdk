# Headless Domains Node.js SDK

Official Node.js / TypeScript SDK for interacting with [Headless Domains](https://headlessdomains.com).

## Installation

```bash
npm install headlessdomains-sdk
```

## Usage

```typescript
import { HeadlessDomainsClient } from 'headlessdomains-sdk';

const client = new HeadlessDomainsClient({
    apiKey: 'your_api_key_here'
});

async function main() {
    // 1. Search for a domain
    const searchResult = await client.searchDomain('myagent');
    console.log(searchResult);

    // 2. Lookup an existing domain
    const whois = await client.lookupDomain('janice.agent');
    console.log(whois);
}

main();
```