import { BaseHtml } from "./BaseHtml";

export function ErrorMessage(error: string) {
  return (
    <BaseHtml>
      <h1>An Error has occured, try refreshing the page.</h1>
      <p>Error message: {error}</p>
    </BaseHtml>
  )
}