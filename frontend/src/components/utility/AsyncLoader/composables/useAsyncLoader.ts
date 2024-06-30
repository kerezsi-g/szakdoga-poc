import { type Ref, ref } from 'vue'

export interface AsyncLoaderOptions<Data, Params> {
  fn: (params: Params) => Promise<Data>
  fallback?: Data | null
  collate?: (oldResult: Data, newResult: Data) => Data
  flushOnError?: boolean
}

type MaybeCancellablePromise<T> = Promise<T> & {
  cancel?: () => unknown
}

export function useAsyncLoader<Data, Params>({
  fn,
  collate,
  fallback = null,
  flushOnError
}: AsyncLoaderOptions<Data, Params>) {
  // =================================================================
  // #region State
  const data = ref<Data | null>(fallback ?? null) as Ref<Data | null>
  const error = ref<any>()
  const pending = ref<boolean>()
  const executionCount = ref<number>(0)
  const onLoadHandlers: Array<(d: Data) => unknown> = []

  let __current_promise: MaybeCancellablePromise<Data> | null = null
  // #endregion
  // =================================================================

  async function load(params: Params) {
    pending.value = true

    // If the wrapped function returns a cancellable promise, use it
    if (__current_promise) __current_promise.cancel?.()

    try {
      const __promise = fn(params)
      __current_promise = __promise

      const result: Data = await __promise

      // Exit early if a new operation has been initiated
      if (__promise !== __current_promise) return

      handleLoad(result)

      // if (pollingEnabled.value) setTimeout(() => {})
      // return result
    } catch (err) {
      handleError(err)
    } finally {
      pending.value = false
    }
  }

  function handleError(err: unknown) {
    console.error(err)
    error.value = err
    if (flushOnError) data.value = fallback ?? null
  }

  function handleLoad(result: Data) {
    if (collate && data.value) {
      data.value = collate(data.value, result)
    } else {
      data.value = result
    }

    for (const handler of onLoadHandlers) {
      handler(result)
    }

    executionCount.value = executionCount.value + 1
  }

  function onLoad(fn: (d: Data) => void) {
    onLoadHandlers.push(fn)

    function disposer() {
      onLoadHandlers.filter((handlerFn) => {
        return handlerFn !== fn
      })
    }

    return disposer
  }

  return {
    data,
    pending,
    error,
    load,
    onLoad,
    executionCount
  }
}
