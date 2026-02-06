import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}
  
  async create(createTaskDto: CreateTaskDto) {
  const created = await this.taskModel.create(createTaskDto);
  return created;
  }

  aasync findAll({ page, limit, sort }: PaginationDto) {
  const safePage = Math.max(page ?? 1, 1);

  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 50;
  const safeLimit = Math.min(Math.max(limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);

  const skip = (safePage - 1) * safeLimit;

  // ---------------------------
  // SORT (contract lives here)
  // ---------------------------

  const DEFAULT_SORT_FIELD = 'createdAt';
  const DEFAULT_SORT_DIR: 'asc' | 'desc' = 'desc';

  const ALLOWED_SORT_FIELDS = new Set([
    'createdAt',
    'updatedAt',
    // adicione só se existir e fizer sentido:
    // 'title',
    // 'status',
  ]);

  let sortField = DEFAULT_SORT_FIELD;
  let sortDir: 'asc' | 'desc' = DEFAULT_SORT_DIR;

  if (sort) {
    const [field, dir] = sort.split(':') as [string, 'asc' | 'desc'];

    if (!ALLOWED_SORT_FIELDS.has(field)) {
      // 400 é o comportamento correto: input inválido
      throw new BadRequestException(
        `Invalid sort field. Allowed: ${Array.from(ALLOWED_SORT_FIELDS).join(', ')}`,
      );
    }

    sortField = field;
    sortDir = dir;
  }

  const mongoSort: Record<string, 1 | -1> = {
    [sortField]: sortDir === 'asc' ? 1 : -1,
  };

  return this.taskModel
    .find()
    .sort(mongoSort)
    .skip(skip)
    .limit(safeLimit)
    .lean();
  }
  
  findOne(id: string) {
    return `This action returns a #${id} task`;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}