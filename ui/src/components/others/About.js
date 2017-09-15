import React from 'react';
import Typography from 'material-ui/Typography';
import withAppBar from './withAppBar';
import Paper from 'material-ui/Paper';



const About = (props) => {
    return (
        <div style={{ marginTop: '3px', width: '100%' }}>
            <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{marginLeft:'3px',marginRight:'3px'}}>
                <Typography style={{ display: 'flex', justifyContent: 'center', marginTop:"5px"}} type="title" gutterBottom>
                    {"关于"}
                </Typography>
                {
                    [
                        "这个简单的demo想要传达的就是分享和发现的精神",
                        "长期以来，我们都生活在官方的话语背景之下",
                        "我们对于世界的认知还是太局限了",
                        "就拿语言学习来讲，很多人也包括我，学习的仅仅是功能性语言，会很多单词，听说读写样样精通，但是这掩盖不了人文的缺失",
                        "一个民族的语言是认识它的窗口，历史、文化、思维方式、甚至哲学等等，这才是深层次的认知",
                        "在我设想中，这个demo将会把外国的优秀文化，人文精神呈现在我们面前",
                        "他们的审美，思考方式，甚至世界观等等",
                        "尽管目前内容还很少，很单一",
                        "顺便挑战一下自己",
                        "内容来自互联网，无利益瓜葛,建设性意见和建议，尽可通过Feedback，发送给我"
                    ].map((t, idx) => {
                        return (<Typography type="paragraph" style={{}} key={idx}>
                            {t}
                        </Typography>)
                    })
                }
                </div>
            </Paper>
        </div>
    )
};



export default withAppBar(About,"关于");