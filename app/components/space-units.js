import * as PIXI from 'pixi.js';
import game from './state';
import settings from '../config';
import { storageInt, randomNumber, save } from '../common/utils';
import { collision, center } from '../common/position';
import { ellipse, rectangle } from '../common/draw';
import { reset } from './reset';
import { restart } from './restart';

export const background = () => {
	let svgRes = new PIXI.resources.SVGResource("images/stars.svg", {scale: 4});
	let texture = PIXI.Texture.from(svgRes);

	game.background = new PIXI.TilingSprite(
		texture,
		game.app.screen.width,
		game.app.screen.height,
	);

	game.counter = 0;
	game.storedKey = {};

	game.screens.main.addChild(game.background);
}

export const spaceship = () => {
	let texture = game.app.loader.resources.spaceship.texture;

	game.distanceLimit = 30;

	game._spaceship = new PIXI.Sprite(texture);
	game._spaceship.x = -30;
	game._spaceship.y = game.app.screen.height / 2;
	game._spaceship.anchor.x = 0.5;
	game._spaceship.anchor.y = 0.5;

	game._spaceship.hitpoint = ellipse(
		game._spaceship.x,
		game._spaceship.y,
		game._spaceship.width / 2.5,
		game._spaceship.height / 2.5,
		0,
		0x3498db
	);

	game.screens.main.addChild(game._spaceship);
	game.screens.main.addChild(game._spaceship.hitpoint);
}

export const spaceshipExplode = () => {
	let explosionFrame = [];

	for(let i = 0; i < Object.keys(game.app.loader.resources.explosion.data.frames).length; i++){
		explosionFrame.push(PIXI.Texture.from('explosion_' + i + '.png'));
	}

	let animatedExplosion = new PIXI.AnimatedSprite(explosionFrame);

	if(settings.life <= 0){
		game._spaceship.visible = false;
		game._spaceship.hitpoint.visible = false;
	}

	animatedExplosion.anchor.set(0.5);
	animatedExplosion.animationSpeed = 0.7;
	animatedExplosion.loop = false;
	animatedExplosion.x = game._spaceship.x;
	animatedExplosion.y = game._spaceship.y;
	animatedExplosion.play();

	game.screens.main.addChild(animatedExplosion);
}

export const asteroidsByAlias = (alias, properties) => {
	let count = settings.asteroids ? settings.asteroids : 50;
	let props = {
		extendAliasName: '',
		extendAliasNameRandomMaxNum: 1,
		random: false
	};
	let colissionAllowance = settings.strictCollision ? 2.5 : 3;

	game._asteroids = [];

	for(let property in properties){
		if(properties[property]){
			props[property] = properties[property];
		}
	}

	for(let asteroidIndex = 0; asteroidIndex < count; asteroidIndex++){
		let randomSpeed = randomNumber(3, 5);
		let texture = game.app.loader.resources[alias + (props.extendAliasNameRandomMaxNum ?  randomNumber(1, props.extendAliasNameRandomMaxNum) : props.extendAliasName)].texture;
		let positionX = game.app.screen.width + randomNumber(1, game.app.screen.width)
		let positionY = randomNumber(1, game.app.screen.height, true);
		
		game._asteroids[asteroidIndex] = new PIXI.Sprite(texture);
		game._asteroids[asteroidIndex].x = positionX;
		game._asteroids[asteroidIndex].y =  positionY;
		game._asteroids[asteroidIndex].anchor.set(0.5);
		game._asteroids[asteroidIndex].randomY =  randomNumber(1, game.app.screen.height, true);
		game._asteroids[asteroidIndex].randomSpeed = randomSpeed;
		game._asteroids[asteroidIndex].randomRotation = randomNumber(0.005, 0.017, false, true);

		game._asteroids[asteroidIndex].hitpoint = ellipse(
			game._asteroids[asteroidIndex].x,
			game._asteroids[asteroidIndex].y,
			game._asteroids[asteroidIndex].width / colissionAllowance,
			game._asteroids[asteroidIndex].height / colissionAllowance,
			0,
			0x3498db
		);
		game._asteroids[asteroidIndex].hitpoint.positionX = positionX;
		game._asteroids[asteroidIndex].hitpoint.positionY = positionY;

		game.screens.main.addChild(game._asteroids[asteroidIndex]);
		game.screens.main.addChild(game._asteroids[asteroidIndex].hitpoint);
		
	}
}

export const life = () => {
	let texture = game.app.loader.resources.spaceship.texture;
	
	game.lifeFull = settings.life;

	game.life = new PIXI.Container();
	game.life.x = 40;
	game.life.y = 0;

	game.lifeSpaceship = new PIXI.Sprite(texture);
	game.lifeSpaceship.rotation = -0.5; 
	game.lifeSpaceship.y = 30; 
	game.lifeSpaceship.anchor.set(0.5); 
	game.lifeSpaceship.scale.set(0.6); 

	game.lifeText = new PIXI.Text('', {
		font: 'Segoe UI, sans-serif',
		fill: 'white',
		fontSize: 20,
		letterSpacing: 5
	});
	game.lifeText.x = 22;
	game.lifeText.y = 17;

	game.life.addChild(game.lifeSpaceship);
	game.life.addChild(game.lifeText);
	game.screens.main.addChild(game.life);
}

