import Phaser from "phaser";

document.body.style.margin = '0';

class Initial extends Phaser.Scene {
  timer = 0;
  timerText: Phaser.GameObjects.Text;
  impTime = 10;
  impTimer = this.impTime
  numSouls = +(localStorage.getItem('numSouls') ?? 0);
  numImps = +(localStorage.getItem('numImps') ?? 0);
  counterText: Phaser.GameObjects.Text;
  impCooldownEffect: Phaser.GameObjects.Graphics;

  create() {
    let impCost = () => (this.numImps ** 2) * 10 + 10;

    this.cameras.main.centerOn(0, 0);

    this.add.rectangle(0, 0, 356, 636, 0x00ff00);

    this.timerText = this.add.text(0, -500, this.timer + '');//todo

    this.add
      .rectangle(0, 200, 128, 128, 0xff00ff)
      .setInteractive()
      .on('pointerdown', () => {
        ++this.numSouls;
        this.counterText.text = this.numSouls + '';
        localStorage.setItem('numSouls', this.numSouls + '');
      })
      ;

    this.counterText = this.add.text(0, 200, this.numSouls + '');

    this.add
      .rectangle(-100, -200, 64, 64, 0xff0000)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.numSouls >= impCost()) {
          this.numSouls -= impCost();
          ++this.numImps;
          impText.text = this.numImps + '';
          impCostText.text = '$'+impCost() + '';
          this.counterText.text = this.numSouls + '';
          localStorage.setItem('numImps', this.numImps + '');
        }
      });

    const impCooldownEffectMask = new Phaser.GameObjects.Graphics(this)
      .fillStyle(0, 1)
      .fillRect(-32, -32, 64, 64)
      .setPosition(-100, -200);

    this.impCooldownEffect = this.add
      .graphics()
      .setPosition(-100, -200)
      .setMask(new Phaser.Display.Masks.GeometryMask(this, impCooldownEffectMask))
      ;

    const impText = this.add.text(-100, -200, this.numImps + '');
    const impCostText = this.add.text(-100, -220, '$'+impCost() + '');
  }

  update(time: number, delta: number) {
    this.timer += delta;
    this.timerText.text = this.timer + '';
    this.impTimer -= this.numImps * this.impTime * delta / 1000;

    while (this.impTimer <= 0) {
      this.numSouls++;
      this.impTimer += this.impTime;
      this.counterText.text = this.numSouls + '';
    }


    const elapsed = Math.floor(360 * (this.impTime - this.impTimer) / this.impTime);
    this.impCooldownEffect
      .clear()
      .fillStyle(0x0000ff, .2)
      .moveTo(0, 0)
      .arc(0, 0, 64, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(elapsed - 90), true)
      .fillPath()
      ;
  }
}

const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  mode: Phaser.Scale.FIT,
  scale: { autoCenter: Phaser.Scale.CENTER_BOTH },
  backgroundColor: 0xff00ff,
  scene: Initial,
} as Phaser.Types.Core.GameConfig;

const game = new Phaser.Game(config);