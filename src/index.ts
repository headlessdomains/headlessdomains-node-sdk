import axios, { AxiosInstance } from 'axios';

export interface HeadlessDomainsConfig {
    apiKey?: string;
    baseUrl?: string;
}

export class HeadlessDomainsClient {
    private client: AxiosInstance;

    constructor(config?: HeadlessDomainsConfig) {
        this.client = axios.create({
            baseURL: config?.baseUrl || 'https://headlessdomains.com/api/v1',
            headers: {
                'Content-Type': 'application/json',
                ...(config?.apiKey ? { 'X-API-Key': config.apiKey } : {})
            }
        });
    }

    /**
     * Search for domain availability
     */
    async searchDomain(query: string) {
        try {
            const response = await this.client.get(`/domains/search`, { params: { q: query } });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    /**
     * Lookup an existing agent domain (WHOIS)
     */
    async lookupDomain(domainName: string) {
        try {
            const response = await this.client.get(`/lookup/${domainName}`);
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    /**
     * Register a new agent domain
     */
    async registerDomain(domainName: string, years: number = 1, paymentMethod: string = 'gems') {
        try {
            const response = await this.client.post(`/domains/register`, {
                domain_name: domainName,
                years: years,
                payment_method: paymentMethod
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    private handleError(error: any): never {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(`Headless Domains API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        }
        throw error;
    }
}