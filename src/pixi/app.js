import * as PIXI from 'pixi.js'

export default async () => {
  const app = new PIXI.Application({
    width: 500, height: 500, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
  });
  const stage = app.stage
  const loader = app.loader
  const key = {}
  document.body.appendChild(app.view);
  
  console.log(app)
  
  const container = new PIXI.Container()
  stage.addChild(container)

  loader.add({
    name: 'logo',
    url: 'src/assets/logo.png',
  })
  loader.load((loader, resources) => {
    const a = new PIXI.Sprite(resources["logo"].texture)
    a.anchor.set(0.5);
    a.scale.set(0.2);
    container.addChild(a)
    container.x = app.screen.width / 2
    container.y = app.screen.height / 2
  })

  console.log('resource', loader.resources)
  console.log('TextureCache', PIXI.utils.TextureCache)
  // const logo = new PIXI.Sprite()

  app.ticker.add((delta) => {
    container.rotation -= 0.01 * delta
  })
  
  window.addEventListener('keydown', (e) => {
    const step = 25
    const max = 475
    const min = 25
    if(e.code === 'ArrowLeft' && container.x > min) container.x = container.x - step
    if(e.code === 'ArrowRight' && container.x < max) container.x = container.x + step
    if(e.code === 'ArrowUp' && container.y > min) container.y = container.y - step
    if(e.code === 'ArrowDown' && container.y < max) container.y = container.y + step
  })
  window.addEventListener('keyup', (e) => {
    // if(e.code = 'ArrowLeft') container.x = container.x - 10
  })
}