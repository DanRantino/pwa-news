import { memo } from 'react';
import PropTypes from 'prop-types';
import {Row,Col} from 'antd';
import { useHistory } from 'react-router';
import {createMarkup} from '../../../utils'

function Economy ({values}){
    const history = useHistory()

    const RenderImg = ({image, description}) => 
    <img src={image.url} alt={description} width="100%"/>

    const RenderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)} />

    const openPost = (id) => {
        history.push(`/economy/${id}`)
    }

    const RenderPost = (post,index) => {
        const {title, image, description, id} = post
        return (
            <Col span={24} md={12} key={`post-${index}`}>
                <article onClick={()=>openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}/>
                    </p>
                    <p dangerouslySetInnerHTML={createMarkup(description)}/>
                    {image?.url ? RenderImg({image, description}) : RenderDescription(description)}
                </article>
            </Col>
        )
    }

    return(
        <Row gutter={[16,16]}>
            {values?.map(RenderPost)}
        </Row>
    )

}

Economy.defaultProps = {
    values: []
}

Economy.propTypes = {
    values: PropTypes.array.isRequired
}

export default memo (Economy)