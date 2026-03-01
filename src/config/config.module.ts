import { Module } from '@nestjs/common';
import { ConfigService, validateEnv } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: () => validateEnv(process.env),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
