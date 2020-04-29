import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class StudentItemDTO {

	@Expose()
	public readonly id: number;

	@Expose()
	public readonly name: string;

	@Expose()
	public readonly surname: string;

	public constructor(args: Partial<StudentItemDTO>) {
		Object.assign(this, args);
	}

}
