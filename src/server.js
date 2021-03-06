require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const AlbumService = require('./service/inMemory/AlbumsServeice')

const init = async () =>{
  const albumService = new AlbumService();
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
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

