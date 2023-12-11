import './TPONG.css';
import  { ContentContext } from './App'
import { useState, useLayoutEffect, useContext } from 'react';
import { Leaderboard } from './Leaderboard';
export function TPONG(gameSetup, bDebug) {
  const [gameState, setGameState] = useState({
    paddleHitSound : 'sounds/TPONG/paddleHit.m4a',
    paddleServeSound: 'sounds/TPONG/paddleServe.m4a',
    tableHitSound: 'sounds/TPONG/tableHit.m4a',
    ScoreBeepSound: 'sounds/TPONG/score.m4a',
    PaddleHeight : 100,
    PaddleWidth : 10,
    PaddleRad : 20,
    DefaultWidth : 800,
    DefaultHeight : 600,
    DefaultSpeed : 0.45,
    DefaultCPUSpeed : 0.90,
    Red : '#7F0000',
    Green : '#007F00',
    Blue : '#00007F',
    Purple : '#814ED2',
    Black : '#00000',

    DimGray : '#767676',
    White : '#FFFFFF',

    canvasMarginLeft : 'auto',
    canvasMarginRight : 'auto',
    canvasStyleDisplay : 'inline-block',
    canvasStyleWidth : '800px',
    canvas : null,
    frameId : null,
    ColorPalettes: [],
    controlStyleValue: null,

    BallRad : 10,

    ctx : null,

    ControllerSlots : new Array(),
    ControllerAnalogZones : new Array(-0.75, -0.5, -0.35, 0.35, 0.5, 0.75),

    ScalingFactorX : 1,
    ScalingFactorY : 1,

    previousTimeStamp : null,

    LeaderBoardTime : null,

    gameFlags : { 'GameSet': false, 'StartGame' : false, 'IdleMode': true, 'DrawBall' : false, 'Debug' : bDebug, 'AudioPlayable' : false, 'AudioMuted' : false, 'localStorage' : false, 'ShowControls' : true },

    selectedPalette : null,

    BallMovSpeed : 0,
    CPUMovSpeed : 0,

    PlayerMovSpeedFull : 0,
    PlayerMovSpeedHalf : 0,
    PlayerMovSpeedQuater : 0,
    BackgroundColor : '',
    SpriteColor : '',
    gameBoardWidth : 0,
    gameBoardHeight : 0,

    Ball : {},
    PlayerPaddle : {},
    CPUPaddle : { 'x' : 0, 'y' : 0 },

    PlayerScore : 1,
    CPUScore : 1,

    BallSpawnDelay : 0,

    lastKey : '',
    lastController : null,
    GameboardBoundary : 30,

    paddleHit : null,
    paddleServe : null,
    tableHit : null,
    ScoreBeep : null,

  });
  const [controlText, setControlText] = useState('');
  const [controlAudioText, setControlAudioText] = useState('');
  useLayoutEffect(() => {

      if (typeof gameState.getContext !== "function") { 
        return;
    }
    gameState.paddleHitSound = 'sounds/TPONG/paddleHit.m4a'
    gameState.paddleServeSound = 'sounds/TPONG/paddleServe.m4a'
    gameState.tableHitSound = 'sounds/TPONG/tableHit.m4a'
    gameState.ScoreBeepSound = 'sounds/TPONG/score.m4a'
    gameState.PaddleHeight = 100;
    gameState.PaddleWidth = 10;
    gameState.PaddleRad = 20;
    gameState.DefaultWidth = 800;
    gameState.DefaultHeight = 600;
    gameState.DefaultSpeed = 0.35;
    gameState.DefaultCPUSpeed = 0.90;
    gameState.Red = '#7F0000';
    gameState.Green = '#007F00';
    gameState.Blue = '#00007F';
    gameState.Purple = '#814ED2';
    gameState.Black = '#00000';

    gameState.DimGray = '#767676';
    gameState.White = '#FFFFFF';

    gameState.canvasMarginLeft = '7%';
    gameState.canvasMarginRight = 'auto';
    gameState.canvasStyleDisplay = 'inline-block';
    gameState.canvasStyleWidth = '800px';

    gameState.id = 'mainGameboard';
    gameState.className = 'Article';
    gameState.tabIndex = '1';
    gameState.frameId = null;
    gameState.width = gameState.DefaultWidth;
    gameState.height = gameState.DefaultHeight;
    gameState.ColorPalettes = [{PaletteName : 'RedPalette', BackgroundColor : gameState.Red,  SpriteColor : gameState.White}, { PaletteName : 'GreenPalette', BackgroundColor : gameState.Green,  SpriteColor : gameState.White}, { PaletteName : 'BluePalette', BackgroundColor : gameState.Blue,  SpriteColor : gameState.White }, { PaletteName : 'PurplePalette', BackgroundColor : gameState.Purple,  SpriteColor : gameState.White}, { PaletteName : 'BlackPalette', BackgroundColor : gameState.Black,  SpriteColor : gameState.DimGray }];
    gameState.selectedPalette = gameState.ColorPalettes.find(x => x.PaletteName === 'BlackPalette');
    gameState.BallRad = 10;

    gameState.ctx = gameState.getContext('2d');

    gameState.ControllerSlots = new Array();
    gameState.ControllerAnalogZones = new Array(-0.75, -0.5, -0.35, 0.75, 0.5, 0.35);
    gameState.ScalingFactorX = 1;
    gameState.ScalingFactorY = 1;

    gameState.previousTimeStamp = null;

    gameState.LeaderBoardTime = null;

    gameState.gameFlags = { 'GameSet': false, 'StartGame' : false, 'IdleMode': true, 'DrawBall' : false, 'Debug' : bDebug, 'AudioPlayable' : false, 'AudioMuted' : false, 'localStorage' : false,  'ShowControls' : true } //booleans

    if (typeof(Storage) !== 'undefined') {
      gameState.gameFlags.localStorage = true;
      let Preferences = localStorage.getItem('savedPreferences');
      if(Preferences === null)
      {
           localStorage.setItem('savedPreferences', JSON.stringify({'savedPreferences' : {'savedPalette' : { PaletteName : 'BlackPalette', BackgroundColor : gameState.Black,  SpriteColor : gameState.DimGray }, 'savedControlsPreference' : { 'ShowControls' : true, 'AudioMuted' : false }}}));
      }
      else
      {
        if(typeof Preferences === 'undefined')
        {
          localStorage.setItem('savedPreferences', JSON.stringify({'savedPreferences' : {'savedPalette' : { PaletteName : 'BlackPalette', BackgroundColor : gameState.Black,  SpriteColor : gameState.DimGray }, 'savedControlsPreference' : { 'ShowControls' : true, 'AudioMuted' : false }}}));
        }
        else
        {
          Preferences = JSON.parse(Preferences);
          if(typeof Preferences.savedControlsPreference === 'undefined' ||
          typeof Preferences.savedControlsPreference.AudioMuted === 'undefined' ||
             typeof Preferences.savedControlsPreference.ShowControls === 'undefined' ||
             typeof Preferences.savedPalette === 'undefined')
          {
            localStorage.setItem('savedPreferences', JSON.stringify({'savedPreferences' : {'savedPalette' : { PaletteName : 'BlackPalette', BackgroundColor : gameState.Black,  SpriteColor : gameState.DimGray }, 'savedControlsPreference' : { 'ShowControls' : true, 'AudioMuted' : false }}}));
          }
          else
          {
            gameState.selectedPalette = Preferences.savedPalette;
            gameState.gameFlags.ShowControls = Preferences.savedControlsPreference.ShowControls;
            gameState.gameFlags.AudioMuted = Preferences.savedControlsPreference.AudioMuted;
          }

        }
      }
   }
   else {
      gameState.gameFlags.localStorage = false;
      gameState.selectedPalette = gameState.ColorPalettes.find(x => x.PaletteName === 'BlackPalette');
   }

   if(gameState.gameFlags.ShowControls)
   {
     document.body.style.setProperty('--main-gameControl-visibility', 'visible');
     setControlText('Hide Controls');
   }
   else
   {
     document.body.style.setProperty('--main-gameControl-visibility', 'hidden');
     setControlText('Show Controls');
   }
   if(gameState.gameFlags.AudioMuted)
   {
    setControlAudioText('Turn on sound');
   }
   else
   {
    setControlAudioText('Turn off sound');
   }
    gameState.BallMovSpeed = gameState.DefaultSpeed;
    gameState.CPUMovSpeed = gameState.DefaultCPUSpeed;

    gameState.PlayerMovSpeedFull = gameState.DefaultSpeed;
    gameState.PlayerMovSpeedHalf = (gameState.DefaultSpeed / 2);
    gameState.PlayerMovSpeedQuater = (gameState.DefaultSpeed / 4);
    gameState.BackgroundColor = '#00000';
    gameState.SpriteColor = '#767676';
    gameState.gameBoardWidth = gameState.DefaultWidth;
    gameState.gameBoardHeight = gameState.DefaultHeight;

    gameState.style.paddingLeft = 0;
    gameState.style.paddingRight = 0;
    gameState.style.marginLeft = gameState.canvasMarginLeft;
    gameState.style.marginRight = gameState.canvasMarginRight;
    gameState.style.display = gameState.canvasStyleDisplay;
    gameState.style.width = gameState.canvasStyleWidth;

    gameState.Ball = { 'x' : 0, 'y' : 0, 'radius' : gameState.BallRad, 'velocityY' : gameState.BallMovSpeed, 'velocityX' : gameState.BallMovSpeed, 'divisor' : 2};
    gameState.PlayerPaddle = { 'x' : gameState.PaddleHeight, 'y' : ((gameState.DefaultHeight / 2) - gameState.PaddleHeight) };
    gameState.CPUPaddle = { 'x' : 0, 'y' : 0 };

    gameState.PlayerScore = 1;
    gameState.CPUScore = 1;

    //Debug element array
    gameState.gameElements = [gameState.PlayerPaddle, gameState.CPUPaddle, gameState.Ball];
    gameState.SelectedElement = {'gameElement' : null, 'Index' : 0 };
    gameState.BallSpawnDelay = 0;

    gameState.lastKey = '';
    gameState.lastController = null;
    gameState.GameboardBoundary = 30;

    gameState.paddleHit = new Audio(gameState.paddleHitSound);
    gameState.paddleServe = new Audio(gameState.paddleServeSound);
    gameState.tableHit = new Audio(gameState.tableHitSound);
    gameState.ScoreBeep = new Audio(gameState.ScoreBeepSound);

    gameState.FullScreenHandler = { EventHandler() {
      if(gameState.gameFlags.StartGame){
      if (document.fullScreen || 
          document.mozFullScreen || 
          document.webkitIsFullScreen) {
  
        gameState.BallSpawnDelay = Date.now() + 4000;
          if (import.meta.env.DEV){
            console.log('Entered Full Screen');
            gameState.BallSpawnDelay = Date.now();
          }
        gameState.gameFlags.DrawBall = false;
        gameState.PlayerPaddle = { 'x' : gameState.PaddleHeight, 'y' : ((gameState.gameBoardHeight / 2) - gameState.PaddleHeight) };
        gameState.gameBoardWidth = window.screen.width;
        gameState.gameBoardHeight = window.screen.height;
        gameState.Ball = { 'x' : 10, 'y' : 10, 'radius' : gameState.BallRad, 'velocityY' : gameState.BallMovSpeed, 'velocityX' : gameState.BallMovSpeed, 'divisor' : 2};
        gameState.ctx.canvas.style.paddingLeft = 0;
        gameState.ctx.canvas.style.paddingRight = 0;
        gameState.ctx.canvas.style.marginLeft = '0%';
        gameState.ctx.canvas.style.marginRight = '0%';
        gameState.ctx.canvas.style.width = '';
        gameState.ctx.canvas.style.height = '';
        gameState.ctx.canvas.style.display = '';
        gameState.ctx.canvas.style.class = 'mainGamebroad';
        gameState.controlStyleValue = getComputedStyle(document.body).getPropertyValue('--main-gameControl-visibility');
        document.body.style.setProperty('--main-visibility', 'hidden');
        document.body.style.setProperty('--main-gameControl-visibility', 'hidden');
        document.body.style.setProperty('--main-gameControl-display', 'none');
        document.body.style.setProperty('--main-gameControl-display-alt', 'none');
        document.body.style.setProperty('--main-display-flex', 'none');
        document.body.style.setProperty('--main-display-flexbox', 'none');
        document.body.style.setProperty('--main-display-block', 'none');
        document.body.style.setProperty('--main-article-margin', '0%');
        gameState.ctx.canvas.style.display = gameState.canvasStyleDisplay;
        document.body.style.width = window.screen.height;
        document.body.style.height = window.screen.width;
      } else {
        gameState.BallSpawnDelay = Date.now() + 4000;
        if (import.meta.env.DEV){
        console.log('Exited Full Screen');
        gameState.BallSpawnDelay = Date.now();
        }
        gameState.gameFlags.DrawBall = false;
        gameState.BallMovSpeed = 0.45;

        gameState.gameBoardWidth = gameState.DefaultWidth;
        gameState.gameBoardHeight = gameState.DefaultHeight;
        gameState.PlayerPaddle = { 'x' : gameState.PaddleHeight, 'y' : ((gameState.gameBoardHeight / 2) - gameState.PaddleHeight) };
        gameState.Ball = { 'x' : (gameState.gameBoardWidth / 2), 'y' : Math.floor(Math.random() * gameState.gameBoardHeight), 'radius' : gameState.BallRad, 'velocityY' : gameState.BallMovSpeed, 'velocityX' : gameState.BallMovSpeed, 'divisor' : 2};
        document.body.style.setProperty('--main-visibility', 'visible');
        document.body.style.setProperty('--main-gameControl-display', 'block');
        document.body.style.setProperty('--main-gameControl-visibility', gameState.controlStyleValue);
        document.body.style.setProperty('--main-gameControl-display-alt', 'block');
        document.body.style.setProperty('--main-display-flex', 'flex');
        document.body.style.setProperty('--main-display-flexbox', 'flexbox');
        document.body.style.setProperty('--main-display-block', 'block');

        document.body.style.setProperty('--main-article-margin', '3%');
        gameState.ctx.canvas.style.marginLeft = '7%';
        gameState.ctx.canvas.style.marginRight = 'auto';
      }
    }
    }
  }

  gameState.MouseHandler = { EventHandler(event) {
      let movementY = event.movementY ||
      event.mozMovementY      ||
      event.webkitMovementY   ||
          0;
  
      if(gameState.gameFlags.StartGame === true)
      {
        if (((gameState.PlayerPaddle.y - gameState.GameboardBoundary) + movementY) >= 0 && (gameState.PlayerPaddle.y + movementY) <= ((gameState.gameBoardHeight - gameState.GameboardBoundary) - gameState.PaddleHeight))
        {
          gameState.PlayerPaddle.y += movementY;
        }
        else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
        {
          gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
        }
      }
      if(gameState.frameId !== null)
      {
      gameState.frameId = window.requestAnimationFrame(gameState.MouseHandler.EventHandler);
      }
    }
  };

    document.addEventListener('click', () => {
      gameState.gameFlags.AudioPlayable = true;
      if (import.meta.env.DEV && gameState.gameFlags.AudioPlayable === false){
      console.log('The audio is now playable. ');
    }
    });
    document.addEventListener('pointerlockchange', () => {
      if(document.pointerLockElement === gameState.ctx.canvas) {
        document.addEventListener('mousemove', gameState.MouseHandler.EventHandler, false);
      }
      else {
        document.removeEventListener('mousemove', gameState.MouseHandler.EventHandler, false);
      }
    }, true);
    document.addEventListener('fullscreenchange', gameState.FullScreenHandler.EventHandler);
    gameState.addEventListener('click', async () => {
      if (!gameState.ctx.canvas.pointerLockElement)
      {
        try{
        await gameState.requestPointerLock({
          unadjustedMovement: true,
        });
      }
      catch(e)
      {
        if (import.meta.env.DEV){
        console.log(e);
        }
      }
      }
    });
    window.addEventListener('keyup', (event)  => {
      if(event.key === gameState.lastKey && event.target.id === gameState.id)
      {
        gameState.lastKey = '';
      }
    }, true);
    window.addEventListener('keydown', (event) => {
      if(event.target.id === gameState.id)
      {
      gameState.lastKey = event.key;
      
      if(event.repeat === false)
      {
      switch(event.key) {
        case 'c': //Cycle colors
        {
        let PattleIndex = gameState.ColorPalettes.findIndex(x => x.PaletteName === gameState.selectedPalette.PaletteName);
        if((PattleIndex + 1) < gameState.ColorPalettes.length)
          {
            gameState.selectedPalette = gameState.ColorPalettes[(PattleIndex + 1)];
          }
          else
          {
            gameState.selectedPalette = gameState.ColorPalettes[0];
          }

          if(gameState.gameFlags.localStorage === true)
          {
            localStorage.setItem('savedPreferences', JSON.stringify({'savedPalette' : gameState.selectedPalette, 'savedControlsPreference' : {'ShowControls' : gameState.gameFlags.ShowControls, 'AudioMuted' : gameState.gameFlags.AudioMuted}}));
          }
          break;
        }
        case 'Enter':
        {
          if(gameState.gameFlags.StartGame === true)
          {
            gameState.gameFlags.StartGame = false;
            gameState.BallMovSpeed = 0;
          }
          else
          {
            gameState.BallMovSpeed = gameState.DefaultSpeed;
            gameState.StartGame();
          }
          break;
        }
        case 'F11':
          {
            event.preventDefault();
              if(document.fullScreen || 
                document.mozFullScreen || 
                document.webkitIsFullScreen) {
                window.document.exitFullscreen().catch((err) => {
                  if (import.meta.env.DEV){
                    console.log(err);
                  }
                });
            } else {
                window.document.documentElement.requestFullscreen().catch((err) => {
                  if (import.meta.env.DEV){
                    console.log(err);
                  }
                });
            }
            }
            break;
        default:
          return
      }

      if(gameState.gameFlags.localStorage === true)
      {
        localStorage.setItem('savedPreferences', JSON.stringify({'savedPalette' : gameState.selectedPalette, 'savedControlsPreference' : {'ShowControls' : gameState.gameFlags.ShowControls, 'AudioMuted' : gameState.gameFlags.AudioMuted}}));
      }
    }
    }
      }, true);

    gameState.ctx = gameState.getContext("2d");


    gameState.Renderer = { Draw(timeStamp)
    {
      let deltaTime = timeStamp - gameState.previousTimeStamp;
      if(deltaTime >= 500){
      gameState.previousTimeStamp = timeStamp;
      if(gameState.frameId !== null)
      {
        gameState.frameId = window.requestAnimationFrame(gameState.Renderer.Draw);
      }
    }
      gameState.ctx.canvas.width  = gameState.gameBoardWidth;
      gameState.ctx.canvas.height = gameState.gameBoardHeight;
      gameState.CPUPaddle.x = (gameState.gameBoardWidth - gameState.PaddleHeight);
      gameState.ScalingFactorX = (gameState.gameBoardWidth / gameState.DefaultWidth);
      gameState.ScalingFactorY = (gameState.gameBoardHeight / gameState.DefaultHeight);
      gameState.BallMovSpeed = (gameState.DefaultSpeed * (gameState.ScalingFactorX * 1.3));
      gameState.CPUMovSpeed = ((gameState.DefaultCPUSpeed / 4) * gameState.ScalingFactorY);
      
      gameState.PlayerMovSpeedFull = ((gameState.DefaultSpeed  / 2) * (gameState.ScalingFactorY * 1.5));
      gameState.PlayerMovSpeedHalf = ((gameState.DefaultSpeed / 2) * gameState.ScalingFactorY);
      gameState.PlayerMovSpeedQuater = ((gameState.DefaultSpeed / 4) * gameState.ScalingFactorY);
  
      let Gamepads = navigator.getGamepads 
        ? navigator.getGamepads() 
        : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : [0])
        
      let firstController = gameState.ControllerSlots.find(x => typeof x !== 'undefined');
      if( firstController !== null && typeof firstController !== 'undefined' && 'buttons' in firstController && 'connected' in firstController && firstController.connected === true)
      {
        firstController = Gamepads[firstController.index];
        if (firstController.buttons[4].value === 1 && gameState.lastController !== null && gameState.lastController.buttons[4].value !== 1) {
          let PattleIndex = gameState.ColorPalettes.findIndex(x => x.PaletteName === gameState.selectedPalette.PaletteName);
          if((PattleIndex + 1) < gameState.ColorPalettes.length)
            {
              gameState.selectedPalette = gameState.ColorPalettes[(PattleIndex + 1)];
            }
            else
            {
              gameState.selectedPalette = gameState.ColorPalettes[0];
            }
  
            if(gameState.gameFlags.localStorage === true)
            {
            localStorage.setItem('savedPreferences', JSON.stringify({'savedPalette' : gameState.selectedPalette, 'savedControlsPreference' : {'ShowControls' : gameState.gameFlags.ShowControls, 'AudioMuted' : gameState.gameFlags.AudioMuted}}));
            }
        }
        else if (firstController.buttons[5].value === 1 && gameState.lastController !== null && gameState.lastController.buttons[5].value !== 1) {
          let PattleIndex = gameState.ColorPalettes.findIndex(x => x.PaletteName === gameState.selectedPalette.PaletteName);
          if((PattleIndex + 1) < gameState.ColorPalettes.length)
            {
              gameState.selectedPalette = gameState.ColorPalettes[(PattleIndex + 1)];
            }
            else
            {
              gameState.selectedPalette = gameState.ColorPalettes[0];
            }
  
            if(gameState.gameFlags.localStorage === true)
            {
              localStorage.setItem('savedPreferences', JSON.stringify({'savedPalette' : gameState.selectedPalette, 'savedControlsPreference' : {'ShowControls' : gameState.gameFlags.ShowControls, 'AudioMuted' : gameState.gameFlags.AudioMuted}}));
            }
        }
        else if (firstController.buttons[8].value === 1 && gameState.lastController !== null && gameState.lastController.buttons[8].value !== 1) {
          if(gameState.gameFlags.StartGame === true)
          {
          if(document.fullScreen || 
            document.mozFullScreen || 
            document.webkitIsFullScreen) {
            window.document.exitFullscreen().catch((err) => {
              if (import.meta.env.DEV){
                console.log(err);
              }
            });
        } else {
            window.document.documentElement.requestFullscreen().catch((err) => {
              if (import.meta.env.DEV){
                console.log(err);
              }
            });
        }
      }
        }
        else if (firstController.buttons[9].value === 1 && gameState.lastController !== null && gameState.lastController.buttons[9].value !== 1) { // Start
          if(gameState.gameFlags.StartGame === true)
          {
            gameState.gameFlags.StartGame = false;
            gameState.BallMovSpeed = 0;
          }
          else
          {
            gameState.BallMovSpeed = gameState.DefaultSpeed;
            gameState.StartGame();
          }
        }
        if (firstController.buttons[12].value === 1 && gameState.lastKey === '') {// Up
          if(gameState.gameFlags.StartGame === true)
          {
            if ((gameState.PlayerPaddle.y - (gameState.PlayerMovSpeedFull * deltaTime)) >= gameState.GameboardBoundary)
            {
              gameState.PlayerPaddle.y -= (gameState.PlayerMovSpeedFull * deltaTime);
            }
            else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
            {
              gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
            }
          }
        }
        else if (firstController.buttons[13].value === 1 && gameState.lastKey === '') {// Down
          if(gameState.gameFlags.StartGame === true)
          {
            if ((gameState.PlayerPaddle.y + (gameState.PlayerMovSpeedFull * deltaTime)) <= ((gameState.gameBoardHeight - gameState.GameboardBoundary) - gameState.PaddleHeight))
            {
              gameState.PlayerPaddle.y += (gameState.PlayerMovSpeedFull * deltaTime);
            }
            else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
            {
              gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
            }
          }
        }
  
        if(firstController.axes[1] <= gameState.ControllerAnalogZones[0])//Left analog
        {
          if(gameState.gameFlags.StartGame === true)
          {
            if ((gameState.PlayerPaddle.y - (gameState.PlayerMovSpeedFull * deltaTime)) >= gameState.GameboardBoundary)
            {
              gameState.PlayerPaddle.y -= (gameState.PlayerMovSpeedFull * deltaTime);
            }
            else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
            {
              gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
            }
          }
        }
        else if(firstController.axes[1] <= gameState.ControllerAnalogZones[1])//Left analog
        {
          if(gameState.gameFlags.StartGame === true)
          {
            if ((gameState.PlayerPaddle.y - (gameState.PlayerMovSpeedHalf * deltaTime)) >= gameState.GameboardBoundary)
            {
              gameState.PlayerPaddle.y -= (gameState.PlayerMovSpeedHalf * deltaTime);
            }
            else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
            {
              gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
            }
          }
        }
        else if(firstController.axes[1] <= gameState.ControllerAnalogZones[2])//Left analog
        {
          if(gameState.gameFlags.StartGame === true)
          {
            if ((gameState.PlayerPaddle.y - (gameState.PlayerMovSpeedQuater * deltaTime)) >= gameState.GameboardBoundary)
            {
              gameState.PlayerPaddle.y -= (gameState.PlayerMovSpeedQuater * deltaTime);
            }
            else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
            {
              gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
            }
          }
        }
        else if(firstController.axes[1] >= gameState.ControllerAnalogZones[3])//Left analog
        {
          if(gameState.gameFlags.StartGame === true)
          {
            if ((gameState.PlayerPaddle.y + (gameState.PlayerMovSpeedFull * deltaTime)) <= ((gameState.gameBoardHeight - gameState.GameboardBoundary) - gameState.PaddleHeight))
            {
              gameState.PlayerPaddle.y += (gameState.PlayerMovSpeedFull * deltaTime);
            }
            else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
            {
              gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
            }
          }
        }
        else if(firstController.axes[1] >= gameState.ControllerAnalogZones[4])//Left analog
        {
          if(gameState.gameFlags.StartGame === true)
          {
            if ((gameState.PlayerPaddle.y + (gameState.PlayerMovSpeedHalf * deltaTime)) <= ((gameState.gameBoardHeight - gameState.GameboardBoundary) - gameState.PaddleHeight))
            {
              gameState.PlayerPaddle.y += (gameState.PlayerMovSpeedHalf * deltaTime);
            }
            else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
            {
              gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
            }
          }
        }
        else if(firstController.axes[1] >= gameState.ControllerAnalogZones[5])//Left analog
        {
          if(gameState.gameFlags.StartGame === true)
          {
            if ((gameState.PlayerPaddle.y + (gameState.PlayerMovSpeedQuater * deltaTime)) <= ((gameState.gameBoardHeight - gameState.GameboardBoundary) - gameState.PaddleHeight))
            {
              gameState.PlayerPaddle.y += (gameState.PlayerMovSpeedQuater * deltaTime);
            }
            else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
            {
              gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
            }
          }
        }
        gameState.lastController = firstController;
      }
  
      if (gameState.lastKey === 'ArrowUp' || gameState.lastKey === 'w') {// Up keyboard
        if(gameState.gameFlags.StartGame === true)
        {
          if ((gameState.PlayerPaddle.y - (gameState.PlayerMovSpeedFull * deltaTime)) >= gameState.GameboardBoundary)
          {
            gameState.PlayerPaddle.y -= (gameState.PlayerMovSpeedFull * deltaTime);
          }
          else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
          {
            gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
          }
        }
      }
      else if (gameState.lastKey === 'ArrowDown' || gameState.lastKey === 's') {// Down keyboard
        if(gameState.gameFlags.StartGame === true)
        {
          if ((gameState.PlayerPaddle.y + (gameState.PlayerMovSpeedFull * deltaTime)) <= ((gameState.gameBoardHeight - gameState.GameboardBoundary) - gameState.PaddleHeight))
          {
            gameState.PlayerPaddle.y += (gameState.PlayerMovSpeedFull * deltaTime);
          }
          else if (gameState.PlayerPaddle.y < 0 || gameState.PlayerPaddle.y > gameState.gameBoardHeight)// Paddle out of bounds
          {
            gameState.PlayerPaddle.y = (gameState.gameBoardHeight / 2);
          }
        }
      }
      
      gameState.BackgroundColor = gameState.selectedPalette.BackgroundColor;
      gameState.SpriteColor = gameState.selectedPalette.SpriteColor;
  
      if (import.meta.env.DEV){
      //console.log('Width:' + gameState.ctx.canvas.width);
      //console.log('Height:' + gameState.ctx.canvas.height);
      }
      //Game Logic
      if( gameState.BallSpawnDelay < Date.now()  && gameState.BallSpawnDelay !== 0){
        gameState.Ball.x = (gameState.gameBoardWidth / 2);
        gameState.Ball.y = Math.floor(Math.random() * gameState.gameBoardHeight);
        gameState.gameFlags.DrawBall = true;
        gameState.BallSpawnDelay = 0;
      }
      if (gameState.gameFlags.DrawBall === true){
        if ((gameState.Ball.x + gameState.Ball.radius) < 0)//CPU Scored
        {
          if( firstController !== null && typeof firstController !== 'undefined' && 'vibrationActuator' in firstController && 'connected' in firstController && firstController.connected === true)
          {
            firstController = Gamepads[firstController.index];
            firstController.vibrationActuator.playEffect('dual-rumble', {
              startDelay: 0,
              duration: 1000,
              weakMagnitude: 1.0,
              strongMagnitude: 1.0,
            });
          }
          gameState.Ball.divisor = 1;
          gameState.CPUScore++;
          gameState.BallSpawnDelay = Date.now() + 4000;
          gameState.gameFlags.DrawBall = false;
          if (gameState.gameFlags.AudioPlayable === true && gameState.gameFlags.AudioMuted === false)
          {
            gameState.ScoreBeep.play();
          }
        }
        else if ((gameState.Ball.x - gameState.Ball.radius) > (gameState.gameBoardWidth))//Player Scored
        {
          if( firstController !== null && typeof firstController !== 'undefined' && 'vibrationActuator' in firstController && 'connected' in firstController && firstController.connected === true)
          {
            firstController = Gamepads[firstController.index];
            firstController.vibrationActuator.playEffect('dual-rumble', {
              startDelay: 0,
              duration: 1000,
              weakMagnitude: 1.0,
              strongMagnitude: 1.0,
            });
          }
          gameState.Ball.divisor = 1;
          gameState.PlayerScore++;
          gameState.BallSpawnDelay = Date.now() + 4000;
          gameState.gameFlags.DrawBall = false;
          if (gameState.gameFlags.AudioPlayable === true && gameState.gameFlags.AudioMuted === false)
          {
            gameState.ScoreBeep.play();
          }
        }
        else if ((gameState.Ball.y + gameState.Ball.radius) >= (gameState.gameBoardHeight))
        {
          if (gameState.gameFlags.AudioPlayable === true && gameState.gameFlags.AudioMuted === false){
          gameState.tableHit.play();
            }
          gameState.Ball.velocityY = gameState.Ball.velocityY * -1;
          gameState.Ball.velocityX = gameState.Ball.velocityX * 1;
          gameState.Ball.y -= gameState.PaddleWidth;
        }
        else if ((gameState.Ball.y - gameState.Ball.radius) <= 0)
        {
          if (gameState.gameFlags.AudioPlayable === true && gameState.gameFlags.AudioMuted === false){
          gameState.tableHit.play();
          }
          gameState.Ball.velocityY = gameState.Ball.velocityY * -1;
          gameState.Ball.velocityX = gameState.Ball.velocityX * 1;
          gameState.Ball.y += gameState.PaddleWidth;
        }
        else if ((gameState.Ball.x + gameState.Ball.radius) >= gameState.CPUPaddle.x  && (gameState.Ball.x + gameState.Ball.radius) <= (gameState.CPUPaddle.x + gameState.PaddleWidth ) &&  gameState.Ball.y >= gameState.CPUPaddle.y &&  (gameState.Ball.y + gameState.Ball.radius)  <= (gameState.CPUPaddle.y + gameState.PaddleHeight))
        {
          if (import.meta.env.DEV){
          console.log('CPU Paddle Hit');
          }
          if(gameState.gameFlags.AudioPlayable === true){
            if((Math.floor(Math.random() * 2) === 0))
            {
              if (gameState.gameFlags.AudioPlayable === true && gameState.gameFlags.AudioMuted === false){
              gameState.paddleServe.play();
              }
            }
            else
            {
              if (gameState.gameFlags.AudioPlayable === true && gameState.gameFlags.AudioMuted === false){
              gameState.paddleHit.play();
              }
            }
          }
          gameState.Ball.divisor = Math.floor(Math.random() * 12);
          gameState.Ball.x -= gameState.PaddleWidth;
          gameState.Ball.velocityY = gameState.Ball.velocityY * 1;
          gameState.Ball.velocityX = gameState.Ball.velocityX * -1;
        }
        else if ((gameState.Ball.x - gameState.Ball.radius)  >= gameState.PlayerPaddle.x  && (gameState.Ball.x - gameState.Ball.radius)  <= (gameState.PlayerPaddle.x + gameState.PaddleWidth ) &&  (gameState.Ball.y - gameState.Ball.radius)  >= gameState.PlayerPaddle.y &&  (gameState.Ball.y - gameState.Ball.radius)   <= (gameState.PlayerPaddle.y + gameState.PaddleHeight))
        {
          if (import.meta.env.DEV){
          console.log('Player Paddle Hit');
          }
          if(gameState.gameFlags.AudioPlayable === true){
            if((Math.floor(Math.random() * 2) === 0))
            {
              if (gameState.gameFlags.AudioPlayable === true && gameState.gameFlags.AudioMuted === false){
              gameState.paddleServe.play();
              }
            }
            else
            {
              if (gameState.gameFlags.AudioPlayable === true && gameState.gameFlags.AudioMuted === false){
              gameState.paddleHit.play();
              }
            }
          }
          if( firstController !== null && typeof firstController !== 'undefined' && 'vibrationActuator' in firstController && 'connected' in firstController && firstController.connected === true)
          {
            firstController = Gamepads[firstController.index];
            firstController.vibrationActuator.playEffect('dual-rumble', {
              startDelay: 0,
              duration: 50,
              weakMagnitude: 0.75,
              strongMagnitude: 0.75,
            });
          }
          gameState.Ball.divisor = Math.floor(Math.random() * 12);
          gameState.Ball.x += gameState.PaddleWidth;
          gameState.Ball.velocityY = gameState.Ball.velocityY * 1;
          gameState.Ball.velocityX = gameState.Ball.velocityX * -1;
        }
  
        //y up and down x left to right
        if(gameState.gameFlags.StartGame)
        {
          gameState.Ball.x += gameState.Ball.velocityX * deltaTime;
          gameState.Ball.y += (gameState.Ball.velocityY / 2) * deltaTime;
        }
      //gameState.Ball.x = 100;
      //gameState.Ball.y = 354;
    }
  
      // Background
      gameState.ctx.fillStyle = gameState.BackgroundColor;
      gameState.ctx.fillRect(0, 0, gameState.gameBoardWidth, gameState.gameBoardHeight);
      gameState.ctx.stroke();
  
      gameState.ctx.font = `40px Verdana`;
      //Player Score
      gameState.ctx.fillStyle = gameState.SpriteColor;
      gameState.ctx.fillText(gameState.PlayerScore.toString(), ((gameState.gameBoardWidth - 500) / 2), 100);
  
      //CPU Score
      gameState.ctx.fillStyle = gameState.SpriteColor;
      gameState.ctx.fillText(gameState.CPUScore.toString(), ((gameState.gameBoardWidth + 500) / 2), 100);
  
      //Net
      gameState.ctx.fillStyle = gameState.SpriteColor;
      for (let y = 0; y < gameState.gameBoardHeight; y += 80)
      {
        gameState.ctx.fillRect((gameState.gameBoardWidth / 2), y, 20, 40);
      }
      //Paddles
      if(gameState.gameFlags.StartGame === true)
      {
        gameState.ctx.roundRect(gameState.PlayerPaddle.x, gameState.PlayerPaddle.y, gameState.PaddleWidth, gameState.PaddleHeight, gameState.PaddleRad);
        gameState.ctx.fill();
        gameState.ctx.stroke();
  
        if (gameState.gameFlags.DrawBall === true)
        {
          if ((gameState.CPUPaddle.y + (gameState.CPUMovSpeed * deltaTime)) <= (gameState.Ball.y - (gameState.PaddleHeight / 2)) && ((gameState.CPUPaddle.y + gameState.PaddleHeight) + gameState.CPUMovSpeed) <= (gameState.gameBoardHeight - gameState.GameboardBoundary)  && (gameState.Ball.x >= (gameState.gameBoardWidth / 3)))
          {
            gameState.CPUPaddle.y += gameState.CPUMovSpeed * deltaTime;
          }
          else if ((gameState.CPUPaddle.y - (gameState.CPUMovSpeed * deltaTime)) >= gameState.GameboardBoundary && (gameState.Ball.x >= (gameState.gameBoardWidth / 3.5)))
          {
            gameState.CPUPaddle.y -= gameState.CPUMovSpeed * deltaTime;
          }
          else if ((gameState.CPUPaddle.y + (gameState.CPUMovSpeed * deltaTime)) >= gameState.gameBoardHeight && (gameState.Ball.x >= (gameState.gameBoardWidth / 2)))
          {
            gameState.CPUPaddle.y = ((gameState.gameBoardHeight / 2) - gameState.PaddleHeight);
          }
        }
        else if (gameState.CPUPaddle.y > gameState.gameBoardHeight)
        {
          gameState.CPUPaddle.y = (gameState.gameBoardHeight - gameState.PaddleHeight);
        }
        else if (((gameState.CPUPaddle.y + gameState.PaddleHeight) + gameState.CPUMovSpeed) <= (gameState.gameBoardHeight / 2))
        {
          gameState.CPUPaddle.y += (gameState.CPUMovSpeed * deltaTime);
        }
        else if(((gameState.CPUPaddle.y - gameState.PaddleHeight) - gameState.CPUMovSpeed) >= (gameState.gameBoardHeight / 2))
        {
          gameState.CPUPaddle.y -= (gameState.CPUMovSpeed * deltaTime);
        }
        gameState.ctx.roundRect(gameState.CPUPaddle.x, gameState.CPUPaddle.y, gameState.PaddleWidth, gameState.PaddleHeight, gameState.PaddleRad);
        gameState.ctx.fill();
        gameState.ctx.stroke();
  
        if(gameState.gameFlags.DrawBall === true){
        gameState.ctx.beginPath();
        gameState.ctx.arc(gameState.Ball.x, gameState.Ball.y, gameState.BallRad, 0, 2 * Math.PI);
        gameState.ctx.fill();
        gameState.ctx.stroke();
        }
      }
      gameState.previousTimeStamp = timeStamp;
      if(gameState.frameId !== null)
      {
        gameState.frameId = window.requestAnimationFrame(gameState.Renderer.Draw);
      }
    }
  }
    gameState.GamepadHandler = { EventHandler(event)
    {
      switch(event.type)
      {
        case 'gamepadconnected':
          {
            if (import.meta.env.DEV){
          console.log('Gamepad connected');
            }
          if(event.gamepad.mapping !== '')
          {
            gameState.ControllerSlots[event.gamepad.index] = event.gamepad;
          }
          break;
          }
          case 'gamepaddisconnected':
          {
          delete gameState.ControllerSlots[event.gamepad.index];
          if (import.meta.env.DEV){
          console.log('Gamepad disconnected');
          }
          break;
          }
      }
    }
  }
  gameState.GameHandler = { StartGame()
  {
    gameState.gameFlags.StartGame = true;
    gameState.PlayerScore = 0;
    gameState.CPUScore = 0;
    gameState.Ball.x = (gameState.gameBoardWidth / 2);
    gameState.Ball.y = Math.floor(Math.random() * gameState.gameBoardHeight);
    gameState.BallMovSpeed = gameState.DefaultSpeed;
    gameState.CPUMovSpeed = gameState.DefaultSpeed;
    gameState.LeaderBoardTime = Date.now();
    gameState.BallSpawnDelay = Date.now() + 4000;
    gameState.PlayerScore = 0;
    gameState.CPUScore = 0;
    document.body.style.setProperty('--main-gameControl-display', 'block');
    if(gameState.gameFlags.Debug)
    {
      gameState.gameFlags.DrawBall = true;
      gameState.BallSpawnDelay = 0;
    }
    if(gameState.frameId === null)
    {
    gameState.frameId = window.requestAnimationFrame(gameState.Renderer.Draw);
    }
    if(window.innerWidth == screen.width && window.innerHeight == screen.height) {
      gameState.FullScreenHandler;
    }
  },
  EndGame()
  {
    gameState.gameFlags.StartGame = false;
    gameState.Ball = { 'x' : 0, 'y' : 0, 'radius' : gameState.BallRad, 'velocityY' : gameState.BallMovSpeed, 'velocityX' : gameState.BallMovSpeed, 'divisor' : 2};
    if(gameState.frameId)
    {
      window.cancelAnimationFrame(gameState.frameId);
      document.body.style.setProperty('--main-gameControl-display', 'none');
      gameState.frameId = null;
    }
  }
  }
  window.addEventListener('gamepadconnected', gameState.GamepadHandler.EventHandler, false);
  window.addEventListener('gamepaddisconnected', gameState.GamepadHandler.EventHandler, false);

  gameState.GameHandler.StartGame(0, true);
    return () => {
      gameState.GameHandler.EndGame();
    };
  }, [gameState, bDebug]);
  
  let keyBoardIcon_W_Key_Path = '';
  let keyBoardIcon_S_Key_Path = '';
  let keyBoardIcon_Up_Key_Path = '';
  let keyBoardIcon_Down_Key_Path = '';
  let keyBoardIcon_Enter_Key_Path = '';
  let keyBoardIcon_F11_Key_Path = '';
  let keyBoardIcon_C_Key_Path = '';
  let MouseIcon_Path = '';
  let GameControlsContext = useContext(ContentContext);
  switch (GameControlsContext.ContentState.theme)
  {
      case 'dark':
      {
        keyBoardIcon_W_Key_Path = '/icons/TPONG/W_Key_Light.png';
        keyBoardIcon_S_Key_Path = '/icons/TPONG/S_Key_Light.png';
        keyBoardIcon_Up_Key_Path = '/icons/TPONG/Arrow_Up_Key_Light.png';
        keyBoardIcon_Down_Key_Path = '/icons/TPONG/Arrow_Down_Key_Light.png';
        MouseIcon_Path = '/icons/TPONG/Mouse_Simple_Key_Light.png';
        keyBoardIcon_F11_Key_Path = '/icons/TPONG/F11_Key_Light.png';
        keyBoardIcon_Enter_Key_Path = '/icons/TPONG/Enter_Key_Light.png';
        keyBoardIcon_C_Key_Path = '/icons/TPONG/C_Key_Light.png';
        break;
      }
      case 'light':
      {
        keyBoardIcon_W_Key_Path = '/icons/TPONG/W_Key_Dark.png';
        keyBoardIcon_S_Key_Path = '/icons/TPONG/S_Key_Dark.png';
        keyBoardIcon_Up_Key_Path = '/icons/TPONG/Arrow_Up_Key_Dark.png';
        keyBoardIcon_Down_Key_Path = '/icons/TPONG/Arrow_Down_Key_Dark.png';
        MouseIcon_Path = '/icons/TPONG/Mouse_Simple_Key_Dark.png';
        keyBoardIcon_F11_Key_Path = '/icons/TPONG/F11_Key_Dark.png';
        keyBoardIcon_Enter_Key_Path = '/icons/TPONG/Enter_Key_Dark.png';
        keyBoardIcon_C_Key_Path = '/icons/TPONG/C_Key_Dark.png';
        break;
      }
      default:
      {
        keyBoardIcon_W_Key_Path = '/icons/TPONG/W_Key_Dark.png';
        keyBoardIcon_S_Key_Path = '/icons/TPONG/S_Key_Dark.png';
        keyBoardIcon_Up_Key_Path = '/icons/TPONG/Arrow_Up_Key_Dark.png';
        keyBoardIcon_Down_Key_Path = '/icons/TPONG/Arrow_Down_Key_Dark.png';
        MouseIcon_Path = '/icons/TPONG/Mouse_Simple_Key_Dark.png';
        keyBoardIcon_F11_Key_Path = '/icons/TPONG/F11_Key_Dark.png';
        keyBoardIcon_Enter_Key_Path = '/icons/TPONG/Enter_Key_Dark.png';
        keyBoardIcon_C_Key_Path = '/icons/TPONG/C_Key_Dark.png';
        break;
      }
  }
  if(GameControlsContext.ContentState.UpdateImgLightArray.findIndex((e) => (e.ElementName === 'keyBoardIcon_W_Key')) === -1)
  {
    
    GameControlsContext.ContentState.UpdateImgLightArray.push({'ElementName' : 'keyBoardIcon_W_Key', 'LightSvgPath' : '/icons/TPONG/W_Key_Dark.png', 'DarkSvgPath' : '/icons/TPONG/W_Key_Light.png'});
    GameControlsContext.ContentState.UpdateImgLightArray.push({'ElementName' : 'keyBoardIcon_S_Key', 'LightSvgPath' : '/icons/TPONG/S_Key_Dark.png', 'DarkSvgPath' : '/icons/TPONG/S_Key_Light.png'});
    GameControlsContext.ContentState.UpdateImgLightArray.push({'ElementName' : 'keyBoardIcon_Up_Key', 'LightSvgPath' : '/icons/TPONG/Arrow_Up_Key_Dark.png', 'DarkSvgPath' : '/icons/TPONG/Arrow_Down_Key_Light.png'});
    GameControlsContext.ContentState.UpdateImgLightArray.push({'ElementName' : 'keyBoardIcon_Down_Key', 'LightSvgPath' : '/icons/TPONG/Arrow_Down_Key_Dark.png', 'DarkSvgPath' : '/icons/TPONG/Arrow_Down_Key_Light.png'});
    GameControlsContext.ContentState.UpdateImgLightArray.push({'ElementName' : 'MouseIcon', 'LightSvgPath' : '/icons/TPONG/Mouse_Simple_Key_Dark.png', 'DarkSvgPath' : '/icons/TPONG/Mouse_Simple_Key_Light.png'});
    GameControlsContext.ContentState.UpdateImgLightArray.push({'ElementName' : 'keyBoardIcon_Enter_Key', 'LightSvgPath' : '/icons/TPONG/Enter_Key_Dark.png', 'DarkSvgPath' : '/icons/TPONG/Enter_Key_Light.png'});
    GameControlsContext.ContentState.UpdateImgLightArray.push({'ElementName' : 'keyBoardIcon_F11_Key', 'LightSvgPath' : '/icons/TPONG/F11_Key_Dark.png', 'DarkSvgPath' : '/icons/TPONG/F11_Key_Light.png'});
    GameControlsContext.ContentState.UpdateImgLightArray.push({'ElementName' : 'keyBoardIcon_C_Key', 'LightSvgPath' : '/icons/TPONG/C_Key_Dark.png', 'DarkSvgPath' : '/icons/TPONG/C_Key_Light.png'});
  }
  return (
  <>
  <input type='button' value={controlText} className='gameControlsMouse' onClick={() => {
    let bShowControls = true;
    switch (getComputedStyle(document.body).getPropertyValue('--main-gameControl-visibility'))
    {
      case 'visible':
      {
        document.body.style.setProperty('--main-gameControl-visibility', 'hidden');
        bShowControls = false;
        setControlText('Show Controls');
        break;
      }
      case 'hidden':
      {
        document.body.style.setProperty('--main-gameControl-visibility', 'visible');
        bShowControls = true;
        setControlText('Hide Controls');
        break;
      }
      default:
      {
        if (import.meta.env.DEV){
          console.warn('Warning: the main gamecontrol display css variable was set to this unknown value: \'' + getComputedStyle(document.body).getPropertyValue('--main-gameControl-visibility') + '\'');
        }
        document.body.style.setProperty('--main-gameControl-visibility', 'visible');
        bShowControls = true;
        break;
      }
    }
    if (gameState.gameFlags.localStorage === true) {
      localStorage.setItem('savedPreferences', JSON.stringify({'savedPalette' : gameState.selectedPalette, 'savedControlsPreference' : {'ShowControls' : bShowControls, 'AudioMuted' : gameState.gameFlags.AudioMuted}}));
        }
  }}/>
    <input type='button' value={controlAudioText} className='gameControlsMouseAudio' onClick={() => {
      if(gameState.gameFlags.AudioMuted === false)
      {
        gameState.gameFlags.AudioMuted = true;
        setControlAudioText('Turn on sound');
      }
      else
      {
        gameState.gameFlags.AudioMuted = false;
        setControlAudioText('Turn off sound');
      }
    if (gameState.gameFlags.localStorage === true) {
      localStorage.setItem('savedPreferences', JSON.stringify({'savedPalette' : gameState.selectedPalette, 'savedControlsPreference' : {'ShowControls' : gameState.gameFlags.ShowControls, 'AudioMuted' : gameState.gameFlags.AudioMuted}}));
        }
  }}/>
  <table className='gameControls'>
  <thead>
      <tr>
        <th colSpan='5'><b>Keyboard & Mouse Controls:</b><br></br></th>
      </tr>
    </thead>
    <tbody>
    <tr>
    </tr>
    <tr>
    <td><b>Up</b></td>
    <td><b>Down</b></td>
    <td><b>Cycle Colors</b></td>
    <td><b>Fullscreen</b></td>
    <td><b>Pause</b></td>
    </tr>
    <tr>
    <td><img width='50px' height='50px' alt='Mouse Up' onError={() =>
    {
      gameState.ctx.canvas.style.marginLeft = '1%';
      gameState.ctx.canvas.style.marginRight = 'auto';
    }} src={MouseIcon_Path} className='MouseIcon'/></td>
    <td><img width='50px' height='50px' alt='Mouse Down' src={MouseIcon_Path} className='MouseIcon'/></td>
    <td><img width='50px' height='50px' alt='C Key' src={keyBoardIcon_C_Key_Path} id='keyBoardIcon_C_Key'/></td>
    <td><img width='50px' height='50px' alt='F11 Key' src={keyBoardIcon_F11_Key_Path} id='keyBoardIcon_F11_Key'/></td>
    <td><img width='50px' height='50px' alt='Enter Key' src={keyBoardIcon_Enter_Key_Path} id='keyBoardIcon_Enter_Key'/></td>
    </tr>
    <tr>
    <td><img width='50px' height='50px' alt='W Key' src={keyBoardIcon_W_Key_Path} id='keyBoardIcon_W_Key'/></td>
    <td><img width='50px' height='50px' alt='S Key' src={keyBoardIcon_S_Key_Path} id='keyBoardIcon_S_Key'/></td>
    </tr>
    <tr>
    <td><img width='50px' height='50px' alt='Up Arrow Key' src={keyBoardIcon_Up_Key_Path} id='keyBoardIcon_Up_Key'/></td>
    <td><img width='50px' height='50px' alt='Down Arrow Key' src={keyBoardIcon_Down_Key_Path} id='keyBoardIcon_Down_Key'/></td>
    </tr>
  </tbody>
  <thead>
  <tr>
    <th colSpan='5'><b>Gamepad Controls:</b><br></br></th>
  </tr>
  </thead>
  <tbody>
  <tr>
    </tr>
    <tr>
    <td><b>Up</b></td>
    <td><b>Down</b></td>
    <td><b>Cycle Colors</b></td>
    <td><b>Fullscreen</b></td>
    <td><b>Pause</b></td>
    </tr>
    <tr>
    <td><img width='50px' height='50px' alt='Left Stick Up' src='\icons\TPONG\XboxSeriesX_Left_Stick.png'/></td>
    <td><img width='50px' height='50px' alt='Left Stick Down' src='\icons\TPONG\XboxSeriesX_Left_Stick.png'/></td>
    <td><img alt='Right & Left Bumpers' src='\icons\TPONG\XboxSeriesX_RB_LB.png'/></td>
    <td><img width='50px' height='50px' alt='Select Button'   src='\icons\TPONG\XboxSeriesX_View.png'/></td>
    <td><img width='50px' height='50px' alt='Start Button'  src='\icons\TPONG\XboxSeriesX_Menu.png'/></td>
    </tr>
    <tr>
    <td><img width='50px' height='50px' alt='Dpad Up' src='\icons\TPONG\XboxSeriesX_Dpad_Up.png'/></td>
    <td><img width='50px' height='50px' alt='Dpad Down'  src='\icons\TPONG\XboxSeriesX_Dpad_Down.png'/></td>
    </tr>
  </tbody>
    </table>
  <canvas ref={setGameState} onClick={ () => {
    gameState.gameFlags.AudioPlayable = true;
  }}></canvas>
  <Leaderboard/>
  </>
  );
}