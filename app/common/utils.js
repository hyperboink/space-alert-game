import * as PIXI from 'pixi.js';
import game from '../components/state';
import { rectangle } from './draw';

export const randomNumber = (min, max, convertToWholeNumber, isRandomDecimal) => {
	if(convertToWholeNumber){
		min = Math.ceil(min);
		max = Math.floor(max);
	}

	if(isRandomDecimal){
		return Math.random() * (max - min) + min;
	}

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const storageInt = (key) => {
	return parseInt(localStorage.getItem(key) ? localStorage.getItem(key) : 0);
}

export const save = (key, val) => {
	localStorage.setItem(key, val);
}

export const bar = (properties) => {
	let statusBar = [];

	let prop = {
		width: 220,
		height: 5,
		background: 0x2fa75f,
		progressCount: 100
	};

	for(let property in properties){
		if(properties[property]){
			prop[property] = properties[property];
		}
	}

	for(let i = 0; i <= 1; i++){
		statusBar[i] = rectangle(new PIXI.Graphics(), {
			x: (game.app.screen.width / 2) - (prop.width / 2),
			y: (game.app.screen.height / 2) + 23,
			width: (prop.width * (i === 0 ? 100 : prop.progressCount)) / 100,
			height: prop.height,
			background: i === 0 ? 0x333333 : prop.background
		});

		game.screens.loader.addChild(statusBar[i]);
	}
}

