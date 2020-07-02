import * as PIXI from 'pixi.js';
import game from './state';
import settings from '../config';
import { bar } from '../common/utils';
import { start } from '../components/start';

export const progress = (loader, resource) => {
	game.screens.loader.visible = true;
	game.screens.main.visible = false;
	game.screens.end.visible = false;	
}

export const assetLoad = (loader, resource) => {
	game.screens.loader.removeChild(game.load);
	game.load = new PIXI.Text('Loading... ' + Math.floor(loader.progress) + '%', {
		font: settings.fontFamily,
		fill: 'white',
		fontSize: 20,
		letterSpacing: 5
	});

	game.load.position.x = game.app.screen.width / 2;
	game.load.position.y = game.app.screen.height / 2;
	game.load.anchor.set(0.5);

	game.screens.loader.addChild(game.load);

	bar({progressCount: loader.progress});	
}

export const error = (error) => {
	console.log(error);
}

export const complete = (loader, resource) => {
	start();
}

export const loadScreen = () => {
	game.screens = {
		loader: {},
		main: {},
		end: {}
	};

	for(screen in game.screens){
		game.screens[screen] = new PIXI.Container();
		game.app.stage.addChild(game.screens[screen]);
	}
}