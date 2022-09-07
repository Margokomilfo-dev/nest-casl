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
      can(ActionsEnum.Manage, User); //can do everything
      cannot(ActionsEnum.Manage, User, { name: { $ne: 'Margo' } }).because(
        'this function can do Margo and Admins =)',
      );
    } else {
      can(ActionsEnum.Read, User);
      cannot(ActionsEnum.Create, User).because('Your special message for user');
    }

    return build({
      detectSubjectType: (subject) =>
        subject.constructor as ExtractSubjectType<SubjectsType>,
    });
  }
}
