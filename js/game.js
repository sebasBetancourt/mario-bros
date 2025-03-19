export const configuration = () => {
    const config = {
        type: Phaser.AUTO,
        width: 256,
        height: 244,
        backgroundColor: '#049cd8',
        parent: 'game',
        scene: {
            preload,
            create,
            update
        }
    }

    new Phaser.Game(config)

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
    }

    

    function create () {

        this.entities = {
            mario: this.add.sprite(50, 210, 'mario')
                .setOrigin(0, 1)
        }

        this.scenary = {
            cloud1: this.add.image(100, 50, 'cloud1')
                .setOrigin(0, 0)
                .setScale(0.15),
            floorbricks: this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks')
                .setOrigin(0, 0)
            
        }


        this.anims.create({
            key: 'mario-walk',
            frames: this.anims.generateFrameNumbers(
                'mario', 
                { start: 3, end: 2 }
                ),
            frameRate: 12,
            repeat: -1
        })

        // this.add.image(50, 200, 'fence')
        // .setOrigin(0, 0)
        // .setScale(0.3)


        this.keys = this.input.keyboard.createCursorKeys()
    }


    function update () {
        if (this.keys.left.isDown) {
            this.entities.mario.anims.play('mario-walk', true)
            this.entities.mario.x -= 2
        }
        else if(this.keys.right.isDown) {
            this.entities.mario.anims.play('mario-walk', true)
            this.entities.mario.x += 2
        }
        else{
            this.entities.mario.anims.stop()
            this.entities.mario.setFrame(0)
            
        }
    }
};