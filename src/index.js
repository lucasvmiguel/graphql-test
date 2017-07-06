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
salesmenRepo.save({name: 'Gabriel'});

phonesRepo.save({name: 'Moto G1'});
phonesRepo.save({name: 'Moto G2'});
phonesRepo.save({name: 'Moto G3'});

const completeSalesman = (salesman) => {
  let phones = [];
  
  if (R.type(salesman.phones) === 'Array') {
    salesman.phones = salesman.phones.map(phoneId => phonesRepo.find(phoneId));
  } else {
    salesman.phones = [];
  }
  
  return salesman;
};

const root = {
  addSalesman: ({salesman}) => salesmenRepo.save(salesman),
  salesman: ({id}) => salesmenRepo.find(id).then(completeSalesman),
  salesmen: () => salesmenRepo.all().then(salesmen => salesmen.map(completeSalesman)),

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

