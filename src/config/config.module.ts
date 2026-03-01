import { Global, Module } from '@nestjs/common';
import { ConfigService, validateEnv } from './config.service';

@Global()
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
