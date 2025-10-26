export default class DB {
    constructor() {
        this._rows = [];
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            if (data.id) {
                if (typeof data.id !== 'number') {
                    this._simulateAsync(reject, 'ID can be only number!');
                    return;
                } else if (this._rows.some(item => item.id === data.id)) {
                    this._simulateAsync(reject, "ID can't be duplicated!");
                    return;
                }
            }

            this._simulateAsync(() => {
                if (!data.id) {
                    const maxId = this._rows.length > 0
                        ? Math.max(...this._rows.map(item => item.id))
                        : 0;
                    data.id = maxId + 1;
                }

                this._rows.push(data);
                resolve(data);
            });
        });
    }

    select(id) {
        return new Promise((resolve, reject) => {
            this._simulateAsync(() => {
                const row = this._rows.find(item => item.id === id);
                row ? resolve(row) : reject('ID not found');
            });
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._simulateAsync(() => {
                const lengthBefore = this._rows.length;
                this._rows = this._rows.filter(item => item.id !== id);
                const lengthAfter = this._rows.length;

                if (lengthBefore === lengthAfter) {
                    reject('Item not exist!');
                } else {
                    resolve('Item was remove!');
                }
            });
        });
    }

    update(data) {
        return new Promise((resolve, reject) => {
            if (!data.id) {
                this._simulateAsync(reject, 'ID have to be set!');
            } else {
                this._simulateAsync(() => {
                    let updated = null;
                    this._rows = this._rows.map(item => {
                        if (item.id === data.id) {
                            updated = { ...item, ...data };
                            return updated;
                        }
                        return item;
                    });

                    updated ? resolve(updated) : reject('ID not found!');
                });
            }
        });
    }

    truncate() {
        return new Promise(resolve => {
            this._simulateAsync(() => {
                this._rows = [];
                resolve(true);
            });
        });
    }

    getRows() {
        return new Promise(resolve => {
            this._simulateAsync(() => resolve(this._rows));
        });
    }

    _simulateAsync(callback, ...params) {
        setTimeout(() => callback(...params), Math.random() * 100);
    }
}