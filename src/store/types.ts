export interface IUserState {
    usersData: IUserData[],
    loading: boolean,
    error: string,

}
export interface IUserData {
    name: string,
    id: number,
    email: string, 
    phone: string,
    website: string, 
}