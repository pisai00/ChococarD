import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private health: number;
    private maxHealth: number;
    private size: number = 150;
    private healthBarContainer: Phaser.GameObjects.Container;
    private healthBar!: Phaser.GameObjects.Graphics;
    private healthText!: Phaser.GameObjects.Text;
    private barHeight: number = 10;
    private textOffsetY: number = 5;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, size: number, MaxHealth: number, Health: number) {
        super(scene, x + size / 2, y - size / 2, texture); // Phaser.GameObjects.Sprite

        this.maxHealth = MaxHealth;
        this.health = Health;
        this.scaleX = size / this.width;
        this.scaleY = size / this.height;
        this.size = size;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.healthBarContainer = this.createHealthBar();

        this.setImmovable(true);
        if (this.body) {
            this.body.setSize(size, size);
        } else {
            console.error('Player body is null!');
        }

        this.on('healthChanged', this.updateHealthBarDisplay, this);
    }

    private createHealthBar(): Phaser.GameObjects.Container {
        const container = this.scene.add.container(this.x - this.size / 2, this.y + this.size / 2 + 10);
        this.healthBar = this.scene.add.graphics();
        this.drawHealthBar(this.healthBar);

        container.add(this.healthBar);
        container.add(this.healthText);
        this.scene.add.existing(container);
        return container;
    }

    drawHealthBar(bar: Phaser.GameObjects.Graphics) {
        bar.clear();
        // 繪製底色（深灰色）
        bar.fillStyle(0x444444);
        bar.fillRect(0, 0, this.size, this.barHeight);

        // 繪製血量（紅色）
        bar.fillStyle(0xff0000);
        const healthPercentage = this.health / this.maxHealth;
        bar.fillRect(0, 0, this.size * healthPercentage, this.barHeight);
        this.healthText = this.scene.add.text(this.size / 2, this.barHeight / 2 + this.textOffsetY, `${this.health}/${this.maxHealth}`, {
            fontSize: '20px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0);
    }

    takeDamage(amount: number): void {
        this.health -= amount;
        this.emit('healthChanged', this.health); // 血量改變事件
        if (this.health <= 0) {
            this.emit('playerDeath');
            this.healthBarContainer.destroy();
            this.destroy();
        }
    }

    updateHealthBarDisplay(): void {
        this.drawHealthBar(this.healthBar);
        this.healthText.setText(`${this.health}/${this.maxHealth}`);
        this.healthBarContainer.setPosition(this.x - this.size / 2, this.y + this.size / 2 + 10);
    }

    getHealth(): number {
        return this.health;
    }

    update(): void {
    }
}