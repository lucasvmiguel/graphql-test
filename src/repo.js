import * as R from 'ramda';

class Repository {
  constructor() {
    this.items = [];
    this.autoIncrement = 0;
  }

  save(item) {
    return new Promise((resolve, reject) => {
      this.autoIncrement += 1;
      item.id = this.autoIncrement.toString();
      this.items = R.append(item, this.items);
      resolve(R.clone(item));
    });
  }

  update({id, item}) {
    return new Promise((resolve, reject) => {
      const index = R.findIndex(R.propEq('id', id))(this.items);

      if (index !== -1) {
        this.items = R.update(index, item, this.items);
        return resolve(R.clone(item));
      }

      reject('notfound')
    });
  }

  all() {
    return new Promise((resolve, reject) => {
      resolve(R.clone(this.items));
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      const item = R.find(R.propEq('id', id))(this.items);

      if (!item) return reject('notfound');

      resolve(R.clone(item));
    });
  }

  removeAll() {
    return new Promise((resolve, reject) => {
      this.items = [];
      resolve();
    });
  }
}

export default Repository;