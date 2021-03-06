const UserTypes = `
    #USER DEFINITION TYPE
    type User{
        id: ID!
        name: String!
        email:String!
        photo:String
        createdAt:String!
        updateAt:String!
        posts(first: Int, offset: Int):[Post!]!
    }

    input UserCreateInput{
        name: String!
        email:String!
        password:String!        
    }

    input UserUpdateInput{
        name: String!
        email:String!
        photo:String!      

    }

    input UserUpdatePasswordInput{
        passwrod:String!
    }
`;

const userQueries = `
    users(first:Int, offset:Int):[User!]!
    user(id:ID!):User    
`;

const userMutation = `
    createUser(input: UserCreateInput!):User
    updateUser(id:ID!,input:UserUpdateInput): User
    updateUserPassword(id:ID!,input:UserUpdatePasswordInput!): Boolean
    deleteUser(id:ID!): Boolean
`;

export{UserTypes,userQueries,userMutation}