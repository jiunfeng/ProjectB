import healthBar from '@/components/game/scenes/class/healthBar.js';
import phaserJuice from "@/components/game/js/phaserJuice.min.js";

export default function monster(scene, x, y, texture, ratio, hp, cd, attack, attribute) {
    const m = scene.physics.add.image(x, y, texture).setScale(ratio).setBodySize(200, 200).setAlpha(0);;
    const cdText = scene.add.text(m.x + m.displayWidth / 2, m.y - m.displayHeight / 2, cd, { fontFamily: 'Arial Black', fontSize: 16, color: '#000000', stroke: '#dddddd', strokeThickness: 5 }).setAlpha(0);;
    console.log(cdText.text);
    const hpBar = new healthBar(scene, x - m.displayWidth / 2, y + m.displayHeight / 2 + 25, m.displayWidth, 12, 5, hp);
    const juice = new phaserJuice(scene);
    juice.fadeIn(m);
    juice.fadeIn(cdText);
    juice.fadeIn(hpBar);
    let shakeFrame;
    m.attack = false;
    m.getAttack = () => {
        return {
            attribute,
            attack
        };
    }
    m.gethp = () => { return hpBar }
    m.reudceCd = () => {
        cdText.setText(cdText.text - 1);
    }
    m.checkCd = () => {
        if (cdText.text == 0) {
            cdText.setText(cd);
            return true;
        }
        return false;
    };
    m.gotHurt = (value,color) => {
        console.log(color);
        return new Promise(resolve => {
            const y = Phaser.Math.FloatBetween(m.y - m.displayHeight, m.y+m.displayHeight/2)
            let variation
            do {
                variation = Phaser.Math.Between(-30, 30);
            } while (variation >= -20 && variation <= 20);
            const Text = scene.add.text(m.x, y, value, { fontFamily: 'Arial Black', fontSize: 16, color: color, stroke: '#dddddd', strokeThickness: 5 }).setOrigin(0.5);
            juice.bounce(Text);
            scene.tweens.add({
                targets: Text,
                x:x+variation,
                duration: 500,
                ease: 'quad.out',
                callbackScope: this,
                onComplete: () => {
                    Text.destroy();
                },
                completeDelay: 1500
            });

            const lastHp = hpBar.reduceHp(value);
            const percent = lastHp / hpBar.getFullHp();
            if (!shakeFrame || !shakeFrame.shakeTween.isPlaying()) {
                shakeFrame = juice.shake(m);
            }
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
                            cdText.destroy();
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
