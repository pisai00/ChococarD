// backend-service.ts


class BackendService {
    apiUrl = import.meta.env.VITE_API_BASE_URL;

    async getcards(credentials: any): Promise<any> {
        const response = await fetch(`${this.apiUrl}/cards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return response.json();
    }

    async getlevelbyid(credentials: any,level_id: number): Promise<any> {
        const response = await fetch(`${this.apiUrl}/levels/${level_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return response.json();
    }

    async getenemiebyid(credentials: any,enemie_id: number): Promise<any> {
        const response = await fetch(`${this.apiUrl}/enemies/${enemie_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return response.json();
    }
}

export default BackendService;