require('dotenv');

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const AlbumService = require('./service/inMemory/AlbumsServeice')

const init = async () =>{
  const albumService = new AlbumService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes:{
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: albums,
    options:{
      service: albumService,
    }
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

