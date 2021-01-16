import { IsNotEmpty } from 'class-validator';

export class MapDoScgDto {
  @IsNotEmpty()
  readonly origin: string;

  @IsNotEmpty()
  readonly destination: string;
}
