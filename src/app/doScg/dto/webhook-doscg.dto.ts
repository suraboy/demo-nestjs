import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class WebHookDoScgDto {
  @IsNotEmpty()
  readonly destination: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly events: string;
}
