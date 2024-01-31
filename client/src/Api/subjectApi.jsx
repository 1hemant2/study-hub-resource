import { apiInstances } from "./apiInstances";

export const CreatePostApi = async (payload) => {
    try {
        const response = await apiInstances.post('/api/Posts/createPost', payload);
        // console.log(payload);
        return response.data;
        // return payload;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const SubjectApi = async (payload) => {
    try {
        // console.log(payload);
        const response = await apiInstances.get('/api/Posts/getSubject', {
            params: payload
        });
        // console.log(response);
        return response.data.data;
    } catch (error) {
        return error;
    }
}

export const TopicDetailsApi = async (subject, topic) => {
    try {
        // console.log(subject, topic);
        // console.log(subject, topic);
        const response = await apiInstances.get('/api/posts/getTopicDetials', {
            params: {
                subject: subject,
                topic: topic
            }
        })
        // console.log(response.data);
        return response.data.data;
    } catch (error) {
        return error;
    }
}


export const serachDataApi = async (topic) => {
    try {
        // console.log(topic)
        const response = await apiInstances.get('/api/posts/getSerchResult', {
            params: {
                topic: topic
            }
        })
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        return error;
    }
}

export const editApi = async (payload) => {
    try {
        // console.log(payload);
        const response = await apiInstances.patch('/api/Posts/editPost', payload);
        return response;
    } catch (error) {
        return error;
    }
}
export const deleteSubtopicApi = async (payload) => {
    try {
        // console.log(payload);
        const response = await apiInstances.patch('/api/Posts/deleteSubtopic', payload);
        return response;
    } catch (error) {
        return error;
    }
}
export const deltePostApi = async (payload) => {
    try {
        // console.log(payload)
        const response = await apiInstances.delete('/api/Posts/deletePost', { data: payload });
        return response
    } catch (error) {
        return error
    }
}