import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    HealthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');
        if (!uri) throw new Error('MONGO_URI não definida no ambiente (.env)');
        return { uri };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // ajuste se seu .env não estiver na raiz do serviço
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}