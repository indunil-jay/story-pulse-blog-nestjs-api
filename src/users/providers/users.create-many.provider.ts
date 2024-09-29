import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDTO } from '../DTOs/create-many-user.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    //inject data souce
    private readonly dataSource: DataSource,
  ) {}

  // create many users
  public async createManyUsers(createManyUsersDTO: CreateManyUsersDTO) {
    let users: User[] = [];

    //create Query runner intance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      //connect query runner to data source
      await queryRunner.connect();

      //start transactions
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('could not connect to the database.');
    }

    try {
      for (let user of createManyUsersDTO.users) {
        let newUser = queryRunner.manager.create(User, user);
        let results = await queryRunner.manager.save(newUser);
        users.push(results);
      }
      //if successfull go ahead and commit
      await queryRunner.commitTransaction();
    } catch (error) {
      //if failed roll-back
      await queryRunner.rollbackTransaction();

      throw new ConflictException('Could not complete the trasaction', {
        description: String(error),
      });
    } finally {
      try {
        //release the connection
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('could not release the connection', {
          description: String(error),
        });
      }
    }
    return users;
  }
}
