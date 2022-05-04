import * as PIXI from 'pixi.js'
import * as projection from 'pixi-projection'

export default async () => {
  const app = new PIXI.Application({
    width: 500, height: 500, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
  })
  const stage = app.stage
  const loader = app.loader
  document.getElementById('game').appendChild(app.view)
  
  const targetContainer = new PIXI.Container()
  const container = new PIXI.Container()
  stage.addChild(container)
  stage.addChild(targetContainer)

  loader.add([
    {
      name: 'logo',
      url: 'src/assets/logo.png',
    },
    {
      name: 'bunny',
      url: 'src/assets/bunny.png',
    },
  ])
  loader.load((loader, resources) => {
    const a = new PIXI.Sprite(resources["logo"].texture)
    a.anchor.set(0.5)
    a.scale.set(0.2)
    
    const b = new PIXI.Sprite(resources["bunny"].texture)
    // b.scale.set(1)
    const bunny = new projection.Sprite2d(resources["bunny"].texture)
    bunny.anchor.set(0.5)
    bunny.interactive = true
    bunny.buttonMode = true
    bunny.scale.set(0.8)
    bunny.on('pointerdown', () => alert('hi'))
    bunny.proj.affine = projection.AFFINE.AXIS_X
    
    container.addChild(a)
    container.x = app.screen.width / 2
    container.y = app.screen.height / 2
    
    targetContainer.x = 25
    targetContainer.y = 25

    targetContainer.addChild(bunny)
  })
  let score = 0
  const scoreText = new PIXI.Text('Score: 0')
  scoreText.style = new PIXI.TextStyle({
    fill: '0xffffff',
  })
  stage.addChild(scoreText)
  
  const updateScore = () => {
    score += 1
    scoreText.text = `Score: ${score}`
    scoreText.x = app.screen.width - scoreText.width
  }
  updateScore()

  const reSpawnTarget = (step) => {
    targetContainer.x = (Math.floor(Math.random()*10) * app.renderer.width/10) || step
    targetContainer.y = (Math.floor(Math.random()*10) * app.renderer.height/10) || step
    updateScore()
  }
  const checkHit = () => {
    if(container.x === targetContainer.x && container.y === targetContainer.y) return true
    return false
  }

  app.ticker.add((delta) => {
    targetContainer.rotation -= 0.03 * delta
  })
  
  window.addEventListener('keydown', (e) => {
    const step = 25
    const max = 475
    const min = 25
    if(e.code === 'ArrowLeft' && container.x > min) {
      container.x = container.x - step
      container.rotation = (Math.PI / 180) * 90
    }
    if(e.code === 'ArrowRight' && container.x < max) {
      container.x = container.x + step
      container.rotation = (Math.PI / 180) * 270
    }
    if(e.code === 'ArrowUp' && container.y > min) {
      container.y = container.y - step
      container.rotation = (Math.PI / 180) * 180
    }
    if(e.code === 'ArrowDown' && container.y < max) {
      container.y = container.y + step
      container.rotation = 0
    }
    if(checkHit()) reSpawnTarget(step)
  })
}