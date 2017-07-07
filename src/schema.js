import { buildSchema } from 'graphql';

const schema = buildSchema(`
  # All possible queries
  type Query {
    # Get all salesmen
    salesmen: [Salesman]!
    # Get a saleman
    salesman(id: ID!): Salesman
    # Get all phones
    phones: [Phone]!
    # Get a phone
    phone(id: ID!): Phone
  }

  # All possible mutations
  type Mutation {
    # Save a salesman
    addSalesman(salesman: SalesmanInput!): Salesman
    # Save a phone
    addPhone(phone: PhoneInput!): Phone
  }

  # Salesman Input
  input SalesmanInput {
    name: String!
    phones: [PhoneInput]
  }

  # Salesman Struct
  type Salesman {
    id: ID!
    name: String!
    phones: [Phone]!
  }

  # Phone Input
  input PhoneInput {
    name: String!
  }

  # Phone Struct
  type Phone {
    id: ID!
    name: String!
  }
`);

export default schema;