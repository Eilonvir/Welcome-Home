let socket;
let messages = [];
let inputBox;

//visuals
let livingRoomImg;

function preload(){
  livingRoomImg = loadImage('living room.jpeg')
}

function setup() {
  createCanvas(windowWidth/1.5, windowHeight/1.7);
  socket = io();
  
  // Create input box
  inputBox = createInput('');
  inputBox.position(20, height + 20);
  inputBox.size(200);
  inputBox.attribute('placeholder', 'Type a message...');
  
  // Create send button
  let sendBtn = createButton('Send');
  sendBtn.position(230, height + 20);
  sendBtn.mousePressed(message);
  
  // Listen for messages from other users
  socket.on('message', (data) => {
    messages.push(data.text);
  });
}

function draw() {
  background(255);
  image(livingRoomImg, width/1.5, height/1.5, 170, 150);
  
   
  
  //Chat/experience title for display
  textFont('Consolas');
  textSize(24);
  textAlign(CENTER);
  fill(0);
  text('Welcome Home', width/2, 30);
  // Display the last 10 messages that fit the canvas
  textAlign(LEFT);
  textSize(14);
  fill(0);
  let startPoint = max(0, messages.length -10)
  for (let i = startPoint; i < messages.length; i++) {
    text(messages[i], 20, 30 + ((i - startPoint) * 25));
  }
}

function message() {
  let msg = inputBox.value();
  if (msg !== '') {
    socket.emit('message', { text: msg });
    messages.push(msg);  // Add to your own screen
    inputBox.value('');  // Clear input
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    message();
  }
}


