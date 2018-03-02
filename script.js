const BOARD_SIZE = 30;
const TICK_INTERVAL = 100;
const START_X = BOARD_SIZE / 2;
const START_Y = BOARD_SIZE / 2;
const START_LENGTH = 5;
const DEFAULT_SPEED = 1;

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const DEFAULT_DIR = RIGHT;

const MAX_SNAKE = 200;

const NUM_FOOD = 8;

const S_BEGIN = -1;
const S_STARTUP = 4;
const S_PLAY = 1;
const S_END = 0;
const S_PAUSE = 2;
const S_OVER = 3;
const S_ADVANCE = 5;
const S_WAIT = 6;
const S_DONE = 7;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 *
 * From: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var app = new Vue({
    el: '#app',
    data: {
        board: [],
        score: 0,
        head: 0,
        tail: 0,
        snake: [],
        foods: [],
        length: START_LENGTH,
        direction: DEFAULT_DIR,
        gameState: S_BEGIN,
        speed: DEFAULT_SPEED,
        speed_inc: 0,
        next_move: DEFAULT_DIR,
        startup: 0,
        advance: 0,
        level: 1,
        numEaten: 0,
    },
    computed: {
        easyCompute: function() {
            return (2 + 2);
        },
        activeTodos: function() {
            return this.todos.filter(function(item) {
                return !item.completed;
            });
        },
    },
    methods: {
        isBody: function(x, y) {
            for(var i = this.tail; i < this.head; i = (i + 1) % MAX_SNAKE){
                if(this.snake[i].x == x){
                    if (this.snake[i].y == y) {
                        return true;
                    }
                }
            }
            return false;
        },
        isFood: function(x, y) {
            for (var i = 0; i < this.foods.length; i++) {
                if (this.foods[i].x == x) {
                    if (this.foods[i].y == y) {
                        return true;
                    }
                }
            }
            return false;
        },
        setDirection: function(dir) {
            if ((this.direction == RIGHT&& dir == LEFT) ||
                (this.direction == LEFT && dir == RIGHT) ||
                (this.direction == UP   && dir == DOWN) ||
                (this.direction == DOWN && dir == UP)) {
                    console.log("Failed to Set direction!");
                    return;
                }
            this.direction = dir;
        },
        setNext: function(dir) {
            this.next_move = dir;
        },
        drawFoods: function() {
            for (var i = 0; i < this.foods.length; i++) {
                var x = this.foods[i].x;
                var y = this.foods[i].y;

                this.board[y][x].food = true; // Won't have to worry about snake!
            }
        },
        resetValues: function() {
            this.head = 0;
            this.tail = 0;
            this.score = 0;
            this.numEaten = 0;
            this.length = START_LENGTH;
            this.startup = 0;
            this.speed_inc = 0;
            this.speed = DEFAULT_SPEED;
            this.level = 1;
            this.direction = DEFAULT_DIR;
            this.next_move = DEFAULT_DIR;
        },
        initBoard: function() {
            this.board = [];
            for (var i = 0; i < BOARD_SIZE; i++) {
                this.board.push([]);
                for (var j = 0; j < BOARD_SIZE; j++) {
                    this.board[i].push({snake:false, food:false, tile:true});
                }
            }
        },
        initSnake: function() {
            // Draw that young snake
            // Begin the snake
            this.snake = [];
            for (var i = 0; i < MAX_SNAKE; i++) {
                this.snake.push({x:START_X, y:START_Y});
            }
        },
        drawSnake: function() {
            this.initBoard();

            // Row 0
            this.board[0][10].black = true;
            this.board[0][11].black = true;
            this.board[0][12].black = true;
            this.board[0][13].black = true;
            this.board[0][14].black = true;
            this.board[0][15].black = true;
            this.board[0][16].black = true;
            this.board[0][17].black = true;

            // Row 1
            this.board[1][8].black = true;
            this.board[1][9].black = true;
            this.board[1][10].white = true;
            this.board[1][11].black = true;
            this.board[1][12].l_green = true;
            this.board[1][13].l_green = true;
            this.board[1][14].black = true;
            this.board[1][15].white = true;
            this.board[1][16].black = true;
            this.board[1][17].green = true;
            this.board[1][18].black = true;
            this.board[1][19].black = true;

            // Row 2
            this.board[2][7].black = true;
            this.board[2][8].white = true;
            this.board[2][9].white = true;
            this.board[2][10].white = true;
            this.board[2][11].black = true;
            this.board[2][12].l_green = true;
            this.board[2][13].black = true;
            this.board[2][14].white = true;
            this.board[2][15].white = true;
            this.board[2][16].white = true;
            this.board[2][17].black = true;
            this.board[2][18].green = true;
            this.board[2][19].green = true;
            this.board[2][20].black = true;

            // Row 3
            this.board[3][6].black = true;
            this.board[3][7].white = true;
            this.board[3][8].white = true;
            this.board[3][9].white = true;
            this.board[3][10].black = true;
            this.board[3][11].l_green = true;
            this.board[3][12].l_green = true;
            this.board[3][13].black = true;
            this.board[3][14].white = true;
            this.board[3][15].white = true;
            this.board[3][16].white = true;
            this.board[3][17].white = true;
            this.board[3][18].black = true;
            this.board[3][19].green = true;
            this.board[3][20].black = true;

            // Row 4
            this.board[4][5].black = true;
            this.board[4][6].white = true;
            this.board[4][7].white = true;
            this.board[4][8].white = true;
            this.board[4][9].black = true;
            this.board[4][10].black = true;
            this.board[4][11].l_green = true;
            this.board[4][12].black = true;
            this.board[4][13].black = true;
            this.board[4][14].white = true;
            this.board[4][15].white = true;
            this.board[4][16].white = true;
            this.board[4][17].white = true;
            this.board[4][18].black = true;
            this.board[4][19].green = true;
            this.board[4][20].black = true;

            // Row 5
            this.board[5][5].black = true;
            this.board[5][6].white = true;
            this.board[5][7].white = true;
            this.board[5][8].black = true;
            this.board[5][9].black = true;
            this.board[5][10].black = true;
            this.board[5][11].l_green = true;
            this.board[5][12].black = true;
            this.board[5][13].black = true;
            this.board[5][14].black = true;
            this.board[5][15].white = true;
            this.board[5][16].white = true;
            this.board[5][17].white = true;
            this.board[5][18].black = true;
            this.board[5][19].green = true;
            this.board[5][20].green = true;
            this.board[5][21].black = true;

            // Row 6
            this.board[6][5].black = true;
            this.board[6][6].white = true;
            this.board[6][7].white = true;
            this.board[6][8].black = true;
            this.board[6][9].black = true;
            this.board[6][10].black = true;
            this.board[6][11].l_green = true;
            this.board[6][12].black = true;
            this.board[6][13].black = true;
            this.board[6][14].black = true;
            this.board[6][15].white = true;
            this.board[6][16].white = true;
            this.board[6][17].white = true;
            this.board[6][18].black = true;
            this.board[6][19].green = true;
            this.board[6][20].green = true;
            this.board[6][21].black = true;

            // Row 7
            this.board[7][5].black = true;
            this.board[7][6].white = true;
            this.board[7][7].white = true;
            this.board[7][8].black = true;
            this.board[7][9].black = true;
            this.board[7][10].l_green = true;
            this.board[7][11].l_green = true;
            this.board[7][12].black = true;
            this.board[7][13].black = true;
            this.board[7][14].black = true;
            this.board[7][15].white = true;
            this.board[7][16].white = true;
            this.board[7][17].white = true;
            this.board[7][18].black = true;
            this.board[7][19].green = true;
            this.board[7][20].green = true;
            this.board[7][21].black = true;

            // Row 8
            this.board[8][5].black = true;
            this.board[8][6].white = true;
            this.board[8][7].white = true;
            this.board[8][8].white = true;
            this.board[8][9].black = true;
            this.board[8][10].l_green = true;
            this.board[8][11].l_green = true;
            this.board[8][12].black = true;
            this.board[8][13].black = true;
            this.board[8][14].white = true;
            this.board[8][15].white = true;
            this.board[8][16].white = true;
            this.board[8][17].black = true;
            this.board[8][18].green = true;
            this.board[8][19].green = true;
            this.board[8][20].green = true;
            this.board[8][21].black = true;

            // Row 9
            this.board[9][5].black = true;
            this.board[9][6].black = true;
            this.board[9][7].black = true;
            this.board[9][8].black = true;
            this.board[9][9].l_green = true;
            this.board[9][10].l_green = true;
            this.board[9][11].l_green = true;
            this.board[9][12].black = true;
            this.board[9][13].white = true;
            this.board[9][14].white = true;
            this.board[9][15].white = true;
            this.board[9][16].black = true;
            this.board[9][17].green = true;
            this.board[9][18].green = true;
            this.board[9][19].green = true;
            this.board[9][20].green = true;
            this.board[9][21].black = true;

            // Row 10
            this.board[10][5].black = true;
            this.board[10][6].green = true;
            this.board[10][7].green = true;
            this.board[10][8].green = true;
            this.board[10][9].l_green = true;
            this.board[10][10].l_green = true;
            this.board[10][11].l_green = true;
            this.board[10][12].l_green = true;
            this.board[10][13].black = true;
            this.board[10][14].black = true;
            this.board[10][15].black = true;
            this.board[10][16].green = true;
            this.board[10][17].green = true;
            this.board[10][18].green = true;
            this.board[10][19].green = true;
            this.board[10][20].green = true;
            this.board[10][21].black = true;

            // Row 11
            this.board[11][6].black = true;
            this.board[11][7].green = true;
            this.board[11][8].green = true;
            this.board[11][9].green = true;
            this.board[11][10].green = true;
            this.board[11][11].green = true;
            this.board[11][12].green = true;
            this.board[11][13].green = true;
            this.board[11][14].green = true;
            this.board[11][15].green = true;
            this.board[11][16].green = true;
            this.board[11][17].black = true;
            this.board[11][18].green = true;
            this.board[11][19].green = true;
            this.board[11][20].black = true;

            // Row 12
            this.board[12][7].black = true;
            this.board[12][8].black = true;
            this.board[12][9].black = true;
            this.board[12][10].black = true;
            this.board[12][11].black = true;
            this.board[12][12].black = true;
            this.board[12][13].black = true;
            this.board[12][14].black = true;
            this.board[12][15].black = true;
            this.board[12][16].black = true;
            this.board[12][17].green = true;
            this.board[12][18].green = true;
            this.board[12][19].green = true;
            this.board[12][20].black = true;

            // Row 13
            this.board[13][7].red = true;
            this.board[13][8].red = true;
            this.board[13][9].red = true;
            this.board[13][10].red = true;
            this.board[13][11].black = true;
            this.board[13][12].green = true;
            this.board[13][13].green = true;
            this.board[13][14].green = true;
            this.board[13][15].green = true;
            this.board[13][16].green = true;
            this.board[13][17].green = true;
            this.board[13][18].green = true;
            this.board[13][19].black = true;

            // Row 14
            this.board[14][6].red = true;
            this.board[14][7].red = true;
            this.board[14][8].red = true;
            this.board[14][9].red = true;
            // this.board[14][10].red = true;
            this.board[14][11].black = true;
            this.board[14][12].black = true;
            this.board[14][13].green = true;
            this.board[14][14].green = true;
            this.board[14][15].green = true;
            this.board[14][16].green = true;
            this.board[14][17].green = true;
            this.board[14][18].black = true;

            // Row 15
            this.board[15][4].red = true;
            this.board[15][5].red = true;
            this.board[15][6].red = true;
            this.board[15][7].red = true;
            this.board[15][8].red = true;
            this.board[15][9].tile = true;
            this.board[15][10].tile = true;
            this.board[15][11].black = true;
            this.board[15][12].yellow = true;
            this.board[15][13].yellow = true;
            this.board[15][14].green = true;
            this.board[15][15].green = true;
            this.board[15][16].green = true;
            this.board[15][17].green = true;
            this.board[15][18].black = true;
            this.board[15][19].black = true;
            this.board[15][20].black = true;
            this.board[15][21].black = true;


            // Row 16
            this.board[16][2].red = true;
            this.board[16][3].red = true;
            this.board[16][4].red = true;
            this.board[16][5].red = true;
            this.board[16][6].red = true;
            this.board[16][7].red = true;
            this.board[16][8].tile = true;
            this.board[16][9].tile = true;
            this.board[16][10].black = true;
            this.board[16][11].l_green = true;
            this.board[16][12].l_green = true;
            this.board[16][13].l_green = true;
            this.board[16][14].l_green = true;
            this.board[16][15].green = true;
            this.board[16][16].green = true;
            this.board[16][17].black = true;
            this.board[16][18].black = true;
            this.board[16][19].green = true;
            this.board[16][20].green = true;
            this.board[16][21].green = true;
            this.board[16][22].black = true;

            // Row 17
            this.board[17][0].red = true;
            this.board[17][1].red = true;
            this.board[17][2].red = true;
            this.board[17][3].red = true;
            this.board[17][4].red = true;
            this.board[17][5].red = true;
            this.board[17][6].tile = true;
            this.board[17][7].tile = true;
            this.board[17][8].tile = true;
            this.board[17][9].tile = true;
            this.board[17][10].black = true;
            this.board[17][11].yellow = true;
            this.board[17][12].yellow = true;
            this.board[17][13].yellow = true;
            this.board[17][14].yellow = true;
            this.board[17][15].green = true;
            this.board[17][16].green = true;
            this.board[17][17].black = true;
            this.board[17][18].green = true;
            this.board[17][19].green = true;
            this.board[17][20].green = true;
            this.board[17][21].green = true;
            this.board[17][22].green = true;
            this.board[17][23].black = true;

            // Row 18
            this.board[18][3].red = true;
            this.board[18][4].red = true;
            this.board[18][5].tile = true;
            this.board[18][6].tile = true;
            this.board[18][7].tile = true;
            this.board[18][8].tile = true;
            this.board[18][9].tile = true;
            this.board[18][10].black = true;
            this.board[18][11].l_green = true;
            this.board[18][12].l_green = true;
            this.board[18][13].l_green = true;
            this.board[18][14].green = true;
            this.board[18][15].green = true;
            this.board[18][16].green = true;
            this.board[18][17].black = true;
            this.board[18][18].green = true;
            this.board[18][19].green = true;
            this.board[18][20].green = true;
            this.board[18][21].green = true;
            this.board[18][22].green = true;
            this.board[18][23].green = true;
            this.board[18][24].black = true;
            this.board[18][25].black = true;
            this.board[18][26].black = true;
            this.board[18][27].black = true;

            // Row 19
            this.board[19][2].red = true;
            this.board[19][3].red = true;
            this.board[19][4].tile = true;
            this.board[19][5].tile = true;
            this.board[19][6].tile = true;
            this.board[19][7].tile = true;
            this.board[19][8].tile = true;
            this.board[19][9].tile = true;
            this.board[19][10].black = true;
            this.board[19][11].yellow = true;
            this.board[19][12].yellow = true;
            this.board[19][13].yellow = true;
            this.board[19][14].green = true;
            this.board[19][15].green = true;
            this.board[19][16].green = true;
            this.board[19][17].green = true;
            this.board[19][18].green = true;
            this.board[19][19].green = true;
            this.board[19][20].green = true;
            this.board[19][21].green = true;
            this.board[19][22].green = true;
            this.board[19][23].green = true;
            this.board[19][24].black = true;
            this.board[19][25].green = true;
            this.board[19][26].green = true;
            this.board[19][27].green = true;
            this.board[19][28].black = true;

            // Row 20
            this.board[20][10].black = true;
            this.board[20][11].l_green = true;
            this.board[20][12].l_green = true;
            this.board[20][13].l_green = true;
            this.board[20][14].green = true;
            this.board[20][15].l_green = true;
            this.board[20][16].green = true;
            this.board[20][17].green = true;
            this.board[20][18].green = true;
            this.board[20][19].green = true;
            this.board[20][20].black = true;
            this.board[20][21].green = true;
            this.board[20][22].green = true;
            this.board[20][23].green = true;
            this.board[20][24].green = true;
            this.board[20][25].green = true;
            this.board[20][26].green = true;
            this.board[20][27].green = true;
            this.board[20][28].black = true;

            // Row 21
            this.board[21][10].black = true;
            this.board[21][11].yellow = true;
            this.board[21][12].yellow = true;
            this.board[21][13].green = true;
            this.board[21][14].l_green = true;
            this.board[21][15].green = true;
            this.board[21][16].green = true;
            this.board[21][17].green = true;
            this.board[21][18].green = true;
            this.board[21][19].black = true;
            this.board[21][20].green = true;
            this.board[21][21].green = true;
            this.board[21][22].green = true;
            this.board[21][23].green = true;
            this.board[21][24].green = true;
            this.board[21][25].green = true;
            this.board[21][26].green = true;
            this.board[21][27].black = true;

            // Row 22
            this.board[22][10].black = true;
            this.board[22][11].l_green = true;
            this.board[22][12].l_green = true;
            this.board[22][13].l_green = true;
            this.board[22][14].green = true;
            this.board[22][15].green = true;
            this.board[22][16].green = true;
            this.board[22][17].green = true;
            this.board[22][18].black = true;
            this.board[22][19].tile = true;
            this.board[22][20].black = true;
            this.board[22][21].yellow = true;
            this.board[22][22].green = true;
            this.board[22][23].green = true;
            this.board[22][24].green = true;
            this.board[22][25].green = true;
            this.board[22][26].black = true;

            // Row 23
            this.board[23][11].black = true;
            this.board[23][12].l_green = true;
            this.board[23][13].l_green = true;
            this.board[23][14].l_green = true;
            this.board[23][15].green = true;
            this.board[23][16].green = true;
            this.board[23][17].black = true;
            this.board[23][18].tile = true;
            this.board[23][19].tile = true;
            this.board[23][20].tile = true;
            this.board[23][21].black = true;
            this.board[23][22].yellow = true;
            this.board[23][23].green = true;
            this.board[23][24].black = true;
            this.board[23][25].black = true;

            // Row 24
            this.board[24][12].black = true;
            this.board[24][13].black = true;
            this.board[24][14].black = true;
            this.board[24][15].black = true;

            this.board[24][21].black = true;
            this.board[24][22].black = true;
            this.board[24][23].black = true;


        },
        drawEnter: function() {
            // Draw that yound arrow
            this.board[25][1].text = true;
            this.board[26][2].text = true;
            this.board[27][3].text = true;
            this.board[28][2].text = true;
            this.board[29][1].text = true;

            // TEXT
            var offset = 1;
            // E
            this.board[25][4 + offset].text = true;
            this.board[25][5 + offset].text = true;
            this.board[25][6 + offset].text = true;
            this.board[26][4 + offset].text = true;
            this.board[27][4 + offset].text = true;
            this.board[28][4 + offset].text = true;
            this.board[29][4 + offset].text = true;
            this.board[29][5 + offset].text = true;
            this.board[29][6 + offset].text = true;
            this.board[27][5 + offset].text = true;

            // N
            this.board[25][8 + offset].text = true;
            this.board[26][8 + offset].text = true;
            this.board[27][8 + offset].text = true;
            this.board[28][8 + offset].text = true;
            this.board[29][8 + offset].text = true;
            this.board[26][9 + offset].text = true;
            this.board[27][10 + offset].text = true;
            this.board[25][11 + offset].text = true;
            this.board[26][11 + offset].text = true;
            this.board[27][11 + offset].text = true;
            this.board[28][11 + offset].text = true;
            this.board[29][11 + offset].text = true;

            // T
            this.board[25][13 + offset].text = true;
            this.board[25][14 + offset].text = true;
            this.board[25][15 + offset].text = true;
            this.board[26][14 + offset].text = true;
            this.board[27][14 + offset].text = true;
            this.board[28][14 + offset].text = true;
            this.board[29][14 + offset].text = true;

            // E
            this.board[25][17 + offset].text = true;
            this.board[25][18 + offset].text = true;
            this.board[25][19 + offset].text = true;
            this.board[26][17 + offset].text = true;
            this.board[27][17 + offset].text = true;
            this.board[28][17 + offset].text = true;
            this.board[29][17 + offset].text = true;
            this.board[29][18 + offset].text = true;
            this.board[29][19 + offset].text = true;
            this.board[27][18 + offset].text = true;

            // R
            this.board[25][21 + offset].text = true;
            this.board[26][21 + offset].text = true;
            this.board[27][21 + offset].text = true;
            this.board[28][21 + offset].text = true;
            this.board[29][21 + offset].text = true;
            this.board[25][22 + offset].text = true;
            this.board[27][22 + offset].text = true;
            this.board[26][23 + offset].text = true;
            this.board[28][23 + offset].text = true;
            this.board[29][23 + offset].text = true;
        },
        drawLvl: function() {
            var offset = 1;

            // L
            this.board[5][0 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[9][1 + offset].text = true;
            this.board[9][2 + offset].text = true;

            offset += 4;
            // V
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][1 + offset].text = true;
            this.board[7][2 + offset].text = true;
            this.board[8][2 + offset].text = true;

            offset += 4;
            // L
            this.board[5][0 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[9][1 + offset].text = true;
            this.board[9][2 + offset].text = true;

            offset += 5;
            // D
            this.board[5][0 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[5][1 + offset].text = true;
            this.board[6][2 + offset].text = true;
            this.board[7][2 + offset].text = true;
            this.board[8][2 + offset].text = true;
            this.board[9][1 + offset].text = true;

            offset += 4;
            // O
            this.board[5][0 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[5][1 + offset].text = true;
            this.board[5][2 + offset].text = true;
            this.board[6][2 + offset].text = true;
            this.board[7][2 + offset].text = true;
            this.board[8][2 + offset].text = true;
            this.board[9][2 + offset].text = true;
            this.board[9][1 + offset].text = true;

            offset += 4
            // N
            this.board[5][0 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[6][1 + offset].text = true;
            this.board[7][2 + offset].text = true;
            this.board[5][3 + offset].text = true;
            this.board[6][3 + offset].text = true;
            this.board[7][3 + offset].text = true;
            this.board[8][3 + offset].text = true;
            this.board[9][3 + offset].text = true;

            offset += 5;
            // E
            this.board[5][0 + offset].text = true;
            this.board[5][1 + offset].text = true;
            this.board[5][2 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[9][1 + offset].text = true;
            this.board[9][2 + offset].text = true;
            this.board[7][1 + offset].text = true;

        },
        drawReset: function() {
            var offset = 1;

            // R
            this.board[5][0 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[5][1 + offset].text = true;
            this.board[7][1 + offset].text = true;
            this.board[6][2 + offset].text = true;
            this.board[8][2 + offset].text = true;
            this.board[9][2 + offset].text = true;

            offset += 4
            // E
            this.board[5][0 + offset].text = true;
            this.board[5][1 + offset].text = true;
            this.board[5][2 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[9][1 + offset].text = true;
            this.board[9][2 + offset].text = true;
            this.board[7][1 + offset].text = true;

            offset += 4;
            // S
            this.board[5][0 + offset].text = true;
            this.board[5][1 + offset].text = true;
            this.board[5][2 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[7][1 + offset].text = true;
            this.board[7][2 + offset].text = true;
            this.board[8][2 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[9][1 + offset].text = true;
            this.board[9][2 + offset].text = true;

            offset += 4;
            // E
            this.board[5][0 + offset].text = true;
            this.board[5][1 + offset].text = true;
            this.board[5][2 + offset].text = true;
            this.board[6][0 + offset].text = true;
            this.board[7][0 + offset].text = true;
            this.board[8][0 + offset].text = true;
            this.board[9][0 + offset].text = true;
            this.board[9][1 + offset].text = true;
            this.board[9][2 + offset].text = true;
            this.board[7][1 + offset].text = true;

            offset += 4;
            // T
            this.board[5][0 + offset].text = true;
            this.board[5][1 + offset].text = true;
            this.board[5][2 + offset].text = true;
            this.board[6][1 + offset].text = true;
            this.board[7][1 + offset].text = true;
            this.board[8][1 + offset].text = true;
            this.board[9][1 + offset].text = true;
        },
        initFoods: function() {
            // Initialize the foods
            this.foods = [];

            for (var i = 0; i < NUM_FOOD; i++) {
                var fx = getRandomInt(0, BOARD_SIZE - 1);
                var fy = getRandomInt(0, BOARD_SIZE - 1);

                while (this.isBody(fx, fy) || this.isFood(fx, fy)) {
                    fx = getRandomInt(0, BOARD_SIZE - 1);
                    fy = getRandomInt(0, BOARD_SIZE - 1);
                }

                this.foods.push({x:fx, y:fy}); // Push a new food entry to our database!
            }

        },
        removeFood: function(x, y) {
            for (var i = 0; i < this.foods.length; i++) {
                if (this.foods[i].x == x) {
                    if (this.foods[i].y == y) {
                        this.foods.splice(i, 1); // Remove the desired food
                        return; // Get out of dodge
                    }
                }
            }
        },
        headX: function() {
            return this.snake[this.head].x;
        },
        headY: function() {
            return this.snake[this.head].y;
        },
        tailX: function() {
            return this.snake[this.tail].x;
        },
        tailY: function() {
            return this.snake[this.tail].y;
        },
        addHead: function(dir) { // This is the function that actually moves the snake!
            // Compute the new head position
            var new_head = (this.head + 1) % MAX_SNAKE;
            console.log("New Head Index: " + new_head);
            console.log("Old X: " + this.headX());
            console.log("Old Y: " + this.headY());
            // Copy the old values into the new head
            this.snake[new_head].x = this.snake[this.head].x;
            this.snake[new_head].y = this.snake[this.head].y;
            // Change tthe head index
            this.head = new_head;

            switch (dir) {
                case UP:
                    console.log("Move Up");
                    // Do we have room?
                    if (this.snake[this.head].y > 0) {
                        // Yes!
                        // Increment and update board
                        this.snake[this.head].y -= 1;

                        // Update the board member
                        this.board[this.headY()][this.headX()] = Object.assign({}, this.board[this.headY()][this.headX()], {
                            snake:true,
                            food:false,
                            tile:false}
                        );
                    }
                    else {
                        // We can do wraparound here... but for now I think I'll just have them die
                        this.gameState = S_END;
                        console.log("Collision Moving Up");
                    }

                    break;
                case DOWN:
                    console.log("Move Down");
                    // Do we have room?
                    if (this.snake[this.head].y + 1 < BOARD_SIZE) {
                        // Yes!
                        // Increment and update board
                        this.snake[this.head].y += 1;

                        // Update the board member
                        this.board[this.headY()][this.headX()] = Object.assign({}, this.board[this.headY()][this.headX()], {
                            snake:true,
                            food:false,
                            tile:false}
                        );
                    }
                    else {
                        // We can do wraparound here... but for now I think I'll just have them die
                        this.gameState = S_END;
                        console.log("Collision Moving Down");
                    }

                    break;
                case LEFT:
                    console.log("Move Left");
                    // Do we have room?
                    if (this.snake[this.head].x > 0) {
                        // Yes!
                        // Increment and update board
                        this.snake[this.head].x -= 1;

                        // Update the board member
                        this.board[this.headY()][this.headX()] = Object.assign({}, this.board[this.headY()][this.headX()], {
                            snake:true,
                            food:false,
                            tile:false}
                        );
                    }
                    else {
                        // We can do wraparound here... but for now I think I'll just have them die
                        this.gameState = S_END;
                        console.log("Collision Moving Left");
                    }

                    break;
                case RIGHT:
                    console.log("Move Right");
                    // Do we have room?
                    if (this.snake[this.head].x + 1 < BOARD_SIZE) {
                        // Yes!
                        // Increment and update board
                        this.snake[this.head].x += 1;

                        // Update the board member
                        // this.board[this.headX()][this.headY()].tile = false;
                        // this.board[this.headX()][this.headY()].snake = true;
                        this.board[this.headY()][this.headX()] = Object.assign({}, this.board[this.headY()][this.headX()], {
                            snake:true,
                            food:false,
                            tile:false}
                        );
                    }
                    else {
                        // We can do wraparound here... but for now I think I'll just have them die
                        this.gameState = S_END;
                        console.log("Collision Moving Right");
                    }

                    break;
            }
        },
        deleteTail: function() {
            this.board[this.tailY()][this.tailX()] = Object.assign({}, this.board[this.tailY()][this.tailX()], {
                snake:false,
                food:false,
                tile:true}
            );

            this.tail = (this.tail + 1) % MAX_SNAKE;
        },
        moveSnake: function(dir) {
            this.setDirection(this.next_move); // Protects against crappy input
            // Erase the tail's current pos
            this.addHead(dir);
            this.$forceUpdate();
            if (this.isFood(this.headX(), this.headY())) {
                this.numEaten++;
                this.length = this.length + 1;
                // Inc score
                this.score = this.score + this.level; // Just add the level amount

                // Remove food!
                this.removeFood(this.headX(), this.headY());

                // And I guess advance Level if they ate all the foods
            }
            else {
                this.deleteTail();
            }
            /*Maybe do some other stuff here?*/
            // Like collision checking??
            if (this.isBody(this.headX(), this.headY())) {
                this.gameState = S_END;
            }
            // Then just delete the tail

            this.$forceUpdate();
        },
        initGame: function() {
            console.log("Init Game");
            if (!(this.level - 1)) {
                this.resetValues();
            }


            this.initBoard();

            this.initSnake();

            this.initFoods();
            // Draw the foods on the board!
            this.drawFoods();

            this.gameState = S_STARTUP;
        },
        startTimer: function() {
            setInterval(this.gameTick, TICK_INTERVAL);
        },
        gameTick: function() {
            console.log("Tick");
            if (this.gameState == S_STARTUP) {
                this.setDirection(this.next_move);
                this.addHead(this.direction);
                this.$forceUpdate();

                if (this.isFood(this.headX(), this.headY())) {
                    this.numEaten++;
                    this.length = this.length + 1;
                    // Inc score
                    this.score = this.score + this.level; // Just add the level amount

                    // Remove food!
                    this.removeFood(this.headX(), this.headY());

                    // And I guess advance Level if they ate all the foods
                }

                this.startup = this.startup + 1;
                if (this.startup >= this.length) {
                    this.gameState = S_PLAY;
                }
            }
            else if (this.gameState == S_PLAY) {
                this.speed_inc = this.speed_inc + this.speed;
                if (this.speed_inc % 10) { // 10 just gives a good speed idk
                    this.moveSnake(this.direction);

                    // check for level advance
                    if (this.foods.length == 0) {
                        console.log("LEVEL CLEAR!");
                        this.gameState = S_DONE;
                    }
                }
            }
            else if (this.gameState == S_END) {
                alert("You died!");
                // Reset all the game stuff
                this.resetValues();
                this.initBoard();
                this.drawReset();
                this.drawEnter();
                this.gameState = S_OVER;
            }
            else if (this.gameState == S_OVER) {
                // Do something so people can play again
            }
            else if (this.gameState == S_DONE) {
                // They beat the level!  Do something cool!
                this.level++;
                // this.speed++;

                this.head = 0;
                this.tail = 0;
                this.startup = 0; // Reset the startup counter
                this.numEaten = 0; // Reset # food eaten

                // this.initGame(); // Reset all the visual aspects of the game
                this.initBoard();

                // Draw level done
                this.drawLvl();
                this.drawEnter();

                this.gameState = S_WAIT;
            }
            else if (this.gameState == S_WAIT) {
                console.log("waiting...");
            }
            else if (this.gameState == S_ADVANCE) {
                console.log("State Advance");

                this.initBoard();

                this.initSnake();

                this.initFoods();
                // Draw the foods on the board!
                this.drawFoods();

                this.direction = DEFAULT_DIR;
                this.next_move = DEFAULT_DIR;

                this.gameState = S_STARTUP;
            }
        },
        startGame() {
            this.legnth = START_LENGTH;
            this.initGame();
            this.startTimer();
        },
        simpleMethod: function() {
            console.log("this is simple!");
        },
    },
    created() {
        // this.initBoard();
        this.drawSnake();
        this.drawEnter();
    },

});

function levelAdvance() {
    app.gameState = S_ADVANCE;
}

function levelDone() {
    // Display something, or something

    app.gameState = S_WAIT;
    setTimeout(levelAdvance, 2000); // 2 sec delay
}


$(document).on('keydown', function (e) {
    switch (e.keyCode) {
        case 87: // UP
            app.setNext(UP);
            // Update the key
            $("#key_w").removeClass('off').addClass('on');
            break;
        case 65: // LEFT
            app.setNext(LEFT);
            $("#key_a").removeClass('off').addClass('on');
            break;
        case 83: // DOWN
            app.setNext(DOWN);
            $("#key_s").removeClass('off').addClass('on');
            break;
        case 68: // RIGHT
            app.setNext(RIGHT);
            $("#key_d").removeClass('off').addClass('on');
            break;
        case 80:
            app.gameState = S_PAUSE;
            break;
        case 82:
            app.gameState = S_PLAY;
        case 32:
            if (app.gameState == S_BEGIN) {
                app.gameState = S_STARTUP;
                app.startGame();
            }
            break;
        case 13:
            if (app.gameState == S_OVER) {
                app.gameState = S_STARTUP;
                app.initGame();
            }
            else if (app.gameState == S_BEGIN) {
                app.gameState = S_STARTUP;
                app.startGame();
            }
            else if (app.gameState == S_WAIT) {
                app.gameState = S_ADVANCE;
            }
        default:
            app.direction = app.direction;

    }
    console.log(e.keyCode);
});

$(document).on('keyup', function (e) {
    switch (e.keyCode) {
        case 87: // UP
            // Update the key
            $("#key_w").removeClass('on').addClass('off');
            break;
        case 65: // LEFT
            $("#key_a").removeClass('on').addClass('off');
            break;
        case 83: // DOWN
            $("#key_s").removeClass('on').addClass('off');
            break;
        case 68: // RIGHT
            $("#key_d").removeClass('on').addClass('off');
            break;
        default:
            break;
    }
});




// var app = new Vue({
//     el: '#app',
//     data: {
//         todos: [],
//         message: '',
//         show: 'all',
//         drag: {},
//     },
//     computed: {
//         activeTodos: function() {
//             return this.todos.filter(function(item) {
//                 return !item.completed;
//             });
//         },
//         filteredTodos: function() {
//             if (this.show === 'active')
//             return this.todos.filter(function(item) {
//                 return !item.completed;
//             });
//             if (this.show === 'completed')
//             return this.todos.filter(function(item) {
//                 return item.completed;
//             });
//             return this.todos;
//         },
//     },
//     methods: {
//         addItem: function() {
//             // Adds a new element to our "todos" list of items
//             // Pushes an object with a text attribute and a completed attribute
//             this.todos.push({text: this.message,completed:false});
//             this.message = ''; // Reset the value in the text field
//             // This is cool b/c it's a two way binding!  We can pull and push stuff into our html element
//         },
//         completeItem: function(item) {
//             item.completed = !item.completed;
//         },
//         deleteItem: function(item) {
//             var index = this.todos.indexOf(item);
//             if (index > -1)
//             this.todos.splice(index,1);
//
//         },
//         showAll: function() {
//             this.show = 'all';
//         },
//         showActive: function() {
//             this.show = 'active';
//         },
//         showCompleted: function() {
//             this.show = 'completed';
//         },
//         deleteCompleted: function() {
//             this.todos = this.todos.filter(function(item) {
//                 return !item.completed;
//             });
//         },
//         dragItem: function(item) {
//             this.drag = item;
//         },
//         dropItem: function(item) {
//             var indexItem = this.todos.indexOf(this.drag);
//             var indexTarget = this.todos.indexOf(item);
//             this.todos.splice(indexItem,1);                 // Remove from indexItem, a total of 1 elements (just remove indexItem)
//             this.todos.splice(indexTarget,0,this.drag);     // Don't remove any items, but add a new item after target
//         },
//     },
//
// });
