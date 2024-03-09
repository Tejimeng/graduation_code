import React, { useState } from 'react';
import './index.scss';
import { CloseOutline } from 'antd-mobile-icons';
import {
    Button,
    ImageUploader,
    Form,
    Popover,
    Input,
    TextArea,
    Image,
    ImageViewer,
    Grid
} from 'antd-mobile';
import { selectImage } from '@/utils/selectImage';
import attentionIcon from '@/assets/attention.svg';
const Index = ({ onClose }) => {
    // 图片预览
    const [coverVisible, setCoverVisible] = useState(false);
    const [viewImg, setViewImg] = useState('');
    const [form] = Form.useForm();
    const testImg =
        'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';
    const [fileList, setFileList] = useState([]);
    const mockUpload = (file) => {
        return {
            url: URL.createObjectURL(file)
        };
    };
    // 上传的信息
    const [uploadInfo, setUploadInfo] = useState({
        coverImg: '',
        recipeTitle: '',
        recipeStory: '',
        recipeMaterials: {}
    });
    // 更新
    const updateUploadInfo = (paramName, value) => {
        setUploadInfo({ ...uploadInfo, [paramName]: value });
    };

    // 选择封面
    const selectCover = () => {
        selectImage((imageDataURL) => {
            updateUploadInfo('coverImg', imageDataURL);
        });
    };
    // 表单收集
    const formValue = (changedValues, allValues) => {
        // console.log(changedValues);
        console.log(allValues);
    };
    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <div className={'upload_recipes'}>
            <div className="upload_recipes_top">
                <CloseOutline className="new_close_button" onClick={onClose} color={'#000'} />
                <div className="buttons">
                    <Button className="button_item" shape="rounded">
                        预览
                    </Button>
                    <Button className="button_item" shape="rounded">
                        存草稿
                    </Button>
                </div>
            </div>
            <div className="form_container">
                <Form
                    className="upload_form"
                    // 去除form的默认样式
                    style={{
                        '--border-bottom': 'none',
                        '--border-inner': 'none',
                        '--border-top': 'none'
                    }}
                    form={form}
                    onValuesChange={formValue}
                    onFinish={onFinish}
                    initialValues={{
                        recipes_title: '',
                        recipeStory: '',
                        recipeMaterials: [{}]
                    }}
                    footer={
                        <Button block type="submit" color="primary" size="large">
                            提交
                        </Button>
                    }
                    layout="horizontal"
                >
                    <div className="upload_cover_container">
                        {uploadInfo.coverImg ? (
                            <Image
                                className="img_picker"
                                onClick={() => {
                                    setViewImg(uploadInfo.coverImg);
                                    setCoverVisible(true);
                                }}
                                src={uploadInfo.coverImg}
                            ></Image>
                        ) : (
                            <p className="cover_title">选择一个好看的封面吧~</p>
                        )}

                        {/* <ImageUploader
                            className="img_picker"
                            style={{ '--cell-size': '90px' }}
                            value={fileList}
                            onChange={() => {
                                setFileList;
                                console.log(fileList);
                            }}
                            upload={mockUpload}
                            maxCount={1}
                        /> */}
                        <Button shape="rounded" className="img_picker_button" onClick={selectCover}>
                            {uploadInfo.coverImg ? '更换封面' : '选择封面'}
                        </Button>
                    </div>
                    <div className="recipes_detail">
                        <Form.Item
                            name="recipes_title"
                            className="recipes_title"
                            rules={[{ required: true, message: '请输入食谱标题' }]}
                        >
                            <TextArea placeholder="添加菜谱标题" showCount maxLength={25} />
                        </Form.Item>
                        <Form.Item name="recipeStory" className="recipes_story">
                            <TextArea placeholder="这道美食背后的故事" showCount maxLength={210} />
                        </Form.Item>
                        <div className="materials">
                            <div className="materials_title">
                                用料
                                <Popover
                                    className="title_pop"
                                    content="注意事项"
                                    trigger="click"
                                    placement="top"
                                >
                                    <Image className="title_icon" src={attentionIcon}></Image>
                                </Popover>
                            </div>
                            <Form.Array
                                className="recipes_materials"
                                name="recipeMaterials"
                                // onAdd={(operation) => operation.add({ name: '张三' })}
                                renderAdd={() => <span>添加</span>}
                                // renderHeader={({ index }, { remove }) => (
                                //     <>
                                //         <a onClick={() => remove(index)} style={{ float: 'right' }}>
                                //             删除
                                //         </a>
                                //     </>
                                // )}
                            >
                                {(fields) =>
                                    fields.map(({ index }) => (
                                        <>
                                            <Grid columns={13} gap={1}>
                                                <Grid.Item span={6}>
                                                    <Form.Item
                                                        className="material_name"
                                                        name={[index, 'materialName']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '食材不能为空'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="食材：如鸡蛋" />
                                                    </Form.Item>
                                                </Grid.Item>
                                                <Grid.Item span={6}>
                                                    <Form.Item
                                                        className="material_dosage"
                                                        name={[index, 'materialDosage']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '用量不能为空'
                                                            }
                                                        ]}
                                                    >
                                                        <Input placeholder="用量：如一枚" />
                                                    </Form.Item>
                                                </Grid.Item>
                                                <Grid.Item span={1}>
                                                    {({ index }, { remove }) => (
                                                        <>
                                                            <a
                                                                onClick={() => remove(index)}
                                                                style={{ float: 'right' }}
                                                            >
                                                                删除
                                                            </a>
                                                        </>
                                                    )}
                                                </Grid.Item>
                                            </Grid>
                                        </>
                                    ))
                                }
                            </Form.Array>
                        </div>
                    </div>
                </Form>
            </div>
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
