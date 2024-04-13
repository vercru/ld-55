import Phaser from "phaser";

document.body.style.margin = '0';

class Initial extends Phaser.Scene {
  create() {
    let counter = 0;

    this.cameras.main.centerOn(0, 0);

    this.add.rectangle(0, 0, 356, 636, 0x00ff00);

    const counterText = this.add.text(0, 0, counter+'');

    this.add
      .rectangle(0, 200, 128, 128, 0xff00ff)
      .setInteractive()
      .on('pointerdown', () => {
        ++counter;
        counterText.text = counter+'';
      })
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