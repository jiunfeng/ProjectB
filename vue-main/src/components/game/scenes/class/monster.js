import healthBar from '@/components/game/scenes/class/healthBar.js';
import phaserJuice from "@/components/game/js/phaserJuice.min.js";

export default function monster(scene, x, y, texture, ratio, hp, cd, attack) {
    const m = scene.physics.add.image(x, y, texture).setScale(ratio).setOrigin(0.5).setBodySize(200, 200);
    const hpBar = new healthBar(scene, x - m.displayWidth / 2, y + m.displayHeight / 2 + 25, m.displayWidth, 12, 5, hp);
    m.gethp = () => { return hpBar }
    m.gotHurt = (value) => {
        return new Promise(resolve => {
            const lastHp = hpBar.reduceHp(value);
            const percent = lastHp / hpBar.getFullHp();

            hpBar.setHpPercentageAnimated(percent).then(result => {
                if (lastHp == 0) {
                    scene.tweens.add({
                        targets: m,
                        alpha: 0.5,
                        duration: 800,
                        ease: 'quad.out',
                        callbackScope: this,
                        onComplete: () => {
                            m.destroy();
                            hpBar.destroy();
                            resolve('monster.js gotHurt完成');
                        },
                    });

                }
                else resolve('monster.js gotHurt完成');
            });
        });

    }
    return m;
}
