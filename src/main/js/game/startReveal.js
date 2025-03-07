define(function(require) {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');

    const gameArea = require('game/components/gameArea');
    const revealAll = require('game/revealAll');

    async function startReveal() {

        // Listen for autoplay activation which triggers the remaining cards to reveal automatically
        msgBus.subscribe('Game.AutoPlayStart', revealAll.start);

        // Listen for autoplay deactivation which cancels the revealAll timeline
        msgBus.subscribe('Game.AutoPlayStop', revealAll.stop);
        msgBus.publish('idle.run',true);

        // Enable all of the winning numbers and player numbers, wait until they are all revealed
        await gameArea.enable();

        // continue to the next state
        gameFlow.next('REVEAL_COMPLETE');
    }

    gameFlow.handle(startReveal, 'START_REVEAL');
});
