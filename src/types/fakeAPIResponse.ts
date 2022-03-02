//types generated with: http://json2ts.com/
export interface AssignedTo {
    person_name: string
    status: string
}

export interface Datum {
    work_order_id: number
    description: string
    received_date: string
    assigned_to: AssignedTo[]
    status: string
    priority: string
}

export interface Response {
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
    data: Datum[]
}

export interface ResponseWrapper {
    exec_time: number
    response: Response
}