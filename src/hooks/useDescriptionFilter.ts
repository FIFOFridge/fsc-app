import { Datum } from "../types/fakeAPIResponse"

export const useDescriptionFilter = (toFilter?: Datum[], filterInput?: string): Datum[] => {
    if (toFilter === undefined)
        return []

    if(filterInput === undefined || filterInput.length === 0) // return unfiltered
        return toFilter

    return toFilter.filter(
        tf => tf.description.toLowerCase() // normalize string
            .includes(filterInput.toLocaleLowerCase()) // check if includes searching term
    )
}