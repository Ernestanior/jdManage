/**
 * 消息类型
 */
enum EInfoType{
    /** loading状态 */
    loading_status = "loading_status",

    /** 路由重定向 */
    redirect_url = "redirect_url",

    /** 创建资源 */
    create_resource = "create_resource",

    /** 切换创建表单 */
    visible_create_form = "visible_create_form",

    /** 表单载入 */
    form_load = "form_load",

    /** 表单创建 */
    form_new = "form_new",

    /** 表单删除 */
    form_delete = "form_delete",

    /** 查看 */
    form_view = "form_view",

    /** 刷新列表 */
    list_reload = "list_reload",
    
    confirm_delete = "confirm_delete",

    /** 确认事件 */
    confirm_normal = "confirm_normal",

    /** import event */
    import_file = "import_file",

    //导出
    form_export = "form_export",

    //修改
    form_modify = 'form_modify',

    //修改成功
    form_updated_success='form_updated_success',

    /**清除缓存 */
    clear_cache = "clear_cache",

    /**单条数据刷新或重载 */
    once_update = "once_update",

    /** 复制内容到剪切板 */
    copy_to_clipboard = "copy_to_clipboard"
}

export default EInfoType;
