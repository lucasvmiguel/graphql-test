import express from 'express';
import graphqlHTTP from 'express-graphql';
import R from 'ramda';

import schema from './schema';
import Repository from './repo';

const salesmenRepo = new Repository();
const phonesRepo = new Repository();

salesmenRepo.save({name: 'Lucas', phones: ['1', '2', '3']});
salesmenRepo.save({name: 'Valdir', phones: ['2']});
salesmenRepo.save({name: 'Chico', phones: []});

phonesRepo.save({name: 'Moto G1'});
phonesRepo.save({name: 'Moto G2'});
phonesRepo.save({name: 'Moto G3'});

const completeSalesman = (salesman) => {
  let phones = [];

  salesman.phones = salesman.phones.map(phoneId => phonesRepo.find(phoneId));

  return salesman;
};

const root = {
  addSalesman: ({salesman}) => salesmenRepo.save(salesman),
  salesman: ({id}) => salesmenRepo.find(id).then(completeSalesman),
  salesmen: (_, _, {fieldNodes}) => {
    // console.log('obj', obj);
    // console.log('args', args);
    // fieldNodes.selectionSet.selections[x].name.value === 'phones'
    // console.log('context', JSON.stringify(fieldNodes));

    return salesmenRepo.all().then(salesmen => salesmen.map(completeSalesman));
  },

  addPhone: ({phone}) => phonesRepo.save(salesman),
  phone: ({id}) => phonesRepo.find(id),
  phones: () => phonesRepo.all()
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

