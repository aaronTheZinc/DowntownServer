import { Connection } from "typeorm";

export interface DatabaseAction {
    didSucceed: boolean
    data?: any
    error?: any
}

export interface DatabaseConnection {
    connection?: Connection
    error?: any
    
}

export interface status {
    err?: string
    didSucceed: boolean
}
export interface  StripeClient {
    connect: string
    customer: string
}
export interface BasicResponse {
    data?: any
    err?: any
    didSucceed: boolean
}