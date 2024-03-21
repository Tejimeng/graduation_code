import React, { useState } from 'react';
import './index.scss';
import { CloseCircleFill, CloseOutline } from 'antd-mobile-icons';
import {
    Button,
    ImageUploader,
    Form,
    Popover,
    Input,
    TextArea,
    Image,
    ImageViewer,
    Grid,
    Dialog
} from 'antd-mobile';
// 选择图片
// import { selectImage } from '@/utils/selectImage';
import attentionIcon from '@/assets/attention.svg';
import { useRef } from 'react';
import { uploadImage } from '@/api/Upload';

const Index = ({ onClose }) => {
    // 图片预览
    // const [coverVisible, setCoverVisible] = useState(false);
    // const [viewImg, setViewImg] = useState('');
    // 封面
    const [hasCover, setHasCover] = useState(false);
    const coverRef = useRef(null);
    // 表单
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    // 图片上传函数 在这里进行url的返回
    const mockUpload = async (file, uploadType = 0) => {
        // // 单张上传
        // if (uploadType === 1) {
        //     formData.append('images', fileList);
        //     let uploadData = await uploadImage(formData);
        //     return {
        //         url: uploadData?.imageUrls
        //     };
        // }
        // // 多张上传
        // if (uploadData === 2) {
        //     formData.append('images', fileList);
        //     let uploadData = await uploadImage(formData);
        //     return {
        //         url: uploadData?.imageUrls
        //     };
        // }
        let formData = new FormData();
        formData.append('images', file);
        let uploadData = await uploadImage(formData);
        // 等待上传的时间
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 等待2秒
        console.log('file :>> ', uploadData?.imageUrls);
        // 前端暂存图片 后端直接返回url
        return {
            // url: URL.createObjectURL(file)
            url: uploadData?.imageUrls[0]
        };
    };
    // 上传的信息
    const [uploadInfo, setUploadInfo] = useState({
        coverImg: '',
        recipeTitle: '',
        recipeStory: '',
        recipeMaterials: {},
        recipeSteps: {}
    });
    // 更新
    const updateUploadInfo = (paramName, value) => {
        setUploadInfo({ ...uploadInfo, [paramName]: value });
    };
    // 表单字段
    const formField = (changedFields, allFields) => {
        // console.log(changedFields);
    };
    // 表单收集
    const formValue = (changedValues, allValues) => {
        console.log(changedValues);
        // console.log(getFieldValue('recipes_cover')?.length);
        // console.log(allValues);
    };
    const onFinish = (values) => {
        // 在此处将表单的数据进行提交
        console.log(values);
        setUploadInfo(...values);
        console.log(uploadInfo);
    };
    return (
        <div className={'upload_recipes'}>
            <div className='upload_recipes_top'>
                <CloseOutline className='new_close_button' onClick={onClose} color={'#000'} />
                <div className='buttons'>
                    <Button className='button_item' shape='rounded'>
                        预览
                    </Button>
                    <Button className='button_item' shape='rounded'>
                        存草稿
                    </Button>
                </div>
            </div>
            <div className='form_container'>
                <Form
                    className='upload_form'
                    // 去除form的默认样式
                    style={{
                        '--border-bottom': 'none',
                        '--border-inner': 'none',
                        '--border-top': 'none'
                    }}
                    form={form}
                    onFieldsChange={formField}
                    onValuesChange={formValue}
                    onFinish={onFinish}
                    initialValues={{
                        recipes_title: '',
                        recipeStory: '',
                        recipeMaterials: [{}]
                    }}
                    footer={
                        <Button block type='submit' color='primary' size='large'>
                            提交
                        </Button>
                    }
                >
                    <div className='upload_cover_container'>
                        {/* {hasCover ? (
                            <>
                                <Image
                                    className="img_picker"
                                    onClick={() => {
                                        setViewImg(uploadInfo.coverImg);
                                        setCoverVisible(true);
                                    }}
                                    src={uploadInfo.coverImg}
                                ></Image>
                                <Form.Item
                                    name="recipes_cover"
                                    className="recipes_cover"
                                    rules={[{ required: true, message: '请选择食谱封面' }]}
                                    style={{
                                        display: 'none'
                                    }}
                                >
                                    <ImageUploader
                                        ref={coverRef}
                                        className="img_picker"
                                        style={{ '--cell-size': '350px' }}
                                        value={fileList}
                                        onChange={() => {
                                            setFileList;
                                        }}
                                        // upload={mockUpload}
                                        maxCount={1}
                                    />
                                </Form.Item>
                            </>
                        ) : (
                            <p className="cover_title">选择一个好看的封面吧~</p>
                        )}

                        <Button shape="rounded" className="img_picker_button" onClick={selectCover}>
                            {hasCover ? '更换封面' : '选择封面'}
                        </Button> */}
                        <Form.Item
                            name='recipes_cover'
                            className='recipes_cover'
                            rules={[{ required: true, message: '请选择食谱封面' }]}
                        >
                            <ImageUploader
                                ref={coverRef}
                                className='img_picker'
                                style={{ '--cell-size': '345px' }}
                                value={fileList}
                                onChange={() => {
                                    setFileList;
                                }}
                                upload={mockUpload}
                                maxCount={1}
                                onDelete={() => {
                                    return Dialog.confirm({
                                        content: '是否确认删除'
                                    });
                                }}
                            />
                        </Form.Item>
                        <Button shape='rounded' className='img_picker_button'>
                            封面图
                        </Button>
                    </div>
                    <div className='recipes_detail'>
                        <Form.Item
                            name='recipes_title'
                            className='recipes_title'
                            rules={[{ required: true, message: '请输入食谱标题' }]}
                        >
                            <TextArea placeholder='添加菜谱标题' showCount maxLength={25} />
                        </Form.Item>
                        <Form.Item name='recipeStory' className='recipes_story'>
                            <TextArea placeholder='这道美食背后的故事' showCount maxLength={210} />
                        </Form.Item>
                        {/*用料*/}
                        <div className='materials'>
                            <div className='materials_title'>
                                用料
                                <Popover
                                    className='title_pop'
                                    content='注意事项'
                                    trigger='click'
                                    placement='top'
                                >
                                    <Image className='title_icon' src={attentionIcon}></Image>
                                </Popover>
                            </div>
                            <Form.Array
                                className='recipes_materials'
                                name='recipeMaterials'
                                // onAdd={(operation) => operation.add({ materialName: '张三' })}
                                renderAdd={
                                    () => (
                                        // 此处点击范围太大了 后期需要调整
                                        // <div className='addOneMaterial_container'>
                                        <Button
                                            className={'addOneMaterial'}
                                            block
                                            shape={'rounded'}
                                        >
                                            再增加一行
                                        </Button>
                                    )
                                    // </div>
                                }
                                renderHeader={({ index }, { remove }) => (
                                    <>
                                        <a
                                            className={'deleteIcon'}
                                            onClick={() => remove(index)}
                                            style={{ float: 'right' }}
                                        >
                                            <CloseCircleFill />
                                        </a>
                                    </>
                                )}
                            >
                                {(fields) =>
                                    fields.map(({ index }) => (
                                        <>
                                            <Grid columns={13} gap={1}>
                                                <Grid.Item span={6}>
                                                    <Form.Item
                                                        className='material_name'
                                                        name={[index, 'materialName']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '食材不能为空'
                                                            }
                                                        ]}
                                                    >
                                                        <Input
                                                            placeholder='食材：如鸡蛋'
                                                            clearable
                                                        />
                                                    </Form.Item>
                                                </Grid.Item>
                                                <Grid.Item span={6}>
                                                    <Form.Item
                                                        className='material_dosage'
                                                        name={[index, 'materialDosage']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '用量不能为空'
                                                            }
                                                        ]}
                                                    >
                                                        <Input
                                                            placeholder='用量：如一枚'
                                                            clearable
                                                            maxLength={10}
                                                        />
                                                    </Form.Item>
                                                </Grid.Item>
                                            </Grid>
                                        </>
                                    ))
                                }
                            </Form.Array>
                        </div>
                        {/*步骤图*/}
                        <div className='steps'>
                            <div className='steps_title'>做法</div>
                            <Form.Array
                                className='recipes_steps'
                                name='recipeSteps'
                                renderAdd={() => (
                                    <Button className={'addOneSteps'} block shape={'rounded'}>
                                        加一步
                                    </Button>
                                )}
                                renderHeader={({ index }, { remove }) => (
                                    <>
                                        <span>步骤&nbsp;{index + 1}</span>
                                        <a
                                            className={'deleteIcon'}
                                            onClick={() => remove(index)}
                                            style={{ float: 'right' }}
                                        >
                                            <CloseCircleFill />
                                        </a>
                                    </>
                                )}
                            >
                                {(fields) =>
                                    fields.map(({ index }) => (
                                        <>
                                            <Form.Item
                                                className='material_name'
                                                name={[index, 'stepImg']}
                                                rules={[
                                                    { required: true, message: '请选择步骤图片' }
                                                ]}
                                            >
                                                <ImageUploader
                                                    maxCount={1}
                                                    style={{ '--cell-size': '315px' }}
                                                    value={fileList}
                                                    onChange={setFileList}
                                                    upload={mockUpload}
                                                    onDelete={() => {
                                                        return Dialog.confirm({
                                                            content: '是否确认删除'
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                className='step_desc'
                                                name={[index, 'stepDesc']}
                                                rules={[
                                                    { required: true, message: '请输入步骤的描述' }
                                                ]}
                                            >
                                                <TextArea placeholder='添加步骤的描述' />
                                            </Form.Item>
                                        </>
                                    ))
                                }
                            </Form.Array>
                        </div>
                        {/*小贴士*/}
                        <div className='tips'>
                            <div className='tips_title'>
                                小贴士
                            </div>
                            <Form.Item name='recipeTip' className='recipes_tip'>
                                <TextArea placeholder='做这道菜该注意什么呢' showCount />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
            {/* 图片查看 */}
            {/* <ImageViewer
                // classNames={{
                //     mask: 'customize-mask',
                //     body: 'customize-body'
                // }}
                image={viewImg}
                visible={coverVisible}
                onClose={() => {
                    setCoverVisible(false);
                }}
            /> */}
        </div>
    );
};

export default Index;
