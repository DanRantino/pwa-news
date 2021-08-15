import { memo } from 'react';
import { useHistory } from 'react-router';
import {Row,Col} from 'antd';
import {createMarkup} from '../../../utils'


function Technology ({values}) {
    const history = useHistory();

    const RenderImg = (image, description) => (
        <div>
            <img src={image.url} alt={description} width="100%" />
        </div>
    )

    const open = (id) => {
        history.push(`/technology/${id}`)
    }

    const RenderPost = (post,index) => {
        const {title,image,description,id} = post
        return (
            <Col span={24} md={6} key={`technology=${index}`}>
                <article onClick={()=>open(id)}>
                   <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}/>
                    </p>
                    {image?.url && RenderImg(image, description)}
                </article>
            </Col>
        )
    }
    return (
        <Row gutter={[16,16]}>
            {values?.map(RenderPost)}
        </Row>
    )
}

export default memo (Technology)