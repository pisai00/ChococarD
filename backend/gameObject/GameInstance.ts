/**
 * 卡牌 (Card) 的資料結構
 */
interface Card {
  id: string;
  name: string;
  description: string;
  type: 'attack' | 'skill' | 'power';
  cost: number;
  effect: Effect[];
  // ... 其他卡牌屬性
}

/**
 * 聖物 (Relic) 的資料結構
 */
interface Relic {
  id: string;
  name: string;
  description: string;
  effect: Effect[];
  // ...
}

/**
 * 卡牌效果 (Effect) 的資料結構
 */
interface Effect {
  type: 'damage' | 'heal' | 'draw' | 'buff' | 'debuff';
  value: number;
  target: 'self' | 'enemy' | 'allEnemies' | 'allCharacters';
  duration?: number;
  // ... 其他效果屬性
}

/**
 * 地圖資料 (MapData) 的資料結構
 */
interface MapData {
  nodes: Node[];
  edges: Edge[];
  currentNodeId: string;
  // ... 其他地圖相關屬性
}

/**
 * 地圖節點 (Node) 的資料結構
 */
interface Node {
  id: string;
  type: 'event' | 'battle' | 'rest' | 'shop' | 'treasure';
  x: number;
  y: number;
  // ...
}

/**
 * 地圖邊緣 (Edge) 的資料結構
 */
interface Edge {
  from: string;
  to: string;
}

/**
 * 戰鬥狀態 (BattleState) 的資料結構
 */
interface BattleState {
  round: number;
  turnOrder: string[];
  playerCharacters: Character[];
  enemies: Character[];
  // ... 其他戰鬥相關資訊
}

/**
 * 探索狀態 (ExplorationState) 的資料結構
 */
interface ExplorationState {
  currentLocation: { x: number; y: number };
  exploredAreas: { x: number; y: number }[];
  currentEventId?: string;
  // ... 其他探索相關資訊
}

/**
 * 角色 (Character) 的資料結構
 */
interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  energy: number;
  // ...
}

/**
 * 事件狀態 (EventState) 的資料結構
 */
interface EventState {
  eventStage: number;
  choices: string[];
  // ...
}

/**
 * 商店狀態 (ShopState) 的資料結構
 */
interface ShopState {
  availableItems: Item[];
  // ...
}

/**
 * 菜單狀態 (MenuState) 的資料結構
 */
interface MenuState {
  currentMenu: string;
  // ...
}

/**
 * 對話狀態 (DialogueState) 的資料結構
 */
interface DialogueState {
  currentDialogueId: string;
  // ...
}

/**
 * 道具 (Item) 的資料結構
 */
interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  // ...
}

/**
 * 遊戲實例 (GameInstance) 的類別
 */
class GameInstance {
  /**
   * 遊戲實例的唯一識別碼
   */
  gameId: string;

  /**
   * 儲存玩家的全局遊戲狀態，例如玩家的持久性資料。
   */
  gameState: {
    playerId: string;
    hp: number;
    deck: Card[];
    relics: Relic[];
    map: MapData;
    // ... 其他全局玩家狀態
  };

  /**
   * 儲存遊戲實例的當前狀態，包含遊戲類型和該類型特定的狀態資料。
   */
  currentState: {
    gameType: 'battle' | 'exploration' | 'event' | 'shop' | 'menu' | 'dialogue';
    state: BattleState | ExplorationState | EventState | ShopState | MenuState | DialogueState;
  };

  /**
   * 遊戲實例的創建時間。
   */
  createdAt: number;

  /**
   * 遊戲實例的上次活動時間。
   */
  lastActivityAt: number;

  /**
   * 建構函式，用於初始化 GameInstance 的實例。
   */
  constructor(
    gameId: string,
    gameState: {
      playerId: string;
      hp: number;
      deck: Card[];
      relics: Relic[];
      map: MapData;
      // ... 其他全局玩家狀態
    },
    currentState: {
      gameType: 'battle' | 'exploration' | 'event' | 'shop' | 'menu' | 'dialogue';
      state: BattleState | ExplorationState | EventState | ShopState | MenuState | DialogueState;
    },
    createdAt: number,
    lastActivityAt: number
  ) {
    this.gameId = gameId;
    this.gameState = gameState;
    this.currentState = currentState;
    this.createdAt = createdAt;
    this.lastActivityAt = lastActivityAt;
  }

  /**
   * 更新 gameState 的方法。
   * @param {object} newGameState - 新的 gameState 物件。
   */
  updateGameState(newGameState: {
    playerId: string;
    hp: number;
    deck: Card[];
    relics: Relic[];
    map: MapData;
    // ... 其他全局玩家狀態
  }) {
    this.gameState = newGameState;
    this.updateLastActivityAt();
  }

  /**
   * 更新 currentState 的方法。
   * @param {object} newCurrentState - 新的 currentState 物件。
   */
  updateCurrentState(newCurrentState: {
    gameType: 'battle' | 'exploration' | 'event' | 'shop' | 'menu' | 'dialogue';
    state: BattleState | ExplorationState | EventState | ShopState | MenuState | DialogueState;
  }) {
    this.currentState = newCurrentState;
    this.updateLastActivityAt();
  }

  /**
   * 更新 lastActivityAt 的方法。
   */
  updateLastActivityAt() {
    this.lastActivityAt = Date.now();
  }

  /**
   * 獲取 gameInstance 的所有資料
   * @returns {object}
   */
  getData(): {
    gameId: string;
    gameState: {
      playerId: string;
      hp: number;
      deck: Card[];
      relics: Relic[];
      map: MapData;
      // ... 其他全局玩家狀態
    };
    currentState: {
      gameType: 'battle' | 'exploration' | 'event' | 'shop' | 'menu' | 'dialogue';
      state: BattleState | ExplorationState | EventState | ShopState | MenuState | DialogueState;
    };
    createdAt: number;
    lastActivityAt: number;
  } {
    return {
      gameId: this.gameId,
      gameState: this.gameState,
      currentState: this.currentState,
      createdAt: this.createdAt,
      lastActivityAt: this.lastActivityAt,
    };
  }
}

export default GameInstance;
