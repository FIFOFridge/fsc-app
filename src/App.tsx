import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { ResponseWrapper } from './types/fakeAPIResponse'
import { fakeApiProcessingUtil } from './utils/fakeAPIProcessingUtil'
import { ContentTable } from './components/contentTable'
import { useDescriptionFilter } from './hooks/useDescriptionFilter'

const App = () => {
    const [response, setResponse] = useState<ResponseWrapper | null>(null)
    const [filterInput, setFilterInput] = useState<string | undefined>(undefined)
    const filteredByDescription = useDescriptionFilter(response?.response.data, filterInput)

    //simulate fetch request on component mount
    useEffect(() => {
        // using Redux is way more time consuming while combined with TypeScript
        // you might want to take a look at mine implementation:
        // -------------------------------------------------------------------------
        // basic store init:
        // https://github.com/FIFOFridge/react-tailwind-component-generator/blob/main/src/store/designer/index.ts
        // -------------------------------------------------------------------------
        // actions:
        // https://github.com/FIFOFridge/react-tailwind-component-generator/blob/main/src/store/designer/actions.ts
        // -------------------------------------------------------------------------
        fakeApiProcessingUtil()
        .then(response => {
            console.log(response)
            setResponse(response)
        })
    }, [,])

    return (
        <div className="App">
            {/* display spinning react logo during processing fake request */}
            {
                response === null &&

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        {"Processing request..."}
                    </p>
                </header>
            }
            <main>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div>
                        <p>
                            Filter by description:
                        </p>
                    </div>

                    {/* filter */}
                    <input style={{marginBottom: "4rem", width: "30%", alignSelf: "center"}} type="text" value={filterInput} onChange={e => setFilterInput(e.target.value)} />

                    {/* display processed content when ready */}
                    {
                        response !== null &&
                        <ContentTable data={filteredByDescription} />
                    }
                </div>
            </main>
        </div>
    )
}

export default App
