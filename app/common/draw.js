import * as PIXI from 'pixi.js';

export const ellipse = (x, y, width, height, radius, bg) => {
	var obj = new PIXI.Graphics();

	if(bg) obj.beginFill(bg);

	obj.drawEllipse(x, y, width, height, radius);
	obj.endFill();
	obj.alpha = 0;

	return obj;
}

export const rectangle = (obj, prop) => {
	obj.beginFill(prop.background);
	obj.drawRect(prop.x, prop.y, prop.width, prop.height);
	obj.endFill();

	return obj;
}

