import { memo, useEffect,useState , useCallback } from "react";
import { useHistory,useParams,Link} from 'react-router-dom';
import {Row,Col} from 'antd'
import Api from '../../api';
import Actions from './Actions'
import {createMarkup } from '../../utils'
import './styles.css'

function Post() {
    const { id, subject } = useParams();
    const [post,setPost] = useState([]);
    const [news,setNews] = useState([]);
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    
    const handleNews = useCallback((data) => {
        setNews(data[0]?.value)
        setPost(data[1]?.value)
        setLoading(false);
    },[]);

    useEffect(() => {
        setLoading(true);
        Promise.allSettled([
            Api.getNews(subject),
            Api.getNewsById(subject,id)
        ])
        .then(handleNews)
    },[id,subject,handleNews]);
    
    const RenderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)}/>

    const openPost = (id) => {
        history.push(`/${subject}/${id}`)
    }

    const RenderPost = (post,index) => {
        const {title,image,description,id} = post

        return (
            <Col span={12} key={`post-${index}`}>
                <article onClick={()=>openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}/>
                    </p>
                    {image?.url ? RenderImg({image, description}) : RenderDescription(description)}
                </article>
            </Col>
        )
    }

    const RenderImg = ({image,description}) => <img src={image.url} alt={description} width="75%"/>


    if (loading) return <div>Carregando...</div>

    if (!post?.id) return null;
    const {title,image,description, body, datePulished } = post

return (
    <div>
        <Link to='/'> Back </Link>
        <Actions post={post} subject={subject}/>
        <Row gutters={[16,16]}>
            <Col span={24} md={16}>
                <p>{datePulished}</p>
                <h1 dangerouslySetInnerHTML={createMarkup(title)}/>
                {image && RenderImg({image, description})}
                <p className='text' dangerouslySetInnerHTML={createMarkup(description)} ></p>
                <hr />
                <p className='text' dangerouslySetInnerHTML={createMarkup(body)} ></p>
            </Col>
            <Col span={24} md={8}>
                <Row gutter={[16,16]}>
                    {news?.value?.map(RenderPost)}
                </Row>
            </Col>
        </Row>
    </div>
    )
}

export default memo(Post);