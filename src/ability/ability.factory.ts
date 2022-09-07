//main part using rules and permissions
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { AppAbilityType, SubjectsType } from './types/types';
import { ActionsEnum } from './enums/enums';

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    //define rules
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbilityType>,
    );

    if (user.isAdmin) {
      can(ActionsEnum.Manage, 'all');
      cannot(ActionsEnum.Manage, User, { orgId: { $ne: user.orgId } }).because(
        'You can only manage users in your own organization',
      );
    } else {
      console.log(user);
      can(ActionsEnum.Read, User, ['orgId']);
      cannot(ActionsEnum.Create, User).because(
        'Your special message for user: Only Admins!!!',
      );
      cannot(ActionsEnum.Delete, User).because('no chance=)');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<SubjectsType>,
    });
  }
}
