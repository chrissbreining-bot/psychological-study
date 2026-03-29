import { CyberballScene } from './../scenes/cyberball';
import { defaultSettings, SettingsModel } from './../models/settings-model';
import Phaser from 'phaser';
import { PhaserGameCustomElement } from 'resources/phaser-game/phaser-game';

//     // TODO: Use events to talk to Qualtrics?
//     //setTimeout(() => { window.dispatchEvent(new CustomEvent('complete', { detail: { test: 'test' } }))}, 1000)


export class GameViewModel {
    settings: SettingsModel = defaultSettings;

    // Game:

    game: PhaserGameCustomElement;

    gameWidth = 800;
    gameHeight = 460;

    gameConfig: Phaser.Types.Core.GameConfig;

    activate(params) {
        if('settings' in params) {
            this.settings = new SettingsModel(JSON.parse(atob(params.settings)));
        }

        if('playerName' in params) {
            this.settings.player.name = params.playerName;
        }

        if(this.settings.hasPortraits) {
            this.gameHeight += this.settings.portraitHeight * 2 + this.settings.portraitPadding * 4;
        }
    }

    bind() {
        this.gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#2c3e50', // 1. 引擎背景色
    scale: {
        mode: Phaser.Scale.FIT, // 2. 自动缩放填充
        autoCenter: Phaser.Scale.CENTER_BOTH, // 3. 居中
        width: 800, 
        height: 600,
        orientation: Phaser.Scale.LANDSCAPE // 4. 锁定横屏方向
    },
    // ... 其他配置
};
    // Chat:

    chatMessage: string;
    chatMessages: Array<{sender: string, text: string}> = [];

    sendMessage() {
        this.chatMessages.push({
            sender: this.settings.player.name,
            text: this.chatMessage
        });

        this.chatMessage = '';
    }
}
