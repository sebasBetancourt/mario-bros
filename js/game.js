import { createAnimations } from "./animations.js";
import { showMenuGameOver } from "./gameOver.js";


let screenWidth = window.innerWidth
let screenHeight = window.innerHeight

export const configuration = () => {
    const config = {
        type: Phaser.AUTO,
        width: screenWidth,
        height: screenHeight,
        scale: {
            mode: Phaser.Scale.RESIZE, // Hace que el canvas cambie con la pantalla
            autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el juego
        },
        backgroundColor: '#049cd8',
        parent: 'game',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: false
            }
        },
        scene: {
            preload,
            create,
            update
        }
    }

    const game = new Phaser.Game(config)

    function preload () {
        this.load.image(
            'cloud1',
            './assets/scenery/overworld/cloud1.png'
        )


        this.load.image(
            'floorbricks',
            './assets/scenery/overworld/floorbricks.png'
        )
        // this.load.image(
        //     'fence',
        //     './assets/scenery/overworld/fence.png'
        // )

        this.load.spritesheet(
            'mario',
            './assets/entities/mario.png',
            { frameWidth: 18, frameHeight: 16 }
        )
        this.load.audio('gameover', './assets/sound/music/gameover.mp3')
    }

    

    function create () {

        this.entities = {
            mario: this.physics.add.sprite(50, 100, 'mario')
                        .setOrigin(0, 1)
                        .setCollideWorldBounds(true)
                        .setGravityY(500)
                        
                        
            // this.add.sprite(50, 210, 'mario')
            //     .setOrigin(0, 1)
        }

        this.add.image((config.width / 2), config.height / 2, 'cloud1')
            .setOrigin(0, 0)
            .setScale(0.3)

        
        this.floor = this.physics.add.staticGroup()
        
        this.floor
            .create(0, config.height / 1.04, 'floorbricks')
            .setOrigin(0, 0.5)
            .refreshBody()


        this.floor
            .create(100, config.height / 1.04, 'floorbricks')
            .setOrigin(0, 0.5)
            .refreshBody()

        this.floor
            .create(290, config.height / 1.04, 'floorbricks')
            .setOrigin(0, 0.5)
            .refreshBody()

        this.physics.world.setBounds(0, 0, 2000, config.height)
        this.physics.add.collider(this.entities.mario, this.floor)

        this.cameras.main.setBounds(0, 0, 2000, config.height)
        this.cameras.main.startFollow(this.entities.mario)


        createAnimations(this)

        // this.add.image(50, 200, 'fence')
        // .setOrigin(0, 0)
        // .setScale(0.3)



        this.keys = this.input.keyboard.createCursorKeys()
    }


    function update() {
        if (this.entities.mario.isDead) {
            return;
        }
    
        if (this.keys.left.isDown) {
            this.entities.mario.anims.play('mario-walk', true);
            this.entities.mario.x -= 2;
            this.entities.mario.flipX = true;
        } else if (this.keys.right.isDown) {
            this.entities.mario.anims.play('mario-walk', true);
            this.entities.mario.x += 2;
            this.entities.mario.flipX = false;
        } else {
            this.entities.mario.anims.play('mario-idle', true);
        }
    
        if (this.keys.up.isDown && this.entities.mario.body.touching.down) {
            this.entities.mario.setVelocityY(-300);
            this.entities.mario.anims.play('mario-jump', true);
        }
    
        if (this.entities.mario.y >= config.height) {
            this.entities.mario.isDead = true;
            this.entities.mario.anims.play('mario-dead');
            this.entities.mario.setCollideWorldBounds(false);
            this.sound.add('gameover', { volume: 2 }).play();
    
            setTimeout(() => {
                this.entities.mario.setVelocityY(-400);
            }, 100);
    
            // setTimeout(() => {
            //     this.entities.mario.setVelocityY(0);
            // }, 2000);
    
            setTimeout(() => {
                showMenuGameOver(this);
            }, 3000);
        }
    }
    
};