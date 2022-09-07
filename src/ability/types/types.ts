import { Ability, InferSubjects } from '@casl/ability';
import { User } from '../../user/entities/user.entity';
import { ActionsEnum } from '../enums/enums';

// export type Subjects = InferSubjects<typeof User | typeof Post> | 'all';
export type SubjectsType = InferSubjects<typeof User> | 'all';
export type AppAbilityType = Ability<[ActionsEnum, SubjectsType]>;
