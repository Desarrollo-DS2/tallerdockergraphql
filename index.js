const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    aboutJulian : String
    aboutHerrera: String
    aboutSamuel: String
    aboutYissy: String
    aboutChristian: String
    aboutJuan: String
    aboutSebastian: String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },
    aboutJulian: () => {
      return `Hola, soy Julian Rendon, soy estudiante de Ingeniería de Sistemas y mis pasatiempos
      favoritos son ver y jugar basketball, tenis de mesa y fútbol, además de jugar videojuegos
      y compartir con mis amigos y familia. `;
    },
    aboutHerrera: (_) => {
      return `¡Hola! Soy Nicolas Herrera, estudiante de Ing de Sistemas en Univalle, me gusta el futbol (Hincha del Real Madrid) y 
      disfruto de leer historias de fantasia y ciencia ficcion. Tambien me gusta leer y aprender de temas de historia y fisica.`
    },
    aboutSamuel: (_) => {
      return `¡Hola! Soy Samuel, estudiante de Ingeniería de Sistemas en la Universidad del Valle. ultimamente me gusta bailar, conocer personas nuevas, salir de mi zona de confort, pasar algo de pena a veces y aprender cosas nuevas.`
    },
    aboutYissy: (_) => {
      return `¡Hola! Soy Yissy, estudiante de ingeniería de sistemas en univalle. Me gusta mucho la música y lo que implica: escuchar, cantar y bailar.
      Ultimamente disfruto mucho ir al gimnasio y la vida fitness, sin embargo el dulce ha sido mi kryptonita :( `
    },
    aboutChristian: (_) => {
      return `Hola:). Soy Christian, tengo 26 años y soy estudiante de Ingeniería de Sistemas en la Universidad del Valle.
      Me gusta mucho aprender idiomas y mi artista favorita es Lana del Rey.
      Ingeniería de Sistemas es mi segunda carrera, antes estudié Ingeniería Química.`
    },
    aboutJuan: (_) => {
      return `Hola mundo! soy Juan Loaiza, un joven de 20 años que respira tecnologia y se emociona con los grandes proyectos de software, también soy un apasionado melómano que ama descubrir canciones, artistas y generos nuevos pa poner a vibrar mis oidos y mis dias ヾ(⌐■_■)ノ♪, desde el metal sacudiendo mis sentidos hasta el jazz acariciando mi alma, la electrónica marcando el pulso de mis latidos y el dubstep desafiando mi sentido del ritmo (ﾉ^_^)ﾉ`
    },
    aboutSebastian: (_) => {
      return `Hola, soy Sebastian Muñoz, tengo 20 años y soy un estudiante de Ingenieria de Sistemas. Me gusta ir al gimnasio, hacer y ver distintos deportes. Me encanta descubrir nuevas peliculas y música, así como disfrtuar el tiempo con mi familia y amigos.`
    },
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();

