export interface UserMutation {
    uid: string
    entries: {
        key: string,
        value: any
    }
}