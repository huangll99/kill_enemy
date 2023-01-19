import { _decorator, Component, Node, Label, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  @property({ type: Node })
  private enemySkillNode: Node = null;

  @property({ type: Label })
  private hintLabel: Label = null;

  private enemyAttackType = 0;
  private timer = null;

  start() {
    this.timer = setInterval(() => {
      this.randEnemyAttack();
    }, 100);
  }

  // 敌人随机出技能
  randEnemyAttack() {
    this.enemyAttackType = Math.floor(Math.random() * 3);

    let children = this.enemySkillNode.children;
    children.forEach((childNode) => {
      if (childNode.name == this.enemyAttackType.toString()) {
        childNode.active = true;
      } else {
        childNode.active = false;
      }
    });
  }

  // 玩家
  attack(event, customEventData) {
    if (!this.timer) {
      return;
    }

    clearInterval(this.timer);
    this.timer = null;

    let pkRes = 0; // 0:平 1:赢 -1:输
    let attackType = event.target.name;

    if (attackType == 0) {
      if (this.enemyAttackType == 0) {
        pkRes = 0;
      } else if (this.enemyAttackType == 1) {
        pkRes = 1;
      } else if (this.enemyAttackType == 2) {
        pkRes = -1;
      }
    } else if (attackType == 1) {
      if (this.enemyAttackType == 0) {
        pkRes = -1;
      } else if (this.enemyAttackType == 1) {
        pkRes = 0;
      } else if (this.enemyAttackType == 2) {
        pkRes = 1;
      }
    } else if (attackType == 2) {
      if (this.enemyAttackType == 0) {
        pkRes = 1;
      } else if (this.enemyAttackType == 1) {
        pkRes = -1;
      } else if (this.enemyAttackType == 2) {
        pkRes = 0;
      }
    }

    if (pkRes == -1) {
      this.hintLabel.string = "失败";
    } else if (pkRes == 0) {
      this.hintLabel.string = "平局";
    } else {
      this.hintLabel.string = "胜利";
    }
  }

  restart() {
    director.loadScene("main");
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}
