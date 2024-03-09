import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import {
    LeftOutline,
    StarOutline,
    StarFill,
    MessageOutline,
    CameraOutline,
    MoreOutline
} from 'antd-mobile-icons';
import {
    Image,
    SafeArea,
    ImageViewer,
    Rate,
    Avatar,
    Button,
    Divider,
    Popup,
    Input
} from 'antd-mobile';
import testImg from '@/assets/7d7169d81d4b4b6d992a494019527503_1920w_2560h.jpg';
import dianzan from '@/assets/dianzan.svg';
import dianzan_done from '@/assets/dianzan_done.svg';
import detailAdvertising from '@/assets/detail_advertising.png';
import commentTop from '@/assets/comment_top.svg';
const Index = ({ card_cover, card_title, user_avatar, username, back = () => {} }) => {
    // 图片预览
    const [coverVisible, setCoverVisible] = useState(false);
    const [viewImg, setViewImg] = useState('');
    // 顶部浮窗
    // const [topOpacity, setTopOpacity] = useState(1);
    const topElementRef = useRef(null);
    const [topDistance, setTopDistance] = useState(0);
    // 获取实时的高度
    useEffect(() => {
        let animationFrameId;
        const handleScroll = () => {
            if (topElementRef.current) {
                const distanceFromTop = topElementRef.current.getBoundingClientRect().top;
                setTopDistance(distanceFromTop);
                // if (distanceFromTop < 5) {
                //     setTopOpacity(1);
                // } else if (distanceFromTop > 600) {
                //     setTopOpacity(0);
                // } else {
                //     const opacity = Math.min(1, Math.max(1 - (distanceFromTop - 10) / 100, 0.3));
                //     setTopOpacity(opacity);
                // }
            }
            animationFrameId = window.requestAnimationFrame(handleScroll);
        };

        animationFrameId = window.requestAnimationFrame(handleScroll);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);
    // 评论
    const commentTarget = useRef(null);
    const commentJump = () => {
        if (commentTarget.current) {
            const distanceFromTop = commentTarget.current.getBoundingClientRect().top;
            // 滚动还是Popup
            distanceFromTop < 60
                ? setCommentVisible(true)
                : commentTarget.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const [commentVisible, setCommentVisible] = useState(false);
    const [comment, setComment] = useState('');
    // 插入上方的表情
    const handleExpressionClick = (expression) => {
        const input = document.querySelector('.comment_input').querySelector('input');
        if (input) {
            const startPosition = input.selectionStart;
            const endPosition = input.selectionEnd;
            const newComment =
                comment.substring(0, startPosition) +
                expression +
                comment.substring(endPosition, comment.length);
            setComment(newComment);
            input.focus();
            input.selectionStart = startPosition + expression.length;
            input.selectionEnd = startPosition + expression.length;
        }
    };
    return (
        <div className={'recipes_detail'}>
            <div
                className="back_recommend_container"
                style={{ backgroundColor: `rgba(255,255,255,${topDistance < 300 ? 1 : 0})` }}
            >
                <LeftOutline
                    className="back_navbar"
                    onClick={back}
                    style={{ color: topDistance < 400 ? '#000' : '#ccc' }}
                />
                {/* 滑到一定的高度，进行用户信息的展示 */}
                <div className="top_userInfo" style={{ opacity: topDistance < 5 ? 1 : 0 }}>
                    {/* {topOpacity},{topDistance} */}
                    <div className="author_top">
                        <Avatar
                            className={'author_avatar_top'}
                            src={user_avatar}
                            style={{ '--size': '45px', '--border-radius': '50%' }}
                        />
                        <p className={'author_name_top'}>{username}</p>
                    </div>
                    <Button className="attention_button_top" shape="rounded">
                        关注
                    </Button>
                </div>
                <MoreOutline style={{ color: topDistance < 400 ? '#000' : '#ccc' }} />
            </div>
            {/* 内容区域 */}
            <div className="detail_content">
                <div
                    className="cover_img_container"
                    onClick={() => {
                        setViewImg(card_cover);
                        setCoverVisible(true);
                    }}
                >
                    <Image className={'cover_img'} lazy src={card_cover}></Image>
                </div>
                <p className="detail_title">{card_title}</p>
                <div className="score">
                    <p className="score_title">下厨房评分</p>
                    <div className="score_container">
                        <div className="score_info">
                            <p className="score_number">4.5</p>
                            <p className="do_count">5&nbsp;人做过</p>
                        </div>
                        <div className="score_star">
                            <Rate allowHalf readOnly value={4.5} />
                        </div>
                    </div>
                </div>
                <div className="cookbook_author" ref={topElementRef}>
                    <div className="author">
                        <Avatar
                            className={'author_avatar'}
                            src={user_avatar}
                            style={{ '--size': '45px', '--border-radius': '50%' }}
                        />
                        <p className={'author_name'}>{username}</p>
                    </div>
                    <Button className="attention_button" shape="rounded">
                        关注
                    </Button>
                </div>
                <p className="recipes_introduction">
                    哈哈哈哈哈哈Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint,
                    fugiat unde. Eos illo voluptatibus nisi commodi a ex voluptate dicta non fugiat
                    cumque, suscipit ducimus rerum, dignissimos officiis temporibus.
                    Dolorum.哈哈哈哈哈哈
                </p>
                <div className="materials">
                    <div className="materials_top">
                        <span>用料</span>
                        <Button className="materials_button" shape="rounded">
                            换算
                        </Button>
                    </div>
                    <div className="material_item">
                        <span>面条</span>
                        <span>1小把</span>
                    </div>
                    <Divider
                        style={{
                            borderColor: '#999',
                            borderStyle: 'dashed'
                        }}
                    ></Divider>
                    <div className="material_item">
                        <span>青菜</span>
                        <span>2根</span>
                    </div>
                    <Divider
                        style={{
                            borderColor: '#999',
                            borderStyle: 'dashed'
                        }}
                    ></Divider>
                    <div className="material_item">
                        <span>鸡蛋</span>
                        <span>1个</span>
                    </div>
                    <Divider
                        style={{
                            borderColor: '#999',
                            borderStyle: 'dashed'
                        }}
                    ></Divider>
                    <div className="material_item">
                        <span>火腿</span>
                        <span>3片</span>
                    </div>
                </div>
                <div className="steps">
                    <div className="step_item">
                        <p className="step_title">步骤&nbsp;1</p>
                        <Image
                            className="step_img"
                            src={testImg}
                            onClick={() => {
                                setViewImg(testImg);
                                setCoverVisible(true);
                            }}
                        ></Image>
                        <div className="step_desc">
                            <p>准备食材：火腿片、青菜、鸡蛋、面条</p>
                        </div>
                    </div>
                    <div className="step_item">
                        <p className="step_title">步骤&nbsp;2</p>
                        <Image
                            className="step_img"
                            src={testImg}
                            onClick={() => {
                                setViewImg(testImg);
                                setCoverVisible(true);
                            }}
                        ></Image>
                        <div className="step_desc">
                            <p>
                                准备食材：火腿片、青菜、鸡蛋、面条准备食材：火腿片、青菜、鸡蛋、面条
                            </p>
                        </div>
                    </div>
                    <div className="step_item">
                        <p className="step_title">步骤&nbsp;3</p>
                        <Image
                            className="step_img"
                            src={testImg}
                            onClick={() => {
                                setViewImg(testImg);
                                setCoverVisible(true);
                            }}
                        ></Image>
                        <div className="step_desc">
                            <p>准备食材：火腿片、青菜、鸡蛋、面条</p>
                        </div>
                    </div>
                </div>
                <div className="tips">
                    <p className="tips_title">小贴士</p>
                    <p className="tips_content">酸汤料汁配水饺、粉丝、各种食材均可</p>
                </div>
                <div className="last_time">菜谱更新于2023-03-12，浏览35.6万次</div>
            </div>
            {/* 广告区域 */}
            <div className="advertising_container">
                <Image className="advertising_img" src={detailAdvertising}></Image>
            </div>
            {/* 交作业区域 */}
            <div className="follow_do">
                <p className="follow_title">大家交的作业&nbsp;131</p>
                <div className="follow_item">
                    <div className="top">
                        <div className="follow_author">
                            <Avatar
                                className={'follow_author_avatar'}
                                src={user_avatar}
                                style={{ '--size': '40px', '--border-radius': '50%' }}
                            />
                            <div className="follow_author_avatar_info">
                                <span className="info_item">{username}</span>
                                <span className="info_item">1天前</span>
                            </div>
                        </div>
                        <div className="appreciate">
                            <Image className="appreciate_icon" src={dianzan}></Image>
                            <p className="appreciate_count">0</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p className="follow_content">加了午餐肉</p>
                        <Image className="follow_img" src={testImg}></Image>
                    </div>
                </div>
                <div className="follow_item">
                    <div className="top">
                        <div className="follow_author">
                            <Avatar
                                className={'follow_author_avatar'}
                                src={user_avatar}
                                style={{ '--size': '40px', '--border-radius': '50%' }}
                            />
                            <div className="follow_author_avatar_info">
                                <span className="info_item">{username}</span>
                                <span className="info_item">4天前</span>
                            </div>
                        </div>
                        <div className="appreciate">
                            <Image className="appreciate_icon" src={dianzan_done}></Image>
                            <p className="appreciate_count">56</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p className="follow_content">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                            reprehenderit, dolores sit, voluptate earum porro sint minus quibusdam,
                        </p>
                        <Image className="follow_img" src={testImg}></Image>
                    </div>
                </div>
                <div className="follow_item">
                    <div className="top">
                        <div className="follow_author">
                            <Avatar
                                className={'follow_author_avatar'}
                                src={user_avatar}
                                style={{ '--size': '40px', '--border-radius': '50%' }}
                            />
                            <div className="follow_author_avatar_info">
                                <span className="info_item">{username}</span>
                                <span className="info_item">2024-02-06</span>
                            </div>
                        </div>
                        <div className="appreciate">
                            <Image className="appreciate_icon" src={dianzan_done}></Image>
                            <p className="appreciate_count">322</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p className="follow_content">加了午餐肉</p>
                        <Image className="follow_img" src={testImg}></Image>
                    </div>
                </div>
                <Button className="view_all" shape="rounded">
                    查看全部
                </Button>
            </div>
            {/* 用户评论 */}
            <div className="comment_container" ref={commentTarget}>
                <p className="comment_title">这道菜的评论&nbsp;131</p>
                <div className="comment_self">
                    <div className="coment_self_icon_container">
                        <Image className="comment_self_icon" src={commentTop}></Image>
                    </div>
                    <p className="comment_self_input" onClick={() => setCommentVisible(true)}>
                        喜欢评论的人，做饭一定超好吃~
                    </p>
                </div>
                <div className="comment_item">
                    <div className="comment_top">
                        <div className="comment_author">
                            <Avatar
                                className={'comment_author_avatar'}
                                src={user_avatar}
                                style={{ '--size': '40px', '--border-radius': '50%' }}
                            />
                            <div className="comment_author_avatar_info">
                                <span className="comment_info_item">{username}</span>
                                <span className="comment_info_item">2024-02-29 03:05:11</span>
                            </div>
                        </div>
                        <div className="comment_appreciate">
                            <p className="comment_appreciate_count">365</p>
                            <Image className="comment_appreciate_icon" src={dianzan}></Image>
                        </div>
                    </div>
                    <p className="comment_desc">
                        看着挺好吃，但是，但是我烧热油怎么总是
                        不对劲呢，浇上去没滋啦，烧好久了都，好像就是不热
                    </p>
                </div>
                <div className="comment_item">
                    <div className="comment_top">
                        <div className="comment_author">
                            <Avatar
                                className={'comment_author_avatar'}
                                src={user_avatar}
                                style={{ '--size': '40px', '--border-radius': '50%' }}
                            />
                            <div className="comment_author_avatar_info">
                                <span className="comment_info_item">{username}</span>
                                <span className="comment_info_item">2024-02-29 11:05:11</span>
                            </div>
                        </div>
                        <div className="comment_appreciate">
                            <p className="comment_appreciate_count">1</p>
                            <Image className="comment_appreciate_icon" src={dianzan_done}></Image>
                        </div>
                    </div>
                    <p className="comment_desc">
                        第一次做饭，做这个，有点翻车，热油量没注意，放太多了，有点腻
                    </p>
                </div>
                <div className="comment_item">
                    <div className="comment_top">
                        <div className="comment_author">
                            <Avatar
                                className={'comment_author_avatar'}
                                src={user_avatar}
                                style={{ '--size': '40px', '--border-radius': '50%' }}
                            />
                            <div className="comment_author_avatar_info">
                                <span className="comment_info_item">{username}</span>
                                <span className="comment_info_item">1天前</span>
                            </div>
                        </div>
                        <div className="comment_appreciate">
                            <p className="comment_appreciate_count">100</p>
                            <Image className="comment_appreciate_icon" src={dianzan}></Image>
                        </div>
                    </div>
                    <p className="comment_desc">
                        谢谢，按照这个方子已经连吃两天了，感觉 还能再吃几天😂
                    </p>
                </div>
                <div className="comment_item">
                    <div className="comment_top">
                        <div className="comment_author">
                            <Avatar
                                className={'comment_author_avatar'}
                                src={user_avatar}
                                style={{ '--size': '40px', '--border-radius': '50%' }}
                            />
                            <div className="comment_author_avatar_info">
                                <span className="comment_info_item">{username}</span>
                                <span className="comment_info_item">1天前</span>
                            </div>
                        </div>
                        <div className="comment_appreciate">
                            <p className="comment_appreciate_count">35</p>
                            <Image className="comment_appreciate_icon" src={dianzan_done}></Image>
                        </div>
                    </div>
                    <p className="comment_desc">
                        奇了怪了这么多佐料放一块儿难道就不应该 热油“嘶啦“一下子调出味儿来？
                    </p>
                </div>
                <div className="comment_item">
                    <div className="comment_top">
                        <div className="comment_author">
                            <Avatar
                                className={'comment_author_avatar'}
                                src={user_avatar}
                                style={{ '--size': '40px', '--border-radius': '50%' }}
                            />
                            <div className="comment_author_avatar_info">
                                <span className="comment_info_item">{username}</span>
                                <span className="comment_info_item">1天前</span>
                            </div>
                        </div>
                        <div className="comment_appreciate">
                            <p className="comment_appreciate_count">365</p>
                            <Image className="comment_appreciate_icon" src={dianzan_done}></Image>
                        </div>
                    </div>
                    <p className="comment_desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
                        repellendus aliquam, modi quam, illo ad excepturi dolore nesciunt dicta, non
                        eaque quibusdam vitae atque quae corrupti maiores dolor. Facere, in.
                    </p>
                </div>
            </div>
            {/* 底部操作区域 */}
            <div className="operation_bottom">
                <div className="operation_item">
                    <StarOutline className="operation_item_icon" />
                    <span className="operation_item_content">7.1万</span>
                </div>
                <div className="operation_item" onClick={commentJump}>
                    <MessageOutline className="operation_item_icon" />
                    <span className="operation_item_content">131</span>
                </div>
                <div className="operation_item">
                    <CameraOutline className="operation_item_icon" />
                    <span className="operation_item_content">交作业</span>
                </div>
            </div>
            {/*开启安全区域，防止底部遮挡*/}
            <SafeArea position="bottom" />
            {/* 留言pop */}
            <Popup
                className="comment_pop"
                visible={commentVisible}
                onMaskClick={() => {
                    setCommentVisible(false);
                }}
            >
                <div className="comment_info">
                    <div className="expression">
                        <span
                            className="expression_icon"
                            onClick={() => handleExpressionClick('🐀')}
                        >
                            🐀
                        </span>
                        <span className="expression_icon">🐂</span>
                        <span className="expression_icon">🐅</span>
                        <span className="expression_icon">🐇</span>
                        <span className="expression_icon">🐉</span>
                        <span className="expression_icon">🐍</span>
                        <span className="expression_icon">🐓</span>
                        <span className="expression_icon">🐖</span>
                    </div>
                    <div className="comment_input_container">
                        <Input
                            className="comment_input"
                            placeholder="写评论..."
                            value={comment}
                            onChange={(val) => {
                                setComment(val);
                            }}
                        />
                        <Button disabled={!comment} className="comment_button" shape="rounded">
                            发送
                        </Button>
                    </div>
                </div>
            </Popup>
            {/* 图片查看 */}
            <ImageViewer
                // classNames={{
                //     mask: 'customize-mask',
                //     body: 'customize-body'
                // }}
                image={viewImg}
                visible={coverVisible}
                onClose={() => {
                    setCoverVisible(false);
                }}
            />
        </div>
    );
};

export default Index;
