import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AbilityModule } from './ability/ability.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './guards/abilities.guard';

@Module({
  imports: [UserModule, AbilityModule],
  controllers: [AppController],
  providers: [
    AppService,
    //in controller you can not use   @UseGuards(AbilitiesGuard) after this part of code (down)
    {
      provide: APP_GUARD,
      useClass: AbilitiesGuard,
    },
  ],
})
export class AppModule {}
