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

        this.load.spritesheet(
            'mario',
            './assets/entities/mario.png',
            { frameWidth: 18, frameHeight: 16 }
        )
    }

    

    function create () {
        this.add.image(100, 50, 'cloud1')
            .setOrigin(0, 0)
            .setScale(0.15)

        this.add.tileSprite(0, config.height, config.width, 32, 'floorbricks')

        this.add.sprite(50, 200, 'mario')
            .setOrigin(0, 1)
    }
    function update () {
        
    }
};