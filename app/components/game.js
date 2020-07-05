import * as PIXI from 'pixi.js';
import assets from './assets';
import game from './state';
import { application, firstInit } from '../common/utils';
import { progress, complete, error, assetLoad, loadScreen } from './loader';

firstInit();

game.app = application({
	width:  window.innerWidth,
	height:  window.innerHeight
});

game.app.loader.onLoad.add(assetLoad);
game.app.loader.onProgress.add(progress);
game.app.loader.onError.add(error);
game.app.loader.onComplete.add(complete);

for(let asset in assets){
	game.app.loader.add(asset, assets[asset]);
}

game.app.loader.load();

loadScreen();

document.body.appendChild(game.app.view);

