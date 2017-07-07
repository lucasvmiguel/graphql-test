import express from 'express';
import graphqlHTTP from 'express-graphql';
import R from 'ramda';
import cors from 'cors';

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

const containsField = (field, info) => {
  return R.compose(
    R.contains(field),
    R.map(s => s.name.value),
    R.path(['fieldNodes', 0, 'selectionSet', 'selections'])
  )(info);
}

const completeSalesman = (salesman, info) => {
  if (containsField('phones', info)) salesman.phones = salesman.phones.map(phoneId => phonesRepo.find(phoneId));

  return salesman;
};

const resolvers = {
  // queries
  salesman: ({id}, context, info) => salesmenRepo.find(id).then((sm) => completeSalesman(sm, info)),
  salesmen: (args, context, info) => salesmenRepo.all().then((sms) => sms.map((sm) => completeSalesman(sm, info))),
  phone: ({id}) => phonesRepo.find(id),
  phones: () => phonesRepo.all(),

  // mutations
  addSalesman: ({salesman}) => salesmenRepo.save(salesman),
  addPhone: ({phone}) => phonesRepo.save(salesman)
};

var app = express();

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

