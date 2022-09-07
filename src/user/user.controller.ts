import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory } from '../ability/ability.factory';
import {
  CheckAbilitiesDecorator,
  CreateUserAbility,
  DeleteUserAbility,
  ReadUserAbility,
  UpdateUserAbility,
} from '../decorators/check-abilities.decorator';
import { currentUser } from '../subjects/users';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  // @UseGuards(AbilitiesGuard) is implemented in appModule

  // @UseGuards(AbilitiesGuard)
  @CheckAbilitiesDecorator(new CreateUserAbility())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @UseGuards(AbilitiesGuard)
  @CheckAbilitiesDecorator(new ReadUserAbility())
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  // @UseGuards(AbilitiesGuard)
  @CheckAbilitiesDecorator(new ReadUserAbility())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(AbilitiesGuard)
  @CheckAbilitiesDecorator(new UpdateUserAbility())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = currentUser;
    return this.userService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  // @UseGuards(AbilitiesGuard)
  @CheckAbilitiesDecorator(new DeleteUserAbility())
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
