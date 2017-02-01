const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
const jsdom = require('jsdom');

global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.defaultView;

const Logs = require('../../lib/logs');

describe('Logs', function () {
    before(function () {
    });
/*
"ikarai takes a mulligan."1: "Mythosha keeps their hand."2: "ikarai started their turn 1 with 5  and 5 cards in HQ."3: "ikarai spends  to install a card in Server 1 (new remote)."4: "ikarai spends 2  to rez Turtlebacks."5: "ikarai uses Turtlebacks to gain 1 ."6: "ikarai spends  to install a card in Server 2 (new remote)."7: "ikarai spends  to install ICE protecting HQ."8: "ikarai spends 2  to rez Sundew."9: "ikarai is ending their turn 1 with 2  and 3 cards in HQ."10: "Mythosha started their turn 1 with 5  and 5 cards in their Grip."11: "ikarai uses Sundew to gain 2 ."12: "Mythosha spends  to install Cache."13: "Mythosha uses Kate "Mac" McCaffrey: Digital Tinker to reduce the install cost of Cache by 1 ."14: "Mythosha uses Cache to gain 1 ."15: "Mythosha uses Cache to gain 1 ."16: "Mythosha uses Cache to gain 1 ."17: "Mythosha spends  to make a run on R&D."18: "ikarai has no further action."19: "Mythosha accesses an unseen card from R&D."20: "Mythosha spends  to make a run on Server 2."21: "ikarai has no further action."22: "Mythosha accesses Sundew from Server 2."23: "Mythosha pays 2  to trash Sundew from Server 2."24: "Mythosha spends  and 1  to install Astrolabe."25: "Mythosha is ending their turn 1 with 5  and 3 cards in their Grip."26: "ikarai started their turn 2 with 4  and 3 cards in HQ."27: "ikarai uses Turtlebacks to gain 1 ."28: "Mythosha uses Astrolabe to draw 1 card."29: "ikarai spends  to install a card in Server 3 (new remote)."30: "ikarai spends  to draw a card."31: "ikarai spends  to gain 1 ."32: "ikarai is ending their turn 2 with 6  and 4 cards in HQ."33: "Mythosha started their turn 2 with 5  and 4 cards in their Grip."34: "Mythosha spends 2  and  to play Deuces Wild."35: "Mythosha uses Deuces Wild to gain 3 ."36: "Mythosha uses Deuces Wild to draw 2 cards."37: "Mythosha spends  to play Diesel."38: "Mythosha uses Diesel to draw 3 cards."39: "Mythosha spends  and 1  to install Aesop's Pawnshop."40: "Mythosha spends  to install Cache."41: "Mythosha uses Kate "Mac" McCaffrey: Digital Tinker to reduce the install cost of Cache by 1 ."42: "Mythosha uses Cache to gain 1 ."43: "Mythosha uses Cache to gain 1 ."44: "Mythosha uses Cache to gain 1 ."45: "Mythosha is ending their turn 2 with 8  and 5 cards in their Grip."46: "ikarai started their turn 3 with 6  and 4 cards in HQ."47: "ikarai rezzes Tech Startup."48: "ikarai uses Tech Startup to install Turtlebacks."49: "ikarai uses Turtlebacks to gain 1 ."50: "Mythosha uses Astrolabe to draw 1 card."51: "ikarai installs a card in Server 4 (new remote)."52: "ikarai spends  to draw a card."53: "ikarai spends  to install ICE protecting R&D."54: "ikarai spends  to gain 1 ."55: "ikarai is ending their turn 3 with 8  and 5 cards in HQ."56: "Mythosha started their turn 3 with 8  and 6 cards in their Grip."57: "Mythosha uses Aesop's Pawnshop to trash Cache and g"
*/
    describe('#turns', function () {
        document.body.innerHTML = `<div id="msgs" class="messages">
                <div class="system">player 1 takes a mulligan.</div>
                <div class="system">player 1 started their turn 1 with 5  and 5 cards in HQ.</div>
                <div class="system">player 2 started their turn 1 with 5  and 5 cards in their Grip.</div>
                <div class="system">player 1 started their turn 2 with 4  and 3 cards in HQ.</div>
                <div class="system">player 1 ikarai spends  to install ICE protecting HQ.</div>
                <div class="system">player 2 started their turn 2 with 4  and 3 cards in HQ.</div>
            </div>`;

        let logs = new Logs(document.getElementById('msgs'));

        it('returns start of turn log texts verbatim', function () {
            expect(logs.turns.length).to.equal(4);
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

    });
});
