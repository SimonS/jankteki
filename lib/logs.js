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
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Logs;
}
