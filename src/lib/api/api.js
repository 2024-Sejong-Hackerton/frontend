import client from "./client";

export const login = async (id, password) => {
    return client.post("/api/auth/login",{id,password},{
        headers: {
            "Content-Type": "application/json",
        }
    })
};