export interface BaseAPIResponse {
    status:number;
};

export interface User{
    username:string;
    id:number;
}

export interface UserAPIResponse extends BaseAPIResponse{
    data: {
        users: User[];
    };
};

export interface MessageIdAPIResponse extends BaseAPIResponse{
    data: {
        messageID: number;
    };
};

export interface MessageAPIResponse extends BaseAPIResponse{
    data: {
        message: Message;
    };
};

export interface MessagesAPIResponse extends BaseAPIResponse{
    data: {
        messages: Message[];
    };
};

export interface Message{
    content:string;
    createdDate:string;
}



