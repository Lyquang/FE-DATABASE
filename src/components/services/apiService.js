import axios from "../utils/axiosCustomize";

// Authentication APIs
const postLogin = (username, password) => {
    return axios.post("/auth/login", { username, password });
};

const postCreateNewAccount = (username, password) => {
    return axios.post("/account/create", { username, password });
};

const getAllAccount = () => {
    return axios.get("/account/all");
};

const getAccountById = (id) => {
    return axios.get(`/account?accountId=${id}`);
};

const putUpdateAccount = (id, password) => {
    return axios.put("/account/edit", { id, password });
};

const deleteAccount = (id) => {
    return axios.delete(`/account/delete?accountId=${id}`);
};

// Personnel APIs
const postCreateNewPersonel = (payload) => {
    return axios.post("/employee/create", payload, {
        headers: { "Content-Type": "application/json" },
    });
};

const getAllPersonel = () => {
    return axios.get("/employee/all");
};

const getPersonelByCode = (code) => {
    return axios.get(`/personnel?code=${code}`);
};

const deletePersonel = (code) => {
    return axios.delete(`/personnel/delete?code=${code}`);
};

const putUpdatePersonel = (code, payload) => {
    return axios.put("/personnel/edit", payload, {
        params: { code },
        headers: { "Content-Type": "application/json" },
    });
};

// Department APIs
const postCreateNewDepartment = (payload) => {
    return axios.post("http://localhost:8080/api/departments/create", payload, {
        headers: { "Content-Type": "application/json" },
    });
};

const getAllDepartment = () => {
    return axios.get("http://localhost:8080/api/departments/all");
};

//project API
const getAllProjects = () => {
    return axios.get("http://localhost:8080/api/projects/all");
};


const getEmployeeByAccountId = (id) => {
    return axios.get("/employee/account", {
        params: { id },
    })
}


const getTaskByEmployeeCode = (code) => {
    return axios.get("/tasks/employee", {
        params: { code: code },
    });
};

const postEmployeeCheckin = (code) => {
    return axios.post("/attendance/check-in", null, {
        params: { employeeId: code },
    });
};

const postEmployeeCheckout = (code) => {
    return axios.post("/attendance/check-out", null, {
        params: { employeeId: code },
    });
};

const getEmployeeAttendance = (code) => {
    return axios.get(`/attendance/employee`, { 
        params: { employeeId: code },  
    });
};

const submitTask = (taskId, file, personnelId) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("file", file);
    formData.append("personnelId", personnelId);

    return axios.post("/tasks/submit", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

// Consolidated export
export {
    postLogin,
    postCreateNewAccount,
    postCreateNewPersonel,
    postCreateNewDepartment,
    postEmployeeCheckin,
    postEmployeeCheckout,
    submitTask,
    getAllAccount,
    getAccountById,
    getAllPersonel,
    getPersonelByCode,
    getAllDepartment,
    getEmployeeByAccountId,
    getTaskByEmployeeCode,
    putUpdateAccount,
    putUpdatePersonel,
    deleteAccount,
    deletePersonel,
    getAllProjects,
    getEmployeeAttendance,
};
