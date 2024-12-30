import client from "./client";

export const login = async ({id, password}) => {
    return client.post("/login",{
        id:id,
        pw:password
    },{
        headers: {
            "Content-Type": "application/json",
        }
    })
};

export const timetable = async ({data}) => {
    return client.post("/subjects",
        
        {data}
    ,{
        headers: {
            "Content-Type": "application/json",
        }   
    }
)  
};

export const getChatStatus = async (content) => {
    return (client.post("/chat",{
        content:content
    },
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') 
        }
    }));
}

export const getChatComplete = async ({id}) => {
    return client.get(id);
};

export const getText = async({id}) => {
    id = parseInt(id);
    return client.get(`/chat/${id}`)
}