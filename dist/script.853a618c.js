// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({10:[function(require,module,exports) {

var patterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
[0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
[0, 4, 8], [2, 4, 6]]; // diagonal
var createBoard = function createBoard() {
    var _cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    return {
        cells: function cells() {
            return _cells.slice(0);
        },
        mark1: function mark1(position) {
            _cells[position] = 1;
            console.log(_cells);
        },
        mark2: function mark2(position) {
            _cells[position] = 2;
            console.log(_cells);
        },
        isEmptyCell: function isEmptyCell(position) {
            return _cells[position] == 0 ? true : false;
        }
    };
};

var playerBuilder = function playerBuilder() {
    var lastId = 0;
    return function (name) {
        lastId += 1;
        return {
            name: name,
            id: lastId
        };
    };
};
var createPlayer = playerBuilder();

var createGame = function createGame(p1, p2) {
    var board = createBoard();
    var winnerId = 0;
    var currentPlayer = p1;
    var switchPlayer = function switchPlayer() {
        if (currentPlayer == p1) currentPlayer = p2;else currentPlayer = p1;
    };
    var checkWin = function checkWin() {
        var currentBoard = board.cells();
        var hasWinningPattern = false;
        var playerMarks = [];
        for (var i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] == currentPlayer.id) {
                playerMarks.push(i);
            }
        }
        console.log('player marks: ' + playerMarks);
        if (playerMarks.length >= 3) {
            patterns.forEach(function (pattern) {
                if (pattern.every(function (cell) {
                    return playerMarks.indexOf(cell);
                }) != -1) {
                    hasWinningPattern = true;
                }
            });
        }
        return hasWinningPattern;
    };
    return {
        getBoard: function getBoard() {
            return board.cells();
        },
        getWinnerId: function getWinnerId() {
            return winnerId;
        },
        turn: function turn(position) {
            if (board.isEmptyCell(position)) {
                if (currentPlayer == p1) {
                    board.mark1(position);
                } else {
                    board.mark2(position);
                }
            } else console.log('This cell is taken.');

            if (checkWin()) {
                if (currentPlayer == p1) {
                    winnerId = 1;
                } else {
                    winnerId = 2;
                }
                console.log('We have a winner');
                return true;
            } else {
                switchPlayer();
                return false;
            }
        }
    };
};

module.exports = {
    createBoard: createBoard,
    createGame: createGame,
    createPlayer: createPlayer
};
},{}],11:[function(require,module,exports) {
var renderBoard = function renderBoard(game) {
    var boardDiv = document.getElementById('board');
    while (boardDiv.lastChild) {
        boardDiv.removeChild(boardDiv.lastChild);
    }
    var cells = game.getBoard();

    var _loop = function _loop(i) {
        var cell = document.createElement('div');
        cell.setAttribute('id', '' + i);
        //inner text doesn't show
        if (cells[i] == 0) cell.innerText = '';else if (cells[i] == 1) cell.innerText = 'X';else cell.innerText = 'O';
        boardDiv.appendChild(cell);
        cell.addEventListener('click', function () {
            return game.turn(i);
        });
    };

    for (var i = 0; i < cells.length; i++) {
        _loop(i);
    }
};

module.exports = {
    renderBoard: renderBoard
};
},{}],6:[function(require,module,exports) {
var tictactoe = require('./game');
var view = require('./view');

var player1Input = document.getElementById('player1');
var player2Input = document.getElementById('player2');
var createGameBtn = document.getElementById('create-game-btn');

var player1 = void 0;
var player2 = void 0;

function startNewGame() {
    player1 = tictactoe.createPlayer(player1Input.value || 'First player');
    player2 = tictactoe.createPlayer(player1Input.value || 'Second player');
    var game = tictactoe.createGame(player1, player2);
    view.renderBoard(game);
}
createGameBtn.addEventListener('click', startNewGame);
},{"./game":10,"./view":11}],18:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51762' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[18,6], null)
//# sourceMappingURL=/script.853a618c.map