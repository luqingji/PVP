import Phaser from 'phaser';

export default class BattleScene extends Phaser.Scene {
  private ally!: Phaser.GameObjects.Rectangle;
  private enemy!: Phaser.GameObjects.Rectangle;
  private allyHp = 100;
  private enemyHp = 100;
  private allyHpText!: Phaser.GameObjects.Text;
  private enemyHpText!: Phaser.GameObjects.Text;
  private turnText!: Phaser.GameObjects.Text;
  private canAct = false;

  constructor() {
    super('BattleScene');
  }

  create() {
    this.canAct = false;

    this.add.rectangle(400, 250, 800, 500, 0x1a1a2e);

    this.ally = this.add.rectangle(200, 250, 60, 60, 0x00ff88);
    this.enemy = this.add.rectangle(600, 250, 60, 60, 0xff5555);

    this.allyHpText = this.add.text(150, 180, `HP: ${this.allyHp}`, { color: '#fff' });
    this.enemyHpText = this.add.text(550, 180, `HP: ${this.enemyHp}`, { color: '#fff' });

    this.turnText = this.add.text(300, 400, '', { color: '#ffcc00', fontSize: 24 });

    const attackBtn = this.add.text(300, 450, '攻击', { backgroundColor: '#444', padding: 8 })
      .setInteractive({ useHandCursor: true });
    const healBtn = this.add.text(450, 450, '治疗', { backgroundColor: '#444', padding: 8 })
      .setInteractive({ useHandCursor: true });

    attackBtn.on('pointerup', () => this.executeTurn('attack'));
    healBtn.on('pointerup', () => this.executeTurn('heal'));

    this.canAct = true;
    this.updateDisplay();
  }

  private async executeTurn(action: 'attack' | 'heal') {
    if (!this.canAct) return;
    this.canAct = false;

    if (action === 'attack') {
      const damage = Phaser.Math.Between(15, 25);
      this.enemyHp = Math.max(0, this.enemyHp - damage);
      this.showMessage(`我方攻击造成 ${damage} 伤害！`);

      this.tweens.add({
        targets: this.enemy,
        x: this.enemy.x + 10,
        duration: 50,
        yoyo: true,
        repeat: 3,
      });
    } else if (action === 'heal') {
      const heal = Phaser.Math.Between(10, 20);
      this.allyHp = Math.min(100, this.allyHp + heal);
      this.showMessage(`治疗回复 ${heal} HP！`);
    }

    this.updateDisplay();

    if (this.enemyHp <= 0) {
      this.showMessage('你赢了！');
      this.canAct = false;
      return;
    }

    await this.delay(1000);
    const enemyAction = Math.random() > 0.5 ? 'attack' : 'heal';
    if (enemyAction === 'attack') {
      const dmg = Phaser.Math.Between(10, 20);
      this.allyHp = Math.max(0, this.allyHp - dmg);
      this.showMessage(`敌方攻击造成 ${dmg} 伤害！`);
      this.tweens.add({
        targets: this.ally,
        x: this.ally.x + 10,
        duration: 50,
        yoyo: true,
        repeat: 3,
      });
    } else {
      const heal = Phaser.Math.Between(10, 20);
      this.enemyHp = Math.min(100, this.enemyHp + heal);
      this.showMessage(`敌方治疗 ${heal} HP！`);
    }

    this.updateDisplay();

    if (this.allyHp <= 0) {
      this.showMessage('你输了...');
      return;
    }

    this.canAct = true;
  }

  private updateDisplay() {
    this.allyHpText.setText(`HP: ${this.allyHp}`);
    this.enemyHpText.setText(`HP: ${this.enemyHp}`);
  }

  private showMessage(msg: string) {
    this.turnText.setText(msg);
  }

  private delay(ms: number) {
    return new Promise(resolve => this.time.delayedCall(ms, resolve));
  }
}
