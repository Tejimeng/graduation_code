const selectImage = (callback) => {
    // 创建一个input元素
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // 限制选择的文件类型为图片
    input.style.display = 'none'; // 隐藏input元素

    // 当用户选择了文件后触发的事件处理函数
    input.addEventListener('change', function () {
        const file = input.files[0]; // 获取用户选择的图片文件
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageDataURL = e.target.result; // 获取图片的 Base64 编码
                callback(imageDataURL); // 调用回调函数并传入图片数据
            };
            reader.readAsDataURL(file); // 读取图片文件并将其转换为 Base64 编码
        }
    });

    // 模拟用户点击 input 元素以触发文件选择对话框
    document.body.appendChild(input); // 将input元素添加到页面中
    input.click();
    document.body.removeChild(input); // 选择完成后立即移除input元素
};

export { selectImage };