export const score = () => {
	let highestScore = () => {
		game.score.highest = new PIXI.Text('', {
			font: 'Segoe UI, sans-serif',
			fill: 'white',
			fontSize: 14,
			letterSpacing: 1,
			align: 'left'
		});

		center(game.score.highest, game.app.screen);
		game.score.highest.y = 30;
		game.score.highest.count = storageInt('highestScore');
	};

	game.score = new PIXI.Text('', {
		font: settings.fontFamily,
		fill: 'white',
		fontSize: 14,
		letterSpacing: 1,
		align: 'left'
	});

	highestScore();

	game.score.counter = 0;
	center(game.score, game.app.screen);
	game.score.y = 15;

	game.screens.main.addChild(game.score);
	game.screens.main.addChild(game.score.highest);
}

export const gameover = () => {
	let restartTexture = game.app.loader.resources.restart.texture;

	game.button = new PIXI.Sprite(restartTexture);
	game.button.position.y = center(game.button, game.app.screen).y + 20;
	game.button.width = 50;
	game.button.height = 50;
	game.button.anchor.set(0.5);
	game.button.interactive = true;
	game.button.buttonMode = true;
	game.button.on('click',  restart);
	game.screens.end.addChild(game.button);

	game.over = new PIXI.Text('GAMEOVER', {
		font: 'Segoe UI, sans-serif',
		fill: 'white',
		fontSize: 20,
		letterSpacing: 15
	});
	game.over.y = center(game.over, game.app.screen).y - 60;
	game.over.anchor.set(0.5);
	game.screens.end.addChild(game.over);

	game.retry = new PIXI.Text('(CLICK TO RETRY)', {
		font: '1px sans-serif',
		fill: 'white',
		fontSize: 12,
		letterSpacing: 5
	});
	game.retry.y = center(game.retry, game.app.screen).y - 30;
	game.retry.anchor.set(0.5);
	game.screens.end.addChild(game.retry);
}

export const controls = () => {
	window.addEventListener('keydown', (e) => game.storedKey[e.key] = true);
	window.addEventListener('keyup', (e) => game.storedKey[e.key] = false);
}

export const animate = (delta) => {
	const _width = window.innerWidth;
	const _height = window.innerHeight;
	let spaceshipHeightAllowance = (game._spaceship.height / 2);
	let spaceshipWidthAllowance = (game._spaceship.width / 2);
	let isHighest = storageInt('highestScore') < game.score.counter;
	let spaceshipBlink = () => {
		game._spaceship.alpha = 0.5;
		game._spaceship.hitpoint.alpha = 0;

		if(game.counter % 2 == 1){
			game._spaceship.alpha = 0.1;
			
		}
	};

	spaceshipBlink();

	game.background.tilePosition.x += (-settings.backgroundSpeed) * delta;

	if(game.counter < game.distanceLimit){
		game._spaceship.x += (game.counter / 2);
		game._spaceship.hitpoint.x += (game.counter / 2);
	}else{
		if(game.storedKey[settings.keys.up] && (game._spaceship.y > spaceshipHeightAllowance )){
			game._spaceship.y -= settings.speed;
			game._spaceship.hitpoint.y -= settings.speed;
		}

		if(game.storedKey[settings.keys.down] && (game._spaceship.y < (_height - spaceshipHeightAllowance))){
			game._spaceship.y += settings.speed;
			game._spaceship.hitpoint.y += settings.speed;
		}

		if(game.storedKey[settings.keys.left] && (game._spaceship.x > spaceshipWidthAllowance)){
			game._spaceship.x -= settings.speed;
			game._spaceship.hitpoint.x -= settings.speed;
		}

		if(game.storedKey[settings.keys.right] && (game._spaceship.x < (_width - spaceshipWidthAllowance))){
			game._spaceship.x += settings.speed;
			game._spaceship.hitpoint.x += settings.speed;
		}

		if(game.counter > (game.distanceLimit * 5)){
			game._spaceship.alpha = 1;

			for(let asteroid in game._asteroids){
				if(collision(game._spaceship.hitpoint, game._asteroids[asteroid].hitpoint) && settings.life > 0){
					settings.life--;
					spaceshipExplode();
					reset();
				}

				if(settings.life <= 0){
					game.screens.end.visible = true;
				}
			}
		}
	}

	for(let asteroid in game._asteroids){

		let randomX = randomNumber(game.app.screen.width, game.app.screen.width * 2 , true);
		let randomY =  randomNumber(1, game.app.screen.height, true);
		let resetPosition = {
			x: -(game._asteroids[asteroid].hitpoint.positionX),
			y: -(game._asteroids[asteroid].hitpoint.positionY)
		};

		if(game._asteroids[asteroid].x < -(game._asteroids[asteroid].width)){
			game._asteroids[asteroid].x = randomX;
			game._asteroids[asteroid].y =  randomY;
			game._asteroids[asteroid].hitpoint.x = (resetPosition.x + randomX);
			game._asteroids[asteroid].hitpoint.y = (resetPosition.y + randomY);
		}

		game._asteroids[asteroid].x -= game._asteroids[asteroid].randomSpeed * delta;
		game._asteroids[asteroid].hitpoint.x -= game._asteroids[asteroid].randomSpeed * delta;
		game._asteroids[asteroid].rotation += game._asteroids[asteroid].randomRotation * delta;

	}
 
	if(settings.life > 0){
		game.score.text = 'Score: ' + game.score.counter;
		game.score.anchor.set(0.5);
		game.score.highest.text = 'Highest : ' + (isHighest ?  game.score.counter : storageInt('highestScore'));
		game.score.highest.anchor.set(0.5);

		game.score.counter++;
	}else{
		if(isHighest){
			game.score.highest.count = game.score.counter - 1;
			save('highestScore', game.score.highest.count);
		}
	}

	game.lifeText.text = 'X' + settings.life;

	game.counter++;
}