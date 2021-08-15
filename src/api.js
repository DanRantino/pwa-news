
const params = {
    headers : {
        Accept: 'application/json',
        "Content-Type": 'application'
    },
};

const URL = 'http://stormy-brook-79548.herokuapp.com/api' 

const getNews= (subject)=>{
    return fetch(`${URL}/${subject}`,params)
            .then((response) => response.json())
            .catch((err) => console.error('Erro:' , err))
}

const getNewsById = (subject,id) =>{
    return fetch(`${URL}/${subject}/${id}`,params)
        .then((response) => response.json())
        .catch((err) => console.error('Erro: ' , err))
}

const api = {
    getNews,
    getNewsById
}

export default api