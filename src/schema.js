import { buildSchema } from 'graphql';

const schema = buildSchema(`
  # All possible queries
  type Query {
    # Get all salesmen
    salesmen: [Salesman]!
    # Get a saleman
    salesman(id: ID!): Salesman
    # Save a salesman
    addSalesman(salesman: SalesmanInput!): Boolean
    # Get all phones
    phones: [Phone]!
    # Get a phone
    phone(id: ID!): Phone
    # Save a phone
    addPhone(phone: PhoneInput!): Boolean
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