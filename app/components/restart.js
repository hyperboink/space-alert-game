import game from './state';
import settings from '../config';
import { reset } from './reset';

export const restart = () => {
	reset();
	settings.life = game.lifeFull;
	game.screens.end.visible = false;
	game._spaceship.visible = true;
	game.score.counter = 0;
}

