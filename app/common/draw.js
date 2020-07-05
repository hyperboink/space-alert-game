import * as PIXI from 'pixi.js';
import { graphics } from '../common/utils';

export const ellipse = (x, y, width, height, radius, bg) => {
	var obj = graphics();

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

