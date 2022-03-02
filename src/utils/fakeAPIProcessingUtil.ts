import { ResponseWrapper } from "../types/fakeAPIResponse"
import responsePromise from "../data/response.json"

export const fakeApiProcessingUtil = (): Promise<ResponseWrapper> => {
    return new Promise<ResponseWrapper>((resolve, _) => {
        //simulate fetch request
        setTimeout(() => {
            resolve(responsePromise)
        }, 1000)
    })
}