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

export interface IPostState {
    postsData: IPostData[],
    loading: boolean,
    error: string,

}

export interface IPostData {
    userId: number,
    id: number,
    title: string, 
    body: string,
}