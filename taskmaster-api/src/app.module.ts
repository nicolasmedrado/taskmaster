import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      // Torna o módulo global, dispensando importação em outros módulos
      isGlobal: true, 
      // Caminho opcional para o arquivo .env (padrão é a raiz do projeto)
      envFilePath: '.env', 
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}