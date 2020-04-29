import { CourseDTO, CourseDetailDTO, StudentItemDTO } from 'src/dtos';
import { Repository } from 'typeorm';
import { Course } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { isNullOrUndefined } from 'util';

@Injectable()
export class CourseService {

	public constructor(@InjectRepository(Course) private readonly courseRepository: Repository<Course>) {}

	/**
	 * find all courses in repository sorted by section and year
	 */
	public async findAll(): Promise<CourseDTO[]> {

		const courses = await this.courseRepository
			.createQueryBuilder('course')
				.orderBy('course.name')
				.addOrderBy('course.grade')
			.getMany();

		return courses.map(course => new CourseDTO({ id : course.id, name : course.name, grade : course.grade }));

	}

	/**
	 * find one course by id
	 */
	public async findById(id: number): Promise<CourseDetailDTO> {

		const course = await this.courseRepository.findOne(id, { relations: ['students'] });

		if (isNullOrUndefined(course)) return null;

		const students = await course.students;

		const studentDtos = (students || []).map(student => new StudentItemDTO({ id : student.id, name : student.name, surname : student.surname }));

		const courseDetailDto = new CourseDetailDTO({ id: course.id, name : course.name, grade : course.grade, students : studentDtos });

		return courseDetailDto;

	}

}
