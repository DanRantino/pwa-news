import React,{memo, useState,useEffect} from 'react'
import {Row, Col } from 'antd'
import Api from '../../api'
import World from './sections/World'; 
import Economy from './sections/Economy'; 
import Technology from './sections/Technology'; 

function Home (){
    const [news,setNews] = useState([]);
    const [Loading, setLoading] = useState(false);

    const handleNews = (articles) => {
        setLoading(false);
        setNews({
            world: articles[0]?.value.value,
            economy: articles[1]?.value.value,
            technology: articles[2]?.value.value,
        })
    }

    useEffect(() => {
        setLoading(true);
        Promise.allSettled([
            Api.getNews('world'),
            Api.getNews('economy'),
            Api.getNews('technology')
        ])
        .then(handleNews)
    },[]);

    if (Loading) return <div>carregando</div>

    return (
        <div>
            <Row gutters={[16,16]}>
                <Col span={24} md={16}>
                    <h2>World</h2>
                    <World values={news?.world}/>
                </Col>
                <Col span={24} md={8}>
                    <h2>Economy</h2>
                    <Economy values={news?.economy}/>
                </Col>
            </Row>
            <hr />
            <Row gutters={[16,16]}>
                <Col span={24}>
                    <h2>Technology</h2>
                    <Technology values={news?.technology}/>
                </Col>
            </Row>
        </div>
    )
}

export default memo(Home)