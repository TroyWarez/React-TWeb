class GameHandler {
  Draw(timeStamp)
  {
    let deltaTime = timeStamp - this.previousTimeStamp;
    this.ctx.canvas.width  = this.gameBoardWidth;
    this.ctx.canvas.height = this.gameBoardHeight;
    this.CPUPaddle.x = (this.gameBoardWidth - this.PaddleHeight);
    this.ScalingFactorX = (this.gameBoardWidth / this.DefaultWidth);
    this.ScalingFactorY = (this.gameBoardHeight / this.DefaultHeight);
    this.BallMovSpeed = (0.45 * this.ScalingFactorX);
    this.CPUMovSpeed = (0.45 * this.ScalingFactorY);
    
    this.PlayerMovSpeedFull = (0.45 * this.ScalingFactorY);
    this.PlayerMovSpeedHalf = (0.45 * this.ScalingFactorY);
    this.PlayerMovSpeedQuater = (0.45 * this.ScalingFactorY);

    let Gamepads = navigator.getGamepads 
      ? navigator.getGamepads() 
      : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : [0])
      
    let firstController = this.ControllerSlots.find(x => typeof x !== 'undefined');
    //
    if( firstController !== null && typeof firstController !== 'undefined' && 'buttons' in firstController && 'connected' in firstController && firstController.connected === true)
    {
      firstController = Gamepads[firstController.index];
      if (firstController.buttons[4].value === 1 && this.lastController !== null && this.lastController.buttons[4].value !== 1) {
        let PattleIndex = this.ColorPalettes.findIndex(x => x.PaletteName === this.selectedPalette.PaletteName);
        if(PattleIndex !== -1 && (PattleIndex - 1) >= 0)
        {
          this.selectedPalette = this.ColorPalettes[(PattleIndex - 1)];
          if(this.gameFlags.localStorage === true)
          {
            localStorage.setItem('savedPalette', JSON.stringify(this.selectedPalette));
          }
        }
      }
      else if (firstController.buttons[5].value === 1 && this.lastController !== null && this.lastController.buttons[5].value !== 1) {
        let PattleIndex = this.ColorPalettes.findIndex(x => x.PaletteName === this.selectedPalette.PaletteName);
        if(PattleIndex !== -1 && (PattleIndex + 1) < this.ColorPalettes.length)
        {
          this.selectedPalette = this.ColorPalettes[(PattleIndex + 1)];
          if(this.gameFlags.localStorage === true)
          {
            localStorage.setItem('savedPalette', JSON.stringify(this.selectedPalette));
          }
        }
      }
      else if (firstController.buttons[8].value === 1 && this.lastController !== null && this.lastController.buttons[8].value !== 1) {
        if(this.gameFlags.StartGame === true)
        {
        if(document.fullScreen || 
          document.mozFullScreen || 
          document.webkitIsFullScreen) {
          window.document.exitFullscreen().catch((err) => {
              console.log(err);
          });
      } else {
          window.document.documentElement.requestFullscreen().catch((err) => {
              console.log(err);
          });
      }
    }
      }
      else if (firstController.buttons[9].value === 1 && this.lastController !== null && this.lastController.buttons[9].value !== 1) {
        if(this.gameFlags.StartGame === true)
        {
          this.gameFlags.StartGame = false;
          this.gameFlags.DrawBall = false;
          this.PlayerScore = 0;
          this.CPUScore = 0;
          this.Ball.x = 0;
          this.Ball.y = 0;
          this.PlayerPaddle = { 'x' : this.PaddleHeight, 'y' : ((this.gameBoardHeight / 2) - this.PaddleHeight) };
          this.CPUPaddle = { 'x' : 0, 'y' : 0 };
        }
        else
        {
          this.gameFlags.StartGame = true;
          this.gameFlags.DrawBall = true;
          this.PlayerScore = 0;
          this.CPUScore = 0;
          this.Ball.x = (this.gameBoardWidth / 2);
          this.Ball.y = Math.floor(Math.random() * this.gameBoardHeight);
        }
      }
      if (firstController.buttons[12].value === 1) {// Up
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y - (this.CPUMovSpeed * deltaTime)) >= this.GameboardBoundary)
          {
            this.PlayerPaddle.y -= (this.CPUMovSpeed * deltaTime);
          }
          else if (this.PlayerPaddle.y < 0 || this.PlayerPaddle.y > this.gameBoardHeight)// Paddle out of bounds
          {
            this.PlayerPaddle.y = (this.gameBoardHeight / 2);
          }
        }
      }
      else if (firstController.buttons[13].value === 1) {// Down
        if(this.gameFlags.StartGame === true)
        {
          if ((this.PlayerPaddle.y + (this.CPUMovSpeed * deltaTime)) <= ((this.gameBoardHeight - this.GameboardBoundary) - this.PaddleHeight))
          {
            this.PlayerPaddle.y += (this.CPUMovSpeed * deltaTime);
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

    this.BackgroundColor = this.selectedPalette.BackgroundColor;
    this.SpriteColor = this.selectedPalette.SpriteColor;

    if (this.gameFlags.Debug)
    {
    //console.log('Width:' + ctx.canvas.width);
    //console.log('Height:' + ctx.canvas.height);
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
          this.ScoreBeep.play();
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
          this.ScoreBeep.play();
        }
      }
      else if ((this.Ball.y + this.Ball.radius) >= (this.gameBoardHeight))
      {
        if(this.gameFlags.AudioPlayable === true){
        this.tableHit.play();
        }
        this.Ball.velocityY = this.Ball.velocityY * -1;
        this.Ball.velocityX = this.Ball.velocityX * 1;
        this.Ball.y = this.Ball.y - 1;
      }
      else if ((this.Ball.y - this.Ball.radius) <= 0)
      {
        if(this.gameFlags.AudioPlayable === true){
        this.tableHit.play();
        }
        this.Ball.velocityY = this.Ball.velocityY * -1;
        this.Ball.velocityX = this.Ball.velocityX * 1;
        this.Ball.y = this.Ball.y + 1;
      }
      else if ((this.Ball.x + this.Ball.radius) >= this.CPUPaddle.x  && (this.Ball.x + this.Ball.radius) <= (this.CPUPaddle.x + this.PaddleWidth ) &&  this.Ball.y >= this.CPUPaddle.y &&  (this.Ball.y + this.Ball.radius)  <= (this.CPUPaddle.y + this.PaddleHeight))
      {
        console.log('CPU Paddle Hit');
        if(this.gameFlags.AudioPlayable === true){
          if((Math.floor(Math.random() * 2) === 0))
          {
            this.paddleServe.play();
          }
          else
          {
            this.paddleHit.play();
          }
        }
        this.Ball.divisor = Math.floor(Math.random() * 12);
        this.Ball.x = this.Ball.x - 1;
        this.Ball.velocityY = this.Ball.velocityY * 1;
        this.Ball.velocityX = this.Ball.velocityX * -1;
      }
      else if ((this.Ball.x - this.Ball.radius)  >= this.PlayerPaddle.x  && (this.Ball.x - this.Ball.radius)  <= (this.PlayerPaddle.x + this.PaddleWidth ) &&  this.Ball.y >= this.PlayerPaddle.y &&  (this.Ball.y - this.Ball.radius)   <= (this.PlayerPaddle.y + this.PaddleHeight))
      {
        console.log('Player Paddle Hit');
        if(this.gameFlags.AudioPlayable === true){
          if((Math.floor(Math.random() * 2) === 0))
          {
            this.paddleServe.play();
          }
          else
          {
            this.paddleHit.play();
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
        this.Ball.x = this.Ball.x + 1;
        this.Ball.velocityY = this.Ball.velocityY * 1;
        this.Ball.velocityX = this.Ball.velocityX * -1;
      }

      //y up and down x left to right
    this.Ball.x += this.Ball.velocityX * deltaTime;
    this.Ball.y += (this.Ball.velocityY / 2) * deltaTime;
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
        if ((this.CPUPaddle.y + (this.CPUMovSpeed * deltaTime)) <= (this.Ball.y - (this.PaddleHeight / 2)) && ((this.CPUPaddle.y + this.PaddleHeight) + this.CPUMovSpeed) <= (this.gameBoardHeight - this.GameboardBoundary) )
        {
          this.CPUPaddle.y += this.CPUMovSpeed * deltaTime;
        }
        else if ((this.CPUPaddle.y - (this.CPUMovSpeed * deltaTime)) >= this.GameboardBoundary)
        {
          this.CPUPaddle.y -= this.CPUMovSpeed * deltaTime;
        }
        else if ((this.CPUPaddle.y + (this.CPUMovSpeed * deltaTime)) >= this.gameBoardHeight)
        {
          this.CPUPaddle.y = (this.gameBoardHeight - this.PaddleHeight);
        }
      }
      else if (this.CPUPaddle.y > this.gameBoardHeight)
      {
        this.CPUPaddle.y = (this.gameBoardHeight - this.PaddleHeight);
      }
      else if (((this.CPUPaddle.y + this.PaddleHeight) + this.CPUMovSpeed) <= (this.gameBoardHeight / 2))
      {
        this.CPUPaddle.y += this.CPUMovSpeed;
      }
      else if(((this.CPUPaddle.y - this.PaddleHeight) - this.CPUMovSpeed) >= (this.gameBoardHeight / 2))
      {
        this.CPUPaddle.y -= this.CPUMovSpeed;
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
    window.requestAnimationFrame(this.Draw.bind(this));
  }
  GamepadHandler(event)
  {
    switch(event.type)
    {
      case 'gamepadconnected':
        {
        console.log('Gamepad connected');
        if(event.gamepad.mapping !== '')
        {
          this.ControllerSlots[event.gamepad.index] = event.gamepad;
        }
        break;
        }
        case 'gamepaddisconnected':
        {
        delete this.ControllerSlots[event.gamepad.index];
        console.log('Gamepad disconnected');
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
    window.requestAnimationFrame(this.MouseHandler);
  }

  FullScreenHandler() {
    if (document.fullScreen || 
        document.mozFullScreen || 
        document.webkitIsFullScreen) {
        if(this.gameFlags.Debug){
          console.log('Entered Full Screen');
        }
      this.PlayerPaddle = { 'x' : this.PaddleHeight, 'y' : ((this.gameBoardHeight / 2) - this.PaddleHeight) };
      this.CPUPaddle = { 'x' : 0, 'y' : 0 };
      this.gameBoardWidth = window.screen.width;
      this.gameBoardHeight = window.screen.height;
      this.Ball = { 'x' : 10, 'y' : 10, 'radius' : this.BallRad, 'velocityY' : this.BallMovSpeed, 'velocityX' : this.BallMovSpeed, 'divisor' : 2};
      this.canvas.style.paddingLeft = 0;
      this.canvas.style.paddingRight = 0;
      this.canvas.style.marginLeft = '';
      this.canvas.style.marginRight = '';
      this.canvas.style.display = '';
      this.canvas.style.width = '';
    } else {
      if(this.gameFlags.Debug){
      console.log('Exited Full Screen');
      }
      this.BallMovSpeed = 0.45;
      this.gameBoardWidth = this.DefaultWidth;
      this.gameBoardHeight = this.DefaultHeight;
      this.PlayerPaddle = { 'x' : this.PaddleHeight, 'y' : ((this.gameBoardHeight / 2) - this.PaddleHeight) };
      this.CPUPaddle = { 'x' : 0, 'y' : 0 };
      this.Ball = { 'x' : (this.gameBoardWidth / 2), 'y' : Math.floor(Math.random() * this.gameBoardHeight), 'radius' : this.BallRad, 'velocityY' : this.BallMovSpeed, 'velocityX' : this.BallMovSpeed, 'divisor' : 2};
      this.canvas.style.paddingLeft = 0;
      this.canvas.style.paddingRight = 0;
      this.canvas.style.marginLeft = this.canvasMarginLeft;
      this.canvas.style.marginRight = this.canvasMarginRight;
      this.canvas.style.display = this.canvasStyleDisplay;
      this.canvas.style.width = this.canvasStyleWidth;
    }
  }
  getCanvas(){
    return this.canvas;
  }

  CanvasOnclick() {
    if(this.CursorLock === undefined)
    {
      this.CursorLock = this.canvas.requestPointerLock();
    }
    window.addEventListener('gamepadconnected', this.GamepadHandler, false);
    window.addEventListener('gamepaddisconnected', this.GamepadHandler, false);
    document.addEventListener('keyup', (event)  => {
      if(event.key === this.lastKey)
      {
        this.lastKey = '';
      }
    }, true);
  }
  constructor(gameSetup, bDebug) {

    this.paddleHitSound = 'sounds/TPONG/paddleHit.m4a'
    this.paddleServeSound = 'sounds/TPONG/paddleServe.m4a'
    this.tableHitSound = 'sounds/TPONG/tableHit.m4a'
    this.ScoreBeepSound = 'sounds/TPONG/score.m4a'
    this.PaddleHeight = 100;
    this.PaddleWidth = 10;
    this.PaddleRad = 20;
    this.DefaultWidth = 800;
    this.DefaultHeight = 600;


    this.Red = '#7F0000';
    this.Green = '#007F00';
    this.Blue = '#00007F';
    this.Purple = '#814ED2';
    this.Black = '#00000';

    this.DimGray = '#767676';
    this.White = '#FFFFFF';

    this.canvasMarginLeft = 'auto';
    this.canvasMarginRight = 'auto';
    this.canvasStyleDisplay = 'block';
    this.canvasStyleWidth = '800px';

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'mainGameboad';

    this.ColorPalettes = [{PaletteName : 'RedPalette', BackgroundColor : this.Red,  SpriteColor : this.White}, { PaletteName : 'GreenPalette', BackgroundColor : this.Green,  SpriteColor : this.White}, { PaletteName : 'BluePalette', BackgroundColor : this.Blue,  SpriteColor : this.White }, { PaletteName : 'PurplePalette', BackgroundColor : this.Purple,  SpriteColor : this.White}, { PaletteName : 'BlackPalette', BackgroundColor : this.Black,  SpriteColor : this.DimGray }];

    this.BallRad = 10;

    this.ctx = this.canvas.getContext('2d');

    this.CursorLock = undefined;
    this.ControllerSlots = new Array();
    this.ScalingFactorX = 1;
    this.ScalingFactorY = 1;

    this.previousTimeStamp = null;

    this.LeaderBoardTime = null;

    this.gameFlags = { 'GameSet': false, 'StartGame' : false, 'IdleMode': true, 'DrawBall' : false, 'Debug' : bDebug, 'AudioPlayable' : false, 'localStorage' : false } //booleans

    if (typeof(Storage) !== "undefined") {
      this.gameFlags.localStorage = true;
      this.selectedPalette = localStorage.getItem('savedPalette');
      if(this.selectedPalette === null)
      {
           localStorage.setItem('savedPalette', JSON.stringify({ PaletteName : 'BlackPalette', BackgroundColor : this.Black,  SpriteColor : this.DimGray }));
           this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'BlackPalette');
      }
      else
      {
        this.selectedPalette = JSON.parse(this.selectedPalette);
      }
   }
   else {
      this.gameFlags.localStorage = false;
      this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'BlackPalette');
   }

    this.BallMovSpeed = 0.45;
    this.CPUMovSpeed = 0.45;

    this.PlayerMovSpeedFull = 0.35;
    this.PlayerMovSpeedHalf = 0.175;
    this.PlayerMovSpeedQuater = 0.0875;
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
      if(this.gameFlags.Debug){
      //console.log('The audio is now playable. ');
    }
    });
    document.addEventListener('fullscreenchange', this.FullScreenHandler.bind(this));
    document.addEventListener('pointerlockchange', () => {
      if(document.pointerLockElement === this.canvas) {
        document.addEventListener('mousemove', this.MouseHandler, false);
      }
      else if (this.CursorLock){
        document.removeEventListener('mousemove', this.MouseHandler, false);
        this.CursorLock = undefined;
      }
    }, true);

    this.canvas.onclick = this.CanvasOnclick.bind(this);
    document.addEventListener('keydown', (event) => {
      if(this.gameFlags.Debug === 1)
      {
        console.log(event.key);
      }
      if(event.repeat === false)
      {
      switch(event.key) {
        case '1': //Red
        {
          this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'RedPalette');
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
          this.gameFlags.StartGame = true;
          this.gameFlags.DrawBall = true;
          this.selectedPalette = this.ColorPalettes.find(x => x.PaletteName === 'GreenPalette');
          this.PlayerScore = 0;
          this.CPUScore = 0;
          this.Ball.x = (this.gameBoardWidth / 2);
          this.Ball.y = Math.floor(Math.random() * this.gameBoardHeight);
          this.LeaderBoardTime = Date.now();
          break;
        }
        case '-':
          {
            if(this.gameFlags.Debug)
            {
    
            }
            break;
          }
        case '=':
            {
              if(this.gameFlags.Debug)
              {
                
              }
              break;
            }
        case 'F11':
          {
            event.preventDefault();
            if(this.lastKey !== event.key)
            {
              if(document.fullScreen || 
                document.mozFullScreen || 
                document.webkitIsFullScreen) {
                window.document.exitFullscreen().catch((err) => {
                    console.log(err);
                });
            } else {
                window.document.documentElement.requestFullscreen().catch((err) => {
                    console.log(err);
                });
            }
            }
            break;
          }
        default:
          return
      }

      if(this.gameFlags.localStorage === true)
      {
        localStorage.setItem('savedPalette', JSON.stringify(this.selectedPalette));
      }
    }
    this.lastKey = event.key;
    }, true);

    if (bDebug === true)
    {
      this.gameFlags.StartGame = true;
      this.gameFlags.DrawBall = false;
      this.PlayerScore = 0;
      this.CPUScore = 0;
      this.Ball.x = (this.gameBoardWidth / 2);
      this.Ball.y = Math.floor(Math.random() * this.gameBoardHeight);
      this.LeaderBoardTime = Date.now();
      this.BallSpawnDelay = Date.now() + 4000;
    }

    window.requestAnimationFrame(this.Draw.bind(this));
  }
}
let __TPONGHandler = null;

function GameStart(gameSetup, bDebug) {
  if(__TPONGHandler === null)
  {
    __TPONGHandler = new GameHandler(0, true);
  }
  return __TPONGHandler.getCanvas();
}

export default GameStart;