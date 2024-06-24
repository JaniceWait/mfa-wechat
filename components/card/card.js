// components/card/card.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: '标题',
    code: '123456',
    progress:100,
    index:0
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    remarkVisible: false,
    actions: [
      {
          text: '删除',
          key: 'deleted',
      },
      {
          text: '修改备注',
          key: 'modify',
      },
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    editRemark(event){
      this.hideRemarks()
      let index = event.target.dataset.index;
      let value = event.detail;
      this.triggerEvent('editremark',{index,value})
    },
    deleteItem(event){
      this.hideMenus()
      let index = event.target.dataset.index;
      this.triggerEvent('deleteitem',{index})
    },hideMenus(){
      this.setData({
        visible: false
      })
    },showMenus(){
      this.setData({
        visible: true
      })
    },hideRemarks(){
      this.setData({
        remarkVisible: false
      })
    },handleCloseMore(e){
      this.hideMenus()
    },
    handleVisibleChange(visible, e) {
        this.setData({
            visible: !this.data.visible,
        });
    },
    handleCancelButtonTap(){
      this.setData({ remarkVisible:false });
    },
    handleShowButtonTap(){
      this.setData({ remarkVisible:true });
      this.handleCloseMore();
    },handleEditRemarkRef(event){
      this.input = event
    },async submitEditRemark(){
      if (!this.input){
        return
      }
      this.editRemark(this.input)
    }
  }
})