import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SpinnerService } from "./spinner.service";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root",
})
export class ErrorsService {
  constructor(
    private spinnerService: SpinnerService,
    private toastr: ToastrService
  ) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = "operation", result?: T) {
    this.toastr.error(operation, "something went wrong!!");
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      alert(`${operation} failed: ${error.error.msg}`);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      this.spinnerService.resetSpinner();

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
