const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
const jsdom = require('jsdom');

global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.defaultView;

const Logs = require('../../lib/logs');

describe('Logs', function () {
    document.body.innerHTML = `<div id="msgs" class="messages">
            <div class="system">player 1 takes a mulligan.</div>
            <div class="system">player 1 started their turn 1 with 5  and 5 cards in HQ.</div>
            <div class="system">player 2 started their turn 1 with 5  and 5 cards in their Grip.</div>
            <div class="system">player 1 started their turn 2 with 4  and 3 cards in HQ.</div>
            <div class="system">player 1 spends  to install ICE protecting HQ.</div>
            <div class="system">player 2 started their turn 2 with 4  and 3 cards in HQ.</div>
            <div class="system">player 1 started their turn 3 with 8  and 3 cards in HQ.</div>
        </div>`;

    let logs = new Logs(document.getElementById('msgs'));

    it('returns start of turn log texts verbatim', function () {
        expect(logs.turns.length).to.equal(5);
        expect(logs.turns.indexOf('player 1 started their turn 1 with 5  and 5 cards in HQ.'))
            .to.not.equal(-1);
        expect(logs.turns.indexOf('player 1 takes a mulligan.'))
            .to.equal(-1);
    });

    it('provides correct player names', function () {
        expect(logs.players.size).to.equal(2);
        expect(logs.players.has('player 1')).to.be.true;
        expect(logs.players.has('player 2')).to.be.true;
    });

    it('returns analysis of credits earned', function () {
        expect(logs.analysis
            .filter(log => log.name === 'player 1')[0]
            .credits
        ).to.deep.equal([5, 4, 8]);

        expect(logs.analysis
            .filter(log => log.name === 'player 2')[0]
            .credits
        ).to.deep.equal([5, 4]);
    });
});
