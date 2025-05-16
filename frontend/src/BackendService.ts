// backend-service.ts

export const backendErrorEmitter = new Phaser.Events.EventEmitter();

class BackendService {
    [x: string]: any;
    apiUrl = import.meta.env.VITE_API_BASE_URL;

    private async request(
        endpoint: string, // API 端點 (例如 '/cards', '/enemies')
        method: 'GET' | 'POST' | 'PUT' | 'DELETE'| 'HEAD',
        credentials: any = null, // 憑證作為 body 發送
        bodyData: any = null,    // 實際的請求體數據
        id: any = null          // 可選的 ID 作為 URL 路徑的一部分
    ): Promise<any> {
        let url = `${this.apiUrl}/${endpoint}`;
        if (id) {
            url += `/${id}`; // 將 id 附加到 URL 路徑
        }

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const config: RequestInit = {
            method,
            headers,
            body: ['GET', 'HEAD'].includes(method) ? null :(credentials ? JSON.stringify(credentials) : (bodyData ? JSON.stringify(bodyData) : null)),
        };

        try {
            console.log(url);
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Backend API Error (${method} ${url}):`, errorData.error || response.statusText);
                backendErrorEmitter.emit('backendError', { method: method, url: url, error: errorData.error || response.statusText });
                return null;
            }
            return await response.json(); // 解析並返回 JSON 響應
        } catch (error) {
            console.error(`Fetch Error (${method} ${url}):`, error);
            let errorMessage = 'Network error';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            backendErrorEmitter.emit('backendError', { method: method, url: url, error: errorMessage || 'Network error' });
            return null;
        }
    }

    async login(account: string, password: string): Promise<any> {
        const credentials = { account, password };
        return this.request('auth/login', 'POST', credentials);
    }

    async getcards(_credentials: any=null): Promise<any> {
        return this.request('cards','GET',null,null);
    }

    async getlevelbyid(id: number,_credentials: any=null,): Promise<any> {
        return this.request('game/levels','GET',null,null,id);
    }

    async getenemiebyid(id: number,_credentials: any=null): Promise<any> {
        return this.request('enemies','GET',null,null,id);
    }
}

export default BackendService;