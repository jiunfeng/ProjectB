import healthBar from '@/components/game/scenes/class/healthBar.js';
import phaserJuice from "@/components/game/js/phaserJuice.min.js";
export default class monster {
    #scene
    #hpBar
    constructor(scene, x, y, image, sizeRatio) {
        this.#scene=scene;
        this.monster =scene.physics.add.image(x, y, image).setOrigin(0.5).setScale(sizeRatio).setBodySize(200,200);
        this.#hpBar= new healthBar(scene, x-this.monster.displayWidth/2, y+this.monster.displayHeight/2+25, this.monster.displayWidth, 12, 5, 300);
        // this.#hpBar.shake(new phaserJuice(this.#scene));
        return this.monster;
    }
}
