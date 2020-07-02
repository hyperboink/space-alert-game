import * as PIXI from 'pixi.js';
import game from './state';
import { SpaceAlert } from './space-alert';

export const start = () => {
	setTimeout(function(){
		game.screens.loader.visible = false;
		game.screens.main.visible = true;
		game.screens.end.visible = false;
		SpaceAlert();
	}, 200);
}