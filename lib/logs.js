class Logs {
    constructor(logElement) {
        this.source = logElement;
    }

    get turns() {
        return Array.from(this.source.querySelectorAll('.system'))
            .map(el => el.textContent)
            .filter(t => t.indexOf("started their turn") !== -1);
    }

    get players() {
        return new Set(this.turns
            .map(str => str.match(/^(.+) started their turn/)[1]));
    }

    get analysis() {
        return Array.from(this.players).map(name => { 
            return {
                name: name, 
                credits: this.turns
                    .filter(start => start.indexOf(`${name} `) === 0)
                    .map(start => start.match(/with (\d+)/)[1])
                    .map(credits => parseInt(credits))
            };
        });
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Logs;
}
