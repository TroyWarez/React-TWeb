import { Container } from './Container';
import './TPONG.css';
import { getLightState, addLightImgElement } from './LightHandler'
let __TPONGHandler = null;
class GameHandler {
  constructor(props, gameSetup, bDebug) {
    this.props = props;
    this.paddleHitSound = 'sounds/TPONG/paddleHit.m4a'
    this.paddleServeSound = 'sounds/TPONG/paddleServe.m4a'
    this.tableHitSound = 'sounds/TPONG/tableHit.m4a'
    this.ScoreBeepSound = 'sounds/TPONG/score.m4a'
    this.PaddleHeight = 100;
    this.PaddleWidth = 10;
    this.PaddleRad = 20;
    this.DefaultWidth = 800;
    this.DefaultHeight = 600;
    this.DefaultSpeed = 0.45;
    this.DefaultCPUSpeed = 0.90;
    this.Red = '#7F0000';
    this.Green = '#007F00';
    this.Blue = '#00007F';
    this.Purple = '#814ED2';
    this.Black = '#00000';

    this.DimGray = '#767676';
    this.White = '#FFFFFF';

    this.canvasMarginLeft = 'auto';
    this.canvasMarginRight = 'auto';
    this.canvasStyleDisplay = 'inline-block';
    this.canvasStyleWidth = '800px';
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'mainGameboard';
    this.canvas.className = 'Article';
    this.canvas.tabIndex = '1';
    this.frameId = null;
    this.canvas.width = this.DefaultWidth;
    this.canvas.height = this.DefaultHeight;
    this.ColorPalettes = [{PaletteName : 'RedPalette', BackgroundColor : this.Red,  SpriteColor : this.White}, { PaletteName : 'GreenPalette', BackgroundColor : this.Green,  SpriteColor : this.White}, { PaletteName : 'BluePalette', BackgroundColor : this.Blue,  SpriteColor : this.White }, { PaletteName : 'PurplePalette', BackgroundColor : this.Purple,  SpriteColor : this.White}, { PaletteName : 'BlackPalette', BackgroundColor : this.Black,  SpriteColor : this.DimGray }];

    this.BallRad = 10;

    this.ctx = this.canvas.getContext('2d');

    this.ControllerSlots = new Array();
    this.ScalingFactorX = 1;
    this.ScalingFactorY = 1;

    this.previousTimeStamp = null;

    this.LeaderBoardTime = null;

    this.gameFlags = { 'GameSet': false, 'StartGame' : false, 'IdleMode': true, 'DrawBall' : false, 'Debug' : bDebug, 'AudioPlayable' : false, 'localStorage' : false } //booleans

    if (typeof(Storage) !== 'undefined') {
      this.gameFlags.localStorage = true;
      this.selectedPalette = localStorage.getItem('savedPalette');
      if(this.selectedPalette === null)
      {
           localStorage.setItem('savedPalette', JSON.stringify({ PaletteName : 'BlackPalette', BackgroundColor : this.Black,  SpriteColor : this.DimGray }));
           this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'BlackPalette');
      }
      else
      {
        if(typeof this.selectedPalette === 'undefined')
        {
          localStorage.setItem('savedPalette', JSON.stringify({ PaletteName : 'BlackPalette', BackgroundColor : this.Black,  SpriteColor : this.DimGray }));
          this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'BlackPalette');
        }
        else
        {
          this.selectedPalette = JSON.parse(this.selectedPalette);
        }
      }
   }
   else {
      this.gameFlags.localStorage = false;
      this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'BlackPalette');
   }

    this.BallMovSpeed = this.DefaultSpeed;
    this.CPUMovSpeed = this.DefaultCPUSpeed;

    this.PlayerMovSpeedFull = this.DefaultSpeed;
    this.PlayerMovSpeedHalf = (this.DefaultSpeed / 2);
    this.PlayerMovSpeedQuater = (this.DefaultSpeed / 4);
    this.BackgroundColor = '#00000';
    this.SpriteColor = '#767676';
    this.gameBoardWidth = this.DefaultWidth;
    this.gameBoardHeight = this.DefaultHeight;

    this.canvas.style.paddingLeft = 0;
    this.canvas.style.paddingRight = 0;
    this.canvas.style.marginLeft = this.canvasMarginLeft;
    this.canvas.style.marginRight = this.canvasMarginRight;
    this.canvas.style.display = this.canvasStyleDisplay;
    this.canvas.style.width = this.canvasStyleWidth;

    this.Ball = { 'x' : 0, 'y' : 0, 'radius' : this.BallRad, 'velocityY' : this.BallMovSpeed, 'velocityX' : this.BallMovSpeed, 'divisor' : 2};
    this.PlayerPaddle = { 'x' : this.PaddleHeight, 'y' : ((this.DefaultHeight / 2) - this.PaddleHeight) };
    this.CPUPaddle = { 'x' : 0, 'y' : 0 };

    this.PlayerScore = 1;
    this.CPUScore = 1;

    //Debug element array
    this.gameElements = [this.PlayerPaddle, this.CPUPaddle, this.Ball];
    this.SelectedElement = {'gameElement' : null, 'Index' : 0 };
    this.BallSpawnDelay = 0;

    this.lastKey = '';
    this.lastController = null;
    this.GameboardBoundary = 30;

    this.paddleHit = new Audio(this.paddleHitSound);
    this.paddleServe = new Audio(this.paddleServeSound);
    this.tableHit = new Audio(this.tableHitSound);
    this.ScoreBeep = new Audio(this.ScoreBeepSound);

    this.GamepadHandler = this.GamepadHandler.bind(this);
    this.MouseHandler = this.MouseHandler.bind(this);

    document.addEventListener('click', () => {
      this.gameFlags.AudioPlayable = true;
      /* the audio is now playable; play it if permissions allow */
      if (import.meta.env.DEV){
      console.log('The audio is now playable. ');
    }
    });
    document.addEventListener('pointerlockchange', () => {
      if(document.pointerLockElement === this.canvas) {
        document.addEventListener('mousemove', this.MouseHandler, false);
      }
      else {
        document.removeEventListener('mousemove', this.MouseHandler, false);
      }
    }, true);
    document.addEventListener('fullscreenchange', this.FullScreenHandler.bind(this));
    this.canvas.addEventListener('click', async () => {
      if (!this.canvas.pointerLockElement)
      {
        try{
        await this.canvas.requestPointerLock({
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
      if(event.key === this.lastKey)
      {
        this.lastKey = '';
      }
    }, true);
    window.addEventListener('keydown', (event) => {
      this.lastKey = event.key;
      if(this.gameFlags.Debug === 1)
      {
        console.log(event.key);
      }
      if(event.repeat === false)
      {
      switch(event.key) {
        case 'c': //Red
        {
        let PattleIndex = this.ColorPalettes.findIndex(x => x.PaletteName === this.selectedPalette.PaletteName);
        if((PattleIndex + 1) < this.ColorPalettes.length)
          {
            this.selectedPalette = this.ColorPalettes[(PattleIndex + 1)];
          }
          else
          {
            this.selectedPalette = this.ColorPalettes[0];
          }

          if(this.gameFlags.localStorage === true)
          {
            localStorage.setItem('savedPalette', JSON.stringify(this.selectedPalette));
          }
          break;
        }
        case '2': //Green
        {
          this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'GreenPalette');
          break;
        }
        case '3': // Blue
        {
          this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'BluePalette');
          break;
        } 
        case '4': // Purple
        {
          this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'PurplePalette');
          break;
        }
        case '5': // Black
        {
          this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'BlackPalette');
          break;
        }
        case 'Enter':
        {
          if(this.gameFlags.StartGame === true)
          {
            this.gameFlags.StartGame = false;
            this.BallMovSpeed = 0;
          }
          else
          {
            this.BallMovSpeed = this.DefaultSpeed;
            this.StartGame();
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

      if(this.gameFlags.localStorage === true)
      {
        localStorage.setItem('savedPalette', JSON.stringify(this.selectedPalette));
      }
    }
    }, true);
    window.addEventListener('gamepadconnected', this.GamepadHandler, false);
    window.addEventListener('gamepaddisconnected', this.GamepadHandler, false);
  }
  Draw(timeStamp)
  {
    let deltaTime = timeStamp - this.previousTimeStamp;
    if(deltaTime >= 500){
    this.previousTimeStamp = timeStamp;
    if(this.frameId !== null)
    {
      this.frameId = window.requestAnimationFrame(this.Draw.bind(this));
    }
  }
    this.ctx.canvas.width  = this.gameBoardWidth;
    this.ctx.canvas.height = this.gameBoardHeight;
    this.CPUPaddle.x = (this.gameBoardWidth - this.PaddleHeight);
    this.ScalingFactorX = (this.gameBoardWidth / this.DefaultWidth);
    this.ScalingFactorY = (this.gameBoardHeight / this.DefaultHeight);
    this.BallMovSpeed = (this.DefaultSpeed * (this.ScalingFactorX * 1.3));
    this.CPUMovSpeed = ((this.DefaultCPUSpeed / 4) * this.ScalingFactorY);
    
    this.PlayerMovSpeedFull = (this.DefaultSpeed * this.ScalingFactorY);
    this.PlayerMovSpeedHalf = (this.DefaultSpeed * this.ScalingFactorY);
    this.PlayerMovSpeedQuater = (this.DefaultSpeed * this.ScalingFactorY);

    let Gamepads = navigator.getGamepads 
      ? navigator.getGamepads() 
      : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : [0])
      
    let firstController = this.ControllerSlots.find(x => typeof x !== 'undefined');
    if( firstController !== null && typeof firstController !== 'undefined' && 'buttons' in firstController && 'connected' in firstController && firstController.connected === true)
    {
      firstController = Gamepads[firstController.index];
      if (firstController.buttons[4].value === 1 && this.lastController !== null && this.lastController.buttons[4].value !== 1) {
        let PattleIndex = this.ColorPalettes.findIndex(x => x.PaletteName === this.selectedPalette.PaletteName);
        if((PattleIndex + 1) < this.ColorPalettes.length)
          {
            this.selectedPalette = this.ColorPalettes[(PattleIndex + 1)];
          }
          else
          {
            this.selectedPalette = this.ColorPalettes[0];
          }

          if(this.gameFlags.localStorage === true)
          {
            localStorage.setItem('savedPalette', JSON.stringify(this.selectedPalette));
          }
      }
      else if (firstController.buttons[5].value === 1 && this.lastController !== null && this.lastController.buttons[5].value !== 1) {
        let PattleIndex = this.ColorPalettes.findIndex(x => x.PaletteName === this.selectedPalette.PaletteName);
        if((PattleIndex + 1) < this.ColorPalettes.length)
          {
            this.selectedPalette = this.ColorPalettes[(PattleIndex + 1)];
          }
          else
          {
            this.selectedPalette = this.ColorPalettes[0];
          }

          if(this.gameFlags.localStorage === true)
          {
            localStorage.setItem('savedPalette', JSON.stringify(this.selectedPalette));
          }
      }
      else if (firstController.buttons[8].value === 1 && this.lastController !== null && this.lastController.buttons[8].value !== 1) {
        if(this.gameFlags.StartGame === true)
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
      else if (firstController.buttons[9].value === 1 && this.lastController !== null && this.lastController.buttons[9].value !== 1) { // Start
        if(this.gameFlags.StartGame === true)
        {
          this.gameFlags.StartGame = false;
          this.BallMovSpeed = 0;
        }
        else
        {
          this.BallMovSpeed = this.DefaultSpeed;
          this.StartGame();
        }
      }
      if (firstController.buttons[12].value === 1 && this.lastKey === '') {// Up
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y - (this.PlayerMovSpeedFull * deltaTime)) >= this.GameboardBoundary)
          {
            this.PlayerPaddle.y -= (this.PlayerMovSpeedFull * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }
      else if (firstController.buttons[13].value === 1 && this.lastKey === '') {// Down
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y + (this.PlayerMovSpeedFull * deltaTime)) <= ((this.gameBoardHeight - this.GameboardBoundary) - this.PaddleHeight))
          {
            this.PlayerPaddle.y += (this.PlayerMovSpeedFull * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }

      if(firstController.axes[1] <= -0.75)//Left analog
      {
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y - (this.PlayerMovSpeedFull * deltaTime)) >= this.GameboardBoundary)
          {
            this.PlayerPaddle.y -= (this.PlayerMovSpeedFull * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }
      else if(firstController.axes[1] <= -0.5)//Left analog
      {
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y - (this.PlayerMovSpeedHalf * deltaTime)) >= this.GameboardBoundary)
          {
            this.PlayerPaddle.y -= (this.PlayerMovSpeedHalf * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }
      else if(firstController.axes[1] <= -0.35)//Left analog
      {
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y - (this.PlayerMovSpeedQuater * deltaTime)) >= this.GameboardBoundary)
          {
            this.PlayerPaddle.y -= (this.PlayerMovSpeedQuater * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }
      else if(firstController.axes[1] >= 0.75)//Left analog
      {
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y + (this.PlayerMovSpeedFull * deltaTime)) <= ((this.gameBoardHeight - this.GameboardBoundary) - this.PaddleHeight))
          {
            this.PlayerPaddle.y += (this.PlayerMovSpeedFull * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }
      else if(firstController.axes[1] >= 0.5)//Left analog
      {
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y + (this.PlayerMovSpeedHalf * deltaTime)) <= ((this.gameBoardHeight - this.GameboardBoundary) - this.PaddleHeight))
          {
            this.PlayerPaddle.y += (this.PlayerMovSpeedHalf * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }
      else if(firstController.axes[1] >= 0.35)//Left analog
      {
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y + (this.PlayerMovSpeedQuater * deltaTime)) <= ((this.gameBoardHeight - this.GameboardBoundary) - this.PaddleHeight))
          {
            this.PlayerPaddle.y += (this.PlayerMovSpeedQuater * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }
      this.lastController = firstController;
    }

    if (this.lastKey === 'ArrowUp' || this.lastKey === 'w') {// Up keyboard
      if(this.gameFlags.StartGame === true)
      {
        if ((this.PlayerPaddle.y - (this.PlayerMovSpeedFull * deltaTime)) >= this.GameboardBoundary)
        {
          this.PlayerPaddle.y -= (this.PlayerMovSpeedFull * deltaTime);
        }
        else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
        {
          this.PlayerPaddle.y = (this.gameBoardHeight / 2);
        }
      }
    }
    else if (this.lastKey === 'ArrowDown' || this.lastKey === 's') {// Down keyboard
      if(this.gameFlags.StartGame === true)
      {
        if ((this.PlayerPaddle.y + (this.PlayerMovSpeedFull * deltaTime)) <= ((this.gameBoardHeight - this.GameboardBoundary) - this.PaddleHeight))
        {
          this.PlayerPaddle.y += (this.PlayerMovSpeedFull * deltaTime);
        }
        else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
        {
          this.PlayerPaddle.y = (this.gameBoardHeight / 2);
        }
      }
    }
    
    this.BackgroundColor = this.selectedPalette.BackgroundColor;
    this.SpriteColor = this.selectedPalette.SpriteColor;

    if (import.meta.env.DEV){
    //console.log('Width:' + this.ctx.canvas.width);
    //console.log('Height:' + this.ctx.canvas.height);
    }
    //Game Logic
    if( this.BallSpawnDelay < Date.now()  && this.BallSpawnDelay !== 0){
      this.Ball.x = (this.gameBoardWidth / 2);
      this.Ball.y = Math.floor(Math.random() * this.gameBoardHeight);
      this.gameFlags.DrawBall = true;
      this.BallSpawnDelay = 0;
    }
    if (this.gameFlags.DrawBall === true){
      if ((this.Ball.x + this.Ball.radius) < 0)//CPU Scored
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
        this.Ball.divisor = 1;
        this.CPUScore++;
        this.BallSpawnDelay = Date.now() + 4000;
        this.gameFlags.DrawBall = false;
        if(this.gameFlags.AudioPlayable === true)
        {
          if (!import.meta.env.DEV){
          this.ScoreBeep.play();
          }
        }
      }
      else if ((this.Ball.x - this.Ball.radius) > (this.gameBoardWidth))//Player Scored
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
        this.Ball.divisor = 1;
        this.PlayerScore++;
        this.BallSpawnDelay = Date.now() + 4000;
        this.gameFlags.DrawBall = false;
        if(this.gameFlags.AudioPlayable === true)
        {
          if (!import.meta.env.DEV){
          this.ScoreBeep.play();
          }
        }
      }
      else if ((this.Ball.y + this.Ball.radius) >= (this.gameBoardHeight))
      {
        if(this.gameFlags.AudioPlayable === true){
          if (!import.meta.env.DEV){
        this.tableHit.play();
          }
        }
        this.Ball.velocityY = this.Ball.velocityY * -1;
        this.Ball.velocityX = this.Ball.velocityX * 1;
        this.Ball.y -= this.PaddleWidth;
      }
      else if ((this.Ball.y - this.Ball.radius) <= 0)
      {
        if(this.gameFlags.AudioPlayable === true){
          if (!import.meta.env.DEV){
        this.tableHit.play();
          }
        }
        this.Ball.velocityY = this.Ball.velocityY * -1;
        this.Ball.velocityX = this.Ball.velocityX * 1;
        this.Ball.y += this.PaddleWidth;
      }
      else if ((this.Ball.x + this.Ball.radius) >= this.CPUPaddle.x  && (this.Ball.x + this.Ball.radius) <= (this.CPUPaddle.x + this.PaddleWidth ) &&  this.Ball.y >= this.CPUPaddle.y &&  (this.Ball.y + this.Ball.radius)  <= (this.CPUPaddle.y + this.PaddleHeight))
      {
        if (import.meta.env.DEV){
        console.log('CPU Paddle Hit');
        }
        if(this.gameFlags.AudioPlayable === true){
          if((Math.floor(Math.random() * 2) === 0))
          {
            if (!import.meta.env.DEV){
            this.paddleServe.play();
            }
          }
          else
          {
            if (!import.meta.env.DEV){
            this.paddleHit.play();
            }
          }
        }
        this.Ball.divisor = Math.floor(Math.random() * 12);
        this.Ball.x -= this.PaddleWidth;
        this.Ball.velocityY = this.Ball.velocityY * 1;
        this.Ball.velocityX = this.Ball.velocityX * -1;
      }
      else if ((this.Ball.x - this.Ball.radius)  >= this.PlayerPaddle.x  && (this.Ball.x - this.Ball.radius)  <= (this.PlayerPaddle.x + this.PaddleWidth ) &&  (this.Ball.y - this.Ball.radius)  >= this.PlayerPaddle.y &&  (this.Ball.y - this.Ball.radius)   <= (this.PlayerPaddle.y + this.PaddleHeight))
      {
        if (import.meta.env.DEV){
        console.log('Player Paddle Hit');
        }
        if(this.gameFlags.AudioPlayable === true){
          if((Math.floor(Math.random() * 2) === 0))
          {
            if (!import.meta.env.DEV){
            this.paddleServe.play();
            }
          }
          else
          {
            if (!import.meta.env.DEV){
            this.paddleHit.play();
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
        this.Ball.divisor = Math.floor(Math.random() * 12);
        this.Ball.x += this.PaddleWidth;
        this.Ball.velocityY = this.Ball.velocityY * 1;
        this.Ball.velocityX = this.Ball.velocityX * -1;
      }

      //y up and down x left to right
      if(this.gameFlags.StartGame)
      {
        this.Ball.x += this.Ball.velocityX * deltaTime;
        this.Ball.y += (this.Ball.velocityY / 2) * deltaTime;
      }
    //this.Ball.x = 100;
    //this.Ball.y = 354;
  }

    // Background
    this.ctx.fillStyle = this.BackgroundColor;
    this.ctx.fillRect(0, 0, this.gameBoardWidth, this.gameBoardHeight);
    this.ctx.stroke();

    this.ctx.font = `40px Verdana`;
    //Player Score
    this.ctx.fillStyle = this.SpriteColor;
    this.ctx.fillText(this.PlayerScore.toString(), ((this.gameBoardWidth - 500) / 2), 100);

    //CPU Score
    this.ctx.fillStyle = this.SpriteColor;
    this.ctx.fillText(this.CPUScore.toString(), ((this.gameBoardWidth + 500) / 2), 100);

    //Net
    this.ctx.fillStyle = this.SpriteColor;
    for (let y = 0; y < this.gameBoardHeight; y += 80)
    {
      this.ctx.fillRect((this.gameBoardWidth / 2), y, 20, 40);
    }
    //Paddles
    if(this.gameFlags.StartGame === true)
    {
      this.ctx.roundRect(this.PlayerPaddle.x, this.PlayerPaddle.y, this.PaddleWidth, this.PaddleHeight, this.PaddleRad);
      this.ctx.fill();
      this.ctx.stroke();

      if (this.gameFlags.DrawBall === true)
      {
        if ((this.CPUPaddle.y + (this.CPUMovSpeed * deltaTime)) <= (this.Ball.y - (this.PaddleHeight / 2)) && ((this.CPUPaddle.y + this.PaddleHeight) + this.CPUMovSpeed) <= (this.gameBoardHeight - this.GameboardBoundary)  && (this.Ball.x >= (this.gameBoardWidth / 3)))
        {
          this.CPUPaddle.y += this.CPUMovSpeed * deltaTime;
        }
        else if ((this.CPUPaddle.y - (this.CPUMovSpeed * deltaTime)) >= this.GameboardBoundary && (this.Ball.x >= (this.gameBoardWidth / 3)))
        {
          this.CPUPaddle.y -= this.CPUMovSpeed * deltaTime;
        }
        else if ((this.CPUPaddle.y + (this.CPUMovSpeed * deltaTime)) >= this.gameBoardHeight && (this.Ball.x >= (this.gameBoardWidth / 2)))
        {
          this.CPUPaddle.y = ((this.gameBoardHeight / 2) - this.PaddleHeight);
        }
      }
      else if (this.CPUPaddle.y > this.gameBoardHeight)
      {
        this.CPUPaddle.y = (this.gameBoardHeight - this.PaddleHeight);
      }
      else if (((this.CPUPaddle.y + this.PaddleHeight) + this.CPUMovSpeed) <= (this.gameBoardHeight / 2))
      {
        this.CPUPaddle.y += (this.CPUMovSpeed * deltaTime);
      }
      else if(((this.CPUPaddle.y - this.PaddleHeight) - this.CPUMovSpeed) >= (this.gameBoardHeight / 2))
      {
        this.CPUPaddle.y -= (this.CPUMovSpeed * deltaTime);
      }
      this.ctx.roundRect(this.CPUPaddle.x, this.CPUPaddle.y, this.PaddleWidth, this.PaddleHeight, this.PaddleRad);
      this.ctx.fill();
      this.ctx.stroke();

      if(this.gameFlags.DrawBall === true){
      this.ctx.beginPath();
      this.ctx.arc(this.Ball.x, this.Ball.y, this.BallRad, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      }
    }
    this.previousTimeStamp = timeStamp;
    if(this.frameId !== null)
    {
      this.frameId = window.requestAnimationFrame(this.Draw.bind(this));
    }
  }
  GamepadHandler(event)
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
          this.ControllerSlots[event.gamepad.index] = event.gamepad;
        }
        break;
        }
        case 'gamepaddisconnected':
        {
        delete this.ControllerSlots[event.gamepad.index];
        if (import.meta.env.DEV){
        console.log('Gamepad disconnected');
        }
        break;
        }
    }
  }
  MouseHandler(event) {
    let movementY = event.movementY ||
    event.mozMovementY      ||
    event.webkitMovementY   ||
        0;

    if(this.gameFlags.StartGame === true)
    {
      if (((this.PlayerPaddle.y - this.GameboardBoundary) + movementY) >= 0 && (this.PlayerPaddle.y + movementY) <= ((this.gameBoardHeight - this.GameboardBoundary) - this.PaddleHeight))
      {
        this.PlayerPaddle.y += movementY;
      }
      else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
      {
        this.PlayerPaddle.y = (this.gameBoardHeight / 2);
      }
    }
    if(this.frameId !== null)
    {
    this.frameId = window.requestAnimationFrame(this.MouseHandler);
    }
  }

  FullScreenHandler() {
    if(this.gameFlags.StartGame){
    if (document.fullScreen || 
        document.mozFullScreen || 
        document.webkitIsFullScreen) {

      this.BallSpawnDelay = Date.now() + 4000;
        if (import.meta.env.DEV){
          console.log('Entered Full Screen');
          this.BallSpawnDelay = Date.now();
        }
      this.gameFlags.DrawBall = false;
      this.PlayerPaddle = { 'x' : this.PaddleHeight, 'y' : ((this.gameBoardHeight / 2) - this.PaddleHeight) };
      this.gameBoardWidth = window.screen.width;
      this.gameBoardHeight = window.screen.height;
      this.Ball = { 'x' : 10, 'y' : 10, 'radius' : this.BallRad, 'velocityY' : this.BallMovSpeed, 'velocityX' : this.BallMovSpeed, 'divisor' : 2};
      this.canvas.style.paddingLeft = 0;
      this.canvas.style.paddingRight = 0;
      this.canvas.style.marginLeft = 'auto';
      this.canvas.style.marginRight = 'auto';
      this.canvas.style.width = '';
      this.canvas.style.height = '';
      this.canvas.style.display = '';
      document.body.style.setProperty('--main-visibility', 'hidden');
      document.body.style.setProperty('--main-gameControl-visibility', 'hidden');
      document.body.style.setProperty('--main-gameControl-display', 'none');
      document.body.style.setProperty('--main-display-flex', 'none');
      document.body.style.setProperty('--main-display-flexbox', 'none');
      document.body.style.setProperty('--main-display-block', 'none');
      this.canvas.style.display = this.canvasStyleDisplay;
      document.body.style.width = window.screen.height;
      document.body.style.height = window.screen.width;
    } else {
      this.BallSpawnDelay = Date.now() + 4000;
      if (import.meta.env.DEV){
      console.log('Exited Full Screen');
      this.BallSpawnDelay = Date.now();
      }
      this.gameFlags.DrawBall = false;
      this.BallMovSpeed = 0.45;
      this.gameBoardWidth = this.DefaultWidth;
      this.gameBoardHeight = this.DefaultHeight;
      this.PlayerPaddle = { 'x' : this.PaddleHeight, 'y' : ((this.gameBoardHeight / 2) - this.PaddleHeight) };
      this.Ball = { 'x' : (this.gameBoardWidth / 2), 'y' : Math.floor(Math.random() * this.gameBoardHeight), 'radius' : this.BallRad, 'velocityY' : this.BallMovSpeed, 'velocityX' : this.BallMovSpeed, 'divisor' : 2};
      document.body.style.setProperty('--main-visibility', 'visible');
      document.body.style.setProperty('--main-gameControl-visibility', 'visible');
      document.body.style.setProperty('--main-gameControl-display', 'block');
      document.body.style.setProperty('--main-display-flex', 'flex');
      document.body.style.setProperty('--main-display-flexbox', 'flexbox');
      document.body.style.setProperty('--main-display-block', 'block');
    }
  }
  }
  getGameComponent(){
    let keyBoardIcon_W_Key_Path = '';
    let keyBoardIcon_S_Key_Path = '';
    let keyBoardIcon_Up_Key_Path = '';
    let keyBoardIcon_Down_Key_Path = '';
    let keyBoardIcon_Enter_Key_Path = '';
    let keyBoardIcon_F11_Key_Path = '';
    let keyBoardIcon_C_Key_Path = '';
    let MouseIcon_Path = '';

    addLightImgElement('keyBoardIcon_W_Key', '/icons/TPONG/W_Key_Dark.png', '/icons/TPONG/W_Key_Light.png');
    addLightImgElement('keyBoardIcon_S_Key','/icons/TPONG/S_Key_Dark.png',  '/icons/TPONG/S_Key_Light.png');
    addLightImgElement('keyBoardIcon_Up_Key', '/icons/TPONG/Arrow_Up_Key_Dark.png', '/icons/TPONG/Arrow_Up_Key_Light.png');
    addLightImgElement('keyBoardIcon_Down_Key', '/icons/TPONG/Arrow_Down_Key_Dark.png', '/icons/TPONG/Arrow_Down_Key_Light.png');
    addLightImgElement('MouseIcon', '/icons/TPONG/Mouse_Simple_Key_Dark.png', '/icons/TPONG/Mouse_Simple_Key_Light.png');
    addLightImgElement('keyBoardIcon_Enter_Key', '/icons/TPONG/Enter_Key_Dark.png', '/icons/TPONG/Enter_Key_Light.png');
    addLightImgElement('keyBoardIcon_F11_Key','/icons/TPONG/F11_Key_Dark.png',  '/icons/TPONG/F11_Key_Light.png');
    addLightImgElement('keyBoardIcon_C_Key','/icons/TPONG/C_Key_Dark.png',  '/icons/TPONG/C_Key_Light.png');

    switch (getLightState())
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
    return (
    <>
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
    <td><img width='50px' height='50px' src={MouseIcon_Path} className='MouseIcon'/></td>
    <td><img width='50px' height='50px' src={MouseIcon_Path} className='MouseIcon'/></td>
    <td><img width='50px' height='50px' src={keyBoardIcon_C_Key_Path} id='keyBoardIcon_C_Key'/></td>
    <td><img width='50px' height='50px' src={keyBoardIcon_F11_Key_Path} id='keyBoardIcon_F11_Key'/></td>
    <td><img width='50px' height='50px' src={keyBoardIcon_Enter_Key_Path} id='keyBoardIcon_Enter_Key'/></td>
    </tr>
    <tr>
    <td><img width='50px' height='50px' src={keyBoardIcon_W_Key_Path} id='keyBoardIcon_W_Key'/></td>
    <td><img width='50px' height='50px' src={keyBoardIcon_S_Key_Path} id='keyBoardIcon_S_Key'/></td>
    </tr>
    <tr>
    <td><img width='50px' height='50px' src={keyBoardIcon_Up_Key_Path} id='keyBoardIcon_Up_Key'/></td>
    <td><img width='50px' height='50px' src={keyBoardIcon_Down_Key_Path} id='keyBoardIcon_Down_Key'/></td>
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
    <td><img width='50px' height='50px' src='\icons\TPONG\XboxSeriesX_Dpad_Up.png'/></td>
    <td><img width='50px' height='50px' src='\icons\TPONG\XboxSeriesX_Dpad_Down.png'/></td>
    <td><img src='\icons\TPONG\XboxSeriesX_RB_LB.png'/></td>
    <td><img width='50px' height='50px' src='\icons\TPONG\XboxSeriesX_View.png'/></td>
    <td><img width='50px' height='50px' src='\icons\TPONG\XboxSeriesX_Menu.png'/></td>
    </tr>
    <tr>
    <td><img width='50px' height='50px' src='\icons\TPONG\XboxSeriesX_Left_Stick.png'/></td>
    <td><img width='50px' height='50px' src='\icons\TPONG\XboxSeriesX_Left_Stick.png'/></td>
    </tr>
  </tbody>
  </table>
  <Container child={ this.canvas }/>
    </>
    );
  }
  
  StartGame()
  {
    this.gameFlags.StartGame = true;
    this.PlayerScore = 0;
    this.CPUScore = 0;
    this.Ball.x = (this.gameBoardWidth / 2);
    this.Ball.y = Math.floor(Math.random() * this.gameBoardHeight);
    this.BallMovSpeed = this.DefaultSpeed;
    this.CPUMovSpeed = this.DefaultSpeed;
    this.LeaderBoardTime = Date.now();
    this.BallSpawnDelay = Date.now() + 8000;
    this.PlayerScore = 0;
    this.CPUScore = 0;
    document.body.style.setProperty('--main-gameControl-display', 'block');
    if(this.gameFlags.Debug)
    {
      this.gameFlags.DrawBall = true;
      this.BallSpawnDelay = 0;
    }
    if(this.frameId === null)
    {
    this.frameId = window.requestAnimationFrame(this.Draw.bind(this));
    }
    if(window.innerWidth == screen.width && window.innerHeight == screen.height) {
      this.FullScreenHandler.bind(this);
    }
  }
  PauseGame()
  {
    this.gameFlags.StartGame = false;
    this.Ball = { 'x' : 0, 'y' : 0, 'radius' : this.BallRad, 'velocityY' : this.BallMovSpeed, 'velocityX' : this.BallMovSpeed, 'divisor' : 2};
    if(this.frameId)
    {
      window.cancelAnimationFrame(this.frameId);
      document.body.style.setProperty('--main-gameControl-display', 'none');
      this.frameId = null;
    }
  }
}
export function GameStart(gameSetup, bDebug) {
  if(__TPONGHandler === null)
  {
    __TPONGHandler = new GameHandler(null, gameSetup, bDebug);
  }
  if(__TPONGHandler !== null)
  {
  __TPONGHandler.StartGame();
  }
  return __TPONGHandler.getGameComponent();
}

export function EndGame() {
  if(__TPONGHandler !== null)
  {
      __TPONGHandler.PauseGame();
  }
  return __TPONGHandler;
}