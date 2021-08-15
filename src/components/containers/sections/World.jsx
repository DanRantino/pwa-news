import { memo } from 'react';
import { useHistory } from 'react-router';
import {Row,Col} from 'antd';
import {createMarkup} from '../../../utils'


function World ({values}) {
    const history = useHistory();

    const RenderImg = (image, description) => (
        <div>
            <img src={image.url} alt={description} width="100%" />
        </div>
    )

    const open = (id) => {
        history.push(`/world/${id}`)
    }

    const RenderPost = (post,index) => {
        const {title,image,description,id} = post;
        const isFirst = index === 0;
        const spanValue = isFirst ? 24 : 12;
        return (
            <Col span={spanValue} key={`world=${index}`}>
                <article onClick={()=>open(id)}>
                   <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}/>
                    </p>
                    {isFirst && RenderImg(image, description)}
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

export default memo (World)