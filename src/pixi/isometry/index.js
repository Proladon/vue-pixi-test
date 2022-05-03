import * as PIXI from 'pixi.js'
import * as projection from 'pixi-projection';

export default async () => {
  const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
  });
  document.body.appendChild(app.view);

  const container = new PIXI.Container();
  const container2 = new PIXI.Container();

  container.scale.y = 0.5

  const isometryPlane = new PIXI.Graphics();
  isometryPlane.rotation = Math.PI / 4;
  container.addChild(isometryPlane);
  

  isometryPlane.lineStyle(2, 0xffffff);
  for (let i = -100; i <= 100; i += 50) {
      isometryPlane.moveTo(-150, i);
      isometryPlane.lineTo(150, i);
      isometryPlane.moveTo(i, -150);
      isometryPlane.lineTo(i, 150);
  }

  

  // Create a new texture
  const texture = PIXI.Texture.from('src/assets/logo.png');
  
  const avatar = new PIXI.Sprite.from('http://anata.me/img/avatar.jpg');
  // 圖片寬高縮放0.5
  const a = new projection.Sprite2d(texture)
  a.anchor.set(0.5, 1.0);
  a.proj.affine = projection.AFFINE.AXIS_X
  container2.addChild(a);
  container.addChild(container2);


  // Move container to the center
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  // Center bunny sprite in local container coordinates
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  app.stage.addChild(container);

  // Listen for animate update
  app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container2.rotation -= 0.03 * delta;
  });

}