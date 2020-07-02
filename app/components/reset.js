import game from './state';
import settings from '../config';

export const reset = () => {
	game._spaceship.x = -(game.distanceLimit);
	game._spaceship.y = game.app.screen.height / 2;
	game._spaceship.speed = settings.speed;

	game._spaceship.hitpoint.x = 0;
	game._spaceship.hitpoint.y = 0;
	game.counter = 0;		
}