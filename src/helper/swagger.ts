import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RawServerDefault } from 'fastify';

export const SwaggerSetup = (app: NestFastifyApplication<RawServerDefault>) => {
  const options = new DocumentBuilder()
    .setTitle('API Flights')
    .setDescription('Scheduled Flights App')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });
};
