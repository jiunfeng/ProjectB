import Phaser from 'phaser'
import { useUserInfoStore } from "@/stores/userInfo";
const userStore = useUserInfoStore();
export default class OverGame extends Phaser.Scene {
    constructor() {
        super({ key: 'OverGame' })//場景命名
    }
    init() {
    }
    preload() {
        
    }
    create() {
        console.log(this);        
        this.backgroundImg = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, this.game.config.width, this.game.config.height, 0x999999).setOrigin(0.5).setAlpha(0.8).setVisible(false);
        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0x0B346E,0.9);
        
        //  32px radius on the corners
        const [centerX, centerY] = [
            this.game.config.width / 2,
            this.game.config.height / 2
        ];
        const [width, height] = [
            300,
            180
        ]
        this.dialog = this.graphics.fillRoundedRect(centerX - width / 2, centerY - height / 2, width, height, 32).setVisible(false);

        this.title=this.add.text(centerX, centerY - height / 2.5, '獲勝', { fontFamily: 'Arial Black', fontSize: 28, color: '#000000', stroke: '#dddddd', strokeThickness: 5 }).setOrigin(0.5, 0).setVisible(false);

        this.button=this.add.rexRoundRectangleCanvas(centerX, centerY+height/2.5,120,50, 5, 0x73d544, 0x000000, 0, 0x1Ba93E, false).setOrigin(0.5,1).setVisible(false);
        this.buttonText=this.add.text(this.button.x,this.button.y-this.button.displayHeight/2,'確認', { fontFamily: 'Arial Black', fontSize: 22, color: '#000000', stroke: '#dddddd', strokeThickness: 5 }).setOrigin(0.5).setVisible(false);
        console.log(this.button)
        this.button.setInteractive();//將此遊戲物件傳遞給輸入管理器以啟用它的輸入。 

        const buttonEffect = this.button.preFX.addGlow(0xcccccc, 1, 1, false).setActive(false);
        const buttonEffect2= this.button.preFX.addColorMatrix();
        buttonEffect2.brightness(0.8, false);
        buttonEffect2.active=false;
        const scene=this;
        let click=false;
        this.button.on('pointerover', function () {
            buttonEffect.setActive(true);
            scene.input.setDefaultCursor('url(sprites/pointer2.png), pointer');
            
        });
    
        this.button.on('pointerout', function () {
            buttonEffect.setActive(false);
            scene.input.setDefaultCursor('auto');
            buttonEffect2.active=false
            click=false;
        });
        
        this.button.on('pointerdown', function () {
            click=true;
            buttonEffect2.active=true;
        });
        this.button.on('pointerup', function () {
            if(click){
                userStore.currentPage='main'
            }
        });
    }
    show(state) {
        this.backgroundImg.visible=true;
        this.dialog.visible=true;
        this.title.visible=true;
        this.button.visible=true;
        this.buttonText.visible=true;
        if (state) {
            this.title.setText('!!勝利!!');
        }
        else {
            this.title.setText('~~失敗~~');            
        }
    }
}