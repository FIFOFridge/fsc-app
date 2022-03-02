import React, { useMemo, useState } from 'react'
import { AssignedTo, Datum, ResponseWrapper } from '../types/fakeAPIResponse'

export interface ContentTableProps {
    // responseWrapper: ResponseWrapper,
    data: Datum[],
    filterByDescriptionInput?: string
}

export const ContentTable = (props: ContentTableProps) => {
    const [areAssignmentsExpanded, setAreAssignmentsExpanded] = useState<boolean>(false)

    const createExpandableAssignmentsElement = (assigned: AssignedTo[]) => {
        if(assigned.length === 0)
            return <div></div> // return empty

        const expandableAssignmentsClassName = areAssignmentsExpanded ? "expandable-assignments" : "expandable-assignments collapsed"
        const elements: JSX.Element[] = []

        // take first element only if collapsed or whole array otherwise
        const displayAssignments = !areAssignmentsExpanded ? assigned.slice(0, 1) : assigned

        for(const element of displayAssignments) {
            elements.push(
                <>
                    <div>
                        { "Person: " } { element.person_name }
                    </div>
                    <div>
                        { "Status: " } { element.status }
                    </div>
                    {/* expand brake */}
                    {
                        areAssignmentsExpanded  && displayAssignments.length > 1 &&
                        <div style={{width: "100%", borderBottom: "1px solid black"}}></div>
                    }
                </>
            )
        }

        return (
            <td className={expandableAssignmentsClassName}>
                {/* element or elements */}
                {
                    elements
                }
            </td>
        )
    }

    const tableElements = useMemo(() => {
        const elements: JSX.Element[] = []

        // iterate over response data and create table elements
        for (const row of props.data) {
            const formattedAssignment = createExpandableAssignmentsElement(row.assigned_to)

            elements.push(
                <tr key={row.work_order_id}>
                    {/* table elements */}
                    <td> {row.work_order_id} </td>
                    <td> {row.description} </td>
                    <td> {row.received_date} </td>
                    {formattedAssignment}
                    {/* <td> {row.assigned_to} </td> */}
                    <td> {row.status} </td>
                    <td> {row.priority} </td>
                </tr>
            )
        }

        return elements
    }, [props.data, areAssignmentsExpanded]) 

    return (
        <table className="content-table" style={{tableLayout: "fixed"}}>
            {/* table descriptions */}
            <tr className="headers">
                <th style={{width: "10%"}} > {"Worker ID"} </th>
                <th style={{width: "10%"}} > {"Description"} </th>
                <th style={{width: "10%"}} > {"Received"} </th>
                <th style={{display: "flex"}}> 
                    {"Assigned"} 

                    {/* toggle expand/collapse */}
                    <button
                        style={{margin: "0rem 1rem"}}
                        // invert expand/collapse state
                        onClick={e => setAreAssignmentsExpanded(!areAssignmentsExpanded)}
                    >
                            {
                                areAssignmentsExpanded === true &&
                                <span>{"Collapse"}</span>
                            }

                            {
                                areAssignmentsExpanded === false &&
                                <span>{"Expand"}</span>
                            }
                    </button>
                </th>
                <th style={{width: "10%"}} > {"Status"} </th>
                <th style={{width: "10%"}} > {"Priority"} </th>
            </tr>
            {/* insert generated table elements */}
            {
                tableElements
            }
        </table>
    )
}