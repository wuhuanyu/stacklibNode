import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {host,port} from '../../constants/Constants';
import List from 'material-ui/List';
import {GridList, GridListTile, GridListTileBar} from 'material-ui/GridList';
import ListItem from 'material-ui/List';
import {num2Time} from '../../utility/Utils';

import Tag from './Tag';
import NewsListItem from './NewsListItem';
import NewsByTag from './NewsByTag';
import Slider from '../slider/Slider';

const TaggedCommonNewss = ({source, newss, tag}) => {
    let items = newss.map((news, idx) => {
        return {
            src: news.image_urls && news.image_urls[0],
            alt: 'Em Something Wrong'
        }
    });
    return (
        <div>

            <Slider items={items} count={items.length} auto={true} interval={2}/>
            <NewsByTag
                source={source}
                tag={tag}
                newss={newss}
                tag_img_url={`http://${host}:${port}/static/images/${tag}.jpg`}/>

        </div>
    )

}

TaggedCommonNewss.PropTypes = {
    source: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    newss: PropTypes.array.isRequired
};

const TaggedLifeNewss = ({source, newss, classes}) => {
    return (
        <div>
            <Tag 
            tag={"life"}
            tag_img_url={`http://${host}:${port}/static/images/life.jpg`}
            />
            <GridList
                cellHeight={200}
                style={{
                width: '100%',
                height: '100%'
            }}
                cols={2}>
                {newss.map((news, idx) => {
                    return (
                        <GridListTile key={idx} cols={1} rows={1}>
                            <img src={news.image_urls && news.image_urls[0]}/>
                            <GridListTileBar
                            title={news.title}
                            subtitle={<span>{num2Time(news.crawled_at)}</span>}
                            />
                        </GridListTile>
                    )
                })
               }
            </GridList>
        </div>
    )
}

TaggedLifeNewss.PropTypes = {
    source: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    newss: PropTypes.array.isRequired
}

export {TaggedCommonNewss, TaggedLifeNewss}