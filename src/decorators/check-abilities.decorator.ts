import { SetMetadata } from '@nestjs/common';
import { ActionsEnum } from '../ability/enums/enums';
import { SubjectsType } from '../ability/types/types';
import { User } from '../user/entities/user.entity';

export const CHECK_ABILITY = 'check-ability';
export interface RequiredRole {
  action: ActionsEnum;
  subject: SubjectsType;
}
export const CheckAbilitiesDecorator = (...requirements: RequiredRole[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequiredRole {
  action = ActionsEnum.Read;
  subject = User;
}
export class CreateUserAbility implements RequiredRole {
  action = ActionsEnum.Create;
  subject = User;
}

export class UpdateUserAbility implements RequiredRole {
  action = ActionsEnum.Update;
  subject = User;
}

export class DeleteUserAbility implements RequiredRole {
  action = ActionsEnum.Delete;
  subject = User;
}
