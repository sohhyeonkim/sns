import { FunnelsType, PathDetailType } from '@constants/funnels-type';
import { JudgementType } from '@constants/judgement-type';
import { ReviewStatus } from '@modules/membership-review/domain/entities/membership-review.types';
import { UserGenders } from '@modules/user/domain/entities/user.types';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

import { DistributionType } from '../../../../constants/distribution-type';
import { UserStatusType } from '../../../../constants/user-status-type';

export interface FindJoinExamination {
  readonly id: string;

  readonly submittedAt: string;

  readonly distribution: DistributionType;

  readonly userStatus: UserStatusType;

  readonly gender: UserGenders;

  readonly name: string;

  readonly phoneNumber: string;

  readonly manager: string;

  readonly judgement: JudgementType;

  readonly schedule: string;

  readonly answers: JSON;

  readonly reviewId: string;

  readonly reviewStatus: ReviewStatus;

  readonly funnels: FunnelsType;

  readonly pathDetail: PathDetailType;

  readonly isPrevVtExists: boolean;
}

export class FindJoinExaminationResponse {
  constructor(props: FindJoinExamination) {
    this.id = props.id;
    this.submittedAt = props.submittedAt;
    this.distribution = props.distribution;
    this.userStatus = props.userStatus;
    this.gender = props.gender;
    this.name = props.name;
    this.phoneNumber = props.phoneNumber;
    this.manager = props.manager;
    this.judgement = props.judgement;
    this.schedule = props.schedule;
    this.answers = props.answers;
    this.reviewId = props.reviewId;
    this.reviewStatus = props.reviewStatus;
    this.funnels = props.funnels;
    this.pathDetail = props.pathDetail;
    this.isPrevVtExists = props.isPrevVtExists;
  }

  @ApiResponseProperty()
  readonly funnels: FunnelsType;

  @ApiResponseProperty()
  readonly pathDetail: PathDetailType;

  @ApiResponseProperty()
  readonly id: string;

  @ApiResponseProperty()
  readonly submittedAt: string;

  @ApiResponseProperty()
  readonly distribution: DistributionType;

  @ApiResponseProperty()
  readonly userStatus: UserStatusType;

  @ApiResponseProperty()
  readonly gender: UserGenders;

  @ApiResponseProperty()
  readonly name: string;

  @ApiProperty({ type: 'string', nullable: true })
  readonly phoneNumber: string | null;

  @ApiResponseProperty()
  readonly manager: string;

  @ApiResponseProperty()
  readonly judgement: JudgementType;

  @ApiResponseProperty()
  readonly schedule: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ApiResponseProperty({ type: [Object] })
  readonly answers: JSON;

  @ApiResponseProperty()
  readonly reviewId: string;

  @ApiResponseProperty({ type: 'enum', enum: ReviewStatus })
  readonly reviewStatus: ReviewStatus;

  @ApiResponseProperty()
  isPrevVtExists: boolean;
}
