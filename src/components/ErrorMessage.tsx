import { BaseHtml } from "./BaseHtml";

export const ErrorMessage = (error: any) => (
  <BaseHtml>
  <div class="errorMessage">
  <h5>An Error has occured, try refreshing the page.</h5>
    <small>Error message: {error}</small>
  </div>
  </BaseHtml>
);
