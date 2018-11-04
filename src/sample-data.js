/*
 * 
 */

//const {TRIPLE_FIG, configList} = require('triple-game');
const {TRIPLE_FIG, configList} = require('triple-game');


//module.exports = () => new Object({
var game1 = {
  
  name: 'Like Standard',
  description: 'Default game initialisation',
  
  board_size:     {x: 6, y:6},
  board:          null,
  state:          null,
  logger:         false,

  // number of initial random figures 
  initial_count:  6,

  // new game figures
  initial_figures: [
  //[ figure,           probability % ]  
    [ TRIPLE_FIG.GRASS,           60  ],
    [ TRIPLE_FIG.BUSH,            15  ],
    [ TRIPLE_FIG.TREE,            2   ],
    [ TRIPLE_FIG.HUT,             0.6 ],
    [ TRIPLE_FIG.BEAR,            2.5 ],
    [ TRIPLE_FIG.ROCK,            2.5 ]
  ],
  
  // next figure while playing 
  next_figures: [
  //[ figure,           probability % ]  
 [ TRIPLE_FIG.GRASS,           60  ],
    [ TRIPLE_FIG.BUSH,            15  ],
    [ TRIPLE_FIG.TREE,            2   ],
    [ TRIPLE_FIG.HUT,             0.6 ],
    [ TRIPLE_FIG.BEAR,            2.5 ],
    [ TRIPLE_FIG.CRYSTAL,         2.5 ],
    [ TRIPLE_FIG.ROBOT,           2.5 ],
    [ TRIPLE_FIG.NINJA,           0.5 ]  ]
  
};

var game2 = {
  
  name: 'Special 1',
  description: 'just an other game\nuse initial board\nnext hut,bear,crystal,rock ',
  board_size:     {x: 8, y:6},
  initial_count:  6,
  initial_figures: [
  //[ figure,           probability % ]  
  ],
  next_figures: [
  //[ figure,           probability % ]  
    [ TRIPLE_FIG.HUT,             20  ],
    [ TRIPLE_FIG.BEAR,            5   ],
    [ TRIPLE_FIG.CRYSTAL,         10  ],
    [ TRIPLE_FIG.ROCK,             5  ],
    [ TRIPLE_FIG.ROBOT,           10  ]
]
  
};


var defaultShop = {
  items: [
    {fig: 26,  cost: 1500, stock: 4},
    {fig: 25,  cost: 1000, stock: 4}, 
    {fig:  3,  cost: 400,  stock: 7}, 
    {fig:  2,  cost: 150,  stock: 7}, 
    {fig:  1,  cost: 50,   stock: 7} 
  ],
  gold: 1000,
  cart: null
};


class Shop {
  
  constructor () {
    this.items = defaultShop.items.slice();
    this.gold  = 1000;
    this.cart  = '';
  }
  
  getState () {
    return {
      items: this.items.slice(),
      gold:  this.gold,
      cart:  this.cart
    };
  }
  
  setState (value) {
    if (!value) return;
    if (value.hasOwnProperty('items')) this.items = value.items.slice();
    if (value.hasOwnProperty('gold')) this.gold = value.gold;
    if (value.hasOwnProperty('cart')) this.cart = value.cart;
  }
  
  itemByFig (fig) {
    fig = ''+fig;
    return this.items.find( x => (''+x.fig) === fig );
  }
  
  buy (fig) {
    let item = this.itemByFig(fig);
    if (!item) return;
    --item.stock;
    this.gold -= item.cost;
    this.cart = ''+fig;
  }
  
}
  




//var gameConfig = [game1, game2]; 

var gameConfig = [configList[0], game2, game1];

//export default gameConfig;
export {gameConfig, defaultShop};
export {Shop};



