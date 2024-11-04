import { FindAllTagsProvider } from './providers/find-all-tags.provider';
import { UpdateTagProvider } from './providers/update-tag.provider';
import { UpdateTagDTO } from './DTOs/update-tag.dto';
import { CreateTagProvider } from './providers/create-tag.provider';
import { DeleteTagProvider } from './providers/delete-tag.provider';
import { GetAllTagProvider } from './providers/get-all-tag.provider';
import { CreateTagDTO } from './DTOs/create-tag.dto';
import { Injectable } from '@nestjs/common';
import { GetTagDTO } from './DTOs/get-tag.dto';
import { Tag } from './tag.entity';

/**
 * Service responsible for orchestrating all business operations related to tags.
 * It delegates the actual business logic to respective providers.
 */
@Injectable()
export class TagsService {
  /**
   * Constructs an instance of PostsService with dependencies injected.
   * @param {GetAllTagProvider} getAllTagProvider - provider responsible for return array of tags
   * @param {DeleteTagProvider} deleteTagProvider - provider responsible for delete a entry in database.
   * @param {CreateTagProvider} createTagProvider - provider responsible for create a entry in database.
   * @param {UpdateTagProvider} updateTagProvider - provider responsible for update a entry in database.
   * @param {FindAllTagsProvider} findAllTagsProvider - provider responsible finds array of tags (accept:array  return array)
   */
  constructor(
    private readonly getAllTagProvider: GetAllTagProvider,

    private readonly deleteTagProvider: DeleteTagProvider,

    private readonly createTagProvider: CreateTagProvider,

    private readonly updateTagProvider: UpdateTagProvider,

    private readonly findAllTagsProvider: FindAllTagsProvider,
  ) {}

  /**
   * Creates a new entry in database.
   his method delegates the creation logic to the `CreateTagProvider`.
   * @param {CreateTagDTO} createTagDTO - the tag creating
   * @returns {Promise<Tag>} - return of created tags
   */

  public async createTag(createTagDTO: CreateTagDTO): Promise<Tag> {
    return await this.createTagProvider.createTag(createTagDTO);
  }

  public async findTags(tags: number[]): Promise<Tag[]> {
    return await this.findAllTagsProvider.findTags(tags);
  }

  public async deleteTag(id: number): Promise<void> {
    return await this.deleteTagProvider.deleteTag(id);
  }

  public async getAllTags(getTagDTO: GetTagDTO): Promise<Tag[]> {
    return await this.getAllTagProvider.getAllTags(getTagDTO);
  }

  public async updateTag(updateTagDTO: UpdateTagDTO): Promise<Tag> {
    return await this.updateTagProvider.updateTag(updateTagDTO);
  }
}
