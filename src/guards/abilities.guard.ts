import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from '../ability/ability.factory';
import { CHECK_ABILITY } from '../decorators/check-abilities.decorator';
import { ForbiddenError } from '@casl/ability';
import { currentUser } from '../subjects/users';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get(CHECK_ABILITY, context.getHandler()) || [];
    //{user} = context.switchToHttp().getRequest()
    const user = currentUser;
    const ability = this.caslAbilityFactory.defineAbility(user);
    try {
      // rules.forEach((rule) =>
      //   ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      // );
      // return true;
      return rules.every((rule) => ability.can(rule.action, rule.subject));
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
