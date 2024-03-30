// API_NOTIFICATION_MESSAGES


export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading.....",
        message: 'Data is Being Loaded, Please Wait'
    },
    success: {
        title: 'Success',
        message: 'Data is Successfuly Loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching response from the server,please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while Parsing requested Data'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect to the server right now'
    }
}


// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL: {url:'/',method:'POST/GET/UPDATE/DELETE',params:true/false,query:true/false}
export const SERVICE_URLS = {
    registerParticipants: { url: "/register", method: "POST" },
    userSignin: { url: "/signin", method: "POST" },
    getAllParticipants: { url: '/participants', method: "GET", params: true },
    getSearchedParticipants: { url: "/api/participants", method: "GET", params: true },
    getParticipantWithId: { url: "/partwid", method: "GET", params: true },
    registerIndividuals: { url: "/indi/regist", method: "POST" },
    registerGroups: { url: "/group/regist", method: "POST" },
    getAllGroups: { url: "/groups", method: "GET", params: true },
    getParticipantsWithLimit: { url: "/paticipantsData", method: "GET", params: true },
    getAllIndividuals: { url: "/individuals", method: "GET", params: true },
    getAllGroupsWithUser:{url:'/groups/user',method:'GET',params:true},
    getAllIndividualsWithUser:{url:'/individuals/user',method:'GET',params:true},

    // Admin Routes
    adminSignup: { url: '/admin/signup', method: 'POST' },
    adminSignin:{url:'/admin/login',method:'POST'},
    adminCheckSession:{url:'/admin/check-session',method:'GET'},
    adminLogout:{url:'/admin/logout',method:'POST'},
    getLoggedInAdmin:{url:'/admin/get',method:'GET',params:true},
    getAllAdmins:{url:'/admin/all',method:'GET'},
    updateAdmin:{url:'/admin/update',method:'PUT',params:true},
    deleteAdmin:{url:'/admin/delete',method:'DELETE',query:true},



    // DELETE 
    deleteUser:{url:'/user/delete',method:"DELETE" ,query:true},
    deleteGroup:{url:'/group/delete',method:"DELETE" ,query:true},
    deleteIndividual:{url:'/indi/delete',method:'DELETE',query:true},
    // DELETE AWS
    deleteImageFromIMK:{url:'/imageimk/delete',method:'DELETE',query:true},

    // UPDATE
    updateUsers:{url:'/user/update',method:"PUT",params:true},
    updateIndividuals:{url:'/indi/update',method:"PUT",params:true},
    updateGroup:{url:'/group/update',method:"PUT",params:true},

    // UPLOAD
    uploadImg:{url:'/image/upload',method:'POST'},

    // POST
    addPost:{url:'/addpost',method:'POST'},
    getPostWithLimit:{url:'/posts',method:'GET',params:true},
    deletePost:{url:'/post/delete',method:'DELETE',query:true},
    getOnePost:{url:'/mypost',method:'GET',query:true}
}