export {};

interface AbortSignal {}
interface AbortController {}

type InvalidRequestOptions = {
  "signal": AbortSignal;
  cancellation?: AbortSignal;
  requestController?: AbortController;
  cancellationSignal: AbortSignal | undefined;
  controller: AbortController | null;
};

interface InvalidTaskOptions {
  signal?: AbortSignal;
  controller?: AbortController;
}
