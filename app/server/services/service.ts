export default interface Service {
    read: (...args: any[]) => Promise<any>
}