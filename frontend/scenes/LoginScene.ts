import Phaser from 'phaser';
import BackendService from '../src/BackendService'; // 確保路徑正確

export default class LoginScene extends Phaser.Scene {
    private accountInput: Phaser.GameObjects.DOMElement | undefined;
    private passwordInput: Phaser.GameObjects.DOMElement | undefined;
    private backendService: BackendService;
    private errorText: Phaser.GameObjects.Text | undefined;

    constructor() {
        super('LoginScene');
        this.backendService = new BackendService();
    }

    preload() {
        // 載入需要的資源，例如背景圖片、按鈕圖片等
        this.load.image('background', 'img/gameBackground.png'); // 替換成你的背景圖片路徑
        this.load.image('loginButton', 'img/player.png'); // 替換成你的登入按鈕圖片路徑
    }

    create() {
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        // 添加背景
        this.add.image(gameWidth / 2, gameHeight / 2, 'background').setDisplaySize(gameWidth, gameHeight);

        // 標題文字
        this.add.text(gameWidth / 2, gameHeight * 0.2, '登入遊戲', {
            fontSize: '48px',
            color: '#fff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // 帳號輸入框
        this.accountInput = this.add.dom(gameWidth / 2, gameHeight * 0.4, 'input', 'width: 300px; padding: 10px; font-size: 20px; background-color: #f0f0f0;', '帳號').setOrigin(0.5);
        (this.accountInput.node as HTMLInputElement).placeholder = '帳號';

        // 密碼輸入框
        this.passwordInput = this.add.dom(gameWidth / 2, gameHeight * 0.5, 'input', 'width: 300px; padding: 10px; font-size: 20px; background-color: #f0f0f0; type: password;', '密碼').setOrigin(0.5);
        (this.passwordInput.node as HTMLInputElement).placeholder = '密碼';

        // 登入按鈕 
        const loginButton = this.add.image(gameWidth / 2, gameHeight * 0.65, 'loginButton').setInteractive().setOrigin(0.5).setDisplaySize(gameWidth / 10,gameHeight/20);

        // 登入按鈕的點擊事件 (直接綁定到 loginButton)
        loginButton.on('pointerdown', () => {
            this.handleLogin();
        });

        // 監聽 Enter 鍵按下事件，觸發登入
        this.input!.keyboard!.on('keydown-ENTER', () => {
            this.handleLogin();
        });
    }

    private async handleLogin() {
        const account = (this.accountInput?.node as HTMLInputElement)?.value;
        const password = (this.passwordInput?.node as HTMLInputElement)?.value;

        if (!account || !password) {
            this.displayLoginError('請輸入帳號和密碼');
            return;
        }

        console.log('嘗試登入:', account, password);
        await this.sendLoginRequest(account, password);
    }

    private async sendLoginRequest(account: string, password: string) {
        try {
            const response = await this.backendService.login(account, password);

            if (response && response.success) {
                console.log('登入成功:', response);
                this.game.registry.set('authToken', response.token);
                // 儲存使用者憑證 (Session ID 或 JWT - 根據你的後端實作)
                // 切換到遊戲主場景
                this.scene.start('MainScene'); // 替換成你的主要遊戲場景名稱
            } else {
                console.log('登入失敗:', response ? response.error : '連線錯誤');
                // 顯示登入失敗的訊息給使用者
                this.displayLoginError(response ? response.error : '無法連線到伺服器');
            }
        } catch (error) {
            console.error('登入請求錯誤:', error);
            this.displayLoginError('發生未知的錯誤');
        }
    }

    private displayLoginError(errorMessage: string) {
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        if (this.errorText) {
            this.errorText.setText(`登入失敗: ${errorMessage}`);
        } else {
            this.errorText = this.add.text(gameWidth / 2, gameHeight * 0.75, `登入失敗: ${errorMessage}`, {
                fontSize: '20px',
                color: '#f00',
                align: 'center'
            }).setOrigin(0.5);
        }

        // 錯誤訊息顯示一段時間後消失 (可選)
        this.time.delayedCall(3000, () => {
            if (this.errorText) {
                this.errorText.destroy();
                this.errorText = undefined;
            }
        });
    }
}