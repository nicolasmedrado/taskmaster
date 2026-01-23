import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  
  getHello(): string {
    const apiKey = this.configService.get<string>('API_KEY');
    return `A sua chave da API é: ${apiKey}`;
  }
}
