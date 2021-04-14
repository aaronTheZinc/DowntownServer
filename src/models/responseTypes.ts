import { Connection } from "typeorm";

export interface DataInsertion {
    didSucceed: Boolean
    data?: any
    error?: any
}
export interface DatabaseConnection {
    connection?: Connection
    error?: any
    
}