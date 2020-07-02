import game from './state';

import {
	background,
	controls,
	spaceship,
	spaceshipExplode,
	asteroidsByAlias,
	life,
	score,
	gameover,
	animate
} from './space-units';

export const SpaceAlert = () => {
	background();
	
	asteroidsByAlias('asteroid', {
		random: true,
		extendAliasNameRandomMaxNum: 8
	});

	spaceship();

	score();

	life();

	gameover();

	controls();

	game.app.ticker.add(animate);

}