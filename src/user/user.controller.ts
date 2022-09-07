import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory } from '../ability/ability.factory';
import { User } from './entities/user.entity';
import { ActionsEnum } from '../ability/enums/enums';
import { ForbiddenError } from '@casl/ability';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user: User = { id: 1, name: 'Mia', isAdmin: true }; //req.user
    const ability = this.abilityFactory.defineAbility(user);

    // const isAllowed = ability.can(ActionsEnum.Create, User);
    // if (!isAllowed) {
    //   throw new ForbiddenException('only admin!');
    // }
    // return this.userService.create(createUserDto);

    try {
      ForbiddenError.from(ability)
        // .setMessage('Only Admin Role') //or because('')
        .throwUnlessCan(ActionsEnum.Create, User);
      return this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: User = { id: 1, name: 'Mia', isAdmin: true }; //req.user

    try {
      return this.userService.update(+id, updateUserDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
