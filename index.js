import {ApolloServer, gql} from 'apollo-server'

const persons = [
    {
        name: "Hugo",
        phone:"155999888",
        street:"Shibuya 37",
        city: "Tokyo",
        id:"3d594650-3536-11a9-bc56-8b80vb54d652"
    },
    {
        name: "Juan",
        phone:"155777556",
        street:"Dotonbori 572",
        city: "Osaka",
        id:"3d5sd560-3593-18f9-bc56-8c65t654d897"
    },
    {
        name: "Tanaka",
        phone:"154732651",
        city: "Hakodate",
        id:"6d93587d-7596-11a9-bt96-9sd254t56e50"
    },
]


const typeDefinitions = gql`

    type Address{
        street: String!
        city: String!
    }
    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons:[Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query:{
        personCount:() => persons.length,
        allPersons:() =>persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name == name)
        }
    },
     Person: {
        address: (root) => {
            return{
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs:typeDefinitions,
    resolvers
})

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})