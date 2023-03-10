import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

interface BillsResponse {
  dueAmount: number;
  dueDate: string;
  lastPaidDate: string;
  lateCharge: number;
  memberId: string;
  policyId: number;
}

interface ClaimStatusResponse {
  claimId: string;
  claimStatus: string;
  claimDescription: string;
  policyId:number;
  memberId:string;
}

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  billResponse: BillsResponse | null = null;
  claimStatusResponse: ClaimStatusResponse | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  viewBills(inputFields: { memberID: string }) {
    return this.http
      .get<BillsResponse>(
        environment.MEMBER_SERVICE_URL + '/viewBills/' + inputFields.memberID
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.billResponse = response;
          this.claimStatusResponse = null;
        })
      );
  }

  viewStatus(inputFields: { claimID: string ,policyID:number,memberID:string}) {
    return this.http
      .get<ClaimStatusResponse>(
        environment.MEMBER_SERVICE_URL +
          '/getClaimStatus/' +
          inputFields.claimID +'/'+ inputFields.policyID +'/'+ inputFields.memberID
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.claimStatusResponse = response;
          this.billResponse = null;
        })
      );
  }

  submitClaim(inputFields: {
    memberId: string;
    policyId: number;
    hospitalId: string;
    benefitId: string;
    claimId: string;
    status: string;
    description: string;
    claimAmount: number;
  }) {
    return this.http
      .post<ClaimStatusResponse>(
        environment.MEMBER_SERVICE_URL + '/submitClaim',
        inputFields
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.claimStatusResponse = response;
          this.billResponse = null;
        })
      );
  }

  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error.message);
  }
}
