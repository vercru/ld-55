import Phaser from "phaser";

document.body.style.margin = '0';

class Initial extends Phaser.Scene {
    create() {
        this.add.rectangle(180, 320, 356, 636, 0x00ff00);
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