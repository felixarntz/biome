export {};

interface AbortSignal {}
interface AbortController {}
interface RequestContext {}

type ValidRequestOptions = {
  abortSignal: AbortSignal;
  "quotedAbortSignal": AbortSignal;
  requestAbortSignal?: AbortSignal;
  contextAbortSignal: AbortSignal | RequestContext;
  abortController: AbortController;
  "quotedAbortController": AbortController;
  requestAbortController?: AbortController;
  contextAbortController: AbortController | RequestContext;
  onAbort: (signal: AbortSignal) => void;
};

interface ValidTaskOptions {
  abortSignal?: AbortSignal;
  taskAbortController: AbortController;
}
